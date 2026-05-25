/**
 * app/api/concierge/route.ts — Web AI Concierge v3.0 (Gemini 3.5 Flash)
 * ----------------------------------------------------------------------------
 * Google Gemini 3.5 Flash で応答を SSE で client に逐次配信。
 * - Gemini implicit caching 自動有効 (cache_control 不要)
 * - max_output_tokens 600 (短い応答強制)
 * - 最後に CTA タグを parse して done で配信
 * ----------------------------------------------------------------------------
 */

import type { NextRequest } from "next/server";
import { parseConciergeResponse } from "@/lib/concierge/cta-parser";
import { geminiGenerateStream } from "@/lib/concierge/gemini-client";
import { getConciergeSystemPrompt } from "@/lib/concierge/system-prompt";
import type {
	ConciergeApiRequest,
	ConciergeSseEvent,
} from "@/lib/concierge/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_INPUT_LENGTH = 1000;
const MAX_TURNS = 20;

function sse(event: ConciergeSseEvent): string {
	return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(req: NextRequest) {
	const encoder = new TextEncoder();

	if (!process.env.GEMINI_API_KEY) {
		return new Response(
			sse({ type: "error", message: "GEMINI_API_KEY is not configured" }),
			{ status: 500, headers: { "Content-Type": "text/event-stream" } },
		);
	}

	let body: ConciergeApiRequest;
	try {
		body = (await req.json()) as ConciergeApiRequest;
	} catch {
		return new Response(sse({ type: "error", message: "Invalid JSON body" }), {
			status: 400,
			headers: { "Content-Type": "text/event-stream" },
		});
	}

	if (!Array.isArray(body.messages) || body.messages.length === 0) {
		return new Response(
			sse({ type: "error", message: "messages is required and non-empty" }),
			{ status: 400, headers: { "Content-Type": "text/event-stream" } },
		);
	}
	if (body.messages.length > MAX_TURNS) {
		return new Response(
			sse({
				type: "error",
				message: `Conversation too long (max ${MAX_TURNS} turns)`,
			}),
			{ status: 400, headers: { "Content-Type": "text/event-stream" } },
		);
	}
	for (const m of body.messages) {
		if (m.role !== "user" && m.role !== "assistant") {
			return new Response(
				sse({ type: "error", message: "Invalid message role" }),
				{ status: 400, headers: { "Content-Type": "text/event-stream" } },
			);
		}
		if (
			typeof m.content !== "string" ||
			m.content.length === 0 ||
			m.content.length > MAX_INPUT_LENGTH
		) {
			return new Response(
				sse({
					type: "error",
					message: `Message length must be 1..${MAX_INPUT_LENGTH}`,
				}),
				{ status: 400, headers: { "Content-Type": "text/event-stream" } },
			);
		}
	}

	const systemPrompt = getConciergeSystemPrompt();

	const stream = new ReadableStream<Uint8Array>({
		async start(controller) {
			let fullText = "";

			try {
				for await (const chunk of geminiGenerateStream({
					systemPrompt,
					messages: body.messages,
				})) {
					fullText += chunk;
					controller.enqueue(
						encoder.encode(sse({ type: "delta", text: chunk })),
					);
				}

				const parsed = parseConciergeResponse(fullText);
				controller.enqueue(
					encoder.encode(sse({ type: "done", cta: parsed.cta })),
				);
			} catch (error: unknown) {
				const message =
					error instanceof Error ? error.message : "Unknown error";
				controller.enqueue(encoder.encode(sse({ type: "error", message })));
			} finally {
				controller.close();
			}
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache, no-transform",
			Connection: "keep-alive",
			"X-Accel-Buffering": "no",
		},
	});
}

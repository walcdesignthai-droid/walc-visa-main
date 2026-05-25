/**
 * app/api/concierge/route.ts — v2.0 SSE Streaming
 * ----------------------------------------------------------------------------
 * Anthropic Messages API stream を SSE で client に逐次配信。
 * - Prompt Caching (cache_control: ephemeral) 有効
 * - max_tokens 600 (短い応答強制 + 体感速度向上)
 * - 最後に CTA タグを parse して done イベントで配信
 * ----------------------------------------------------------------------------
 */

import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";
import { parseConciergeResponse } from "@/lib/concierge/cta-parser";
import { getConciergeSystemPrompt } from "@/lib/concierge/system-prompt";
import type {
	ConciergeApiRequest,
	ConciergeSseEvent,
} from "@/lib/concierge/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5-20250929";
const MAX_TOKENS = 600;
const MAX_INPUT_LENGTH = 1000;
const MAX_TURNS = 20;

function sse(event: ConciergeSseEvent): string {
	return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(req: NextRequest) {
	const encoder = new TextEncoder();

	const apiKey = process.env.ANTHROPIC_API_KEY;
	if (!apiKey) {
		return new Response(
			sse({ type: "error", message: "ANTHROPIC_API_KEY is not configured" }),
			{
				status: 500,
				headers: { "Content-Type": "text/event-stream" },
			},
		);
	}

	let body: ConciergeApiRequest;
	try {
		body = (await req.json()) as ConciergeApiRequest;
	} catch {
		return new Response(
			sse({ type: "error", message: "Invalid JSON body" }),
			{
				status: 400,
				headers: { "Content-Type": "text/event-stream" },
			},
		);
	}

	// Validation
	if (!Array.isArray(body.messages) || body.messages.length === 0) {
		return new Response(
			sse({ type: "error", message: "messages is required and non-empty" }),
			{
				status: 400,
				headers: { "Content-Type": "text/event-stream" },
			},
		);
	}
	if (body.messages.length > MAX_TURNS) {
		return new Response(
			sse({
				type: "error",
				message: `Conversation too long (max ${MAX_TURNS} turns)`,
			}),
			{
				status: 400,
				headers: { "Content-Type": "text/event-stream" },
			},
		);
	}
	for (const m of body.messages) {
		if (m.role !== "user" && m.role !== "assistant") {
			return new Response(
				sse({ type: "error", message: "Invalid message role" }),
				{
					status: 400,
					headers: { "Content-Type": "text/event-stream" },
				},
			);
		}
		if (typeof m.content !== "string" || m.content.length === 0) {
			return new Response(
				sse({
					type: "error",
					message: "Message content must be non-empty string",
				}),
				{
					status: 400,
					headers: { "Content-Type": "text/event-stream" },
				},
			);
		}
		if (m.content.length > MAX_INPUT_LENGTH) {
			return new Response(
				sse({
					type: "error",
					message: `Message too long (max ${MAX_INPUT_LENGTH} chars)`,
				}),
				{
					status: 400,
					headers: { "Content-Type": "text/event-stream" },
				},
			);
		}
	}

	const client = new Anthropic({ apiKey });
	const systemPrompt = getConciergeSystemPrompt();

	const stream = new ReadableStream<Uint8Array>({
		async start(controller) {
			let fullText = "";

			try {
				const response = await client.messages.stream({
					model: MODEL,
					max_tokens: MAX_TOKENS,
					system: [
						{
							type: "text",
							text: systemPrompt,
							cache_control: { type: "ephemeral" },
						},
					],
					messages: body.messages.map((m) => ({
						role: m.role,
						content: m.content,
					})),
				});

				for await (const event of response) {
					if (
						event.type === "content_block_delta" &&
						event.delta.type === "text_delta"
					) {
						const text = event.delta.text;
						fullText += text;
						controller.enqueue(encoder.encode(sse({ type: "delta", text })));
					}
				}

				// final 取得 (usage 含む)
				const finalMessage = await response.finalMessage();
				const parsed = parseConciergeResponse(fullText);

				controller.enqueue(
					encoder.encode(
						sse({
							type: "done",
							cta: parsed.cta,
							usage: {
								inputTokens: finalMessage.usage.input_tokens,
								outputTokens: finalMessage.usage.output_tokens,
								cacheReadInputTokens:
									(finalMessage.usage as { cache_read_input_tokens?: number })
										.cache_read_input_tokens ?? 0,
								cacheCreationInputTokens:
									(finalMessage.usage as {
										cache_creation_input_tokens?: number;
									}).cache_creation_input_tokens ?? 0,
							},
						}),
					),
				);
			} catch (error: unknown) {
				const message =
					error instanceof Error ? error.message : "Unknown error";
				controller.enqueue(
					encoder.encode(sse({ type: "error", message })),
				);
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

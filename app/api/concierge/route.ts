/**
 * app/api/concierge/route.ts
 * ----------------------------------------------------------------------------
 * AI VISA Concierge API (MVP・非ストリーミング)
 *
 * 仕様:
 *   - POST /api/concierge { messages: [{ role, content }, ...] }
 *   - Anthropic Messages API (Claude Sonnet 4.6)
 *   - System prompt は Prompt Caching 有効 (90% コスト削減)
 *   - CTA タグを parseConciergeResponse で構造化して返却
 *
 * 次フェーズ:
 *   - SSE ストリーミング
 *   - Supabase 会話履歴保存
 *   - レート制限 (IP ベース)
 * ----------------------------------------------------------------------------
 */

import Anthropic from "@anthropic-ai/sdk";
import { type NextRequest, NextResponse } from "next/server";
import { parseConciergeResponse } from "@/lib/concierge/cta-parser";
import { getConciergeSystemPrompt } from "@/lib/concierge/system-prompt";
import type {
	ConciergeApiRequest,
	ConciergeApiResponse,
} from "@/lib/concierge/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL =
	process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5-20250929";
const MAX_TOKENS = 1024;
const MAX_INPUT_LENGTH = 1000;
const MAX_TURNS = 20;

export async function POST(req: NextRequest) {
	try {
		const apiKey = process.env.ANTHROPIC_API_KEY;
		if (!apiKey) {
			return NextResponse.json(
				{ error: "ANTHROPIC_API_KEY is not configured" },
				{ status: 500 },
			);
		}

		const body = (await req.json()) as ConciergeApiRequest;

		// バリデーション
		if (!Array.isArray(body.messages) || body.messages.length === 0) {
			return NextResponse.json(
				{ error: "messages is required and non-empty" },
				{ status: 400 },
			);
		}

		if (body.messages.length > MAX_TURNS) {
			return NextResponse.json(
				{ error: `Conversation too long (max ${MAX_TURNS} turns)` },
				{ status: 400 },
			);
		}

		// 各メッセージの長さ制限 + ロール検証
		for (const m of body.messages) {
			if (m.role !== "user" && m.role !== "assistant") {
				return NextResponse.json(
					{ error: "Invalid message role" },
					{ status: 400 },
				);
			}
			if (typeof m.content !== "string" || m.content.length === 0) {
				return NextResponse.json(
					{ error: "Message content must be non-empty string" },
					{ status: 400 },
				);
			}
			if (m.content.length > MAX_INPUT_LENGTH) {
				return NextResponse.json(
					{ error: `Message too long (max ${MAX_INPUT_LENGTH} chars)` },
					{ status: 400 },
				);
			}
		}

		// Anthropic 呼び出し
		const client = new Anthropic({ apiKey });
		const systemPrompt = getConciergeSystemPrompt();

		const response = await client.messages.create({
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

		// 応答テキスト抽出
		const rawText = response.content
			.filter((block) => block.type === "text")
			.map((block) => (block as { type: "text"; text: string }).text)
			.join("");

		const parsed = parseConciergeResponse(rawText);

		const result: ConciergeApiResponse = {
			text: parsed.text,
			cta: parsed.cta,
			usage: {
				inputTokens: response.usage.input_tokens,
				outputTokens: response.usage.output_tokens,
				cacheReadInputTokens:
					(response.usage as { cache_read_input_tokens?: number })
						.cache_read_input_tokens ?? 0,
				cacheCreationInputTokens:
					(response.usage as { cache_creation_input_tokens?: number })
						.cache_creation_input_tokens ?? 0,
			},
		};

		return NextResponse.json(result);
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json(
			{ error: `Concierge API error: ${message}` },
			{ status: 500 },
		);
	}
}

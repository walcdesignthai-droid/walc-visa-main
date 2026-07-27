/**
 * lib/concierge/gemini-client.ts — v3.0 (WALC DESIGN 同期)
 * ----------------------------------------------------------------------------
 * 修正履歴:
 *   v3.0 (2026-05-26) — WALC DESIGN の本番稼働実装に完全同期。
 *     - thinkingConfig 削除 (Gemini 3.5 Flash では thinking 予算は別枠)
 *     - maxOutputTokens: 2000 → 1024
 *     - temperature: 0.6 → 0.7
 *     - 入力サニタイズ追加: 4000 文字制限
 *   v2.0 (廃止) — thinkingConfig: { thinkingBudget: 0 } 追加 → 逆に出力切れる
 * ----------------------------------------------------------------------------
 */

import { GoogleGenAI } from "@google/genai";
import type { ConciergeMessage } from "./types";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
const MAX_OUTPUT_TOKENS = 2048;
const INPUT_LIMIT = 4000;

let cachedClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
	if (cachedClient) return cachedClient;
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		throw new Error("GEMINI_API_KEY is not configured");
	}
	cachedClient = new GoogleGenAI({ apiKey });
	return cachedClient;
}

/** ConciergeMessage[] → Gemini contents 形式 + 入力サニタイズ */
function toGeminiContents(messages: ConciergeMessage[]) {
	return messages.map((m) => ({
		role: m.role === "assistant" ? "model" : "user",
		parts: [{ text: String(m.content ?? "").slice(0, INPUT_LIMIT) }],
	}));
}

export interface GeminiGenerateOptions {
	systemPrompt: string;
	messages: ConciergeMessage[];
	maxOutputTokens?: number;
}

function buildConfig(options: GeminiGenerateOptions) {
	return {
		systemInstruction: options.systemPrompt,
		maxOutputTokens: options.maxOutputTokens ?? MAX_OUTPUT_TOKENS,
		temperature: 0.7,
		// thinkingConfig は明示設定しない (WALC DESIGN 仕様)
		// → Gemini 3.5 Flash では thinking 予算は別枠で maxOutputTokens を消費しない
	};
}

export async function geminiGenerate(
	options: GeminiGenerateOptions,
): Promise<{ text: string }> {
	const ai = getClient();
	const response = await ai.models.generateContent({
		model: MODEL,
		contents: toGeminiContents(options.messages),
		config: buildConfig(options),
	});

	return { text: response.text ?? "" };
}

export async function* geminiGenerateStream(
	options: GeminiGenerateOptions,
): AsyncGenerator<string, void, unknown> {
	const ai = getClient();
	const stream = await ai.models.generateContentStream({
		model: MODEL,
		contents: toGeminiContents(options.messages),
		config: buildConfig(options),
	});

	for await (const chunk of stream) {
		const text = chunk.text;
		// thinking chunk 等で text が undefined のことがある → 必ずガード
		if (text) yield text;
	}
}

/**
 * lib/concierge/gemini-client.ts — Google Gemini 3.5 Flash クライアント
 * ----------------------------------------------------------------------------
 * @google/genai (新 SDK) で Gemini Messages API を呼び出す薄いラッパー。
 *
 * モデル: gemini-3.5-flash (2026-05-19 リリース・1M context・4x speed)
 * - System Instruction: systemInstruction フィールドに注入
 * - Streaming: generateContentStream で逐次 chunk
 * - Implicit caching: 自動有効 (cache_control 不要)
 * ----------------------------------------------------------------------------
 */

import { GoogleGenAI } from "@google/genai";
import type { ConciergeMessage } from "./types";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
const MAX_OUTPUT_TOKENS = 600;

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

/** ConciergeMessage[] を Gemini 形式 (contents) に変換 */
function toGeminiContents(messages: ConciergeMessage[]) {
	return messages.map((m) => ({
		role: m.role === "assistant" ? "model" : "user",
		parts: [{ text: m.content }],
	}));
}

export interface GeminiGenerateOptions {
	systemPrompt: string;
	messages: ConciergeMessage[];
	maxOutputTokens?: number;
}

/**
 * 非ストリーミング (LINE 等で使用)
 */
export async function geminiGenerate(
	options: GeminiGenerateOptions,
): Promise<{ text: string }> {
	const ai = getClient();
	const response = await ai.models.generateContent({
		model: MODEL,
		contents: toGeminiContents(options.messages),
		config: {
			systemInstruction: options.systemPrompt,
			maxOutputTokens: options.maxOutputTokens ?? MAX_OUTPUT_TOKENS,
			temperature: 0.6,
		},
	});

	return { text: response.text ?? "" };
}

/**
 * ストリーミング (Web AI Concierge で使用)
 * AsyncIterable<string> を返す (各 chunk のテキスト断片)
 */
export async function* geminiGenerateStream(
	options: GeminiGenerateOptions,
): AsyncGenerator<string, void, unknown> {
	const ai = getClient();
	const stream = await ai.models.generateContentStream({
		model: MODEL,
		contents: toGeminiContents(options.messages),
		config: {
			systemInstruction: options.systemPrompt,
			maxOutputTokens: options.maxOutputTokens ?? MAX_OUTPUT_TOKENS,
			temperature: 0.6,
		},
	});

	for await (const chunk of stream) {
		const text = chunk.text;
		if (text) yield text;
	}
}

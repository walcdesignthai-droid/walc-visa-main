import { claudeGenerate } from "./claude-client";
import {
	type ConciergeGenerateOptions,
	geminiGenerateStream,
} from "./gemini-client";

const GATEWAY_URL = "https://ai-gateway.vercel.sh/v1/chat/completions";
const PRIMARY_MODEL = "google/gemini-3.6-flash";
const FALLBACK_MODEL = "anthropic/claude-sonnet-5";

/**
 * 既存の直接 API キーを優先し、利用できない場合のみ次候補へ切り替える。
 * AI Gateway が有効な環境では Gemini → Claude のモデルフォールバックを使用する。
 */
export async function* conciergeGenerateStream(
	options: ConciergeGenerateOptions,
): AsyncGenerator<string, void, unknown> {
	if (process.env.GEMINI_API_KEY) {
		const iterator = geminiGenerateStream(options)[Symbol.asyncIterator]();
		try {
			const first = await iterator.next();
			if (!first.done && first.value) {
				yield first.value;
				while (true) {
					const next = await iterator.next();
					if (next.done) return;
					if (next.value) yield next.value;
				}
			}
		} catch (error) {
			if (!process.env.ANTHROPIC_API_KEY) throw error;
		}
	}

	if (process.env.ANTHROPIC_API_KEY) {
		const text = await claudeGenerate(options);
		if (text) yield text;
		return;
	}

	const token =
		process.env.AI_GATEWAY_API_KEY ??
		options.gatewayToken ??
		process.env.VERCEL_OIDC_TOKEN;
	if (!token) {
		throw new Error("AI Gateway authentication is unavailable");
	}

	const response = await fetch(GATEWAY_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: PRIMARY_MODEL,
			messages: [
				{ role: "system", content: options.systemPrompt },
				...options.messages,
			],
			max_tokens: options.maxOutputTokens ?? 2048,
			stream: true,
			providerOptions: {
				gateway: {
					models: [FALLBACK_MODEL],
					tags: ["product:walc-visa", "feature:main-concierge"],
				},
			},
		}),
	});

	if (!response.ok || !response.body) {
		throw new Error(`AI Gateway request failed (${response.status})`);
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();
		buffer += decoder.decode(value, { stream: !done });

		const lines = buffer.split("\n");
		buffer = lines.pop() ?? "";

		for (const rawLine of lines) {
			const line = rawLine.trim();
			if (!line.startsWith("data:")) continue;

			const payload = line.slice(5).trim();
			if (!payload || payload === "[DONE]") continue;

			const event = JSON.parse(payload) as {
				choices?: Array<{ delta?: { content?: string } }>;
			};
			const text = event.choices?.[0]?.delta?.content;
			if (text) yield text;
		}

		if (done) break;
	}
}

export async function conciergeGenerate(
	options: ConciergeGenerateOptions,
): Promise<{ text: string }> {
	let text = "";
	for await (const chunk of conciergeGenerateStream(options)) {
		text += chunk;
	}
	return { text };
}

import { claudeGenerate } from "./claude-client";
import {
	type ConciergeGenerateOptions,
	geminiGenerateStream,
} from "./gemini-client";

const GATEWAY_URL = "https://ai-gateway.vercel.sh/v1/chat/completions";
const PRIMARY_MODEL = "google/gemini-3.6-flash";
const FALLBACK_MODEL = "anthropic/claude-sonnet-5";
const PROVIDER_IDLE_TIMEOUT_MS = 15_000;

function createIdleTimeout() {
	const controller = new AbortController();
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return {
		signal: controller.signal,
		arm() {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				controller.abort(
					new Error(`AI provider idle timeout (${PROVIDER_IDLE_TIMEOUT_MS}ms)`),
				);
			}, PROVIDER_IDLE_TIMEOUT_MS);
		},
		clear() {
			if (timeout) clearTimeout(timeout);
			timeout = undefined;
		},
	};
}

/**
 * 既存の直接 API キーを優先し、利用できない場合のみ次候補へ切り替える。
 * AI Gateway が有効な環境では Gemini → Claude のモデルフォールバックを使用する。
 */
export async function* conciergeGenerateStream(
	options: ConciergeGenerateOptions,
): AsyncGenerator<string, void, unknown> {
	let directProviderError: unknown;

	if (process.env.GEMINI_API_KEY) {
		const timeout = createIdleTimeout();
		const iterator = geminiGenerateStream({
			...options,
			abortSignal: timeout.signal,
		})[Symbol.asyncIterator]();
		let hasYielded = false;
		try {
			timeout.arm();
			const first = await iterator.next();
			timeout.clear();
			if (!first.done && first.value) {
				hasYielded = true;
				yield first.value;
				while (true) {
					timeout.arm();
					const next = await iterator.next();
					timeout.clear();
					if (next.done) return;
					if (next.value) {
						hasYielded = true;
						yield next.value;
					}
				}
			}
			directProviderError = new Error("Gemini returned no text");
		} catch (error) {
			if (hasYielded) throw error;
			directProviderError = error;
		} finally {
			timeout.clear();
		}
	}

	if (process.env.ANTHROPIC_API_KEY) {
		const timeout = createIdleTimeout();
		try {
			timeout.arm();
			const text = await claudeGenerate({
				...options,
				abortSignal: timeout.signal,
			});
			timeout.clear();
			if (text) yield text;
			if (text) return;
			directProviderError = new Error("Claude returned no text");
		} catch (error) {
			directProviderError = error;
		} finally {
			timeout.clear();
		}
	}

	const token =
		options.gatewayToken ??
		process.env.VERCEL_OIDC_TOKEN ??
		process.env.AI_GATEWAY_API_KEY;
	if (!token) {
		if (directProviderError) throw directProviderError;
		throw new Error("AI Gateway authentication is unavailable");
	}

	const timeout = createIdleTimeout();
	let response: Response;
	try {
		timeout.arm();
		response = await fetch(GATEWAY_URL, {
			method: "POST",
			signal: timeout.signal,
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
		timeout.clear();
	} catch (error) {
		timeout.clear();
		throw error;
	}

	if (!response.ok || !response.body) {
		timeout.clear();
		throw new Error(`AI Gateway request failed (${response.status})`);
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";

	try {
		while (true) {
			timeout.arm();
			const { done, value } = await reader.read();
			timeout.clear();
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
	} finally {
		timeout.clear();
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

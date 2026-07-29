import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const providerMocks = vi.hoisted(() => ({
	claudeGenerate: vi.fn(),
	geminiGenerateStream: vi.fn(),
}));

vi.mock("../lib/concierge/claude-client", () => ({
	claudeGenerate: providerMocks.claudeGenerate,
}));

vi.mock("../lib/concierge/gemini-client", () => ({
	geminiGenerateStream: providerMocks.geminiGenerateStream,
}));

import { conciergeGenerateStream } from "../lib/concierge/provider";

const options = {
	systemPrompt: "Use verified WALC facts only.",
	messages: [{ role: "user" as const, content: "DTVについて教えて" }],
};

async function collectStream() {
	const chunks: string[] = [];
	for await (const chunk of conciergeGenerateStream(options)) {
		chunks.push(chunk);
	}
	return chunks;
}

describe("concierge provider failover", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		process.env.GEMINI_API_KEY = "test-gemini-key";
		process.env.ANTHROPIC_API_KEY = "test-anthropic-key";
		delete process.env.AI_GATEWAY_API_KEY;
		delete process.env.VERCEL_OIDC_TOKEN;
	});

	afterEach(() => {
		vi.useRealTimers();
		delete process.env.GEMINI_API_KEY;
		delete process.env.ANTHROPIC_API_KEY;
	});

	it("falls back to Claude when Gemini fails before the first visible token", async () => {
		providerMocks.geminiGenerateStream.mockImplementation(async function* () {
			yield* [];
			throw new Error("Gemini unavailable");
		});
		providerMocks.claudeGenerate.mockResolvedValue("Claude fallback");

		await expect(collectStream()).resolves.toEqual(["Claude fallback"]);
		expect(providerMocks.claudeGenerate).toHaveBeenCalledOnce();
		expect(
			providerMocks.geminiGenerateStream.mock.calls[0]?.[0]?.abortSignal,
		).toBeInstanceOf(AbortSignal);
	});

	it("does not append a second provider after Gemini already emitted text", async () => {
		providerMocks.geminiGenerateStream.mockImplementation(async function* () {
			yield "Gemini partial";
			throw new Error("Gemini stream interrupted");
		});
		providerMocks.claudeGenerate.mockResolvedValue("Claude duplicate");

		const chunks: string[] = [];
		await expect(async () => {
			for await (const chunk of conciergeGenerateStream(options)) {
				chunks.push(chunk);
			}
		}).rejects.toThrow("Gemini stream interrupted");

		expect(chunks).toEqual(["Gemini partial"]);
		expect(providerMocks.claudeGenerate).not.toHaveBeenCalled();
	});

	it("abandons a silent Gemini request after the provider timeout", async () => {
		vi.useFakeTimers();
		providerMocks.geminiGenerateStream.mockImplementation(
			async function* (requestOptions) {
				await new Promise((_, reject) => {
					requestOptions.abortSignal?.addEventListener(
						"abort",
						() => reject(requestOptions.abortSignal?.reason),
						{ once: true },
					);
				});
				yield "unreachable";
			},
		);
		providerMocks.claudeGenerate.mockResolvedValue("Claude after timeout");

		const pending = collectStream();
		await vi.advanceTimersByTimeAsync(15_000);

		await expect(pending).resolves.toEqual(["Claude after timeout"]);
		expect(providerMocks.claudeGenerate).toHaveBeenCalledOnce();
	});
});

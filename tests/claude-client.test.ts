import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { claudeGenerate } from "../lib/concierge/claude-client";

describe("Claude concierge client", () => {
	beforeEach(() => {
		process.env.ANTHROPIC_API_KEY = "test-anthropic-key";
	});

	afterEach(() => {
		delete process.env.ANTHROPIC_API_KEY;
		vi.unstubAllGlobals();
	});

	it("uses the low-latency Sonnet 5 request contract", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(
				JSON.stringify({
					content: [{ type: "text", text: "回答" }],
				}),
				{ status: 200, headers: { "content-type": "application/json" } },
			),
		);
		vi.stubGlobal("fetch", fetchMock);
		const controller = new AbortController();

		await expect(
			claudeGenerate({
				systemPrompt: "Use verified facts.",
				messages: [{ role: "user", content: "質問" }],
				abortSignal: controller.signal,
			} as Parameters<typeof claudeGenerate>[0] & {
				abortSignal: AbortSignal;
			}),
		).resolves.toBe("回答");

		const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
		const body = JSON.parse(String(request.body));
		expect(body.model).toBe("claude-sonnet-5");
		expect(body.thinking).toEqual({ type: "disabled" });
		expect(request.signal).toBe(controller.signal);
	});
});

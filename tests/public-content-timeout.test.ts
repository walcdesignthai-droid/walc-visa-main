import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
	getDtvPublicContent,
	VERIFIED_DTV_FALLBACK,
} from "../lib/walc-data/public-content";

describe("public content failover", () => {
	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
	});

	it("falls back when the CRM public-content request stops responding", async () => {
		vi.useFakeTimers();
		let requestSignal: AbortSignal | undefined;
		vi.stubGlobal(
			"fetch",
			vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
				requestSignal = init?.signal ?? undefined;
				return new Promise<Response>((_resolve, reject) => {
					requestSignal?.addEventListener(
						"abort",
						() => reject(requestSignal?.reason),
						{ once: true },
					);
				});
			}),
		);

		const pending = getDtvPublicContent();
		await vi.advanceTimersByTimeAsync(2_500);

		await expect(pending).resolves.toEqual(VERIFIED_DTV_FALLBACK);
		expect(requestSignal).toBeInstanceOf(AbortSignal);
		expect(requestSignal?.aborted).toBe(true);
	});
});

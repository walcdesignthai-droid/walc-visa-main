import { describe, expect, it } from "vitest";
import { getConciergeSystemPrompt } from "./system-prompt";

describe("DTV concierge knowledge", () => {
	it("includes the current entry-risk and service rules", () => {
		const prompt = getConciergeSystemPrompt();

		expect(prompt).toContain("外国人 29,490 人");
		expect(prompt).toContain("現在は新規受付を一時停止中");
		expect(prompt).toContain("DTV 取得者限定の銀行口座開設オプション");
		expect(prompt).toContain("2025 年 4 月以降");
		expect(prompt).toContain("DTV 申請通過実績: 200 件以上");
		expect(prompt).not.toContain("212/212");
	});

	it("forbids unsupported claims and unlawful balance workarounds", () => {
		const prompt = getConciergeSystemPrompt();

		expect(prompt).toContain("日本人 29,490 人");
		expect(prompt).toContain("要件回避や不正な残高証明を提案しない");
		expect(prompt).toContain("DTV 取得や入国を保証しない");
	});
});

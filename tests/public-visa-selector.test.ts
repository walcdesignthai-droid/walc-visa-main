import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("public VISA selector facts", () => {
	it("renders only CRM-backed DTV pricing on the public selector", async () => {
		const selector = await read("components/lp/VisaTypes.tsx");

		expect(selector).toContain("content.pricing");
		expect(selector).toContain(
			"const displayPrice = isDtv ? dtvFromPrice : null",
		);
		expect(selector).not.toContain("categoryFromPrice");
		expect(selector).not.toContain("categoryRecommendedPlan");
		expect(selector).not.toContain("recommendedPlan?.walcFee");
		expect(selector).not.toContain("VISA_RUN_SUPPORT");
		expect(selector).toContain("DTV以外の料金・対応可否はLINEで個別確認");
	});

	it("uses needs-first descriptions instead of internal sales copy", async () => {
		const selector = await read("components/lp/VisaTypes.tsx");

		expect(selector).toContain("PUBLIC_VISA_DESCRIPTIONS");
		expect(selector).not.toContain("{visa.primaryDesc}");
		expect(selector).not.toContain("★ 第一推奨");
		expect(selector).not.toContain("迷ったらまず DTV");
		expect(selector).toContain("目的・活動内容・年齢・家族構成");
	});

	it("does not claim that a bank account is available", async () => {
		const selector = await read("components/lp/VisaTypes.tsx");

		expect(selector).toContain("金融機関の審査・運用により要確認");
		expect(selector).not.toContain("visa.bankAccountAvailable");
		expect(selector).not.toContain('? "可"');
	});

	it("removes blanket DTV recommendation language from llms.txt", async () => {
		const llms = await read("app/llms.txt/route.ts");

		expect(llms).not.toContain("WALC 第一推奨");
		expect(llms).toContain("目的・活動内容・条件に応じて個別確認");
		expect(llms).toContain("DTV以外の料金");
	});
});

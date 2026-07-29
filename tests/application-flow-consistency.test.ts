import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("public application flow", () => {
	it("keeps LINE as the public consultation and application channel", async () => {
		const [content, hero, process, finalCta] = await Promise.all([
			read("lib/walc-data/public-content.ts"),
			read("components/lp/Hero.tsx"),
			read("components/lp/Process.tsx"),
			read("components/lp/FinalCta.tsx"),
		]);

		expect(content).toContain('applicationStatus: "line_first"');
		expect(process).toContain('title: "LINEで正式申込のご案内"');
		expect(process).toContain("申込窓口はLINEに統一");
		expect(finalCta).toContain("content.consultationUrl");
		expect(hero).toContain('href="#visa-types"');
		expect(hero).toContain("対応VISAを見る");
		expect(process).not.toContain("専用 CRM で申込");
		expect(process).not.toContain("WALC アプリ(my.walc-visa.online)");
	});

	it("limits the customer portal copy to post-application progress and documents", async () => {
		const [process, siteMap] = await Promise.all([
			read("components/lp/Process.tsx"),
			read("lib/walc-data/site-map.ts"),
		]);

		expect(process).toContain("申込後はお客様専用画面で進捗を確認し");
		expect(process).toContain("追加書類");
		expect(process).toContain("SITE_URLS.portal");
		expect(process).toContain("申込済みの方：お客様専用画面を開く");
		expect(siteMap).toContain(
			'portal: "https://my.walc-visa.online/portal/login"',
		);
	});

	it("removes obsolete CRM-application claims from the homepage narrative", async () => {
		const [layout, ...sources] = await Promise.all(
			[
				"app/layout.tsx",
				"components/lp/Hero.tsx",
				"components/lp/TrustStrip.tsx",
				"components/lp/WhyWalc.tsx",
				"components/lp/Founder.tsx",
				"components/lp/Process.tsx",
			].map(read),
		);
		const combined = sources.join("\n");

		expect(combined).toContain("LINEとお客様専用画面");
		expect(layout).toContain(
			"新規相談はLINE、申込後の進捗確認と追加書類はお客様専用画面",
		);
		expect(combined).not.toContain("専用 CRM で一気通貫");
		expect(combined).not.toContain("申込〜運用まで一気通貫");
		expect(combined).not.toContain(
			"申込み・書類管理・進捗確認・請求・更新通知すべて",
		);
		expect(layout).not.toContain("専用CRMで申込");
	});
});

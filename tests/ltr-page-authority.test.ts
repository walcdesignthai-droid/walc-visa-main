import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const PAGE_PATH = resolve(import.meta.dirname, "..", "app/visas/ltr/page.tsx");

describe("LTR page authority and public claims", () => {
	it("lets the root metadata template append the site name once", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).toContain(
			'const LTR_TITLE = "LTR Visa(Long-Term Resident)";',
		);
		expect(source).toContain("title: LTR_TITLE");
		expect(source).not.toContain(
			'title: "LTR Visa(Long-Term Resident)| WALC VISA Consulting",',
		);
	});

	it("qualifies tax and bank-account outcomes", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).not.toContain("10 年タイ滞在 + 外国所得非課税");
		expect(source).toContain(
			"税制上の取扱いは、LTRカテゴリ、所得の種類、適用条件、居住者判定等により異なります。",
		);
		expect(source).toContain(
			"銀行口座の開設可否は、各金融機関の審査・運用により決まります。",
		);
	});

	it("links official BOI/LTR sources and renders breadcrumbs", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).toContain("https://ltr.boi.go.th/");
		expect(source).toContain(
			"https://ltr.boi.go.th/page/visa-issuance-info.html",
		);
		expect(source).toContain(
			"https://ltr.boi.go.th/documents/PPT_Tax_Essentialsfor_LTR_Visa_Holders.pdf",
		);
		expect(source).toContain("<BreadcrumbJsonLd");
		expect(source).toContain("https://walc-visa.online/visas/ltr");
	});

	it("publishes a page-specific canonical and social URL", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).toContain("const LTR_URL");
		expect(source).toContain('"https://walc-visa.online/visas/ltr"');
		expect(source).toContain("alternates: { canonical: LTR_URL }");
		expect(source).toContain("url: LTR_URL");
	});

	it("matches the current BOI category and dependent criteria", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).toContain("直近3年合計売上 50,000,000 USD以上");
		expect(source).toContain("BOI対象産業・指定専門分野");
		expect(source).not.toContain("BOI 指定 10 産業");
		expect(source).not.toContain("修士号 / IP / Series A 資金調達");
		expect(source).toContain("配偶者・20歳未満の子を合わせて最大4名");
		expect(source).not.toContain("配偶者 + 20 歳未満の子 4 名まで");
		expect(source).toContain(
			"https://ltr.boi.go.th/page/targeted-industries.html",
		);
		expect(source).toContain(
			"https://ltr.boi.go.th/page/opening-bank-account-in-thailand.html",
		);
	});
});

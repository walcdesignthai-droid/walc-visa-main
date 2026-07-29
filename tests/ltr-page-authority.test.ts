import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const PAGE_PATH = resolve(import.meta.dirname, "..", "app/visas/ltr/page.tsx");
const DATA_PATH = resolve(
	import.meta.dirname,
	"..",
	"lib/walc-data/ltr-structured-data.ts",
);

describe("LTR page authority and public claims", () => {
	it("lets the root metadata template append the site name once", async () => {
		const [page, data] = await Promise.all([
			readFile(PAGE_PATH, "utf8"),
			readFile(DATA_PATH, "utf8"),
		]);

		expect(data).toContain(
			'export const LTR_TITLE = "LTR Visa(Long-Term Resident)";',
		);
		expect(page).toContain("title: LTR_TITLE");
		expect(page).not.toContain(
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
		const [page, data] = await Promise.all([
			readFile(PAGE_PATH, "utf8"),
			readFile(DATA_PATH, "utf8"),
		]);

		expect(data).toContain("https://ltr.boi.go.th/");
		expect(data).toContain(
			"https://ltr.boi.go.th/page/visa-issuance-info.html",
		);
		expect(data).toContain(
			"https://ltr.boi.go.th/documents/PPT_Tax_Essentialsfor_LTR_Visa_Holders.pdf",
		);
		expect(page).toContain("<BreadcrumbJsonLd");
		expect(data).toContain("https://walc-visa.online/visas/ltr");
	});

	it("publishes a page-specific canonical and social URL", async () => {
		const [page, data] = await Promise.all([
			readFile(PAGE_PATH, "utf8"),
			readFile(DATA_PATH, "utf8"),
		]);

		expect(data).toContain("export const LTR_URL");
		expect(data).toContain('"https://walc-visa.online/visas/ltr"');
		expect(page).toContain("alternates: { canonical: LTR_URL }");
		expect(page).toContain("url: LTR_URL");
	});
});

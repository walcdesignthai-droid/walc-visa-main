import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const PAGE_PATH = resolve(
	import.meta.dirname,
	"..",
	"app/visas/retirement/page.tsx",
);
const STRUCTURED_DATA_PATH = resolve(
	import.meta.dirname,
	"..",
	"lib/walc-data/retirement-structured-data.ts",
);

describe("retirement page public claims", () => {
	it("links the DTV comparison to the canonical specialist site", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).toContain('href="https://dtv.walc-visa.online/"');
		expect(source).not.toContain('href="/visas/dtv"');
	});

	it("does not promise approval or renewal outcomes", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).not.toContain("確実に取得");
		expect(source).not.toContain("未満の方も更新可");
		expect(source).not.toContain("申請可能");
		expect(source).not.toContain("DTV のほうがおすすめです");
		expect(source).toContain(
			"どちらが適するかは、滞在目的、タイでの活動内容、入出国計画、資金証明の状況によって異なります。",
		);
		expect(source).toContain(
			"取得・更新の可否は、入国管理局・タイ大使館・領事館等の審査により決まります。",
		);
		expect(source).toContain(
			"銀行口座の開設可否は、各金融機関の審査・運用により決まります。",
		);
	});

	it("lets the root metadata template append the site name once", async () => {
		const [source, structuredData] = await Promise.all([
			readFile(PAGE_PATH, "utf8"),
			readFile(STRUCTURED_DATA_PATH, "utf8"),
		]);

		expect(structuredData).toContain(
			'const RETIREMENT_TITLE = "リタイアメント VISA(NON-O / 50 歳以上)";',
		);
		expect(source).toContain("title: RETIREMENT_TITLE");
		expect(source).not.toContain(
			'title: "リタイアメント VISA(NON-O / 50 歳以上)| WALC VISA Consulting",',
		);
	});

	it("publishes a page-specific canonical and social URL", async () => {
		const [source, structuredData] = await Promise.all([
			readFile(PAGE_PATH, "utf8"),
			readFile(STRUCTURED_DATA_PATH, "utf8"),
		]);

		expect(source).toContain("RETIREMENT_URL");
		expect(structuredData).toContain(
			'"https://walc-visa.online/visas/retirement"',
		);
		expect(source).toContain("alternates: { canonical: RETIREMENT_URL }");
		expect(source).toContain("url: RETIREMENT_URL");
	});
});

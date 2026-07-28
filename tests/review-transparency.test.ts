import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("WALC VISA review transparency page", () => {
	it("publishes a source-first policy without invented ratings or review counts", async () => {
		const page = await read("app/reviews/transparency/page.tsx");

		expect(page).toContain("お客様の声とレビューの掲載方針");
		expect(page).toContain("確認済みの公開元 URL と集計ルール");
		expect(page).toContain("転載許諾");
		expect(page).toContain("重複排除");
		expect(page).toContain("訂正");
		expect(page).toContain('dateTime="2026-07-29"');
		expect(page).not.toContain('"@type": "Review"');
		expect(page).not.toContain("AggregateRating");
		expect(page).not.toMatch(/\b\d+(?:\.\d+)?\s*\/\s*5\b/);
	});

	it("provides canonical metadata and a non-review WebPage schema", async () => {
		const page = await read("app/reviews/transparency/page.tsx");

		expect(page).toContain('canonical: "/reviews/transparency"');
		expect(page).toContain('"@type": "WebPage"');
		expect(page).toContain('"@id": `${PAGE_URL}#webpage`');
	});

	it("links the policy from the footer, sitemap, and llms manifest", async () => {
		const [footer, sitemap, llms] = await Promise.all([
			read("components/shared/Footer.tsx"),
			read("app/sitemap.ts"),
			read("app/llms.txt/route.ts"),
		]);

		expect(footer).toContain('href: "/reviews/transparency"');
		expect(sitemap).toContain('url: `${BASE_URL}/reviews/transparency`');
		expect(llms).toContain(
			"[お客様の声・レビュー掲載方針](${ORIGIN}/reviews/transparency)",
		);
	});
});

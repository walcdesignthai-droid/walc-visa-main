import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const PAGE_PATH = resolve(import.meta.dirname, "..", "app/blog/page.tsx");

describe("blog index metadata", () => {
	it("publishes the blog URL in canonical and social metadata", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).toContain("const BLOG_URL");
		expect(source).toContain('"https://walc-visa.online/blog"');
		expect(source).toContain("alternates: { canonical: BLOG_URL }");
		expect(source).toContain("url: BLOG_URL");
	});

	it("lets the root title template append the site name once", async () => {
		const source = await readFile(PAGE_PATH, "utf8");

		expect(source).toContain("title: BLOG_TITLE");
		expect(source).not.toContain(
			'title: "WALC VISA Journal｜タイ VISA の実務ガイド | WALC VISA Consulting"',
		);
	});
});

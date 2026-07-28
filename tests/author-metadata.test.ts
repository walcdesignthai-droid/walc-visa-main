import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("author page metadata", () => {
	it("lets the root template append the site name exactly once", async () => {
		const [layout, authorPage] = await Promise.all([
			read("app/layout.tsx"),
			read("app/author/yosuke-onodera/page.tsx"),
		]);

		expect(layout).toContain('template: "%s | WALC VISA Consulting"');
		expect(authorPage).toContain(
			'const AUTHOR_PAGE_TITLE = "運営責任者 小野寺 陽介";',
		);
		expect(authorPage).toContain("title: AUTHOR_PAGE_TITLE");
		expect(authorPage).not.toContain(
			'title: "運営責任者 小野寺 陽介 | WALC VISA Consulting"',
		);
		expect(authorPage).toContain(
			'alternates: { canonical: "/author/yosuke-onodera" }',
		);
	});

	it("publishes the author page URL in social metadata", async () => {
		const authorPage = await read("app/author/yosuke-onodera/page.tsx");

		expect(authorPage).toContain("const AUTHOR_PAGE_URL = WALC_AUTHOR.url");
		expect(authorPage).toContain("url: AUTHOR_PAGE_URL");
	});
});

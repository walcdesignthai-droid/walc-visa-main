import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("official WALC site directory", () => {
	it("publishes one role-aware directory from the central URL map", async () => {
		const [page, siteMap] = await Promise.all([
			read("app/official-sites/page.tsx"),
			read("lib/walc-data/site-map.ts"),
		]);

		expect(siteMap).toContain("OFFICIAL_SITE_DIRECTORY");
		expect(page).toContain("OFFICIAL_SITE_DIRECTORY");
		expect(page).toContain("WALC VISAの公式サイト一覧");
		expect(page).toContain('"ItemList"');
		expect(page).toContain('"WebPage"');
		expect(page).toContain("<BreadcrumbJsonLd");
		expect(page).not.toContain("crm.walc-visa.online");
	});

	it("connects the directory to the footer, sitemap, and AI manifest", async () => {
		const [footer, sitemap, llms] = await Promise.all([
			read("components/shared/Footer.tsx"),
			read("app/sitemap.ts"),
			read("app/llms.txt/route.ts"),
		]);

		expect(footer).toContain('href: "/official-sites"');
		expect(sitemap).toMatch(/url: `\$\{BASE_URL\}\/official-sites`/);
		expect(sitemap).toMatch(/url: `\$\{BASE_URL\}\/immigration-support`/);
		expect(llms).toContain("[WALC公式サイト一覧]");
		expect(llms).toMatch(/\$\{ORIGIN\}\/official-sites/);
	});
});

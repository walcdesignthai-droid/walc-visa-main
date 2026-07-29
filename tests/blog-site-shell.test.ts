import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("blog site shell", () => {
	it("renders the shared header and footer exactly once in the blog layout", async () => {
		const layout = await read("app/blog/layout.tsx");

		expect(layout).toContain(
			'import { Footer } from "@/components/shared/Footer";',
		);
		expect(layout).toContain(
			'import { Header } from "@/components/shared/Header";',
		);
		expect(layout.match(/<Header \/>/g)).toHaveLength(1);
		expect(layout.match(/<Footer \/>/g)).toHaveLength(1);
	});

	it("keeps the blog theme scoped to content below the fixed header", async () => {
		const layout = await read("app/blog/layout.tsx");

		expect(layout).toContain("flex-1 pt-16 md:pt-20");
		expect(layout.indexOf("<Header />")).toBeLessThan(
			layout.indexOf("className={`vb-theme"),
		);
		expect(layout.indexOf("className={`vb-theme")).toBeLessThan(
			layout.indexOf("<Footer />"),
		);
	});

	it("does not duplicate the shared shell in individual blog pages", async () => {
		const [indexPage, articlePage] = await Promise.all([
			read("app/blog/page.tsx"),
			read("app/blog/[slug]/page.tsx"),
		]);

		for (const page of [indexPage, articlePage]) {
			expect(page).not.toContain("@/components/shared/Header");
			expect(page).not.toContain("@/components/shared/Footer");
			expect(page).not.toContain("<Header />");
			expect(page).not.toContain("<Footer />");
		}
	});
});

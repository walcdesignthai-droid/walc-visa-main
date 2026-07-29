import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	CONDITIONAL_PUBLIC_ROUTES,
	getIndexableConditionalRoutes,
	renderConditionalLlmsLinks,
} from "../lib/walc-data/publication-state";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("conditional public route state", () => {
	it("keeps the draft immigration page out of indexable and AI manifests", () => {
		const immigration = CONDITIONAL_PUBLIC_ROUTES.find(
			(route) => route.id === "immigration-support",
		);

		expect(immigration?.published).toBe(false);
		expect(getIndexableConditionalRoutes()).toEqual([]);
		expect(
			renderConditionalLlmsLinks("https://walc-visa.online"),
		).not.toContain("/immigration-support");
	});

	it("adds a route to both outputs after an explicit publication-state change", () => {
		const publishedRoutes = CONDITIONAL_PUBLIC_ROUTES.map((route) => ({
			...route,
			published: true,
		}));

		expect(getIndexableConditionalRoutes(publishedRoutes)).toHaveLength(1);
		expect(
			renderConditionalLlmsLinks("https://walc-visa.online", publishedRoutes),
		).toContain(
			"[入国・イミグレ緊急サポート](https://walc-visa.online/immigration-support)",
		);
	});

	it("uses the same registry for page metadata, sitemap, and llms.txt", async () => {
		const [data, sitemap, llms] = await Promise.all([
			read("app/immigration-support/data.ts"),
			read("app/sitemap.ts"),
			read("app/llms.txt/route.ts"),
		]);

		expect(data).toContain("IMMIGRATION_SUPPORT_PUBLICATION.published");
		expect(sitemap).toContain("getIndexableConditionalRoutes");
		expect(llms).toContain("renderConditionalLlmsLinks");
	});
});

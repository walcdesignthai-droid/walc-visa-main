import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildBlogIndexStructuredData } from "../lib/blog/index-structured-data";

const ROOT = resolve(import.meta.dirname, "..");
const BLOG_URL = "https://walc-visa.online/blog";
const ARTICLES = [
	{ slug: "published-one", h1: "公開記事 1", draft: false },
	{ slug: "hidden-draft", h1: "非公開記事", draft: true },
	{ slug: "published-two", h1: "公開記事 2", draft: false },
] as const;
const PUBLISHED_ARTICLES = ARTICLES.filter((article) => !article.draft);

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("blog index structured data", () => {
	it("builds a connected CollectionPage and ItemList graph", () => {
		const schema = buildBlogIndexStructuredData(ARTICLES);
		const collection = schema["@graph"].find(
			(node) => node["@type"] === "CollectionPage",
		);
		const itemList = schema["@graph"].find(
			(node) => node["@type"] === "ItemList",
		);

		expect(collection).toMatchObject({
			"@id": `${BLOG_URL}#webpage`,
			url: BLOG_URL,
			inLanguage: "ja-JP",
			isPartOf: { "@id": "https://walc-visa.online/#website" },
			mainEntity: { "@id": `${BLOG_URL}#article-list` },
			publisher: { "@id": "https://walc-visa.online/#organization" },
		});
		expect(itemList).toMatchObject({
			"@id": `${BLOG_URL}#article-list`,
			numberOfItems: PUBLISHED_ARTICLES.length,
		});
	});

	it("lists every published article once with canonical URLs and stable positions", () => {
		const schema = buildBlogIndexStructuredData(ARTICLES);
		const itemList = schema["@graph"].find(
			(node) => node["@type"] === "ItemList",
		);
		const expected = PUBLISHED_ARTICLES.map((article, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: `${BLOG_URL}/${article.slug}`,
			name: article.h1,
		}));

		expect(itemList?.itemListElement).toEqual(expected);
		expect(new Set(expected.map((item) => item.url)).size).toBe(
			expected.length,
		);
	});

	it("excludes every fail-closed draft and unsupported promotional schema", () => {
		const serialized = JSON.stringify(buildBlogIndexStructuredData(ARTICLES));
		const drafts = ARTICLES.filter((article) => article.draft);

		expect(drafts.length).toBeGreaterThan(0);
		for (const article of drafts) {
			expect(serialized).not.toContain(article.slug);
		}
		expect(serialized).not.toMatch(
			/Offer|AggregateRating|Review|FAQPage|price|THB|成功率|保証/,
		);
	});

	it("renders one collection graph alongside the breadcrumb graph", async () => {
		const page = await read("app/blog/page.tsx");

		expect(page.match(/<JsonLdScript/g)).toHaveLength(2);
		expect(page).toContain("buildBlogIndexStructuredData");
		expect(page).toContain(
			"<JsonLdScript data={buildBlogIndexStructuredData(PUBLISHED_ARTICLES)} />",
		);
	});
});

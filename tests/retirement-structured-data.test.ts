import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildRetirementWebPageSchema } from "@/lib/walc-data/retirement-structured-data";

const ROOT = resolve(import.meta.dirname, "..");
const RETIREMENT_URL = "https://walc-visa.online/visas/retirement";

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("retirement page structured data", () => {
	it("builds a connected non-promotional WebPage graph", () => {
		const schema = buildRetirementWebPageSchema();
		const serialized = JSON.stringify(schema);

		expect(schema).toMatchObject({
			"@context": "https://schema.org",
			"@type": "WebPage",
			"@id": `${RETIREMENT_URL}#webpage`,
			url: RETIREMENT_URL,
			inLanguage: "ja-JP",
			breadcrumb: { "@id": `${RETIREMENT_URL}#breadcrumb` },
			isPartOf: { "@id": "https://walc-visa.online/#website" },
			about: { "@id": "https://walc-visa.online/#organization" },
		});
		expect(serialized).not.toMatch(
			/Offer|AggregateRating|Review|price|THB|成功率|保証/,
		);
	});

	it("renders one WebPage script and one identified breadcrumb script", async () => {
		const [page, breadcrumb] = await Promise.all([
			read("app/visas/retirement/page.tsx"),
			read("components/seo/BreadcrumbJsonLd.tsx"),
		]);

		expect(page.match(/<JsonLdScript/g)).toHaveLength(1);
		expect(page.match(/<BreadcrumbJsonLd/g)).toHaveLength(1);
		expect(page).toContain("buildRetirementWebPageSchema");
		expect(page).toContain('id={`${RETIREMENT_URL}#breadcrumb`}');
		expect(breadcrumb).toContain("id?: string");
		expect(breadcrumb).toContain('...(id ? { "@id": id } : {})');
	});

	it("preserves fail-closed schema suppression for paused immigration support", async () => {
		const [data, page] = await Promise.all([
			read("app/immigration-support/data.ts"),
			read("app/immigration-support/page.tsx"),
		]);

		expect(data).toContain("export const DRAFT = true");
		expect(page).toContain("{!DRAFT && (");
	});
});

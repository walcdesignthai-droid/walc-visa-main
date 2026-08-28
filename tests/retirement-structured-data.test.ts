import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildRetirementStructuredData } from "../lib/walc-data/retirement-structured-data";

const ROOT = resolve(import.meta.dirname, "..");
const RETIREMENT_URL = "https://walc-visa.online/visas/retirement";

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("retirement page structured data", () => {
	it("builds a connected non-promotional WebPage graph", () => {
		const schema = buildRetirementStructuredData();
		const serialized = JSON.stringify(schema);
		const nodes = schema["@graph"];
		const organization = nodes.find(
			(node) => node["@id"] === "https://walc-visa.online/#organization",
		);
		const website = nodes.find(
			(node) => node["@id"] === "https://walc-visa.online/#website",
		);
		const webpage = nodes.find(
			(node) => node["@id"] === `${RETIREMENT_URL}#webpage`,
		);
		const service = nodes.find(
			(node) => node["@id"] === `${RETIREMENT_URL}#service`,
		);

		expect(schema["@context"]).toBe("https://schema.org");
		expect(organization).toMatchObject({
			"@type": "Organization",
			url: "https://walc-visa.online",
		});
		expect(website).toMatchObject({
			"@type": "WebSite",
			publisher: { "@id": "https://walc-visa.online/#organization" },
		});
		expect(webpage).toMatchObject({
			"@type": "WebPage",
			"@id": `${RETIREMENT_URL}#webpage`,
			url: RETIREMENT_URL,
			inLanguage: "ja-JP",
			breadcrumb: { "@id": `${RETIREMENT_URL}#breadcrumb` },
			isPartOf: { "@id": "https://walc-visa.online/#website" },
			publisher: { "@id": "https://walc-visa.online/#organization" },
			mainEntity: { "@id": `${RETIREMENT_URL}#service` },
			about: {
				"@type": "Thing",
				name: "タイのリタイアメントVISA（Non-Immigrant O）",
			},
		});
		expect(service).toMatchObject({
			"@type": "Service",
			provider: { "@id": "https://walc-visa.online/#organization" },
			mainEntityOfPage: { "@id": `${RETIREMENT_URL}#webpage` },
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
		expect(page).toContain("buildRetirementStructuredData");
		expect(page).toContain("id={`$" + "{RETIREMENT_URL}#breadcrumb`}");
		expect(breadcrumb).toContain("id?: string");
		expect(breadcrumb).toContain('...(id ? { "@id": id } : {})');
	});

	it("preserves fail-closed schema suppression for paused immigration support", async () => {
		const [data, page, publicationState] = await Promise.all([
			read("app/immigration-support/data.ts"),
			read("app/immigration-support/page.tsx"),
			read("lib/walc-data/publication-state.ts"),
		]);

		expect(data).toContain(
			"export const DRAFT = !IMMIGRATION_SUPPORT_PUBLICATION.published",
		);
		expect(publicationState).toContain("published: false");
		expect(page).toContain("{!DRAFT && (");
	});
});

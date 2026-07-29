import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
	buildLtrStructuredData,
	LTR_OFFICIAL_SOURCES,
	LTR_URL,
} from "../lib/walc-data/ltr-structured-data";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("LTR page structured data", () => {
	it("builds a connected WebPage and Service graph", () => {
		const schema = buildLtrStructuredData();
		const graph = schema["@graph"];
		const webPage = graph.find((node) => node["@type"] === "WebPage");
		const service = graph.find((node) => node["@type"] === "Service");

		expect(webPage).toMatchObject({
			"@id": `${LTR_URL}#webpage`,
			url: LTR_URL,
			inLanguage: "ja-JP",
			isPartOf: { "@id": "https://walc-visa.online/#website" },
			breadcrumb: { "@id": `${LTR_URL}#breadcrumb` },
			mainEntity: { "@id": `${LTR_URL}#service` },
			reviewedBy: {
				"@id": "https://walc-visa.online/author/yosuke-onodera#person",
				name: "Yosuke Onodera",
			},
		});
		expect(service).toMatchObject({
			"@id": `${LTR_URL}#service`,
			url: LTR_URL,
			provider: { "@id": "https://walc-visa.online/#organization" },
			areaServed: { "@type": "Country", name: "Thailand" },
		});
	});

	it("cites only the three visible official BOI sources", () => {
		const schema = buildLtrStructuredData();
		const webPage = schema["@graph"].find(
			(node) => node["@type"] === "WebPage",
		);

		expect(LTR_OFFICIAL_SOURCES).toHaveLength(3);
		expect(webPage?.citation).toEqual(
			LTR_OFFICIAL_SOURCES.map((source) => ({
				"@type": "CreativeWork",
				name: source.label,
				url: source.href,
			})),
		);
		for (const source of LTR_OFFICIAL_SOURCES) {
			expect(new URL(source.href).hostname).toBe("ltr.boi.go.th");
		}
	});

	it("does not publish promotional or unsupported schema claims", () => {
		const serialized = JSON.stringify(buildLtrStructuredData());

		expect(serialized).not.toMatch(
			/Offer|AggregateRating|Review|price|THB|成功率|保証/,
		);
	});

	it("renders one page graph plus an identified breadcrumb graph", async () => {
		const [page, breadcrumb] = await Promise.all([
			read("app/visas/ltr/page.tsx"),
			read("components/seo/BreadcrumbJsonLd.tsx"),
		]);

		expect(page.match(/<JsonLdScript/g)).toHaveLength(1);
		expect(page.match(/<BreadcrumbJsonLd/g)).toHaveLength(1);
		expect(page).toContain("buildLtrStructuredData");
		expect(page).toContain("id={`$" + "{LTR_URL}#breadcrumb`}");
		expect(breadcrumb).toContain("id?: string");
		expect(breadcrumb).toContain('...(id ? { "@id": id } : {})');
	});
});

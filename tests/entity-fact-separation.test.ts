import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("public entity fact separation", () => {
	it("keeps business start and legal incorporation as separate canonical facts", async () => {
		const eeat = await read("lib/walc-data/eeat.ts");

		expect(eeat).toContain('businessStartedAt: "2020"');
		expect(eeat).toContain('businessStartedDisplay: "2020年"');
		expect(eeat).toContain('foundingDate: "2021-08-27"');
		expect(eeat).toContain('incorporatedDisplay: "2021年8月27日"');
	});

	it("renders owner experience and organization dates from canonical objects", async () => {
		const componentPaths = [
			"components/lp/Hero.tsx",
			"components/lp/TrustStrip.tsx",
			"components/lp/WhyWalc.tsx",
			"components/lp/Founder.tsx",
			"components/lp/TroubleSupport.tsx",
			"components/lp/CompanyInfo.tsx",
			"components/seo/StructuredData.tsx",
			"lib/walc-data/structured-data.ts",
			"lib/concierge/system-prompt.ts",
		];
		const sources = await Promise.all(componentPaths.map(read));
		const combined = sources.join("\n");

		expect(combined).toContain("WALC_AUTHOR.experience.thailandResidency");
		expect(combined).toContain("WALC_AUTHOR.experience.visaSupport");
		expect(combined).toContain("WALC_ORGANIZATION.businessStartedDisplay");
		expect(combined).toContain("WALC_ORGANIZATION.incorporatedDisplay");
		expect(combined).toContain("WALC_ORGANIZATION.foundingDate");
	});

	it("does not collapse distinct facts into an unsupported six-year claim", async () => {
		const componentPaths = [
			"components/lp/Hero.tsx",
			"components/lp/TrustStrip.tsx",
			"components/lp/WhyWalc.tsx",
			"components/lp/Founder.tsx",
			"components/lp/TroubleSupport.tsx",
			"components/lp/Process.tsx",
			"components/lp/CompanyInfo.tsx",
			"lib/concierge/system-prompt.ts",
		];
		const sources = await Promise.all(componentPaths.map(read));

		for (const source of sources) {
			expect(source).not.toMatch(/現地法人\s*6\s*年/);
			expect(source).not.toMatch(/タイ拠点\s*6\s*年/);
			expect(source).not.toMatch(/バンコク拠点\s*6\s*年/);
			expect(source).not.toMatch(/最大\s*6\s*年間のリレーション/);
		}
	});

	it("keeps the homepage graph tied to the legal incorporation canon", async () => {
		const structuredData = await read("lib/walc-data/structured-data.ts");

		expect(structuredData).toContain(
			"foundingDate: WALC_ORGANIZATION.foundingDate",
		);
		expect(structuredData).not.toContain('foundingDate: "2021-08-27"');
	});
});

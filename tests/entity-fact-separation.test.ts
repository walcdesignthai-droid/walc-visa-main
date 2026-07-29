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
		expect(eeat).toContain('businessStartedDisplay: "2020年 タイ事業開始"');
		expect(eeat).toContain('foundingDate: "2021-08-27"');
		expect(eeat).toContain(
			'incorporatedDisplay: "2021年8月27日 法人設立"',
		);
	});

	it("renders owner experience and organization dates from canonical objects", async () => {
		const componentPaths = [
			"components/lp/TrustStrip.tsx",
			"components/lp/WhyWalc.tsx",
			"components/lp/Founder.tsx",
			"components/lp/TroubleSupport.tsx",
			"components/lp/CompanyInfo.tsx",
		];
		const sources = await Promise.all(componentPaths.map(read));
		const combined = sources.join("\n");

		expect(combined).toContain("WALC_AUTHOR.experience.thailandResidency");
		expect(combined).toContain("WALC_AUTHOR.experience.visaSupport");
		expect(combined).toContain("WALC_ORGANIZATION.businessStartedDisplay");
		expect(combined).toContain("WALC_ORGANIZATION.incorporatedDisplay");
	});

	it("does not collapse distinct facts into an unsupported six-year claim", async () => {
		const componentPaths = [
			"components/lp/TrustStrip.tsx",
			"components/lp/WhyWalc.tsx",
			"components/lp/Founder.tsx",
			"components/lp/TroubleSupport.tsx",
			"components/lp/Process.tsx",
			"components/lp/CompanyInfo.tsx",
		];
		const sources = await Promise.all(componentPaths.map(read));

		for (const source of sources) {
			expect(source).not.toMatch(/現地法人\s*6\s*年/);
			expect(source).not.toMatch(/タイ拠点\s*6\s*年/);
			expect(source).not.toMatch(/最大\s*6\s*年間のリレーション/);
		}
	});
});

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("WALC VISA public content consistency", () => {
	it("uses the shared public content API with a verified fallback", async () => {
		const source = await read("lib/walc-data/public-content.ts");

		expect(source).toContain(
			"https://crm.walc-visa.online/api/v1/public/content",
		);
		expect(source).toContain('display: "200件以上"');
		expect(source).toContain('consultationUrl: "https://lin.ee/PGFYVNZ"');
		expect(source).toContain("next: { revalidate: 60 }");
	});

	it("does not publish the obsolete 212/212 claim on the main landing page", async () => {
		const sources = await Promise.all(
			[
				"components/lp/Hero.tsx",
				"components/lp/TrustStrip.tsx",
				"components/lp/WhyWalc.tsx",
				"components/lp/Founder.tsx",
				"components/seo/StructuredData.tsx",
			].map(read),
		);

		for (const source of sources) {
			expect(source).not.toMatch(/\b212\b/);
		}
	});

	it("routes the two primary application CTAs to the shared LINE consultation URL", async () => {
		const hero = await read("components/lp/Hero.tsx");
		const finalCta = await read("components/lp/FinalCta.tsx");

		expect(hero).toContain("content.consultationUrl");
		expect(finalCta).toContain("content.consultationUrl");
		expect(hero).not.toContain("buildApplicationUrl");
		expect(finalCta).not.toContain("buildApplicationUrl");
	});

	it("does not retain the removed CRM application path as a production fallback", async () => {
		const links = await read("lib/walc-links.ts");

		expect(links).not.toContain("https://crm.walc-visa.online/apply");
	});
});

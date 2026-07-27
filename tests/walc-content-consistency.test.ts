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

	it("keeps the header logo as a single valid home link for hydration", async () => {
		const header = await read("components/shared/Header.tsx");

		expect(header).not.toContain('<Link href="/" className="shrink-0">');
		expect(header).toContain('<WalcLogo className="shrink-0" />');
	});

	it("does not retain the removed CRM application path as a production fallback", async () => {
		const links = await read("lib/walc-links.ts");

		expect(links).not.toContain("https://crm.walc-visa.online/apply");
	});

	it("keeps the AI concierge on the shared content and current model fallback", async () => {
		const [route, provider, prompt] = await Promise.all([
			read("app/api/concierge/route.ts"),
			read("lib/concierge/provider.ts"),
			read("lib/concierge/system-prompt.ts"),
		]);

		expect(route).toContain("getDtvPublicContent");
		expect(route).toContain("conciergeGenerateStream");
		expect(provider).toContain("google/gemini-3.6-flash");
		expect(provider).toContain("anthropic/claude-sonnet-5");
		expect(prompt).toContain("dtvContent.trackRecord.display");
		expect(prompt).not.toMatch(/\b212\b/);
		expect(prompt).not.toContain("取得率 100%");
	});

	it("prefers Vercel's deployment OIDC token over a legacy gateway key", async () => {
		const provider = await read("lib/concierge/provider.ts");
		const oidcToken = provider.indexOf("options.gatewayToken");
		const legacyKey = provider.indexOf("process.env.AI_GATEWAY_API_KEY");

		expect(oidcToken).toBeGreaterThan(-1);
		expect(legacyKey).toBeGreaterThan(-1);
		expect(oidcToken).toBeLessThan(legacyKey);
	});

	it("excludes superseded sales claims from the generated AI knowledge", async () => {
		const knowledge = await read("lib/concierge/knowledge.ts");

		expect(knowledge).toContain("新規受付を一時停止");
		expect(knowledge).toContain("DTV取得者限定");
		expect(knowledge).not.toMatch(/\b212\b/);
		expect(knowledge).not.toContain("取得率100%");
		expect(knowledge).not.toContain("DTVでは銀行口座を開設できなくなりました");
		expect(knowledge).not.toContain("空港サポート必須");
	});
});

import { readdir, readFile } from "node:fs/promises";
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
		const [route, provider, prompt, authority] = await Promise.all([
			read("app/api/concierge/route.ts"),
			read("lib/concierge/provider.ts"),
			read("lib/concierge/system-prompt.ts"),
			read("lib/walc-data/dtv-authority.ts"),
		]);

		expect(route).toContain("getDtvPublicContent");
		expect(route).toContain("conciergeGenerateStream");
		expect(provider).toContain("google/gemini-3.6-flash");
		expect(provider).toContain("anthropic/claude-sonnet-5");
		expect(prompt).toContain("dtvContent.trackRecord.display");
		expect(prompt).not.toMatch(/\b212\b/);
		expect(authority).toContain("2025年4月の大幅な制度変更以降");
		expect(authority).toContain("申請通過率100%");
		expect(authority).toContain("オンライン面談通過率100%");
		expect(authority).toContain("タイ在住13年");
		expect(prompt).toContain("DTV_AUTHORITY.application");
		expect(prompt).toContain("DTV_AUTHORITY.interview");
		expect(prompt).not.toContain("バンコク在住 10 年以上");
	});

	it("prefers Vercel's deployment OIDC token over a legacy gateway key", async () => {
		const provider = await read("lib/concierge/provider.ts");
		const oidcToken = provider.indexOf("options.gatewayToken");
		const legacyKey = provider.indexOf("process.env.AI_GATEWAY_API_KEY");

		expect(oidcToken).toBeGreaterThan(-1);
		expect(legacyKey).toBeGreaterThan(-1);
		expect(oidcToken).toBeLessThan(legacyKey);
	});

	it("returns current official facts instead of a raw provider error", async () => {
		const [route, fallback] = await Promise.all([
			read("app/api/concierge/route.ts"),
			read("lib/concierge/fallback.ts"),
		]);

		expect(route).toContain("buildConciergeFallback");
		expect(fallback).toContain("content.trackRecord.display");
		expect(fallback).toContain("content.pricing");
		expect(fallback).toContain("DTV_AUTHORITY.application");
		expect(fallback).toContain("DTV_AUTHORITY.interview");
		expect(fallback).toContain("Non-B");
		expect(fallback).toContain("オーバーステイ");
		expect(fallback).toContain("新規受付を一時停止");
		expect(fallback).toContain("[CTA:line]");
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

	it("publishes one explicit DTV fee contract across the main site and AI", async () => {
		const [content, pricing, visaTypes, prompt, fallback, structured] =
			await Promise.all([
				read("lib/walc-data/public-content.ts"),
				read("lib/walc-data/pricing.ts"),
				read("components/lp/VisaTypes.tsx"),
				read("lib/concierge/system-prompt.ts"),
				read("lib/concierge/fallback.ts"),
				read("components/seo/StructuredData.tsx"),
			]);
		const combined = `${visaTypes}\n${prompt}\n${fallback}\n${structured}`;

		expect(content).toContain("supportFeeIncludesGovernmentFee");
		expect(content).toContain("governmentFee");
		expect(content).toContain("reviewedAt");
		expect(content).toContain("supportFeeIncludesGovernmentFee: true");
		expect(content).toContain("includedInDisplayedPrice: true");
		expect(content).toContain("includedItems");
		expect(
			pricing.match(
				/id: "dtv-(?:soft-power|nomad|freelance)"[\s\S]{0,220}?govFeeIncluded: true/g,
			),
		).toHaveLength(3);
		expect(combined).toContain("content.fees");
		expect(combined).toContain("タイ大使館・領事館");
		expect(combined).not.toContain("直接支払い");
		expect(combined).not.toContain("申請費用は含まれません");
	});

	it("keeps home structured data page-specific and linked", async () => {
		const [layout, page, structured] = await Promise.all([
			read("app/layout.tsx"),
			read("app/page.tsx"),
			read("components/seo/StructuredData.tsx"),
		]);

		expect(layout).not.toContain("<StructuredData");
		expect(page).toContain("<MainStructuredData content={content}");
		expect(structured).toContain('"@graph"');
		expect(structured).toContain('"@id"');
		expect(structured).not.toContain("https://crm.walc-visa.online");
	});

	it("keeps crawlable assets and truthful sitemap dates", async () => {
		const [robots, sitemap] = await Promise.all([
			read("app/robots.ts"),
			read("app/sitemap.ts"),
		]);

		expect(robots).not.toContain('"/_next/"');
		expect(sitemap).toContain("CORE_CONTENT_LAST_MODIFIED");
		expect(sitemap).not.toContain("new Date()");
	});

	it("uses Markdown links and fee semantics in llms.txt", async () => {
		const llms = await read("app/llms.txt/route.ts");

		expect(llms).toContain("[DTV専門サイト]");
		expect(llms).toContain("[LINE無料相談]");
		expect(llms).toContain("content.fees");
	});

	it("publishes included-fee copy and links DTV articles to the specialist site", async () => {
		const [pillar, comparison, articlePage] = await Promise.all([
			read("lib/blog/dtv-pillar.ts"),
			read("lib/blog/dtv-diy-vs-agency.ts"),
			read("app/blog/[slug]/page.tsx"),
		]);

		expect(`${pillar}\n${comparison}`).toContain(
			"VERIFIED_DTV_FALLBACK.fees.summary",
		);
		expect(articlePage).toContain('article.tags?.includes("DTV")');
		expect(articlePage).toContain("SITE_URLS.dtv");
	});

	it("keeps articles with pending primary sources out of the public index", async () => {
		const blogDir = resolve(ROOT, "lib/blog");
		const files = (await readdir(blogDir)).filter((file) =>
			file.endsWith(".ts"),
		);
		const pendingArticles: string[] = [];

		for (const file of files) {
			const source = await read(`lib/blog/${file}`);
			if (source.includes("primaryPending: true")) {
				pendingArticles.push(file);
				expect(source).toContain("draft: true");
				expect(source).not.toContain("draft: false");
			}
		}

		expect(pendingArticles.sort()).toEqual([
			"marriage-visa-thailand.ts",
			"retirement-health-insurance.ts",
			"thailand-bank-account.ts",
		]);

		const [registry, sitemap, articlePage] = await Promise.all([
			read("lib/blog/registry.ts"),
			read("app/sitemap.ts"),
			read("app/blog/[slug]/page.tsx"),
		]);
		expect(registry).toContain("ALL_ARTICLES.filter");
		expect(registry).toContain("!a.draft");
		expect(sitemap).toContain("PUBLISHED_ARTICLES");
		expect(articlePage).toContain("!article.draft");
	});

	it("keeps the Bangkok immigration guide indexable with official access sources", async () => {
		const article = await read("lib/blog/immigration-office-bangkok.ts");

		expect(article).toContain("draft: false");
		expect(article).not.toContain("primaryPending: true");
		expect(article).toContain("https://www.mrta.co.th/en/the-pink-line");
		expect(article).toContain(
			"https://www.governmentcomplex.com/detail.php?p=ldHV4Tar",
		);
		expect(article).toContain(
			"https://nbm.co.th/assets/pdf/PK_SystemMap_03.pdf",
		);
		expect(article).not.toContain('"バス:');
	});

	it("retires the obsolete public payments endpoint with a permanent gone response", async () => {
		const paymentsRoute = await read("app/payments/route.ts");

		expect(paymentsRoute).toContain("status: 410");
		expect(paymentsRoute).toContain('"X-Robots-Tag": "noindex, nofollow"');
		expect(paymentsRoute).toContain('"Cache-Control": "no-store"');
	});
});

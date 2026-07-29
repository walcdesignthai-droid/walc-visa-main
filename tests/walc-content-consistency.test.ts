import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import type { DtvPublicContent } from "../lib/walc-data/public-content";
import { buildMainStructuredDataGraph } from "../lib/walc-data/structured-data";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

const DTV_CONTENT_FIXTURE = {
	trackRecord: {
		display: "200件以上",
		label: "DTV申請通過実績",
		scope: "WALC VISA Consultingの申請サポート実績",
		disclaimer: "過去の実績であり、将来の取得を保証するものではありません。",
	},
	pricing: [
		{
			id: "softpower",
			name: "タイソフトパワー",
			audience: "タイ文化活動を目的とする方",
			priceThb: 60_000,
			includedItems: ["申請費用", "書類作成サポート"],
		},
		{
			id: "nomad",
			name: "ワーケーション（ノマド・会社員）",
			audience: "海外企業の仕事をタイから行う方",
			priceThb: 45_000,
			includedItems: ["申請費用", "書類作成サポート"],
		},
		{
			id: "freelance",
			name: "ワーケーション（フリーランス）",
			audience: "海外顧客との実績を証明できる方",
			priceThb: 48_000,
			includedItems: ["申請費用", "書類作成サポート"],
		},
	],
	fees: {
		summary: "表示料金は申請費用を含む総額です。",
	},
	consultationUrl: "https://lin.ee/PGFYVNZ",
} as DtvPublicContent;

describe("WALC VISA public content consistency", () => {
	it("publishes structured offers only for valid public destinations", () => {
		const graph = buildMainStructuredDataGraph(DTV_CONTENT_FIXTURE);
		const service = graph["@graph"].find(
			(node) => node["@id"] === "https://walc-visa.online/#visa-consulting",
		);

		expect(service).toBeDefined();
		if (!service || !("offers" in service)) {
			throw new Error("VISA service offers were not published");
		}

		const offers = service.offers as Array<{ url: string }>;
		expect(offers.map((offer) => offer.url)).toEqual(
			expect.arrayContaining([
				"https://dtv.walc-visa.online",
				"https://walc-visa.online/visas/retirement",
				"https://walc-visa.online/visas/ltr",
			]),
		);
		expect(offers.map((offer) => offer.url)).not.toContain(
			"https://walc-visa.online/visas/privilege",
		);

		const graphText = JSON.stringify(graph);
		expect(graphText).toContain("https://dtv.walc-visa.online");
		expect(graphText).not.toContain("https://walc-consulting.com");
	});

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
		const [layout, page, component, structured] = await Promise.all([
			read("app/layout.tsx"),
			read("app/page.tsx"),
			read("components/seo/StructuredData.tsx"),
			read("lib/walc-data/structured-data.ts"),
		]);

		expect(layout).not.toContain("<StructuredData");
		expect(page).toContain("<MainStructuredData content={content}");
		expect(component).toContain("buildMainStructuredDataGraph(content)");
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
		expect(articlePage).toContain("PUBLISHED_ARTICLES.map");
		expect(articlePage).toContain("if (!article || article.draft) return {};");
		expect(articlePage).toContain("if (!article || article.draft) notFound();");
	});

	it("uses official reference hosts in every indexable VISA article", async () => {
		const officialHosts = new Set([
			"bangkok.immigration.go.th",
			"eworkpermit.doe.go.th",
			"image.mfa.go.th",
			"immigration.go.th",
			"ltr.boi.go.th",
			"nbm.co.th",
			"phitsanulok.immigration.go.th",
			"tdac.immigration.go.th",
			"tm47.immigration.go.th",
			"www.boi.go.th",
			"www.doe.go.th",
			"www.governmentcomplex.com",
			"www.immigration.go.th",
			"www.mfa.go.th",
			"www.mol.go.th",
			"www.mrta.co.th",
			"www.rd.go.th",
			"www.thaievisa.go.th",
			"www.thailand.go.th",
			"www.thailandprivilege.co.th",
		]);
		const blogDir = resolve(ROOT, "lib/blog");
		const files = (await readdir(blogDir)).filter((file) =>
			file.endsWith(".ts"),
		);
		const secondaryReferences: string[] = [];
		let publishedSource = "";

		for (const file of files) {
			const source = await read(`lib/blog/${file}`);
			if (!/^\s*draft:\s*false,/m.test(source)) continue;

			publishedSource += source;
			for (const match of source.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)) {
				const url = match[1];
				if (!officialHosts.has(new URL(url).hostname)) {
					secondaryReferences.push(`${file}: ${url}`);
				}
			}
		}

		expect(secondaryReferences).toEqual([]);
		expect(publishedSource).not.toContain("2026年7月28日");
		expect(publishedSource).not.toContain("fragomen.com");
		expect(publishedSource).not.toContain("pcecnews.com");
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
		expect(article).toContain(
			"https://tm47.immigration.go.th/manual/IndexForeign.html",
		);
		expect(article).toContain(
			"https://phitsanulok.immigration.go.th/en/e-extension-online-application-for-temporary-stay-extension-in-3-minutes/",
		);
		expect(article).not.toContain('"バス:');
		expect(article).not.toContain("初回の届出は本人または代理人");
		expect(article).not.toContain(
			"再入国許可の窓口は受付時間が一般窓口と異なる",
		);
		expect(article).not.toContain("平日 10:30–18:30");
	});

	it("retires the obsolete public payments endpoint with a permanent gone response", async () => {
		const paymentsRoute = await read("app/payments/route.ts");

		expect(paymentsRoute).toContain("status: 410");
		expect(paymentsRoute).toContain('"X-Robots-Tag": "noindex, nofollow"');
		expect(paymentsRoute).toContain('"Cache-Control": "no-store"');
	});

	it("publishes a source-backed Thailand visa agent selection guide", async () => {
		const [page, ogImage, sitemap, llms, footer] = await Promise.all([
			read("app/guides/how-to-choose-thailand-visa-agent/page.tsx"),
			read("app/guides/how-to-choose-thailand-visa-agent/opengraph-image.tsx"),
			read("app/sitemap.ts"),
			read("app/llms.txt/route.ts"),
			read("components/shared/Footer.tsx"),
		]);

		expect(page).toContain("タイのビザ代行会社を選ぶ7つの基準");
		expect(page).toContain("https://www.thaievisa.go.th/");
		expect(page).toContain("https://fukuoka.thaiembassy.org/en/page/endtvvisa");
		expect(page).toContain(
			"https://www.mfa.go.th/en/page/non-immigrant-visa-b?menu=5e1ff6f857b01e00a84023d4",
		);
		expect(page).toContain("https://eworkpermit.doe.go.th/");
		expect(page).toContain('"@type": "WebPage"');
		expect(page).toContain('"@type": "ItemList"');
		expect(page).toContain("citation:");
		expect(page).toContain("<BreadcrumbJsonLd");
		expect(page).toContain("WALC_AUTHOR");
		expect(page).toContain("2026-07-29");
		expect(page).toContain("WALC VISAが候補になりやすい相談");
		expect(page).toContain('"/reviews/transparency"');
		expect(page).toContain('"/official-sites"');
		expect(page).toContain('href: "/visas/non-b-work-permit"');
		expect(page).not.toContain("href: SITE_URLS.guideBusiness");
		expect(page).not.toContain("AggregateRating");
		expect(page).not.toContain('"@type": "Review"');
		expect(page).not.toMatch(/絶対|必ず取れる|No\\.?1|業界一/);
		expect(page).not.toContain("text-slate-500");
		expect(page).not.toContain("bg-line px-7 py-3.5 font-bold text-white");
		expect(page).toContain("bg-line px-7 py-3.5 font-bold text-brand-deep");
		expect(ogImage).toContain("タイのビザ代行会社");
		expect(ogImage).toContain("選ぶ7つの基準");
		expect(ogImage).toContain("width: 1200");
		expect(ogImage).toContain("height: 630");

		const path = "/guides/how-to-choose-thailand-visa-agent";
		expect(sitemap).toContain(path);
		expect(llms).toContain(path);
		expect(footer).toContain(path);
	});

	it("publishes a first-party Non-B and Work Permit service route", async () => {
		const [page, data, navigation, footer, sitemap, llms] = await Promise.all([
			read("app/visas/non-b-work-permit/page.tsx"),
			read("lib/walc-data/non-b-work-permit.ts"),
			read("lib/walc-data/site-map.ts"),
			read("components/shared/Footer.tsx"),
			read("app/sitemap.ts"),
			read("app/llms.txt/route.ts"),
		]);

		expect(page).toContain("<Header />");
		expect(page).toContain("<Footer />");
		expect(page).toContain('"@type": "Service"');
		expect(page).toContain('"@type": "FAQPage"');
		expect(page).toContain('canonical: "/visas/non-b-work-permit"');
		expect(page).toContain("SITE_URLS.guideBusiness");
		expect(page).toContain("SITE_URLS.social.line");
		expect(page).not.toMatch(/\d{1,3}(?:,\d{3})*\s*THB/);
		expect(page).not.toMatch(/取得を保証|必ず取得|成功率100%/);

		expect(data).toContain("APPLICANT_DOCUMENTS");
		expect(data).toContain("COMPANY_DOCUMENTS");
		expect(data).toContain("WORK_PERMIT_DOCUMENTS");
		expect(data).toContain("NON_B_PRIMARY_SOURCES");
		expect(data).toContain(
			"https://www.mfa.go.th/en/page/non-immigrant-visa-b",
		);
		expect(data).toContain(
			"https://www.doe.go.th/prd/main/downloads/param/site/1/cat/14/sub/0/pull/category/view/list-label/object_id/6062",
		);
		expect(data).toContain('lastReviewed: "2026-07-29"');
		expect(data.match(/group: "company"/g)).toHaveLength(12);
		expect(data).toContain("事業内容や会社・申請者の状況");
		expect(page).toContain("公式一次情報");
		expect(page).toContain("NON_B_PRIMARY_SOURCES.map");
		expect(navigation).toContain(
			'{ href: "/visas/non-b-work-permit", label: "NON-B / WP" }',
		);
		expect(footer).toContain(
			'{ href: "/visas/non-b-work-permit", label: "NON-B / Work Permit" }',
		);
		expect(sitemap).toContain("/visas/non-b-work-permit");
		expect(llms).toContain("[Non-B / Work Permit]");
		expect(llms).toContain("/visas/non-b-work-permit)");
	});
});

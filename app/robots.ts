import type { MetadataRoute } from "next";

/**
 * app/robots.ts
 * ----------------------------------------------------------------------------
 * walc-visa.online の robots.txt を Next.js MetadataRoute から自動生成。
 * ----------------------------------------------------------------------------
 */

const BASE_URL = "https://walc-visa.online";

export default function robots(): MetadataRoute.Robots {
	const aiCrawlerDisallow = ["/api/", "/_next/"];
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/_next/"],
			},
			// AI クローラー(LLMO: 引用獲得目的で明示許可)
			// User-Agent 名は 2026-05 時点で WebSearch verify 済(クローラ名も変化するため要再確認)。
			// OpenAI
			{ userAgent: "GPTBot", allow: "/", disallow: aiCrawlerDisallow }, // training
			{ userAgent: "OAI-SearchBot", allow: "/", disallow: aiCrawlerDisallow }, // search
			{ userAgent: "ChatGPT-User", allow: "/", disallow: aiCrawlerDisallow }, // user
			// Anthropic
			{ userAgent: "ClaudeBot", allow: "/", disallow: aiCrawlerDisallow }, // training
			{ userAgent: "Claude-SearchBot", allow: "/", disallow: aiCrawlerDisallow }, // search
			{ userAgent: "Claude-User", allow: "/", disallow: aiCrawlerDisallow }, // user
			{ userAgent: "anthropic-ai", allow: "/", disallow: aiCrawlerDisallow }, // legacy
			// Perplexity
			{ userAgent: "PerplexityBot", allow: "/", disallow: aiCrawlerDisallow }, // search
			{ userAgent: "Perplexity-User", allow: "/", disallow: aiCrawlerDisallow }, // user
			// Google(Gemini 学習・grounding のオプトイン)
			{ userAgent: "Google-Extended", allow: "/", disallow: aiCrawlerDisallow }, // training
			// TBD(Owner 判断 / 推測で許可しない): Bytespider 等の引用に寄与しない
			// aggressive scraper は明示エントリを置かず、上記 "*" 既定に委ねる。
		],
		sitemap: `${BASE_URL}/sitemap.xml`,
		host: BASE_URL,
	};
}

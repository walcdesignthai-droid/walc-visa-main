import type { MetadataRoute } from "next";
import { articleHref, PUBLISHED_ARTICLES } from "@/lib/blog/registry";

/**
 * app/sitemap.ts
 * ----------------------------------------------------------------------------
 * walc-visa.online の sitemap.xml を Next.js MetadataRoute から自動生成。
 * WI-026: ブログは公開記事(draft:false)のみ掲載(draft は除外)。
 * ----------------------------------------------------------------------------
 */

const BASE_URL = "https://walc-visa.online";
const CORE_CONTENT_LAST_MODIFIED = "2026-07-28";

export default function sitemap(): MetadataRoute.Sitemap {
	const blogEntries: MetadataRoute.Sitemap = PUBLISHED_ARTICLES.map((a) => ({
		url: `${BASE_URL}${articleHref(a.slug)}`,
		lastModified: a.dateModified ?? a.datePublished,
		changeFrequency: "monthly",
		priority: a.kind === "pillar" ? 0.8 : 0.6,
	}));

	return [
		{
			url: `${BASE_URL}/`,
			lastModified: CORE_CONTENT_LAST_MODIFIED,
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `${BASE_URL}/visas/ltr`,
			lastModified: CORE_CONTENT_LAST_MODIFIED,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/visas/retirement`,
			lastModified: CORE_CONTENT_LAST_MODIFIED,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			// WI-031: 著者 / 運営責任者ページ (E-E-A-T)
			url: `${BASE_URL}/author/yosuke-onodera`,
			lastModified: CORE_CONTENT_LAST_MODIFIED,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			// WI-026: ブログ(権威ハブ)一覧
			url: `${BASE_URL}/blog`,
			lastModified: CORE_CONTENT_LAST_MODIFIED,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${BASE_URL}/official-sites`,
			lastModified: CORE_CONTENT_LAST_MODIFIED,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		...blogEntries,
	];
}

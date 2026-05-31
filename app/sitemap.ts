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

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	const blogEntries: MetadataRoute.Sitemap = PUBLISHED_ARTICLES.map((a) => ({
		url: `${BASE_URL}${articleHref(a.slug)}`,
		lastModified: a.dateModified ?? a.datePublished,
		changeFrequency: "monthly",
		priority: a.kind === "pillar" ? 0.8 : 0.6,
	}));

	return [
		{
			url: `${BASE_URL}/`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `${BASE_URL}/visas/ltr`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${BASE_URL}/visas/retirement`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			// WI-031: 著者 / 運営責任者ページ (E-E-A-T)
			url: `${BASE_URL}/author/yosuke-onodera`,
			lastModified: now,
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			// WI-026: ブログ(権威ハブ)一覧
			url: `${BASE_URL}/blog`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		...blogEntries,
	];
}

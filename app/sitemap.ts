import type { MetadataRoute } from "next";

/**
 * app/sitemap.ts
 * ----------------------------------------------------------------------------
 * walc-visa.online の sitemap.xml を Next.js MetadataRoute から自動生成。
 * ----------------------------------------------------------------------------
 */

const BASE_URL = "https://walc-visa.online";

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
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
	];
}

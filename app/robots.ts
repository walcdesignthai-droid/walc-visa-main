import type { MetadataRoute } from "next";

/**
 * app/robots.ts
 * ----------------------------------------------------------------------------
 * walc-visa.online の robots.txt を Next.js MetadataRoute から自動生成。
 * ----------------------------------------------------------------------------
 */

const BASE_URL = "https://walc-visa.online";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/_next/"],
			},
		],
		sitemap: `${BASE_URL}/sitemap.xml`,
		host: BASE_URL,
	};
}

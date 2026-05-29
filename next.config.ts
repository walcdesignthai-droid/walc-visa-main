import type { NextConfig } from "next";

/**
 * 旧 WordPress(Elementor)サイトの indexed URL → 新 Next.js サイトへの 301。
 * WI-018 / 移行後 SEO。Google 索引に残る旧 URL の評価を新ページへ受け渡す。
 *
 * 方針:
 *   - マッピングは推測しない。新サイトに該当ページがある場合のみ該当先へ、
 *     不明・非該当は apex トップ (/) へ集約。
 *   - DTV 関連の旧 URL は DTV 専門サイト (dtv.walc-visa.online) が live のためそこへ。
 *   - statusCode は 301 を明示(Next の permanent:true は 308 になるため)。
 *   - 旧 URL は末尾スラッシュ付きで索引されているため、付き/なし両方を登録。
 */
const LEGACY_REDIRECTS: Array<{ from: string; to: string }> = [
	// DTV 関連 → DTV 専門サイト(live)
	{ from: "/dtv-visa-thailand", to: "https://dtv.walc-visa.online" },
	// 該当ページ未確定 → トップへ集約
	{ from: "/immigrate-thai", to: "/" },
	{ from: "/thaivisa21", to: "/" },
	{ from: "/contact-us", to: "/" },
];

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
		],
	},
	async redirects() {
		return LEGACY_REDIRECTS.flatMap(({ from, to }) => [
			{ source: from, destination: to, statusCode: 301 as const },
			{ source: `${from}/`, destination: to, statusCode: 301 as const },
		]);
	},
};

export default nextConfig;

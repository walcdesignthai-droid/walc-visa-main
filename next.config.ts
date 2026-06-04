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
	{ from: "/contact-us", to: "/" },
	// 注: /immigrate-thai → /blog, /thaivisa21 → /blog/visa-comparison は
	// WI-legacy-url-301-retarget で middleware.ts に移管。trailingSlash 308 を
	// 回避し「旧URL → 最終200」を単一 301(チェーン0)にするため。
];

const nextConfig: NextConfig = {
	// WI-legacy-url-301-retarget: 末尾スラッシュの自動 308 正規化を無効化。
	// これにより proxy.ts が `/immigrate-thai/` 等を 308 を挟まず直接 301 でき、
	// 旧URL → 単一301 → 最終200(チェーン0)になる。trailing slash の重複は
	// 各ページの canonical で解決(/x と /x/ は canonical=/x へ集約)。
	skipTrailingSlashRedirect: true,
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

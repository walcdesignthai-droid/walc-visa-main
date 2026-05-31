import { type NextRequest, NextResponse } from "next/server";

/**
 * proxy.ts — WI-028 スパムインデックス除去 (ドメイン健全化)
 * ----------------------------------------------------------------------------
 * Next.js 16 の proxy 規約 (旧 middleware)。旧 WordPress(Elementor)サイトが
 * ハック注入された EC スパム / WP 痕跡 URL を **410 Gone** で返し、Google に
 * 「恒久削除」を明示して deindex を促す。
 *
 * 背景: 旧サイトに /products/...html 等の EC スパムが索引された (ChatGPT 46 点
 *       レビュー #1)。旧 WP は Next.js へ置換済みのため現状これらは 404 だが、
 *       404(一時的)より 410(恒久的)の方が Google の deindex が早く確実。
 *       Owner 側の GSC 削除ツール(緊急非表示)と二重で確実に索引から除去する。
 *
 * 設計:
 *   - matcher で **スパム / WP パターンのみ** に proxy を限定発火させる。
 *     正規ルート(/ /visas/* /api/* /llms.txt /robots.txt /sitemap.xml 等)には
 *     一切発火しないため、410 を誤って本番ページにかけることはない。
 *   - 恒久削除を機械可読にするため X-Robots-Tag: noindex も付与。
 *   - 旧 WP 記事(/dtv-visa-thailand /thaivisa21 等)の 301 は next.config.ts 側で
 *     既に処理済 (WI-018)。ここでは 410 専用パターンのみ扱い、重複させない。
 * ----------------------------------------------------------------------------
 */

const GONE_BODY =
	"410 Gone — This URL has been permanently removed.\nこのページは恒久的に削除されました。";

export function proxy(_req: NextRequest): NextResponse {
	// matcher により本関数に到達するのはスパム / WP 痕跡パターンのみ。
	return new NextResponse(GONE_BODY, {
		status: 410,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			// 恒久削除を明示し、念のため index を抑止 (410 と整合)。
			"X-Robots-Tag": "noindex",
			"Cache-Control": "public, max-age=86400",
		},
	});
}

export const config = {
	/**
	 * 410 対象 = 旧 EC スパム + 旧 WordPress 痕跡パターンのみ。
	 * ⚠️ 正規ルートは含めない (/ /visas/* /api/* 等は対象外)。
	 */
	matcher: [
		// 旧 EC スパム注入の痕跡 (bare path と配下の両方を 410 化)
		"/products",
		"/products/:path*",
		"/shop",
		"/shop/:path*",
		"/cart",
		"/checkout",
		// 旧 WordPress の管理 / 内部 / ログイン痕跡 (再ハック踏み台化の入口も塞ぐ = WI-029 連動)
		"/wp-admin",
		"/wp-admin/:path*",
		"/wp-content",
		"/wp-content/:path*",
		"/wp-includes",
		"/wp-includes/:path*",
		"/wp-login.php",
		"/xmlrpc.php",
	],
};

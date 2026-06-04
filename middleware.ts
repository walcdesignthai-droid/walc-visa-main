/**
 * middleware.ts — 旧 WordPress URL の 301 再ターゲット(WI-legacy-url-301-retarget)
 * ----------------------------------------------------------------------------
 * 旧URL を「無関係なトップ」ではなくトピックの近い新ページへ 301。
 *   /immigrate-thai(/) → /blog
 *   /thaivisa21(/)     → /blog/visa-comparison
 *
 * 🔴 チェーン0: next.config の redirects は trailingSlash 正規化(308)が先に走り
 *   `/foo/`→308→`/foo`→301→… の2ホップになる。middleware は正規化より前に
 *   実行されるため、末尾スラッシュ有無を問わず**単一 301** で最終URLへ直送できる。
 *   matcher を該当2パスに限定し、他ルートへは一切影響させない。
 * ----------------------------------------------------------------------------
 */

import { type NextRequest, NextResponse } from "next/server";

/** 旧URL(末尾スラッシュ除去後)→ 新ターゲット(サイト内パス)。 */
const LEGACY_301: Record<string, string> = {
	"/immigrate-thai": "/blog",
	"/thaivisa21": "/blog/visa-comparison",
};

export function middleware(req: NextRequest): NextResponse {
	// 末尾スラッシュを除去して正規化(/foo/ と /foo を同一視)。
	const path = req.nextUrl.pathname.replace(/\/+$/, "");
	const target = LEGACY_301[path];
	if (target) {
		const url = new URL(target, req.nextUrl.origin);
		return NextResponse.redirect(url, 301);
	}
	return NextResponse.next();
}

export const config = {
	// 該当2パス(末尾スラッシュ有無)のみで middleware を実行。
	matcher: [
		"/immigrate-thai",
		"/immigrate-thai/",
		"/thaivisa21",
		"/thaivisa21/",
	],
};

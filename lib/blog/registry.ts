/**
 * lib/blog/registry.ts — ブログ記事レジストリ
 * ----------------------------------------------------------------------------
 * pillar/cluster 記事の一覧と取得ヘルパー。draft は一覧 / sitemap から除外。
 * ----------------------------------------------------------------------------
 */

import { DTV_BALANCE_500K } from "./dtv-balance-500k";
import { DTV_DIY_VS_AGENCY } from "./dtv-diy-vs-agency";
import { DTV_PILLAR } from "./dtv-pillar";
import { DTV_REQUIRED_DOCUMENTS } from "./dtv-required-documents";
import { DTV_STAY_RULE } from "./dtv-stay-rule";
import { DTV_VISA_RUN_ALTERNATIVE } from "./dtv-visa-run-alternative";
import { DTV_VS_TOURIST } from "./dtv-vs-tourist";
import { EDUCATION_VISA_REALITY } from "./education-visa-reality";
import { LTR_CATEGORIES_TAX } from "./ltr-categories-tax";
import { RETIREMENT_BANK_BALANCE } from "./retirement-bank-balance";
import type { Article } from "./types";
import { VISA_COMPARISON } from "./visa-comparison";
import { VISA_EXTENSION_VS_90DAY } from "./visa-extension-vs-90-day-report";

export const BLOG_BASE_PATH = "/blog";

/** 全記事(draft 含む)。 */
export const ALL_ARTICLES: ReadonlyArray<Article> = [
	DTV_PILLAR,
	DTV_REQUIRED_DOCUMENTS,
	DTV_STAY_RULE,
	DTV_DIY_VS_AGENCY,
	DTV_BALANCE_500K,
	// WI-visa-content-consolidation §2: crm 7記事を /blog へ移植(draft)
	// 制度比較・ビザ選び(compare)
	VISA_COMPARISON,
	DTV_VS_TOURIST,
	// ビザ別ガイド(guide)
	RETIREMENT_BANK_BALANCE,
	LTR_CATEGORIES_TAX,
	EDUCATION_VISA_REALITY,
	// 手続き・暮らしのQ&A(qa)
	DTV_VISA_RUN_ALTERNATIVE,
	VISA_EXTENSION_VS_90DAY,
];

/** 公開記事のみ(一覧 / sitemap 用)。 */
export const PUBLISHED_ARTICLES: ReadonlyArray<Article> = ALL_ARTICLES.filter(
	(a) => !a.draft,
);

export function getArticleBySlug(slug: string): Article | undefined {
	return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function articleHref(slug: string): string {
	return `${BLOG_BASE_PATH}/${slug}`;
}

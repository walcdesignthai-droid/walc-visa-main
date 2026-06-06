/**
 * lib/blog/registry.ts — ブログ記事レジストリ
 * ----------------------------------------------------------------------------
 * pillar/cluster 記事の一覧と取得ヘルパー。draft は一覧 / sitemap から除外。
 * ----------------------------------------------------------------------------
 */

import { NINETY_DAY_REPORT_TROUBLE } from "./90-day-report-trouble";
import { DTV_BALANCE_500K } from "./dtv-balance-500k";
import { DTV_DIY_VS_AGENCY } from "./dtv-diy-vs-agency";
import { DTV_PILLAR } from "./dtv-pillar";
import { DTV_REQUIRED_DOCUMENTS } from "./dtv-required-documents";
import { DTV_STAY_RULE } from "./dtv-stay-rule";
import { DTV_VISA_RUN_ALTERNATIVE } from "./dtv-visa-run-alternative";
import { DTV_VS_TOURIST } from "./dtv-vs-tourist";
import { EDUCATION_VISA_REALITY } from "./education-visa-reality";
import { IMMIGRATION_OFFICE_BANGKOK } from "./immigration-office-bangkok";
import { LTR_CATEGORIES_TAX } from "./ltr-categories-tax";
import { MARRIAGE_VISA_THAILAND } from "./marriage-visa-thailand";
import { NON_B_VISA_EXTENSION } from "./non-b-visa-extension";
import { QA_90DAY_REPORT } from "./qa-90day-report";
import { QA_OVERSTAY } from "./qa-overstay";
import { QA_REENTRY_PERMIT } from "./qa-reentry-permit";
import { RETIREMENT_BANK_BALANCE } from "./retirement-bank-balance";
import { RETIREMENT_HEALTH_INSURANCE } from "./retirement-health-insurance";
import { THAILAND_BANK_ACCOUNT } from "./thailand-bank-account";
import { THAILAND_NOMAD_VISA_GUIDE } from "./thailand-nomad-visa-guide";
import { THAILAND_PRIVILEGE_OVERVIEW } from "./thailand-privilege-overview";
import { THAILAND_WORK_PERMIT } from "./thailand-work-permit";
import type { Article } from "./types";
import { VISA_COMPARISON } from "./visa-comparison";
import { VISA_EXTENSION_VS_90DAY } from "./visa-extension-vs-90-day-report";

export const BLOG_BASE_PATH = "/blog";

/** 全記事(draft 含む)。 */
export const ALL_ARTICLES: ReadonlyArray<Article> = [
	DTV_PILLAR,
	// WI-20260604-nomad-visa-pillar: 通称KW「タイ ノマドビザ」攻略 pillar(制度比較・ビザ選び / draft)
	THAILAND_NOMAD_VISA_GUIDE,
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
	// WI-038: 手続き・暮らしのQ&A(公開)
	QA_90DAY_REPORT,
	QA_REENTRY_PERMIT,
	QA_OVERSTAY,
	// WI-overnight Batch B: 困りごとQ&A / ビザ別ガイド(公開)
	// ビザ別ガイド(guide)
	NON_B_VISA_EXTENSION,
	THAILAND_WORK_PERMIT,
	MARRIAGE_VISA_THAILAND,
	RETIREMENT_HEALTH_INSURANCE,
	THAILAND_PRIVILEGE_OVERVIEW,
	// 手続き・暮らしのQ&A(qa)
	IMMIGRATION_OFFICE_BANGKOK,
	THAILAND_BANK_ACCOUNT,
	NINETY_DAY_REPORT_TROUBLE,
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

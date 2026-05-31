/**
 * lib/blog/registry.ts — ブログ記事レジストリ
 * ----------------------------------------------------------------------------
 * pillar/cluster 記事の一覧と取得ヘルパー。draft は一覧 / sitemap から除外。
 * ----------------------------------------------------------------------------
 */

import { DTV_PILLAR } from "./dtv-pillar";
import type { Article } from "./types";

export const BLOG_BASE_PATH = "/blog";

/** 全記事(draft 含む)。 */
export const ALL_ARTICLES: ReadonlyArray<Article> = [DTV_PILLAR];

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

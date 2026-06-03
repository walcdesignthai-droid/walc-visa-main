/**
 * lib/blog/presentation.ts — 表示用の派生ヘルパー(WI-036)
 * ----------------------------------------------------------------------------
 * カバー・読了時間・カテゴリの導出。記事側で明示指定があればそれを優先。
 * ----------------------------------------------------------------------------
 */

import type { Article, CoverMotif } from "./types";

export const CATEGORY_LABEL: Record<
	NonNullable<Article["category"]>,
	string
> = {
	qa: "手続き・暮らしの Q&A",
	news: "制度ニュース解説",
	pillar: "ビザ種別ガイド",
	guide: "ビザ別ガイド",
	compare: "制度比較・ビザ選び",
};

export function articleCategory(a: Article): NonNullable<Article["category"]> {
	return a.category ?? "pillar";
}

/** 本文量から読了分を概算(日本語 ~500字/分)。明示指定があれば優先。 */
export function readingMinutes(a: Article): number {
	if (a.readingMinutes) return a.readingMinutes;
	const chars =
		a.answerFirst.join("").length +
		(a.bodySections?.reduce(
			(n, s) => n + (s.lead?.length ?? 0) + (s.items?.join("").length ?? 0),
			0,
		) ?? 0) +
		a.statsNote.join("").length +
		a.expertView.join("").length +
		a.steps.reduce((n, s) => n + s.heading.length + s.body.length, 0) +
		a.faq.reduce((n, f) => n + f.question.length + f.answer.length, 0);
	return Math.max(2, Math.round(chars / 500));
}

interface ResolvedCover {
	motif: CoverMotif;
	kicker: string;
	titleLines: string[];
	accentWord?: string;
	sub?: string;
}

/** 記事の cover を解決(未指定なら h1/description から控えめに導出)。 */
export function resolveCover(a: Article): ResolvedCover {
	if (a.cover) return a.cover;
	return {
		motif: "passport",
		kicker: a.heroEyebrow,
		titleLines: [a.h1.slice(0, 18)],
		sub: a.description.slice(0, 38),
	};
}

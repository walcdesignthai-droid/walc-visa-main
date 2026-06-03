import { type CategoryKey, getCategory } from "./categories";
import type { CoverSpec, MotifKey } from "./cover";
import type { Article } from "./types";

const MOTIF_BY_CATEGORY: Record<CategoryKey, MotifKey> = {
	qa: "docs",
	news: "calendar",
	"visa-type": "passport",
};

/** 記事のカバー仕様(明示 cover 優先 / 無ければカテゴリから既定生成)。 */
export function resolveCover(a: Article): CoverSpec {
	if (a.cover) return a.cover;
	const cat = getCategory(a.category);
	const base = (a.h1.split(/[—｜|]/)[0] ?? a.h1).trim();
	const mid = Math.min(base.length, Math.ceil(base.length / 2));
	const titleLines =
		base.length > 16 ? [base.slice(0, mid), base.slice(mid)] : [base];
	return {
		motif: MOTIF_BY_CATEGORY[a.category],
		kicker: `${cat.label} ・ ${a.kind === "pillar" ? "完全ガイド" : "解説"}`,
		titleLines,
		accentWord: a.tags?.[0],
		sub: a.description.slice(0, 38),
	};
}

/** 日本語の概算読了時間(分)。本文の文字数 ÷ 500字/分、最小1分。 */
export function readingMinutes(a: Article): number {
	const parts: string[] = [
		a.h1,
		a.description,
		...a.answerFirst,
		...a.statsNote,
		...a.expertView,
		...(a.bodySections ?? []).flatMap((s) => [
			s.heading,
			s.lead ?? "",
			...(s.items ?? []),
		]),
		...a.steps.flatMap((s) => [s.heading, s.body]),
		...a.faq.flatMap((f) => [f.question, f.answer]),
	];
	const chars = parts.join("").replace(/\s/g, "").length;
	return Math.max(1, Math.round(chars / 500));
}

export interface TocEntry {
	id: string;
	label: string;
}

export function buildToc(a: Article): TocEntry[] {
	const toc: TocEntry[] = [{ id: "conclusion", label: "結論" }];
	if (a.statsNote.length > 0 || (a.statsCards?.length ?? 0) > 0)
		toc.push({ id: "market", label: "数字で見る" });
	(a.bodySections ?? []).forEach((s, i) => {
		toc.push({ id: `sec-${i}`, label: s.heading });
	});
	if (a.expertView.length > 0)
		toc.push({ id: "expert", label: "専門家の見解" });
	if (a.steps.length > 0) toc.push({ id: "steps", label: "手順" });
	if (a.faq.length > 0) toc.push({ id: "faq", label: "よくある質問" });
	return toc;
}

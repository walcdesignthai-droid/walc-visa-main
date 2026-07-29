import { articleCategory, CATEGORY_LABEL, resolveCover } from "./presentation";
import { ALL_ARTICLES } from "./registry";
import type { CoverMotif } from "./types";

const MOTIF_ACCENTS: Record<CoverMotif, string> = {
	passport: "#1e5bb8",
	stamp: "#b45309",
	documents: "#047857",
	"map-pin": "#7c3aed",
	calendar: "#b91c1c",
	baht: "#b8893f",
};

export interface BlogOgDescriptor {
	slug: string;
	motif: CoverMotif;
	kicker: string;
	titleLines: string[];
	accentWord?: string;
	sub?: string;
	categoryLabel: string;
	articleCode: string;
	accentColor: string;
	fallback: boolean;
}

const FALLBACK_DESCRIPTOR: BlogOgDescriptor = {
	slug: "fallback",
	motif: "passport",
	kicker: "WALC VISA",
	titleLines: ["タイ VISA ガイド"],
	sub: "タイ長期滞在の制度と実務を日本語で解説",
	categoryLabel: "公式ビザガイド",
	articleCode: "WALC VISA",
	accentColor: MOTIF_ACCENTS.passport,
	fallback: true,
};

export function buildBlogOgDescriptor(slug: string): BlogOgDescriptor {
	const articleIndex = ALL_ARTICLES.findIndex(
		(article) => article.slug === slug,
	);
	const article = ALL_ARTICLES[articleIndex];
	if (!article) return FALLBACK_DESCRIPTOR;

	const cover = resolveCover(article);

	return {
		slug: article.slug,
		motif: cover.motif,
		kicker: cover.kicker,
		titleLines: cover.titleLines,
		accentWord: cover.accentWord,
		sub: cover.sub,
		categoryLabel: CATEGORY_LABEL[articleCategory(article)],
		articleCode: `WALC GUIDE ${String(articleIndex + 1).padStart(2, "0")}`,
		accentColor: MOTIF_ACCENTS[cover.motif],
		fallback: false,
	};
}

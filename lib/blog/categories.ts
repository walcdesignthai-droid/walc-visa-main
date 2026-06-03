/**
 * lib/blog/categories.ts — VISA ブログのカテゴリ(IA: 正本 §6 の3タイプ)。
 * ----------------------------------------------------------------------------
 * 色は navy/gold 系のミュート(クリーンネイビー)。walc-design ブルー不使用。
 * 各色 = tint(ラベル背景)/ ink(文字 AA)/ accent(罫・アイコン)。本ファイルが単一ソース。
 * ----------------------------------------------------------------------------
 */

export type CategoryKey = "qa" | "news" | "visa-type";

export interface BlogCategory {
	key: CategoryKey;
	label: string;
	tint: string;
	ink: string;
	accent: string;
}

export const BLOG_CATEGORIES: Record<CategoryKey, BlogCategory> = {
	qa: {
		key: "qa",
		label: "手続き・暮らしのQ&A",
		tint: "#eef1f8",
		ink: "#16264f",
		accent: "#3552a0",
	},
	news: {
		key: "news",
		label: "制度ニュース解説",
		tint: "#f5efe2",
		ink: "#6b5320",
		accent: "#b8893f",
	},
	"visa-type": {
		key: "visa-type",
		label: "ビザ種別ガイド",
		tint: "#e9eef7",
		ink: "#16264f",
		accent: "#16264f",
	},
};

export const CATEGORY_ORDER: CategoryKey[] = ["qa", "news", "visa-type"];

export function getCategory(key: CategoryKey): BlogCategory {
	return BLOG_CATEGORIES[key];
}

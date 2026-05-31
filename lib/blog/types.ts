/**
 * lib/blog/types.ts — ブログ(権威ハブ)のコンテンツモデル
 * ----------------------------------------------------------------------------
 * WI-026: pillar/cluster(hub-and-spoke)構造。answer-first → 統計 → 専門家見解
 * → 手順 → FAQ(マニュアル Part6-2 / SEO-WVI-INTEGRATION-CONTRACT §9.2)。
 *
 * 🔴 YMYL 推測ゼロ: 規制・財政・期間など事実は必ず `sources` に出典を持たせる。
 *    出典が無い項目は本文に書かず `placeholders`(= {{要ソース}})に残す。
 * ----------------------------------------------------------------------------
 */

export type ArticleKind = "pillar" | "cluster";

/** 事実 → 出典の対応(YMYL の検証可能性を担保)。 */
export interface SourceRef {
	/** 本文中の該当事実(短く)。 */
	claim: string;
	/** 出典(内部 SOT or 一次出典)。 */
	source: string;
	/** 一次出典(タイ政府/大使館 等)が未取得なら true → 公開前に要付与。 */
	primaryPending?: boolean;
}

/** 未確定で本文に書けない項目(= {{要WVIソース}} プレースホルダ)。 */
export interface ContentPlaceholder {
	key: string;
	note: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

/** cluster への内部リンク枠(本体記事は後続)。 */
export interface ClusterLink {
	/** seo-memory の prompt_key と対応。 */
	promptKey: string;
	label: string;
	/** 公開予定の slug(未公開なら href は張らず「準備中」表示)。 */
	plannedSlug: string;
	published: boolean;
}

export interface Article {
	slug: string;
	kind: ArticleKind;
	/** seo-memory shared-keywords-intents の prompt_key。 */
	promptKey: string;
	title: string; // <title> 用
	h1: string;
	description: string; // meta description / answer-first 要約
	datePublished: string; // ISO8601
	dateModified?: string;
	/** true = 未公開(noindex / 一覧非掲載 / sitemap 非掲載)。 */
	draft: boolean;
	heroEyebrow: string;
	/** answer-first ブロック(冒頭 100〜300 語で結論)。段落配列。 */
	answerFirst: string[];
	/** 統計ブロック(SOT 由来の実績 + 免責)。 */
	statsNote: string[];
	/** 専門家見解(監修者の見解)。 */
	expertView: string[];
	/** 手順 / WALC サポートの流れ。 */
	steps: { heading: string; body: string }[];
	faq: FaqItem[];
	clusterLinks: ClusterLink[];
	sources: SourceRef[];
	placeholders: ContentPlaceholder[];
}

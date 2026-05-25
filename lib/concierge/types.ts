/**
 * lib/concierge/types.ts — AI VISA Concierge 型定義
 */

export type ConciergeRole = "user" | "assistant";

export interface ConciergeMessage {
	role: ConciergeRole;
	content: string;
	createdAt?: string;
}

export type ConciergeCtaType =
	| "line"
	| "diagnosis"
	| { type: "apply"; visaId: string };

/**
 * AI 応答内 [CTA:xxx] タグを構造化した結果。
 * 例: [CTA:line] → "line"
 *     [CTA:apply:dtv-softpower] → { type: "apply", visaId: "dtv-softpower" }
 */
export interface ParsedConciergeResponse {
	/** CTA タグを除去した本文(UI 表示用) */
	text: string;
	/** 0 〜 1 個の CTA */
	cta: ConciergeCtaType | null;
}

export interface ConciergeApiRequest {
	messages: ConciergeMessage[];
}

export interface ConciergeApiResponse {
	text: string;
	cta: ConciergeCtaType | null;
	/** デバッグ・統計用(本番では削除可) */
	usage?: {
		inputTokens: number;
		outputTokens: number;
		cacheReadInputTokens?: number;
		cacheCreationInputTokens?: number;
	};
}

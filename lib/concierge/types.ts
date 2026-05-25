/**
 * lib/concierge/types.ts — v2.0 (SSE 対応)
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

export interface ParsedConciergeResponse {
	text: string;
	cta: ConciergeCtaType | null;
}

export interface ConciergeApiRequest {
	messages: ConciergeMessage[];
}

/**
 * SSE イベント (api → client への逐次配信)
 */
export type ConciergeSseEvent =
	| { type: "delta"; text: string }
	| { type: "done"; cta: ConciergeCtaType | null; usage?: ConciergeUsage }
	| { type: "error"; message: string };

export interface ConciergeUsage {
	inputTokens: number;
	outputTokens: number;
	cacheReadInputTokens?: number;
	cacheCreationInputTokens?: number;
}

/**
 * 非ストリーミング応答 (後方互換)
 */
export interface ConciergeApiResponse {
	text: string;
	cta: ConciergeCtaType | null;
	usage?: ConciergeUsage;
}

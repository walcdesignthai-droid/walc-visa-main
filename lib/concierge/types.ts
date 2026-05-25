/**
 * lib/concierge/types.ts — v3.0 (human CTA 追加)
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
	| "human"
	| { type: "apply"; visaId: string };

export interface ParsedConciergeResponse {
	text: string;
	cta: ConciergeCtaType | null;
}

export interface ConciergeApiRequest {
	messages: ConciergeMessage[];
}

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

export interface ConciergeApiResponse {
	text: string;
	cta: ConciergeCtaType | null;
	usage?: ConciergeUsage;
}

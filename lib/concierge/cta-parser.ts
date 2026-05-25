/**
 * lib/concierge/cta-parser.ts — v2.0 (human 対応)
 *
 * 対応タグ:
 *   - [CTA:line]
 *   - [CTA:diagnosis]
 *   - [CTA:human]            ← 人間スタッフに切替
 *   - [CTA:apply:<visaId>]
 */

import type { ConciergeCtaType, ParsedConciergeResponse } from "./types";

const CTA_PATTERN = /\[CTA:([a-z]+)(?::([a-z0-9-_]+))?\]/gi;

export function parseConciergeResponse(
	raw: string,
): ParsedConciergeResponse {
	let firstCta: ConciergeCtaType | null = null;

	const stripped = raw
		.replace(CTA_PATTERN, (_match, kind: string, arg?: string) => {
			if (!firstCta) {
				firstCta = toCta(kind.toLowerCase(), arg?.toLowerCase());
			}
			return "";
		})
		.replace(/\n{3,}/g, "\n\n")
		.trim();

	return { text: stripped, cta: firstCta };
}

function toCta(kind: string, arg?: string): ConciergeCtaType | null {
	switch (kind) {
		case "line":
			return "line";
		case "diagnosis":
			return "diagnosis";
		case "human":
			return "human";
		case "apply":
			if (arg) return { type: "apply", visaId: arg };
			return null;
		default:
			return null;
	}
}

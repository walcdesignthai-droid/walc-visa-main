/**
 * lib/concierge/cta-parser.ts
 * ----------------------------------------------------------------------------
 * AI 応答内の [CTA:xxx] タグを構造化して、UI 用データに変換する。
 *
 * 対応タグ:
 *   - [CTA:line]
 *   - [CTA:diagnosis]
 *   - [CTA:apply:<visaId>]
 *     例: [CTA:apply:dtv], [CTA:apply:elite], [CTA:apply:ltr] 等
 *
 * 応答末尾以外に出現した場合も拾い、本文からは除去する。
 * 複数あれば最初の 1 つだけを採用(設計書通り)。
 * ----------------------------------------------------------------------------
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
		case "apply":
			if (arg) return { type: "apply", visaId: arg };
			return null;
		default:
			return null;
	}
}

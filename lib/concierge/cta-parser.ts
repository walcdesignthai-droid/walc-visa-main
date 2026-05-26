import type { ConciergeCtaType, ParsedConciergeResponse } from "./types";

const CTA_PATTERN = /\[CTA:([a-z_]+)(?::([a-z0-9-_]+))?\]/gi;

export function parseConciergeResponse(raw: string): ParsedConciergeResponse {
	let firstCta: ConciergeCtaType | null = null;

	const stripped = raw
		.replace(CTA_PATTERN, (_m, kind: string, arg?: string) => {
			if (!firstCta) firstCta = toCta(kind.toLowerCase(), arg?.toLowerCase());
			return "";
		})
		.replace(/\n{3,}/g, "\n\n")
		.trim();

	return { text: stripped, cta: firstCta };
}

function toCta(kind: string, arg?: string): ConciergeCtaType | null {
	switch (kind) {
		case "line": return "line";
		case "diagnosis": return "diagnosis";
		case "human": return "human";
		case "portal_login": return "portal_login";
		case "portal_reset": return "portal_reset";
		case "apply": return arg ? { type: "apply", visaId: arg } : null;
		default: return null;
	}
}

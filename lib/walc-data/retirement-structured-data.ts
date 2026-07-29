import { WALC_ORGANIZATION } from "./eeat";

export const RETIREMENT_URL = "https://walc-visa.online/visas/retirement";
export const RETIREMENT_TITLE = "リタイアメント VISA(NON-O / 50 歳以上)";
export const RETIREMENT_DESCRIPTION =
	"50歳以上の方向けタイ長期VISA。新規取得・更新、資金要件、銀行口座開設サポートについて、現在の状況を確認して個別にご案内します。";

export function buildRetirementWebPageSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": `${RETIREMENT_URL}#webpage`,
		url: RETIREMENT_URL,
		name: RETIREMENT_TITLE,
		description: RETIREMENT_DESCRIPTION,
		inLanguage: "ja-JP",
		isPartOf: {
			"@id": "https://walc-visa.online/#website",
		},
		about: {
			"@id": "https://walc-visa.online/#organization",
			name: WALC_ORGANIZATION.name,
			legalName: WALC_ORGANIZATION.legalName,
			url: WALC_ORGANIZATION.url,
		},
		breadcrumb: {
			"@id": `${RETIREMENT_URL}#breadcrumb`,
		},
	} as const;
}

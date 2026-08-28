import { WALC_ORGANIZATION } from "./eeat";

export const RETIREMENT_URL = "https://walc-visa.online/visas/retirement";
export const RETIREMENT_TITLE = "リタイアメント VISA(NON-O / 50 歳以上)";
export const RETIREMENT_DESCRIPTION =
	"50歳以上の方向けタイ長期VISA。新規取得・更新、資金要件、銀行口座開設サポートについて、現在の状況を確認して個別にご案内します。";

const ORGANIZATION_ID = "https://walc-visa.online/#organization";
const WEBSITE_ID = "https://walc-visa.online/#website";
const WEBPAGE_ID = `${RETIREMENT_URL}#webpage`;
const SERVICE_ID = `${RETIREMENT_URL}#service`;

export function buildRetirementStructuredData() {
	const organization = {
		"@type": "Organization",
		"@id": ORGANIZATION_ID,
		name: WALC_ORGANIZATION.name,
		legalName: WALC_ORGANIZATION.legalName,
		url: WALC_ORGANIZATION.url,
	};

	const website = {
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		url: "https://walc-visa.online/",
		name: WALC_ORGANIZATION.name,
		publisher: { "@id": ORGANIZATION_ID },
	};

	const webpage = {
		"@type": "WebPage",
		"@id": WEBPAGE_ID,
		url: RETIREMENT_URL,
		name: RETIREMENT_TITLE,
		description: RETIREMENT_DESCRIPTION,
		inLanguage: "ja-JP",
		isPartOf: { "@id": WEBSITE_ID },
		publisher: { "@id": ORGANIZATION_ID },
		mainEntity: { "@id": SERVICE_ID },
		about: {
			"@type": "Thing",
			name: "タイのリタイアメントVISA（Non-Immigrant O）",
		},
		breadcrumb: {
			"@id": `${RETIREMENT_URL}#breadcrumb`,
		},
	};

	const service = {
		"@type": "Service",
		"@id": SERVICE_ID,
		name: "タイのリタイアメントVISA申請サポート",
		serviceType: "リタイアメントVISAの新規取得・更新に関する申請サポート",
		url: RETIREMENT_URL,
		provider: { "@id": ORGANIZATION_ID },
		areaServed: {
			"@type": "Country",
			name: "Thailand",
		},
		mainEntityOfPage: { "@id": WEBPAGE_ID },
	};

	return {
		"@context": "https://schema.org",
		"@graph": [organization, website, webpage, service],
	} as const;
}

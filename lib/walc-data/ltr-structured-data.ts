import { WALC_AUTHOR, WALC_ORGANIZATION } from "./eeat";

export const LTR_URL = "https://walc-visa.online/visas/ltr";
export const LTR_TITLE = "LTR Visa(Long-Term Resident)";
export const LTR_DESCRIPTION =
	"最大10年のタイ長期滞在を目指すLTR Visa。4カテゴリの条件、カテゴリ別の税制優遇、料金、BOI申請の流れを公式一次情報とともに案内します。";
export const LTR_REVIEWED_AT = "2026-07-29";

export const LTR_OFFICIAL_SOURCES = [
	{
		label: "BOI / LTR Visa 公式概要",
		href: "https://ltr.boi.go.th/",
	},
	{
		label: "LTR Visa発給・5年目の再確認",
		href: "https://ltr.boi.go.th/page/visa-issuance-info.html",
	},
	{
		label: "HSP対象産業・指定専門分野",
		href: "https://ltr.boi.go.th/page/targeted-industries.html",
	},
	{
		label: "LTR保有者の銀行口座開設案内",
		href: "https://ltr.boi.go.th/page/opening-bank-account-in-thailand.html",
	},
	{
		label: "LTR保有者向け Tax Essentials（2026）",
		href: "https://ltr.boi.go.th/documents/PPT_Tax_Essentialsfor_LTR_Visa_Holders.pdf",
	},
] as const;

const ORGANIZATION_ID = "https://walc-visa.online/#organization";
const WEBSITE_ID = "https://walc-visa.online/#website";
const PERSON_ID = `${WALC_AUTHOR.url}#person`;
const WEBPAGE_ID = `${LTR_URL}#webpage`;
const SERVICE_ID = `${LTR_URL}#service`;

export function buildLtrStructuredData() {
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

	const reviewer = {
		"@type": "Person",
		"@id": PERSON_ID,
		name: WALC_AUTHOR.name,
		url: WALC_AUTHOR.url,
		jobTitle: WALC_AUTHOR.jobTitle,
		image: WALC_AUTHOR.imageUrl,
		worksFor: { "@id": ORGANIZATION_ID },
	};

	const webpage = {
		"@type": "WebPage",
		"@id": WEBPAGE_ID,
		url: LTR_URL,
		name: LTR_TITLE,
		description: LTR_DESCRIPTION,
		inLanguage: "ja-JP",
		dateModified: LTR_REVIEWED_AT,
		isPartOf: { "@id": WEBSITE_ID },
		publisher: { "@id": ORGANIZATION_ID },
		breadcrumb: { "@id": `${LTR_URL}#breadcrumb` },
		mainEntity: { "@id": SERVICE_ID },
		about: {
			"@type": "Thing",
			name: "タイのLong-Term Resident Visa（LTR Visa）",
		},
		reviewedBy: { "@id": PERSON_ID },
		citation: LTR_OFFICIAL_SOURCES.map((source) => ({
			"@type": "CreativeWork",
			name: source.label,
			url: source.href,
		})),
	};

	const service = {
		"@type": "Service",
		"@id": SERVICE_ID,
		url: LTR_URL,
		name: "LTR Visa申請サポート",
		serviceType: "Thailand Long-Term Resident Visa application support",
		description:
			"LTR Visaの対象カテゴリと申請要件を確認し、BOI申請に必要な書類準備と手続きを支援するサービスです。",
		provider: { "@id": ORGANIZATION_ID },
		areaServed: {
			"@type": "Country",
			name: "Thailand",
		},
		audience: {
			"@type": "Audience",
			audienceType: "LTR Visaの所定条件に該当する申請検討者",
		},
		mainEntityOfPage: { "@id": WEBPAGE_ID },
	};

	return {
		"@context": "https://schema.org",
		"@graph": [organization, website, reviewer, webpage, service],
	} as const;
}

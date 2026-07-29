import { WALC_AUTHOR } from "./eeat";

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
		label: "LTR保有者向け Tax Essentials（2026）",
		href: "https://ltr.boi.go.th/documents/PPT_Tax_Essentialsfor_LTR_Visa_Holders.pdf",
	},
] as const;

export function buildLtrStructuredData() {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${LTR_URL}#webpage`,
				url: LTR_URL,
				name: LTR_TITLE,
				description: LTR_DESCRIPTION,
				inLanguage: "ja-JP",
				dateModified: LTR_REVIEWED_AT,
				isPartOf: {
					"@id": "https://walc-visa.online/#website",
				},
				breadcrumb: {
					"@id": `${LTR_URL}#breadcrumb`,
				},
				mainEntity: {
					"@id": `${LTR_URL}#service`,
				},
				reviewedBy: {
					"@type": "Person",
					"@id": `${WALC_AUTHOR.url}#person`,
					name: WALC_AUTHOR.name,
					url: WALC_AUTHOR.url,
				},
				citation: LTR_OFFICIAL_SOURCES.map((source) => ({
					"@type": "CreativeWork",
					name: source.label,
					url: source.href,
				})),
			},
			{
				"@type": "Service",
				"@id": `${LTR_URL}#service`,
				url: LTR_URL,
				name: "LTR Visa申請サポート",
				serviceType: "Thailand Long-Term Resident Visa application support",
				description:
					"LTR Visaの対象カテゴリと申請要件を確認し、BOI申請に必要な書類準備と手続きを支援するサービスです。",
				provider: {
					"@id": "https://walc-visa.online/#organization",
				},
				areaServed: {
					"@type": "Country",
					name: "Thailand",
				},
				audience: {
					"@type": "Audience",
					audienceType: "LTR Visaの所定条件に該当する申請検討者",
				},
			},
		],
	} as const;
}

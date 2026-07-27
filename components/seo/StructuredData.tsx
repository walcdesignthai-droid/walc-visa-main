/**
 * components/seo/StructuredData.tsx — walc-visa.online 用 JSON-LD
 * ----------------------------------------------------------------------------
 * 全 VISA 種別対応版 (DTV / リタイア / Privilege / LTR / 結婚 / 学生)。
 *
 * 含まれるスキーマ:
 *   - Organization (WALC DESIGN Co., Ltd.)
 *   - ProfessionalService (VISA 取得代行・全種別)
 *   - FAQPage (主要 FAQ 5 件)
 *   - WebSite
 *   - LocalBusiness (バンコク拠点)
 *
 * 出典: walc-studio/knowledge/01_walc_company_info.md / 02_pricing_master.md
 * ----------------------------------------------------------------------------
 */

import { WALC_ORGANIZATION } from "@/lib/walc-data/eeat";
import {
	categoryFromPrice,
	categoryRecommendedPlan,
	formatTHB,
	VISA_LTR,
	VISA_PRIVILEGE,
	VISA_RETIREMENT,
	type VisaCategory,
} from "@/lib/walc-data/pricing";
import {
	type DtvPublicContent,
	getDtvPublicContent,
} from "@/lib/walc-data/public-content";

const ORG_BASE = {
	"@type": "Organization",
	name: "WALC VISA Consulting",
	legalName: "WALC DESIGN Co., Ltd.",
	url: "https://walc-visa.online",
	logo: "https://walc-visa.online/walc-visa-logo.png",
	foundingDate: "2021-08-27",
	founder: {
		"@type": "Person",
		name: "小野寺 陽介",
		givenName: "Yosuke",
		familyName: "Onodera",
	},
	address: {
		"@type": "PostalAddress",
		addressCountry: "TH",
		addressRegion: "Bangkok",
		streetAddress: "30 Sukhumvit 61, Wattana",
		postalCode: "10110",
	},
	email: WALC_ORGANIZATION.email,
	// WI-031: canonical 確定の固定電話 (2026-05-30 Owner 確認 / 旧 084 は不使用)。
	telephone: WALC_ORGANIZATION.telephone,
	// WI-031: 法人登記番号は env 供給時のみ出力 (未設定 = TBD / 推測値ゼロ)。
	...(WALC_ORGANIZATION.registrationNumber
		? {
				identifier: {
					"@type": "PropertyValue",
					propertyID: "TH-company-registration",
					value: WALC_ORGANIZATION.registrationNumber,
				},
			}
		: {}),
	sameAs: [
		"https://dtv.walc-visa.online",
		"https://crm.walc-visa.online",
		"https://walc-consulting.com",
	],
	// WI-031: 連絡導線。電話は canonical 確定値を併記。
	contactPoint: {
		"@type": "ContactPoint",
		contactType: "customer support",
		telephone: WALC_ORGANIZATION.telephone,
		email: WALC_ORGANIZATION.email,
		url: "https://walc-visa.online/",
		availableLanguage: ["ja"],
	},
};

/** 各 VISA カテゴリを Offer に変換 (recommended plan があればそれを優先) */
function visaToOffer(cat: VisaCategory) {
	const recommended = categoryRecommendedPlan(cat);
	const minPrice = recommended?.walcFee ?? categoryFromPrice(cat);
	if (minPrice == null) return null;
	return {
		"@type": "Offer",
		name: `${cat.shortName} (${cat.duration})`,
		price: String(minPrice),
		priceCurrency: "THB",
		description: cat.primaryDesc,
	};
}

function buildProfessionalService(content: DtvPublicContent) {
	return {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		name: "WALC VISA Consulting - タイ VISA 取得代行",
		provider: ORG_BASE,
		serviceType:
			"タイ長期 VISA 取得代行 (DTV / リタイア / Privilege / LTR / 結婚 / 学生)",
		areaServed: { "@type": "Country", name: "Thailand" },
		priceRange: `${formatTHB(45_000)} - ${formatTHB(5_000_000)}`,
		offers: [
			...content.pricing.map((plan) => ({
				"@type": "Offer",
				name: `DTV ${plan.name}`,
				price: String(plan.priceThb),
				priceCurrency: "THB",
				description: plan.audience,
			})),
			visaToOffer(VISA_RETIREMENT),
			visaToOffer(VISA_LTR),
			visaToOffer(VISA_PRIVILEGE),
		].filter((offer): offer is NonNullable<typeof offer> => offer !== null),
	};
}

function buildFaqPage(content: DtvPublicContent) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "タイの長期 VISA はどんな種類がありますか?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "DTV (5 年マルチプル・WALC 第一推奨)・Thailand Privilege (5〜20 年)・LTR (10 年・税優遇)・NON-O リタイアメント (50 歳以上)・NON-O 結婚 / 家族・NON-ED 学生など。WALC では全種別に対応しております。",
				},
			},
			{
				"@type": "Question",
				name: "DTV ビザの料金はいくらですか?",
				acceptedAnswer: {
					"@type": "Answer",
					text: content.pricing
						.map(
							(plan) =>
								`${plan.name} ${plan.priceThb.toLocaleString("en-US")} THB`,
						)
						.join("、"),
				},
			},
			{
				"@type": "Question",
				name: "WALC の VISA 取得実績は?",
				acceptedAnswer: {
					"@type": "Answer",
					text: `${content.trackRecord.display}の${content.trackRecord.label}があります。${content.trackRecord.disclaimer}`,
				},
			},
			{
				"@type": "Question",
				name: "オーバーステイや入国拒否の相談もできますか?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "はい。WALC は VISA トラブル全般 (オーバーステイ・イミグレ拒否・アラート保有・ビザラン疲れ) に対応しております。LINE で 24 時間以内に初回応答いたします。",
				},
			},
			{
				"@type": "Question",
				name: "タイ国内で銀行口座を開設したいです",
				acceptedAnswer: {
					"@type": "Answer",
					text: "WALCではDTV取得者限定の銀行口座開設サポートをオプションで相談できます。開設可否は銀行等の判断と個別状況によるため保証されません。最新の対応状況と料金はLINEで個別にご確認ください。",
				},
			},
		],
	};
}

const WEBSITE = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "WALC VISA Consulting - タイ VISA 取得・運用の専門コンサルティング",
	url: "https://walc-visa.online",
	publisher: ORG_BASE,
	inLanguage: "ja-JP",
};

const LOCAL_BUSINESS = {
	...ORG_BASE,
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	priceRange: "฿13,000 - ฿5,000,000",
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "09:00",
			closes: "18:00",
		},
	],
};

export async function StructuredData() {
	const content = await getDtvPublicContent();
	const schemas = [
		buildProfessionalService(content),
		buildFaqPage(content),
		WEBSITE,
		LOCAL_BUSINESS,
	];
	return (
		<>
			{schemas.map((schema, i) => (
				<script
					// biome-ignore lint/suspicious/noArrayIndexKey: schemas は固定長・順序が安定
					key={i}
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD は検証済み公開データのみ
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schema),
					}}
				/>
			))}
		</>
	);
}

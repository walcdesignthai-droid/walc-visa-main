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
	VISA_DTV,
	VISA_LTR,
	VISA_PRIVILEGE,
	VISA_RETIREMENT,
} from "@/lib/walc-data/pricing";
import { getDtvAcquisitionStats } from "@/lib/walc-data/stats";

// 実績数値は SOT (lib/walc-data/stats.ts) から取得し drift を防止 (WI-004 / F-1)。
// 期間表現・言い回しは公開 SEO スナップショット保護のため文字列リテラルで固定。
const stats = getDtvAcquisitionStats();

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
function visaToOffer(cat: typeof VISA_DTV) {
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

/** DTV は LP 掲載の 3 プランを個別 Offer として公開する */
function dtvPlanOffers() {
	return VISA_DTV.plans
		.filter((plan) => plan.walcFee != null)
		.map((plan) => ({
			"@type": "Offer",
			name: `DTV ${plan.label}`,
			price: String(plan.walcFee),
			priceCurrency: "THB",
			description: plan.notes ?? VISA_DTV.primaryDesc,
			url: "https://walc-visa.online/#consult",
			availability: "https://schema.org/InStock",
		}));
}

const PROFESSIONAL_SERVICE = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "WALC VISA Consulting - タイ VISA 取得代行",
	provider: ORG_BASE,
	serviceType:
		"タイ長期 VISA 取得代行 (DTV / リタイア / Privilege / LTR / 結婚 / 学生)",
	areaServed: { "@type": "Country", name: "Thailand" },
	priceRange: `${formatTHB(45_000)} - ${formatTHB(5_000_000)}`,
	offers: [
		...dtvPlanOffers(),
		visaToOffer(VISA_RETIREMENT),
		visaToOffer(VISA_LTR),
		visaToOffer(VISA_PRIVILEGE),
	].filter((o): o is NonNullable<typeof o> => o !== null),
};

const FAQ_PAGE = {
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
				text: "WALC 料金は 45,000 THB (ノマド) から 60,000 THB (ソフトパワー)。すべて申請費・書類サポート込み。5 年マルチプル・1 回 180 日滞在。",
			},
		},
		{
			"@type": "Question",
			name: "WALC の VISA 取得実績は?",
			acceptedAnswer: {
				"@type": "Answer",
				text: `DTV の申請通過実績は ${stats.successfulApplicationsLabel}(${stats.periodLabel})。これは過去実績であり、将来の取得を保証するものではありません。WALC 全体で累計 ${stats.walcTotalAcquired}+ 件の VISA 取得経験。`,
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
				text: "WALC では DTV 取得者限定の銀行口座開設オプションをご用意しています。銀行・支店・お客様の状況により必要条件や対応可否が異なるため、料金を含め専門スタッフが個別に確認します。開設を保証するものではありません。",
			},
		},
		{
			"@type": "Question",
			name: "空港イミグレ入国サポートは利用できますか?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "入国審査の厳格化を受け、空港イミグレ入国サポートは現在、新規受付を一時停止しています。入国履歴を確認し、渡航前の DTV 取得を含む対策を個別にご案内します。VISA 取得や入国を保証するものではありません。",
			},
		},
	],
};

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

export function StructuredData() {
	const schemas = [PROFESSIONAL_SERVICE, FAQ_PAGE, WEBSITE, LOCAL_BUSINESS];
	return (
		<>
			{schemas.map((schema, i) => (
				<script
					// biome-ignore lint/suspicious/noArrayIndexKey: schemas は固定長・順序が安定
					key={i}
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD は信頼できる static data
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schema),
					}}
				/>
			))}
		</>
	);
}

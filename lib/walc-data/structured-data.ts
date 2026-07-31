import { WALC_ORGANIZATION } from "./eeat";
import type { DtvPublicContent } from "./public-content";

const ORIGIN = "https://walc-visa.online";
const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;
const WEBPAGE_ID = `${ORIGIN}/#webpage`;
const SERVICE_ID = `${ORIGIN}/#visa-consulting`;

type JsonLdNode = Record<string, unknown>;

export function buildMainStructuredDataGraph(content: DtvPublicContent): {
	"@context": "https://schema.org";
	"@graph": JsonLdNode[];
} {
	const organization = {
		"@type": ["Organization", "ProfessionalService"],
		"@id": ORGANIZATION_ID,
		name: "WALC VISA Consulting",
		legalName: "WALC DESIGN Co., Ltd.",
		url: ORIGIN,
		logo: {
			"@type": "ImageObject",
			url: `${ORIGIN}/walc-visa-logo.png`,
		},
		foundingDate: "2021-08-27",
		founder: {
			"@type": "Person",
			name: "小野寺 陽介",
			alternateName: "Yosuke Onodera",
		},
		address: {
			"@type": "PostalAddress",
			streetAddress: "30 Sukhumvit 61, Wattana",
			addressRegion: "Bangkok",
			postalCode: "10110",
			addressCountry: "TH",
		},
		email: WALC_ORGANIZATION.email,
		telephone: WALC_ORGANIZATION.telephone,
		...(WALC_ORGANIZATION.registrationNumber
			? {
					identifier: {
						"@type": "PropertyValue",
						propertyID: "TH-company-registration",
						value: WALC_ORGANIZATION.registrationNumber,
					},
				}
			: {}),
		/**
		 * 同一組織の別サーフェスを明示的に結ぶ。
		 * walc-consulting.com は @id 無し・同名の Organization ノードを持ち、
		 * 別組織として誤認されていたため 301 後も sameAs で宣言し続ける。
		 */
		sameAs: [
			"https://dtv.walc-visa.online",
			"https://guide.walc-visa.online",
			"https://walc-consulting.com",
		],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer support",
			telephone: WALC_ORGANIZATION.telephone,
			email: WALC_ORGANIZATION.email,
			url: content.consultationUrl,
			availableLanguage: ["ja"],
		},
	};

	const website = {
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		url: ORIGIN,
		name: "WALC VISA Consulting",
		inLanguage: "ja-JP",
		publisher: { "@id": ORGANIZATION_ID },
	};

	const webpage = {
		"@type": "WebPage",
		"@id": WEBPAGE_ID,
		url: `${ORIGIN}/`,
		name: "WALC VISA Consulting — タイVISA取得・運用の専門コンサルティング",
		description:
			"DTV、リタイアメント、Thailand Privilege、LTRなど、タイ長期VISAの申請から取得後まで日本語で伴走します。",
		inLanguage: "ja-JP",
		isPartOf: { "@id": WEBSITE_ID },
		about: { "@id": SERVICE_ID },
		primaryImageOfPage: {
			"@type": "ImageObject",
			url: `${ORIGIN}/images/AdobeStock_494541408.jpeg`,
		},
	};

	const visaService = {
		"@type": "Service",
		"@id": SERVICE_ID,
		name: "タイ長期VISA申請サポート",
		serviceType:
			"タイ長期VISA申請サポート (DTV / リタイアメント / Privilege / LTR)",
		provider: { "@id": ORGANIZATION_ID },
		areaServed: { "@type": "Country", name: "Thailand" },
		url: `${ORIGIN}/`,
		offers: content.pricing.map((plan) => ({
			"@type": "Offer",
			name: `DTV ${plan.name} WALC申請サポート`,
			price: String(plan.priceThb),
			priceCurrency: "THB",
			description: `${plan.audience}。含まれるもの: ${plan.includedItems.join("、")}。${content.fees.summary}`,
			category: "DTV申請サポート（申請費込み）",
			url: "https://dtv.walc-visa.online",
		})),
	};

	return {
		"@context": "https://schema.org",
		"@graph": [organization, website, webpage, visaService],
	};
}

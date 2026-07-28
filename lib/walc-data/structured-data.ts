import { WALC_ORGANIZATION } from "./eeat";
import {
	categoryFromPrice,
	categoryRecommendedPlan,
	VISA_LTR,
	VISA_PRIVILEGE,
	VISA_RETIREMENT,
	type VisaCategory,
} from "./pricing";
import type { DtvPublicContent } from "./public-content";

const ORIGIN = "https://walc-visa.online";
const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;
const WEBPAGE_ID = `${ORIGIN}/#webpage`;
const SERVICE_ID = `${ORIGIN}/#visa-consulting`;

type JsonLdNode = Record<string, unknown>;

function visaToOffer(category: VisaCategory): JsonLdNode | null {
	if (category.linkDisabled && !category.externalUrl) return null;

	const recommended = categoryRecommendedPlan(category);
	const price = recommended?.walcFee ?? categoryFromPrice(category);
	if (price == null) return null;

	return {
		"@type": "Offer",
		name: `${category.shortName} (${category.duration})`,
		price: String(price),
		priceCurrency: "THB",
		description: category.primaryDesc,
		url: category.externalUrl ?? `${ORIGIN}/visas/${category.slug}`,
	};
}

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
		sameAs: ["https://dtv.walc-visa.online", "https://walc-consulting.com"],
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
		offers: [
			...content.pricing.map((plan) => ({
				"@type": "Offer",
				name: `DTV ${plan.name} WALC申請サポート`,
				price: String(plan.priceThb),
				priceCurrency: "THB",
				description: `${plan.audience}。含まれるもの: ${plan.includedItems.join("、")}。${content.fees.summary}`,
				category: "DTV申請サポート（申請費込み）",
				url: "https://dtv.walc-visa.online",
			})),
			visaToOffer(VISA_RETIREMENT),
			visaToOffer(VISA_LTR),
			visaToOffer(VISA_PRIVILEGE),
		].filter((offer): offer is JsonLdNode => offer !== null),
	};

	return {
		"@context": "https://schema.org",
		"@graph": [organization, website, webpage, visaService],
	};
}

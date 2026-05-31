/**
 * lib/walc-data/eeat.ts
 * ============================================================================
 * WI-031 — E-E-A-T(信頼性)情報の Single Source of Truth。
 *
 * YMYL(ビザ = お金・生活に関わる)領域のため、著者・運営者情報を機械可読
 * (JSON-LD)+ 可視(著者ページ)の両面で前面に出す土台。
 *
 * 🔴 推測ゼロ原則(~/walc-projects/CLAUDE.md §0.2 / RULE-NO-SPECULATION):
 *   - 確定値の出典は CANONICAL-OWNER-PROFILE.md(2026-05-29/30 Owner 直接確認)。
 *   - 未確定値(登記番号など)は **env で供給されるまで null** とし、null の
 *     フィールドは schema に一切出力しない(空文字・推測値を絶対に出さない)。
 *   - ❌ 旧サイトの電話番号(084-261-0309)は使用しない。canonical 確定値
 *        06-4753-0375(2026-05-30 Owner 確認)のみ使用。
 *
 * 出典: walc-studio/knowledge/CANONICAL-OWNER-PROFILE.md
 *       lib/walc-data/site-map.ts(URL / email)
 * ============================================================================
 */

/** 登記番号は Owner 提供まで env で供給(未設定なら null = schema 非出力)。 */
const REGISTRATION_NUMBER: string | null =
	process.env.NEXT_PUBLIC_WALC_REGISTRATION_NO ?? null;

/**
 * 運営法人の確定プロフィール(canonical)。
 * address / telephone は CANONICAL-OWNER-PROFILE.md の確定値。
 */
export const WALC_ORGANIZATION = {
	name: "WALC VISA Consulting",
	legalName: "WALC DESIGN Co., Ltd.",
	url: "https://walc-visa.online",
	logo: "https://walc-visa.online/walc-visa-logo.png",
	/** 法人登記日(JSON-LD / Google Knowledge Graph 一致用)。 */
	foundingDate: "2021-08-27",
	email: "walcvisa@gmail.com",
	/** canonical 確定(2026-05-30 Owner 確認)。旧 084-261-0309 は使用禁止。 */
	telephone: "+66-6-4753-0375",
	telephoneDisplay: "06-4753-0375",
	address: {
		streetAddress: "30 Sukhumvit 61, Wattana",
		addressRegion: "Bangkok",
		postalCode: "10110",
		addressCountry: "TH",
	},
	/** タイ王国 法人登記番号 — Owner 提供まで TBD(null なら schema 非出力)。 */
	registrationNumber: REGISTRATION_NUMBER,
} as const;

/**
 * 著者 / 代表者の確定プロフィール(canonical)。
 * credentials(保有資格)は未確定のため **持たない**(捏造しない)。
 * 専門領域(knowsAbout)は公開サービス範囲に基づく事実のみ。
 */
export const WALC_AUTHOR = {
	slug: "yosuke-onodera",
	name: "小野寺 陽介",
	givenName: "Yosuke",
	familyName: "Onodera",
	jobTitle: "代表取締役 / WALC VISA Consulting 統括",
	/** 確定事実のみ(Founder.tsx / canonical と整合)。在住・社歴は別概念で併記。 */
	bioJa:
		"WALC DESIGN Co., Ltd. 代表取締役。バンコク在住 10 年以上、WALC としてタイで 6 年(事業開始 2020 年 / 法人化 2021-08-27)、タイ長期 VISA の取得・運用コンサルティングを統括。DTV・Thailand Privilege・LTR・リタイアメント・結婚・学生など全種別の実務に従事。",
	knowsAbout: [
		"タイ長期VISA",
		"DTV(Destination Thailand Visa)",
		"Thailand Privilege",
		"LTR Visa",
		"リタイアメントビザ",
		"タイ移住",
		"タイ法人設立",
	],
	url: "https://walc-visa.online/author/yosuke-onodera",
	sameAs: ["https://x.com/walcvisa"],
} as const;

type JsonLd = Record<string, unknown>;

/** Organization ノードの共通 address(JSON-LD PostalAddress)。 */
export function organizationPostalAddress(): JsonLd {
	return {
		"@type": "PostalAddress",
		streetAddress: WALC_ORGANIZATION.address.streetAddress,
		addressRegion: WALC_ORGANIZATION.address.addressRegion,
		postalCode: WALC_ORGANIZATION.address.postalCode,
		addressCountry: WALC_ORGANIZATION.address.addressCountry,
	};
}

/**
 * 著者(Person)の JSON-LD。著者ページおよび Article.author で再利用。
 */
export function buildPersonSchema(): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": `${WALC_AUTHOR.url}#person`,
		name: WALC_AUTHOR.name,
		givenName: WALC_AUTHOR.givenName,
		familyName: WALC_AUTHOR.familyName,
		jobTitle: WALC_AUTHOR.jobTitle,
		description: WALC_AUTHOR.bioJa,
		knowsAbout: [...WALC_AUTHOR.knowsAbout],
		url: WALC_AUTHOR.url,
		sameAs: [...WALC_AUTHOR.sameAs],
		worksFor: {
			"@type": "Organization",
			name: WALC_ORGANIZATION.legalName,
			url: WALC_ORGANIZATION.url,
		},
	};
}

export interface ArticleSchemaInput {
	/** 記事タイトル。 */
	headline: string;
	/** 記事の概要。 */
	description: string;
	/** 正規 URL(絶対 URL)。 */
	url: string;
	/** ISO8601 公開日時。 */
	datePublished: string;
	/** ISO8601 更新日時(省略時は datePublished)。 */
	dateModified?: string;
	/** OG 画像など(絶対 URL)。 */
	image?: string;
}

/**
 * 記事(Article)の JSON-LD 雛形。
 * ブログ / 解説記事ページで `<JsonLdScript data={buildArticleSchema(...)} />`
 * の形で使用する。author は canonical Person、publisher は運営法人に固定。
 */
export function buildArticleSchema(input: ArticleSchemaInput): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: input.headline,
		description: input.description,
		mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
		url: input.url,
		datePublished: input.datePublished,
		dateModified: input.dateModified ?? input.datePublished,
		inLanguage: "ja-JP",
		...(input.image ? { image: input.image } : {}),
		author: {
			"@type": "Person",
			"@id": `${WALC_AUTHOR.url}#person`,
			name: WALC_AUTHOR.name,
			url: WALC_AUTHOR.url,
		},
		publisher: {
			"@type": "Organization",
			name: WALC_ORGANIZATION.legalName,
			logo: { "@type": "ImageObject", url: WALC_ORGANIZATION.logo },
		},
	};
}

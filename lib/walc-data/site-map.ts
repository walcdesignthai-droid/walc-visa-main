/**
 * lib/walc-data/site-map.ts
 * ============================================================================
 * ⚠️ 全 WALC サイトの URL 中央管理 (推測値禁止・URL 変更時はここを編集)
 *
 * 参照箇所:
 *   - components/shared/Header.tsx
 *   - components/shared/Footer.tsx
 *   - components/lp/* (各 CTA)
 *   - lib/walc-links.ts (互換維持)
 *
 * 影響: walc-visa-main / dtv-walc-visa / walc-site / walc-visa-crm すべてに
 *      この URL マップが波及するため、変更時は各サイトの実装も確認のこと。
 * ============================================================================
 */

export const SITE_URLS = {
	/** メインサイト (walc-visa-main) */
	main: "https://walc-visa.online",

	/** DTV LP (dtv-walc-visa) */
	dtv: "https://dtv.walc-visa.online",

	/** 公開ガイド (申請前後の必要書類・実務情報) */
	guide: "https://guide.walc-visa.online",

	/** DTV VISA 適性診断 (全ページから誘導) */
	diagnosis: "https://dtv.walc-visa.online/diagnosis",

	/** DTV 取得者ガイド */
	guideDtv: "https://guide.walc-visa.online/guide/dtv/owner",

	/** 法人向け NON-B / Work Permit ガイド */
	guideBusiness: "https://guide.walc-visa.online/guide/business",

	/** 企業向け (walc-site → walc-consulting.com) */
	corporate: "https://walc-consulting.com",

	/** 顧客ポータル (walc-visa-crm) */
	portal: "https://my.walc-visa.online/portal/login",

	/** 法務ページ (CRM 側で一元管理) */
	legal: {
		terms: "https://crm.walc-visa.online/legal/terms",
		privacy: "https://crm.walc-visa.online/legal/privacy",
		cancellation: "https://crm.walc-visa.online/legal/cancellation",
	},

	/** SNS */
	social: {
		line: "https://lin.ee/PGFYVNZ",
		lineOaShortlink: "https://lin.ee/PGFYVNZ",
		x: "https://x.com/walcvisa",
	},

	/** Email */
	email: "walcvisa@gmail.com",
} as const;

// ---------------------------------------------------------------------------
// 共通ナビゲーション項目 (Header / Footer で共有)
// ---------------------------------------------------------------------------

export interface NavLink {
	href: string;
	label: string;
	external?: boolean;
	highlight?: boolean;
}

export interface OfficialSiteEntry {
	id: "main" | "corporate" | "dtv" | "guide" | "portal";
	name: string;
	url: string;
	role: string;
	audience: string;
	badge: string;
	publicInformation: boolean;
}

/**
 * WALC VISA の公式サイト体系。
 *
 * 検索・AI・利用者に各サイトの役割を同じ表現で伝えるための正本。
 * 社内 CRM は公開ディレクトリへ掲載しない。
 */
export const OFFICIAL_SITE_DIRECTORY: readonly OfficialSiteEntry[] = [
	{
		id: "main",
		name: "WALC VISA 公式サイト",
		url: SITE_URLS.main,
		role: "運営情報とVISAサービス全体の第一正本",
		audience: "WALCの運営者、サービス、公式見解を確認したい方",
		badge: "公式本体",
		publicInformation: true,
	},
	{
		id: "corporate",
		name: "WALC 法人・事業支援サイト",
		url: SITE_URLS.corporate,
		role: "タイ進出・法人設立・事業運営支援の公式サイト",
		audience: "タイで法人設立や事業展開、経営支援を検討している方",
		badge: "法人・事業向け",
		publicInformation: true,
	},
	{
		id: "dtv",
		name: "DTV VISA 専門サイト",
		url: SITE_URLS.dtv,
		role: "DTVの条件・料金・実績・相談をまとめた専門LP",
		audience: "DTVの取得方法を比較し、申請相談をしたい方",
		badge: "DTV専門",
		publicInformation: true,
	},
	{
		id: "guide",
		name: "WALC VISA 公開ガイド",
		url: SITE_URLS.guide,
		role: "必要書類と申請実務を確認するための公開ガイド",
		audience: "申請前後の準備内容を具体的に確認したい方",
		badge: "実務ガイド",
		publicInformation: true,
	},
	{
		id: "portal",
		name: "WALC お客様専用ポータル",
		url: SITE_URLS.portal,
		role: "申込後の進捗確認と追加書類提出を行う顧客専用画面",
		audience: "WALCへ申込済みのお客様",
		badge: "顧客専用",
		publicInformation: false,
	},
] as const;

/** Header メインナビ */
export const HEADER_NAV: readonly NavLink[] = [
	{ href: "/#visa-types", label: "VISA 一覧" },
	{ href: SITE_URLS.dtv, label: "DTV", external: true },
	{ href: "/visas/non-b-work-permit", label: "NON-B / WP" },
	{ href: SITE_URLS.guideDtv, label: "取得者ガイド", external: true },
	{ href: "/#trouble-support", label: "トラブル対応" },
	{ href: "/#consult", label: "AI 相談" },
	{ href: SITE_URLS.portal, label: "マイページ", external: true },
];

/** 全ページ共通 CTA (VISA 適性診断 + LINE 相談) */
export const GLOBAL_CTAS = {
	diagnosis: {
		href: SITE_URLS.diagnosis,
		label: "VISA 適性診断",
		external: true,
	},
	line: {
		href: SITE_URLS.social.line,
		label: "LINE で相談",
		external: true,
	},
} as const;

/** Footer 関連サイト */
export const FOOTER_RELATED_SITES: readonly NavLink[] = [
	{ href: SITE_URLS.main, label: "個人向けメインサイト", external: true },
	{
		href: SITE_URLS.corporate,
		label: "法人・事業支援サイト",
		external: true,
	},
	{
		href: SITE_URLS.dtv,
		label: "DTV 専門サイト",
		external: true,
	},
	{
		href: SITE_URLS.portal,
		label: "顧客ポータル (会員ログイン)",
		external: true,
	},
	{
		href: SITE_URLS.guideBusiness,
		label: "NON-B / Work Permit ガイド",
		external: true,
	},
	{
		href: SITE_URLS.guideDtv,
		label: "DTV 取得者ガイド",
		external: true,
	},
];

/** Footer 法務リンク (CRM 直参照) */
export const FOOTER_LEGAL_LINKS: readonly NavLink[] = [
	{ href: SITE_URLS.legal.terms, label: "利用規約", external: true },
	{
		href: SITE_URLS.legal.privacy,
		label: "プライバシーポリシー",
		external: true,
	},
	{
		href: SITE_URLS.legal.cancellation,
		label: "キャンセル規定",
		external: true,
	},
];

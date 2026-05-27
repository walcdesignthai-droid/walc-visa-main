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

	/** DTV 最適 VISA 診断 (全ページから誘導) */
	diagnosis: "https://dtv.walc-visa.online/diagnosis",

	/** 企業向け (walc-site → walc-consulting.com) */
	corporate: "https://walc-consulting.com",

	/** 顧客ポータル (walc-visa-crm) */
	portal: "https://crm.walc-visa.online/portal/login",

	/** 法務ページ (CRM 側で一元管理) */
	legal: {
		terms: "https://crm.walc-visa.online/legal/terms",
		privacy: "https://crm.walc-visa.online/legal/privacy",
		cancellation: "https://crm.walc-visa.online/legal/cancellation",
	},

	/** SNS */
	social: {
		line: "https://lin.ee/HQc9axW",
		lineOaShortlink: "https://page.line.me/872bhpgw",
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

/** Header メインナビ */
export const HEADER_NAV: readonly NavLink[] = [
	{ href: "/#visa-types", label: "VISA 一覧" },
	{ href: SITE_URLS.dtv, label: "DTV", external: true },
	{ href: "/visas/retirement", label: "リタイアメント" },
	{ href: "/visas/ltr", label: "LTR" },
	{ href: "/#trouble-support", label: "トラブル対応" },
	{ href: "/#company-info", label: "会社情報" },
];

/** 全ページ共通 CTA (最適 VISA 診断 + LINE 相談) */
export const GLOBAL_CTAS = {
	diagnosis: {
		href: SITE_URLS.diagnosis,
		label: "最適 VISA 診断",
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
		href: SITE_URLS.dtv,
		label: "DTV 専門サイト",
		external: true,
	},
	{
		href: SITE_URLS.corporate,
		label: "企業進出向けサイト",
		external: true,
	},
	{
		href: SITE_URLS.portal,
		label: "顧客ポータル (会員ログイン)",
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

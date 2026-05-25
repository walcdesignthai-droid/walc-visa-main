/**
 * lib/walc-links.ts
 * ----------------------------------------------------------------------------
 * 外部リンク URL の SoT。WALC VISA CRM の申込フォーム / LINE / Zoom 予約等。
 *
 * 設計方針:
 *   - すべての外部 URL を 1 箇所に集約 → ハードコード散在を防止
 *   - 環境変数で本番 URL を切替可能(NEXT_PUBLIC_*)
 *   - 申込 URL には visa_id / source / utm を自動付与 → CRM 側で計測可能
 *
 * 修正履歴:
 *   v1.0 (2026-05-24) — 初版。申込フォーム URL ビルダー実装。
 * ----------------------------------------------------------------------------
 */

/** 申込フォームのデフォルト URL(env 未設定時のフォールバック) */
const DEFAULT_APPLICATION_FORM_URL = "https://crm.walc-visa.online/apply";

/** LINE 公式アカウント友だち追加 URL */
const DEFAULT_LINE_ADD_URL = "https://lin.ee/pQkudMM";

/* ============================================================================
 * 申込フォーム
 * ========================================================================== */

export interface BuildApplicationUrlOptions {
	/** 選択された VISA カテゴリ(例: "dtv-softpower"・"dtv-workation") */
	visaId?: string;
	/** 流入元(例: "lp-diagnosis-result"・"lp-pricing"・"lp-final-cta") */
	source?: string;
	/** UTM medium(任意・LP 内の配置場所別計測) */
	medium?: string;
	/** UTM campaign(任意) */
	campaign?: string;
}

/**
 * 申込フォーム URL を組み立て。
 *
 * 例:
 *   buildApplicationUrl({ visaId: 'dtv-softpower', source: 'lp-diagnosis-result' })
 *   → https://crm.walc-visa.online/apply?visa=dtv-softpower&source=lp-diagnosis-result&utm_source=dtv-lp
 */
export function buildApplicationUrl(
	options: BuildApplicationUrlOptions = {},
): string {
	const base =
		process.env.NEXT_PUBLIC_APPLICATION_FORM_URL ??
		DEFAULT_APPLICATION_FORM_URL;

	const params = new URLSearchParams();

	if (options.visaId) params.set("visa", options.visaId);
	if (options.source) params.set("source", options.source);

	// 計測用 UTM(CRM 側 / GA4 双方で拾える形式)
	params.set("utm_source", "dtv-lp");
	if (options.medium) params.set("utm_medium", options.medium);
	if (options.campaign) params.set("utm_campaign", options.campaign);

	const qs = params.toString();
	return qs ? `${base}?${qs}` : base;
}

/* ============================================================================
 * LINE 関連
 * ========================================================================== */

export function getLineAddUrl(): string {
	return process.env.NEXT_PUBLIC_LINE_ADD_URL ?? DEFAULT_LINE_ADD_URL;
}

/* ============================================================================
 * 外部 SNS / 本家サイト
 * ========================================================================== */

export const EXTERNAL_LINKS = {
	walcMain: "https://walc-visa.online",
	twitter: "https://twitter.com/bkk_visacst",
	crm: "https://crm.walc-visa.online",
	portal: "https://my.walc-visa.online",
} as const;

/**
 * lib/walc-links.ts
 * ----------------------------------------------------------------------------
 * 外部リンク URL の SoT。LINE / CRM / 顧客ポータル等。
 *
 * 設計方針:
 *   - すべての外部 URL を 1 箇所に集約 → ハードコード散在を防止
 *   - 環境変数で本番 URL を切替可能(NEXT_PUBLIC_*)
 *   - 新規申込は現在 LINE first。存在しない公開フォームへは誘導しない
 *
 * 修正履歴:
 *   v1.0 (2026-05-24) — 初版。申込フォーム URL ビルダー実装。
 * ----------------------------------------------------------------------------
 */

/** LINE 公式アカウント友だち追加 URL */
const DEFAULT_LINE_ADD_URL = "https://lin.ee/PGFYVNZ";

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

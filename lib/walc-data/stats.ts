/**
 * lib/walc-data/stats.ts
 * ----------------------------------------------------------------------------
 * WALC VISA 実績統計の SoT(Single Source of Truth)。
 *
 * 設計方針:
 *   - 現状は ハードコード された定数を返す(静的・SSR で安定表示)
 *   - 将来: WALC VISA CRM(crm.walc-visa.online)の新規 REST API
 *     `GET /api/v1/stats/dtv` から動的取得する構造に差し替え可能
 *
 * 公開方針:
 *   - 2026-07-27 Owner 指示により、古い固定値 212/212 は使用しない
 *   - 最新の正確な母数を未確認のため「200 件以上の申請通過実績」に統一
 *   - 数字は実績ベースで控えめに表示し、将来の取得を保証しない
 *
 * 修正履歴:
 *   v1.1 (2026-07-27) — 公開表現を「200 件以上の申請通過実績」に変更。
 * ----------------------------------------------------------------------------
 */

export interface DtvAcquisitionStats {
	/** 公開する保守的な最小実績数 */
	successfulApplicationsAtLeast: number;
	/** 公開表示用ラベル */
	successfulApplicationsLabel: string;
	/** @deprecated 旧コンポーネント互換用。公開表示には使用しない */
	acquired: number;
	/** @deprecated 旧コンポーネント互換用。公開表示には使用しない */
	totalAttempts: number;
	/** 統計の対象期間(表示用ラベル) */
	periodLabel: string;
	/** 統計の最終更新日(YYYY-MM-DD) */
	lastUpdated: string;
	/** WALC 全体の VISA 取得実績(本家サイト整合) */
	walcTotalAcquired: number;
}

/**
 * 現在の DTV 取得統計を返す。
 *
 * 将来 CRM 連動するときは:
 *   1. このファイルの関数内を `await fetch('/api/v1/stats/dtv')` に差し替え
 *   2. Next.js の ISR(revalidate)で 1 時間キャッシュ
 *   3. SSR ページではこの関数を `await` で呼ぶ
 *
 * Server Component 内で呼ぶことを推奨(SEO + 表示安定)。
 */
export function getDtvAcquisitionStats(): DtvAcquisitionStats {
	return {
		successfulApplicationsAtLeast: 200,
		successfulApplicationsLabel: "200 件以上",
		acquired: 200,
		totalAttempts: 200,
		periodLabel: "2025年4月以降",
		lastUpdated: "2026-07-27",
		walcTotalAcquired: 300,
	};
}

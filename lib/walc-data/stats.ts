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
 * 法務的注意:
 *   - 「○件取得 / ○件中(取得率 100%)」の母数明示が景表法上必須
 *   - 数字は実績ベース(誇張禁止)
 *
 * 修正履歴:
 *   v1.0 (2026-05-24) — DTV 212 件で固定。Yosuke 確定済。
 * ----------------------------------------------------------------------------
 */

export interface DtvAcquisitionStats {
	/** 取得成功件数 */
	acquired: number;
	/** 申請総件数(=取得+不許可) */
	totalAttempts: number;
	/** 取得率(% 整数)。100% = 全件取得成功 */
	successRate: number;
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
		acquired: 212,
		totalAttempts: 212,
		successRate: 100,
		periodLabel: "2025 年 4 月 の制度大幅変更以降",
		lastUpdated: "2026-05-24",
		walcTotalAcquired: 300,
	};
}

/**
 * 「○ / ○ 件取得」用の表示文字列を組み立て。
 * 例: { acquired: 212, totalAttempts: 212 } → "212 / 212"
 */
export function formatAcquisitionRatio(stats: DtvAcquisitionStats): string {
	return `${stats.acquired} / ${stats.totalAttempts}`;
}

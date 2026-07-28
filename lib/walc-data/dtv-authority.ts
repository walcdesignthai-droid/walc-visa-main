/**
 * Owner-confirmed public DTV claims.
 * Percentage claims must always be displayed with their scope and disclaimer.
 */
export const DTV_AUTHORITY = {
	application: {
		period: "2025年4月の大幅な制度変更以降",
		label: "申請通過率100%",
		scope:
			"WALCが2025年4月の制度変更以降に申請サポートし、結果を確認できた案件",
		disclaimer:
			"過去実績であり、将来の取得を保証するものではありません。最終判断は審査機関が行います。",
	},
	interview: {
		label: "オンライン面談通過率100%",
		scope: "WALCがオンライン面談対策を行い、結果を確認できた案件",
		disclaimer:
			"過去実績であり、将来の面談結果やVISA取得を保証するものではありません。",
	},
	expertise: {
		label: "タイ在住13年",
	},
} as const;

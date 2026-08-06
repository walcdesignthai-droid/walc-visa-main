/**
 * lib/walc-data/pricing.ts
 * ============================================================================
 * ⚠️ 数値変更時はここを編集 (他箇所への影響範囲: 下記参照)
 *
 * 参照箇所:
 *   - components/lp/VisaTypes.tsx
 *   - components/lp/Pricing.tsx (今後追加)
 *   - lib/concierge/system-prompt.ts (AI が顧客に伝える料金)
 *   - app/visas/[slug]/page.tsx (今後追加)
 *
 * 出典: walc-studio/knowledge/02_pricing_master.md v1.1 (2026-05-14)
 * 最終確認: 2026-05-26 by Yosuke (master file)
 * 改訂時は 02_pricing_master.md を真実とし、本ファイルを更新すること
 *
 * 🔴 推測値の追加禁止 (RULE-NO-SPECULATION.md)
 *    未確認の値はコメントアウト + TODO で明示すること
 * ============================================================================
 */

export type DurationTab = "short" | "one_year" | "long_term";

export interface PricingPlan {
	/** 内部識別子 */
	id: string;
	/** UI 表示用ラベル */
	label: string;
	/** WALC 料金 (THB)。null = 案件別見積 / 提供休止 */
	walcFee: number | null;
	/** 政府費込みか (false の場合は別途案内) */
	govFeeIncluded: boolean;
	/** 補足ノート */
	notes?: string;
	/** ★ 推奨マーカー */
	recommended?: boolean;
}

export interface VisaCategory {
	slug: string;
	shortName: string;
	fullName: string;
	duration: string;
	durationTab: DurationTab;
	/** WALC 第一推奨 (DTV のみ true) */
	recommended: boolean;
	/** 銀行口座開設の可否(申請時点の運用による) */
	bankAccountAvailable: boolean;
	/** 1 行説明 */
	primaryDesc: string;
	plans: PricingPlan[];
	/** 申込時の補足 (家族追加 / 別途見積等) */
	bookingNote?: string;
	/** 詳細ページへのリンクを無効化 (受付絞り / 専用ページ未作成等) */
	linkDisabled?: boolean;
	/** リンク無効時の表示文 */
	linkDisabledReason?: string;
	/** 外部 LP に飛ばす (DTV 専用サイト等)。指定時は internal /visas/{slug} を使わない */
	externalUrl?: string;
}

// ============================================================================
// DTV - WALC 第一推奨 (00_walc_principles.md より)
// ============================================================================

export const VISA_DTV: VisaCategory = {
	slug: "dtv",
	shortName: "DTV",
	fullName: "Destination Thailand Visa",
	duration: "5 年マルチプル / 1 回 180 日滞在",
	durationTab: "long_term",
	recommended: true,
	bankAccountAvailable: false, // DTV取得者限定オプション。可否は個別確認のため UI は「要確認」
	primaryDesc:
		"5 年マルチプル・1 回最長 180 日滞在。リモートワーク・ワーケーション・タイのソフトパワー活動など、対象となる活動目的に応じて申請します。延長可否と手続きは最新の公式案内を確認します。",
	plans: [
		{
			id: "dtv-soft-power",
			label: "タイソフトパワー (ムエタイ)",
			walcFee: 60_000,
			govFeeIncluded: true,
			notes: "申請費・書類作成・ムエタイ学校費・対象期間の宿泊施設費込み",
			recommended: true,
		},
		{
			id: "dtv-nomad",
			label: "ワーケーション (ノマド)",
			walcFee: 45_000,
			govFeeIncluded: true,
			notes: "申請費・書類作成サポート込み",
		},
		{
			id: "dtv-freelance",
			label: "ワーケーション (フリーランス)",
			walcFee: 48_000,
			govFeeIncluded: true,
			notes: "申請費・書類作成サポート込み",
		},
	],
	bookingNote: "DTV-O 家族 VISA (配偶者・15 歳未満の子) は別途見積。",
	// DTV 専用 LP (dtv.walc-visa.online) が既存のため、内部 /visas/dtv は作らず外部リンクで誘導
	externalUrl: "https://dtv.walc-visa.online",
};

// ============================================================================
// NON-O Retirement (50 歳以上)
// ============================================================================

export const VISA_RETIREMENT: VisaCategory = {
	slug: "retirement",
	shortName: "リタイアメント",
	fullName: "NON-O Retirement (50 歳以上)",
	duration: "1 年更新",
	durationTab: "one_year",
	recommended: false,
	bankAccountAvailable: true,
	primaryDesc:
		"50 歳以上の方を対象とする長期滞在の選択肢です。資金・収入・保険・申請地・銀行口座の取扱いは申請区分と時点で異なるため、最新の公式案内とお客様の状況を個別に確認します。",
	plans: [
		{
			id: "retire-new-evisa-japan",
			label: "新規 / 初期 3 ヶ月 NON-O (日本国内 E-VISA)",
			walcFee: 13_000,
			govFeeIncluded: true,
			notes: "★ 渡航前に日本国内で E-VISA 取得",
			recommended: true,
		},
		{
			id: "retire-new-savan",
			label: "新規 / ラオス・サワンナケート",
			walcFee: 26_000,
			govFeeIncluded: true,
			notes: "2 泊 3 日・現地同行",
		},
		{
			id: "retire-new-thailand-full",
			label: "新規 / タイ国内フルサポート",
			walcFee: 72_000,
			govFeeIncluded: true,
			notes: "15 ヶ月分込み・口座開設付",
		},
		{
			id: "retire-renew-standard",
			label: "更新 / タイ国内 1 年延長 (残高 80 万 THB 以上)",
			walcFee: 22_000,
			govFeeIncluded: true,
		},
		{
			id: "retire-renew-walc-original",
			label: "更新 / 残高サポート付 (★ WALC 独自)",
			walcFee: 31_000,
			govFeeIncluded: true,
			notes: "残高 80 万 THB 未満の方向け",
		},
	],
	bookingNote:
		"銀行口座開設サポート: +6,000 THB (新規 02・03 利用者向けオプション)。毎年の更新作業が必要 (5 年マルチプルの DTV と比較検討推奨)。",
};

// ============================================================================
// Thailand Privilege (旧 Thailand Elite)
// ============================================================================

export const VISA_PRIVILEGE: VisaCategory = {
	slug: "privilege",
	shortName: "Thailand Privilege",
	fullName: "旧 Thailand Elite Visa",
	duration: "5〜20 年",
	durationTab: "long_term",
	recommended: false,
	bankAccountAvailable: true,
	primaryDesc:
		"タイの長期滞在会員プログラムです。期間・特典・費用・家族追加・受付条件は、申込時点の公式情報を個別に確認します。",
	plans: [
		{
			id: "privilege-bronze",
			label: "Bronze (5 年・期間限定〜2026/9/30)",
			walcFee: 650_000,
			govFeeIncluded: true,
			notes: "ポイントなし・家族追加不可",
		},
		{
			id: "privilege-gold",
			label: "Gold (5 年・20pt/年)",
			walcFee: 900_000,
			govFeeIncluded: true,
		},
		{
			id: "privilege-platinum",
			label: "Platinum (10 年・35pt/年)",
			walcFee: 1_500_000,
			govFeeIncluded: true,
		},
		{
			id: "privilege-diamond",
			label: "Diamond (15 年・55pt/年)",
			walcFee: 2_500_000,
			govFeeIncluded: true,
		},
		{
			id: "privilege-reserve",
			label: "Reserve (20 年・120pt/年・招待制)",
			walcFee: 5_000_000,
			govFeeIncluded: true,
		},
	],
	bookingNote:
		"価格は政府費用 (Thailand Privilege Card 公定)。WALC 取次手数料は別途・取次時に確定。",
	linkDisabled: true,
	linkDisabledReason: "現在お問い合わせのみ受付中 (新規申込は LINE 個別対応)",
};

// ============================================================================
// LTR (Long-Term Resident)
// ============================================================================

export const VISA_LTR: VisaCategory = {
	slug: "ltr",
	shortName: "LTR",
	fullName: "Long-Term Resident Visa",
	duration: "10 年 (5 年 + 5 年延長)",
	durationTab: "long_term",
	recommended: false,
	bankAccountAvailable: true,
	primaryDesc:
		"BOI が所管する長期滞在 VISA です。WGC / WP / WFTP / HSP の 4 カテゴリーがあり、税務・就労・扶養家族の取扱いは該当カテゴリーと最新の公式情報を確認します。",
	plans: [
		{
			id: "ltr-walc-fee",
			label: "★ WALC 手数料 (10 年フルサポート)",
			walcFee: 180_000,
			govFeeIncluded: false,
			notes: "BOI endorsement / 申請 / 翻訳手配 / アフター込み",
			recommended: true,
		},
		{
			id: "ltr-gov-fee",
			label: "VISA 取得費用 (政府費・10 年・1 人)",
			walcFee: 50_000,
			govFeeIncluded: true,
		},
		{
			id: "ltr-dependent",
			label: "扶養家族追加 (政府費・1 人あたり・最大 4 名)",
			walcFee: 50_000,
			govFeeIncluded: true,
		},
		{
			id: "ltr-dwp",
			label: "Digital Work Permit (任意・年額)",
			walcFee: 3_000,
			govFeeIncluded: true,
		},
	],
	bookingNote:
		"BOI endorsement 35,000 THB / 翻訳・公証費用 2,000〜10,000 THB/書類は別途実費。該当カテゴリー・認定要件・費用内訳を確認した上で個別にご案内します。",
};

// ============================================================================
// 学生 VISA (NON-ED) - WALC では非推奨
// ============================================================================

export const VISA_STUDENT: VisaCategory = {
	slug: "student",
	shortName: "学生 VISA",
	fullName: "NON-ED",
	duration: "6 ヶ月〜1 年",
	durationTab: "one_year",
	recommended: false,
	bankAccountAvailable: true,
	primaryDesc:
		"教育機関での学習を目的とする VISA です。履修期間・出席要件・延長条件・学費・銀行口座の取扱いは、教育機関・入管・金融機関の運用を個別に確認します。",
	plans: [], // 個別案件のみ・WALC 推奨外
	bookingNote:
		"活動内容によっては DTV ソフトパワーが別の選択肢になる場合があります。対象条件・滞在期間・総費用を比較して個別にご案内します。",
	linkDisabled: true,
	linkDisabledReason: "DTV ソフトパワーをご検討ください",
};

// ============================================================================
// 結婚・家族 VISA (NON-O)
// ============================================================================

export const VISA_FAMILY: VisaCategory = {
	slug: "family",
	shortName: "結婚・家族 VISA",
	fullName: "NON-O (Marriage / Family / Guardian)",
	duration: "1 年更新",
	durationTab: "one_year",
	recommended: false,
	bankAccountAvailable: true,
	primaryDesc:
		"タイ人配偶者・タイ国籍の子・親の扶養を理由とする長期滞在 VISA。",
	plans: [], // 案件により対応・料金一律不可
	bookingNote: "案件により対応。料金は個別見積となります。",
	linkDisabled: true,
	linkDisabledReason: "LINE で個別ご相談ください",
};

// ============================================================================
// 全 VISA カテゴリ
// ============================================================================

export const ALL_VISA_CATEGORIES: readonly VisaCategory[] = [
	VISA_DTV,
	VISA_PRIVILEGE,
	VISA_LTR,
	VISA_RETIREMENT,
	VISA_STUDENT,
	VISA_FAMILY,
];

// ============================================================================
// 空港イミグレサポート (独立サービス・抱合せ販売禁止 / 00_walc_principles.md)
// ============================================================================

export interface AirportImmigrationPlan {
	id: string;
	label: string;
	walcFee: number;
	notes?: string;
	dtvDiscount?: boolean;
}

export const AIRPORT_IMMIGRATION_SUPPORT = {
	slug: "airport-immigration",
	shortName: "空港イミグレサポート",
	description: "現在、新規受付を一時停止しています。",
	paused: true,
	plans: [] satisfies AirportImmigrationPlan[],
};

// ============================================================================
// ビザランサポート
// ============================================================================

export const VISA_RUN_SUPPORT = {
	slug: "visa-run",
	shortName: "ビザランサポート",
	description:
		"出入国歴・現在の VISA・活動目的を確認し、短期対応が適切か、長期 VISA を検討すべきかを個別に整理します。受付可否と行程は相談時点で確認します。",
	plans: [
		{
			id: "cambodia-day",
			label: "カンボジア日帰りビザラン",
			walcFee: null as number | null,
			notes: "★ 現在休止中",
		},
		{
			id: "laos-savan-nonb",
			label: "ラオス・サワンナケート Non-B ツアー",
			walcFee: 17_600,
			notes: "提携実績 (参考)",
		},
	],
};

// ============================================================================
// ヘルパー
// ============================================================================

export function visasByTab(tab: DurationTab): VisaCategory[] {
	return ALL_VISA_CATEGORIES.filter((v) => v.durationTab === tab);
}

export function formatTHB(amount: number | null): string {
	if (amount == null) return "—";
	return `${amount.toLocaleString()} THB`;
}

/** カテゴリ最小料金プランの料金を取得 (カード表示用) */
export function categoryFromPrice(cat: VisaCategory): number | null {
	const fees = cat.plans
		.map((p) => p.walcFee)
		.filter((v): v is number => v != null);
	if (fees.length === 0) return null;
	return Math.min(...fees);
}

/** カテゴリ最小料金プラン (推奨マーカー) */
export function categoryRecommendedPlan(cat: VisaCategory): PricingPlan | null {
	return cat.plans.find((p) => p.recommended) ?? cat.plans[0] ?? null;
}

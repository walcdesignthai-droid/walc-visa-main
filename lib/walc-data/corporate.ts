/**
 * lib/walc-data/corporate.ts
 * ============================================================================
 * 法人向け(/corporate/)コンテンツの Single Source of Truth。
 *
 * 🔴 推測ゼロ原則(~/walc-projects/CLAUDE.md §0.2 / RULE-NO-SPECULATION):
 *   - 金額は書かない(案件ごとに異なるため CORPORATE_PRICING_NOTE のみ)。
 *   - 業種別ライセンスは「取得します」と書かない = 要望ベースの「調査」。
 *   - 期間は誇大表現を避けるため必ず二段(値 + 律速要因)で見せる。
 *   - 事例 / お客様の声は出せる実績がないため **枠ごと作らない**。
 *
 * 🔴 「ワンストップ」という語を使わない(競合2社が既に使用 = 差別化にならない)。
 *    範囲の広さは具体名詞で示す。
 *
 * 各ページはこのファイルから読む。ページ側への直書き禁止。
 * ============================================================================
 */

/** WALC VISA Consulting が自ら手続きを担当する対応範囲。 */
export const CORPORATE_SCOPE = [
	"タイ法人設立・会社登記",
	"Work Permit(就労許可)",
	"Non-B ビザ(駐在員)",
	"法人銀行口座開設",
] as const;

/**
 * 対応範囲の説明版(`<dl>` レンダリング用)。
 * ⚠️ カードUIで並べないこと(SaaSテンプレ臭を出さない)。
 */
export const CORPORATE_SCOPE_DETAIL = [
	{
		term: "タイ法人設立・会社登記",
		description:
			"社名の予約から定款、発起人の手配、商務省への登記まで。設立後に必要となる VAT 登録や所在地の登記も続けて進めます。",
		href: "/corporate/company-setup",
	},
	{
		term: "Work Permit(就労許可)",
		description:
			"タイで実際に働くための許可。会社側の書類と申請者側の書類を分けて整理し、労働省への申請まで進めます。",
		href: "/corporate/work-permit",
	},
	{
		term: "Non-B ビザ(駐在員)",
		description:
			"就労を目的とした在留資格。Work Permit とは別の手続きで、取得の順序が結果を左右します。",
		href: "/corporate/work-permit",
	},
	{
		term: "法人銀行口座開設",
		description:
			"設立した法人名義の口座開設。銀行・支店によって求められる書類と面談の運用が異なるため、事前に条件を確認したうえで同行します。",
		href: "/corporate/bank-account",
	},
] as const;

/** 業種別ライセンスは「取得します」と書かない。要望ベースの調査。 */
export const CORPORATE_LICENSE_NOTE = {
	heading: "業種によって必要になる許認可",
	body: "飲食、旅行業、輸出入など、業種ごとに必要なライセンスは異なります。ご要望に応じて、必要な許認可と取得の可否・手順を調査してお伝えします。",
	examples: ["飲食店", "旅行業", "輸出入"],
} as const;

/** WALC DESIGN 領域。必ず「WALC DESIGN が担当」と主語を明示すること。 */
export const BEYOND_SETUP_SERVICES = [
	"WEBサイト制作・デザイン",
	"SEO / MEO / GEO / LLMO 対策",
	"アプリ開発・業務効率化",
	"顧客管理システム導入",
] as const;

/** 設立後領域の説明版。主語は WALC DESIGN。 */
export const BEYOND_SETUP_DETAIL = [
	{
		term: "WEBサイト制作・デザイン",
		description:
			"コーポレートサイト、店舗サイト、ブランドの立ち上げ。タイ語・英語・日本語の併記も含めて設計します。",
	},
	{
		term: "SEO / MEO / GEO / LLMO 対策",
		description:
			"検索エンジンと、AI による検索の両方から見つけてもらうための設計。Google マップ(MEO)の整備も含みます。",
	},
	{
		term: "アプリ開発・業務効率化",
		description:
			"予約、在庫、勤怠など、現場の手作業を減らすための仕組みづくり。既存ツールの組み合わせで足りる場合はそれを提案します。",
	},
	{
		term: "顧客管理システム導入",
		description:
			"顧客情報、来店・購買履歴、LINE を含む連絡手段を一つにまとめ、運用が続く形に整えます。",
	},
] as const;

/** 対応しないことは曖昧にせず明示する。 */
export const CORPORATE_NOT_PROVIDED = ["BOI申請は行いません。"] as const;

/** 期間。誇大表現を避けるため必ず二段で見せる。 */
export const CORPORATE_TIMELINE = [
	{ label: "会社登記", value: "最短1日〜" },
	{ label: "VAT・所在地登記", value: "1〜3ヶ月" },
	{ label: "Work Permit / Non-B", value: "状況により異なります" },
] as const;

/** 競合が誰も書いていない差別化の核。削らないこと。 */
export const CORPORATE_TIMELINE_FACTORS = [
	"タイ人総務の方と、どれだけスムーズに連携できるか",
	"日本側で、意思決定と書類の準備がどれだけ早く進むか",
] as const;

export const CORPORATE_PRICING_NOTE =
	"案件によって必要な手続きが大きく異なるため、料金は個別にお見積りします。ご相談の際に、必要な手続きと概算の費用を先にお伝えします。見積り前に費用が発生することはありません。";

/** 会計はここにのみ置く。対応範囲一覧には入れない。 */
export const CORPORATE_ACCOUNTING_NOTE =
	"設立後の会計・記帳は、提携する会計事務所と連携して対応します。";

// ---------------------------------------------------------------------------
// ご依頼の流れ(/corporate/flow)
// ---------------------------------------------------------------------------

export interface CorporateFlowStep {
	step: string;
	title: string;
	description: string;
}

export const CORPORATE_FLOW: readonly CorporateFlowStep[] = [
	{
		step: "01",
		title: "ご相談",
		description:
			"LINE でご連絡ください。事業の内容、タイでやろうとしていること、日本側の体制をうかがいます。この段階で費用は発生しません。",
	},
	{
		step: "02",
		title: "必要な手続きの整理とお見積り",
		description:
			"うかがった内容から、必要になる手続きと順序を整理し、概算の費用をお伝えします。業種によって許認可が必要な場合は、その調査もここに含めます。",
	},
	{
		step: "03",
		title: "書類のご準備",
		description:
			"日本側でご用意いただくもの、タイ側で用意するものを分けてお渡しします。ここが早く進むほど、全体の期間が短くなります。",
	},
	{
		step: "04",
		title: "登記・申請",
		description:
			"商務省への登記、労働省への Work Permit 申請、入国管理局へのビザ申請を、順序に沿って進めます。進捗はその都度ご報告します。",
	},
	{
		step: "05",
		title: "口座開設・運用開始",
		description:
			"法人口座の開設に同行し、事業が動き出せる状態まで進めます。設立後の会計や、WEB・システムのご相談もここから続けられます。",
	},
] as const;

/** 日本側 / タイ側で分けて示す(どちらが律速かを可視化する)。 */
export const CORPORATE_DOCUMENTS = [
	{
		term: "日本側でご準備いただくもの",
		description:
			"出資者・取締役の方のパスポート、日本の会社が出資する場合は登記事項証明書など。案件によって変わるため、確定したリストをお渡しします。",
	},
	{
		term: "タイ側で用意するもの",
		description:
			"タイ国内の所在地に関する書類、タイ人株主・発起人に関する書類など。手配が必要な場合は WALC が対応します。",
	},
] as const;

// ---------------------------------------------------------------------------
// 下層ページのメタ(Breadcrumb / 一覧で共用)
// ---------------------------------------------------------------------------

export interface CorporatePage {
	path: string;
	label: string;
	/** 一覧・導線での短い説明。 */
	summary: string;
}

export const CORPORATE_PAGES: readonly CorporatePage[] = [
	{
		path: "/corporate/company-setup",
		label: "タイ法人設立・会社登記",
		summary:
			"社名の予約から商務省への登記、VAT・所在地登記まで。業種ごとの許認可の調査も含みます。",
	},
	{
		path: "/corporate/work-permit",
		label: "Work Permit / Non-B ビザ",
		summary:
			"従業員・駐在員が正式に働くための就労許可と在留資格。会社側と申請者側の書類を分けて整理します。",
	},
	{
		path: "/corporate/bank-account",
		label: "法人銀行口座開設",
		summary:
			"法人名義の口座開設。銀行・支店ごとに運用が異なるため、条件を確認したうえで同行します。",
	},
	{
		path: "/corporate/beyond-setup",
		label: "設立後の事業立ち上げ",
		summary:
			"WEBサイト、マーケティング、社内の仕組み。グループの WALC DESIGN が担当します。",
	},
	{
		path: "/corporate/flow",
		label: "ご依頼の流れ・必要書類・期間",
		summary:
			"ご相談から口座開設までの5段階と、日本側・タイ側でご準備いただく書類。",
	},
] as const;

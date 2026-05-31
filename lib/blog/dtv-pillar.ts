/**
 * lib/blog/dtv-pillar.ts — DTV pillar(sq-dtv-jp / WI-026 1 本目)
 * ----------------------------------------------------------------------------
 * 🔴 DRAFT(draft: true)。Cowork 品質ゲート → Owner 承認まで公開しない。
 *
 * 事実の出典(推測ゼロ / YMYL)— 2026-06-01 改訂:
 *   - DTV 制度事実 = **タイ政府一次出典**(e-Visa 公式 / 外務省 DTV チェックリスト /
 *     外務省 DTV 情報 PDF)を `references` に付与し本文末尾に可視掲載。
 *   - 🔴 政府一次出典で裏付けられない主張は本文から**除去**:
 *       「2025/4 厳格化」「2026/4 後も銀行口座不可」「90 日レポート実質不要」
 *       「25〜49 歳(= DTV 要件ではなく WALC 推奨ペルソナ。DTV は 20 歳以上・上限なし)」。
 *   - WALC 料金 = `lib/walc-data/pricing.ts`(VISA_DTV)SOT を interpolate。
 *   - WALC 実績 = `lib/walc-data/stats.ts`(getDtvAcquisitionStats)SOT を interpolate。
 *     成功率(%)・保証表現は使わず「件数 + 母数 + 期間 + 免責」のみ(WI-025 / §6 doctrine)。
 *   - 申請処理期間・New Measures 完全 URL 等の未確定は `placeholders` に残す。
 * ----------------------------------------------------------------------------
 */

import { formatTHB, VISA_DTV } from "@/lib/walc-data/pricing";
import { getDtvAcquisitionStats } from "@/lib/walc-data/stats";
import type { Article } from "./types";

const stats = getDtvAcquisitionStats();

const fee = (id: string): string => {
	const plan = VISA_DTV.plans.find((p) => p.id === id);
	return plan ? formatTHB(plan.walcFee) : "{{要SOT: DTV料金}}";
};

const FEE_SOFT_POWER = fee("dtv-soft-power");
const FEE_NOMAD = fee("dtv-nomad");
const FEE_FREELANCE = fee("dtv-freelance");

export const DTV_PILLAR: Article = {
	slug: "dtv-visa-thailand-guide",
	kind: "pillar",
	promptKey: "sq-dtv-jp",
	title: "タイ DTV ビザ完全ガイド｜要件・費用・5年マルチプルの使い方",
	h1: "タイ DTV ビザ(Destination Thailand Visa)完全ガイド",
	description:
		"タイ DTV ビザの要件・財政基準・滞在ルール・費用を、WALC の実務知見に基づき整理。5 年マルチプル / 1 回 180 日滞在の使い方と、申請前に押さえるべき注意点を解説します。",
	datePublished: "2026-06-01",
	dateModified: "2026-06-01",
	draft: false,
	heroEyebrow: "DTV ピラーガイド",

	// --- answer-first(冒頭で結論。約 200 語) ------------------------------
	// 🔴 政府一次出典で裏付けられない主張(2025/4 厳格化・銀行口座不可・90 日レポート
	//    実質不要)は YMYL のため本文から除去済(WI-026 改訂 2026-06-01)。
	answerFirst: [
		"DTV(Destination Thailand Visa)は、2024 年に導入されたタイの長期滞在ビザです。海外企業のリモートワークやソフトパワー領域(ムエタイ等)の活動を想定し、5 年マルチプル・1 回の滞在は最長 180 日(国内で 180 日の延長を行えば最大 360 日連続滞在)という設計です(タイ外務省 DTV 情報・e-Visa 公式)。",
		"申請にあたっては、50 万 THB 相当の残高が求められます(タイ外務省 DTV チェックリスト)。活動はタイ国内での就労ではなく、海外企業のリモートワークやソフトパワー領域が前提です。必要書類はチェックリストに定められており、本記事末尾の一次出典から確認できます。",
		`WALC では DTV を、ソフトパワー枠 ${FEE_SOFT_POWER}・ノマド ${FEE_NOMAD}・フリーランス ${FEE_FREELANCE}(いずれも申請費・書類サポート込み)で取り扱っています。本ガイドでは要件・費用・滞在ルールを、一次出典に沿って整理します。`,
	],

	// --- 統計(SOT 由来 + 免責。成功率/保証表現は使わない) ------------------
	statsNote: [
		`WALC の DTV 取得実績は ${stats.acquired} 件中 ${stats.acquired} 件(母数 ${stats.totalAttempts} / ${stats.periodLabel} / 最終更新 ${stats.lastUpdated})。WALC 全体では累計 ${stats.walcTotalAcquired} 件超のタイ VISA 取得サポート経験があります。`,
		"これは過去の実績であり、将来の取得を保証するものではありません。要件充足の可否は個別事情・申請時点の運用により異なります。",
	],

	// --- 専門家見解(監修者の見解 / WALC の文書化された方針) ----------------
	expertView: [
		"WALC が主に DTV を案内しているのは、海外企業のリモートワーク、またはソフトパワー領域(ムエタイ等)で活動する方です。これは WALC が想定する利用者像であり、DTV の年齢要件ではありません(DTV の年齢は 20 歳以上・上限なし / タイ外務省 DTV チェックリスト)。",
		"DTV は長期滞在ビザであり、滞在日数・延長・財政要件の運用は今後変わり得ます。申請可否は申請時点の運用に左右されるため、本ガイドの事実は申請前に末尾の一次出典で再確認することを推奨します。",
	],

	// --- 手順(WALC サポートの流れ。確定書類リストは placeholder) ------------
	steps: [
		{
			heading: "1. 適性診断(どの DTV 枠が合うか)",
			body: "活動内容(ソフトパワー / ノマド / フリーランス)・年齢・財政状況から、DTV の該当枠、または DTV 以外が適切かを切り分けます。WALC の無料診断・LINE 相談で初期切り分けが可能です。",
		},
		{
			heading: "2. 要件充足の確認(財政・活動の裏付け)",
			body: "50 万 THB 相当の残高証明や、リモートワーク / ソフトパワー活動の裏付け資料を準備します。必要書類は、タイ外務省の DTV チェックリスト(記事末尾の一次出典)に定められています。",
		},
		{
			heading: "3. 申請・取得",
			body: "必要書類を整え、e-Visa ルートで申請します。WALC では書類作成サポートと申請費を料金に含めて対応します。",
		},
	],

	// --- FAQ(各回答は一次出典に対応 / 政府裏付けのない主張は掲載しない) -----
	faq: [
		{
			question: "DTV ビザの有効期間と 1 回の滞在日数は?",
			answer:
				"5 年マルチプルで、1 回の滞在は最長 180 日です。タイ国内で 180 日の延長を行えば、最大 360 日の連続滞在が可能です(タイ外務省 DTV 情報・e-Visa 公式)。",
		},
		{
			question: "DTV の財政要件(残高)はいくらですか?",
			answer:
				"50 万 THB 相当の残高が求められます。申請区分により、一定期間(例: 3 ヶ月)の残高維持等が求められる場合があります。詳細はタイ外務省 DTV チェックリストをご確認ください(タイ外務省 DTV チェックリスト)。",
		},
		{
			question: "DTV でタイ国内で働けますか?",
			answer:
				"タイ国内での就労は前提とされていません。海外企業のリモートワークやソフトパワー領域の活動が想定されています(タイ外務省 DTV 情報)。",
		},
		{
			question: "DTV の必要書類はどこで確認できますか?",
			answer:
				"タイ外務省の DTV チェックリスト(記事末尾の一次出典)に定められています。申請区分により異なるため最新版を確認してください。",
		},
	],

	// --- cluster 内部リンク枠(本体は後続。未公開は href を張らない) ---------
	clusterLinks: [
		{
			promptKey: "ya-dtv-documents",
			label: "DTV 必要書類の完全リスト",
			plannedSlug: "dtv-required-documents",
			published: true,
		},
		{
			promptKey: "ya-dtv-stay-rule",
			label: "DTV の滞在ルール(180 日 / 延長 / 最大 360 日)",
			plannedSlug: "dtv-stay-rule",
			published: false,
		},
		{
			promptKey: "cc-dtv-vs-agencies",
			label: "DTV を自分で申請 vs 代行に依頼",
			plannedSlug: "dtv-self-vs-agency",
			published: false,
		},
		{
			promptKey: "ya-dtv-balance-500k",
			label: "DTV の 50 万 THB 残高証明の準備",
			plannedSlug: "dtv-balance-500k",
			published: false,
		},
	],

	// --- 事実 → 出典(検証可能性 / 一次出典付与済) ------------------------
	sources: [
		{
			claim: "DTV は 2024 年に導入されたタイの長期滞在ビザ",
			source: "タイ外務省 DTV 情報 PDF / e-Visa 公式(thaievisa.go.th)",
		},
		{
			claim: "5 年マルチプル / 1 回 180 日 / 延長で最大 360 日連続",
			source:
				"タイ外務省 DTV 情報 PDF / e-Visa 公式 + pricing.ts VISA_DTV.duration",
		},
		{
			claim: "財政要件 = 50 万 THB 相当(申請区分により一定期間の残高維持等)",
			source: "タイ外務省 DTV チェックリスト(Checklist_DTV.pdf)",
		},
		{
			claim:
				"活動 = 海外企業のリモートワーク / ソフトパワー領域(タイ国内就労は前提でない)",
			source: "タイ外務省 DTV 情報 PDF",
		},
		{
			claim: "DTV の年齢要件 = 20 歳以上・上限なし",
			source: "タイ外務省 DTV チェックリスト",
		},
		{
			claim: "必要書類はタイ外務省 DTV チェックリストに準拠",
			source: "タイ外務省 DTV チェックリスト(Checklist_DTV.pdf)",
		},
		{
			claim: `WALC 料金 ソフトパワー ${FEE_SOFT_POWER} / ノマド ${FEE_NOMAD} / フリーランス ${FEE_FREELANCE}`,
			source: "lib/walc-data/pricing.ts VISA_DTV.plans(SOT)",
		},
		{
			claim: `WALC DTV 実績 ${stats.acquired}/${stats.totalAttempts}(${stats.periodLabel})・累計 ${stats.walcTotalAcquired}+`,
			source: "lib/walc-data/stats.ts getDtvAcquisitionStats(SOT)",
		},
		{
			claim:
				"WALC が想定する利用者像 = リモート/ソフトパワー層(年齢要件ではない)",
			source: "WALC 方針(00_walc_principles / DTV 第一推奨)",
		},
	],

	// --- 一次出典(政府・公的機関)= 本文末尾に可視掲載 --------------------
	references: [
		{
			label: "タイ e-Visa 公式サイト",
			url: "https://www.thaievisa.go.th/",
		},
		{
			label: "タイ外務省 DTV チェックリスト(必要書類・50 万 THB)",
			url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf",
		},
		{
			label: "タイ外務省 DTV 情報(制度概要・滞在ルール)",
			url: "https://image.mfa.go.th/mfa/0/RzaiZWKBzF/consular/Visa/18.Destination_Thailand_Visa_(DTV).pdf",
		},
	],

	// --- 未確定(本文に書かない)= 公開前に要ソース ------------------------
	placeholders: [
		{
			key: "要完全URL: 新ビザ措置 2024-05-29(MFA)",
			note: "受領した New Measures PDF の URL にパス省略(.../)が含まれ不完全。完全 URL を取得して references に追加する(壊れたリンクを公開しないため現状は未掲載)。",
		},
		{
			key: "要WVIソース: DTV 申請処理期間・E-Visa 運用",
			note: "申請から発給までの標準的な処理期間・E-Visa の申請ルート詳細。一次出典で確定後に追記。",
		},
		{
			key: "要監修コメント: 小野寺 陽介",
			note: "専門家見解ブロックに、監修者本人の verbatim コメントを入れる場合は本人確認のうえ差し込む(現状は WALC の文書化された方針を要約)。",
		},
	],
};

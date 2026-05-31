/**
 * lib/blog/dtv-pillar.ts — DTV pillar(sq-dtv-jp / WI-026 1 本目)
 * ----------------------------------------------------------------------------
 * 🔴 DRAFT(draft: true)。Cowork 品質ゲート → Owner 承認まで公開しない。
 *
 * 事実の出典(推測ゼロ / YMYL):
 *   - DTV 制度事実 = WALC ナレッジベース
 *     `dtv-walc-visa/docs/walc-knowledge-source/knowledge_base/03_thai_visa_glossary.md §4`
 *     + `07_bank_account_2026.md`。**一次出典(タイ政府 e-Visa / 大使館)は未付与**の
 *     ため各規制事実に primaryPending を立て、公開前に Cowork/Owner が付与する。
 *   - WALC 料金 = `lib/walc-data/pricing.ts`(VISA_DTV)SOT を interpolate。
 *   - WALC 実績 = `lib/walc-data/stats.ts`(getDtvAcquisitionStats)SOT を interpolate。
 *     成功率(%)・保証表現は使わず「件数 + 母数 + 期間 + 免責」のみ(WI-025 / §6 doctrine)。
 *   - 申請手順の確定書類リスト等は未確定 → 本文に書かず placeholders に残す。
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
	draft: true,
	heroEyebrow: "DTV ピラーガイド",

	// --- answer-first(冒頭で結論。約 200 語) ------------------------------
	answerFirst: [
		"DTV(Destination Thailand Visa)は、2024 年 7 月に開始したタイの観光カテゴリの長期ビザです。リモートワーカーやソフトパワー領域(ムエタイ等)の活動を想定し、5 年マルチプル・1 回の滞在は最長 180 日(国内で 180 日の延長を行えば最大 360 日連続滞在)という設計になっています。",
		"申請の中心となる財政要件は、50 万 THB 相当の残高を 3 ヶ月維持していること(2025 年 4 月に運用が厳格化)。タイ国内での就労は認められず、海外企業のリモートワークが前提です。銀行口座開設は不可で、これは 2026 年 4 月の制度変更後も継続しています。一方で 90 日レポートは実質的に不要(出入国でリセット)で、長期滞在の運用負担は軽めです。",
		`WALC では DTV を、ソフトパワー枠 ${FEE_SOFT_POWER}・ノマド ${FEE_NOMAD}・フリーランス ${FEE_FREELANCE}(いずれも申請費・書類サポート込み)で取り扱っています。本ガイドでは要件・費用・滞在ルール・よくある誤解を、実務の観点から順に整理します。`,
	],

	// --- 統計(SOT 由来 + 免責。成功率/保証表現は使わない) ------------------
	statsNote: [
		`WALC の DTV 取得実績は、${stats.periodLabel}で ${stats.acquired} 件中 ${stats.acquired} 件(母数 ${stats.totalAttempts})。WALC 全体では累計 ${stats.walcTotalAcquired} 件超のタイ VISA 取得サポート経験があります(${stats.periodLabel}のDTV母数 ${stats.totalAttempts} / 最終更新 ${stats.lastUpdated})。`,
		"これは過去の実績であり、将来の取得を保証するものではありません。要件充足の可否は個別事情・申請時点の運用により異なります。",
	],

	// --- 専門家見解(監修者の見解 / WALC の文書化された方針) ----------------
	expertView: [
		"WALC は、25〜49 歳・リモートワークまたはソフトパワー領域での活動が可能な方について、DTV を長期滞在の第一候補として案内しています。banking が必須の方(銀行口座開設を要する方)は NON-O リタイア・Thailand Privilege・LTR など別カテゴリの検討が必要で、DTV 単独では要件を満たしません。",
		"DTV は『観光カテゴリだが長期』という特性上、滞在日数・延長・財政要件の運用が今後も変わり得ます。申請可否は最新の運用に左右されるため、本ガイドの規制事実は申請前に一次情報での再確認を推奨します。",
	],

	// --- 手順(WALC サポートの流れ。確定書類リストは placeholder) ------------
	steps: [
		{
			heading: "1. 適性診断(どの DTV 枠が合うか)",
			body: "活動内容(ソフトパワー / ノマド / フリーランス)・年齢・財政状況から、DTV の該当枠、または DTV 以外が適切かを切り分けます。WALC の無料診断・LINE 相談で初期切り分けが可能です。",
		},
		{
			heading: "2. 要件充足の確認(財政・活動の裏付け)",
			body: "50 万 THB 相当の残高維持や、リモートワーク / ソフトパワー活動の裏付け資料を確認します。具体的な必要書類の確定リストは下記プレースホルダ参照(一次情報での確定が必要)。",
		},
		{
			heading: "3. 申請・取得",
			body: "必要書類を整え、e-Visa ルートで申請します。WALC では書類作成サポートと申請費を料金に含めて対応します。",
		},
	],

	// --- FAQ(各回答は KB 事実に対応) --------------------------------------
	faq: [
		{
			question: "DTV ビザの有効期間と 1 回の滞在日数は?",
			answer:
				"5 年マルチプルで、1 回の滞在は最長 180 日です。タイ国内で 180 日の延長を行えば、最大 360 日の連続滞在が可能です。",
		},
		{
			question: "DTV の財政要件(残高)はいくらですか?",
			answer:
				"50 万 THB 相当の残高を 3 ヶ月維持していることが基準です(2025 年 4 月に運用が厳格化)。",
		},
		{
			question: "DTV でタイの銀行口座は開設できますか?",
			answer:
				"できません。DTV では銀行口座開設は不可で、2026 年 4 月の制度変更後も継続しています。口座開設が必須の方は NON-O リタイア・Thailand Privilege・LTR をご検討ください。",
		},
		{
			question: "DTV でタイ国内で働けますか?",
			answer:
				"タイ国内での就労はできません。海外企業のリモートワークは可能です。",
		},
		{
			question: "DTV で 90 日レポートは必要ですか?",
			answer: "実質的に不要です(罰則がなく、出入国でリセットされます)。",
		},
	],

	// --- cluster 内部リンク枠(本体は後続。未公開は href を張らない) ---------
	clusterLinks: [
		{
			promptKey: "ya-dtv-documents",
			label: "DTV 必要書類の完全リスト",
			plannedSlug: "dtv-documents",
			published: false,
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

	// --- 事実 → 出典(検証可能性) ------------------------------------------
	sources: [
		{
			claim: "DTV は 2024 年 7 月開始の観光カテゴリ長期ビザ",
			source: "WALC KB 03_thai_visa_glossary.md §4(制度開始 2024年7月)",
			primaryPending: true,
		},
		{
			claim: "5 年マルチプル / 1 回 180 日 / 延長で最大 360 日連続",
			source: "WALC KB 03_glossary §4 + pricing.ts VISA_DTV.duration",
			primaryPending: true,
		},
		{
			claim: "財政要件 = 50 万 THB 相当を 3 ヶ月維持(2025年4月厳格化)",
			source: "WALC KB 03_glossary §4(残高要件)",
			primaryPending: true,
		},
		{
			claim: "銀行口座開設は不可(2026年4月制度変更後も継続)",
			source:
				"WALC KB 03_glossary §4 / 07_bank_account_2026.md + pricing.ts(bankAccountAvailable:false)",
			primaryPending: true,
		},
		{
			claim: "90 日レポートは実質不要(罰則なし・出入国でリセット)",
			source: "WALC KB 03_glossary §4",
			primaryPending: true,
		},
		{
			claim: "タイ国内就労不可・海外リモートワーク可",
			source: "WALC KB 03_glossary §4",
			primaryPending: true,
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
			claim: "DTV を 25〜49 歳・リモート/ソフトパワー層の第一候補として案内",
			source:
				"WALC KB 03_glossary §(VISA選定マトリクス)/ 00_walc_principles(DTV第一推奨)",
		},
	],

	// --- 未確定(本文に書かない)= 公開前に要ソース ------------------------
	placeholders: [
		{
			key: "要一次出典: タイ政府 e-Visa / 大使館",
			note: "DTV の有効期間・財政要件・滞在日数・就労条件の各規制事実に、タイ政府 e-Visa(thaievisa.go.th)または在京タイ大使館の一次 URL を付与してから公開する。",
		},
		{
			key: "要WVIソース: DTV 必要書類の確定リスト",
			note: "申請に必要な書類の確定リスト(財政証明の形式・リモートワーク証憑の種類等)。WVI knowledge_chunks(grade S/A)または一次情報で確定後に本文化。現状は steps で概要のみ。",
		},
		{
			key: "要WVIソース: DTV 申請処理期間・E-Visa 運用",
			note: "申請から発給までの標準的な処理期間・E-Visa の申請ルート詳細。確定後に追記。",
		},
		{
			key: "要監修コメント: 小野寺 陽介",
			note: "専門家見解ブロックに、監修者本人の verbatim コメントを入れる場合は本人確認のうえ差し込む(現状は WALC の文書化された方針を要約)。",
		},
	],
};

/**
 * lib/blog/dtv-stay-rule.ts — cluster(ya-dtv-stay-rule / WI-026)
 * ----------------------------------------------------------------------------
 * 公開済(draft: false)。WI-026 cluster batch 公開(2026-06-01)。
 *
 * 事実の出典(推測ゼロ / YMYL):
 *   - 滞在日数・延長・最大 360 日 = タイ外務省 DTV 情報 / e-Visa 公式
 *     (+ pricing.ts VISA_DTV.duration と整合)。
 *   - 🔴 90 日レポートの DTV 具体扱いは gov 一次出典が取れないため**断定しない**。
 *     一般制度の説明にとどめ、要否は placeholders + 一次出典/イミグレ確認とする。
 *   - 延長の要件・手数料・回数の確定値は未確定 → placeholders。
 *   - pillar(dtv-visa-thailand-guide)と双方向内部リンク。
 * ----------------------------------------------------------------------------
 */

import type { Article } from "./types";

export const DTV_STAY_RULE: Article = {
	slug: "dtv-stay-rule",
	kind: "cluster",
	promptKey: "ya-dtv-stay-rule",
	title: "DTV ビザの滞在ルール｜180 日・延長・最大 360 日連続滞在",
	h1: "タイ DTV ビザの滞在ルール(180 日 / 延長 / 最大 360 日)",
	description:
		"タイ DTV ビザの滞在日数・延長・最大 360 日連続滞在のルールを、タイ外務省 DTV 情報・e-Visa 公式に基づき整理。5 年マルチプルの使い方と 90 日レポートの考え方を解説します。",
	datePublished: "2026-06-01",
	dateModified: "2026-06-01",
	draft: false,
	heroEyebrow: "DTV クラスター｜滞在ルール",

	answerFirst: [
		"DTV(Destination Thailand Visa)は 5 年マルチプルで、1 回の入国あたり最長 180 日の滞在が認められます。タイ国内で延長手続きを行えば、さらに 180 日延長でき、最大 360 日の連続滞在が可能です(タイ外務省 DTV 情報・e-Visa 公式)。",
		"5 年の有効期間中は、何度でも入出国できます(マルチプル)。180 日を超えて滞在したい場合は、タイ国内での延長手続き、または一度出国して再入国する運用になります。延長の要件・回数は申請時点の運用により異なるため、一次出典での確認を推奨します。",
	],

	bodySections: [
		{
			heading: "滞在日数の基本ルール",
			lead: "DTV の滞在は「有効期間 5 年」と「1 回あたりの滞在日数」を分けて考えます。",
			items: [
				"有効期間: 5 年(マルチプルエントリー)",
				"1 回の入国あたりの滞在: 最長 180 日",
				"延長: タイ国内で 180 日の延長が可能 → 最大 360 日の連続滞在",
				"5 年間は何度でも入出国可能(再入国で新たな 180 日)",
			],
		},
		{
			heading: "180 日を超えて滞在するには",
			lead: "連続して 180 日を超えたい場合の選択肢です。",
			items: [
				"タイ国内での延長手続き(イミグレーション)で 180 日延長 → 最大 360 日連続滞在",
				"または一度出国して再入国(マルチプルのため新たな 180 日)",
				"延長の要件・手数料・回数は申請時点の運用により異なります(一次出典・イミグレーションで確認)",
			],
		},
		{
			heading: "90 日レポートの考え方",
			lead: "90 日レポートは、同一住所に 90 日以上連続して滞在する外国人に関わる、タイ入国管理局への届出制度です。",
			items: [
				"出入国を挟むと、連続滞在日数のカウントは入国時点から数え直しになります",
				"DTV における 90 日レポートの具体的な要否・方法は、滞在の連続性や申請時点の運用により異なります",
				"本ガイドでは断定せず、正式な要否はタイ入国管理局・一次出典でのご確認を推奨します",
			],
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "DTV で 1 回に何日滞在できますか?",
			answer:
				"1 回の入国で最長 180 日です。タイ国内で 180 日延長すれば、最大 360 日の連続滞在ができます(タイ外務省 DTV 情報・e-Visa 公式)。",
		},
		{
			question: "DTV の有効期間は?",
			answer:
				"5 年間のマルチプルエントリーです。期間中は何度でも入出国でき、再入国ごとに新たな 180 日の滞在が認められます。",
		},
		{
			question: "180 日を超えて滞在したい場合は?",
			answer:
				"タイ国内での延長手続き、または一度出国して再入国します。延長の要件・回数は申請時点の運用によります。",
		},
		{
			question: "DTV で 90 日レポートは必要ですか?",
			answer:
				"90 日レポートは、同一住所に 90 日以上連続して滞在する場合に関わる届出です。DTV での具体的な要否は滞在状況・申請時点の運用により異なるため、タイ入国管理局・一次出典でご確認ください(本ガイドでは断定しません)。",
		},
	],

	clusterLinks: [
		{
			promptKey: "sq-dtv-jp",
			label: "タイ DTV ビザ完全ガイド(ピラー)",
			plannedSlug: "dtv-visa-thailand-guide",
			published: true,
		},
		{
			promptKey: "ya-dtv-documents",
			label: "DTV 必要書類の完全リスト",
			plannedSlug: "dtv-required-documents",
			published: false,
		},
		{
			promptKey: "ya-dtv-balance-500k",
			label: "DTV の 50 万 THB 残高証明の準備",
			plannedSlug: "dtv-balance-500k",
			published: false,
		},
	],

	sources: [
		{
			claim: "5 年マルチプル / 1 回 180 日 / 国内延長で最大 360 日連続",
			source:
				"タイ外務省 DTV 情報 PDF / e-Visa 公式 + pricing.ts VISA_DTV.duration",
		},
		{
			claim: "マルチプルエントリー(再入国で新たな 180 日)",
			source: "タイ外務省 DTV 情報 PDF / e-Visa 公式",
		},
		{
			claim: "90 日レポート = 同一住所 90 日以上連続滞在の届出制度(一般)",
			source: "タイ入国管理局(一般制度)。DTV 具体扱いは断定せず一次出典確認",
		},
	],

	references: [
		{
			label: "タイ外務省 DTV 情報(制度概要・滞在ルール)",
			url: "https://image.mfa.go.th/mfa/0/RzaiZWKBzF/consular/Visa/18.Destination_Thailand_Visa_(DTV).pdf",
		},
		{
			label: "タイ e-Visa 公式サイト",
			url: "https://www.thaievisa.go.th/",
		},
	],

	placeholders: [
		{
			key: "要WVIソース: DTV の 90 日レポートの正式な要否",
			note: "DTV 保持者に 90 日レポートが課されるか・方法の確定。タイ入国管理局/一次出典で確認後、本文を断定形へ更新する(現状は断定しない)。",
		},
		{
			key: "要WVIソース: 延長の要件・手数料・回数の確定",
			note: "タイ国内での 180 日延長の正式な要件・手数料・上限回数。一次出典/イミグレで確定後に追記。",
		},
	],
};

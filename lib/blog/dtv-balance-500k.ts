/**
 * lib/blog/dtv-balance-500k.ts — cluster(ya-dtv-balance-500k / WI-026)
 * ----------------------------------------------------------------------------
 * 🔴 DRAFT(draft: true)。Cowork 品質ゲート → Owner 受入まで公開しない。
 *
 * 事実の出典(推測ゼロ / YMYL)— 出典区分を明記:
 *   - 50 万 THB / Statement≠Certificate / 3 ヶ月維持 = タイ外務省 DTV チェックリスト
 *     (政府一次出典)+ WALC 申請実務スペック 01_dtv_spec.md。
 *   - 「口座の所在国を問わない / 複数口座の合算可」= WALC 申請実務スペック由来
 *     (= WALC 実務。政府一次出典ではない)。本文で「WALC の申請実務では案内」と明記。
 *   - 正式・最新の維持期間・合算可否は一次出典確認 → placeholders。
 * ----------------------------------------------------------------------------
 */

import type { Article } from "./types";

export const DTV_BALANCE_500K: Article = {
	slug: "dtv-balance-500k",
	kind: "cluster",
	promptKey: "ya-dtv-balance-500k",
	title: "DTV の 50 万 THB 残高証明の準備｜Statement と Certificate の違い",
	h1: "タイ DTV ビザの 50 万 THB 残高証明の準備",
	description:
		"タイ DTV ビザの財政要件 50 万 THB の準備を、Bank Statement(入出金明細)と Bank Certificate(残高証明書)の違い、3 ヶ月維持の考え方まで、外務省チェックリストと WALC 実務に基づき整理します。",
	datePublished: "2026-06-01",
	dateModified: "2026-06-01",
	draft: true,
	heroEyebrow: "DTV クラスター｜50 万 THB 残高",

	answerFirst: [
		"DTV(Destination Thailand Visa)の財政要件は 50 万 THB 相当の残高です(タイ外務省 DTV チェックリスト)。準備で重要なのは、残高証明書(Bank Certificate)ではなく入出金明細(Bank Statement)が求められる点、そして一定期間(例: 3 ヶ月)の維持が見られる点です。",
		"以下では、残高要件の基本・Statement と Certificate の違い・残高維持の考え方を整理します。口座の所在国や複数口座の合算など、運用に関わる点は WALC の申請実務での案内として区別して記載します。",
	],

	bodySections: [
		{
			heading: "50 万 THB 残高の基本",
			lead: "DTV の財政要件の前提です。",
			items: [
				"DTV の財政要件は 50 万 THB 相当の残高(タイ外務省 DTV チェックリスト)",
				"口座の所在国は問わないと WALC の申請実務では案内(WALC 実務)",
				"複数口座の合算で要件を満たすケースも WALC の申請実務では案内(WALC 実務)",
			],
		},
		{
			heading: "Bank Statement と Bank Certificate の違い",
			lead: "DTV で求められるのは「明細」です。混同に注意してください。",
			items: [
				"Bank Statement(入出金明細)= 取引履歴。DTV ではこちらが求められます",
				"Bank Certificate(残高証明書)= ある時点の残高証明。Statement の代わりにはなりません",
				"3 ヶ月以上の入出金明細(Statement)を準備します",
			],
		},
		{
			heading: "残高維持の考え方",
			lead: "「ある瞬間の残高」ではなく「維持」が見られる運用です。",
			items: [
				"申請区分により、一定期間(例: 3 ヶ月)の残高維持が見られる運用です",
				"一時的な入金は審査で確認される運用のため、計画的な残高管理が安全です",
				"正式・最新の維持期間はタイ外務省 DTV チェックリストでご確認ください",
			],
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "残高証明書(Certificate)ではダメですか?",
			answer:
				"DTV では入出金明細(Bank Statement)が求められます。残高証明書(Bank Certificate)は Statement の代わりにはなりません。",
		},
		{
			question: "50 万 THB はいつ時点で必要ですか?",
			answer:
				"申請区分により、一定期間(例: 3 ヶ月)の残高維持が見られる運用です。正式な期間はタイ外務省 DTV チェックリストをご確認ください。",
		},
		{
			question: "複数の口座を合算できますか?",
			answer:
				"WALC の申請実務では、複数口座の合算で要件を満たすケースを案内しています。正式な可否は一次出典でご確認ください。",
		},
		{
			question: "どの国の口座でもよいですか?",
			answer:
				"WALC の申請実務では、口座の所在国は問わないと案内しています。正式な要件は一次出典でご確認ください。",
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
			promptKey: "ya-dtv-stay-rule",
			label: "DTV の滞在ルール(180 日 / 最大 360 日)",
			plannedSlug: "dtv-stay-rule",
			published: false,
		},
	],

	sources: [
		{
			claim:
				"財政要件 = 50 万 THB 相当 / Statement(明細)が必要 / 一定期間(例 3 ヶ月)維持",
			source:
				"タイ外務省 DTV チェックリスト(Checklist_DTV.pdf)+ WALC 申請実務スペック 01_dtv_spec.md Ch.2",
		},
		{
			claim:
				"口座の所在国を問わない / 複数口座の合算可(= WALC 実務・政府一次出典ではない)",
			source: "WALC 申請実務スペック 01_dtv_spec.md Ch.2(WALC 実務)",
		},
	],

	references: [
		{
			label: "タイ外務省 DTV チェックリスト(必要書類・50 万 THB)",
			url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf",
		},
		{
			label: "タイ e-Visa 公式サイト",
			url: "https://www.thaievisa.go.th/",
		},
	],

	placeholders: [
		{
			key: "要一次出典: 残高維持期間の正式値・合算可否",
			note: "50 万 THB の維持期間(3 ヶ月か等)と複数口座合算・口座所在国の正式な可否を、タイ外務省 DTV チェックリスト(PDF)で突合し、確定後に本文を更新する。",
		},
	],
};

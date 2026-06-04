/**
 * lib/blog/qa-90day-report.ts — Q&A(WI-038 / 手続き・暮らしのQ&A)
 * ----------------------------------------------------------------------------
 * 🔴 DRAFT(draft: true)。Cowork Chrome 検証 + YMYL ゲート → Owner 目視まで非公開。
 * 内容 = Cowork 草案 drafts/blog-article-01-90day-report-online.md(コピー/出典不変)。
 * 出典 = タイ入管 TM47 / Bangkok Immigration。監修 = Yosuke Onodera(eeat.ts)。
 * ----------------------------------------------------------------------------
 */

import type { Article } from "./types";

export const QA_90DAY_REPORT: Article = {
	slug: "thailand-90-day-report-online",
	kind: "cluster",
	promptKey: "qa-90day-report-online",
	title: "タイの90日レポート(TM47)をオンラインで提出する方法【2026年版】",
	h1: "タイの90日レポート(TM47)をオンラインで提出する方法",
	description:
		"タイに90日以上滞在する外国人に義務づけられた「90日レポート(TM47)」。2回目以降はオンラインで提出できます。対象条件・手順・申請タイミング・結果確認まで、入管の一次情報ベースで解説します。",
	datePublished: "2026-06-03",
	dateModified: "2026-06-03",
	draft: false,
	heroEyebrow: "手続きガイド ・ 90日レポート",
	category: "qa",
	tags: ["90日レポート", "TM47", "入国管理", "オンライン申請"],
	cover: {
		motif: "calendar",
		kicker: "手続きガイド ・ 90日レポート",
		titleLines: ["90日レポートを、", "オンラインで提出。"],
		accentWord: "オンライン",
		sub: "対象条件・手順・申請タイミングを、入管の一次情報ベースで。",
	},

	answerFirst: [
		"タイに90日を超えて滞在する外国人には、現住所を入国管理局へ届け出る「90日レポート(TM47)」が義務づけられています。出入国とは別の手続きで、滞在が続く限り90日ごとに繰り返し必要です。",
		"2026年現在、2回目以降はオンライン(tm47.immigration.go.th)で提出でき、入管へ行く負担を大きく減らせます。本記事は、対象条件・手順・タイミング・結果確認を、入管の公式情報をもとに整理します。",
	],

	bodySections: [
		{
			heading: "90日レポートとは",
			items: [
				"滞在が90日を超える外国人が、現在の居住地を入管に届け出る手続き。ビザの更新・出入国とは別物です。",
				"短期の出国をはさんで再入国した場合は、原則として入国日から起算して次回期限が再設定されます(個別事情は管轄入管の判断によります)。",
			],
		},
		{
			heading: "オンライン申請の対象条件",
			items: [
				"初回の届出は、本人または委任した代理人が、管轄の入国管理局で対面で行う必要があります。",
				"その初回以降の90日レポートは、オンラインサービスで提出可能です。",
				"対応ブラウザ: Google Chrome / Firefox / Microsoft Edge(最新版推奨)。",
			],
		},
		{
			heading: "オンライン提出の手順(概要)",
			items: [
				"1. tm47.immigration.go.th(Apply for Notification of Staying in the Kingdom)にアクセス。",
				"2. パスポート情報・到着情報・現住所など必要事項を入力して申請。",
				"3. 登録したメールアドレス宛に結果が届く(申請直後は「Pending(承認待ち)」表示)。",
			],
		},
		{
			heading: "申請のタイミング(重要)",
			items: [
				"期限の15日前から提出可能です。期限を過ぎる前に申請を完了させてください。",
				"期限を過ぎると遅延扱いとなり、入管の運用により罰金等の対象となる場合があります(金額・運用は管轄により異なります)。",
			],
		},
		{
			heading: "結果の確認",
			items: [
				"申請後、3営業日以内に登録メールへ結果が通知されます。承認されるまでは「Pending」。",
				"受理メール/控えは、次回の手続きや在留の証明のために保管しておくと安心です。",
			],
		},
		{
			heading: "よくあるつまずき",
			items: [
				"初回をオンラインで済ませようとして弾かれる(初回は対面が必要)。",
				"期限ギリギリで申請し、承認の3営業日を待てずに期限超過。",
				"住所変更後に古い住所のまま提出。",
			],
		},
		{
			heading: "ご利用にあたって(免責)",
			lead: "本記事は2026年時点の公開情報に基づく一般的な解説です。制度・運用は変更される場合があり、最終的なご判断は管轄入国管理局の最新情報・個別状況に従ってください。将来の手続き結果を保証するものではありません。",
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "初回からオンラインで提出できますか?",
			answer:
				"初回の届出は管轄の入国管理局で対面で行う必要があります。オンライン提出ができるのは2回目以降です。",
		},
		{
			question: "いつから提出できますか?",
			answer:
				"期限の15日前から提出可能です。期限を過ぎる前に申請を完了させてください。",
		},
		{
			question: "提出結果はどう確認しますか?",
			answer:
				"申請後3営業日以内に登録メールへ結果が通知されます。承認されるまでは「Pending(承認待ち)」と表示されます。",
		},
		{
			question: "出国して再入国した場合の次回期限は?",
			answer:
				"原則として入国日から起算して次回期限が再設定されます。個別事情は管轄入管の判断によります。",
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
			promptKey: "qa-re-entry-permit",
			label: "リエントリーパーミット(TM.8)取得方法",
			plannedSlug: "thailand-re-entry-permit",
			published: false,
		},
	],

	sources: [
		{
			claim:
				"90日レポートのオンライン提出(2回目以降)・手順・タイミング・結果確認",
			source:
				"タイ入国管理局 オンライン90日届出 / Bangkok Immigration TM47 Online マニュアル・90 days report 案内",
		},
	],

	references: [
		{
			label: "タイ入国管理局 オンライン90日届出システム(TM47)",
			url: "https://tm47.immigration.go.th/",
		},
		{
			label: "Immigration Division 1(Bangkok)TM.47 Online マニュアル",
			url: "https://bangkok.immigration.go.th/en/tm47online-manual/",
		},
		{
			label: "Immigration Division 1(Bangkok)90 days report 案内",
			url: "https://bangkok.immigration.go.th/en/90days-report/",
		},
	],

	placeholders: [],
};

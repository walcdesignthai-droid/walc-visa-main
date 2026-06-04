/**
 * lib/blog/qa-reentry-permit.ts — Q&A(WI-038 / 手続き・暮らしのQ&A)
 * ----------------------------------------------------------------------------
 * 🔴 DRAFT。内容 = Cowork 草案 drafts/blog-article-02-reentry-permit.md(コピー/出典不変)。
 * 料金は草案=入管一次出典(Bangkok Immigration fee)。監修 = Yosuke Onodera。
 * ----------------------------------------------------------------------------
 */

import type { Article } from "./types";

export const QA_REENTRY_PERMIT: Article = {
	slug: "thailand-re-entry-permit",
	kind: "cluster",
	promptKey: "qa-re-entry-permit",
	title:
		"タイのリエントリーパーミット(TM.8)取得方法【2026年版】— 出国前に取得を",
	h1: "タイのリエントリーパーミット(TM.8)取得方法",
	description:
		"長期ビザ・延長中に一時帰国するとき、リエントリーパーミット(TM.8)を取らずに出国すると在留資格が失効します。シングル/マルチの違い・料金・取得場所・手順を入管の一次情報で解説します。",
	datePublished: "2026-06-03",
	dateModified: "2026-06-03",
	draft: false,
	heroEyebrow: "手続きガイド ・ 出入国",
	category: "qa",
	tags: ["リエントリーパーミット", "TM8", "出入国", "ビザ維持"],
	cover: {
		motif: "passport",
		kicker: "手続きガイド ・ 出入国",
		titleLines: ["出国前に、取得を。", "リエントリーパーミット。"],
		accentWord: "リエントリー",
		sub: "取らずに出国すると在留資格が失効。料金・取得場所・手順を一次情報で。",
	},

	answerFirst: [
		"タイの長期ビザや延長(エクステンション)で滞在している方が、リエントリーパーミット(再入国許可・TM.8)を取らずに出国すると、それまでの在留許可は失効します。",
		"再入国許可を出国前に取得しておけば、戻ってから残りのビザ期間をそのまま継続できます。一時帰国・近隣国出張の前に、取り忘れないよう注意したい手続きです。",
	],

	bodySections: [
		{
			heading: "どんなときに必要か",
			items: [
				"長期ビザ/延長で滞在中に、一度でもタイを出る予定があるとき(出張・一時帰国・旅行)。",
				"これを取らずに出国すると在留許可が切れ、戻った際に最初からビザを取り直しになりかねません。",
			],
		},
		{
			heading: "種類と料金(2026年時点)",
			items: [
				"シングル(1回限り): 1,900 バーツ — 1回の出国・再入国に対応。",
				"マルチプル(期間内何度でも): 3,800 バーツ — ビザ有効期間内なら複数回の出入国に対応。",
				"年に複数回出国する見込みがあれば、マルチの方が割安になることが多いです。",
			],
		},
		{
			heading: "どこで取得できるか",
			items: [
				"入国管理局(例: バンコクは Immigration Division 1〔Chaengwattana, 政府合同庁舎 B棟2F〕)。所要は概ね30分程度。",
				"主要空港(スワンナプーム等)の出国前カウンターでも申請可能。ただし出発当日の空港申請は混雑・時間切れのリスクがあるため、事前に入管で取得が安心です。",
			],
		},
		{
			heading: "手順(概要)",
			items: [
				"1. 申請書 TM.8(Application for Re-Entry Permit)を記入。",
				"2. パスポート・手数料・写真等を添えて窓口へ提出。",
				"3. パスポートにリエントリーパーミットが押印されます。",
			],
		},
		{
			heading: "よくあるつまずき",
			items: [
				"取得し忘れて出国 → 在留資格が失効(最重要)。",
				"頻繁に出るのにシングルを選んで割高に。",
				"空港申請に頼り、当日の混雑で間に合わない。",
			],
		},
		{
			heading: "ご利用にあたって(免責)",
			lead: "本記事は2026年時点の公開情報に基づく一般的な解説です。料金・運用は変更される場合があり、最終判断は管轄入国管理局の最新情報・個別状況に従ってください。将来の手続き結果を保証するものではありません。",
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "リエントリーパーミットを取らずに出国するとどうなりますか?",
			answer:
				"それまでの在留許可が失効します。戻った際に最初からビザを取り直しになりかねないため、出国前の取得が必須です。",
		},
		{
			question: "シングルとマルチプルの違いは?",
			answer:
				"シングル(1,900 バーツ)は1回の出国・再入国に対応、マルチプル(3,800 バーツ)はビザ有効期間内なら複数回の出入国に対応します。年に複数回出るならマルチが割安になることが多いです。",
		},
		{
			question: "どこで取得できますか?",
			answer:
				"入国管理局のほか、主要空港の出国前カウンターでも申請できます。当日の空港申請は混雑・時間切れのリスクがあるため、事前に入管での取得が安心です。",
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
			promptKey: "qa-90day-report-online",
			label: "90日レポート(TM47)をオンラインで提出する方法",
			plannedSlug: "thailand-90-day-report-online",
			published: false,
		},
	],

	sources: [
		{
			claim:
				"リエントリーパーミット(TM.8)の必要性・種類・料金(1,900/3,800 バーツ)・取得場所・手順",
			source:
				"Immigration Division 1(Bangkok)Re-entry Permit / 手数料 / タイ入国管理局 Public Handbook",
		},
	],

	references: [
		{
			label: "Immigration Division 1(Bangkok)Re-entry Permit",
			url: "https://bangkok.immigration.go.th/en/re-entry-permit/",
		},
		{
			label: "Immigration Division 1(Bangkok)手数料",
			url: "https://bangkok.immigration.go.th/en/fee_en/",
		},
		{
			label: "タイ入国管理局 Public Handbook(Re-Entry Permit)",
			url: "https://immigration.go.th/citizen_manual/guid_en5.pdf",
		},
	],

	placeholders: [],
};

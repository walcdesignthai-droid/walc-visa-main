/**
 * lib/blog/dtv-required-documents.ts — cluster(ya-dtv-documents / WI-026)
 * ----------------------------------------------------------------------------
 * 🔴 DRAFT(draft: true)。Cowork 品質ゲート → Owner 受入まで公開しない。
 *
 * 事実の出典(推測ゼロ / YMYL):
 *   - 書類項目 = WALC 申請実務スペック
 *     `dtv-walc-visa/docs/walc-knowledge-source/spec/01_dtv_spec.md Ch.2 / Ch.4`
 *     (共通必須書類・区分別追加書類・家族 DTV-O)。
 *   - 正式・最新の要件 = タイ外務省 DTV チェックリスト(references に掲載)。
 *   - 区分・個別事情による「大使館追加書類」の確定内容は未確定 → placeholders。
 *   - pillar(dtv-visa-thailand-guide)と双方向内部リンク(clusterLinks)。
 * ----------------------------------------------------------------------------
 */

import type { Article } from "./types";

export const DTV_REQUIRED_DOCUMENTS: Article = {
	slug: "dtv-required-documents",
	kind: "cluster",
	promptKey: "ya-dtv-documents",
	title:
		"DTV ビザの必要書類 完全リスト｜共通・区分別(ソフトパワー/ノマド/家族)",
	h1: "タイ DTV ビザの必要書類 完全リスト",
	description:
		"タイ DTV ビザの必要書類を、全カテゴリ共通 + 申請区分別(ソフトパワー / ワーケーション / 家族)に整理。Bank Statement と残高証明の違い、50 万 THB の扱いまで、外務省チェックリスト準拠で解説します。",
	datePublished: "2026-06-01",
	dateModified: "2026-06-01",
	draft: true,
	heroEyebrow: "DTV クラスター｜必要書類",

	answerFirst: [
		"DTV(Destination Thailand Visa)の必要書類は、全カテゴリ共通の基本書類(パスポート・財政証明・滞在関連)と、申請区分(ソフトパワー / ワーケーション(ノマド・フリーランス)/ 家族)ごとの追加書類で構成されます。財政面では、50 万 THB 相当の残高に加え、3 ヶ月分の入出金明細(Bank Statement)が重要です。",
		"以下は WALC が申請実務で案内している書類です。最新・正式な要件はタイ外務省の DTV チェックリスト(記事末尾の一次出典)をご確認ください。申請区分や入国歴・個別事情により、大使館から追加書類を求められる場合があります。",
	],

	bodySections: [
		{
			heading: "全カテゴリ共通の必須書類",
			lead: "申請区分を問わず必要になる基本書類です。",
			items: [
				"顔写真付きパスポート(有効期限 6 ヶ月以上)",
				"銀行取引証明 3 ヶ月分(残高 50 万 THB 相当以上 / どの国の口座でも可)",
				"3 ヶ月以上の入出金明細(Bank Statement。残高証明書 Bank Certificate とは別物)",
				"タイ渡航の航空券情報(取得確定後で可)",
				"タイ滞在先の宿泊証明(WALC で用意可能)",
				"日本側の本人確認(運転免許証・マイナンバーカード・住民票・日本入国スタンプ のいずれか)",
			],
		},
		{
			heading: "申請区分別の追加書類",
			lead: "活動内容により、共通書類に加えて以下が必要です。",
			items: [
				"ソフトパワー(ムエタイ等): アクティビティ証明(WALC 提携施設で作成)+ 大使館の追加書類",
				"ワーケーション(ノマド): 勤務先の登記簿謄本(海外は英文)・在職証明(海外は英文必須)・収入証明(3〜6 ヶ月以上)",
				"ワーケーション(フリーランス): ポートフォリオ(オンライン収入の証明)・取引証明 または 業務委託契約書(英文推奨)・収入証明",
				"家族(DTV-O / 配偶者・15 歳未満の子): 戸籍謄本(日本語のままで可。出生証明・結婚証明も可)。配偶者は扶養のため DTV 取得者の口座入出金明細が再度必要",
			],
		},
		{
			heading: "申請前に押さえる注意点",
			items: [
				"Bank Statement(入出金明細)と Bank Certificate(残高証明書)は別物。DTV では「明細」が求められます",
				"財政要件は 50 万 THB 相当の残高を一定期間(例: 3 ヶ月)維持していること。一時的な入金は審査で確認される運用です",
				"申請区分・入国歴・個別事情により、大使館から追加書類を求められる場合があります",
			],
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "Bank Statement と Bank Certificate の違いは?",
			answer:
				"Bank Statement は入出金の明細、Bank Certificate は残高証明書です。DTV では 3 ヶ月分の入出金明細(Statement)が求められます。",
		},
		{
			question: "50 万 THB はいつ時点で必要ですか?",
			answer:
				"申請区分により、一定期間(例: 3 ヶ月)の残高維持が求められる場合があります。詳細はタイ外務省 DTV チェックリストをご確認ください。",
		},
		{
			question: "家族申請で戸籍謄本の翻訳は必要ですか?",
			answer:
				"家族(DTV-O)申請では、戸籍謄本は日本語のままで受け付けられる運用です(出生証明・結婚証明でも可)。",
		},
		{
			question: "書類はすべて自分で用意しますか?",
			answer:
				"宿泊証明やソフトパワーのアクティビティ証明など、WALC で用意・サポートできる書類があります。区分別の追加書類は個別にご案内します。",
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
			promptKey: "ya-dtv-balance-500k",
			label: "DTV の 50 万 THB 残高証明の準備",
			plannedSlug: "dtv-balance-500k",
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
				"全カテゴリ共通必須書類(パスポート / 取引証明3ヶ月 / 明細 / 航空券 / 宿泊証明 / 本人確認)",
			source:
				"WALC 申請実務スペック 01_dtv_spec.md Ch.2(全カテゴリ共通必須書類)",
		},
		{
			claim: "区分別追加書類(ソフトパワー / ノマド / フリーランス)",
			source: "WALC 申請実務スペック 01_dtv_spec.md Ch.2(カテゴリ別)",
		},
		{
			claim: "家族(DTV-O)= 戸籍謄本(日本語可)+ 配偶者は DTV 取得者の入出金明細",
			source: "WALC 申請実務スペック 01_dtv_spec.md Ch.4(DTV-O 家族 VISA)",
		},
		{
			claim:
				"財政要件 = 50 万 THB 相当 + 3 ヶ月の入出金明細(Statement ≠ Certificate)",
			source:
				"WALC 申請実務スペック 01_dtv_spec.md Ch.2 + タイ外務省 DTV チェックリスト",
		},
	],

	references: [
		{
			label: "タイ外務省 DTV チェックリスト(必要書類・50 万 THB)",
			url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf",
		},
		{
			label: "タイ外務省 DTV 情報(制度概要)",
			url: "https://image.mfa.go.th/mfa/0/RzaiZWKBzF/consular/Visa/18.Destination_Thailand_Visa_(DTV).pdf",
		},
		{
			label: "タイ e-Visa 公式サイト",
			url: "https://www.thaievisa.go.th/",
		},
	],

	placeholders: [
		{
			key: "要一次出典: チェックリストの正式項目名・様式",
			note: "タイ外務省 DTV チェックリスト(PDF)の正式な書類項目名・様式と本文の対応を突合し、相違があれば本文を更新する。",
		},
		{
			key: "要WVIソース: 大使館追加書類の具体内容",
			note: "区分・入国歴・個別事情で発生する「大使館追加書類」の具体的な内容。確定後に区分別セクションへ追記。",
		},
	],
};

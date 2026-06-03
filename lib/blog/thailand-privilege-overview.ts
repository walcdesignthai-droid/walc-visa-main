/**
 * lib/blog/thailand-privilege-overview.ts — ビザ別ガイド(会員制長期滞在)
 * ----------------------------------------------------------------------------
 * 🔴 DRAFT。Thailand Privilege(旧 Thailand Elite)現行プラン概要。YMYL ゲート 0。
 * 推測ゼロ: メンバーシップ名・年数・入会金は thailandprivilege.co.th 公式で
 * 当日(2026-06)verify 済の現行プランのみ記載。金額は「目安・最新は公式で確認」。
 * 旧プラン名(Elite Easy Access 等)は現行と断定しない。監修 = Yosuke Onodera。
 * ----------------------------------------------------------------------------
 */

import type { Article } from "./types";

export const THAILAND_PRIVILEGE_OVERVIEW: Article = {
	slug: "thailand-privilege-overview",
	kind: "cluster",
	promptKey: "gd-thailand-privilege",
	title:
		"Thailand Privilege(旧Thailand Elite)現行プラン概要｜5区分の入会金目安・年数・特典・就労不可を解説",
	h1: "Thailand Privilege(旧Thailand Elite)現行プラン概要",
	description:
		"会員制の長期滞在プログラム Thailand Privilege(旧 Thailand Elite)の現行メンバーシップ5区分(Bronze/Gold/Platinum/Diamond/Reserve)について、入会金の目安・滞在年数・主な特典・PEビザの位置づけ・就労不可といった基本をわかりやすく整理。金額や条件は改定が多いため、最新は公式でご確認ください。",
	datePublished: "2026-06-04",
	dateModified: "2026-06-04",
	draft: true,
	heroEyebrow: "ビザ別ガイド ・ Thailand Privilege",
	category: "guide",
	tags: [
		"Thailand Privilege",
		"Thailand Elite",
		"長期滞在",
		"PEビザ",
		"会員制",
	],
	cover: {
		motif: "stamp",
		kicker: "ビザ別ガイド ・ Thailand Privilege",
		titleLines: ["会員制で長期滞在。", "5区分の中身。"],
		accentWord: "5区分の中身",
		sub: "入会金の目安・滞在年数・特典・就労不可を、現行プラン基準で整理。",
	},

	answerFirst: [
		"Thailand Privilege(旧 Thailand Elite)は、入会金を一度支払うことで5〜20年の長期滞在資格(PE=Privilege Entry ビザ)と各種特典を得られる、タイ政府系の会員制プログラムです。運営は Thailand Privilege Card Co., Ltd.(観光・スポーツ省の所管下にある国営企業)で、就労を目的としたビザではなく、ワークパーミット(労働許可)は付帯しません。",
		"現行のメンバーシップは Bronze・Gold・Platinum・Diamond・Reserve の5区分で、入会金と滞在年数は区分ごとに異なります。入会金は原則として一度きりの支払いで、年会費は不要とされています。ただしプラン構成・金額・特典・期間限定の優待は改定が多いため、本記事の金額はあくまで目安として捉え、申し込み前に公式で最新情報をご確認ください。",
	],

	bodySections: [
		{
			heading: "Thailand Privilege とは(旧 Thailand Elite)",
			lead: "かつて「Thailand Elite」として知られていたプログラムは、Thailand Privilege へと名称・制度が刷新されました。会員制で、入会金を支払うことで長期滞在資格と特典を得る仕組みです。",
			items: [
				"運営: Thailand Privilege Card Co., Ltd.(観光・スポーツ省の所管下にある国営企業)。",
				"付与される滞在資格: PE(Privilege Entry)ビザ。区分に応じて5〜20年の長期滞在が可能。",
				"位置づけ: 就労ではなく、長期滞在・暮らしの利便性を主目的としたプログラム。ワークパーミットは付帯しません。",
				"支払い: 入会金は原則一度きり(年会費は不要とされる)。最新の支払い条件は公式でご確認ください。",
			],
		},
		{
			heading: "現行メンバーシップ5区分(入会金・年数の目安)",
			lead: "現行は5区分で、入会金と滞在年数が区分ごとに異なります。下表は2026年6月時点に公式で確認できた目安で、金額・年数・特典は改定される場合があります。最新は公式でご確認ください。",
			items: [
				"Bronze: 入会金 650,000バーツ目安／滞在5年。長期滞在の基本機能を備えた入門区分。",
				"Gold: 入会金 900,000バーツ目安／滞在5年。年間の特典ポイントが付与される区分。",
				"Platinum: 入会金 1,500,000バーツ目安／滞在10年。家族・長期居住者向けの中位区分。",
				"Diamond: 入会金 2,500,000バーツ目安／滞在15年。より手厚い特典・長期間の区分。",
				"Reserve: 入会金 5,000,000バーツ目安／滞在20年規模。最上位の招待制とされる区分。",
				"※ 金額・年数・区分名は改定されることがあります。期間限定の優待や入会条件が設定される時期もあるため、上表は目安として扱い、最新は公式で確認してください。",
			],
		},
		{
			heading: "主な特典(区分により範囲が異なる)",
			lead: "特典の具体的な範囲は区分によって異なります。下記は公式で案内されている代表的な項目で、内容・付与数・提携先は改定される場合があります。",
			items: [
				"空港でのVIP対応・ファストトラック(入国手続きの優先レーン等)。",
				"90日レポートや銀行口座開設などの生活サポート(専任の担当によるアシスト)。",
				"多言語のコンタクトセンターによる問い合わせ対応。",
				"特典ポイント制度(上位区分で付与。年間付与数は区分により異なる。Bronzeはポイント対象外とされる)。",
				"提携ホテルの優待・各種割引などのライフスタイル特典。",
			],
		},
		{
			heading: "就労はできる? — PEビザと労働許可の関係",
			lead: "Thailand Privilege のPEビザは長期滞在のための資格で、それ自体では就労できません。タイで働くには別途ワークパーミット(労働許可)が必要です。",
			items: [
				"PE(Privilege Entry)ビザは就労を目的とした在留資格ではなく、ワークパーミットは付帯しません。",
				"タイ国内で就労・事業活動を行う場合は、別途の在留資格・労働許可の枠組みが必要になります。",
				"リモートワークや就労の扱いは個別事情・最新の運用に左右されます。就労を伴う滞在を検討する場合は、LTRやビジネス系ビザなど別の選択肢も含めて比較するのが実務的です。",
			],
		},
		{
			heading: "向いている人・検討のポイント",
			lead: "資金に余裕があり、銀行残高の維持や頻繁な更新の手間を抑えて長期滞在したい人に向きます。就労が必要かどうかで、そもそも別ビザを検討すべきかが変わります。",
			items: [
				"就労せず長期で腰を据えたい → 区分(年数)と入会金の目安から候補を絞る。",
				"タイ法人で働く・事業を行う → Privilege ではなくビジネス系ビザを検討(Privilege は就労不可)。",
				"資産・年金・専門性で要件を満たせそう → LTRなど他の長期ビザとの比較も有効。",
				"「何年滞在したいか」「就労の要否」を先に決めると、区分選び・他ビザとの比較がスムーズです。",
			],
		},
		{
			heading: "ご利用にあたって(免責)",
			lead: "本記事は2026年6月時点で公式に確認できた公開情報に基づく一般的な解説です。メンバーシップの区分名・入会金・滞在年数・特典・期間限定の優待・就労や在留資格の取り扱いは改定される場合があり、最終判断は Thailand Privilege 公式およびタイ入国管理局・関係当局の最新案内に従ってください。本記事は将来の入会可否や特定の特典・滞在を保証するものではありません。",
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "Thailand Privilege と Thailand Elite は違うものですか?",
			answer:
				"かつて Thailand Elite として知られていたプログラムが、Thailand Privilege へと名称・制度を刷新したものです。現行のメンバーシップ区分や入会金は刷新後の内容で案内されています。古いプラン名や旧料金が現行と異なる場合があるため、最新は公式でご確認ください。",
		},
		{
			question: "入会金は一度払えば年会費はかかりませんか?",
			answer:
				"入会金は原則として一度きりの支払いで、年会費は不要とされています。ただし支払い条件や区分構成は改定されることがあるため、申し込み前に公式の最新案内で確認することをおすすめします。",
		},
		{
			question: "Thailand Privilege のビザで働けますか?",
			answer:
				"いいえ。付与されるPE(Privilege Entry)ビザは長期滞在のための資格で、ワークパーミット(労働許可)は付帯しません。タイで就労・事業を行う場合は別途の在留資格・労働許可が必要です。就労を伴う滞在は、LTRやビジネス系ビザなど別の選択肢も含めて検討してください。",
		},
		{
			question: "どの区分を選べばよいですか?",
			answer:
				"まず「何年滞在したいか」と「就労の要否」を決めると候補を絞りやすくなります。就労が不要で長期滞在が目的なら、滞在年数と入会金の目安(Bronze〜Reserve)から比較します。金額・年数・特典は改定されるため、最終的には公式の最新情報で確認してください。",
		},
	],

	clusterLinks: [
		{
			promptKey: "cmp-visa-comparison",
			label: "タイ長期滞在ビザ 早見比較",
			plannedSlug: "visa-comparison",
			published: false,
		},
		{
			promptKey: "gd-ltr-categories-tax",
			label: "LTRビザの対象カテゴリと税優遇",
			plannedSlug: "ltr-categories-tax",
			published: false,
		},
		{
			promptKey: "cmp-dtv-vs-tourist",
			label: "DTV vs 観光ビザ 徹底比較",
			plannedSlug: "dtv-vs-tourist",
			published: false,
		},
	],

	sources: [
		{
			claim:
				"現行メンバーシップ5区分(Bronze/Gold/Platinum/Diamond/Reserve)の入会金目安・滞在年数・主な特典",
			source: "Thailand Privilege 公式(thailandprivilege.co.th)",
			primaryPending: false,
		},
		{
			claim:
				"運営主体(Thailand Privilege Card Co., Ltd. / 観光・スポーツ省所管の国営企業)・PEビザの位置づけ・就労不可(ワークパーミット非付帯)",
			source: "Thailand Privilege 公式 / タイ入国管理局",
			primaryPending: false,
		},
	],

	references: [
		{
			label: "Thailand Privilege 公式サイト",
			url: "https://www.thailandprivilege.co.th",
		},
		{
			label: "Thailand Privilege メンバーシップ比較(公式)",
			url: "https://www.thailandprivilege.co.th/why-thailand/compare-thailand-privilege-card-membership-packages-find-the-perfect-fit-for-you",
		},
		{
			label: "タイ入国管理局(Immigration Bureau)公式サイト",
			url: "https://www.immigration.go.th",
		},
	],

	placeholders: [
		{
			key: "bronze-promotion-end-date",
			note: "Bronze 区分(650,000バーツ目安)の期間限定優待・終了日は第三者情報で食い違いがあり公式で日付未確認。公開時に公式の最新案内で要再確認。確定するまで本文に具体的な終了日は記載しない。",
		},
		{
			key: "reserve-validity-years",
			note: "Reserve の滞在年数は公式で『20年規模(20+)』表記。正確な年数・更新条件は公開時に公式で要確認。",
		},
		{
			key: "points-and-benefits-detail",
			note: "各区分の年間ポイント付与数・提携先・優待の詳細は改定が多い。公開時点の公式案内で最新化すること。",
		},
	],
};

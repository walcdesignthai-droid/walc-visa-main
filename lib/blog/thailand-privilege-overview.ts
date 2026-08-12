/**
 * lib/blog/thailand-privilege-overview.ts — ビザ別ガイド(会員制長期滞在)
 * ----------------------------------------------------------------------------
 * Thailand Privilege と旧 Thailand Elite の違い・現行プラン概要。YMYL ゲート 0。
 * 推測ゼロ: メンバーシップ名・年数・入会金は thailandprivilege.co.th 公式で
 * 当日(2026-07)verify 済の現行プランのみ記載。金額は「目安・最新は公式で確認」。
 * 旧プラン名(Elite Easy Access 等)は現行と断定しない。監修 = Yosuke Onodera。
 * ----------------------------------------------------------------------------
 */

import type { Article } from "./types";

export const THAILAND_PRIVILEGE_OVERVIEW: Article = {
	slug: "thailand-privilege-overview",
	kind: "cluster",
	promptKey: "gd-thailand-privilege",
	title: "Thailand PrivilegeとThailand Eliteの違い｜現行5プラン・旧会員の扱い",
	h1: "Thailand PrivilegeとThailand Eliteの違い｜現行5プランと旧会員の扱い",
	description:
		"Thailand PrivilegeとThailand Eliteの違いを、2023年の名称・ロゴ刷新、旧プラン会員の継続・任意アップグレード、新規申込向け現行5区分、料金・年数・就労可否まで公式情報で整理します。",
	datePublished: "2026-06-04",
	dateModified: "2026-07-30",
	draft: false,
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
		titleLines: ["Thailand Eliteとの", "違いを整理。"],
		accentWord: "違いを整理",
		sub: "名称変更・旧会員の扱い・現行5区分を、公式情報で確認。",
	},

	answerFirst: [
		"結論: Thailand Privilegeは、Thailand Eliteが2023年に名称・ロゴを刷新した現行ブランドです。運営は引き続き Thailand Privilege Card Co., Ltd.で、まったく別の民間ビザへ変わったわけではありません。",
		"旧プランの会員は従来区分のまま継続でき、希望者は条件を満たして所定の費用を支払うことで新制度へのアップグレードを検討できます。一方、新規申込では Bronze・Gold・Platinum・Diamond・Reserve の現行5区分から選びます。旧会員が一律に現行プランへ切り替わる仕組みではありません。",
		"Thailand Privilegeは、入会金を支払うことで5〜20年以上の長期滞在資格(PE=Privilege Entry ビザ)と区分別の特典を得るタイ政府系の会員制プログラムです。PEビザ自体にワークパーミットは付帯しないため、タイ国内での就労には別の在留資格・労働許可を確認する必要があります。",
	],

	bodySections: [
		{
			heading: "Thailand PrivilegeとThailand Eliteの違い(結論)",
			lead: "違いの中心は、2023年のブランド名・ロゴと新規メンバーシップ体系の刷新です。運営主体が別会社へ変わったのではなく、Thailand Elite CardからThailand Privilege Cardへブランドが移行しました。",
			items: [
				"名称・ロゴ: Thailand EliteからThailand Privilegeへ変更。公式は2023年のリブランディングとして案内しています。",
				"旧プランの会員は従来区分のまま継続可能。公式案内では、希望者が残存期間などの条件を満たし、アップグレード費用等を支払って新制度へ移行する選択肢も示されています。",
				"新規申込: 現在は Bronze・Gold・Platinum・Diamond・Reserve の5区分から選択します。",
				"運営: Thailand Privilege Card Co., Ltd.。タイ国政府観光庁(TAT)が唯一の株主である国営企業として公式に案内されています。",
			],
		},
		{
			heading: "現行メンバーシップ5区分(入会金・年数の目安)",
			lead: "新規申込向けの現行プランは5区分で、入会金と滞在年数が区分ごとに異なります。下表は2026年7月30日時点に公式で確認できた目安で、金額・年数・特典は改定される場合があります。最新は公式でご確認ください。",
			items: [
				"Bronze: 入会金 650,000バーツ目安／滞在5年。特典ポイントの付与はなしとされる入門区分。",
				"Gold: 入会金 900,000バーツ目安／滞在5年。年間20ポイント目安の特典ポイントが付与される区分。",
				"Platinum: 入会金 1,500,000バーツ目安／滞在10年。年間35ポイント目安。家族・長期居住者向けの中位区分。",
				"Diamond: 入会金 2,500,000バーツ目安／滞在15年。年間55ポイント目安。より手厚い特典・長期間の区分。",
				"Reserve: 入会金 5,000,000バーツ目安／滞在20年(公式は「20+」と表記)。年間120ポイント目安の最上位区分。",
				"※ 上表の入会金・滞在年数・年間ポイント数は2026年7月30日時点に公式の比較ページで確認できた目安です。金額・年数・区分名・ポイント数は改定されることがあります。期間限定の優待や入会条件が設定される時期もあるため、上表は目安として扱い、最新は公式で確認してください。",
			],
		},
		{
			heading: "主な特典(区分により範囲が異なる)",
			lead: "特典の具体的な範囲は区分によって異なります。下記は公式で案内されている代表的な項目で、内容・付与数・提携先は改定される場合があります。",
			items: [
				"空港でのVIP対応・ファストトラック(入国手続きの優先レーン等)。",
				"90日レポートや銀行口座開設などの生活サポート(専任の担当によるアシスト)。",
				"多言語のコンタクトセンターによる問い合わせ対応。",
				"特典ポイント制度(上位区分で付与。年間付与数は区分により異なり、公式の比較ページではGold 20・Platinum 35・Diamond 55・Reserve 120ポイントが目安として案内されています。Bronzeはポイント対象外とされる。付与数・交換内容は改定される場合があり、最新は公式で確認してください)。",
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
			lead: "本記事は2026年7月30日時点で公式に確認できた公開情報に基づく一般的な解説です。メンバーシップの区分名・入会金・滞在年数・特典・期間限定の優待・就労や在留資格の取り扱いは改定される場合があり、最終判断は Thailand Privilege 公式およびタイ入国管理局・関係当局の最新案内に従ってください。本記事は将来の入会可否や特定の特典・滞在を保証するものではありません。",
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "Thailand Privilege と Thailand Elite は違うものですか?",
			answer:
				"Thailand Privilegeは、Thailand Eliteが2023年に名称・ロゴと新規メンバーシップ体系を刷新した現行ブランドです。旧プランの会員は従来区分のまま継続でき、条件を満たす希望者には有料アップグレードの選択肢があります。旧会員が一律に現行5区分へ自動移行するわけではありません。",
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
			published: true,
		},
		{
			promptKey: "gd-ltr-categories-tax",
			label: "LTRビザの対象カテゴリと税優遇",
			plannedSlug: "ltr-categories-tax",
			published: true,
		},
		{
			promptKey: "cmp-dtv-vs-tourist",
			label: "DTV vs 観光ビザ 徹底比較",
			plannedSlug: "dtv-vs-tourist",
			published: true,
		},
	],

	sources: [
		{
			claim: "2023年のThailand EliteからThailand Privilegeへの名称・ロゴ変更",
			source:
				"Thailand Privilege 公式「Your freedom of choices to endless privileges」",
			primaryPending: false,
		},
		{
			claim:
				"旧プラン会員は従来区分を継続可能で、条件を満たす希望者に有料アップグレードの選択肢があること",
			source: "Thailand Privilege 公式「Membership Upgrade Information」",
			primaryPending: false,
		},
		{
			claim:
				"現行5区分の入会金・有効期間・年間Privilege Points(Bronze なし／Gold 20／Platinum 35／Diamond 55／Reserve 120)",
			source:
				"Thailand Privilege 公式 メンバーシップ比較ページ(2026-07-30確認)",
			primaryPending: false,
		},
		{
			claim:
				"運営主体がThailand Privilege Card Co., Ltd.でTATが唯一の株主であること、PEビザに就労許可が自動付帯しないこと",
			source:
				"Thailand Privilege 公式「Who We Are」「Thailand Visa for Digital Nomads」",
			primaryPending: false,
		},
	],

	references: [
		{
			label: "Thailand Privilege 公式｜ブランド変更",
			url: "https://www.thailandprivilege.co.th/news/more-choices-more-freedom",
		},
		{
			label: "Thailand Privilege 公式｜旧プラン会員とアップグレード",
			url: "https://www.thailandprivilege.co.th/news/membership-upgrade-information",
		},
		{
			label: "Thailand Privilege メンバーシップ比較(公式)",
			url: "https://www.thailandprivilege.co.th/why-thailand/compare-thailand-privilege-card-membership-packages-find-the-perfect-fit-for-you",
		},
		{
			label: "Thailand Privilege 公式｜運営会社と沿革",
			url: "https://www.thailandprivilege.co.th/about",
		},
		{
			label: "Thailand Privilege 公式｜PEビザと就労許可",
			url: "https://www.thailandprivilege.co.th/why-thailand/thailand-visa-for-digital-nomads",
		},
	],

	placeholders: [
		{
			key: "bronze-promotion-end-date",
			note: "2026-07-30 verify 時点、公式比較ページ(thailandprivilege.co.th/why-thailand/compare-...)には Bronze の期間限定優待・終了日の記載なし。第三者(報道・代理店)では具体的な終了日の言及があるが公式一次ソースで日付未確認かつ食い違いがあるため、本文には記載しない。公開時に公式で要再確認。",
		},
		{
			key: "benefits-partners-detail",
			note: "各区分の年間ポイント付与数(Gold 20/Platinum 35/Diamond 55/Reserve 120・Bronzeなし)は 2026-07-30 公式比較ページで確認済・反映済。ただし提携先・優待の具体内容(対象ホテル・サービス・ポイント交換レート等)は改定が多く公式比較表だけでは確定不可。公開時点の公式案内で最新化すること。",
		},
	],
};

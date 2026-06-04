import type { Article } from "./types";

/**
 * thailand-work-permit.ts — タイのワークパーミット(労働許可証)の取得と更新
 * ----------------------------------------------------------------------------
 * WI: WVI ブログ権威ハブ(cluster / guide)。労働許可証そのものに focus。
 * Non-B ビザ更新記事(non-b-visa-extension)とは役割分担:
 *   - 本記事 = 労働許可証(Work Permit)の取得・更新・e-Work Permit。
 *   - non-b-visa-extension = 滞在許可(Non-B)の延長手続き。
 *
 * 🔴 YMYL 推測ゼロ: 料金・必要書類・期間は一次/準一次出典で verify できたもののみ。
 *    管轄(雇用局事務所)・業種・BOI 有無で変動する事項は「公式で確認」と一般化。
 * verify 実施日: 2026-06-04(WebSearch)。
 * ----------------------------------------------------------------------------
 */

export const THAILAND_WORK_PERMIT: Article = {
	slug: "thailand-work-permit",
	kind: "cluster",
	promptKey: "gd-work-permit",
	title:
		"タイのワークパーミット(労働許可証)取得と更新ガイド｜Non-Bとの関係・e-Work Permit",
	h1: "タイのワークパーミット(労働許可証)取得と更新ガイド",
	description:
		"タイで就労するには Non-B ビザに加えて労働許可証(Work Permit)が必要です。Non-B との関係、必要書類、申請の流れ、更新、そしてオンライン化された e-Work Permit 制度までを、公式情報の確認を前提に整理します。",
	datePublished: "2026-06-04",
	dateModified: "2026-06-04",
	draft: false,
	heroEyebrow: "ビザ別ガイド｜就労",
	category: "guide",
	tags: ["ワークパーミット", "労働許可証", "Non-B", "e-Work Permit", "就労"],
	readingMinutes: 9,
	cover: {
		motif: "documents",
		kicker: "WORK PERMIT",
		titleLines: ["タイの労働許可証", "取得と更新"],
		accentWord: "労働許可証",
		sub: "Non-B ビザとの関係・必要書類・e-Work Permit",
	},

	answerFirst: [
		"タイで就労するには、入国・滞在のための「Non-B ビザ(就労目的の非移民ビザ)」と、実際に働く許可である「労働許可証(Work Permit)」の2つが原則として必要です。Non-B ビザだけでは働けません。",
		"労働許可証はタイ労働省 雇用局(Department of Employment)が、雇用主(タイで登記された会社など)を通じて発給します。発給には、雇用主側の会社書類、申請者の学歴証明、タイの医療機関が発行する健康診断書などが求められます(必要書類は管轄事務所・業種により異なるため公式で確認)。",
		"申請・更新はオンライン化され、雇用局の e-Work Permit システム(eworkpermit.doe.go.th)が中心です(2025年10月13日からオンライン手続きが原則とされています)。紙での提出は、システム障害などの場合に限り経過的に認められる扱いで、その期限はこれまで複数回延長されています(取り扱い・期限は変更されうるため最新を公式で確認)。",
		"労働許可証は雇用主・職種に紐づくため、転職した場合は許可証の更新・新規取得が必要になります。詳細・最新の運用は雇用局の公式情報で事前に確認してください。",
	],

	bodySections: [
		{
			heading: "ワークパーミットとは ― Non-B ビザとの違い",
			lead: "「ビザ」と「労働許可証」は別物です。役割を分けて理解することが第一歩です。",
			items: [
				"Non-B ビザ(就労目的の非移民ビザ):タイに入国・滞在するための許可。働く許可そのものではありません。",
				"労働許可証(Work Permit):タイ国内で特定の雇用主のもと、特定の職務を行うことを認める許可。労働省 雇用局が発給します。",
				"原則として両方が必要で、Non-B ビザを得たうえで労働許可証を取得する流れになります。Non-B の取得・延長手続きは別記事(関連リンク参照)で扱います。",
				"労働許可証は雇用主・職種に紐づくため、勤務先や職務が変わると手続きが必要になります。",
			],
		},
		{
			heading: "申請に必要となる主な書類(一般的な例)",
			lead: "雇用主側と申請者側の双方で書類を準備します。具体的な必要書類・部数・有効期間は管轄事務所や業種、Board of Investment(BOI)の有無で異なるため、公式・雇用主経由であらかじめ確認してください。",
			items: [
				"申請者側:有効なパスポート、Non-B ビザのページ・入国スタンプの写し、学歴・資格を証する証明書、タイの医療機関が発行する健康診断書(一定の疾患がないことの証明)、写真など。",
				"健康診断書は、タイの法令で定められた特定の疾患(ハンセン病・第3期梅毒・結核・象皮病・薬物中毒・慢性アルコール中毒)に該当しないことの証明が求められます。タイ政府公式情報では、健康診断書の有効期間は健診日から60日とされています(目安。取り扱いは医療機関・管轄により異なる場合があるため、申請時期に合わせて事前に確認)。",
				"雇用主側:会社の登記証明、株主名簿、財務諸表など、会社の実在と雇用能力を示す書類。",
				"BOI 奨励企業の場合は、提出書類や手続き(健康診断書の取り扱いを含む)が一般とは異なる扱いになることがあります。詳細は BOI/雇用局の公式情報で確認してください。",
			],
		},
		{
			heading: "e-Work Permit ― オンライン化された申請制度",
			lead: "労働許可の申請・更新・取消はオンライン化が進められています。",
			items: [
				"雇用局は e-Work Permit システム(公式ポータル:eworkpermit.doe.go.th)を導入し、外国人労働者の登録および労働許可の新規・更新・取消・変更をオンラインで扱う運用に移行しました。報道・法律事務所の解説によれば、このオンライン手続きは2025年10月13日から原則として求められています(運用は変更されうるため公式で確認)。",
				"オンライン申請後、全国の指定サービスセンターで本人確認(生体情報の登録)や許可証カードの受領を行う運用が案内されています。来訪が必要な手順・所要は管轄により異なります。",
				"紙(マニュアル)での提出は、システム上の技術的問題がある場合などに限って経過的に認められる扱いと案内されています。この経過措置の期限はこれまで複数回延長されており、直近では2026年7月28日までとされています(目安。延長・短縮されうるため、申請前に公式の最新案内を事前に確認してください)。",
				"BOI 奨励企業向けには、従来から Single Window(ワンストップ)系の手続き経路が用意されています。利用可否・手順は BOI の案内に従ってください。",
			],
		},
		{
			heading: "更新・転職・退職時の取り扱い",
			lead: "労働許可証は「期限」と「雇用主・職種への紐づき」の両面で管理が必要です。",
			items: [
				"更新:労働許可証には有効期間があり、滞在許可(Non-B の延長)と整合させて更新します。更新も e-Work Permit を通じて行う運用です。期限管理は早めに行うのが安全です。",
				"転職:雇用主が変わる場合、原則として現在の許可の取消と新しい雇用主での取得・手続きが必要です。空白期間が生じないよう、雇用主・専門家と段取りを確認してください。",
				"退職・契約終了:就労を終える際は、雇用主側で許可証の取消手続きが行われるのが一般的です。滞在許可(ビザ)側の取り扱いも併せて確認が必要です。",
				"いずれも管轄事務所や個別事情で運用が異なります。判断に迷う場合は、雇用主の人事・法務、または専門家に相談してください。",
			],
		},
		{
			heading: "ご利用にあたって(免責)",
			lead: "本記事は一般的な情報提供を目的とし、特定の申請の可否や結果を保証するものではありません。",
			items: [
				"本記事の内容は 2026 年 6 月時点で公開情報を確認して作成したものです。労働許可・ビザに関する制度や運用は変更されることがあります。",
				"必要書類・料金・期間・手続きは、管轄の雇用局事務所、業種、BOI の有無、個別の事情によって異なります。実際の申請にあたっては、タイ労働省 雇用局などの公式情報、および雇用主・専門家に事前にご確認ください。",
				"本記事は法務・税務・移民手続きに関する助言を行うものではなく、将来の許可取得・更新・滞在の結果を保証するものではありません。",
			],
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "Non-B ビザがあれば、そのまま働けますか?",
			answer:
				"いいえ。Non-B ビザは入国・滞在のための許可で、就労そのものを認めるものではありません。実際に働くには、原則として別途、労働省 雇用局が発給する労働許可証(Work Permit)が必要です。",
		},
		{
			question: "労働許可証は誰が申請しますか?",
			answer:
				"雇用主(タイで登記された会社など)を通じて申請するのが基本です。会社の登記証明や財務諸表など雇用主側の書類が必要になるため、人事・法務担当や代理人と連携して進めます。",
		},
		{
			question: "申請はオンラインでできますか?",
			answer:
				"雇用局の e-Work Permit システム(eworkpermit.doe.go.th)でオンライン手続きを行う運用に移行しています。一部、本人確認や許可証カードの受領のためにサービスセンターへの来訪が案内される手順があります。紙提出の経過措置の可否・期限は変更されうるため、申請前に公式の最新案内を確認してください。",
		},
		{
			question: "転職したら労働許可証はどうなりますか?",
			answer:
				"労働許可証は雇用主・職種に紐づくため、勤務先が変わる場合は原則として手続きが必要です。空白期間が生じないよう、現雇用主・新雇用主・専門家と段取りを事前に確認してください。",
		},
		{
			question: "健康診断書は必要ですか?",
			answer:
				"一般に、タイの医療機関が発行する健康診断書(一定の疾患に該当しないことの証明)が求められます。タイ政府公式情報では有効期間は健診日から60日が目安とされていますが、申請時期に合わせて取得するのが安全です。BOI 奨励企業など、取り扱いが異なる場合があるため事前に公式で確認してください。",
		},
	],

	clusterLinks: [
		{
			promptKey: "non-b-visa-extension",
			label: "NON-B ビザの更新・必要書類",
			plannedSlug: "non-b-visa-extension",
			published: false,
		},
		{
			promptKey: "visa-comparison",
			label: "タイ長期滞在ビザ 早見比較",
			plannedSlug: "visa-comparison",
			published: false,
		},
		{
			promptKey: "dtv-visa-thailand-guide",
			label: "タイ DTV ビザ完全ガイド",
			plannedSlug: "dtv-visa-thailand-guide",
			published: true,
		},
	],

	sources: [
		{
			claim:
				"タイで就労するには Non-B ビザ(滞在)と労働許可証(就労)の2つが原則必要で、Non-B 単体では働けない。労働許可証は労働省 雇用局が雇用主を通じて発給する。",
			source:
				"Thailand BOI — Visa & Work Permit Regulations / Working in Thailand(boi.go.th)",
		},
		{
			claim:
				"労働許可の新規・更新・取消・変更はオンラインの e-Work Permit システムで扱う運用に移行(公式ポータル eworkpermit.doe.go.th)。オンライン手続きは2025年10月13日から原則とされ、紙提出は技術的問題等の場合に限る経過措置とされ、その期限は複数回延長され直近は2026年7月28日まで。",
			source:
				"Department of Employment e-Work Permit portal(eworkpermit.doe.go.th)/ Fragomen・Erickson Immigration Group による制度解説(2026)",
		},
		{
			claim:
				"健康診断書は、ハンセン病・第3期梅毒・結核・象皮病・薬物中毒・慢性アルコール中毒に該当しないことの証明が求められ、タイの医療機関が発行する。タイ政府公式情報では健康診断書の有効期間は健診日から60日とされる。BOI 奨励企業では取り扱いが異なる場合がある。",
			source:
				"タイ政府ポータル thailand.go.th(外国人労働者の健康診断結果の報告・医療証明)/ BOI 案内",
		},
		{
			claim:
				"BOI 奨励企業は Single Window(ワンストップ)系の経路で visa・work permit 手続きが可能。",
			source:
				"Thailand BOI — Single Window for Visa and Work Permit(boi.go.th)",
		},
	],

	references: [
		{
			label: "Department of Employment — e-Work Permit 公式ポータル",
			url: "https://eworkpermit.doe.go.th/",
		},
		{
			label: "Department of Employment(タイ労働省 雇用局)公式サイト",
			url: "https://www.doe.go.th/",
		},
		{
			label: "Thailand BOI — Visa and Work Permit / Working in Thailand",
			url: "https://www.boi.go.th/index.php?page=WorkinginThailand&language=en",
		},
		{
			label: "Thailand BOI — Visa & Work Permit Regulations(PDF)",
			url: "https://www.boi.go.th/upload/content/3_Visa%20&%20Work%20Permit%20Regulations.pdf",
		},
		{
			label: "Thai Immigration Bureau 公式サイト",
			url: "https://www.immigration.go.th/",
		},
		{
			label:
				"タイ政府ポータル(THAILAND.GO.TH)— 外国人労働者の健康診断結果の報告・医療証明",
			url: "https://www.thailand.go.th/issue-focus-detail/007_043",
		},
		{
			label:
				"Fragomen — Thailand: Mandatory Online Work Permit and Foreign Worker Registration System(e-Work Permit 制度・経過措置期限の解説)",
			url: "https://www.fragomen.com/insights/thailand-mandatory-online-work-permit-and-foreign-worker-registration-system-forthcoming.html",
		},
	],

	placeholders: [
		{
			key: "work-permit-government-fee",
			note: "労働許可証の政府手数料(新規・更新)の正確な金額・区分。雇用局公式の料金表で確認のうえ追記。本文では金額を書かず一般化済み。",
		},
		{
			key: "restricted-occupations-list",
			note: "外国人に禁止/制限される職種リスト(根拠は外国人労働管理勅令 B.E.2560(2017)+ 改正 No.2 B.E.2561(2018)、その後リスト改定あり)。職種数・区分は告示改定で変動するため、雇用局の最新告示原文で確認のうえ、必要なら別 cluster 化を検討。本文では具体列挙・件数を避けている。",
		},
		{
			key: "processing-time",
			note: "新規・更新の標準処理日数(一般経路 / BOI Single Window 経路で差)。公式で確認できる範囲で追記。現状は本文に日数を記載していない。",
		},
	],
};

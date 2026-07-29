/**
 * lib/blog/immigration-office-bangkok.ts — 手続き・暮らしのQ&A(WI-visa-content-consolidation §2)
 * ----------------------------------------------------------------------------
 * バンコク・イミグレ(Chaengwattana / Immigration Division 1)の行き方・予約・
 * 持ち物・混雑回避の実務ガイド。YMYL ゲート 0(景表法 NG 表現を排除)。
 * 推測ゼロ: 所在地・受付時間・オンライン予約は一次出典(公式)で確認できたもののみ。
 * 公共交通は MRTA/NBM、庁舎内移動は Government Complex の公式案内を参照。
 * 変動しやすい受付時間/予約枠/管轄階は placeholders(要確認)へ逃がす。
 * 内部リンクは clusterLinks に集約。監修 = Yosuke Onodera。
 * ----------------------------------------------------------------------------
 */

import type { Article } from "./types";

export const IMMIGRATION_OFFICE_BANGKOK: Article = {
	slug: "immigration-office-bangkok",
	kind: "cluster",
	promptKey: "qa-immigration-office",
	title:
		"バンコクのイミグレ(Chaengwattana)行き方と予約｜持ち物・混雑回避ガイド",
	h1: "バンコクのイミグレ(Chaengwattana)行き方と予約",
	description:
		"バンコクのイミグレーション(Immigration Division 1 / Chaengwattana・Government Complex Building B)への行き方、オンライン予約(Online Appointment)、持ち物、各手続きの窓口を実務目線で整理。二度手間を減らす準備ポイントをまとめます。",
	datePublished: "2026-06-04",
	dateModified: "2026-07-29",
	draft: false,
	heroEyebrow: "手続き・暮らしのQ&A ・ 在住手続き",
	category: "qa",
	tags: ["イミグレーション", "Chaengwattana", "オンライン予約", "在住手続き"],
	cover: {
		motif: "map-pin",
		kicker: "手続き・暮らしのQ&A ・ 在住手続き",
		titleLines: ["バンコクのイミグレ。", "行く前に、ここを押さえる。"],
		accentWord: "行く前に",
		sub: "場所・予約・持ち物・混雑回避を一度に整理して、二度手間を防ぐ。",
	},

	answerFirst: [
		"バンコクで多くの長期滞在手続き(ビザ延長・90日レポート・再入国許可など)を扱う窓口は、ラクシー区チェーンワッタナーの政府合同庁舎(Government Complex)B棟にある入国管理局・第1課(Immigration Division 1)です。郊外にあり、来所者も多いため、行く前の準備で待ち時間と二度手間が大きく変わります。",
		"事前に押さえておきたいのは4点です。(1) 場所はB棟(管轄・手続きにより受付フロアが分かれます)、(2) 公式のオンライン予約(Online Appointment)を取れる手続きがある、(3) 受付は平日のみで昼休みがあり、ウォークインの整理券には受付時間がある、(4) 書類はコピーと署名が必要なものが多い。受付時間・予約枠・手続きごとの窓口は変わることがあるため、来所前に公式で最新を確認してください。",
	],

	bodySections: [
		{
			heading: "場所と基本情報(まず確認)",
			lead: "バンコクの主要な在住手続きを扱うのは Immigration Division 1。政府合同庁舎B棟にあります。所在地と受付時間は公式の記載に基づきます。",
			items: [
				"名称: 入国管理局・第1課(Immigration Division 1 / บก.ตม.1)",
				"場所: 政府合同庁舎(The Government Complex)B棟、チェーンワッタナー通り、ラクシー区、バンコク",
				"受付時間: 08:30–12:00 / 13:00–16:30(昼休みあり・平日のみ、公式記載)",
				"整理券(ウォークイン): 公式記載では 08:30–15:30 と案内",
				"電話: 0-2141-9889(公式記載)",
				"受付時間・整理券の締切・祝日対応は変わることがあります。来所前に公式サイトでご確認ください。",
			],
		},
		{
			heading: "行き方(MRTピンクライン・タクシー)",
			lead: "中心部から距離があるため、ルートを決めてから出ると迷いません。MRTA・NBM・Government Complexの公式案内に基づく実務ルートです。",
			items: [
				"MRTピンクライン: 「Government Complex(政府合同庁舎)」駅で下車。MRTA公式のピンクライン案内でも、路線がチェーンワッタナーのGovernment Complexを通ることを確認できます",
				"中心部から: BTSスクンビット線のワットプラシーマハタート駅でMRTピンクラインに乗り換え、Government Complex駅へ。NBM公式路線図でも両路線の接続と両駅を確認できます",
				"タクシー: 庁舎内に入ったら「B棟・ゲート2(Building B, Gate 2)」と伝えると分かりやすい。所要・料金は出発地と渋滞で変動",
				"Government Complex公式は、スカイウォーク等からA・B・C棟へ向かう無料EVシャトルを案内しています。運行時間や乗り場は変わり得るため、来所当日の公式案内も確認してください",
			],
		},
		{
			heading: "オンライン予約(Online Appointment)を使う",
			lead: "Immigration Division 1 には、手続きによってオンラインで来所予約を取れる仕組みがあります。予約があると当日の整理券待ちを避けやすくなります。",
			items: [
				"予約は手続き(ビザ延長・再入国・90日レポート等)を選び、空いている日時を選択する流れ",
				"Immigration Division 1 の案内ではオンライン/各種サービスはバンコク管轄分のみ対象(公式記載)。対象外の管轄は最寄りのイミグレで手続き",
				"ビザ延長の一部はオンライン申請(e-Extension)に対応。公式案内では観光・公立校教員/就学・政府機関勤務・元タイ国籍者・在留者の家族・報道・政府機関のトレーナー/研究者・機械据付/修理・医療スペシャリスト・常駐の輸送機関運用者・大使館の証明/要請、の12区分が対象とされています(申請ポータル: Thaiextension.vfsevisa.com)",
				"オンライン予約に対応する手続き・対象範囲・1日の枠は変わることがあるため、最新は公式の案内で確認",
				"予約が取れた手続きでも、当日は受付での本人確認・書類確認の時間がかかります。予約=即終了ではない点に留意",
				"予約システムの挙動(時間枠を確保するタイプか、当日のキュー番号を確保するタイプか)は窓口・時期で異なる場合があるため、事前に公式で確認してください。",
			],
		},
		{
			heading: "90日レポートは「行かずに済む」選択肢もある",
			lead: "連続90日以上の滞在で必要な住所の届出(90日レポート)は、来所以外の方法が用意されています。イミグレに行く回数を減らせる代表例です。",
			items: [
				"オンライン提出: 公式のオンライン窓口(TM47 のオンラインシステム)で届出できる対象があります",
				"オンライン受付期間: 公式案内では「次回の届出期日の15日前から」インターネットで届出可能とされています(公式記載)",
				"オンライン対象外になる例: 新しいパスポートの場合や、Re-entry Permitを取得せず出国して再入国した場合などは、本人または代理人が居住地の管轄イミグレで届出するよう現行マニュアルで案内されています",
				"対象範囲: Immigration Division 1 のオンライン届出はバンコク管轄分のみ対象(公式記載)",
				"郵送: 所定の書式を郵送する方法も従来から案内されています",
				"窓口: 直接または代理人による届出も可能",
				"処理: オンライン提出後は審査中となり、現行マニュアルでは結果が登録メールアドレスへ3営業日以内に送られる案内です。オンライン上でも申請状況を確認できます",
				"オンラインは受付できる期間が窓口・郵送と異なる運用です。対象地域・受付期間・必要書類は変わることがあるため、事前に公式でご確認ください。",
				"90日レポートはビザの延長とは別の手続きです。違いの整理は関連記事を参照してください。",
			],
		},
		{
			heading: "持ち物・準備(これがないと出直しになりがち)",
			lead: "手続きによって必要書類は異なりますが、共通して用意しておくと安全な基本セットです。最終的な必要書類は手続きごとに公式・管轄で確認してください。",
			items: [
				"パスポート(原本)と、顔写真ページ・最新ビザ/スタンプ・直近の入国記録などのコピー",
				"コピーへの署名(サイン)を求められることが多いため、ペアを持参",
				"入国カード/到着登録(現在はオンラインの到着登録=TDACに移行)に関する控え",
				"手続き別の追加書類(延長: 残高証明・在籍/雇用関連、再入国: 申請書/写真 など)。何が必要かは手続きにより異なる",
				"証明写真・手数料(現金)・記入用のペン。庁舎内でコピー/写真を用意できる場合もあるが、混雑時は事前準備が安全",
				"必要書類・部数・手数料は手続きと時期で変わります。来所前に最新の要件を確認してください。",
			],
		},
		{
			heading: "混雑を避けるコツ",
			lead: "郊外の大型窓口ゆえ、来所のタイミングと段取りで待ち時間が大きく変わります。",
			items: [
				"オンライン予約に対応する手続きは予約を取ってから行く",
				"ウォークインの場合は、公式の整理券受付時間(08:30–15:30)に間に合うよう余裕を持って移動する",
				"祝日・臨時休業・受付時間の変更がないか、来所当日に公式サイトを確認する",
				"書類は前夜にコピー・署名まで済ませ、手続きごとに分けてクリアファイルへ",
			],
		},
		{
			heading: "どの手続きがここで扱える?",
			lead: "Immigration Division 1(Chaengwattana・B棟)で案内されている主な在住手続きの例です。受付フロア・窓口は手続きにより分かれ、変更されることがあります。",
			items: [
				"各種ビザの延長(リタイアメント・配偶者/タイ人の子・就労関連 など)",
				"90日レポート(TM47)",
				"再入国許可(Re-entry Permit)",
				"ビザのキャンセル など",
				"再入国許可を含むウォークイン手続きの受付時間は、Immigration Division 1 の公式Contactページで来所前に確認してください",
				"手続きごとの受付フロア・必要書類・手数料は時期や管轄で変わります。最新は公式でご確認ください。",
			],
		},
		{
			heading: "ご利用にあたって(免責)",
			lead: "本記事は2026年時点の公開情報に基づく一般的な解説です。所在地・受付時間・整理券の締切・オンライン予約の対象/枠・各手続きの窓口や必要書類は、時期や管轄により変わる場合があり、最新は管轄イミグレーション(公式サイト)でご確認ください。本記事は特定の手続きの結果を保証するものではありません。",
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "バンコクのイミグレ(Chaengwattana)はどこにありますか?",
			answer:
				"ラクシー区チェーンワッタナーの政府合同庁舎(Government Complex)B棟にある入国管理局・第1課(Immigration Division 1)です。MRTピンクラインの「Government Complex」駅が最寄りで、庁舎内の無料シャトルでB棟に向かえます。所在地・アクセスの最新は公式でご確認ください。",
		},
		{
			question: "受付時間と整理券(キュー)の締切は?",
			answer:
				"公式記載では受付は平日 08:30–12:00 / 13:00–16:30(昼休みあり)、整理券(ウォークイン)は 08:30–15:30 と案内されています。時間は変わることがあるため来所前に公式で確認してください。",
		},
		{
			question: "オンラインで予約してから行けますか?",
			answer:
				"Immigration Division 1 には、手続きによってオンラインで来所予約(Online Appointment)を取れる仕組みがあります。対応する手続き・対象範囲・1日の枠は変わることがあるため、最新は公式の案内でご確認ください。予約があっても当日は書類・本人確認の時間がかかります。",
		},
		{
			question: "90日レポートのためだけにイミグレへ行く必要がありますか?",
			answer:
				"来所が前提とは限りません。90日レポート(住所の届出)は、オンライン提出・郵送・窓口/代理人といった方法が用意されています。公式案内ではオンラインは次回期日の15日前から届出できますが、新しいパスポートの場合やRe-entry Permitなしで出国・再入国した場合など、対面届出が必要になる条件があります。対象地域・受付期間・必要書類は変わることがあるため、事前に公式でご確認ください。",
		},
		{
			question: "持ち物は何を用意すればいいですか?",
			answer:
				"パスポート原本と、顔写真ページ・最新ビザ/スタンプ・直近の入国記録などのコピー、コピーへの署名、手続きごとの追加書類(延長なら残高証明や在籍/雇用関連、再入国なら申請書/写真 など)、手数料(現金)が基本です。必要書類・部数・手数料は手続きと時期で変わるため、来所前に最新の要件を確認してください。",
		},
	],

	clusterLinks: [
		{
			promptKey: "qa-extension-vs-90day",
			label: "ビザ延長・90日レポート・再入国許可の違い",
			plannedSlug: "visa-extension-vs-90-day-report",
			published: false,
		},
		{
			promptKey: "cmp-visa-comparison",
			label: "タイ長期滞在ビザ 早見比較",
			plannedSlug: "visa-comparison",
			published: false,
		},
		{
			promptKey: "gd-dtv-pillar",
			label: "タイ DTV ビザ完全ガイド",
			plannedSlug: "dtv-visa-thailand-guide",
			published: true,
		},
	],

	sources: [
		{
			claim:
				"Immigration Division 1 の所在地(政府合同庁舎B棟・チェーンワッタナー・ラクシー区バンコク)・受付時間・電話",
			source:
				"Immigration Division 1 公式サイト(Contact / Online Service ページ)",
		},
		{
			claim: "Online Appointment(オンライン来所予約)の提供と利用の流れ",
			source: "Immigration Division 1 公式サイト / 公式オンライン予約ポータル",
		},
		{
			claim:
				"ビザ延長オンライン(e-Extension)の対象12区分と申請ポータル / サービスはバンコク管轄のみ対象",
			source:
				"Immigration Division 1 公式サイト Online Service and Public Guide / Visa Extension",
		},
		{
			claim:
				"90日レポート オンラインは次回期日の15日前から届出可・結果は登録メールへ3営業日以内・新しいパスポート等は対面届出",
			source:
				"Immigration Division 1 公式サイト Notification of staying over 90 Days / TM47 Online Instruction Manual",
		},
		{
			claim:
				"再入国許可(Re-entry Permit)の手続き・必要書類・Immigration Division 1での受付",
			source:
				"Immigration Division 1 公式サイト Re-entry Permit / Contact ページ",
		},
		{
			claim:
				"MRTピンクライン Government Complex 駅・BTSとの接続・庁舎内シャトルでのアクセス",
			source:
				"Mass Rapid Transit Authority of Thailand ピンクライン公式案内 / Northern Bangkok Monorail公式路線図 / Government Complex EV Shuttle Bus公式案内",
		},
	],

	references: [
		{
			label: "Immigration Division 1(バンコク第1課)公式サイト",
			url: "https://bangkok.immigration.go.th/en/home_en/",
		},
		{
			label: "Immigration Division 1 連絡先・所在地(Contact)",
			url: "https://bangkok.immigration.go.th/en/contact-goverment-complex/",
		},
		{
			label: "Immigration Division 1 オンラインサービス案内",
			url: "https://bangkok.immigration.go.th/en/onlineservice-and-publicguide/",
		},
		{
			label: "Immigration Division 1 90日レポート(Notification over 90 Days)",
			url: "https://bangkok.immigration.go.th/en/90days-report/",
		},
		{
			label: "Immigration Division 1 ビザ延長(For foreigner / Visa Extension)",
			url: "https://bangkok.immigration.go.th/en/visa-extension/",
		},
		{
			label: "Immigration Division 1 再入国許可(Re-entry Permit)",
			url: "https://bangkok.immigration.go.th/en/re-entry-permit/",
		},
		{
			label: "タイ入国管理局(Immigration Bureau)公式サイト",
			url: "https://www.immigration.go.th",
		},
		{
			label: "90日レポート オンラインシステム(TM47)",
			url: "https://tm47.immigration.go.th",
		},
		{
			label: "90日レポート オンライン公式マニュアル(TM47)",
			url: "https://tm47.immigration.go.th/manual/IndexForeign.html",
		},
		{
			label: "e-Extension 対象12区分(タイ入国管理局地方公式サイト)",
			url: "https://phitsanulok.immigration.go.th/en/e-extension-online-application-for-temporary-stay-extension-in-3-minutes/",
		},
		{
			label: "MRTA ピンクライン公式案内",
			url: "https://www.mrta.co.th/en/the-pink-line",
		},
		{
			label: "NBM ピンクライン公式路線図",
			url: "https://nbm.co.th/assets/pdf/PK_SystemMap_03.pdf",
		},
		{
			label: "Government Complex 無料EVシャトル公式案内",
			url: "https://www.governmentcomplex.com/detail.php?p=ldHV4Tar",
		},
	],

	placeholders: [
		{
			key: "reception-hours-cutoff",
			note: "受付時間・整理券(ウォークイン)の締切時刻は公式記載(08:30–12:00/13:00–16:30、整理券08:30–15:30)を本文反映済。変動しうるため公開直前に公式 Contact ページで再確認し、変更があれば本文・FAQの時刻を更新。",
		},
		{
			key: "online-appointment-slot-behavior",
			note: "Online Appointment が「時間枠を確保するタイプ」か「当日のキュー番号を確保するタイプ」かの挙動は一次で未確定。対象手続き(延長/再入国/90日/居住)・e-Extension12区分・バンコク管轄のみは公式確認済で本文反映済。挙動の確定情報が取れた場合のみ具体化。",
		},
		{
			key: "service-floor-by-procedure",
			note: "B棟内の手続き別受付フロア(90日レポート/居住/延長/再入国 等)は一次で未確認。フロア配置は変更されうるため、確定情報が取れた場合のみ具体フロアを追記。",
		},
	],
};

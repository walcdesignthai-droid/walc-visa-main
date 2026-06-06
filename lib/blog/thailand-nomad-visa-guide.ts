/**
 * lib/blog/thailand-nomad-visa-guide.ts — ノマドビザ pillar(WI-20260604-nomad-visa-pillar)
 * ----------------------------------------------------------------------------
 * 🔴 DRAFT(draft: true)。Cowork 品質ゲート(YMYL/schema/ブランド/内部リンク)→ Owner 目視まで公開しない。
 *
 * 戦略: knowledge/seo-memory/walc-visa/nomad-visa-seo-strategy.md
 *   通称KW「タイ ノマドビザ / デジタルノマドビザ」を title/h1/meta で直撃。
 *   DTV + Thailand Privilege 比較 + 代替(ビザなし60日/学生)まで横断し検索意図を網羅。
 * 本文 SOT: walc-studio/drafts/pillar-nomad-visa-guide.md(Cowork 起草)。
 *
 * 事実の出典(推測ゼロ / YMYL):
 *   - DTV 制度事実 = タイ政府一次出典(e-Visa 公式 / 外務省 DTV チェックリスト・情報 PDF)を references に可視掲載。
 *   - WALC 実績 = lib/walc-data/stats.ts(getDtvAcquisitionStats)SOT を interpolate(件数+母数+期間+免責のみ・成功率/保証表現は使わない)。
 *   - Thailand Privilege のプラン/費用は thailand-privilege-overview 記事に委譲(clusterLink)。比較は概況に留める。
 *   - 政府費用の日本円換算等の未確定は placeholders に残す。
 *   - 既存 DTV pillar(dtv-visa-thailand-guide)とは KW/インテントで差別化(本記事=通称KW・横断比較)。
 * ----------------------------------------------------------------------------
 */

import { getDtvAcquisitionStats } from "@/lib/walc-data/stats";
import type { Article } from "./types";

const stats = getDtvAcquisitionStats();

export const THAILAND_NOMAD_VISA_GUIDE: Article = {
	slug: "thailand-nomad-visa-guide",
	kind: "pillar",
	promptKey: "sq-thailand-nomad",
	title:
		"【2026年版】タイのノマドビザ完全ガイド｜DTV(Destination Thailand Visa)とPrivilege、どっちを選ぶ?",
	h1: "タイのノマドビザ完全ガイド — DTV(通称ノマドビザ)と Thailand Privilege",
	description:
		"タイの「ノマドビザ」と呼ばれる DTV(Destination Thailand Visa)を徹底解説。条件・必要書類・e-Visa 申請手順・政府費用から、Thailand Privilege との比較、ビザなし60日・学生ビザの代替まで。「自分はどれを選ぶべきか」が分かります。",
	datePublished: "2026-06-06",
	dateModified: "2026-06-06",
	draft: true,
	heroEyebrow: "ノマドビザ 完全ガイド",
	// WI 指定カテゴリ「制度比較・ビザ選び」= compare。
	category: "compare",
	tags: ["ノマドビザ", "DTV", "Destination Thailand Visa", "デジタルノマド", "Thailand Privilege"],
	readingMinutes: 9,
	cover: {
		motif: "map-pin",
		kicker: "制度比較 ・ ノマドビザ",
		titleLines: ["タイのノマドビザ、", "結局どれを選ぶ?"],
		accentWord: "ノマドビザ",
		sub: "DTV・Privilege・代替策を、現場の知見で横断比較。",
	},

	// --- answer-first(冒頭で結論) -------------------------------------------
	answerFirst: [
		"「タイのノマドビザ」——よく聞く呼び名ですが、正式には DTV(Destination Thailand Visa/ディスティネーション・タイランド・ビザ)を指します。「デジタルノマドビザ」と呼ばれることもありますが、正式名称は Destination Thailand Visa、通称「ノマドビザ」です。2024 年に始まった、リモートワーカー・フリーランス・ソフトパワー活動者向けの長期ビザで、5 年マルチプル・1 回最長 180 日(国内で +180 日の延長可)という自由度が特徴です(タイ外務省 DTV 情報・e-Visa 公式)。",
		"本記事は、DTV の条件・書類・申請手順から、Thailand Privilege(旧エリート)との比較、ビザなし滞在・学生ビザという代替まで横断して、「自分はどれを選ぶべきか」が分かるように整理します。タイ現地で申請支援をしてきた立場から、公館ごとの運用差や、実際につまずきやすいポイントも添えます。",
	],

	// --- 本文セクション ------------------------------------------------------
	bodySections: [
		{
			heading: "1. DTV(通称ノマドビザ)とは",
			lead: "DTV は、海外企業のリモートワークやソフトパワー領域(ムエタイ等)の活動を想定した長期滞在ビザです。主な制度の要点は次のとおりです。",
			items: [
				"有効期間: 5 年(マルチプルエントリー・入国回数の制限なし)",
				"滞在: 1 回の入国につき最長 180 日。タイ入管で +180 日の延長が可能(手数料 1,900 バーツ・1 滞在につき 1 回)",
				"政府費用: 申請 10,000 バーツ(タイ外務省 DTV 情報・e-Visa 公式)",
				"対象: ①タイ国外の企業・顧客向けにリモートで働く人(会社員・フリーランス・自営) ②ソフトパワー活動(ムエタイ・タイ料理・スポーツ・医療・セミナー・芸術等)の長期参加者 ③その配偶者と 20 歳未満の子",
				"就労ルール: タイ国内企業での就労・国内クライアントの仕事は不可(ワークパーミットは取得できません)。海外企業のリモートワークは可",
			],
		},
		{
			heading: "2. 申請条件と必要書類",
			lead: "中核の条件は「50 万バーツ相当の残高証明」です。加えて、職業を証明する書類(雇用契約・業務委託契約・確定申告・ポートフォリオ等のいずれか)を求められます。主な書類(公館により異なります):",
			items: [
				"パスポート(残存 6 か月以上・空白 2 ページ以上)+ 顔写真ページのコピー",
				"申請書・証明写真(6 か月以内)",
				"英文残高証明(50 万バーツ相当以上)",
				"職業証明(契約書 / 確定申告 / ポートフォリオ 等)",
				"滞在先・渡航を示す書類(航空券・宿泊等)",
				"ソフトパワー系は受け入れ先の招聘状(ジム・学校・医療機関等)",
			],
		},
		{
			heading: "3. Thailand Privilege(旧エリート)との比較",
			lead: "コスト面では DTV が優位です。一方 Privilege は空港送迎・ファストレーン等の優待と審査のシンプルさが魅力で、就労実態の説明が難しい方や富裕層には今も選ばれています。プラン・費用の詳細は関連記事(サイドバー)をご覧ください。",
			items: [
				"期間: DTV = 5 年 / Privilege = 5〜20 年(プランによる)",
				"1 回の滞在: DTV = 180 日(+延長 180 日) / Privilege = 1 年",
				"費用感: DTV = 政府費用 10,000 バーツ / Privilege = 入会金が高額(プランによる)",
				"条件: DTV = 残高 50 万バーツ + 職業証明 / Privilege = 費用以外は緩やか",
				"向き: DTV = リモートワーカー / フリーランス / ソフトパワー、Privilege = 費用をかけても手厚い優待・長期安定が欲しい人",
			],
		},
		{
			heading: "4. まだ決めきれない人の代替策",
			lead: "DTV か Privilege かを決めきれない場合、次の選択肢で「お試し」や別ルートを検討できます。",
			items: [
				"ビザなし滞在: 日本人は 60 日(+30 日延長可)。お試し滞在に。ただし繰り返し(ビザラン)は入国拒否リスクが高まっています",
				"学生ビザ: タイ語・ムエタイ等を学びながら長期滞在",
				"LTR: 富裕層・高度人材向け(税優遇)",
			],
		},
		{
			heading: "5. どれを選ぶ?(目安)",
			lead: "迷ったときの選び方の目安です。",
			items: [
				"海外企業のリモートワーク・フリーランス収入がある → DTV",
				"費用は出せる・優待と確実性を重視 → Thailand Privilege",
				"まず数か月試したい → ビザなし 60 日(+30 日)→ 合えば DTV",
				"50 歳以上・年金生活 → リタイアメントビザ",
			],
		},
	],

	// --- 統計(SOT 由来 + 免責) ----------------------------------------------
	statsNote: [
		`WALC の DTV 取得実績は ${stats.acquired} 件中 ${stats.acquired} 件(母数 ${stats.totalAttempts} / ${stats.periodLabel} / 最終更新 ${stats.lastUpdated})。WALC 全体では累計 ${stats.walcTotalAcquired} 件超のタイ VISA 取得サポート経験があります。`,
		"これは過去の実績であり、将来の取得を保証するものではありません。要件充足の可否は個別事情・申請時点の運用により異なります。",
	],

	// --- 専門家見解(現場の知見) ---------------------------------------------
	expertView: [
		"求められる書類の細目・収入の見せ方は、申請先の公館によって差があります。「残高証明の対象期間」「職業証明の形式」で差し戻しになる例が目立ちます。申請前に、申請先公館の最新案内をご確認ください。",
		"つまずく実例として多いのは、①残高証明の英文形式が要件と合わない ②『リモートワークの実態』を示す資料が弱く追加確認になる ③申請先公館の管轄ルールの見落とし、の 3 つです。早めの準備と、申請先の要件確認が肝心です。",
	],

	// --- 申請手順(e-Visa ①〜⑥) ---------------------------------------------
	steps: [
		{
			heading: "① 申請先を決める",
			body: "タイ国外の大使館 / 領事館に対し、e-Visa(thaievisa.go.th)経由で申請するのが基本です。タイ国内からは申請できません。管轄・運用は公館により異なります。",
		},
		{
			heading: "② 必要書類を準備する",
			body: "50 万バーツ相当の英文残高証明、職業証明(契約書 / 確定申告 / ポートフォリオ 等)、パスポート等を整えます。形式が要件と合うかを事前に確認します。",
		},
		{
			heading: "③ e-Visa で申請・決済する",
			body: "e-Visa システムで申請情報を入力し、カードで申請料を支払います(申請料は不返金)。",
		},
		{
			heading: "④ 審査を受ける",
			body: "不備がなければ数営業日〜で進みます。不備があると数週間かかることもあります。",
		},
		{
			heading: "⑤ 追加確認・面接(公館による)",
			body: "公館によっては、リモートワークの実態確認などの追加資料・面接を求められる場合があります。",
		},
		{
			heading: "⑥ 発給 → 入国",
			body: "発給後、入国します。WALC では要件整理から書類準備・申請先の選定までを日本語でサポートします。",
		},
	],

	// --- FAQ(8 問・FAQPage schema は公開時に自動出力) -----------------------
	faq: [
		{
			question: "ノマドビザと DTV は同じものですか?",
			answer:
				"はい。正式名称が Destination Thailand Visa(DTV)で、通称が「ノマドビザ」です。「デジタルノマドビザ」と呼ばれることもあります。",
		},
		{
			question: "日本からオンラインで申請できますか?",
			answer:
				"e-Visa(thaievisa.go.th)経由が基本です。管轄・運用は公館により異なるため、申請先の案内をご確認ください。",
		},
		{
			question: "月収の条件はありますか?",
			answer:
				"中核要件は 50 万バーツ相当の残高証明です。職業・収入の証明の求め方は公館により異なります。",
		},
		{
			question: "タイの会社で働けますか?",
			answer:
				"いいえ。DTV ではワークパーミットは取れず、タイ国内での就労は不可です(海外企業のリモートは可)。",
		},
		{
			question: "家族も一緒に行けますか?",
			answer: "配偶者と 20 歳未満のお子さまが対象になります。",
		},
		{
			question: "180 日を超えて滞在したいです。",
			answer:
				"タイ入管で +180 日の延長(1,900 バーツ)が可能です。出国して再入国すれば日数はリセットされます。",
		},
		{
			question: "5 年の間、何回でも入国できますか?",
			answer: "はい、マルチプルエントリーで回数制限はありません。",
		},
		{
			question: "ノマドビザと Thailand Privilege はどちらが良いですか?",
			answer:
				"リモートワーク・フリーランス収入があり費用を抑えたいなら DTV、費用をかけても手厚い優待や審査のシンプルさを求めるなら Privilege が向きます。詳細は本文の比較と関連記事をご覧ください。",
		},
	],

	// --- 内部リンク網(P3: pillar → 関連記事) -------------------------------
	clusterLinks: [
		{
			promptKey: "sq-dtv-jp",
			label: "タイ DTV ビザ完全ガイド(要件・費用・5年の使い方)",
			plannedSlug: "dtv-visa-thailand-guide",
			published: true,
		},
		{
			promptKey: "cmp-visa-comparison",
			label: "タイ長期滞在ビザ 早見比較",
			plannedSlug: "visa-comparison",
			published: true,
		},
		{
			promptKey: "cmp-dtv-vs-tourist",
			label: "DTV vs 観光ビザ 徹底比較",
			plannedSlug: "dtv-vs-tourist",
			published: true,
		},
		{
			promptKey: "qa-dtv-visa-run",
			label: "ビザラン代替としての DTV 活用",
			plannedSlug: "dtv-visa-run-alternative",
			published: true,
		},
		{
			promptKey: "gd-thailand-privilege",
			label: "Thailand Privilege 現行プラン概要",
			plannedSlug: "thailand-privilege-overview",
			published: true,
		},
		{
			promptKey: "gd-ltr-categories-tax",
			label: "LTR ビザの対象カテゴリと税優遇",
			plannedSlug: "ltr-categories-tax",
			published: true,
		},
		{
			promptKey: "gd-retirement-balance",
			label: "リタイアメントビザ 銀行残高の条件",
			plannedSlug: "retirement-bank-balance",
			published: true,
		},
		{
			promptKey: "qa-bank-account",
			label: "タイで外国人が銀行口座を開設する実際",
			plannedSlug: "thailand-bank-account",
			published: true,
		},
		{
			promptKey: "ya-dtv-documents",
			label: "DTV ビザの必要書類 完全リスト",
			plannedSlug: "dtv-required-documents",
			published: true,
		},
	],

	// --- 事実 → 出典 ---------------------------------------------------------
	sources: [
		{
			claim: "DTV(通称ノマドビザ)= 2024 年導入 / 5 年マルチプル / 1 回 180 日(+延長 180 日)",
			source: "タイ外務省 DTV 情報 PDF / e-Visa 公式(thaievisa.go.th)",
		},
		{
			claim: "政府費用 10,000 バーツ / 延長手数料 1,900 バーツ",
			source: "タイ外務省 DTV 情報 / e-Visa 公式",
		},
		{
			claim: "財政要件 = 50 万バーツ相当の残高証明 + 職業証明",
			source: "タイ外務省 DTV チェックリスト(Checklist_DTV.pdf)",
		},
		{
			claim:
				"対象 = 海外リモートワーク / ソフトパワー活動 + 配偶者・20 歳未満の子(国内就労は不可)",
			source: "タイ外務省 DTV 情報 PDF / DTV チェックリスト",
		},
		{
			claim: `WALC DTV 実績 ${stats.acquired}/${stats.totalAttempts}(${stats.periodLabel})・累計 ${stats.walcTotalAcquired}+`,
			source: "lib/walc-data/stats.ts getDtvAcquisitionStats(SOT)",
		},
		{
			claim: "Thailand Privilege のプラン期間・費用の詳細",
			source: "thailand-privilege-overview 記事(社内 SOT)/ Thailand Privilege 公式",
		},
	],

	// --- 一次出典(本文末尾に可視掲載) --------------------------------------
	references: [
		{ label: "タイ e-Visa 公式サイト", url: "https://www.thaievisa.go.th/" },
		{
			label: "タイ外務省 DTV チェックリスト(必要書類・50 万 THB)",
			url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf",
		},
		{
			label: "タイ外務省 DTV 情報(制度概要・滞在ルール)",
			url: "https://image.mfa.go.th/mfa/0/RzaiZWKBzF/consular/Visa/18.Destination_Thailand_Visa_(DTV).pdf",
		},
	],

	// --- 未確定(本文に書かない)= 公開前に要確認 --------------------------
	placeholders: [
		{
			key: "要WVIソース: 日本からの申請料(円換算)",
			note: "draft 草稿に『52,000円(2026年5月時点の大使館案内)』とあるが、為替・大使館案内の改定で変動。一次出典(申請先大使館の案内)で確定後に本文へ追記する(現状は政府費用 10,000 バーツのみ掲載)。",
		},
		{
			key: "要WVIソース: DTV 導入の正確な施行日",
			note: "草稿は『2024年7月15日』。一次出典で施行日を確認できたら『2024 年』表記を具体化する。",
		},
	],
};

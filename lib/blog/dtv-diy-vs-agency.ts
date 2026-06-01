/**
 * lib/blog/dtv-diy-vs-agency.ts — cluster(cc-dtv-vs-agencies / WI-026)
 * ----------------------------------------------------------------------------
 * 公開済(draft: false)。WI-026 cluster batch 公開(2026-06-01)。
 *
 * 🔴 比較記事 = 景表法リスク最大。厳守:
 *   - 競合他社への言及・disparage 禁止(「他社は…」を書かない)。
 *   - 比較は「DIY の手間/リスク vs 代行の価値」の事実ベースのみ。
 *   - WALC 優位の最上級・断定なし(最安/最も/必ず/保証 = 0)。料金は pricing.ts SOT。
 *   - DIY を不当に貶めない(読者の自己申請も正当な選択として中立に扱う)。
 *
 * 出典(推測ゼロ): e-Visa 申請ルート = e-Visa 公式 / 外務省 DTV 情報。
 *   必要書類・英文対応 = WALC 申請実務スペック 01_dtv_spec.md。料金 = pricing.ts SOT。
 * ----------------------------------------------------------------------------
 */

import { formatTHB, VISA_DTV } from "@/lib/walc-data/pricing";
import type { Article } from "./types";

const fee = (id: string): string => {
	const plan = VISA_DTV.plans.find((p) => p.id === id);
	return plan ? formatTHB(plan.walcFee) : "{{要SOT: DTV料金}}";
};

const FEE_NOMAD = fee("dtv-nomad");
const FEE_FREELANCE = fee("dtv-freelance");
const FEE_SOFT_POWER = fee("dtv-soft-power");

export const DTV_DIY_VS_AGENCY: Article = {
	slug: "dtv-diy-vs-agency",
	kind: "cluster",
	promptKey: "cc-dtv-vs-agencies",
	title: "DTV を自分で申請 vs 代行に依頼｜判断軸を事実ベースで整理",
	h1: "DTV を自分で申請するか、代行に依頼するか",
	description:
		"タイ DTV ビザを自分で申請(DIY)する場合と、代行に依頼する場合の特徴を、事実ベースで中立に整理。準備の手間・書類の英文対応・費用から、自分に合う進め方を判断できます。",
	datePublished: "2026-06-01",
	dateModified: "2026-06-01",
	draft: false,
	heroEyebrow: "DTV クラスター｜DIY vs 代行",

	answerFirst: [
		"DTV(Destination Thailand Visa)は、自分で申請することも、代行に依頼することもできます。どちらも正当な選択です。判断軸は、準備にかけられる時間・書類の英文対応・却下リスクの許容度です。",
		"本記事では、DIY(自分で申請)と代行それぞれの特徴を事実ベースで整理します。料金は WALC の料金表(SOT)に基づき記載します。",
	],

	bodySections: [
		{
			heading: "自分で申請(DIY)する場合",
			lead: "ご自身で e-Visa ルートから申請する進め方です。",
			items: [
				"e-Visa オンラインで申請が可能(タイ外務省 DTV 情報・e-Visa 公式)",
				"財政証明・活動証明などの書類を自分で準備し、英文対応も自分で行う",
				"申請区分・入国歴により、大使館から追加書類を求められることがある",
				"書類に不備があると、却下・再申請の手間が発生する場合がある",
				"費用は政府の申請費が中心(代行手数料はかからない)",
			],
		},
		{
			heading: "代行(WALC)に依頼する場合",
			lead: "書類整備から申請までを WALC がサポートする進め方です。",
			items: [
				"書類整備・英文対応・申請までを WALC がサポート",
				"タイ宿泊証明やソフトパワーのアクティビティ証明など、WALC で用意できる書類がある",
				`WALC 手数料: ノマド ${FEE_NOMAD} / フリーランス ${FEE_FREELANCE} / ソフトパワー ${FEE_SOFT_POWER}(いずれも申請費込み)`,
				"申請区分別の追加書類や個別事情への対応を個別に案内",
			],
		},
		{
			heading: "どちらを選ぶかの判断軸",
			lead: "どちらが向くかは、状況によって異なります。",
			items: [
				"準備に時間をかけられ、英文書類に対応できる → DIY も有力な選択",
				"時間を節約したい・英文対応や却下リスクの手間を抑えたい → 代行が向く",
				"活動証明(ムエタイ等)や宿泊証明の手配を任せたい → 代行が向く",
			],
		},
	],

	statsNote: [],
	expertView: [],
	steps: [],

	faq: [
		{
			question: "DTV は自分で申請できますか?",
			answer:
				"できます。e-Visa オンラインで申請が可能です。財政証明・活動証明などの書類準備と英文対応をご自身で行う必要があります。",
		},
		{
			question: "代行に依頼するメリットは?",
			answer:
				"書類整備・英文対応・申請サポートに加え、宿泊証明やアクティビティ証明など WALC で用意できる書類があります。申請区分別の追加書類にも個別に対応します。",
		},
		{
			question: "WALC の手数料はいくらですか?",
			answer: `ノマド ${FEE_NOMAD} / フリーランス ${FEE_FREELANCE} / ソフトパワー ${FEE_SOFT_POWER}(いずれも申請費込み)です。`,
		},
		{
			question: "自分で申請するか迷っています",
			answer:
				"準備にかけられる時間・書類の英文対応・却下リスクの許容度で判断するのがおすすめです。判断が難しい場合は、無料診断・LINE 相談をご利用ください。",
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
			claim: "DTV は e-Visa オンラインで申請可能(DIY ルート)",
			source: "タイ外務省 DTV 情報 PDF / e-Visa 公式",
		},
		{
			claim: "必要書類の準備・英文対応・追加書類(DIY/代行 共通の前提)",
			source: "WALC 申請実務スペック 01_dtv_spec.md Ch.2",
		},
		{
			claim: `WALC 手数料 ノマド ${FEE_NOMAD} / フリーランス ${FEE_FREELANCE} / ソフトパワー ${FEE_SOFT_POWER}`,
			source: "lib/walc-data/pricing.ts VISA_DTV.plans(SOT)",
		},
	],

	references: [
		{
			label: "タイ e-Visa 公式サイト",
			url: "https://www.thaievisa.go.th/",
		},
		{
			label: "タイ外務省 DTV 情報(制度概要)",
			url: "https://image.mfa.go.th/mfa/0/RzaiZWKBzF/consular/Visa/18.Destination_Thailand_Visa_(DTV).pdf",
		},
	],

	placeholders: [
		{
			key: "要WVIソース: e-Visa の政府申請費(金額)",
			note: "DIY 時の政府申請費の正式な金額。一次出典で確定後に「費用は政府の申請費が中心」へ具体額を追記する(現状は金額を断定しない)。",
		},
	],
};

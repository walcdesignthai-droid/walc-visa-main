import { DTV_AUTHORITY } from "@/lib/walc-data/dtv-authority";
import type { DtvPublicContent } from "@/lib/walc-data/public-content";
import type { ConciergeMessage } from "./types";

function formatThb(amount: number): string {
	return `${new Intl.NumberFormat("en-US").format(amount)} THB`;
}

/**
 * AIプロバイダー障害時も、CRMの公開APIで確認済みの事実だけを返す。
 * 個別審査や取得可否は断定せず、LINEの有人相談へ引き継ぐ。
 */
export function buildConciergeFallback(
	messages: ConciergeMessage[],
	content: DtvPublicContent,
): string {
	const latestQuestion =
		[...messages].reverse().find((message) => message.role === "user")
			?.content ?? "";
	const asksAboutDtv =
		/DTV|料金|費用|実績|通過|面談|面接|50万|残高|銀行|口座|空港|イミグレ|入国|オーバーステイ|Non-?B|WP|退職|リタイアメント|切り替|日本語|専門家/i.test(
			latestQuestion,
		);

	const lines = [
		"ただいまAIの詳細回答が混み合っているため、WALC公式データから確認できる最新情報を先にご案内します。",
	];

	if (asksAboutDtv) {
		lines.push(
			"",
			`・実績: ${content.trackRecord.display}の${content.trackRecord.label}（${content.trackRecord.scope}）`,
			`・制度変更後: ${DTV_AUTHORITY.application.period}、${DTV_AUTHORITY.application.scope}の${DTV_AUTHORITY.application.label}。${DTV_AUTHORITY.application.disclaimer}`,
			`・オンライン面談: 申請内容に即した想定問答集を一人ひとりに作成。${DTV_AUTHORITY.interview.scope}の${DTV_AUTHORITY.interview.label}。${DTV_AUTHORITY.interview.disclaimer}`,
			"・50万THB: 現在残高・取引履歴・申請時期を確認し、要件を満たす準備方法を個別に助言します。資金要件の回避や免除ではありません。",
			"・難しい履歴: 入国拒否・オーバーステイ・入国時の注意歴も一律に断らず、経緯を確認して対応可能性をご案内します。",
			"・VISA切り替え: 退職後のNon-B・WP終了、リタイアメントVISAからDTVへの切り替えも、手続きの順序を個別確認します。",
			`・日本語対応: ${DTV_AUTHORITY.expertise.label}の専門家が申請方針を統括します。`,
			"・料金:",
			...content.pricing.map(
				(plan) =>
					`  - ${plan.name}: ${formatThb(plan.priceThb)}（含まれるもの: ${plan.includedItems.join("、")}）`,
			),
			`・料金区分: ${content.fees.summary}`,
			`・申請後・標準範囲外: ${content.fees.postAcquisitionNotice} ${content.fees.additionalCostNotice}`,
			"・銀行口座: DTV取得者限定オプションとして相談可能です。開設を保証するものではなく、銀行の審査・運用により変わります。",
			"・空港イミグレ入国サポート: 現在、新規受付を一時停止しています。",
			"",
			content.trackRecord.disclaimer,
		);
	} else {
		lines.push(
			"",
			"VISAの条件や必要書類は、国籍・入国歴・現在の滞在資格・申請先によって変わります。",
		);
	}

	lines.push(
		"",
		"個別の取得可能性と最新条件は、公式LINEでスタッフが確認します。",
		"[CTA:line]",
	);

	return lines.join("\n");
}

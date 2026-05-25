/**
 * lib/line/flex-cta.ts — v2.0 (human CTA 追加)
 *
 * CTA タグ → LINE Flex Message:
 *   - line       → 案内
 *   - diagnosis  → DTV LP の診断ツール
 *   - human      → WALC スタッフ呼出 (Postback で n8n 通知)
 *   - apply:xxx  → CRM 申込フォーム
 */

import type { messagingApi } from "@line/bot-sdk";
import type { ConciergeCtaType } from "@/lib/concierge/types";
import { buildApplicationUrl } from "@/lib/walc-links";

const VISA_LABELS: Record<string, string> = {
	dtv: "DTV(Destination Thailand Visa)",
	elite: "Thailand Privilege",
	ltr: "LTR",
	retirement: "リタイアメント VISA",
	student: "学生 VISA",
	family: "結婚・家族 VISA",
};

const DIAGNOSIS_URL = "https://dtv.walc-visa.online/diagnosis";

export function ctaToFlexMessage(
	cta: ConciergeCtaType | null,
): messagingApi.FlexMessage | null {
	if (!cta) return null;

	if (cta === "line") {
		return buildLinkFlex({
			title: "メインサイトで詳細を見る",
			subtitle: "各 VISA 種別の比較・料金・実績などを掲載しています。",
			buttonLabel: "メインサイトを開く",
			url: "https://walc-visa.online",
		});
	}

	if (cta === "diagnosis") {
		return buildLinkFlex({
			title: "無料 VISA 診断",
			subtitle: "8 つの質問で最適な VISA を判定します。",
			buttonLabel: "診断を始める",
			url: DIAGNOSIS_URL,
		});
	}

	if (cta === "human") {
		// Postback action — n8n がこれを検知してスタッフ通知
		return buildPostbackFlex({
			title: "WALC スタッフに直接相談",
			subtitle: "AI ではなく担当者が個別対応します(営業時間内・最大 24h 以内)。",
			buttonLabel: "スタッフに繋ぐ",
			postbackData: "action=request_human",
			displayText: "スタッフに繋いでください",
		});
	}

	// apply
	const visaId = cta.visaId;
	const label = VISA_LABELS[visaId] ?? visaId.toUpperCase();
	const url = buildApplicationUrl({
		visaId,
		source: "line-concierge",
		medium: "ai-cta",
	});

	return buildLinkFlex({
		title: `${label} に申し込む`,
		subtitle: "オンラインで申込フォームへ進みます。",
		buttonLabel: "申込フォームへ",
		url,
	});
}

interface LinkFlexConfig {
	title: string;
	subtitle: string;
	buttonLabel: string;
	url: string;
}

function buildLinkFlex(c: LinkFlexConfig): messagingApi.FlexMessage {
	return {
		type: "flex",
		altText: c.title,
		contents: {
			type: "bubble",
			size: "kilo",
			body: {
				type: "box",
				layout: "vertical",
				spacing: "md",
				paddingAll: "16px",
				contents: [
					{
						type: "text",
						text: c.title,
						weight: "bold",
						size: "md",
						color: "#0b2a4a",
						wrap: true,
					},
					{
						type: "text",
						text: c.subtitle,
						size: "xs",
						color: "#475569",
						wrap: true,
					},
				],
			},
			footer: {
				type: "box",
				layout: "vertical",
				spacing: "sm",
				paddingAll: "12px",
				contents: [
					{
						type: "button",
						style: "primary",
						color: "#0b2a4a",
						height: "sm",
						action: { type: "uri", label: c.buttonLabel, uri: c.url },
					},
				],
			},
		},
	};
}

interface PostbackFlexConfig {
	title: string;
	subtitle: string;
	buttonLabel: string;
	postbackData: string;
	displayText: string;
}

function buildPostbackFlex(c: PostbackFlexConfig): messagingApi.FlexMessage {
	return {
		type: "flex",
		altText: c.title,
		contents: {
			type: "bubble",
			size: "kilo",
			body: {
				type: "box",
				layout: "vertical",
				spacing: "md",
				paddingAll: "16px",
				contents: [
					{
						type: "text",
						text: c.title,
						weight: "bold",
						size: "md",
						color: "#0b2a4a",
						wrap: true,
					},
					{
						type: "text",
						text: c.subtitle,
						size: "xs",
						color: "#475569",
						wrap: true,
					},
				],
			},
			footer: {
				type: "box",
				layout: "vertical",
				spacing: "sm",
				paddingAll: "12px",
				contents: [
					{
						type: "button",
						style: "primary",
						color: "#1e5bb8",
						height: "sm",
						action: {
							type: "postback",
							label: c.buttonLabel,
							data: c.postbackData,
							displayText: c.displayText,
						},
					},
				],
			},
		},
	};
}

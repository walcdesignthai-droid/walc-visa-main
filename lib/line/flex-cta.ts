/**
 * lib/line/flex-cta.ts — CTA タグ → LINE Flex Message 変換
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
		return buildFlex({
			title: "WALC スタッフへ接続",
			subtitle: "個別のご相談は WALC 担当者がご対応します。",
			buttonLabel: "詳しく相談する",
			url: "https://walc-visa.online/#final-cta",
		});
	}

	if (cta === "diagnosis") {
		return buildFlex({
			title: "無料 VISA 診断",
			subtitle: "8 つの質問で最適な VISA を判定します。",
			buttonLabel: "診断を始める",
			url: DIAGNOSIS_URL,
		});
	}

	const visaId = cta.visaId;
	const label = VISA_LABELS[visaId] ?? visaId.toUpperCase();
	const url = buildApplicationUrl({
		visaId,
		source: "line-concierge",
		medium: "ai-cta",
	});

	return buildFlex({
		title: `${label} に申し込む`,
		subtitle: "オンラインで申込フォームへ進みます。",
		buttonLabel: "申込フォームへ",
		url,
	});
}

interface FlexConfig {
	title: string;
	subtitle: string;
	buttonLabel: string;
	url: string;
}

function buildFlex(c: FlexConfig): messagingApi.FlexMessage {
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

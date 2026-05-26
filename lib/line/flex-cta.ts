import type { ConciergeCtaType } from "@/lib/concierge/types";
import { buildApplicationUrl } from "@/lib/walc-links";
import type { LineFlexMessage } from "./fetch-client";

const VISA_LABELS: Record<string, string> = {
	dtv: "DTV(Destination Thailand Visa)",
	elite: "Thailand Privilege",
	ltr: "LTR",
	retirement: "リタイアメント VISA",
	student: "学生 VISA",
	family: "結婚・家族 VISA",
};

const DIAGNOSIS_URL = "https://dtv.walc-visa.online/diagnosis";
const CRM_BASE =
	process.env.NEXT_PUBLIC_WALC_CRM_BASE_URL ?? "https://crm.walc-visa.online";
const PORTAL_LOGIN_URL = `${CRM_BASE}/portal/login`;
const PORTAL_RESET_URL = `${CRM_BASE}/portal/reset-password`;

export function ctaToFlexMessage(
	cta: ConciergeCtaType | null,
): LineFlexMessage | null {
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
		return buildPostbackFlex({
			title: "WALC スタッフに直接相談",
			subtitle: "AI ではなく担当者が個別対応します(営業時間内・最大 24h 以内)。",
			buttonLabel: "スタッフに繋ぐ",
			postbackData: "action=request_human",
			displayText: "スタッフに繋いでください",
		});
	}

	if (cta === "portal_login") {
		return buildLinkFlex({
			title: "顧客ポータルにログイン",
			subtitle: "ご自身の申請進捗・書類・請求書を確認できます。",
			buttonLabel: "ポータルを開く",
			url: PORTAL_LOGIN_URL,
		});
	}

	if (cta === "portal_reset") {
		return buildLinkFlex({
			title: "パスワード再設定",
			subtitle: "ご登録のメールアドレスにリセットリンクをお送りします。",
			buttonLabel: "パスワードを再設定",
			url: PORTAL_RESET_URL,
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

function buildLinkFlex(c: LinkFlexConfig): LineFlexMessage {
	return {
		type: "flex",
		altText: c.title,
		contents: bubbleContents(c.title, c.subtitle, {
			type: "uri",
			label: c.buttonLabel,
			uri: c.url,
		}),
	};
}

interface PostbackFlexConfig {
	title: string;
	subtitle: string;
	buttonLabel: string;
	postbackData: string;
	displayText: string;
}

function buildPostbackFlex(c: PostbackFlexConfig): LineFlexMessage {
	return {
		type: "flex",
		altText: c.title,
		contents: bubbleContents(c.title, c.subtitle, {
			type: "postback",
			label: c.buttonLabel,
			data: c.postbackData,
			displayText: c.displayText,
		}),
	};
}

function bubbleContents(
	title: string,
	subtitle: string,
	action: Record<string, unknown>,
): Record<string, unknown> {
	return {
		type: "bubble",
		size: "kilo",
		body: {
			type: "box",
			layout: "vertical",
			spacing: "md",
			paddingAll: "16px",
			contents: [
				{ type: "text", text: title, weight: "bold", size: "md", color: "#0b2a4a", wrap: true },
				{ type: "text", text: subtitle, size: "xs", color: "#475569", wrap: true },
			],
		},
		footer: {
			type: "box",
			layout: "vertical",
			spacing: "sm",
			paddingAll: "12px",
			contents: [
				{ type: "button", style: "primary", color: "#0b2a4a", height: "sm", action },
			],
		},
	};
}

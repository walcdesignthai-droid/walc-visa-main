/**
 * lib/line/postback-handler.ts — v1.2
 * ----------------------------------------------------------------------------
 * LINE postback イベント処理。
 * v1.2 (2026-05-28):
 *   - スタッフ呼出時の自動返信文言を LIFF AI 案内入りに刷新
 *   - 「Human モード」という内部用語を顧客側 UI から排除
 * ----------------------------------------------------------------------------
 */

import {
	getLineProfile,
	notifyModeChange,
	replyOrPush,
} from "@/lib/line/fetch-client";
import {
	HUMAN_MODE_DURATION_HOURS,
	HUMAN_MODE_DURATION_MS,
	setLineMode,
} from "@/lib/line/mode-store";

export interface PostbackInput {
	replyToken: string;
	userId?: string;
	data: string;
	recentMessage?: string;
}

export async function handlePostback(input: PostbackInput): Promise<void> {
	const { replyToken, userId, data, recentMessage } = input;

	if (data === "action=request_human") {
		await handleHumanRequest({ replyToken, userId, recentMessage });
		return;
	}

	console.warn(`[postback] unknown action: ${data}`);
}

async function handleHumanRequest(opts: {
	replyToken: string;
	userId?: string;
	recentMessage?: string;
}): Promise<void> {
	const { replyToken, userId, recentMessage } = opts;
	const expiresAt = new Date(Date.now() + HUMAN_MODE_DURATION_MS);

	if (userId) {
		await setLineMode(userId, "human");
	}

	const profile = userId ? await getLineProfile(userId) : null;
	const customerName = profile?.displayName ?? "(不明)";

	await replyOrPush({
		replyToken,
		userId: userId || undefined,
		messages: [
			{
				type: "text",
				text: [
					"ご相談ありがとうございます。",
					"WALC スタッフから順次ご返信いたします (営業時間内・最大 " +
						HUMAN_MODE_DURATION_HOURS +
						" 時間以内)。",
					"",
					"このまま LINE でメッセージをお送りください。",
					"",
					"━━━━━━━━━━━━━━",
					"💡 タイ VISA に関する一般的なご質問は、",
					"メニュー「🤖 AI チャットで即レス対応」 から即時お答えできます。",
				].join("\n"),
			},
		],
	});

	await notifyModeChange({
		from: "ai",
		to: "human",
		customerName,
		userId: userId || "(unknown)",
		reason: "postback",
		recentMessage,
		expiresAt,
	});
}

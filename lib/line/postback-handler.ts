/**
 * lib/line/postback-handler.ts — v1.1
 * ----------------------------------------------------------------------------
 * LINE postback イベント処理。
 * Human モード継続時間を mode-store の定数から取得 (ズレ防止)。
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
				text: `担当者にお繋ぎしました。\n\n営業時間内に WALC スタッフから順次ご返信いたします (最大 ${HUMAN_MODE_DURATION_HOURS} 時間以内)。\n\nこの会話は今後 ${HUMAN_MODE_DURATION_HOURS} 時間、スタッフが直接対応します。\nお気軽にメッセージをお送りください。`,
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

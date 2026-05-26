/**
 * lib/line/fetch-client.ts — Edge Runtime 対応 LINE Messaging API クライアント
 * ----------------------------------------------------------------------------
 * @line/bot-sdk は Edge Runtime で安定動作しないため、
 * Web 標準 fetch で LINE Messaging API を直接叩く。
 *
 * 環境変数:
 *   - LINE_CHANNEL_ACCESS_TOKEN
 *   - LINE_STAFF_GROUP_ID (push 用)
 * ----------------------------------------------------------------------------
 */

const LINE_API = "https://api.line.me/v2/bot";

function getToken(): string {
	const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
	if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not configured");
	return token;
}

export interface LineTextMessage {
	type: "text";
	text: string;
}

export interface LineFlexMessage {
	type: "flex";
	altText: string;
	contents: Record<string, unknown>;
}

export type LineMessage = LineTextMessage | LineFlexMessage;

/** Reply API (replyToken は 1 度のみ・30 秒以内) */
export async function lineReply(
	replyToken: string,
	messages: LineMessage[],
): Promise<void> {
	if (!replyToken || messages.length === 0) return;

	const res = await fetch(`${LINE_API}/message/reply`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ replyToken, messages }),
	});
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`LINE Reply failed (${res.status}): ${text}`);
	}
}

/** Push API (user_id / group_id へ任意送信) */
export async function linePush(
	to: string,
	messages: LineMessage[],
): Promise<void> {
	if (!to || messages.length === 0) return;

	const res = await fetch(`${LINE_API}/message/push`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ to, messages }),
	});
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`LINE Push failed (${res.status}): ${text}`);
	}
}

/** Profile API (LINE ユーザー名取得) */
export async function getLineProfile(
	userId: string,
): Promise<{ displayName: string; userId: string } | null> {
	if (!userId) return null;
	const res = await fetch(`${LINE_API}/profile/${userId}`, {
		headers: { Authorization: `Bearer ${getToken()}` },
	});
	if (!res.ok) return null;
	return (await res.json()) as { displayName: string; userId: string };
}

/** スタッフグループに通知 (mode=human 時 / 呼出要請時) */
export async function notifyStaffGroup(text: string): Promise<void> {
	const groupId = process.env.LINE_STAFF_GROUP_ID;
	if (!groupId) {
		console.warn("LINE_STAFF_GROUP_ID not configured");
		return;
	}
	try {
		await linePush(groupId, [{ type: "text", text }]);
	} catch (e) {
		console.error("notifyStaffGroup error:", e);
	}
}

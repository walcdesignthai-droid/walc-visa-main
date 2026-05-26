/**
 * lib/line/fetch-client.ts — v3.0
 * ----------------------------------------------------------------------------
 * 変更点:
 *   - replyOrPush: Reply 失敗時に Push API へ自動 fallback
 *     (replyToken 30 秒超過対策・LINE 504 対策)
 *   - notifyStaffMessageInHumanMode / notifyModeChange (mode 可視化)
 *   - lineReply / linePush でレスポンス本文を log
 * ----------------------------------------------------------------------------
 */

const LINE_API = "https://api.line.me/v2/bot";
const STAFF_INBOX_URL =
	"https://chat.line.biz/U517fac03f5bf559a931138ddfc8bf5bb/?openExternalBrowser=1";

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

/** Reply API (replyToken は 1 度のみ・30 秒以内が安全) */
export async function lineReply(
	replyToken: string,
	messages: LineMessage[],
): Promise<void> {
	if (!replyToken || messages.length === 0) return;

	const t0 = Date.now();
	const res = await fetch(`${LINE_API}/message/reply`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ replyToken, messages }),
	});
	const dt = Date.now() - t0;

	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(
			`LINE Reply failed (${res.status}) in ${dt}ms: ${text || "(empty body)"}`,
		);
	}
	console.log(`[line] Reply OK in ${dt}ms (${messages.length} msgs)`);
}

/** Push API (user_id / group_id へ任意送信・時間制限なし) */
export async function linePush(
	to: string,
	messages: LineMessage[],
): Promise<void> {
	if (!to || messages.length === 0) return;

	const t0 = Date.now();
	const res = await fetch(`${LINE_API}/message/push`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getToken()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ to, messages }),
	});
	const dt = Date.now() - t0;

	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(
			`LINE Push failed (${res.status}) in ${dt}ms: ${text || "(empty body)"}`,
		);
	}
	console.log(`[line] Push OK in ${dt}ms (${messages.length} msgs)`);
}

/**
 * Reply を試行 → 失敗時に Push へ fallback。
 * waitUntil 内で時間がかかる処理 (Gemini 等) の後に呼ぶ場合は必ずこちらを使う。
 */
export async function replyOrPush(opts: {
	replyToken: string;
	userId?: string;
	messages: LineMessage[];
}): Promise<{ method: "reply" | "push"; ok: boolean }> {
	const { replyToken, userId, messages } = opts;
	if (messages.length === 0) return { method: "reply", ok: true };

	// 1. Reply 試行
	try {
		await lineReply(replyToken, messages);
		return { method: "reply", ok: true };
	} catch (replyErr) {
		console.warn("[line] Reply failed, will try Push:", replyErr);

		// 2. userId があれば Push 試行
		if (userId) {
			try {
				await linePush(userId, messages);
				return { method: "push", ok: true };
			} catch (pushErr) {
				console.error("[line] Push also failed:", pushErr);
				return { method: "push", ok: false };
			}
		}
		return { method: "reply", ok: false };
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

/** スタッフグループに任意テキストを通知 (生 push の低レベル API) */
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

// ============================================================================
// mode 可視化用の構造化通知
// ============================================================================

export interface StaffMessageNotification {
	customerName: string;
	userText: string;
	userId: string;
	humanExpiresAt?: Date | null;
}

/** Human モードで顧客からメッセージが来た時のスタッフ通知 */
export async function notifyStaffMessageInHumanMode(
	opts: StaffMessageNotification,
): Promise<void> {
	const lines: string[] = [
		"🚨 [Human 対応必要]",
		`👤 ${opts.customerName} 様`,
		`💬 "${opts.userText}"`,
	];
	if (opts.humanExpiresAt) {
		lines.push(`⏱  Human mode 残り: ${formatRemaining(opts.humanExpiresAt)}`);
	}
	lines.push(`🆔 ${opts.userId}`);
	lines.push(`🔗 ${STAFF_INBOX_URL}`);
	await notifyStaffGroup(lines.join("\n"));
}

export type ModeChangeReason =
	| "postback"
	| "ttl_expired"
	| "manual_staff"
	| "manual_crm";

export interface ModeChangeNotification {
	from: "ai" | "human";
	to: "ai" | "human";
	customerName: string;
	userId: string;
	reason: ModeChangeReason;
	recentMessage?: string;
	expiresAt?: Date | null;
}

const REASON_LABEL: Record<ModeChangeReason, string> = {
	postback: "顧客がスタッフ呼出ボタン押下",
	ttl_expired: "24h 経過で自動 AI 復帰",
	manual_staff: "スタッフが手動切替",
	manual_crm: "CRM 画面から手動切替",
};

/** mode 遷移時のスタッフ通知 (AI ↔ Human) */
export async function notifyModeChange(
	opts: ModeChangeNotification,
): Promise<void> {
	const fromEmoji = opts.from === "ai" ? "🤖" : "👤";
	const toEmoji = opts.to === "ai" ? "🤖" : "👤";

	const lines: string[] = [
		`🔄 [MODE 変更] ${fromEmoji} ${opts.from.toUpperCase()} → ${toEmoji} ${opts.to.toUpperCase()}`,
		`👤 ${opts.customerName} 様`,
		`📝 理由: ${REASON_LABEL[opts.reason]}`,
	];
	if (opts.recentMessage) {
		lines.push(`💬 直近: "${opts.recentMessage}"`);
	}
	if (opts.to === "human" && opts.expiresAt) {
		lines.push(`⏱  自動 AI 復帰: ${formatJST(opts.expiresAt)}`);
	}
	lines.push(`🆔 ${opts.userId}`);
	lines.push(`🔗 ${STAFF_INBOX_URL}`);
	await notifyStaffGroup(lines.join("\n"));
}

function formatRemaining(expiresAt: Date): string {
	const ms = expiresAt.getTime() - Date.now();
	if (ms <= 0) return "期限切れ";
	const h = Math.floor(ms / 3_600_000);
	const m = Math.floor((ms % 3_600_000) / 60_000);
	return `${h}h ${m}m`;
}

function formatJST(d: Date): string {
	return d.toLocaleString("ja-JP", {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
}

/**
 * app/api/line/postback/route.ts — Edge Runtime + mode 切替
 * ----------------------------------------------------------------------------
 * Flex ボタンの Postback を処理。
 *   - action=request_human → mode を human にセット + スタッフ通知 + 顧客 Reply
 * ----------------------------------------------------------------------------
 */

import { type NextRequest, NextResponse } from "next/server";
import {
	getLineProfile,
	lineReply,
	notifyStaffGroup,
} from "@/lib/line/fetch-client";
import { setLineMode } from "@/lib/line/mode-store";

export const runtime = "edge";

interface PostbackEvent {
	type: string;
	replyToken?: string;
	source?: { userId?: string; type?: string };
	postback?: { data?: string };
	timestamp?: number;
}

interface RelayRequest {
	event: PostbackEvent;
	recentMessage?: string;
}

export async function POST(req: NextRequest) {
	const providedSecret = req.headers.get("x-walc-relay-secret");
	const expectedSecret = process.env.WALC_RELAY_SECRET;
	if (!expectedSecret) {
		return NextResponse.json(
			{ error: "Server not configured" },
			{ status: 500 },
		);
	}
	if (providedSecret !== expectedSecret) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	let body: RelayRequest;
	try {
		body = (await req.json()) as RelayRequest;
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const event = body.event;
	if (!event || event.type !== "postback") {
		return NextResponse.json({ ok: true, skipped: "not_postback" });
	}
	if (!event.replyToken) {
		return NextResponse.json({ ok: true, skipped: "no_reply_token" });
	}
	const data = event.postback?.data;
	if (!data) {
		return NextResponse.json({ ok: true, skipped: "no_data" });
	}

	const userId = event.source?.userId ?? "";

	if (data === "action=request_human") {
		return await handleHumanRequest(event.replyToken, userId, body.recentMessage);
	}

	return NextResponse.json({ ok: true, skipped: "unknown_action" });
}

async function handleHumanRequest(
	replyToken: string,
	userId: string,
	recentMessage: string | undefined,
): Promise<Response> {
	// 1. mode を human にセット (24h)
	if (userId) {
		await setLineMode(userId, "human");
	}

	// 2. 顧客プロフィール取得
	const profile = userId ? await getLineProfile(userId) : null;
	const displayName = profile?.displayName ?? "(不明)";

	// 3. 顧客 Reply
	try {
		await lineReply(replyToken, [
			{
				type: "text",
				text: "担当者にお繋ぎしました。\n\n営業時間内に WALC スタッフから順次ご返信いたします (最大 24 時間以内)。\n\nこの会話は今後 24 時間、スタッフが直接対応します。\nお気軽にメッセージをお送りください。",
			},
		]);
	} catch (e) {
		console.error("Reply error:", e);
	}

	// 4. スタッフグループに呼出要請
	await notifyStaffGroup(
		[
			"🚨 【スタッフ呼出要請】",
			"",
			`👤 顧客: ${displayName} 様`,
			`💬 直近メッセージ: ${recentMessage || "(未取得)"}`,
			`🆔 user_id: ${userId}`,
			"",
			"⏱  以降 24 時間、AI 応答スキップ・スタッフ対応モード",
			"🔗 受信ボックス: https://chat.line.biz/U517fac03f5bf559a931138ddfc8bf5bb/?openExternalBrowser=1",
		].join("\n"),
	);

	return NextResponse.json({ ok: true, action: "request_human" });
}

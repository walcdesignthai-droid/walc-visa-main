/**
 * app/api/line/postback/route.ts — LINE Postback Handler
 * ----------------------------------------------------------------------------
 * n8n から呼ばれる Postback 専用エンドポイント。
 * AI が表示した Flex ボタンのタップ (Postback) を処理。
 *
 * 現状対応:
 *   - action=request_human → 顧客 Reply + スタッフグループ Push
 *
 * リクエスト形式:
 *   POST /api/line/postback
 *   Headers: X-Walc-Relay-Secret
 *   Body: { event: { type, replyToken, source, postback, ... }, displayName? }
 * ----------------------------------------------------------------------------
 */

import type { webhook } from "@line/bot-sdk";
import { type NextRequest, NextResponse } from "next/server";
import { getLineClient } from "@/lib/line/client";

export const runtime = "edge";
export const maxDuration = 30;

interface RelayRequest {
	event: webhook.Event;
	displayName?: string;
	recentMessage?: string;
}

export async function POST(req: NextRequest) {
	// 1. Relay Secret 検証
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

	// 2. Body
	let body: RelayRequest;
	try {
		body = (await req.json()) as RelayRequest;
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const event = body.event;

	// 3. postback でなければ即終了
	if (!event || event.type !== "postback") {
		return NextResponse.json({ ok: true, skipped: "not_postback" });
	}

	if (!("replyToken" in event) || !event.replyToken) {
		return NextResponse.json({ ok: true, skipped: "no_reply_token" });
	}

	const postback = event.postback;
	if (!postback?.data) {
		return NextResponse.json({ ok: true, skipped: "no_data" });
	}

	const userId =
		event.source && "userId" in event.source ? (event.source as { userId: string }).userId : "";
	const displayName = body.displayName || "(不明)";
	const recentMessage = body.recentMessage || "";

	// 4. action 振り分け
	if (postback.data === "action=request_human") {
		return await handleHumanRequest(
			event.replyToken,
			userId,
			displayName,
			recentMessage,
		);
	}

	return NextResponse.json({ ok: true, skipped: "unknown_action" });
}

async function handleHumanRequest(
	replyToken: string,
	userId: string,
	displayName: string,
	recentMessage: string,
): Promise<Response> {
	const client = getLineClient();
	const staffGroupId = process.env.LINE_STAFF_GROUP_ID;

	// 顧客への Reply
	try {
		await client.replyMessage({
			replyToken,
			messages: [
				{
					type: "text",
					text: "担当者にお繋ぎしました。\n\n営業時間内に WALC スタッフから順次ご返信いたします (最大 24 時間以内)。\n\nお急ぎの場合はそのままメッセージをお送りください。",
				},
			],
		});
	} catch (e) {
		console.error("Reply error:", e);
	}

	// スタッフグループへの Push 通知
	if (staffGroupId) {
		try {
			await client.pushMessage({
				to: staffGroupId,
				messages: [
					{
						type: "text",
						text: [
							"🚨 【スタッフ呼出要請】",
							"",
							`👤 顧客: ${displayName} 様`,
							`💬 直近メッセージ: ${recentMessage || "(未取得)"}`,
							`🆔 user_id: ${userId}`,
							"",
							"🔗 受信ボックス: https://chat.line.biz/U517fac03f5bf559a931138ddfc8bf5bb/?openExternalBrowser=1",
						].join("\n"),
					},
				],
			});
		} catch (e) {
			console.error("Staff push error:", e);
		}
	} else {
		console.warn("LINE_STAFF_GROUP_ID not configured - skip staff notification");
	}

	return NextResponse.json({ ok: true, action: "request_human" });
}

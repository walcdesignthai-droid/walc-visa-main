/**
 * app/api/line/postback/route.ts — v5.0
 * ----------------------------------------------------------------------------
 * - replyOrPush 採用 (Reply 失敗時 Push fallback)
 * - mode 切替時に notifyModeChange (構造化通知)
 * ----------------------------------------------------------------------------
 */

import { waitUntil } from "@vercel/functions";
import { type NextRequest, NextResponse } from "next/server";
import {
	getLineProfile,
	notifyModeChange,
	replyOrPush,
} from "@/lib/line/fetch-client";
import { setLineMode } from "@/lib/line/mode-store";

export const runtime = "edge";
export const preferredRegion = ["hnd1"];

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
		waitUntil(handleHumanRequest(event.replyToken, userId, body.recentMessage));
		return NextResponse.json({ ok: true, queued: true });
	}

	return NextResponse.json({ ok: true, skipped: "unknown_action" });
}

async function handleHumanRequest(
	replyToken: string,
	userId: string,
	recentMessage: string | undefined,
): Promise<void> {
	const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

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
				text: "担当者にお繋ぎしました。\n\n営業時間内に WALC スタッフから順次ご返信いたします (最大 24 時間以内)。\n\nこの会話は今後 24 時間、スタッフが直接対応します。\nお気軽にメッセージをお送りください。",
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

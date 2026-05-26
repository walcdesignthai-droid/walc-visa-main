/**
 * app/api/line/ai-reply/route.ts — n8n から呼ばれる AI 応答エンドポイント
 * ----------------------------------------------------------------------------
 * リクエスト形式:
 *   POST /api/line/ai-reply
 *   Headers:
 *     X-Walc-Relay-Secret: <共有シークレット>
 *     Content-Type: application/json
 *   Body:
 *     {
 *       "replyToken": "...",
 *       "userText":   "DTVについて教えて",
 *       "userId":     "U..."
 *     }
 *
 * 動作:
 *   1. RELAY_SECRET 検証
 *   2. Gemini 3.5 で応答生成
 *   3. CTA タグを Flex Message に変換
 *   4. LINE Reply API で返信
 *
 * セキュリティ:
 *   - X-Walc-Relay-Secret で n8n からの呼び出しのみ許可
 *   - LINE 署名検証は n8n 側で実施済 (or 信頼)
 * ----------------------------------------------------------------------------
 */

import { type NextRequest, NextResponse } from "next/server";
import { parseConciergeResponse } from "@/lib/concierge/cta-parser";
import { geminiGenerate } from "@/lib/concierge/gemini-client";
import { getConciergeSystemPrompt } from "@/lib/concierge/system-prompt";
import { getLineClient } from "@/lib/line/client";
import { ctaToFlexMessage } from "@/lib/line/flex-cta";

export const runtime = "edge";
export const maxDuration = 60;

interface RelayRequest {
	replyToken: string;
	userText: string;
	userId?: string;
}

export async function POST(req: NextRequest) {
	// 1. Relay Secret 検証
	const providedSecret = req.headers.get("x-walc-relay-secret");
	const expectedSecret = process.env.WALC_RELAY_SECRET;

	if (!expectedSecret) {
		console.error("WALC_RELAY_SECRET not configured");
		return NextResponse.json(
			{ error: "Server not configured" },
			{ status: 500 },
		);
	}

	if (providedSecret !== expectedSecret) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// 2. Body 検証
	let body: RelayRequest;
	try {
		body = (await req.json()) as RelayRequest;
	} catch {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	if (!body.replyToken || !body.userText) {
		return NextResponse.json(
			{ error: "replyToken and userText are required" },
			{ status: 400 },
		);
	}

	if (body.userText.length > 1000) {
		// 長すぎる場合は短いメッセージで返す
		await safeReply(body.replyToken, [
			{
				type: "text",
				text: "メッセージが長すぎます。1000 文字以内でお願いします。",
			},
		]);
		return NextResponse.json({ ok: true, note: "too_long" });
	}

	// 3. Gemini 呼び出し
	if (!process.env.GEMINI_API_KEY) {
		console.error("GEMINI_API_KEY missing");
		await safeReply(body.replyToken, [
			{
				type: "text",
				text: "申し訳ありません。一時的に AI 応答ができません。改めてお試しください。",
			},
		]);
		return NextResponse.json(
			{ error: "AI not configured" },
			{ status: 500 },
		);
	}

	try {
		const { text: rawText } = await geminiGenerate({
			systemPrompt: getConciergeSystemPrompt(),
			messages: [{ role: "user", content: body.userText }],
		});

		const parsed = parseConciergeResponse(rawText);

		const messages: Parameters<
			ReturnType<typeof getLineClient>["replyMessage"]
		>[0]["messages"] = [
			{
				type: "text",
				text: parsed.text || "(応答を生成できませんでした)",
			},
		];

		const flex = ctaToFlexMessage(parsed.cta);
		if (flex) messages.push(flex);

		await getLineClient().replyMessage({
			replyToken: body.replyToken,
			messages,
		});

		return NextResponse.json({ ok: true, cta: parsed.cta });
	} catch (e) {
		console.error("AI reply error:", e);
		await safeReply(body.replyToken, [
			{
				type: "text",
				text: "申し訳ありません。応答中にエラーが発生しました。改めてお試しください。",
			},
		]);
		return NextResponse.json(
			{ error: e instanceof Error ? e.message : "Unknown error" },
			{ status: 500 },
		);
	}
}

/** Reply エラーで二次落ちしないよう try-catch */
async function safeReply(
	replyToken: string,
	messages: Parameters<
		ReturnType<typeof getLineClient>["replyMessage"]
	>[0]["messages"],
): Promise<void> {
	try {
		await getLineClient().replyMessage({ replyToken, messages });
	} catch (e) {
		console.error("LINE reply failed:", e);
	}
}

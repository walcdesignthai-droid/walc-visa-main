/**
 * app/api/line/webhook/route.ts — LINE Messaging Webhook (Gemini 3.5 Flash)
 * ----------------------------------------------------------------------------
 * @line/bot-sdk v10 系: webhook.CallbackRequest / webhook.Event を使用
 * ----------------------------------------------------------------------------
 */

import { validateSignature } from "@line/bot-sdk";
import type { webhook } from "@line/bot-sdk";
import { type NextRequest, NextResponse } from "next/server";
import { parseConciergeResponse } from "@/lib/concierge/cta-parser";
import { geminiGenerate } from "@/lib/concierge/gemini-client";
import { getConciergeSystemPrompt } from "@/lib/concierge/system-prompt";
import { getLineChannelSecret, getLineClient } from "@/lib/line/client";
import { ctaToFlexMessage } from "@/lib/line/flex-cta";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
	const signature = req.headers.get("x-line-signature");
	if (!signature) {
		return NextResponse.json({ error: "Missing signature" }, { status: 401 });
	}

	const rawBody = await req.text();
	const channelSecret = getLineChannelSecret();
	if (!validateSignature(rawBody, channelSecret, signature)) {
		return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
	}

	const body = JSON.parse(rawBody) as webhook.CallbackRequest;
	const events = body.events ?? [];

	await Promise.all(
		events.map(async (event) => {
			try {
				await handleEvent(event);
			} catch (e) {
				console.error("LINE event handling error:", e);
			}
		}),
	);

	return NextResponse.json({ ok: true });
}

async function handleEvent(event: webhook.Event): Promise<void> {
	const client = getLineClient();

	// 友だち追加時の greeting
	if (event.type === "follow" && "replyToken" in event && event.replyToken) {
		await client.replyMessage({
			replyToken: event.replyToken,
			messages: [
				{
					type: "text",
					text: "WALC AI VISA コンシェルジュへようこそ。\n\nタイの長期滞在 VISA に関するご質問にお答えします。例えば:\n\n・自分に合うビザを知りたい\n・DTV と Thailand Privilege の違い\n・銀行口座は開設できる?\n\nお気軽にメッセージをお送りください。",
				},
			],
		});
		return;
	}

	if (event.type !== "message") return;
	if (!("replyToken" in event) || !event.replyToken) return;
	if (event.message.type !== "text") return;

	const userText = event.message.text.trim();
	if (!userText) return;

	if (userText.length > 1000) {
		await client.replyMessage({
			replyToken: event.replyToken,
			messages: [
				{
					type: "text",
					text: "メッセージが長すぎます。1000 文字以内でお願いします。",
				},
			],
		});
		return;
	}

	if (!process.env.GEMINI_API_KEY) {
		console.error("GEMINI_API_KEY missing");
		await client.replyMessage({
			replyToken: event.replyToken,
			messages: [
				{
					type: "text",
					text: "申し訳ありません。一時的に AI 応答ができません。改めてお試しください。",
				},
			],
		});
		return;
	}

	try {
		const { text: rawText } = await geminiGenerate({
			systemPrompt: getConciergeSystemPrompt(),
			messages: [{ role: "user", content: userText }],
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

		await client.replyMessage({
			replyToken: event.replyToken,
			messages,
		});
	} catch (e) {
		console.error("Gemini / LINE reply error:", e);
		await client.replyMessage({
			replyToken: event.replyToken,
			messages: [
				{
					type: "text",
					text: "申し訳ありません。応答中にエラーが発生しました。改めてお試しください。",
				},
			],
		});
	}
}

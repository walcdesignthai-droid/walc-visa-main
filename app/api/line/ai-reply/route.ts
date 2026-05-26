/**
 * app/api/line/ai-reply/route.ts — v5.0 (waitUntil 非同期化)
 * ----------------------------------------------------------------------------
 * Vercel Edge 25 秒 timeout 回避:
 *   - n8n には即時 200 を返却
 *   - CRM 連携 + Gemini 応答 + LINE Reply は waitUntil でバックグラウンド継続
 *   - LINE replyToken は 1 分有効なので余裕で間に合う
 * ----------------------------------------------------------------------------
 */

import { waitUntil } from "@vercel/functions";
import { type NextRequest, NextResponse } from "next/server";
import { parseConciergeResponse } from "@/lib/concierge/cta-parser";
import { geminiGenerate } from "@/lib/concierge/gemini-client";
import { getConciergeSystemPrompt } from "@/lib/concierge/system-prompt";
import {
	buildCustomerContext,
	getOrCreateCustomerByLine,
	listApplicationsByCustomer,
} from "@/lib/crm/client";
import { ctaToFlexMessage } from "@/lib/line/flex-cta";
import {
	getLineProfile,
	lineReply,
	notifyStaffGroup,
	type LineMessage,
} from "@/lib/line/fetch-client";
import { getLineMode } from "@/lib/line/mode-store";

export const runtime = "edge";

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

	const { replyToken, userText } = body;
	if (!replyToken || !userText) {
		return NextResponse.json({ ok: true, skipped: "missing_required" });
	}
	if (userText.length > 1000) {
		waitUntil(safeReply(replyToken, [
			{ type: "text", text: "メッセージが長すぎます。1000 文字以内でお願いします。" },
		]));
		return NextResponse.json({ ok: true, note: "too_long" });
	}

	// 3. バックグラウンドで AI 処理 (n8n には即時 200)
	waitUntil(processAiReply(body));

	return NextResponse.json({ ok: true, queued: true });
}

/** バックグラウンド AI 応答処理 (n8n からはタイムアウトしない) */
async function processAiReply(body: RelayRequest): Promise<void> {
	const { replyToken, userText, userId } = body;

	try {
		// mode 確認
		const mode = await getLineMode(userId);

		// human モード → AI スキップ + スタッフ通知
		if (mode === "human") {
			const profile = userId ? await getLineProfile(userId) : null;
			const displayName = profile?.displayName ?? "(不明)";
			await notifyStaffGroup(
				[
					"💬 [対応中]",
					`👤 ${displayName} 様`,
					`📝 ${userText}`,
					`🆔 ${userId ?? "(unknown)"}`,
				].join("\n"),
			);
			return;
		}

		// AI モード
		if (!process.env.GEMINI_API_KEY) {
			await safeReply(replyToken, [
				{ type: "text", text: "申し訳ありません。一時的に AI 応答ができません。改めてお試しください。" },
			]);
			return;
		}

		// CRM context (best-effort・エラーで失敗しても AI 応答は続ける)
		let customerContext: string | undefined;
		try {
			if (userId) {
				const profile = await getLineProfile(userId);
				const customer = await getOrCreateCustomerByLine(
					userId,
					profile?.displayName,
				);
				if (customer) {
					const apps = await listApplicationsByCustomer(customer.id);
					customerContext = buildCustomerContext(customer, apps);
				}
			}
		} catch (e) {
			console.warn("CRM context skip (continuing):", e);
		}

		// Gemini 応答
		const { text: rawText } = await geminiGenerate({
			systemPrompt: getConciergeSystemPrompt(customerContext),
			messages: [{ role: "user", content: userText }],
		});

		const parsed = parseConciergeResponse(rawText);

		const messages: LineMessage[] = [
			{ type: "text", text: parsed.text || "(応答を生成できませんでした)" },
		];
		const flex = ctaToFlexMessage(parsed.cta);
		if (flex) messages.push(flex);

		await lineReply(replyToken, messages);
	} catch (e) {
		console.error("processAiReply error:", e);
		await safeReply(replyToken, [
			{
				type: "text",
				text: "申し訳ありません。応答中にエラーが発生しました。改めてお試しください。",
			},
		]);
	}
}

async function safeReply(replyToken: string, messages: LineMessage[]): Promise<void> {
	try {
		await lineReply(replyToken, messages);
	} catch (e) {
		console.error("safeReply failed:", e);
	}
}

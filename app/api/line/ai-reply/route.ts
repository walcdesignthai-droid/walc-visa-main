/**
 * app/api/line/ai-reply/route.ts — v4.0 (CRM context aware)
 * ----------------------------------------------------------------------------
 * - mode=ai → CRM で顧客検索 → status を AI に context として注入 → Gemini 応答
 * - mode=human → AI スキップ + スタッフ通知
 * ----------------------------------------------------------------------------
 */

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
	const providedSecret = req.headers.get("x-walc-relay-secret");
	const expectedSecret = process.env.WALC_RELAY_SECRET;
	if (!expectedSecret) {
		return NextResponse.json({ error: "Server not configured" }, { status: 500 });
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

	const { replyToken, userText, userId } = body;
	if (!replyToken || !userText) {
		return NextResponse.json({ ok: true, skipped: "missing_required" });
	}
	if (userText.length > 1000) {
		await safeReply(replyToken, [{ type: "text", text: "メッセージが長すぎます。1000 文字以内でお願いします。" }]);
		return NextResponse.json({ ok: true, note: "too_long" });
	}

	// mode 確認
	const mode = await getLineMode(userId);

	// ── human モード ──
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
		return NextResponse.json({ ok: true, mode: "human", skipped: "ai" });
	}

	// ── ai モード ──
	if (!process.env.GEMINI_API_KEY) {
		await safeReply(replyToken, [{ type: "text", text: "申し訳ありません。一時的に AI 応答ができません。" }]);
		return NextResponse.json({ error: "AI not configured" }, { status: 500 });
	}

	// CRM から顧客 + 申請を取得 (並列)
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
		console.warn("CRM context fetch failed (continuing without):", e);
	}

	try {
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
		return NextResponse.json({ ok: true, mode: "ai", cta: parsed.cta });
	} catch (e) {
		console.error("AI reply error:", e);
		await safeReply(replyToken, [{ type: "text", text: "申し訳ありません。応答中にエラーが発生しました。改めてお試しください。" }]);
		return NextResponse.json(
			{ error: e instanceof Error ? e.message : "Unknown" },
			{ status: 500 },
		);
	}
}

async function safeReply(replyToken: string, messages: LineMessage[]): Promise<void> {
	try {
		await lineReply(replyToken, messages);
	} catch (e) {
		console.error("safeReply failed:", e);
	}
}

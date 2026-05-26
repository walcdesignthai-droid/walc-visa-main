/**
 * app/api/line/ai-reply/route.ts — v7.0
 * ----------------------------------------------------------------------------
 * - waitUntil で n8n に即時 200・AI 処理は背景実行
 * - replyOrPush で Reply 失敗時に Push へ fallback (replyToken 30 秒超過対策)
 * - mode 可視化: Human モード時は 🚨 通知、TTL 自動復帰時は 🔄 通知
 * - 各 phase の timing log で次回診断容易化
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
	notifyModeChange,
	notifyStaffMessageInHumanMode,
	replyOrPush,
	type LineMessage,
} from "@/lib/line/fetch-client";
import { getLineModeFull } from "@/lib/line/mode-store";

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

	const { replyToken, userText } = body;
	if (!replyToken || !userText) {
		return NextResponse.json({ ok: true, skipped: "missing_required" });
	}
	if (userText.length > 1000) {
		waitUntil(
			replyOrPush({
				replyToken,
				userId: body.userId,
				messages: [
					{
						type: "text",
						text: "メッセージが長すぎます。1000 文字以内でお願いします。",
					},
				],
			}),
		);
		return NextResponse.json({ ok: true, note: "too_long" });
	}

	waitUntil(processAiReply(body));
	return NextResponse.json({ ok: true, queued: true });
}

async function processAiReply(body: RelayRequest): Promise<void> {
	const { replyToken, userText, userId } = body;
	const t0 = Date.now();

	try {
		// 1. mode 取得
		const tMode0 = Date.now();
		const modeInfo = await getLineModeFull(userId);
		console.log(`[ai-reply] getLineModeFull ${Date.now() - tMode0}ms mode=${modeInfo.mode}`);

		// 2. プロフィール
		const tProfile0 = Date.now();
		const profile = userId ? await getLineProfile(userId) : null;
		const customerName = profile?.displayName ?? "(不明)";
		console.log(`[ai-reply] getLineProfile ${Date.now() - tProfile0}ms`);

		// 3. TTL 自動復帰なら通知
		if (modeInfo.autoReverted && userId) {
			await notifyModeChange({
				from: "human",
				to: "ai",
				customerName,
				userId,
				reason: "ttl_expired",
				recentMessage: userText,
			});
		}

		// 4. Human モード → AI スキップ + 構造化通知
		if (modeInfo.mode === "human") {
			await notifyStaffMessageInHumanMode({
				customerName,
				userText,
				userId: userId ?? "(unknown)",
				humanExpiresAt: modeInfo.expiresAt,
			});
			return;
		}

		// 5. AI モード処理
		if (!process.env.GEMINI_API_KEY) {
			await replyOrPush({
				replyToken,
				userId,
				messages: [
					{
						type: "text",
						text: "申し訳ありません。一時的に AI 応答ができません。改めてお試しください。",
					},
				],
			});
			return;
		}

		// 6. CRM context (best-effort)
		let customerContext: string | undefined;
		const tCrm0 = Date.now();
		try {
			if (userId) {
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
			console.warn("[ai-reply] CRM context skip:", e);
		}
		console.log(`[ai-reply] CRM context ${Date.now() - tCrm0}ms`);

		// 7. Gemini 応答
		const tGemini0 = Date.now();
		const { text: rawText } = await geminiGenerate({
			systemPrompt: getConciergeSystemPrompt(customerContext),
			messages: [{ role: "user", content: userText }],
		});
		console.log(`[ai-reply] Gemini ${Date.now() - tGemini0}ms`);

		const parsed = parseConciergeResponse(rawText);

		const messages: LineMessage[] = [
			{ type: "text", text: parsed.text || "(応答を生成できませんでした)" },
		];
		const flex = ctaToFlexMessage(parsed.cta);
		if (flex) messages.push(flex);

		// 8. Reply → Push fallback で確実に届ける
		const tSend0 = Date.now();
		const sendResult = await replyOrPush({ replyToken, userId, messages });
		console.log(
			`[ai-reply] send via ${sendResult.method} ${Date.now() - tSend0}ms ok=${sendResult.ok} (total=${Date.now() - t0}ms)`,
		);
	} catch (e) {
		console.error(`[ai-reply] processAiReply error after ${Date.now() - t0}ms:`, e);
		await replyOrPush({
			replyToken,
			userId,
			messages: [
				{
					type: "text",
					text: "申し訳ありません。応答中にエラーが発生しました。改めてお試しください。",
				},
			],
		});
	}
}

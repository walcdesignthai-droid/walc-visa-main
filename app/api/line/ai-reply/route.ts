/**
 * app/api/line/ai-reply/route.ts — v8.0 (universal LINE event handler)
 * ----------------------------------------------------------------------------
 * 受付フォーマット (両対応):
 *   A) LINE webhook event 直接形式:
 *      { type, replyToken, source: { userId }, message: { type, text }, postback: { data } }
 *   B) Legacy flat 形式 (後方互換):
 *      { replyToken, userText, userId }
 *
 * 内部 routing:
 *   - type === "message" && message.type === "text" → AI 応答
 *   - type === "postback"                            → handlePostback
 *   - その他                                         → skip
 *
 * Edge → Node.js runtime (Vercel Europe → LINE Japan の 30s timeout 回避)
 * regions=["hnd1"] は vercel.json で指定済
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
import { handlePostback } from "@/lib/line/postback-handler";

export const runtime = "nodejs";
export const maxDuration = 60;

interface FlatRequest {
	replyToken?: string;
	userText?: string;
	userId?: string;
}

interface LineEvent {
	type: string;
	replyToken?: string;
	source?: { userId?: string; type?: string };
	message?: { type: string; text?: string };
	postback?: { data?: string };
	timestamp?: number;
}

interface ProcessedInput {
	kind: "message" | "postback" | "unsupported";
	replyToken: string;
	userId?: string;
	userText?: string;
	postbackData?: string;
	unsupportedReason?: string;
}

function parseBody(body: unknown): ProcessedInput | { error: string } {
	if (typeof body !== "object" || body === null) {
		return { error: "body is not an object" };
	}
	const b = body as Record<string, unknown>;

	// Format detection: LINE event 形式は type + replyToken をトップに持つ
	if (typeof b.type === "string") {
		const event = b as unknown as LineEvent;
		if (!event.replyToken) return { error: "no replyToken" };

		const replyToken = event.replyToken;
		const userId = event.source?.userId;

		if (event.type === "message") {
			if (event.message?.type === "text" && event.message.text) {
				return {
					kind: "message",
					replyToken,
					userId,
					userText: event.message.text,
				};
			}
			return {
				kind: "unsupported",
				replyToken,
				userId,
				unsupportedReason: `message.type=${event.message?.type ?? "missing"}`,
			};
		}

		if (event.type === "postback") {
			return {
				kind: "postback",
				replyToken,
				userId,
				postbackData: event.postback?.data ?? "",
			};
		}

		return {
			kind: "unsupported",
			replyToken,
			userId,
			unsupportedReason: `event.type=${event.type}`,
		};
	}

	// Legacy flat 形式
	const flat = b as unknown as FlatRequest;
	if (!flat.replyToken) return { error: "no replyToken" };

	return {
		kind: "message",
		replyToken: flat.replyToken,
		userId: flat.userId,
		userText: flat.userText ?? "",
	};
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

	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const parsed = parseBody(body);
	if ("error" in parsed) {
		return NextResponse.json({ ok: true, skipped: parsed.error });
	}

	if (parsed.kind === "unsupported") {
		console.log(`[ai-reply] skipped: ${parsed.unsupportedReason}`);
		return NextResponse.json({ ok: true, skipped: parsed.unsupportedReason });
	}

	if (parsed.kind === "postback") {
		if (!parsed.postbackData) {
			return NextResponse.json({ ok: true, skipped: "no_postback_data" });
		}
		waitUntil(
			handlePostback({
				replyToken: parsed.replyToken,
				userId: parsed.userId,
				data: parsed.postbackData,
			}),
		);
		return NextResponse.json({ ok: true, queued: "postback" });
	}

	// message
	if (!parsed.userText) {
		return NextResponse.json({ ok: true, skipped: "no_text" });
	}
	if (parsed.userText.length > 1000) {
		waitUntil(
			replyOrPush({
				replyToken: parsed.replyToken,
				userId: parsed.userId,
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

	waitUntil(
		processAiReply({
			replyToken: parsed.replyToken,
			userText: parsed.userText,
			userId: parsed.userId,
		}),
	);
	return NextResponse.json({ ok: true, queued: "message" });
}

interface AiReplyInput {
	replyToken: string;
	userText: string;
	userId?: string;
}

async function processAiReply(input: AiReplyInput): Promise<void> {
	const { replyToken, userText, userId } = input;
	const t0 = Date.now();

	try {
		const tMode0 = Date.now();
		const modeInfo = await getLineModeFull(userId);
		console.log(
			`[ai-reply] getLineModeFull ${Date.now() - tMode0}ms mode=${modeInfo.mode}`,
		);

		const tProfile0 = Date.now();
		const profile = userId ? await getLineProfile(userId) : null;
		const customerName = profile?.displayName ?? "(不明)";
		console.log(`[ai-reply] getLineProfile ${Date.now() - tProfile0}ms`);

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

		if (modeInfo.mode === "human") {
			await notifyStaffMessageInHumanMode({
				customerName,
				userText,
				userId: userId ?? "(unknown)",
				humanExpiresAt: modeInfo.expiresAt,
			});
			return;
		}

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

		const tSend0 = Date.now();
		const sendResult = await replyOrPush({ replyToken, userId, messages });
		console.log(
			`[ai-reply] send via ${sendResult.method} ${Date.now() - tSend0}ms ok=${sendResult.ok} (total=${Date.now() - t0}ms)`,
		);
	} catch (e) {
		console.error(
			`[ai-reply] processAiReply error after ${Date.now() - t0}ms:`,
			e,
		);
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

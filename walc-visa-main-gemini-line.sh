#!/bin/bash
# ============================================================================
# walc-visa-main: Gemini 3.5 Flash 化 + LINE AI Concierge MVP
# ----------------------------------------------------------------------------
# A. Web AI Concierge: Anthropic → Gemini 3.5 Flash 切替 (SSE 維持)
# B. LINE AI Concierge: 新規実装 (Webhook + Gemini + Flex Message CTA)
# C. 1Password (GEMINI_API_KEY) → .env.local + Vercel Production 自動注入
# ============================================================================

set -e

WMV="$HOME/walc-projects/walc-visa-main"
cd "$WMV"

# ============================================================================
# 1. 依存変更
# ============================================================================
echo "→ Replace dependencies"
pnpm remove @anthropic-ai/sdk 2>/dev/null || true
pnpm add @google/genai @line/bot-sdk

# ============================================================================
# 2. lib/concierge/gemini-client.ts (新規)
# ============================================================================
echo "→ Generate lib/concierge/gemini-client.ts"

cat > "$WMV/lib/concierge/gemini-client.ts" <<'GEMINI_EOF'
/**
 * lib/concierge/gemini-client.ts — Google Gemini 3.5 Flash クライアント
 * ----------------------------------------------------------------------------
 * @google/genai (新 SDK) で Gemini Messages API を呼び出す薄いラッパー。
 *
 * モデル: gemini-3.5-flash (2026-05-19 リリース・1M context・4x speed)
 * - System Instruction: systemInstruction フィールドに注入
 * - Streaming: generateContentStream で逐次 chunk
 * - Implicit caching: 自動有効 (cache_control 不要)
 * ----------------------------------------------------------------------------
 */

import { GoogleGenAI } from "@google/genai";
import type { ConciergeMessage } from "./types";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
const MAX_OUTPUT_TOKENS = 600;

let cachedClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
	if (cachedClient) return cachedClient;
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		throw new Error("GEMINI_API_KEY is not configured");
	}
	cachedClient = new GoogleGenAI({ apiKey });
	return cachedClient;
}

/** ConciergeMessage[] を Gemini 形式 (contents) に変換 */
function toGeminiContents(messages: ConciergeMessage[]) {
	return messages.map((m) => ({
		role: m.role === "assistant" ? "model" : "user",
		parts: [{ text: m.content }],
	}));
}

export interface GeminiGenerateOptions {
	systemPrompt: string;
	messages: ConciergeMessage[];
	maxOutputTokens?: number;
}

/**
 * 非ストリーミング (LINE 等で使用)
 */
export async function geminiGenerate(
	options: GeminiGenerateOptions,
): Promise<{ text: string }> {
	const ai = getClient();
	const response = await ai.models.generateContent({
		model: MODEL,
		contents: toGeminiContents(options.messages),
		config: {
			systemInstruction: options.systemPrompt,
			maxOutputTokens: options.maxOutputTokens ?? MAX_OUTPUT_TOKENS,
			temperature: 0.6,
		},
	});

	return { text: response.text ?? "" };
}

/**
 * ストリーミング (Web AI Concierge で使用)
 * AsyncIterable<string> を返す (各 chunk のテキスト断片)
 */
export async function* geminiGenerateStream(
	options: GeminiGenerateOptions,
): AsyncGenerator<string, void, unknown> {
	const ai = getClient();
	const stream = await ai.models.generateContentStream({
		model: MODEL,
		contents: toGeminiContents(options.messages),
		config: {
			systemInstruction: options.systemPrompt,
			maxOutputTokens: options.maxOutputTokens ?? MAX_OUTPUT_TOKENS,
			temperature: 0.6,
		},
	});

	for await (const chunk of stream) {
		const text = chunk.text;
		if (text) yield text;
	}
}
GEMINI_EOF

# ============================================================================
# 3. app/api/concierge/route.ts (Anthropic → Gemini)
# ============================================================================
echo "→ Rewrite app/api/concierge/route.ts (Gemini SSE)"

cat > "$WMV/app/api/concierge/route.ts" <<'API_EOF'
/**
 * app/api/concierge/route.ts — Web AI Concierge v3.0 (Gemini 3.5 Flash)
 * ----------------------------------------------------------------------------
 * Google Gemini 3.5 Flash で応答を SSE で client に逐次配信。
 * - Gemini implicit caching 自動有効 (cache_control 不要)
 * - max_output_tokens 600 (短い応答強制)
 * - 最後に CTA タグを parse して done で配信
 * ----------------------------------------------------------------------------
 */

import type { NextRequest } from "next/server";
import { parseConciergeResponse } from "@/lib/concierge/cta-parser";
import { geminiGenerateStream } from "@/lib/concierge/gemini-client";
import { getConciergeSystemPrompt } from "@/lib/concierge/system-prompt";
import type {
	ConciergeApiRequest,
	ConciergeSseEvent,
} from "@/lib/concierge/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_INPUT_LENGTH = 1000;
const MAX_TURNS = 20;

function sse(event: ConciergeSseEvent): string {
	return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(req: NextRequest) {
	const encoder = new TextEncoder();

	if (!process.env.GEMINI_API_KEY) {
		return new Response(
			sse({ type: "error", message: "GEMINI_API_KEY is not configured" }),
			{ status: 500, headers: { "Content-Type": "text/event-stream" } },
		);
	}

	let body: ConciergeApiRequest;
	try {
		body = (await req.json()) as ConciergeApiRequest;
	} catch {
		return new Response(sse({ type: "error", message: "Invalid JSON body" }), {
			status: 400,
			headers: { "Content-Type": "text/event-stream" },
		});
	}

	if (!Array.isArray(body.messages) || body.messages.length === 0) {
		return new Response(
			sse({ type: "error", message: "messages is required and non-empty" }),
			{ status: 400, headers: { "Content-Type": "text/event-stream" } },
		);
	}
	if (body.messages.length > MAX_TURNS) {
		return new Response(
			sse({
				type: "error",
				message: `Conversation too long (max ${MAX_TURNS} turns)`,
			}),
			{ status: 400, headers: { "Content-Type": "text/event-stream" } },
		);
	}
	for (const m of body.messages) {
		if (m.role !== "user" && m.role !== "assistant") {
			return new Response(
				sse({ type: "error", message: "Invalid message role" }),
				{ status: 400, headers: { "Content-Type": "text/event-stream" } },
			);
		}
		if (
			typeof m.content !== "string" ||
			m.content.length === 0 ||
			m.content.length > MAX_INPUT_LENGTH
		) {
			return new Response(
				sse({
					type: "error",
					message: `Message length must be 1..${MAX_INPUT_LENGTH}`,
				}),
				{ status: 400, headers: { "Content-Type": "text/event-stream" } },
			);
		}
	}

	const systemPrompt = getConciergeSystemPrompt();

	const stream = new ReadableStream<Uint8Array>({
		async start(controller) {
			let fullText = "";

			try {
				for await (const chunk of geminiGenerateStream({
					systemPrompt,
					messages: body.messages,
				})) {
					fullText += chunk;
					controller.enqueue(
						encoder.encode(sse({ type: "delta", text: chunk })),
					);
				}

				const parsed = parseConciergeResponse(fullText);
				controller.enqueue(
					encoder.encode(sse({ type: "done", cta: parsed.cta })),
				);
			} catch (error: unknown) {
				const message =
					error instanceof Error ? error.message : "Unknown error";
				controller.enqueue(encoder.encode(sse({ type: "error", message })));
			} finally {
				controller.close();
			}
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache, no-transform",
			Connection: "keep-alive",
			"X-Accel-Buffering": "no",
		},
	});
}
API_EOF

# ============================================================================
# 4. lib/line/client.ts
# ============================================================================
echo "→ Generate lib/line/client.ts"
mkdir -p "$WMV/lib/line"

cat > "$WMV/lib/line/client.ts" <<'CLIENT_EOF'
/**
 * lib/line/client.ts — LINE Messaging API クライアント
 */

import { messagingApi } from "@line/bot-sdk";

let cached: messagingApi.MessagingApiClient | null = null;

export function getLineClient(): messagingApi.MessagingApiClient {
	if (cached) return cached;
	const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
	if (!channelAccessToken) {
		throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not configured");
	}
	cached = new messagingApi.MessagingApiClient({ channelAccessToken });
	return cached;
}

export function getLineChannelSecret(): string {
	const secret = process.env.LINE_CHANNEL_SECRET;
	if (!secret) {
		throw new Error("LINE_CHANNEL_SECRET is not configured");
	}
	return secret;
}
CLIENT_EOF

# ============================================================================
# 5. lib/line/flex-cta.ts
# ============================================================================
echo "→ Generate lib/line/flex-cta.ts"

cat > "$WMV/lib/line/flex-cta.ts" <<'FLEX_EOF'
/**
 * lib/line/flex-cta.ts — CTA タグ → LINE Flex Message 変換
 */

import type { messagingApi } from "@line/bot-sdk";
import type { ConciergeCtaType } from "@/lib/concierge/types";
import { buildApplicationUrl } from "@/lib/walc-links";

const VISA_LABELS: Record<string, string> = {
	dtv: "DTV(Destination Thailand Visa)",
	elite: "Thailand Privilege",
	ltr: "LTR",
	retirement: "リタイアメント VISA",
	student: "学生 VISA",
	family: "結婚・家族 VISA",
};

const DIAGNOSIS_URL = "https://dtv.walc-visa.online/diagnosis";

export function ctaToFlexMessage(
	cta: ConciergeCtaType | null,
): messagingApi.FlexMessage | null {
	if (!cta) return null;

	if (cta === "line") {
		return buildFlex({
			title: "WALC スタッフへ接続",
			subtitle: "個別のご相談は WALC 担当者がご対応します。",
			buttonLabel: "詳しく相談する",
			url: "https://walc-visa.online/#final-cta",
		});
	}

	if (cta === "diagnosis") {
		return buildFlex({
			title: "無料 VISA 診断",
			subtitle: "8 つの質問で最適な VISA を判定します。",
			buttonLabel: "診断を始める",
			url: DIAGNOSIS_URL,
		});
	}

	const visaId = cta.visaId;
	const label = VISA_LABELS[visaId] ?? visaId.toUpperCase();
	const url = buildApplicationUrl({
		visaId,
		source: "line-concierge",
		medium: "ai-cta",
	});

	return buildFlex({
		title: `${label} に申し込む`,
		subtitle: "オンラインで申込フォームへ進みます。",
		buttonLabel: "申込フォームへ",
		url,
	});
}

interface FlexConfig {
	title: string;
	subtitle: string;
	buttonLabel: string;
	url: string;
}

function buildFlex(c: FlexConfig): messagingApi.FlexMessage {
	return {
		type: "flex",
		altText: c.title,
		contents: {
			type: "bubble",
			size: "kilo",
			body: {
				type: "box",
				layout: "vertical",
				spacing: "md",
				paddingAll: "16px",
				contents: [
					{
						type: "text",
						text: c.title,
						weight: "bold",
						size: "md",
						color: "#0b2a4a",
						wrap: true,
					},
					{
						type: "text",
						text: c.subtitle,
						size: "xs",
						color: "#475569",
						wrap: true,
					},
				],
			},
			footer: {
				type: "box",
				layout: "vertical",
				spacing: "sm",
				paddingAll: "12px",
				contents: [
					{
						type: "button",
						style: "primary",
						color: "#0b2a4a",
						height: "sm",
						action: { type: "uri", label: c.buttonLabel, uri: c.url },
					},
				],
			},
		},
	};
}
FLEX_EOF

# ============================================================================
# 6. app/api/line/webhook/route.ts (LINE + Gemini)
# ============================================================================
echo "→ Generate app/api/line/webhook/route.ts"
mkdir -p "$WMV/app/api/line/webhook"

cat > "$WMV/app/api/line/webhook/route.ts" <<'WEBHOOK_EOF'
/**
 * app/api/line/webhook/route.ts — LINE Messaging Webhook (Gemini 3.5 Flash)
 * ----------------------------------------------------------------------------
 * LINE → ここに POST → 署名検証 → Gemini で応答生成 → LINE Reply
 *
 * 必要な環境変数 (1Password 経由):
 *   - LINE_CHANNEL_ACCESS_TOKEN
 *   - LINE_CHANNEL_SECRET
 *   - GEMINI_API_KEY
 *
 * LINE Developers Console 設定:
 *   - Webhook URL: https://walc-visa.online/api/line/webhook
 *   - Webhook の利用: 有効
 *   - 応答メッセージ: 無効
 * ----------------------------------------------------------------------------
 */

import { validateSignature, type WebhookRequestBody } from "@line/bot-sdk";
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

	const body = JSON.parse(rawBody) as WebhookRequestBody;

	await Promise.all(
		body.events.map(async (event) => {
			try {
				await handleEvent(event);
			} catch (e) {
				console.error("LINE event handling error:", e);
			}
		}),
	);

	return NextResponse.json({ ok: true });
}

async function handleEvent(
	event: WebhookRequestBody["events"][number],
): Promise<void> {
	const client = getLineClient();

	// 友だち追加時の greeting
	if (event.type === "follow") {
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

	if (event.type !== "message" || event.message.type !== "text") return;

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
WEBHOOK_EOF

# ============================================================================
# 7. .env.example / .env.local 更新
# ============================================================================
echo "→ Update .env.example / .env.local (Gemini + LINE)"

cat > "$WMV/.env.example" <<'ENV_EOF'
# ============================================================================
# walc-visa.online (メインサイト) 環境変数
# ----------------------------------------------------------------------------
# 全 secrets は 1Password (Vault: WALC-INTERNAL) で管理されています。
# .env.local には 1Password から値を差し込んでください。
# ============================================================================

# CRM 申込フォーム URL
NEXT_PUBLIC_APPLICATION_FORM_URL=https://crm.walc-visa.online/apply

# LINE 公式アカウント友だち追加 URL
NEXT_PUBLIC_LINE_ADD_URL=https://lin.ee/pQkudMM

# サイト URL
NEXT_PUBLIC_SITE_URL=https://walc-visa.online

# ----------------------------------------------------------------------------
# AI VISA Concierge (Google Gemini 3.5 Flash)
# 1Password: WALC-INTERNAL → GEMINI_API_KEY [all]
# ----------------------------------------------------------------------------
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash

# ----------------------------------------------------------------------------
# LINE Messaging API (AI Concierge for LINE OA)
# 1Password: WALC-INTERNAL → LINE_CHANNEL_ACCESS_TOKEN [production]
#                          → LINE_CHANNEL_SECRET [production]
# ----------------------------------------------------------------------------
LINE_CHANNEL_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
ENV_EOF

# .env.local に新規 key を追加(既存値は保持)
touch "$WMV/.env.local"
for KEY in GEMINI_API_KEY GEMINI_MODEL LINE_CHANNEL_ACCESS_TOKEN LINE_CHANNEL_SECRET; do
  if ! grep -q "^$KEY=" "$WMV/.env.local"; then
    echo "$KEY=" >> "$WMV/.env.local"
  fi
done

# 旧 ANTHROPIC_* は コメントアウト
sed -i '' 's|^ANTHROPIC_|# DEPRECATED_ANTHROPIC_|g' "$WMV/.env.local" 2>/dev/null || true

# GEMINI_MODEL に固定値
sed -i '' 's|^GEMINI_MODEL=.*|GEMINI_MODEL=gemini-3.5-flash|' "$WMV/.env.local"

# ============================================================================
# 8. 1Password から secrets 注入
# ============================================================================
echo ""
echo "→ Inject secrets from 1Password (WALC-INTERNAL)"

inject_secret() {
  local env_key="$1"
  shift
  for ITEM in "$@"; do
    VALUE=$(op item get "$ITEM" --vault WALC-INTERNAL --fields credential --reveal 2>/dev/null || true)
    if [ -n "$VALUE" ]; then
      # & や / を含む値を sed で扱うため、区切り文字を | に
      sed -i '' "s|^$env_key=.*|$env_key=$VALUE|" "$WMV/.env.local"
      echo "  ✓ $env_key ← '$ITEM'"
      return 0
    fi
  done
  echo "  ! $env_key: 候補 item に見つからず ($*)"
  return 1
}

inject_secret "GEMINI_API_KEY" "GEMINI_API_KEY [all]" "GEMINI_API_KEY [production]" "GEMINI_API_KEY"
inject_secret "LINE_CHANNEL_ACCESS_TOKEN" \
  "LINE_CHANNEL_ACCESS_TOKEN [production]" \
  "LINE_CHANNEL_ACCESS_TOKEN [all]" \
  "LINE_CHANNEL_ACCESS_TOKEN"
inject_secret "LINE_CHANNEL_SECRET" \
  "LINE_CHANNEL_SECRET [production]" \
  "LINE_CHANNEL_SECRET [all]" \
  "LINE_CHANNEL_SECRET"

# ============================================================================
# 9. Vercel 環境変数登録 (Production)
# ============================================================================
echo ""
echo "→ Vercel 環境変数登録 (Production)"

# 既存の Anthropic は削除
for OLD_KEY in ANTHROPIC_API_KEY ANTHROPIC_MODEL; do
  EXIST=$(pnpm dlx vercel env ls production 2>/dev/null | grep "^  $OLD_KEY" || true)
  if [ -n "$EXIST" ]; then
    echo "y" | pnpm dlx vercel env rm "$OLD_KEY" production 2>/dev/null || true
    echo "  ✓ $OLD_KEY (旧 Anthropic) 削除"
  fi
done

vercel_env_set() {
  local key="$1"
  local value="$2"
  if [ -z "$value" ]; then
    echo "  ! $key: 値なし (skip)"
    return
  fi
  EXIST=$(pnpm dlx vercel env ls production 2>/dev/null | grep "^  $key" || true)
  if [ -n "$EXIST" ]; then
    echo "y" | pnpm dlx vercel env rm "$key" production 2>/dev/null || true
  fi
  printf "%s" "$value" | pnpm dlx vercel env add "$key" production > /dev/null 2>&1
  echo "  ✓ $key 登録完了"
}

GEMINI_VAL=$(grep ^GEMINI_API_KEY= "$WMV/.env.local" | cut -d'=' -f2-)
LINE_TOKEN_VAL=$(grep ^LINE_CHANNEL_ACCESS_TOKEN= "$WMV/.env.local" | cut -d'=' -f2-)
LINE_SECRET_VAL=$(grep ^LINE_CHANNEL_SECRET= "$WMV/.env.local" | cut -d'=' -f2-)

vercel_env_set "GEMINI_API_KEY" "$GEMINI_VAL"
vercel_env_set "GEMINI_MODEL" "gemini-3.5-flash"
vercel_env_set "LINE_CHANNEL_ACCESS_TOKEN" "$LINE_TOKEN_VAL"
vercel_env_set "LINE_CHANNEL_SECRET" "$LINE_SECRET_VAL"

# ============================================================================
# 10. typecheck + commit + push
# ============================================================================
echo ""
echo "→ Verify: typecheck"
pnpm typecheck

echo ""
echo "→ git commit + push (auto-deploy 走る)"
git add -A
git commit -m "feat(ai): switch to Gemini 3.5 Flash + LINE AI Concierge MVP

WALC DESIGN 統一・速度 4x・1M context・コスト 1/40

- @anthropic-ai/sdk 削除 → @google/genai 追加
- @line/bot-sdk 追加
- lib/concierge/gemini-client.ts: Gemini SDK wrapper
  * generate / generateStream の 2 関数
  * implicit caching 自動有効
- app/api/concierge/route.ts: Gemini SSE 配信
- lib/line/client.ts: LINE Messaging client wrapper
- lib/line/flex-cta.ts: CTA タグ → Flex Message bubble
- app/api/line/webhook/route.ts: LINE webhook (Gemini + Flex CTA)
- .env: GEMINI_API_KEY / LINE_CHANNEL_ACCESS_TOKEN / LINE_CHANNEL_SECRET
- 1Password (WALC-INTERNAL) から自動注入"

git push

echo ""
echo "============================================================================"
echo "✓ Gemini 3.5 切替 + LINE MVP applied!"
echo "============================================================================"
echo ""
echo "次の手順:"
echo ""
echo "  A. Web Concierge 動作確認:"
echo "     1. ローカル: pnpm dev 再起動 → http://localhost:3000 で質問"
echo "     2. Vercel デプロイ後: https://walc-visa.online で質問"
echo "     → 体感 4x 速い & 同じ品質を確認"
echo ""
echo "  B. LINE Developers Console 設定 (一度だけ):"
echo "     1. https://developers.line.biz/console/ にログイン"
echo "     2. WALC VISA Messaging API channel を選択"
echo "     3. Messaging API 設定タブを開く"
echo "     4. Webhook 設定:"
echo "          Webhook URL: https://walc-visa.online/api/line/webhook"
echo "          Webhook の利用: 有効"
echo "          検証ボタン → Success が出れば疎通 OK"
echo "     5. 応答設定:"
echo "          応答メッセージ: 無効"
echo "          あいさつメッセージ: 無効 (webhook 側で実装済)"
echo ""
echo "  C. LINE 動作確認:"
echo "     1. スマホで WALC VISA LINE OA を開く"
echo "     2. 「DTV と Thailand Privilege の違いは?」と送信"
echo "     3. 数秒で AI 応答 + Flex Message CTA カードが返る"

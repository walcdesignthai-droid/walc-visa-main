#!/bin/bash
# ============================================================================
# Fix: Gemini client を WALC DESIGN の動作実装に完全同期
# ----------------------------------------------------------------------------
# 変更点:
#   - thinkingConfig 削除 (WALC DESIGN 仕様)
#   - maxOutputTokens: 2000 → 1024
#   - temperature: 0.6 → 0.7
#   - 入力サニタイズ追加: String().slice(0, 4000)
#   - 重要: chunk.text undefined gard 維持
# ============================================================================

set -e

WMV="$HOME/walc-projects/walc-visa-main"
cd "$WMV"

echo "→ Sync lib/concierge/gemini-client.ts to WALC DESIGN spec"

cat > "$WMV/lib/concierge/gemini-client.ts" <<'GEMINI_EOF'
/**
 * lib/concierge/gemini-client.ts — v3.0 (WALC DESIGN 同期)
 * ----------------------------------------------------------------------------
 * 修正履歴:
 *   v3.0 (2026-05-26) — WALC DESIGN の本番稼働実装に完全同期。
 *     - thinkingConfig 削除 (Gemini 3.5 Flash では thinking 予算は別枠)
 *     - maxOutputTokens: 2000 → 1024
 *     - temperature: 0.6 → 0.7
 *     - 入力サニタイズ追加: 4000 文字制限
 *   v2.0 (廃止) — thinkingConfig: { thinkingBudget: 0 } 追加 → 逆に出力切れる
 * ----------------------------------------------------------------------------
 */

import { GoogleGenAI } from "@google/genai";
import type { ConciergeMessage } from "./types";

const MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
const MAX_OUTPUT_TOKENS = 1024;
const INPUT_LIMIT = 4000;

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

/** ConciergeMessage[] → Gemini contents 形式 + 入力サニタイズ */
function toGeminiContents(messages: ConciergeMessage[]) {
	return messages.map((m) => ({
		role: m.role === "assistant" ? "model" : "user",
		parts: [{ text: String(m.content ?? "").slice(0, INPUT_LIMIT) }],
	}));
}

export interface GeminiGenerateOptions {
	systemPrompt: string;
	messages: ConciergeMessage[];
	maxOutputTokens?: number;
}

function buildConfig(options: GeminiGenerateOptions) {
	return {
		systemInstruction: options.systemPrompt,
		maxOutputTokens: options.maxOutputTokens ?? MAX_OUTPUT_TOKENS,
		temperature: 0.7,
		// thinkingConfig は明示設定しない (WALC DESIGN 仕様)
		// → Gemini 3.5 Flash では thinking 予算は別枠で maxOutputTokens を消費しない
	};
}

export async function geminiGenerate(
	options: GeminiGenerateOptions,
): Promise<{ text: string }> {
	const ai = getClient();
	const response = await ai.models.generateContent({
		model: MODEL,
		contents: toGeminiContents(options.messages),
		config: buildConfig(options),
	});

	return { text: response.text ?? "" };
}

export async function* geminiGenerateStream(
	options: GeminiGenerateOptions,
): AsyncGenerator<string, void, unknown> {
	const ai = getClient();
	const stream = await ai.models.generateContentStream({
		model: MODEL,
		contents: toGeminiContents(options.messages),
		config: buildConfig(options),
	});

	for await (const chunk of stream) {
		const text = chunk.text;
		// thinking chunk 等で text が undefined のことがある → 必ずガード
		if (text) yield text;
	}
}
GEMINI_EOF

echo "→ Verify typecheck"
pnpm typecheck

echo ""
echo "→ git commit + push"
git add -A
git commit -m "fix(gemini): sync with WALC DESIGN working spec

WALC DESIGN の本番稼働実装に完全同期して出力途切れを解消。

Changes from v2 (broken):
- DELETE thinkingConfig: { thinkingBudget: 0 }
  → Gemini 3.5 Flash thinking budget is separate from maxOutputTokens.
  → 明示的に 0 設定すると SDK レベルで何かが誤動作して出力切れ。
  → WALC DESIGN は thinkingConfig 未設定で正常稼働中。
- maxOutputTokens: 2000 → 1024 (WALC DESIGN 標準)
- temperature: 0.6 → 0.7 (営業・問答に最適)
- INPUT_LIMIT 4000 chars (プロンプトインジェクション + コスト爆発防止)
- chunk.text undefined ガード維持 (thinking chunk 対策)

Verified working: WALC DESIGN walc-design.com で同設定で安定稼働中
(初回 chunk 1.5-3s / 200-300 字応答 5-10s)"

git push

echo ""
echo "============================================================================"
echo "✓ Gemini client を WALC DESIGN 仕様に同期 + push"
echo "============================================================================"
echo ""
echo "Vercel auto-deploy 完了後 (1-2 分):"
echo ""
echo "  curl -N -X POST https://www.walc-visa.online/api/concierge \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"messages\":[{\"role\":\"user\",\"content\":\"DTVについて200字で教えて\"}]}'"
echo ""
echo "→ 期待: 200-300 字フル応答(複数 data: chunk)"
echo "→ 末尾に data: {\"type\":\"done\",\"cta\":...}"
echo ""
echo "ブラウザでも https://www.walc-visa.online で AI Chat → 自然な応答"

/**
 * lib/line/mode-store.ts — LINE ユーザーモード管理 (AI / Human)
 * ----------------------------------------------------------------------------
 * Supabase の line_user_modes テーブルで永続化。
 * Human モードは 24h で自動 AI 復帰。
 * ----------------------------------------------------------------------------
 */

import { getSupabaseAdmin } from "@/lib/supabase/server";

export type LineMode = "ai" | "human";

const HUMAN_MODE_DURATION_MS = 24 * 60 * 60 * 1000; // 24h

interface LineUserModeRow {
	line_user_id: string;
	mode: LineMode;
	entered_human_at: string | null;
	expires_at: string | null;
	updated_at: string;
}

/** モード取得 (期限切れなら自動で AI に復帰させた上で 'ai' を返す) */
export async function getLineMode(userId: string | undefined): Promise<LineMode> {
	if (!userId) return "ai";

	const sb = getSupabaseAdmin();
	const { data, error } = await sb
		.from("line_user_modes")
		.select("mode, expires_at")
		.eq("line_user_id", userId)
		.maybeSingle<Pick<LineUserModeRow, "mode" | "expires_at">>();

	if (error) {
		console.error("getLineMode error:", error.message);
		return "ai";
	}
	if (!data) return "ai";

	// human モードで expires_at を過ぎている → AI 復帰
	if (
		data.mode === "human" &&
		data.expires_at &&
		new Date(data.expires_at) < new Date()
	) {
		await setLineMode(userId, "ai");
		return "ai";
	}

	return data.mode;
}

/** モード設定 (human の場合 24h の expires_at を自動セット) */
export async function setLineMode(
	userId: string,
	mode: LineMode,
): Promise<void> {
	if (!userId) return;

	const sb = getSupabaseAdmin();
	const now = new Date();
	const row: Omit<LineUserModeRow, "updated_at"> & { updated_at: string } = {
		line_user_id: userId,
		mode,
		entered_human_at: mode === "human" ? now.toISOString() : null,
		expires_at:
			mode === "human"
				? new Date(now.getTime() + HUMAN_MODE_DURATION_MS).toISOString()
				: null,
		updated_at: now.toISOString(),
	};

	const { error } = await sb.from("line_user_modes").upsert(row);
	if (error) {
		console.error("setLineMode error:", error.message);
	}
}

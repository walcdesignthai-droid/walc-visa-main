/**
 * lib/line/mode-store.ts — v2.1
 * ----------------------------------------------------------------------------
 * HUMAN_MODE_DURATION_MS / HUMAN_MODE_DURATION_HOURS を export し、
 * 他モジュール (postback-handler 等) と完全一致させる。
 * v2.1: 24h → 6h に変更
 * ----------------------------------------------------------------------------
 */

import { getSupabaseAdmin } from "@/lib/supabase/server";

export type LineMode = "ai" | "human";

/** Human モード継続時間 (時間単位) — UI / 通知用 */
export const HUMAN_MODE_DURATION_HOURS = 6;

/** Human モード継続時間 (ms) — setLineMode 内部用 */
export const HUMAN_MODE_DURATION_MS = HUMAN_MODE_DURATION_HOURS * 60 * 60 * 1000;

interface LineUserModeRow {
	line_user_id: string;
	mode: LineMode;
	entered_human_at: string | null;
	expires_at: string | null;
	updated_at: string;
}

export interface LineModeFull {
	mode: LineMode;
	expiresAt: Date | null;
	autoReverted: boolean;
}

export async function getLineModeFull(
	userId: string | undefined,
): Promise<LineModeFull> {
	if (!userId) return { mode: "ai", expiresAt: null, autoReverted: false };

	const sb = getSupabaseAdmin();
	const { data, error } = await sb
		.from("line_user_modes")
		.select("mode, expires_at")
		.eq("line_user_id", userId)
		.maybeSingle<Pick<LineUserModeRow, "mode" | "expires_at">>();

	if (error) {
		console.error("getLineModeFull error:", error.message);
		return { mode: "ai", expiresAt: null, autoReverted: false };
	}
	if (!data) return { mode: "ai", expiresAt: null, autoReverted: false };

	const expiresAt = data.expires_at ? new Date(data.expires_at) : null;

	if (data.mode === "human" && expiresAt && expiresAt < new Date()) {
		await setLineMode(userId, "ai");
		return { mode: "ai", expiresAt: null, autoReverted: true };
	}

	return {
		mode: data.mode,
		expiresAt: data.mode === "human" ? expiresAt : null,
		autoReverted: false,
	};
}

export async function getLineMode(
	userId: string | undefined,
): Promise<LineMode> {
	const r = await getLineModeFull(userId);
	return r.mode;
}

export async function setLineMode(
	userId: string,
	mode: LineMode,
): Promise<void> {
	if (!userId) return;

	const sb = getSupabaseAdmin();
	const now = new Date();
	const row: LineUserModeRow = {
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

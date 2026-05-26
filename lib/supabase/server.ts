/**
 * lib/supabase/server.ts — Edge 対応 Supabase クライアント
 * ----------------------------------------------------------------------------
 * SERVICE_ROLE_KEY を使うので server side のみで import すること。
 * 公開ページに import すると key が漏れる。
 * ----------------------------------------------------------------------------
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
	if (cached) return cached;
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !key) {
		throw new Error(
			"Supabase env missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)",
		);
	}
	cached = createClient(url, key, {
		auth: { persistSession: false, autoRefreshToken: false },
	});
	return cached;
}

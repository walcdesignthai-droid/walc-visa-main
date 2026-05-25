/**
 * lib/utils.ts
 * ----------------------------------------------------------------------------
 * 汎用ユーティリティ。Phase 1 では `cn()` のみ。後フェーズで currency / date /
 * URL 整形などをここに集約していく。
 * ----------------------------------------------------------------------------
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind クラスを安全に合成するヘルパー。
 *   - `clsx` で条件付きクラスをマージ
 *   - `twMerge` で競合する Tailwind ユーティリティを最後勝ちで解決
 *
 * @example
 *   cn("px-4 py-2", isActive && "bg-gold", className)
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

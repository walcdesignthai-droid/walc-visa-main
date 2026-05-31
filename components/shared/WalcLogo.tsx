/**
 * components/shared/WalcLogo.tsx
 * ----------------------------------------------------------------------------
 * WALC VISA Consulting ロゴ。
 *
 * 構成:
 *   [シンボルマーク画像] + WALC VISA(ゴシック・太字)/ Consulting(細字・トラッキング広め)
 *
 * 画像: public/walc-visa-logo.png(1024x1024 RGBA・カラフルなドット渦巻き)
 *
 * 修正履歴:
 *   v2.0 (2026-05-24) — ユーザー提供のシンボルマーク画像を組み込み。
 *     priority 指定で LCP を改善。サイズは Header の縦に揃え 36-40px。
 * ----------------------------------------------------------------------------
 */

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface WalcLogoProps {
	/** リンク先(デフォルト: /) */
	href?: string;
	/** 「Consulting」サブテキストを表示するか(モバイルでは false 推奨) */
	showConsulting?: boolean;
	/** 配色テーマ(ヘッダー / フッター用)。dark = 白基調背景上の濃色文字, light = 暗背景上の白文字 */
	variant?: "dark" | "light";
	className?: string;
}

export function WalcLogo({
	href = "/",
	showConsulting = true,
	variant = "dark",
	className,
}: WalcLogoProps) {
	const textColor = variant === "dark" ? "text-brand" : "text-text-on-dark";
	const subTextColor =
		variant === "dark" ? "text-text-tertiary" : "text-white/70";
	const hoverColor =
		variant === "dark"
			? "group-hover:text-accent-blue"
			: "group-hover:text-white";

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center gap-2.5 group",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded",
				className,
			)}
			aria-label="WALC VISA Consulting ホーム"
		>
			{/* シンボルマーク画像 */}
			<Image
				src="/walc-visa-logo.png"
				alt=""
				width={40}
				height={40}
				priority
				className="shrink-0 w-9 h-9 md:w-10 md:h-10 transition-transform group-hover:scale-105"
			/>

			{/* テキスト部 */}
			<div className="flex flex-col leading-none">
				<span
					className={cn(
						"text-lg md:text-xl font-bold tracking-tight transition-colors",
						textColor,
						hoverColor,
					)}
				>
					WALC VISA
				</span>
				{showConsulting && (
					<span
						className={cn(
							"text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-semibold mt-1",
							subTextColor,
						)}
					>
						Consulting
					</span>
				)}
			</div>
		</Link>
	);
}

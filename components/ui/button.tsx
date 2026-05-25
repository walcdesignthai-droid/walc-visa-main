/**
 * components/ui/button.tsx
 * ----------------------------------------------------------------------------
 * Server Component として動作するベース Button。
 *   - variant: primary / secondary / line / ghost
 *   - size   : sm / md / lg / xl
 *   - asChild: 子要素にスタイルを継承させる(<Link> / <a> へ流用)
 *
 * フォーカスリングはゴールド輪郭、ホバーは明度+10% 相当のトーンジャンプ。
 * クリック領域は最小 36px(sm) ~ 64px(xl)で、モバイルタップ性を担保。
 * ----------------------------------------------------------------------------
 */

import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "line" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/* ---------- Variant / Size マップ ------------------------------------------- */

const variantClass: Record<ButtonVariant, string> = {
	// ゴールド面 + 黒文字。WALC の主役 CTA。
	primary: [
		"bg-gold text-bg-primary",
		"hover:bg-gold-bright",
		"shadow-gold",
		"border border-transparent",
	].join(" "),

	// 透過 + ゴールド枠。Hero のセカンダリ CTA や対比配置。
	secondary: [
		"bg-transparent text-gold",
		"border border-gold",
		"hover:bg-gold/10",
	].join(" "),

	// LINE 公式緑。LIFF / 友だち追加用の専用 variant。
	line: [
		"bg-line text-white",
		"hover:bg-line-hover",
		"border border-transparent",
		"shadow-md",
	].join(" "),

	// 装飾なし。ナビゲーションリンクや微弱アクション。
	ghost: [
		"bg-transparent text-text-primary",
		"hover:bg-bg-elevated",
		"border border-transparent",
	].join(" "),
};

const sizeClass: Record<ButtonSize, string> = {
	sm: "h-9 px-3 text-sm rounded-md",
	md: "h-11 px-5 text-base rounded-md",
	lg: "h-14 px-8 text-lg rounded-md",
	xl: "h-16 px-10 text-lg rounded-lg",
};

/* ---------- Component ------------------------------------------------------- */

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	/** true の場合、直下の子要素を Slot として描画(<Link> / <a> へ流用) */
	asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{
			className,
			variant = "primary",
			size = "md",
			asChild = false,
			type,
			...props
		},
		ref,
	) {
		const Comp = asChild ? Slot : "button";

		return (
			<Comp
				ref={ref}
				// asChild=true のときは type 属性を強制しない(<a> 等への伝播事故を防ぐ)
				type={asChild ? undefined : (type ?? "button")}
				className={cn(
					// 共通: タイポ / レイアウト / 状態
					"inline-flex items-center justify-center gap-2",
					"font-medium tracking-wide whitespace-nowrap",
					"transition-colors duration-200 ease-out",
					"focus-visible:outline-none",
					"focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
					"disabled:opacity-50 disabled:pointer-events-none",
					"select-none",
					sizeClass[size],
					variantClass[variant],
					className,
				)}
				{...props}
			/>
		);
	},
);

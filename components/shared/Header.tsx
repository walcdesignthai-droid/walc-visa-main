/**
 * components/shared/Header.tsx — walc-visa.online メインサイト
 * ----------------------------------------------------------------------------
 * グローバルヘッダー(常時白・ネイビーロゴ)。
 * DTV LP と同じ視覚言語を継承。
 *
 * 修正履歴:
 *   v1.1 (2026-05-25) — mobile overlay の a11y を改善。
 *     ・閉じる用 button を独立化(キーボード対応)
 *     ・nav 自体は role="dialog" の中に配置
 * ----------------------------------------------------------------------------
 */

"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WalcLogo } from "@/components/shared/WalcLogo";
import { Button } from "@/components/ui/button";
import { getLineAddUrl } from "@/lib/walc-links";

const NAV_ITEMS = [
	{ href: "#visa-types", label: "VISA 一覧" },
	{ href: "#pricing", label: "料金" },
	{ href: "#results", label: "取得実績" },
	{ href: "#why-walc", label: "WALC とは" },
	{ href: "#faq", label: "FAQ" },
] as const;

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const lineUrl = getLineAddUrl();

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-border-subtle shadow-sm">
				<div className="mx-auto max-w-content px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
					<WalcLogo />

					<nav className="hidden md:flex items-center gap-6 lg:gap-7">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-sm text-brand hover:text-accent-blue transition-colors font-medium"
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-2">
						<Button
							asChild
							variant="line"
							size="sm"
							className="hidden sm:inline-flex"
						>
							<a href={lineUrl} target="_blank" rel="noopener noreferrer">
								LINE で相談
							</a>
						</Button>

						<button
							type="button"
							className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-brand hover:bg-bg-elevated transition-colors"
							aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen((v) => !v)}
						>
							{mobileOpen ? (
								<X className="w-5 h-5" />
							) : (
								<Menu className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>
			</header>

			{mobileOpen && (
				<div
					className="fixed inset-0 z-30 md:hidden bg-white pt-20"
					role="dialog"
					aria-modal="true"
					aria-label="メニュー"
				>
					{/* 背景タップで閉じる用の独立ボタン(キーボード対応・a11y 準拠) */}
					<button
						type="button"
						className="absolute inset-0 w-full h-full cursor-default"
						aria-label="メニューを閉じる"
						onClick={() => setMobileOpen(false)}
					/>
					<nav className="relative flex flex-col px-5 py-6 gap-1">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="px-3 py-4 text-lg text-brand font-medium border-b border-border-subtle hover:text-accent-blue transition-colors"
								onClick={() => setMobileOpen(false)}
							>
								{item.label}
							</Link>
						))}
						<Button asChild variant="line" size="lg" className="mt-6 w-full">
							<a href={lineUrl} target="_blank" rel="noopener noreferrer">
								LINE で無料相談
							</a>
						</Button>
					</nav>
				</div>
			)}
		</>
	);
}

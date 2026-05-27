/**
 * components/shared/Header.tsx — 共通ヘッダー (全 LP / 詳細ページ)
 * ----------------------------------------------------------------------------
 * v2.0 (2026-05-26) — 全ページ共通化 (Yosuke 指示)
 *   - HEADER_NAV / GLOBAL_CTAS を lib/walc-data/site-map.ts から取得
 *   - 「最適 VISA 診断」を常時表示 CTA に追加 (全ページ SEO 対策)
 *   - ナビゲーションリンクを内部ページ対応に (#anchor + /visas/* 両方)
 * ----------------------------------------------------------------------------
 */

"use client";

import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WalcLogo } from "@/components/shared/WalcLogo";
import { Button } from "@/components/ui/button";
import { GLOBAL_CTAS, HEADER_NAV } from "@/lib/walc-data/site-map";

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-border-subtle shadow-sm">
				<div className="mx-auto max-w-content px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
					<Link href="/" className="shrink-0">
						<WalcLogo />
					</Link>

					<nav className="hidden lg:flex items-center gap-5 xl:gap-6">
						{HEADER_NAV.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-sm text-brand hover:text-accent-blue transition-colors font-medium whitespace-nowrap"
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-2">
						{/* 最適 VISA 診断 - 全ページ常時表示 */}
						<a
							href={GLOBAL_CTAS.diagnosis.href}
							target="_blank"
							rel="noopener noreferrer"
							className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs md:text-sm font-bold text-brand-deep bg-amber-300 hover:bg-amber-200 transition-colors shadow-sm"
						>
							<Sparkles className="w-3.5 h-3.5" />
							{GLOBAL_CTAS.diagnosis.label}
						</a>

						<Button
							asChild
							variant="line"
							size="sm"
							className="hidden sm:inline-flex"
						>
							<a
								href={GLOBAL_CTAS.line.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								{GLOBAL_CTAS.line.label}
							</a>
						</Button>

						<button
							type="button"
							className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-brand hover:bg-bg-elevated transition-colors"
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
					className="fixed inset-0 z-30 lg:hidden bg-white pt-20 overflow-y-auto"
					role="dialog"
					aria-modal="true"
					aria-label="メニュー"
				>
					<button
						type="button"
						className="absolute inset-0 w-full h-full cursor-default"
						aria-label="メニューを閉じる"
						onClick={() => setMobileOpen(false)}
					/>
					<nav className="relative flex flex-col px-5 py-6 gap-1 pb-12">
						{HEADER_NAV.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="px-3 py-4 text-lg text-brand font-medium border-b border-border-subtle hover:text-accent-blue transition-colors"
								onClick={() => setMobileOpen(false)}
							>
								{item.label}
							</Link>
						))}
						<a
							href={GLOBAL_CTAS.diagnosis.href}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-amber-300 text-brand-deep font-bold text-base shadow-md"
							onClick={() => setMobileOpen(false)}
						>
							<Sparkles className="w-4 h-4" />
							{GLOBAL_CTAS.diagnosis.label}
						</a>
						<Button asChild variant="line" size="lg" className="mt-3 w-full">
							<a
								href={GLOBAL_CTAS.line.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								{GLOBAL_CTAS.line.label}
							</a>
						</Button>
					</nav>
				</div>
			)}
		</>
	);
}

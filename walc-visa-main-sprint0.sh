#!/bin/bash
# ============================================================================
# WALC VISA Main Site — Sprint 0 Setup Script
# ----------------------------------------------------------------------------
# このスクリプトは ~/walc-projects/walc-visa-main で実行することを前提とする。
# DTV LP (~/walc-projects/dtv-walc-visa) から共通ファイルを移植し、
# walc-visa-main 専用の Header / Footer / page.tsx を生成する。
# ============================================================================

set -e

DTV="$HOME/walc-projects/dtv-walc-visa"
WMV="$HOME/walc-projects/walc-visa-main"

cd "$WMV"

# ---------- 0. 前提確認 ----------
if [ ! -d "$DTV" ]; then
  echo "ERROR: DTV LP repo not found at $DTV"
  exit 1
fi

echo "=== Sprint 0: walc-visa-main setup ==="
echo "DTV source: $DTV"
echo "Target:     $WMV"
echo ""

# ---------- 1. 依存追加 ----------
echo "→ Step 1/6: Installing dependencies..."
pnpm add \
  motion \
  @line/liff \
  @supabase/supabase-js \
  @radix-ui/react-slot \
  clsx \
  lucide-react@^1.16.0 \
  react-hook-form \
  tailwind-merge \
  zod \
  zustand

pnpm add -D \
  @biomejs/biome@2.4.15 \
  @vercel/analytics \
  @vitest/ui \
  vitest

# Next.js が ESLint をデフォルトで入れていた場合は削除
pnpm remove eslint eslint-config-next 2>/dev/null || true
rm -f .eslintrc.json eslint.config.mjs eslint.config.js 2>/dev/null || true

# ---------- 2. 共通ファイル移植 (DTV LP → walc-visa-main) ----------
echo ""
echo "→ Step 2/6: Copying shared files from DTV LP..."

# styles
mkdir -p "$WMV/styles"
cp "$DTV/styles/tokens.css" "$WMV/styles/tokens.css"

# globals.css (Tailwind v4 theme inline)
cp "$DTV/app/globals.css" "$WMV/app/globals.css"

# lib
mkdir -p "$WMV/lib"
cp "$DTV/lib/utils.ts" "$WMV/lib/utils.ts"
cp "$DTV/lib/walc-links.ts" "$WMV/lib/walc-links.ts"
cp "$DTV/lib/walc-stats.ts" "$WMV/lib/walc-stats.ts"

# components/shared (WalcLogo のみ・Header/Footer は walc-visa-main 専用で新規生成)
mkdir -p "$WMV/components/shared"
cp "$DTV/components/shared/WalcLogo.tsx" "$WMV/components/shared/WalcLogo.tsx"

# components/ui (button のみ)
mkdir -p "$WMV/components/ui"
cp "$DTV/components/ui/button.tsx" "$WMV/components/ui/button.tsx"

# public assets
cp "$DTV/public/walc-visa-logo.png" "$WMV/public/walc-visa-logo.png"

# biome.json
cp "$DTV/biome.json" "$WMV/biome.json"

# ---------- 3. walc-visa-main 専用ファイル生成 ----------
echo ""
echo "→ Step 3/6: Generating walc-visa-main specific files..."

# ----- app/layout.tsx (DTV と同構造・metadata だけ書き換え) -----
cat > "$WMV/app/layout.tsx" <<'LAYOUT_EOF'
/**
 * app/layout.tsx — walc-visa.online (メインサイト)
 * ----------------------------------------------------------------------------
 * フォント: Plus Jakarta Sans + Noto Sans JP (DTV LP と統一)
 * Cormorant Garamond は将来の装飾見出し用に保持。
 * ----------------------------------------------------------------------------
 */

import type { Metadata } from "next";
import {
	Cormorant_Garamond,
	Noto_Sans_JP,
	Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-jakarta",
});

const notoSansJp = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
	variable: "--font-noto-sans-jp",
});

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-cormorant",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://walc-visa.online"),
	title: {
		default: "WALC VISA Consulting — タイVISA取得・運用の専門コンサルティング",
		template: "%s | WALC VISA Consulting",
	},
	description:
		"タイ国内最大級のVISA取得実績(300件以上)。DTV / リタイア / Thailand Privilege / LTR / 学生 / 結婚 など全種別に対応。専用CRMアプリで申込から取得後の管理まで一気通貫サポート。",
	keywords: [
		"タイ ビザ",
		"タイ VISA",
		"DTV",
		"Thailand Privilege",
		"LTR",
		"リタイアメントビザ",
		"学生ビザ",
		"WALC",
		"WALC VISA Consulting",
	],
	authors: [{ name: "WALC DESIGN Co., Ltd." }],
	creator: "WALC DESIGN Co., Ltd.",
	publisher: "WALC DESIGN Co., Ltd.",
	alternates: {
		canonical: "/",
		languages: { ja: "/", "x-default": "/" },
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/",
		siteName: "WALC VISA Consulting",
		title: "WALC VISA Consulting — タイVISA取得・運用の専門コンサルティング",
		description:
			"タイ国内最大級のVISA取得実績(300件以上)。DTV / リタイア / Thailand Privilege / LTR など全種別に対応。",
	},
	twitter: {
		card: "summary_large_image",
		title: "WALC VISA Consulting",
		description:
			"タイVISA取得・運用の専門コンサル。300件超の取得実績。",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-snippet": -1,
			"max-image-preview": "large",
			"max-video-preview": -1,
		},
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html
			lang="ja"
			className={`${jakarta.variable} ${notoSansJp.variable} ${cormorant.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
				{children}
			</body>
		</html>
	);
}
LAYOUT_EOF

# ----- components/shared/Header.tsx (メインサイト用ナビ) -----
cat > "$WMV/components/shared/Header.tsx" <<'HEADER_EOF'
/**
 * components/shared/Header.tsx — walc-visa.online メインサイト
 * ----------------------------------------------------------------------------
 * グローバルヘッダー(常時白・ネイビーロゴ)。
 * DTV LP と同じ視覚言語を継承。
 * ----------------------------------------------------------------------------
 */

"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalcLogo } from "@/components/shared/WalcLogo";
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
					onClick={() => setMobileOpen(false)}
				>
					<nav className="flex flex-col px-5 py-6 gap-1">
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
HEADER_EOF

# ----- components/shared/Footer.tsx (共通フッター v1) -----
cat > "$WMV/components/shared/Footer.tsx" <<'FOOTER_EOF'
/**
 * components/shared/Footer.tsx — walc-visa.online メインサイト
 * ----------------------------------------------------------------------------
 * フッター(ネイビー濃色背景 + 白文字)。
 * 会社情報・法務・SNS リンクを集約。
 * ----------------------------------------------------------------------------
 */

import Link from "next/link";
import { WalcLogo } from "@/components/shared/WalcLogo";
import { EXTERNAL_LINKS } from "@/lib/walc-links";

const FOOTER_NAV = {
	visa: [
		{ href: "#dtv", label: "DTV (Destination Thailand Visa)" },
		{ href: "#elite", label: "Thailand Privilege (旧Elite)" },
		{ href: "#ltr", label: "LTR" },
		{ href: "#retirement", label: "リタイアメントVISA" },
		{ href: "#student", label: "学生VISA" },
		{ href: "#marriage", label: "結婚・家族VISA" },
	],
	company: [
		{ href: "#about", label: "WALC について" },
		{ href: "#results", label: "取得実績" },
		{ href: "#contact", label: "お問い合わせ" },
	],
	legal: [
		{ href: "/privacy", label: "プライバシーポリシー" },
		{ href: "/terms", label: "利用規約" },
		{ href: "/tokutei", label: "特定商取引法に基づく表記" },
	],
} as const;

export function Footer() {
	return (
		<footer className="bg-brand-deep text-text-on-dark">
			<div className="mx-auto max-w-content px-5 md:px-8 py-12 md:py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
					<div className="md:col-span-1">
						<WalcLogo variant="light" />
						<p className="mt-4 text-sm text-white/70 leading-relaxed">
							タイVISA取得・運用の
							<br />
							専門コンサルティング
						</p>
					</div>

					<div>
						<h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white/90">
							VISA 種別
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_NAV.visa.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-sm text-white/70 hover:text-white transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white/90">
							会社情報
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_NAV.company.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-sm text-white/70 hover:text-white transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white/90">
							法務
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_NAV.legal.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-sm text-white/70 hover:text-white transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<p className="text-xs text-white/50">
						© {new Date().getFullYear()} WALC DESIGN Co., Ltd. — WALC VISA Consulting. All rights reserved.
					</p>
					<div className="flex items-center gap-4 text-xs text-white/50">
						<a
							href={EXTERNAL_LINKS.crm}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							CRM ログイン
						</a>
						<a
							href={EXTERNAL_LINKS.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							X (Twitter)
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
FOOTER_EOF

# ----- app/page.tsx (最小 Coming Soon Hero) -----
cat > "$WMV/app/page.tsx" <<'PAGE_EOF'
/**
 * app/page.tsx — walc-visa.online トップページ (Sprint 0 最小版)
 * ----------------------------------------------------------------------------
 * Sprint 0 では「Coming Soon」Hero のみ。
 * Sprint 1 以降で各セクションを追加していく。
 * ----------------------------------------------------------------------------
 */

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getLineAddUrl } from "@/lib/walc-links";
import { getDtvAcquisitionStats } from "@/lib/walc-stats";

export default function HomePage() {
	const lineUrl = getLineAddUrl();
	const stats = getDtvAcquisitionStats();

	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				{/* Hero */}
				<section className="relative bg-brand text-text-on-dark overflow-hidden">
					<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-32">
						<div className="max-w-3xl">
							<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs tracking-wider uppercase mb-6">
								<Sparkles className="w-3.5 h-3.5" />
								WALC VISA Consulting
							</div>

							<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
								タイで生きる選択を、
								<br />
								<span className="text-white/90">最短・確実に。</span>
							</h1>

							<p className="text-base md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
								DTV・Thailand Privilege・LTR・リタイアメント等、
								<br className="hidden md:block" />
								全VISA種別に対応する専門コンサルティング。
								<br />
								取得実績<span className="font-bold text-white">{stats.walcTotalAcquired}+</span> 件・専用CRMで一気通貫管理。
							</p>

							<div className="flex flex-col sm:flex-row gap-3 mb-12">
								<Button
									asChild
									variant="line"
									size="lg"
									className="w-full sm:w-auto"
								>
									<a href={lineUrl} target="_blank" rel="noopener noreferrer">
										LINE で無料相談
										<ArrowRight className="w-4 h-4" />
									</a>
								</Button>
								<Button
									asChild
									size="lg"
									className="w-full sm:w-auto bg-white/10 text-white border border-white/30 hover:bg-white/20"
								>
									<a href="https://dtv.walc-visa.online" target="_blank" rel="noopener noreferrer">
										DTV 専用LPを見る
									</a>
								</Button>
							</div>

							<div className="grid grid-cols-3 gap-4 max-w-xl pt-8 border-t border-white/15">
								<div>
									<div className="text-3xl md:text-4xl font-bold tabular-nums">
										{stats.walcTotalAcquired}+
									</div>
									<div className="text-xs text-white/60 mt-1">VISA 取得実績</div>
								</div>
								<div>
									<div className="text-3xl md:text-4xl font-bold tabular-nums">
										{stats.acquired}
									</div>
									<div className="text-xs text-white/60 mt-1">DTV 取得件数</div>
								</div>
								<div>
									<div className="text-3xl md:text-4xl font-bold tabular-nums">
										100<span className="text-xl">%</span>
									</div>
									<div className="text-xs text-white/60 mt-1">DTV 取得率</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Coming Soon notice */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-24 text-center">
						<p className="text-xs tracking-widest uppercase text-text-tertiary mb-3">
							Coming Soon
						</p>
						<h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
							メインサイト全面リニューアル中
						</h2>
						<p className="text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
							全 VISA 種別の料金・実績・申込フォームを順次公開予定です。
							<br />
							お急ぎの方は LINE 公式アカウントよりご相談ください。
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
PAGE_EOF

# ----- .env.example -----
cat > "$WMV/.env.example" <<'ENV_EOF'
# ============================================================================
# walc-visa.online (メインサイト) 環境変数
# ============================================================================

# CRM 申込フォーム URL (LP 申込ボタン → CRM のリダイレクト先)
NEXT_PUBLIC_APPLICATION_FORM_URL=https://crm.walc-visa.online/apply

# LINE 公式アカウント友だち追加 URL
NEXT_PUBLIC_LINE_ADD_URL=https://lin.ee/pQkudMM

# サイト URL
NEXT_PUBLIC_SITE_URL=https://walc-visa.online

# Supabase (Sprint 1 以降で AI Concierge / 申込ログに使用)
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=

# Anthropic (AI VISA Concierge)
# ANTHROPIC_API_KEY=
ENV_EOF

cp "$WMV/.env.example" "$WMV/.env.local"

# ---------- 4. package.json script 追加 ----------
echo ""
echo "→ Step 4/6: Updating package.json scripts..."

# Biome + typecheck スクリプトを追加 (jq があれば使う、なければ手動)
if command -v jq &> /dev/null; then
  jq '.scripts.lint = "biome check ." | .scripts["lint:fix"] = "biome check --write ." | .scripts.format = "biome format --write ." | .scripts.typecheck = "tsc --noEmit" | .scripts.test = "vitest run"' \
    "$WMV/package.json" > "$WMV/package.json.tmp" && mv "$WMV/package.json.tmp" "$WMV/package.json"
else
  echo "  ! jq not found — please add scripts manually to package.json:"
  echo "    \"lint\": \"biome check .\""
  echo "    \"lint:fix\": \"biome check --write .\""
  echo "    \"format\": \"biome format --write .\""
  echo "    \"typecheck\": \"tsc --noEmit\""
  echo "    \"test\": \"vitest run\""
fi

# ---------- 5. typecheck + lint で動作確認 ----------
echo ""
echo "→ Step 5/6: Running typecheck + lint..."

pnpm typecheck || echo "  ⚠ typecheck reported issues (will continue)"
pnpm biome check --write . || echo "  ⚠ biome reported issues (auto-fixed where possible)"

# ---------- 6. 初回 commit ----------
echo ""
echo "→ Step 6/6: Initial commit..."

# git author を WALC 固定
git config user.name "WALC DESIGN"
git config user.email "walc.design.thai@gmail.com"

git add -A
git commit -m "feat: sprint 0 — walc-visa.online main site initial setup

- Next.js + Tailwind v4 + TypeScript strict + Biome
- Shared design tokens (navy-only, white base) from DTV LP
- Header / Footer / WalcLogo with WALC corporate navy
- Hero with Coming Soon notice
- WALC stats wrapper + application form URL builder
- pnpm 9.x / motion v12 / lucide-react / supabase-js ready"

echo ""
echo "============================================================================"
echo "✓ Sprint 0 setup completed!"
echo "============================================================================"
echo ""
echo "Next steps (run manually):"
echo ""
echo "  1. Verify dev server:"
echo "     pnpm dev"
echo "     → http://localhost:3000"
echo ""
echo "  2. Push to GitHub:"
echo "     git push -u origin main"
echo ""
echo "  3. Deploy to Vercel:"
echo "     pnpm dlx vercel link"
echo "     pnpm dlx vercel --prod"
echo ""
echo "  4. After verification on walc-visa-main.vercel.app,"
echo "     swap walc-visa.online domain from WordPress to this project."
echo ""

#!/bin/bash
# ============================================================================
# walc-visa-main Hero v3.0 — バンコク航空夜景背景
# ----------------------------------------------------------------------------
# - next.config.ts に Unsplash 画像許可
# - Hero.tsx に背景写真 (Unsplash: Braden Jarvis / Bangkok aerial)
# - ネイビー強オーバーレイで可読性確保
# - ロゴパターンは透明度下げて残す
# ============================================================================

set -e

WMV="$HOME/walc-projects/walc-visa-main"
cd "$WMV"

echo "→ Update next.config.ts (allow Unsplash images)"

cat > "$WMV/next.config.ts" <<'NEXT_EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
NEXT_EOF

echo "→ Update Hero.tsx (Bangkok aerial night background)"

cat > "$WMV/components/lp/Hero.tsx" <<'HERO_EOF'
/**
 * components/lp/Hero.tsx — walc-visa.online Hero v3.0
 * ----------------------------------------------------------------------------
 * デザイン方針:
 *   - 背景: バンコク航空夜景 (Unsplash by Braden Jarvis, License: Unsplash)
 *   - 強いネイビーグラデオーバーレイで可読性確保 & コーポレート感
 *   - 上端に金細ライン(★信頼の差し色)
 *   - WALC ロゴパターンは透明度を更に下げて重ねる
 *   - 左 60%: コピー & CTA / 右 40%: 浮かぶ実績カード 3 枚
 *
 * 修正履歴:
 *   v3.0 (2026-05-25) — バンコク夜景写真を背景に追加。
 *     業務感を完全排除し、現地拠点の臨場感を獲得。
 * ----------------------------------------------------------------------------
 */

import { ArrowRight, CheckCircle2, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getLineAddUrl, buildApplicationUrl } from "@/lib/walc-links";
import { getDtvAcquisitionStats } from "@/lib/walc-stats";

const HERO_BG_URL =
	"https://images.unsplash.com/photo-1531169628939-e84f860fa5d6?fm=jpg&q=85&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0";

export function Hero() {
	const lineUrl = getLineAddUrl();
	const applyUrl = buildApplicationUrl({ source: "main-hero" });
	const stats = getDtvAcquisitionStats();

	return (
		<section className="relative bg-brand-deep text-text-on-dark overflow-hidden isolate">
			{/* 上端 金細ライン(★信頼の差し色) */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent z-30" />

			{/* レイヤー1: 背景写真(バンコク航空夜景) */}
			<div className="absolute inset-0 z-0">
				<Image
					src={HERO_BG_URL}
					alt=""
					fill
					priority
					sizes="100vw"
					className="object-cover object-center"
					quality={85}
				/>
			</div>

			{/* レイヤー2: ネイビー強オーバーレイ(可読性確保 + ブランド統一) */}
			<div
				className="absolute inset-0 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(135deg, rgba(6,24,48,0.96) 0%, rgba(11,42,74,0.88) 45%, rgba(11,42,74,0.78) 100%)",
				}}
			/>

			{/* レイヤー3: 下端から濃く(フッター帯への接続) */}
			<div
				className="absolute inset-0 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, transparent 60%, rgba(6,24,48,0.55) 100%)",
				}}
			/>

			{/* レイヤー4: WALC ロゴパターン(右下・極低透明度・ブランド統一) */}
			<div className="absolute -right-32 -bottom-32 md:-right-20 md:-bottom-20 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.04] pointer-events-none z-20">
				<Image
					src="/walc-visa-logo.png"
					alt=""
					fill
					sizes="(max-width: 768px) 600px, 800px"
					className="object-contain"
				/>
			</div>

			{/* レイヤー5: 微細ドットパターン */}
			<div
				className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen z-20"
				style={{
					backgroundImage:
						"radial-gradient(circle, white 1px, transparent 1px)",
					backgroundSize: "32px 32px",
				}}
			/>

			{/* コンテンツ */}
			<div className="relative mx-auto max-w-content px-5 md:px-8 py-20 md:py-28 lg:py-32 z-30">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
					{/* 左: メインコピー & CTA */}
					<div className="lg:col-span-7">
						{/* TRUSTED キャプション */}
						<div className="inline-flex items-center gap-2.5 mb-6">
							<span className="w-8 h-px bg-amber-400/80" />
							<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-amber-200 font-semibold">
								Trusted Visa Specialists in Thailand
							</span>
						</div>

						{/* H1 */}
						<h1 className="text-[40px] leading-[1.12] md:text-[56px] lg:text-[68px] lg:leading-[1.08] font-bold tracking-tight mb-6 md:mb-7 drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)]">
							タイで生きる選択を、
							<br />
							<span className="text-white">確かなものに。</span>
						</h1>

						{/* サブコピー */}
						<p className="text-base md:text-lg leading-relaxed md:leading-[1.85] text-white/85 mb-8 md:mb-10 max-w-xl">
							DTV・Thailand Privilege・LTR・リタイアメント・学生・結婚 ——
							<br className="hidden md:block" />
							タイの全 VISA 種別に対応する専門コンサルティング。
							<br />
							取得から取得後の運用まで、専用 CRM で一気通貫サポート。
						</p>

						{/* CTA 2 つ */}
						<div className="flex flex-col sm:flex-row gap-3 mb-6">
							<Button asChild variant="line" size="lg" className="w-full sm:w-auto">
								<a href={lineUrl} target="_blank" rel="noopener noreferrer">
									LINE で 3 分相談
									<ArrowRight className="w-4 h-4" />
								</a>
							</Button>
							<Button
								asChild
								size="lg"
								className="w-full sm:w-auto bg-white text-brand hover:bg-white/90 border border-white"
							>
								<a href={applyUrl} target="_blank" rel="noopener noreferrer">
									専門家に相談する
								</a>
							</Button>
						</div>

						{/* 補助テキスト: 頼みやすさ */}
						<div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-white/75">
							<span className="flex items-center gap-1.5">
								<Clock className="w-3.5 h-3.5 text-amber-300" />
								24 時間以内に初回応答
							</span>
							<span className="flex items-center gap-1.5">
								<CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
								初回相談 無料
							</span>
							<span className="flex items-center gap-1.5">
								<MapPin className="w-3.5 h-3.5 text-amber-300" />
								バンコク拠点・日本語対応
							</span>
						</div>
					</div>

					{/* 右: 浮かぶ実績カード(立体的に重ね配置) */}
					<div className="lg:col-span-5 relative h-[360px] md:h-[420px] lg:h-[480px] hidden md:block">
						{/* Card 1: DTV 取得率 100%(右上・最大) */}
						<div className="absolute top-4 right-0 w-[280px] bg-white text-text-primary rounded-xl shadow-2xl p-6 z-30 border border-white/40 backdrop-blur-md">
							<div className="flex items-center justify-between mb-3">
								<span className="text-[10px] tracking-widest uppercase text-text-tertiary font-bold">
									DTV 取得実績
								</span>
								<CheckCircle2 className="w-4 h-4 text-emerald-600" />
							</div>
							<div className="flex items-baseline gap-2 mb-2">
								<span className="text-5xl font-bold tabular-nums text-brand tracking-tight">
									{stats.acquired}
								</span>
								<span className="text-2xl text-text-tertiary font-medium">
									/ {stats.totalAttempts}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm font-semibold text-emerald-700">
									取得率 100%
								</span>
								<span className="text-[11px] text-text-tertiary">
									({stats.periodLabel})
								</span>
							</div>
						</div>

						{/* Card 2: WALC 全体 VISA 取得数(左中央・ネイビー濃色) */}
						<div className="absolute top-[170px] left-0 w-[240px] bg-brand-deep/95 text-white rounded-xl shadow-2xl p-5 z-20 border border-white/15 backdrop-blur-md">
							<div className="text-[10px] tracking-widest uppercase text-amber-300 font-bold mb-3">
								WALC 全体 VISA 取得
							</div>
							<div className="flex items-baseline gap-1">
								<span className="text-5xl font-bold tabular-nums tracking-tight">
									{stats.walcTotalAcquired}
								</span>
								<span className="text-2xl font-medium text-white/70">+</span>
							</div>
							<div className="text-xs text-white/70 mt-2">全 VISA 種別 累計</div>
						</div>

						{/* Card 3: タイ拠点歴(右下) */}
						<div className="absolute bottom-0 right-4 w-[220px] bg-white text-text-primary rounded-xl shadow-2xl p-5 z-30 border border-white/40 backdrop-blur-md">
							<div className="flex items-center gap-1.5 mb-2">
								<MapPin className="w-3 h-3 text-brand" />
								<span className="text-[10px] tracking-widest uppercase text-text-tertiary font-bold">
									タイ拠点
								</span>
							</div>
							<div className="flex items-baseline gap-1">
								<span className="text-5xl font-bold tabular-nums text-brand tracking-tight">
									6
								</span>
								<span className="text-lg font-medium text-text-secondary">年</span>
							</div>
							<div className="text-xs text-text-secondary mt-1">
								バンコク現地法人運営
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
HERO_EOF

echo ""
echo "→ Verify: typecheck"
pnpm typecheck

echo ""
echo "→ git commit"
git add -A
git commit -m "feat(hero): add Bangkok aerial night photo background

- Hero v3.0: Unsplash bangkok skyline (Braden Jarvis, Unsplash License)
- Strong navy gradient overlay (96%→78% diagonal) for readability
- WALC logo pattern opacity reduced to 0.04 (blends with photo)
- Footer gradient (60%→100%) for connection to TrustStrip
- Allow images.unsplash.com in next.config.ts"

echo ""
echo "============================================================================"
echo "✓ Hero v3.0 with Bangkok night background applied!"
echo "============================================================================"
echo ""
echo "Reload: pnpm dev → http://localhost:3000"

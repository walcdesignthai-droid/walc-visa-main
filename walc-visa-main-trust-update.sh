#!/bin/bash
# ============================================================================
# walc-visa-main: 信頼セクション強化 + コピー差替
# ----------------------------------------------------------------------------
# 1. Hero キャッチコピー差替: 「タイに住みたい、その思いを形にする。」
# 2. Founder 代表者名修正: 洋介 → 陽介
# 3. CompanyProof セクション新規追加(タイ商務省登記情報 + 登記簿画像)
# 4. 登記簿 PDF 画像を public/ に配置
# ============================================================================

set -e

WMV="$HOME/walc-projects/walc-visa-main"
DTV="$HOME/walc-projects/dtv-walc-visa"
cd "$WMV"

# ============================================================================
# 0. 登記簿画像を public/ にコピー
# ============================================================================
echo "→ Copy walc-affidavit-p1.png to public/"
cp "$DTV/walc-affidavit-p1.png" "$WMV/public/walc-affidavit-p1.png"

# ============================================================================
# 1. Hero キャッチコピー差替
# ============================================================================
echo "→ Update Hero.tsx (new copy)"

cat > "$WMV/components/lp/Hero.tsx" <<'HERO_EOF'
/**
 * components/lp/Hero.tsx — walc-visa.online Hero v3.1
 * ----------------------------------------------------------------------------
 * 修正履歴:
 *   v3.1 (2026-05-25) — キャッチコピー差替(訴求力強化)。
 *     「タイで生きる選択を、確かなものに。」→「タイに住みたい、その思いを形にする。」
 *     ユーザー自身が決定。情緒 × 具体性のバランス最良。
 *   v3.0 (2026-05-25) — バンコク夜景写真を背景に追加。
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
			{/* 上端 金細ライン */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent z-30" />

			{/* 背景写真 */}
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

			{/* ネイビー強オーバーレイ */}
			<div
				className="absolute inset-0 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(135deg, rgba(6,24,48,0.96) 0%, rgba(11,42,74,0.88) 45%, rgba(11,42,74,0.78) 100%)",
				}}
			/>
			<div
				className="absolute inset-0 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(to bottom, transparent 60%, rgba(6,24,48,0.55) 100%)",
				}}
			/>

			{/* WALC ロゴパターン */}
			<div className="absolute -right-32 -bottom-32 md:-right-20 md:-bottom-20 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.04] pointer-events-none z-20">
				<Image
					src="/walc-visa-logo.png"
					alt=""
					fill
					sizes="(max-width: 768px) 600px, 800px"
					className="object-contain"
				/>
			</div>

			{/* ドットパターン */}
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
					{/* 左 */}
					<div className="lg:col-span-7">
						<div className="inline-flex items-center gap-2.5 mb-6">
							<span className="w-8 h-px bg-amber-400/80" />
							<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-amber-200 font-semibold">
								Trusted Visa Specialists in Thailand
							</span>
						</div>

						{/* 新キャッチコピー */}
						<h1 className="text-[40px] leading-[1.12] md:text-[56px] lg:text-[68px] lg:leading-[1.08] font-bold tracking-tight mb-6 md:mb-7 drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)]">
							タイに住みたい、
							<br />
							<span className="text-white">その思いを形にする。</span>
						</h1>

						<p className="text-base md:text-lg leading-relaxed md:leading-[1.85] text-white/85 mb-8 md:mb-10 max-w-xl">
							DTV・Thailand Privilege・LTR・リタイアメント・学生・結婚 ——
							<br className="hidden md:block" />
							タイの全 VISA 種別に対応する専門コンサルティング。
							<br />
							取得から取得後の運用まで、専用 CRM で一気通貫サポート。
						</p>

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
								バンコク法人・日本語対応
							</span>
						</div>
					</div>

					{/* 右: 浮かぶ実績カード */}
					<div className="lg:col-span-5 relative h-[360px] md:h-[420px] lg:h-[480px] hidden md:block">
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

						<div className="absolute bottom-0 right-4 w-[220px] bg-white text-text-primary rounded-xl shadow-2xl p-5 z-30 border border-white/40 backdrop-blur-md">
							<div className="flex items-center gap-1.5 mb-2">
								<MapPin className="w-3 h-3 text-brand" />
								<span className="text-[10px] tracking-widest uppercase text-text-tertiary font-bold">
									タイ法人運営
								</span>
							</div>
							<div className="flex items-baseline gap-1">
								<span className="text-5xl font-bold tabular-nums text-brand tracking-tight">
									6
								</span>
								<span className="text-lg font-medium text-text-secondary">年</span>
							</div>
							<div className="text-xs text-text-secondary mt-1">
								バンコク現地法人
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
HERO_EOF

# ============================================================================
# 2. Founder 代表者名修正
# ============================================================================
echo "→ Update Founder.tsx (洋介 → 陽介)"

cat > "$WMV/components/lp/Founder.tsx" <<'FOUNDER_EOF'
/**
 * components/lp/Founder.tsx — 代表者メッセージ
 * ----------------------------------------------------------------------------
 * 修正履歴:
 *   v1.1 (2026-05-25) — 漢字修正: 洋介 → 陽介
 * ----------------------------------------------------------------------------
 */

import { Quote } from "lucide-react";

export function Founder() {
	return (
		<section id="founder" className="bg-brand text-white relative overflow-hidden">
			<div className="absolute -bottom-20 -right-20 opacity-[0.04] pointer-events-none">
				<Quote className="w-[500px] h-[500px]" strokeWidth={0.5} />
			</div>

			<div className="relative mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
					<div className="lg:col-span-4">
						<div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
							<span className="text-5xl md:text-6xl font-bold text-white/70 tracking-tight">
								YO
							</span>
						</div>

						<div className="space-y-1">
							<p className="text-[11px] tracking-[0.22em] uppercase text-amber-300 font-semibold">
								Founder & CEO
							</p>
							<h3 className="text-2xl md:text-3xl font-bold tracking-tight">
								小野寺 陽介
							</h3>
							<p className="text-sm text-white/70">Yosuke Onodera</p>
						</div>

						<p className="text-xs text-white/55 mt-5 leading-relaxed">
							WALC Design Co., Ltd. 代表取締役
							<br />
							WALC VISA Consulting 統括
							<br />
							バンコク在住 6 年
						</p>
					</div>

					<div className="lg:col-span-8">
						<div className="inline-flex items-center gap-2.5 mb-5">
							<span className="w-8 h-px bg-amber-400/70" />
							<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-amber-200 font-semibold">
								Message from Founder
							</span>
						</div>

						<blockquote className="space-y-5 text-base md:text-lg leading-relaxed md:leading-[1.95] text-white/90">
							<p className="text-xl md:text-2xl font-bold text-white leading-snug">
								「タイに住みたい、その思いを、確かな現実に。」
							</p>
							<p>
								タイは、リモートワーカー・退職後の方・起業家・ご家族にとって、
								今もっとも現実的で魅力的な長期滞在先のひとつです。
								一方で、VISA・税務・銀行口座など、制度面の複雑さで一歩踏み出せない方も少なくありません。
							</p>
							<p>
								WALC VISA Consulting は、その「複雑さ」を私たちが代わりに引き受け、
								お客様には「タイで何をするか」だけに集中していただけるよう設計しました。
								取得率 100% の実績、専用 CRM での一気通貫管理、バンコク現地法人 6 年の経験——
								すべては、お客様の思いを確かな形にするためにあります。
							</p>
							<p className="text-amber-200/90 text-sm md:text-base font-semibold">
								まずは LINE で 3 分、お話を聞かせてください。
							</p>
						</blockquote>
					</div>
				</div>
			</div>
		</section>
	);
}
FOUNDER_EOF

# ============================================================================
# 3. CompanyProof.tsx (新規・登記情報セクション)
# ============================================================================
echo "→ Generate CompanyProof.tsx (Thai legal entity proof)"

cat > "$WMV/components/lp/CompanyProof.tsx" <<'PROOF_EOF'
/**
 * components/lp/CompanyProof.tsx — タイ法人実在証明セクション
 * ----------------------------------------------------------------------------
 * タイ商務省事業開発局(DBD)登記の正規法人として 6 年運営の証拠を提示。
 *
 * 設計方針:
 *   - 左: 登記情報テーブル(法人名・登記番号・設立・資本金・登記住所)
 *   - 右: 登記簿 PDF 1 ページ目のサムネイル + 拡大可能リンク
 *   - フッターに DBD ロゴ風キャプション + 「タイ商務省登記」明示
 *   - ※「来社可能オフィス」とは別物。登記住所はあくまで法人登録上の住所。
 * ----------------------------------------------------------------------------
 */

import { Building2, ExternalLink, FileCheck2, ShieldCheck } from "lucide-react";
import Image from "next/image";

const REGISTRY = [
	{ label: "法人名 (英)", value: "WALC Design Co., Ltd." },
	{
		label: "法人名 (タイ)",
		value: "บริษัท ดับเบิลยู เอ แอล ซี ดีไซน์ จำกัด",
	},
	{ label: "登記番号", value: "0105564127471" },
	{ label: "設立", value: "2021 年 8 月 27 日" },
	{ label: "資本金", value: "5,000,000 THB(500 万バーツ)" },
	{
		label: "登記住所",
		value:
			"591 Sukhumvit Road, Samutchavanich 2 Building 20F, Khlong Tan Nuea, Watthana, Bangkok",
	},
	{ label: "発行元", value: "タイ商務省 事業開発局 (DBD)" },
	{ label: "発行日", value: "2025 年 11 月 17 日" },
] as const;

export function CompanyProof() {
	return (
		<section id="company-proof" className="bg-bg-secondary border-y border-border-subtle">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-3xl mb-12 md:mb-16">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							Registered Legal Entity
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4 leading-tight">
						タイ商務省登記の正規法人として、
						<br className="hidden md:block" />
						バンコクで 6 年。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						WALC VISA Consulting は、タイ商務省事業開発局(DBD)に登記された
						タイ法人「WALC Design Co., Ltd.」によって運営されています。
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
					{/* 左: 登記情報テーブル */}
					<div className="lg:col-span-7">
						<div className="bg-white rounded-xl border border-border-subtle p-6 md:p-8 shadow-sm">
							<div className="flex items-center gap-3 mb-6 pb-5 border-b border-border-subtle">
								<div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center">
									<Building2 className="w-5 h-5 text-brand" strokeWidth={1.8} />
								</div>
								<div>
									<p className="text-[10px] tracking-[0.22em] uppercase text-text-tertiary font-bold">
										Company Registry
									</p>
									<h3 className="text-lg font-bold text-text-primary">
										登記情報(タイ商務省データベース準拠)
									</h3>
								</div>
							</div>

							<dl className="divide-y divide-border-subtle">
								{REGISTRY.map(({ label, value }) => (
									<div
										key={label}
										className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 py-3.5"
									>
										<dt className="text-xs md:text-sm font-semibold text-text-secondary tracking-wide">
											{label}
										</dt>
										<dd className="md:col-span-2 text-sm md:text-[15px] text-text-primary font-medium leading-relaxed">
											{value}
										</dd>
									</div>
								))}
							</dl>

							{/* 認証バッジ */}
							<div className="mt-6 pt-5 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
								<div className="flex items-center gap-2.5">
									<ShieldCheck className="w-5 h-5 text-emerald-600" />
									<span className="text-xs md:text-sm font-semibold text-emerald-700">
										DBD 認証済(QR コード検証可能)
									</span>
								</div>
								<a
									href="https://www.dbd.go.th"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-accent-blue hover:text-accent-blue-bright transition-colors"
								>
									タイ商務省事業開発局
									<ExternalLink className="w-3.5 h-3.5" />
								</a>
							</div>
						</div>
					</div>

					{/* 右: 登記簿サムネイル */}
					<div className="lg:col-span-5">
						<a
							href="/walc-affidavit-p1.png"
							target="_blank"
							rel="noopener noreferrer"
							className="group block bg-white rounded-xl border border-border-subtle p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
						>
							<div className="flex items-center gap-2 mb-3 px-1">
								<FileCheck2 className="w-4 h-4 text-brand" />
								<span className="text-[11px] tracking-widest uppercase text-text-tertiary font-bold">
									登記簿 (หนังสือรับรอง)
								</span>
								<span className="ml-auto text-[11px] text-text-tertiary group-hover:text-accent-blue transition-colors">
									拡大 →
								</span>
							</div>

							{/* 画像本体 */}
							<div className="relative w-full aspect-[1/1.414] bg-bg-elevated rounded-lg overflow-hidden border border-border-subtle">
								<Image
									src="/walc-affidavit-p1.png"
									alt="WALC Design Co., Ltd. 登記簿(タイ商務省発行)"
									fill
									sizes="(max-width: 1024px) 100vw, 40vw"
									className="object-contain"
								/>
							</div>

							<p className="mt-3 px-1 text-[11px] text-text-tertiary leading-relaxed">
								Ref: E10091221025789 / タイ商務省事業開発局
								<br />
								発行日: 2025 年 11 月 17 日
							</p>
						</a>
					</div>
				</div>

				{/* 補足: 来訪不可の明示 */}
				<p className="mt-10 text-xs text-text-tertiary leading-relaxed text-center max-w-2xl mx-auto">
					※ 登記住所は法人登録上の住所であり、来訪受付窓口ではありません。
					お問い合わせは LINE 公式アカウントもしくは申込フォームよりお願いいたします。
				</p>
			</div>
		</section>
	);
}
PROOF_EOF

# ============================================================================
# 4. app/page.tsx 更新(CompanyProof を Founder の前に追加)
# ============================================================================
echo "→ Update app/page.tsx (insert CompanyProof)"

cat > "$WMV/app/page.tsx" <<'PAGE_EOF'
/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.3 (2026-05-25) — 信頼セクション強化:
 *   - Hero キャッチコピー差替
 *   - Founder 名修正(洋介→陽介)
 *   - CompanyProof(タイ法人実在証明)を WhyWalc と Process の間に挿入
 * ----------------------------------------------------------------------------
 */

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { CompanyProof } from "@/components/lp/CompanyProof";
import { FinalCta } from "@/components/lp/FinalCta";
import { Founder } from "@/components/lp/Founder";
import { Hero } from "@/components/lp/Hero";
import { Process } from "@/components/lp/Process";
import { TrustStrip } from "@/components/lp/TrustStrip";
import { VisaTypes } from "@/components/lp/VisaTypes";
import { WhyWalc } from "@/components/lp/WhyWalc";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				<Hero />
				<TrustStrip />
				<VisaTypes />
				<WhyWalc />
				<CompanyProof />
				<Process />
				<Founder />
				<FinalCta />
			</main>
			<Footer />
		</>
	);
}
PAGE_EOF

# ============================================================================
# 5. 検証
# ============================================================================
echo ""
echo "→ Verify: typecheck"
pnpm typecheck

# ============================================================================
# 6. commit
# ============================================================================
echo ""
echo "→ git commit"
git add -A
git commit -m "feat(trust): catchcopy + name fix + company registry section

- Hero copy: タイで生きる選択を、確かなものに → タイに住みたい、その思いを形にする (user decided)
- Founder: 小野寺洋介 → 小野寺陽介 (kanji fix)
- New CompanyProof section with DBD registry info:
  * Entity: WALC Design Co., Ltd. (English) / บริษัท ดับเบิลยู เอ แอล ซี ดีไซน์ จำกัด (Thai)
  * Registration: 0105564127471 (Thai Ministry of Commerce)
  * Established: 2021-08-27, Capital: 5,000,000 THB
  * Embed affidavit PDF page 1 as image
  * Note: registered address ≠ visitor reception (per user constraint)
- Updated trust strip & hero side card: 現地拠点 → 現地法人 wording"

echo ""
echo "============================================================================"
echo "✓ Trust update applied!"
echo "============================================================================"
echo ""
echo "リロード: ブラウザ http://localhost:3000 を Cmd+R"
echo ""
echo "変更点:"
echo "  ✓ Hero キャッチコピー → タイに住みたい、その思いを形にする。"
echo "  ✓ Founder → 小野寺 陽介"
echo "  ✓ 新セクション「タイ商務省登記の正規法人として、バンコクで 6 年。」"
echo "    - 登記情報 8 項目"
echo "    - 登記簿サムネイル(クリックで拡大)"
echo "    - 来訪不可の明示"

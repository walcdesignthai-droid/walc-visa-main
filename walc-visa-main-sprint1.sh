#!/bin/bash
# ============================================================================
# walc-visa-main Sprint 1 — メインサイト本体セクション 5 件追加
# ----------------------------------------------------------------------------
# - VisaTypes (6 種別カード)
# - WhyWalc (選ばれる 3 つの理由)
# - Process (取得プロセス 4 ステップ)
# - Founder (代表者メッセージ)
# - FinalCta (最終 CTA 帯)
# - app/page.tsx 更新 (全セクション組込)
# ============================================================================

set -e

WMV="$HOME/walc-projects/walc-visa-main"
cd "$WMV"

mkdir -p "$WMV/components/lp"

# ============================================================================
# 1. VisaTypes.tsx — VISA 6 種別カード
# ============================================================================
echo "→ Generate VisaTypes.tsx"

cat > "$WMV/components/lp/VisaTypes.tsx" <<'VISA_EOF'
/**
 * components/lp/VisaTypes.tsx — VISA 6 種別カード一覧
 * ----------------------------------------------------------------------------
 * タイの主要 VISA 6 種別を視覚的に一覧化。
 * 第一推奨は DTV(WALC 営業方針準拠)。
 *
 * 設計方針:
 *   - 各カードに アイコン / 名称 / サブ / 説明 / 起点価格 / 推奨バッジ
 *   - DTV のみ「★ 第一推奨」バッジ + ネイビー枠強調
 *   - LINE 相談へリンク統一(Sprint 2 で各 VISA 詳細ページへ差替)
 * ----------------------------------------------------------------------------
 */

import {
	ArrowUpRight,
	Award,
	BookOpen,
	Briefcase,
	Heart,
	Palmtree,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface VisaCard {
	id: string;
	Icon: typeof Briefcase;
	title: string;
	subtitle: string;
	description: string;
	priceFrom?: string;
	priceNote?: string;
	badge?: string;
	highlight?: boolean;
}

const VISAS: VisaCard[] = [
	{
		id: "dtv",
		Icon: Briefcase,
		title: "DTV",
		subtitle: "Destination Thailand Visa",
		description:
			"5 年マルチプル・1 回 180 日滞在。リモートワーカー・ソフトパワー領域向け。コストパフォーマンス最高クラス。",
		priceFrom: "60,000 THB〜",
		priceNote: "政府費 10,000 THB 込",
		badge: "★ 第一推奨",
		highlight: true,
	},
	{
		id: "elite",
		Icon: Award,
		title: "Thailand Privilege",
		subtitle: "旧 Thailand Elite",
		description:
			"5〜20 年の長期滞在権 + 空港 VIP・特典サービス。富裕層・長期居住者向け。",
		priceFrom: "900,000 THB〜",
		priceNote: "Gold / Platinum / Diamond / Reserve",
	},
	{
		id: "ltr",
		Icon: TrendingUp,
		title: "LTR",
		subtitle: "Long-Term Resident Visa",
		description:
			"10 年滞在権・税優遇付き。年収 80,000 USD 以上の専門人材・投資家・年金生活者向け。",
		priceFrom: "50,000 THB",
		priceNote: "政府費(WALC サポート別)",
	},
	{
		id: "retirement",
		Icon: Palmtree,
		title: "リタイアメント VISA",
		subtitle: "Non-O / Non-O-A (50 歳以上)",
		description:
			"50 歳以上対象の退職者向け。預金 800,000 THB or 月年金 65,000 THB が要件。",
		priceFrom: "150,000 THB〜",
		priceNote: "1 年更新型・継続可能",
	},
	{
		id: "student",
		Icon: BookOpen,
		title: "学生 VISA",
		subtitle: "Non-ED",
		description:
			"タイ語・英語学校、大学・大学院への留学向け。学校登録が前提。",
		priceFrom: "120,000 THB〜",
		priceNote: "学校 enroll 費別途",
	},
	{
		id: "family",
		Icon: Heart,
		title: "結婚・家族 VISA",
		subtitle: "Non-O (Marriage / Family)",
		description:
			"タイ人配偶者・タイ国籍の子・親の扶養を理由とする長期滞在 VISA。",
		priceFrom: "180,000 THB〜",
		priceNote: "1 年更新型",
	},
];

export function VisaTypes() {
	return (
		<section id="visa-types" className="bg-bg-primary">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-3xl mb-12 md:mb-16">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							All Visa Types
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
						タイの主要 VISA、すべてに対応。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						目的・滞在期間・予算に応じて、最適な VISA をご提案します。
						<br className="hidden md:block" />
						迷ったらまず DTV——コストパフォーマンスと自由度の両立で第一推奨です。
					</p>
				</div>

				{/* カードグリッド */}
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
					{VISAS.map((visa) => (
						<li key={visa.id}>
							<Link
								href={`#${visa.id}`}
								className={`group relative flex flex-col h-full p-6 md:p-7 rounded-xl border transition-all duration-300 ${
									visa.highlight
										? "bg-brand text-white border-brand hover:shadow-xl hover:-translate-y-1"
										: "bg-white border-border-subtle hover:border-brand/40 hover:shadow-lg hover:-translate-y-0.5"
								}`}
							>
								{/* バッジ */}
								{visa.badge && (
									<div className="absolute -top-2.5 left-6 px-2.5 py-1 rounded-full bg-amber-400 text-brand-deep text-[10px] font-bold tracking-wider uppercase shadow-md">
										{visa.badge}
									</div>
								)}

								{/* アイコン + 矢印 */}
								<div className="flex items-start justify-between mb-5">
									<div
										className={`w-12 h-12 rounded-lg flex items-center justify-center ${
											visa.highlight
												? "bg-white/10"
												: "bg-brand/5 group-hover:bg-brand/10"
										} transition-colors`}
									>
										<visa.Icon
											className={`w-5 h-5 ${
												visa.highlight ? "text-amber-300" : "text-brand"
											}`}
											strokeWidth={1.8}
										/>
									</div>
									<ArrowUpRight
										className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
											visa.highlight ? "text-white/60" : "text-text-tertiary"
										}`}
									/>
								</div>

								{/* タイトル */}
								<h3
									className={`text-2xl font-bold tracking-tight mb-1 ${
										visa.highlight ? "text-white" : "text-text-primary"
									}`}
								>
									{visa.title}
								</h3>
								<p
									className={`text-xs tracking-wide mb-4 ${
										visa.highlight ? "text-amber-200/90" : "text-text-tertiary"
									}`}
								>
									{visa.subtitle}
								</p>

								{/* 説明 */}
								<p
									className={`text-sm leading-relaxed flex-1 mb-5 ${
										visa.highlight ? "text-white/85" : "text-text-secondary"
									}`}
								>
									{visa.description}
								</p>

								{/* 価格 */}
								{visa.priceFrom && (
									<div
										className={`pt-4 border-t ${
											visa.highlight
												? "border-white/15"
												: "border-border-subtle"
										}`}
									>
										<div
											className={`text-lg font-bold tabular-nums ${
												visa.highlight ? "text-white" : "text-brand"
											}`}
										>
											{visa.priceFrom}
										</div>
										{visa.priceNote && (
											<div
												className={`text-[11px] mt-0.5 ${
													visa.highlight ? "text-white/60" : "text-text-tertiary"
												}`}
											>
												{visa.priceNote}
											</div>
										)}
									</div>
								)}
							</Link>
						</li>
					))}
				</ul>

				{/* 補助テキスト */}
				<p className="mt-10 text-sm text-text-tertiary text-center">
					※ 価格はすべて目安。最新の正確な見積もりは LINE 相談で即時お伝えします。
				</p>
			</div>
		</section>
	);
}
VISA_EOF

# ============================================================================
# 2. WhyWalc.tsx — 選ばれる 3 つの理由
# ============================================================================
echo "→ Generate WhyWalc.tsx"

cat > "$WMV/components/lp/WhyWalc.tsx" <<'WHY_EOF'
/**
 * components/lp/WhyWalc.tsx — WALC が選ばれる 3 つの理由
 * ----------------------------------------------------------------------------
 * 差別化ポイントを 3 つに圧縮:
 *   1. 取得率 100% の実績(212/212)
 *   2. 専用 CRM アプリで取得後も徹底管理
 *   3. バンコク現地法人 6 年運営
 * ----------------------------------------------------------------------------
 */

import { MapPin, Smartphone, Trophy } from "lucide-react";
import { getDtvAcquisitionStats } from "@/lib/walc-stats";

export function WhyWalc() {
	const stats = getDtvAcquisitionStats();

	const REASONS = [
		{
			Icon: Trophy,
			labelKey: "Track Record",
			title: "取得率 100% の実績",
			body: `DTV ${stats.acquired} / ${stats.totalAttempts} 件取得(${stats.periodLabel})、WALC 全体で ${stats.walcTotalAcquired}+ 件の VISA 取得実績。タイの全主要 VISA 種別に対応する経験量。`,
			metric: { value: "212 / 212", label: "DTV 取得 / 申請" },
		},
		{
			Icon: Smartphone,
			labelKey: "Dedicated CRM",
			title: "専用 CRM アプリで一気通貫管理",
			body: "申込み・書類管理・進捗確認・請求・更新通知すべてを WALC 専用アプリで完結。取得後も継続的に活用でき、90 日レポートや更新時期もアプリが知らせます。",
			metric: { value: "1 アプリ", label: "申込〜運用まで" },
		},
		{
			Icon: MapPin,
			labelKey: "Bangkok HQ",
			title: "バンコク現地法人 6 年運営",
			body: "現地ネットワーク・大使館 / 領事館との直接コミュニケーション・最新制度情報の一次取得。日本語スピーカー常駐で、現地でしか掴めない情報をリアルタイムにお届け。",
			metric: { value: "6 年", label: "現地法人運営" },
		},
	] as const;

	return (
		<section id="why-walc" className="bg-bg-secondary border-y border-border-subtle">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-3xl mb-12 md:mb-16">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							Why WALC
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
						WALC が選ばれる、3 つの理由。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						取得して終わりではなく、取得後の運用までを 1 社で完結する設計が私たちの強みです。
					</p>
				</div>

				{/* 理由 3 つ */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{REASONS.map((reason) => (
						<article
							key={reason.title}
							className="relative bg-white rounded-xl p-7 md:p-8 border border-border-subtle hover:border-brand/40 transition-all hover:shadow-lg"
						>
							{/* アイコン */}
							<div className="w-12 h-12 rounded-lg bg-brand/5 flex items-center justify-center mb-5">
								<reason.Icon className="w-5 h-5 text-brand" strokeWidth={1.8} />
							</div>

							{/* キー */}
							<p className="text-[10px] tracking-[0.2em] uppercase text-text-tertiary font-bold mb-2">
								{reason.labelKey}
							</p>

							{/* タイトル */}
							<h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight mb-4 leading-snug">
								{reason.title}
							</h3>

							{/* 本文 */}
							<p className="text-sm text-text-secondary leading-relaxed mb-6">
								{reason.body}
							</p>

							{/* メトリック */}
							<div className="pt-5 border-t border-border-subtle">
								<div className="text-2xl font-bold text-brand tabular-nums tracking-tight leading-none">
									{reason.metric.value}
								</div>
								<div className="text-xs text-text-tertiary mt-1.5">
									{reason.metric.label}
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
WHY_EOF

# ============================================================================
# 3. Process.tsx — 取得プロセス 4 ステップ
# ============================================================================
echo "→ Generate Process.tsx"

cat > "$WMV/components/lp/Process.tsx" <<'PROC_EOF'
/**
 * components/lp/Process.tsx — VISA 取得プロセス 4 ステップ
 * ----------------------------------------------------------------------------
 * 頼みやすさと透明性を担保するため、プロセスを 4 ステップで可視化。
 * ----------------------------------------------------------------------------
 */

import { FileText, MessageCircle, Send, ShieldCheck } from "lucide-react";

const STEPS = [
	{
		num: "01",
		Icon: MessageCircle,
		title: "LINE で 3 分相談",
		body: "目的・滞在期間・ご予算をお聞きし、最適な VISA 種別と概算費用をお伝えします。",
		note: "24 時間以内に初回応答",
	},
	{
		num: "02",
		Icon: FileText,
		title: "専用 CRM で申込",
		body: "WALC アプリ(my.walc-visa.online)にアクセス、申込書記入と書類アップロードを完了。",
		note: "すべてオンライン完結",
	},
	{
		num: "03",
		Icon: Send,
		title: "WALC が代理申請",
		body: "WALC 担当者が大使館 / 領事館との手続きを代行。申請状況は CRM でリアルタイム共有。",
		note: "進捗をいつでも確認可能",
	},
	{
		num: "04",
		Icon: ShieldCheck,
		title: "取得後の継続サポート",
		body: "90 日レポート・更新通知・トラブル対応など、取得後の運用もアプリで継続サポート。",
		note: "最大 6 年間のリレーション",
	},
] as const;

export function Process() {
	return (
		<section id="process" className="bg-bg-primary">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-3xl mb-12 md:mb-16">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							Process
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
						申込から取得後まで、4 ステップ。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						何が起きるか、何を準備するか、いつまでに完了するか。
						<br className="hidden md:block" />
						すべて透明化したシンプルなフローです。
					</p>
				</div>

				{/* ステップ */}
				<ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
					{STEPS.map((step, i) => (
						<li
							key={step.num}
							className="relative bg-white rounded-xl p-6 md:p-7 border border-border-subtle hover:border-brand/40 hover:shadow-lg transition-all"
						>
							{/* 接続線(デスクトップ・最後以外) */}
							{i < STEPS.length - 1 && (
								<span
									aria-hidden="true"
									className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border-default"
								/>
							)}

							{/* ステップ番号 */}
							<div className="flex items-center justify-between mb-5">
								<span className="text-3xl font-bold text-brand/15 tabular-nums tracking-tight leading-none">
									{step.num}
								</span>
								<div className="w-11 h-11 rounded-lg bg-brand/5 flex items-center justify-center">
									<step.Icon className="w-4.5 h-4.5 text-brand" strokeWidth={1.8} />
								</div>
							</div>

							{/* タイトル */}
							<h3 className="text-lg font-bold text-text-primary mb-3 leading-snug">
								{step.title}
							</h3>

							{/* 本文 */}
							<p className="text-sm text-text-secondary leading-relaxed mb-4">
								{step.body}
							</p>

							{/* 注釈 */}
							<p className="text-[11px] tracking-wide text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-md inline-block font-semibold">
								{step.note}
							</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
PROC_EOF

# ============================================================================
# 4. Founder.tsx — 代表者メッセージ
# ============================================================================
echo "→ Generate Founder.tsx"

cat > "$WMV/components/lp/Founder.tsx" <<'FOUNDER_EOF'
/**
 * components/lp/Founder.tsx — 代表者メッセージ
 * ----------------------------------------------------------------------------
 * Yosuke Onodera のメッセージで、信頼の質を高める。
 * 顔写真は Sprint 2 で差替予定(現状はイニシャル + ロゴで代用)。
 * ----------------------------------------------------------------------------
 */

import { Quote } from "lucide-react";

export function Founder() {
	return (
		<section id="founder" className="bg-brand text-white relative overflow-hidden">
			{/* 装飾: 右下に大きなクォートマーク */}
			<div className="absolute -bottom-20 -right-20 opacity-[0.04] pointer-events-none">
				<Quote className="w-[500px] h-[500px]" strokeWidth={0.5} />
			</div>

			<div className="relative mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
					{/* 左: プロフィール */}
					<div className="lg:col-span-4">
						{/* 顔写真プレースホルダー */}
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
								小野寺 洋介
							</h3>
							<p className="text-sm text-white/70">Yosuke Onodera</p>
						</div>

						<p className="text-xs text-white/55 mt-5 leading-relaxed">
							WALC DESIGN Co., Ltd. 代表
							<br />
							WALC VISA Consulting 統括
							<br />
							バンコク在住 6 年
						</p>
					</div>

					{/* 右: メッセージ */}
					<div className="lg:col-span-8">
						<div className="inline-flex items-center gap-2.5 mb-5">
							<span className="w-8 h-px bg-amber-400/70" />
							<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-amber-200 font-semibold">
								Message from Founder
							</span>
						</div>

						<blockquote className="space-y-5 text-base md:text-lg leading-relaxed md:leading-[1.95] text-white/90">
							<p className="text-xl md:text-2xl font-bold text-white leading-snug">
								「タイで生きるという選択を、もっと多くの人が確かに選べるように。」
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
								すべては、お客様の選択を確かなものにするためにあります。
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
# 5. FinalCta.tsx — 最終 CTA 帯
# ============================================================================
echo "→ Generate FinalCta.tsx"

cat > "$WMV/components/lp/FinalCta.tsx" <<'CTA_EOF'
/**
 * components/lp/FinalCta.tsx — 最終 CTA 帯(フッター直前)
 * ----------------------------------------------------------------------------
 * 行動への最後のひと押し。LINE 相談 + 申込フォームの 2 つ。
 * ----------------------------------------------------------------------------
 */

import { ArrowRight, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildApplicationUrl, getLineAddUrl } from "@/lib/walc-links";

export function FinalCta() {
	const lineUrl = getLineAddUrl();
	const applyUrl = buildApplicationUrl({ source: "main-final-cta" });

	return (
		<section className="bg-bg-secondary border-y border-border-subtle">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				<div className="max-w-3xl mx-auto text-center">
					{/* キャプション */}
					<div className="inline-flex items-center gap-2.5 mb-5">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							Get Started
						</span>
						<span className="w-8 h-px bg-accent-blue" />
					</div>

					{/* 見出し */}
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight mb-5">
						まず、3 分だけお話を
						<br className="md:hidden" />
						聞かせてください。
					</h2>

					{/* サブ */}
					<p className="text-base md:text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
						どの VISA があなたに合うか、概算費用はいくらか——
						<br className="hidden md:block" />
						初回相談は無料、24 時間以内に WALC 担当者から返信いたします。
					</p>

					{/* CTA 2 つ */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
						<Button asChild variant="line" size="xl" className="w-full sm:w-auto">
							<a href={lineUrl} target="_blank" rel="noopener noreferrer">
								<MessageCircle className="w-5 h-5" />
								LINE で 3 分相談
							</a>
						</Button>
						<Button asChild size="xl" className="w-full sm:w-auto bg-brand text-white hover:bg-brand-deep border border-brand">
							<a href={applyUrl} target="_blank" rel="noopener noreferrer">
								申込フォームへ
								<ArrowRight className="w-5 h-5" />
							</a>
						</Button>
					</div>

					{/* 安心要素 */}
					<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-text-tertiary">
						<span className="flex items-center gap-1.5">
							<Clock className="w-3.5 h-3.5 text-accent-blue" />
							24 時間以内に初回応答
						</span>
						<span className="flex items-center gap-1.5">
							<ShieldCheck className="w-3.5 h-3.5 text-accent-blue" />
							初回相談 無料・しつこい営業なし
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
CTA_EOF

# ============================================================================
# 6. app/page.tsx — 全セクション組み込み
# ============================================================================
echo "→ Update app/page.tsx (full sections)"

cat > "$WMV/app/page.tsx" <<'PAGE_EOF'
/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.2 (2026-05-25) — Sprint 1 で本体セクション 5 件追加。
 *
 * 構成:
 *   1. Hero (バンコク夜景 + 浮かぶ実績カード)
 *   2. TrustStrip (実績ストリップ 5 項目)
 *   3. VisaTypes (VISA 6 種別カード)
 *   4. WhyWalc (選ばれる 3 つの理由)
 *   5. Process (取得プロセス 4 ステップ)
 *   6. Founder (代表者メッセージ)
 *   7. FinalCta (最終 CTA 帯)
 *
 * Sprint 2 で追加予定:
 *   - お客様の声 (Testimonials)
 *   - 料金一覧 (Pricing — 法人系含む)
 *   - FAQ
 *   - AI VISA Concierge (右下フローティング)
 * ----------------------------------------------------------------------------
 */

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
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
				<Process />
				<Founder />
				<FinalCta />
			</main>
			<Footer />
		</>
	);
}
PAGE_EOF

echo ""
echo "→ Verify: typecheck"
pnpm typecheck

echo ""
echo "→ git commit"
git add -A
git commit -m "feat(sprint1): add VisaTypes / WhyWalc / Process / Founder / FinalCta

- VisaTypes: 6 visa cards (DTV highlighted as 第一推奨)
- WhyWalc: 3 reasons (track record / CRM / Bangkok HQ)
- Process: 4-step VISA acquisition flow with connectors
- Founder: Yosuke Onodera message (initials placeholder for photo)
- FinalCta: dual CTA band (LINE + application form)
- page.tsx: integrate all 7 sections"

echo ""
echo "============================================================================"
echo "✓ Sprint 1 sections applied!"
echo "============================================================================"
echo ""
echo "Reload: pnpm dev → http://localhost:3000"
echo ""
echo "Sprint 2 で追加予定:"
echo "  - Testimonials (お客様の声)"
echo "  - Pricing (料金一覧・法人系含む)"
echo "  - FAQ"
echo "  - AI VISA Concierge (右下フローティング)"

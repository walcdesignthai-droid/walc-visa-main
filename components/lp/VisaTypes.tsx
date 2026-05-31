"use client";

/**
 * components/lp/VisaTypes.tsx — VISA タブ別カード一覧
 * ----------------------------------------------------------------------------
 * 改訂 v2.0 (2026-05-26):
 *   - 推測直書き料金を撤廃 → lib/walc-data/pricing.ts を真実とする
 *   - タブ構造化 (短期 / 1年 / 5年以上)
 *   - DTV 第一推奨を明示 (WALC 営業方針準拠 / 00_walc_principles.md)
 *   - 各カードに /visas/{slug} へのリンク (現状はアンカー・詳細ページ未実装)
 *
 * 出典: walc-studio/knowledge/
 *   - 02_pricing_master.md (料金)
 *   - 03_thai_visa_glossary.md (短期 / 1年 / 5年以上 の分類)
 *   - 00_walc_principles.md (DTV 第一推奨・抱合せ販売禁止)
 * ----------------------------------------------------------------------------
 */

import { useState } from "react";
import {
	ALL_VISA_CATEGORIES,
	type DurationTab,
	type VisaCategory,
	categoryFromPrice,
	categoryRecommendedPlan,
	formatTHB,
	visasByTab,
	AIRPORT_IMMIGRATION_SUPPORT,
	VISA_RUN_SUPPORT,
} from "@/lib/walc-data/pricing";
import {
	ArrowUpRight,
	Award,
	BookOpen,
	Briefcase,
	Calendar,
	Clock,
	CreditCard,
	Heart,
	Palmtree,
	Plane,
	Sparkles,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";

// アイコンマップ (slug → icon)
const ICON_MAP: Record<string, typeof Briefcase> = {
	dtv: Briefcase,
	privilege: Award,
	ltr: TrendingUp,
	retirement: Palmtree,
	student: BookOpen,
	family: Heart,
};

const TABS: { id: DurationTab; label: string; sublabel: string }[] = [
	{ id: "short", label: "短期滞在", sublabel: "〜90 日" },
	{ id: "one_year", label: "1 年滞在", sublabel: "更新型" },
	{ id: "long_term", label: "5 年以上滞在", sublabel: "★ DTV 第一推奨" },
];

export function VisaTypes() {
	const [activeTab, setActiveTab] = useState<DurationTab>("long_term");
	const visas = visasByTab(activeTab);

	return (
		<section id="visa-types" className="bg-bg-primary">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-3xl mb-10 md:mb-14">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							All Visa Types
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
						滞在期間で選ぶ、タイ長期 VISA。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						目的・滞在期間・予算に応じて、適した VISA をご提案します。
						<br className="hidden md:block" />
						迷ったらまず DTV——コストパフォーマンスと自由度の両立で第一推奨です。
					</p>
				</div>

				{/* タブナビゲーション */}
				<div className="mb-8 md:mb-10">
					<div
						role="tablist"
						aria-label="滞在期間で VISA を選ぶ"
						className="inline-flex rounded-xl border border-border-subtle bg-white p-1 shadow-sm flex-wrap gap-1"
					>
						{TABS.map((tab) => {
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									role="tab"
									aria-selected={isActive}
									onClick={() => setActiveTab(tab.id)}
									className={`relative px-4 md:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
										isActive
											? "bg-brand text-white shadow-md"
											: "text-text-secondary hover:bg-bg-secondary"
									}`}
								>
									<span className="flex items-center gap-2">
										{tab.id === "short" && <Clock className="w-3.5 h-3.5" />}
										{tab.id === "one_year" && (
											<Calendar className="w-3.5 h-3.5" />
										)}
										{tab.id === "long_term" && (
											<Sparkles className="w-3.5 h-3.5" />
										)}
										{tab.label}
									</span>
									<span
										className={`block text-[10px] mt-0.5 tracking-wider ${
											isActive ? "text-amber-200" : "text-text-tertiary"
										}`}
									>
										{tab.sublabel}
									</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* 短期タブの特別コンテンツ (VISA カードではなくサービス案内) */}
				{activeTab === "short" && <ShortStaySection />}

				{/* 1年 / 5年以上タブ: VISA カード一覧 */}
				{activeTab !== "short" && (
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
						{visas.map((visa) => (
							<li key={visa.slug}>
								<VisaCard visa={visa} />
							</li>
						))}
					</ul>
				)}

				{/* 補助テキスト + 訴求 */}
				<div className="mt-10 md:mt-12 pt-8 border-t border-border-subtle">
					<p className="text-sm text-text-tertiary text-center max-w-2xl mx-auto leading-relaxed">
						※ 料金はすべてタイバーツ (THB) 表示・税込です。為替レートにより日本円換算額は変動します。
						<br />
						最新の正確なお見積もりは LINE 相談で即時お伝えします。
					</p>
				</div>
			</div>
		</section>
	);
}

// ============================================================================
// VISA カード (長期・1年タブ用)
// ============================================================================

function VisaCard({ visa }: { visa: VisaCategory }) {
	const Icon = ICON_MAP[visa.slug] ?? Briefcase;
	const fromPrice = categoryFromPrice(visa);
	const recommendedPlan = categoryRecommendedPlan(visa);
	// recommended が設定されていればその価格を「最小料金/メイン」表示。
	// 設定がなければ plans 全体の min を使う (Privilege 等)。
	// → LTR (DWP 3K でなく WALC 手数料 180K を表示) / リタイア (13K) / DTV (60K) 正しく動く
	const displayPrice = recommendedPlan?.walcFee ?? fromPrice;
	const isDtv = visa.slug === "dtv";
	const isDisabled = visa.linkDisabled ?? false;

	const cardClass = `group relative flex flex-col h-full p-6 md:p-7 rounded-xl border transition-all duration-300 ${
		visa.recommended
			? "bg-brand text-white border-brand hover:shadow-xl hover:-translate-y-1"
			: isDisabled
				? "bg-white/60 border-border-subtle cursor-default"
				: "bg-white border-border-subtle hover:border-brand/40 hover:shadow-lg hover:-translate-y-0.5"
	}`;

	// 共通中身 (Link / div で同じ JSX をレンダ)
	const inner = (
		<>
			{/* 推奨バッジ */}
			{visa.recommended && (
				<div className="absolute -top-2.5 left-6 px-2.5 py-1 rounded-full bg-amber-400 text-brand-deep text-[10px] font-bold tracking-wider uppercase shadow-md">
					★ 第一推奨
				</div>
			)}

			{/* 受付絞り中 / 専用ページ無し バッジ */}
			{isDisabled && !visa.recommended && (
				<div className="absolute -top-2.5 left-6 px-2.5 py-1 rounded-full bg-gray-100 text-text-tertiary text-[10px] font-medium tracking-wider border border-border-subtle">
					{visa.linkDisabledReason ?? "個別対応"}
				</div>
			)}

			{/* アイコン + 矢印 */}
			<div className="flex items-start justify-between mb-5">
				<div
					className={`w-12 h-12 rounded-lg flex items-center justify-center ${
						visa.recommended
							? "bg-white/10"
							: "bg-brand/5 group-hover:bg-brand/10"
					} transition-colors`}
				>
					<Icon
						className={`w-5 h-5 ${
							visa.recommended ? "text-amber-300" : "text-brand"
						}`}
						strokeWidth={1.8}
					/>
				</div>
				{!isDisabled && (
					<ArrowUpRight
						className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
							visa.recommended ? "text-white/60" : "text-text-tertiary"
						}`}
					/>
				)}
			</div>

			{/* タイトル */}
			<h3
				className={`text-2xl font-bold tracking-tight mb-1 ${
					visa.recommended ? "text-white" : "text-text-primary"
				}`}
			>
				{visa.shortName}
			</h3>
			<p
				className={`text-xs tracking-wide mb-2 ${
					visa.recommended ? "text-amber-200/90" : "text-text-tertiary"
				}`}
			>
				{visa.fullName}
			</p>

			{/* 期間 */}
			<p
				className={`text-[11px] font-medium mb-4 ${
					visa.recommended ? "text-white/70" : "text-text-secondary"
				}`}
			>
				📅 {visa.duration}
			</p>

			{/* 説明 */}
			<p
				className={`text-sm leading-relaxed flex-1 mb-5 ${
					visa.recommended ? "text-white/85" : "text-text-secondary"
				}`}
			>
				{visa.primaryDesc}
			</p>

			{/* 銀行口座開設可否マーカー */}
			<div
				className={`flex items-center gap-1.5 text-[11px] mb-4 ${
					visa.recommended ? "text-white/65" : "text-text-tertiary"
				}`}
			>
				<CreditCard className="w-3 h-3" />
				<span>
					銀行口座開設:{" "}
					{visa.bankAccountAvailable ? "可" : "不可 (2026/4 制度変更)"}
				</span>
			</div>

			{/* 価格 */}
			<div
				className={`pt-4 border-t ${
					visa.recommended ? "border-white/15" : "border-border-subtle"
				}`}
			>
				{displayPrice != null ? (
					<>
						<div
							className={`text-lg font-bold tabular-nums ${
								visa.recommended ? "text-white" : "text-brand"
							}`}
						>
							{formatTHB(displayPrice)}
							<span className="text-xs font-medium ml-1 opacity-80">〜</span>
						</div>
						{recommendedPlan && (
							<div
								className={`text-[11px] mt-0.5 ${
									visa.recommended ? "text-white/60" : "text-text-tertiary"
								}`}
							>
								{recommendedPlan.label}
								{isDtv && " (3 プランから選択)"}
							</div>
						)}
					</>
				) : (
					<div
						className={`text-sm font-semibold ${
							visa.recommended ? "text-white/90" : "text-brand"
						}`}
					>
						{visa.bookingNote ?? "案件により対応"}
					</div>
				)}
			</div>
		</>
	);

	// リンク無効カテゴリは div、外部 URL ありなら <a target="_blank">、それ以外は内部 Link
	if (isDisabled) {
		return <div className={cardClass}>{inner}</div>;
	}
	if (visa.externalUrl) {
		return (
			<a
				href={visa.externalUrl}
				target="_blank"
				rel="noopener noreferrer"
				className={cardClass}
			>
				{inner}
			</a>
		);
	}
	return (
		<Link href={`/visas/${visa.slug}`} className={cardClass}>
			{inner}
		</Link>
	);
}

// ============================================================================
// 短期滞在タブ専用セクション (ノービザ / TR180 / 空港サポート / ビザラン)
// ============================================================================

function ShortStaySection() {
	return (
		<div className="space-y-6">
			{/* 短期滞在の現状サマリー */}
			<div className="bg-white border border-border-subtle rounded-xl p-6 md:p-8">
				<div className="flex items-start gap-3 mb-4">
					<div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
						<Sparkles className="w-5 h-5 text-amber-600" />
					</div>
					<div>
						<h3 className="text-lg md:text-xl font-bold text-text-primary">
							短期滞在は、まずノービザで OK
						</h3>
						<p className="text-xs text-text-tertiary mt-0.5">
							日本パスポートは VISA 免除 (Visa Exemption)
						</p>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<div className="bg-bg-secondary rounded-lg p-4">
						<div className="text-2xl font-bold text-brand tabular-nums">
							60 日
						</div>
						<div className="text-xs text-text-secondary mt-1">
							ノービザで滞在可能
						</div>
					</div>
					<div className="bg-bg-secondary rounded-lg p-4">
						<div className="text-2xl font-bold text-brand tabular-nums">
							+30 日
						</div>
						<div className="text-xs text-text-secondary mt-1">
							タイ国内イミグレで延長 (1,900 THB)
						</div>
					</div>
					<div className="bg-bg-secondary rounded-lg p-4">
						<div className="text-2xl font-bold text-brand tabular-nums">
							合計 90 日
						</div>
						<div className="text-xs text-text-secondary mt-1">
							最大連続滞在
						</div>
					</div>
				</div>
			</div>

			{/* 空港イミグレサポート */}
			<div className="bg-white border border-border-subtle rounded-xl p-6 md:p-8">
				<div className="flex items-start gap-3 mb-4">
					<div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center">
						<Plane className="w-5 h-5 text-brand" strokeWidth={1.8} />
					</div>
					<div className="flex-1">
						<h3 className="text-lg md:text-xl font-bold text-text-primary">
							空港イミグレサポート
						</h3>
						<p className="text-xs text-text-tertiary mt-0.5">
							{AIRPORT_IMMIGRATION_SUPPORT.description}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
					{AIRPORT_IMMIGRATION_SUPPORT.plans.map((plan) => (
						<div
							key={plan.id}
							className={`flex items-baseline justify-between p-3 rounded-lg ${
								plan.dtvDiscount
									? "bg-amber-50 border border-amber-200"
									: "bg-bg-secondary"
							}`}
						>
							<div className="flex-1 min-w-0 pr-3">
								<div className="text-sm font-medium text-text-primary">
									{plan.label}
								</div>
								{plan.notes && (
									<div className="text-[11px] text-text-tertiary mt-0.5">
										{plan.notes}
									</div>
								)}
							</div>
							<div className="text-sm font-bold text-brand tabular-nums whitespace-nowrap">
								{formatTHB(plan.walcFee)}
							</div>
						</div>
					))}
				</div>

				<p className="text-[11px] text-text-tertiary mt-4 leading-relaxed">
					※ アラート保有者・ビザラン疲れ・取得済み顧客の任意利用にも対応。原則 DTV
					取得が長期解決策となります。
				</p>
			</div>

			{/* ビザランサポート */}
			<div className="bg-white border border-border-subtle rounded-xl p-6 md:p-8">
				<div className="flex items-start gap-3 mb-4">
					<div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center">
						<Users className="w-5 h-5 text-brand" strokeWidth={1.8} />
					</div>
					<div className="flex-1">
						<h3 className="text-lg md:text-xl font-bold text-text-primary">
							ビザランサポート
						</h3>
						<p className="text-xs text-text-tertiary mt-0.5">
							{VISA_RUN_SUPPORT.description}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
					{VISA_RUN_SUPPORT.plans.map((plan) => (
						<div
							key={plan.id}
							className="flex items-baseline justify-between p-3 rounded-lg bg-bg-secondary"
						>
							<div className="flex-1 min-w-0 pr-3">
								<div className="text-sm font-medium text-text-primary">
									{plan.label}
								</div>
								{plan.notes && (
									<div className="text-[11px] text-text-tertiary mt-0.5">
										{plan.notes}
									</div>
								)}
							</div>
							<div className="text-sm font-bold text-brand tabular-nums whitespace-nowrap">
								{formatTHB(plan.walcFee)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

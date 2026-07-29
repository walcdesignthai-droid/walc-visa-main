"use client";

/**
 * components/lp/VisaTypes.tsx — VISA タブ別カード一覧
 * ----------------------------------------------------------------------------
 * 改訂 v3.0 (2026-07-29):
 *   - 公開料金は CRM-backed DTV public content のみ表示
 *   - DTV 以外は目的・条件を中立に案内し、料金・受付可否を個別確認
 *   - タブ構造化 (短期 / 1年 / 5年以上)
 *   - 銀行口座の可否は金融機関判断として一律に要確認
 * ----------------------------------------------------------------------------
 */

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
import { useState } from "react";
import {
	type DurationTab,
	formatTHB,
	type VisaCategory,
	visasByTab,
} from "@/lib/walc-data/pricing";
import type { DtvPublicContent } from "@/lib/walc-data/public-content";

// アイコンマップ (slug → icon)
const ICON_MAP: Record<string, typeof Briefcase> = {
	dtv: Briefcase,
	privilege: Award,
	ltr: TrendingUp,
	retirement: Palmtree,
	student: BookOpen,
	family: Heart,
};

const PUBLIC_VISA_DESCRIPTIONS: Record<string, string> = {
	dtv: "リモートワーク・ワーケーション・タイのソフトパワー活動など、対象となる活動目的に応じて申請する5年マルチプルVISAです。",
	privilege:
		"タイの長期滞在会員プログラムです。プラン・特典・費用・受付条件は申込時点の公式情報を個別に確認します。",
	ltr: "BOIが所管する長期滞在VISAです。所得・資産・雇用・専門性など、カテゴリーごとの認定要件を確認します。",
	retirement:
		"50歳以上の方を対象とする長期滞在の選択肢です。資金・保険・申請地などの条件を個別に確認します。",
	student:
		"学校での学習を目的とするVISAです。教育機関・履修内容・出席要件・延長条件を個別に確認します。",
	family:
		"タイ人配偶者・タイ国籍の子・家族関係などを理由とするVISAです。関係性と申請条件を個別に確認します。",
};

const TABS: { id: DurationTab; label: string; sublabel: string }[] = [
	{ id: "short", label: "短期滞在", sublabel: "〜90 日" },
	{ id: "one_year", label: "1 年滞在", sublabel: "更新型" },
	{ id: "long_term", label: "5 年以上滞在", sublabel: "目的別に確認" },
];

export function VisaTypes({ content }: { content: DtvPublicContent }) {
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
						目的と滞在期間から選ぶ、タイ長期 VISA。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						目的・活動内容・年齢・家族構成・滞在期間を確認し、条件に合う VISA
						を整理します。
						<br className="hidden md:block" />
						就労・家族・学習など、活動目的に合わないVISAを一律に勧めることはありません。
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
								<VisaCard visa={visa} content={content} />
							</li>
						))}
					</ul>
				)}

				{/* 補助テキスト + 訴求 */}
				<div className="mt-10 md:mt-12 pt-8 border-t border-border-subtle">
					<p className="text-sm text-text-tertiary text-center max-w-2xl mx-auto leading-relaxed">
						※ DTVの表示料金はタイバーツ (THB)
						・申請費込みです。為替レートにより日本円換算額は変動します。
						<br />
						DTV以外の料金・対応可否はLINEで個別確認します。
					</p>
				</div>
			</div>
		</section>
	);
}

// ============================================================================
// VISA カード (長期・1年タブ用)
// ============================================================================

function VisaCard({
	visa,
	content,
}: {
	visa: VisaCategory;
	content: DtvPublicContent;
}) {
	const Icon = ICON_MAP[visa.slug] ?? Briefcase;
	const isDtv = visa.slug === "dtv";
	const dtvFromPrice =
		content.pricing.length > 0
			? Math.min(...content.pricing.map((plan) => plan.priceThb))
			: null;
	const displayPrice = isDtv ? dtvFromPrice : null;
	const isDisabled = visa.linkDisabled ?? false;

	const cardClass = `group relative flex flex-col h-full p-6 md:p-7 rounded-xl border transition-all duration-300 ${
		isDtv
			? "bg-brand text-white border-brand hover:shadow-xl hover:-translate-y-1"
			: isDisabled
				? "bg-white/60 border-border-subtle cursor-default"
				: "bg-white border-border-subtle hover:border-brand/40 hover:shadow-lg hover:-translate-y-0.5"
	}`;

	// 共通中身 (Link / div で同じ JSX をレンダ)
	const inner = (
		<>
			{/* DTV 専門サポートの識別。適合性の一律推奨ではない。 */}
			{isDtv && (
				<div className="absolute -top-2.5 left-6 px-2.5 py-1 rounded-full bg-amber-400 text-brand-deep text-[10px] font-bold tracking-wider uppercase shadow-md">
					DTV 専門サポート
				</div>
			)}

			{/* 受付絞り中 / 専用ページ無し バッジ */}
			{isDisabled && !isDtv && (
				<div className="absolute -top-2.5 left-6 px-2.5 py-1 rounded-full bg-gray-100 text-text-tertiary text-[10px] font-medium tracking-wider border border-border-subtle">
					現在は個別確認
				</div>
			)}

			{/* アイコン + 矢印 */}
			<div className="flex items-start justify-between mb-5">
				<div
					className={`w-12 h-12 rounded-lg flex items-center justify-center ${
						isDtv ? "bg-white/10" : "bg-brand/5 group-hover:bg-brand/10"
					} transition-colors`}
				>
					<Icon
						className={`w-5 h-5 ${isDtv ? "text-amber-300" : "text-brand"}`}
						strokeWidth={1.8}
					/>
				</div>
				{!isDisabled && (
					<ArrowUpRight
						className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
							isDtv ? "text-white/60" : "text-text-tertiary"
						}`}
					/>
				)}
			</div>

			{/* タイトル */}
			<h3
				className={`text-2xl font-bold tracking-tight mb-1 ${
					isDtv ? "text-white" : "text-text-primary"
				}`}
			>
				{visa.shortName}
			</h3>
			<p
				className={`text-xs tracking-wide mb-2 ${
					isDtv ? "text-amber-200/90" : "text-text-tertiary"
				}`}
			>
				{visa.fullName}
			</p>

			{/* 期間 */}
			<p
				className={`text-[11px] font-medium mb-4 ${
					isDtv ? "text-white/70" : "text-text-secondary"
				}`}
			>
				📅 {visa.duration}
			</p>

			{/* 説明 */}
			<p
				className={`text-sm leading-relaxed flex-1 mb-5 ${
					isDtv ? "text-white/85" : "text-text-secondary"
				}`}
			>
				{PUBLIC_VISA_DESCRIPTIONS[visa.slug] ??
					"目的・条件・受付状況を個別に確認します。"}
			</p>

			{/* 銀行口座開設可否マーカー */}
			<div
				className={`flex items-center gap-1.5 text-[11px] mb-4 ${
					isDtv ? "text-white/65" : "text-text-tertiary"
				}`}
			>
				<CreditCard className="w-3 h-3" />
				<span>銀行口座開設: 金融機関の審査・運用により要確認</span>
			</div>

			{/* 価格 */}
			<div
				className={`pt-4 border-t ${
					isDtv ? "border-white/15" : "border-border-subtle"
				}`}
			>
				{displayPrice != null ? (
					<>
						<div
							className={`text-lg font-bold tabular-nums ${
								isDtv ? "text-white" : "text-brand"
							}`}
						>
							{formatTHB(displayPrice)}
							<span className="text-xs font-medium ml-1 opacity-80">〜</span>
						</div>
						<div className="text-[11px] mt-0.5 text-white/60">
							{content.pricing.length} プランから選択
						</div>
						<p className="mt-3 text-[11px] leading-relaxed text-white/75">
							{content.fees.summary}
						</p>
					</>
				) : (
					<div
						className={`text-sm font-semibold ${
							isDtv ? "text-white/90" : "text-brand"
						}`}
					>
						{isDtv
							? "最新のDTV料金をLINEで確認"
							: "料金・対応可否はLINEで個別確認"}
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
						<div className="text-xs text-text-secondary mt-1">最大連続滞在</div>
					</div>
				</div>
			</div>

			{/* 空港イミグレサポート（受付停止中） */}
			<div className="bg-amber-50 border border-amber-200 rounded-xl p-6 md:p-8">
				<div className="flex items-start gap-3 mb-4">
					<div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center">
						<Plane className="w-5 h-5 text-brand" strokeWidth={1.8} />
					</div>
					<div className="flex-1">
						<h3 className="text-lg md:text-xl font-bold text-text-primary">
							空港イミグレ入国サポート
						</h3>
						<p className="text-xs text-text-tertiary mt-0.5">
							現在、新規受付を一時停止しています
						</p>
					</div>
				</div>

				<p className="text-sm text-text-secondary mt-4 leading-relaxed">
					入国履歴・拒否歴・オーバーステイ歴がある方も、まず状況を確認し、DTV
					を含む長期滞在方法をご案内します。空港での入国を保証するサービスではありません。
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
							現在の受付状況・行程・費用は個別確認
						</p>
					</div>
				</div>

				<p className="text-sm text-text-secondary leading-relaxed">
					出入国履歴・現在のVISA・タイでの活動内容を確認し、ビザランを含む短期対応が適切か、長期VISAへ切り替えるべきかを整理します。受付可否と見積もりはLINEで事前にご案内します。
				</p>
			</div>
		</div>
	);
}

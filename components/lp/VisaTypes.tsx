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
import { useRef, useState } from "react";
import type { DtvPublicContent } from "@/lib/walc-data/public-content";
import { SITE_URLS } from "@/lib/walc-data/site-map";

type DurationTab = "short" | "one_year" | "long_term";

interface PublicVisaCategory {
	slug: "dtv" | "privilege" | "ltr" | "retirement" | "student" | "family";
	shortName: string;
	fullName: string;
	duration: string;
	durationTab: Exclude<DurationTab, "short">;
	linkDisabled?: boolean;
	externalUrl?: string;
}

/**
 * Public selector data must remain independent from the internal pricing
 * registry. This component is a Client Component, so every imported module can
 * become browser-readable JavaScript. Keep only owner-reviewed display facts
 * here and receive current DTV pricing through the CRM-backed `content` prop.
 */
const PUBLIC_VISA_CATEGORIES: readonly PublicVisaCategory[] = [
	{
		slug: "dtv",
		shortName: "DTV",
		fullName: "Destination Thailand Visa",
		duration: "5年マルチプル / 1回最長180日",
		durationTab: "long_term",
		externalUrl: SITE_URLS.dtv,
	},
	{
		slug: "privilege",
		shortName: "Thailand Privilege",
		fullName: "旧 Thailand Elite Visa",
		duration: "長期滞在会員プログラム",
		durationTab: "long_term",
		linkDisabled: true,
	},
	{
		slug: "ltr",
		shortName: "LTR",
		fullName: "Long-Term Resident Visa",
		duration: "最長10年（認定・更新条件あり）",
		durationTab: "long_term",
	},
	{
		slug: "retirement",
		shortName: "リタイアメント",
		fullName: "NON-O Retirement（50歳以上）",
		duration: "更新型",
		durationTab: "one_year",
	},
	{
		slug: "student",
		shortName: "学生 VISA",
		fullName: "NON-ED",
		duration: "教育機関・履修内容により確認",
		durationTab: "one_year",
		linkDisabled: true,
	},
	{
		slug: "family",
		shortName: "結婚・家族 VISA",
		fullName: "NON-O（Marriage / Family / Guardian）",
		duration: "更新条件を個別確認",
		durationTab: "one_year",
		linkDisabled: true,
	},
] as const;

function publicVisasByTab(tab: DurationTab): readonly PublicVisaCategory[] {
	if (tab === "short") return [];
	return PUBLIC_VISA_CATEGORIES.filter((visa) => visa.durationTab === tab);
}

function formatTHB(amount: number): string {
	return `${amount.toLocaleString()} THB`;
}

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
	{ id: "short", label: "短期滞在", sublabel: "渡航時点で確認" },
	{ id: "one_year", label: "1 年滞在", sublabel: "更新型" },
	{ id: "long_term", label: "5 年以上滞在", sublabel: "目的別に確認" },
];

export function VisaTypes({ content }: { content: DtvPublicContent }) {
	const [activeTab, setActiveTab] = useState<DurationTab>("long_term");
	const tabRefs = useRef<Record<DurationTab, HTMLButtonElement | null>>({
		short: null,
		one_year: null,
		long_term: null,
	});
	const visas = publicVisasByTab(activeTab);

	const handleTabKeyDown = (
		event: React.KeyboardEvent<HTMLButtonElement>,
		index: number,
	) => {
		let nextIndex: number | null = null;

		if (event.key === "ArrowRight") nextIndex = (index + 1) % TABS.length;
		if (event.key === "ArrowLeft")
			nextIndex = (index - 1 + TABS.length) % TABS.length;
		if (event.key === "Home") nextIndex = 0;
		if (event.key === "End") nextIndex = TABS.length - 1;
		if (nextIndex === null) return;

		event.preventDefault();
		const nextTab = TABS[nextIndex];
		setActiveTab(nextTab.id);
		tabRefs.current[nextTab.id]?.focus();
	};

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

				<div className="mb-8 md:mb-10 rounded-2xl border border-brand/15 bg-brand px-5 py-5 text-white shadow-sm md:flex md:items-center md:justify-between md:gap-8 md:px-7">
					<div className="flex items-start gap-4">
						<div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
							<Briefcase className="h-5 w-5 text-amber-300" />
						</div>
						<div>
							<p className="text-xs font-semibold tracking-[0.16em] text-amber-200 uppercase">
								Work in Thailand
							</p>
							<h3 className="mt-1 text-lg font-bold md:text-xl">
								タイで働く方は、Non-B・Work Permitを先に確認
							</h3>
							<p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">
								タイ国内企業での就労を予定する場合は、活動内容と雇用条件に合う在留資格・就労許可を整理します。
							</p>
						</div>
					</div>
					<Link
						href="/visas/non-b-work-permit"
						className="mt-4 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand transition hover:bg-amber-50 md:mt-0"
					>
						Non-B・WPを確認
						<ArrowUpRight className="h-4 w-4" />
					</Link>
				</div>

				{/* タブナビゲーション */}
				<div className="mb-8 md:mb-10">
					<div
						role="tablist"
						aria-label="滞在期間で VISA を選ぶ"
						className="inline-flex rounded-xl border border-border-subtle bg-white p-1 shadow-sm flex-wrap gap-1"
					>
						{TABS.map((tab, index) => {
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									ref={(node) => {
										tabRefs.current[tab.id] = node;
									}}
									id={`visa-tab-${tab.id}`}
									type="button"
									role="tab"
									aria-selected={isActive}
									aria-controls="visa-tabpanel"
									tabIndex={isActive ? 0 : -1}
									onClick={() => setActiveTab(tab.id)}
									onKeyDown={(event) => handleTabKeyDown(event, index)}
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

				<div
					id="visa-tabpanel"
					role="tabpanel"
					aria-labelledby={`visa-tab-${activeTab}`}
				>
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
				</div>

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
	visa: PublicVisaCategory;
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
				? "bg-white/70 border-border-subtle hover:border-brand/40 hover:shadow-lg hover:-translate-y-0.5"
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
				<ArrowUpRight
					className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
						isDtv ? "text-white/60" : "text-text-tertiary"
					}`}
				/>
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

	// 専用ページがないカテゴリはLINE相談へつなぎ、行き止まりを作らない。
	if (isDisabled) {
		return (
			<a
				href={SITE_URLS.social.line}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${visa.shortName}の料金・対応可否をLINEで個別確認`}
				className={cardClass}
			>
				{inner}
			</a>
		);
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
			{/* 制度変更中のため、渡航時点の公式情報へfail closedする。 */}
			<div className="bg-white border border-border-subtle rounded-xl p-6 md:p-8">
				<div className="flex items-start gap-3 mb-4">
					<div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
						<Sparkles className="w-5 h-5 text-amber-600" />
					</div>
					<div>
						<h3 className="text-lg md:text-xl font-bold text-text-primary">
							短期滞在は、渡航日と国籍ごとに条件確認
						</h3>
						<p className="text-xs text-text-tertiary mt-0.5">
							VISA免除・VoA・e-Visaの適用条件は改定されることがあります
						</p>
					</div>
				</div>
				<p className="text-sm leading-relaxed text-text-secondary">
					タイ政府は2026年5月にVISA免除制度の見直しを承認しています。許可日数・延長可否・施行状況は、渡航時点の公式情報と入国審査によって変わるため、固定日数では案内しません。
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
					<div className="bg-bg-secondary rounded-lg p-4">
						<div className="text-sm font-bold text-brand">パスポート国籍</div>
						<div className="text-xs text-text-secondary mt-2">
							VISA免除・VoA・e-Visaの対象を確認
						</div>
					</div>
					<div className="bg-bg-secondary rounded-lg p-4">
						<div className="text-sm font-bold text-brand">渡航予定日</div>
						<div className="text-xs text-text-secondary mt-2">
							制度改定の施行状況と適用条件を確認
						</div>
					</div>
					<div className="bg-bg-secondary rounded-lg p-4">
						<div className="text-sm font-bold text-brand">入国歴・活動目的</div>
						<div className="text-xs text-text-secondary mt-2">
							短期滞在か長期VISAかを個別に整理
						</div>
					</div>
				</div>
				<div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
					<a
						href={SITE_URLS.social.line}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-light"
					>
						LINEで個別確認
					</a>
					<a
						href="https://consular.mfa.go.th/th/content/20-5-69-0000"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center justify-center gap-2 px-2 text-sm font-semibold text-brand hover:underline"
					>
						タイ外務省領事局の発表
						<ArrowUpRight className="h-4 w-4" />
					</a>
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

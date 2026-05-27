/**
 * app/visas/dtv/page.tsx — DTV (Destination Thailand Visa) 詳細ページ
 * ----------------------------------------------------------------------------
 * WALC 第一推奨 VISA・最重要ページ (00_walc_principles.md)
 *
 * 出典 (ナレッジ):
 *   - 00_walc_principles.md (DTV 第一推奨理由・抱合せ禁止)
 *   - 02_pricing_master.md §1-1 (3 プラン)
 *   - 03_thai_visa_glossary.md §4 (DTV 制度概要)
 *   - 04_immigration_practice.md (180 日ルール)
 *   - 07_bank_account_2026.md (口座開設不可)
 *
 * 推測値禁止 - 全数値は lib/walc-data/pricing.ts (= ナレッジ 02) 参照
 * ----------------------------------------------------------------------------
 */

import {
	Award,
	BarChart3,
	Briefcase,
	CalendarRange,
	CheckCircle2,
	Clock,
	CreditCard,
	Globe2,
	MapPin,
	MessageCircle,
	Palette,
	RefreshCw,
	Repeat,
	Rocket,
	ShieldCheck,
	Sparkles,
	TrendingUp,
	Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { formatTHB, VISA_DTV } from "@/lib/walc-data/pricing";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

export const metadata: Metadata = {
	title: "DTV(Destination Thailand Visa)| WALC VISA Consulting",
	description:
		"5 年マルチプル・1 回 180 日滞在のタイ長期 VISA。WALC 累計 212/212 件取得・取得率 100%(2024 年 7 月〜)。45,000 THB から取得可・タイにいながら申請完結。",
};

// ---------------------------------------------------------------------------
// 3 プラン (pricing.ts と同期)
// ---------------------------------------------------------------------------
interface PlanInfo {
	id: string;
	Icon: typeof Palette;
	tag: string;
	target: string;
	whatIsIncluded: string[];
	recommended?: boolean;
}

const PLANS_INFO: PlanInfo[] = [
	{
		id: "dtv-soft-power",
		Icon: Award,
		tag: "★ 最推奨",
		target: "ムエタイ学習をしたい・最も入りやすいプランで申請したい方",
		whatIsIncluded: [
			"ムエタイ学校登録",
			"ムエタイ宿泊施設の手配",
			"申請書類一式の作成・申請代行",
			"E-Visa オンライン申請対応",
		],
		recommended: true,
	},
	{
		id: "dtv-nomad",
		Icon: Briefcase,
		tag: "リモートワーカー向け",
		target: "海外企業勤務・リモートワーカー・年収証明あり",
		whatIsIncluded: [
			"雇用契約書の確認・補助",
			"申請書類一式の作成・申請代行",
			"E-Visa オンライン申請対応",
		],
	},
	{
		id: "dtv-freelance",
		Icon: Sparkles,
		tag: "フリーランス向け",
		target: "個人事業主・フリーランス・自身で収入を得ている方",
		whatIsIncluded: [
			"フリーランス契約書・収入証明の整備",
			"申請書類一式の作成・申請代行",
			"E-Visa オンライン申請対応",
		],
	},
];

// ---------------------------------------------------------------------------
// なぜ DTV 第一推奨か (6 つの理由)
// ---------------------------------------------------------------------------
const WHY_DTV_FIRST: { Icon: typeof CheckCircle2; label: string; desc: string }[] =
	[
		{
			Icon: TrendingUp,
			label: "圧倒的コスパ",
			desc: "Thailand Privilege Bronze 比で約 1/10 以下のコスト。45,000〜60,000 THB / 5 年。",
		},
		{
			Icon: CalendarRange,
			label: "5 年マルチプル・180 日滞在",
			desc: "180 日延長で最大 360 日連続滞在可能。再入国で滞在期間リセット。",
		},
		{
			Icon: ShieldCheck,
			label: "WALC 取得率 100%",
			desc: "2025 年 4 月の制度厳格化以降、累計 212/212 件取得実績。",
		},
		{
			Icon: Rocket,
			label: "最短 7〜14 日で取得",
			desc: "E-Visa オンライン申請以降、最短 7 日程度で発給されます。",
		},
		{
			Icon: Globe2,
			label: "タイにいながら申請完結",
			desc: "2025 年 8 月以降、現地にいながら申請可能。状況により日本帰国が必要なケースもあります。",
		},
		{
			Icon: BarChart3,
			label: "累計 200 名以上の実績",
			desc: "DTV 制度開始 (2024 年 7 月) から WALC 累計 200 名以上の取得経験。",
		},
	];

// ---------------------------------------------------------------------------
// 申請プロセス
// ---------------------------------------------------------------------------
const PROCESS_STEPS: { step: string; title: string; desc: string }[] = [
	{
		step: "01",
		title: "LINE で要件チェック・プラン選択",
		desc: "WALC 担当者がお客様の状況をヒアリングし、ソフトパワー / ノマド / フリーランスから最適プランをご案内。",
	},
	{
		step: "02",
		title: "書類整備・申請準備",
		desc: "残高証明・住民票・収入証明等の書類を WALC が伴走でサポート。タイ側書類は WALC が直接整備。",
	},
	{
		step: "03",
		title: "E-Visa 申請・審査",
		desc: "オンラインで申請後、最短 7〜14 日で審査完了。WALC が状況確認・追加書類対応も継続。",
	},
	{
		step: "04",
		title: "VISA 発給・運用開始",
		desc: "発給後 5 年間有効・180 日滞在 + 延長で最大 360 日連続滞在可。再入国で滞在期間リセット。",
	},
];

// ---------------------------------------------------------------------------
// 重要な注意点 (機微情報配慮)
// ---------------------------------------------------------------------------
const IMPORTANT_NOTES: { Icon: typeof CreditCard; label: string; desc: string }[] = [
	{
		Icon: CreditCard,
		label: "銀行口座開設は不可",
		desc: "2026 年 4 月制度変更により、DTV では銀行口座開設不可になりました。口座が必須の方は NON-O リタイア / LTR 等をご検討ください。",
	},
	{
		Icon: Briefcase,
		label: "タイ国内での就労は不可",
		desc: "DTV は観光カテゴリ。タイ国内企業での就労は不可です。海外企業向けのリモートワークは可能。",
	},
	{
		Icon: Wallet,
		label: "残高 50 万 THB 相当を 3 ヶ月キープ",
		desc: "申請前 3 ヶ月間、タイバーツ換算で 50 万 THB 相当の残高を維持する必要があります (2025 年 4 月制度厳格化)。",
	},
	{
		Icon: Repeat,
		label: "90 日レポートは観光カテゴリのため運用負担小",
		desc: "DTV は観光カテゴリのため、居住者向け VISA と比べて運用負担は比較的小さくなっています。",
	},
];

// ---------------------------------------------------------------------------
export default function DtvPage() {
	const softPower = VISA_DTV.plans.find((p) => p.id === "dtv-soft-power");
	const nomad = VISA_DTV.plans.find((p) => p.id === "dtv-nomad");
	const freelance = VISA_DTV.plans.find((p) => p.id === "dtv-freelance");

	const planPriceMap: Record<string, number | null> = {
		"dtv-soft-power": softPower?.walcFee ?? null,
		"dtv-nomad": nomad?.walcFee ?? null,
		"dtv-freelance": freelance?.walcFee ?? null,
	};

	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				{/* Hero */}
				<section className="bg-brand text-white relative overflow-hidden">
					{/* 背景画像 (Yosuke 提供 Adobe Stock) */}
					<div className="absolute inset-0 z-0">
						<Image
							src="/images/AdobeStock_106818627.jpeg"
							alt=""
							fill
							priority
							sizes="100vw"
							className="object-cover object-center"
							quality={85}
						/>
					</div>
					{/* ネイビーオーバーレイ */}
					<div
						className="absolute inset-0 z-10 pointer-events-none"
						style={{
							background:
								"linear-gradient(135deg, rgba(6,24,48,0.94) 0%, rgba(11,42,74,0.86) 50%, rgba(11,42,74,0.74) 100%)",
						}}
					/>
					<div className="absolute -bottom-32 -right-32 opacity-[0.05] pointer-events-none z-20">
						<Briefcase className="w-[600px] h-[600px]" strokeWidth={0.5} />
					</div>
					<div className="relative mx-auto max-w-content px-5 md:px-8 py-20 md:py-28 z-30">
						<div className="max-w-3xl">
							<Link
								href="/#visa-types"
								className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white/90 transition-colors mb-6"
							>
								← VISA 一覧に戻る
							</Link>
							<div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400 text-brand-deep mb-5">
								<span className="text-[10px] tracking-[0.18em] uppercase font-bold">
									★ WALC 第一推奨
								</span>
							</div>
							<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
								DTV Visa
								<br />
								<span className="text-amber-300 text-2xl md:text-3xl font-semibold">
									5 年マルチプル・コスパ最強のタイ長期 VISA
								</span>
							</h1>
							<p className="text-base md:text-lg text-white/85 leading-relaxed mb-8">
								Destination Thailand Visa(DTV)は、リモートワーカー・ソフトパワー領域の方を対象とした 5 年マルチプル VISA。
								<br className="hidden md:block" />
								Thailand Privilege の約 1/10 のコストで、ほぼ同等以上の自由度を実現します。
							</p>
							<div className="grid grid-cols-3 gap-4 md:gap-6 max-w-xl mb-8">
								<Stat label="取得率" value="100%" sub="212/212 件" />
								<Stat label="最短取得" value="7〜14 日" sub="E-Visa 申請後" />
								<Stat label="滞在期間" value="180 日" sub="× 5 年マルチプル" />
							</div>
							<a
								href="https://lin.ee/HQc9axW"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-brand-deep font-bold text-sm hover:bg-amber-300 transition-colors shadow-md"
							>
								<MessageCircle className="w-4 h-4" />
								無料相談・要件チェック (LINE)
							</a>
							<p className="text-[11px] text-white/55 mt-4 leading-relaxed">
								※ 取得率 100% は 2025 年 4 月〜現在の弊社実績です。将来の取得を保証するものではなく、タイの VISA 制度は予告なく変更される場合があります。
							</p>
						</div>
					</div>
				</section>

				{/* なぜ DTV 第一推奨か */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									Why DTV First
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight">
								WALC が DTV を第一推奨する 6 つの理由
							</h2>
						</div>
						<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
							{WHY_DTV_FIRST.map((r) => {
								const { Icon } = r;
								return (
									<li
										key={r.label}
										className="bg-white border border-border-subtle rounded-xl p-5 hover:border-brand/30 hover:shadow-sm transition-all"
									>
										<div className="flex items-start gap-3 mb-2">
											<div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center shrink-0">
												<Icon className="w-5 h-5 text-brand" strokeWidth={1.8} />
											</div>
											<h3 className="text-sm md:text-base font-bold text-text-primary mt-1.5">
												{r.label}
											</h3>
										</div>
										<p className="text-xs md:text-sm text-text-secondary leading-relaxed">
											{r.desc}
										</p>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* 3 プラン */}
				<section className="bg-bg-primary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									3 Plans
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
								3 プランから選ぶ
							</h2>
							<p className="text-sm md:text-base text-text-secondary leading-relaxed">
								お客様の状況に合わせて最適なプランを WALC 担当者がご案内します。
								迷ったら最も入りやすい「ソフトパワー」を推奨。
							</p>
						</div>
						<ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
							{PLANS_INFO.map((plan) => {
								const planData = VISA_DTV.plans.find((p) => p.id === plan.id);
								if (!planData) return null;
								const { Icon } = plan;
								return (
									<li
										key={plan.id}
										className={`relative flex flex-col h-full bg-white border rounded-xl p-6 md:p-7 transition-all ${
											plan.recommended
												? "border-amber-300 shadow-md"
												: "border-border-subtle hover:border-brand/30 hover:shadow-sm"
										}`}
									>
										{plan.recommended && (
											<div className="absolute -top-2.5 left-6 px-2.5 py-1 rounded-full bg-amber-400 text-brand-deep text-[10px] font-bold tracking-wider uppercase shadow-md">
												{plan.tag}
											</div>
										)}
										{!plan.recommended && (
											<div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase text-text-tertiary bg-bg-secondary mb-3 w-fit">
												{plan.tag}
											</div>
										)}
										<div className="w-12 h-12 rounded-lg bg-brand/5 flex items-center justify-center mb-4">
											<Icon className="w-6 h-6 text-brand" strokeWidth={1.8} />
										</div>
										<h3 className="text-lg md:text-xl font-bold text-text-primary mb-1">
											{planData.label}
										</h3>
										<p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-4 flex-1">
											{plan.target}
										</p>
										<div className="border-t border-border-subtle pt-3 mb-4">
											<div className="text-[10px] tracking-wider uppercase text-text-tertiary font-semibold mb-2">
												含まれるサポート
											</div>
											<ul className="space-y-1">
												{plan.whatIsIncluded.map((u) => (
													<li
														key={u}
														className="flex items-start gap-1.5 text-xs text-text-secondary leading-relaxed"
													>
														<CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
														<span>{u}</span>
													</li>
												))}
											</ul>
										</div>
										<div className="pt-3 border-t border-border-subtle">
											<div className="text-[10px] tracking-wider uppercase text-text-tertiary font-semibold">
												WALC 対応料金
											</div>
											<div className="text-2xl md:text-3xl font-bold text-brand tabular-nums">
												{formatTHB(planPriceMap[plan.id])}
											</div>
											<div className="text-[11px] text-text-tertiary mt-0.5">
												{planData.notes}
											</div>
										</div>
									</li>
								);
							})}
						</ul>
						<p className="text-xs text-text-tertiary mt-6 leading-relaxed">
							{VISA_DTV.bookingNote}
						</p>
					</div>
				</section>

				{/* 申請プロセス */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									Application Process
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight">
								申請プロセス
							</h2>
						</div>
						<ol className="space-y-4 md:space-y-5">
							{PROCESS_STEPS.map((step) => (
								<li
									key={step.step}
									className="flex items-start gap-4 md:gap-6 bg-white border border-border-subtle rounded-xl p-5 md:p-6"
								>
									<div className="text-3xl md:text-4xl font-bold text-brand/30 tabular-nums shrink-0">
										{step.step}
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="text-base md:text-lg font-bold text-text-primary mb-1">
											{step.title}
										</h3>
										<p className="text-sm text-text-secondary leading-relaxed">
											{step.desc}
										</p>
									</div>
								</li>
							))}
						</ol>
					</div>
				</section>

				{/* 重要な注意点 */}
				<section className="bg-bg-primary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									Important Notes
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
								取得前にご確認ください
							</h2>
							<p className="text-sm md:text-base text-text-secondary leading-relaxed">
								DTV は観光カテゴリの VISA です。下記の制約を踏まえてご判断ください。
							</p>
						</div>
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
							{IMPORTANT_NOTES.map((n) => {
								const { Icon } = n;
								return (
									<li
										key={n.label}
										className="bg-white border border-border-subtle rounded-xl p-5 md:p-6"
									>
										<div className="flex items-start gap-3 mb-2">
											<div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
												<Icon
													className="w-5 h-5 text-amber-700"
													strokeWidth={1.8}
												/>
											</div>
											<h3 className="text-sm md:text-base font-bold text-text-primary mt-1.5">
												{n.label}
											</h3>
										</div>
										<p className="text-xs md:text-sm text-text-secondary leading-relaxed">
											{n.desc}
										</p>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* DTV vs 他 VISA 比較 */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									Compare
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight">
								DTV vs 他 VISA 比較
							</h2>
						</div>
						<div className="bg-white border border-border-subtle rounded-xl overflow-hidden overflow-x-auto">
							<table className="w-full min-w-[640px]">
								<thead>
									<tr className="bg-bg-secondary border-b border-border-subtle">
										<th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">
											項目
										</th>
										<th className="px-4 md:px-6 py-3 text-center text-xs font-bold text-brand uppercase tracking-wide bg-amber-50/50">
											DTV ★
										</th>
										<th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wide">
											Privilege
										</th>
										<th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wide">
											LTR
										</th>
										<th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wide">
											リタイア
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border-subtle text-sm">
									<CompareRow
										label="期間"
										dtv="5 年マルチプル"
										priv="5〜20 年"
										ltr="10 年"
										retire="1 年 (毎年更新)"
									/>
									<CompareRow
										label="WALC 料金 (最安)"
										dtv="45,000 THB"
										priv="650,000 THB〜"
										ltr="180,000 THB (+ 政府費 50,000)"
										retire="13,000 THB"
									/>
									<CompareRow
										label="取得難易度"
										dtv="易しい"
										priv="非常に易しい"
										ltr="高い"
										retire="50 歳以上の方"
									/>
									<CompareRow
										label="銀行口座開設"
										dtv="不可"
										priv="可"
										ltr="可"
										retire="可"
									/>
									<CompareRow
										label="税優遇"
										dtv="観光カテゴリ"
										priv="標準課税"
										ltr="外国所得非課税 / HSP 17%"
										retire="標準課税"
									/>
									<CompareRow
										label="更新作業"
										dtv="不要 (5 年)"
										priv="不要"
										ltr="年次レポートのみ"
										retire="毎年更新 + 残高証明"
									/>
								</tbody>
							</table>
						</div>
						<p className="text-xs text-text-tertiary mt-4 leading-relaxed">
							※ Thailand Privilege は現在 WALC で受付絞り中・LTR は専門スタッフ対応となります。
						</p>
					</div>
				</section>

				{/* CTA */}
				<section className="bg-brand text-white">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mx-auto text-center">
							<h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
								最短 7〜14 日で取得開始。
								<br />
								まず無料相談から。
							</h2>
							<p className="text-sm md:text-base text-white/80 mb-8 leading-relaxed">
								お客様の年齢・残高・滞在計画をお伺いし、
								<br className="hidden md:block" />
								3 プランから最適なものを WALC 担当者がご案内します。
							</p>
							<a
								href="https://lin.ee/HQc9axW"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-brand-deep font-bold text-sm hover:bg-amber-300 transition-colors shadow-md"
							>
								<MessageCircle className="w-4 h-4" />
								LINE で無料相談
							</a>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

// ---------------------------------------------------------------------------
function Stat({
	label,
	value,
	sub,
}: {
	label: string;
	value: string;
	sub: string;
}) {
	return (
		<div>
			<div className="text-[10px] uppercase tracking-wider text-white/55 mb-1">
				{label}
			</div>
			<div className="text-xl md:text-3xl font-bold text-amber-300 tabular-nums leading-none">
				{value}
			</div>
			<div className="text-[10px] text-white/65 mt-1.5">{sub}</div>
		</div>
	);
}

function CompareRow({
	label,
	dtv,
	priv,
	ltr,
	retire,
}: {
	label: string;
	dtv: string;
	priv: string;
	ltr: string;
	retire: string;
}) {
	return (
		<tr>
			<td className="px-4 md:px-6 py-3 font-semibold text-text-primary text-xs md:text-sm">
				{label}
			</td>
			<td className="px-4 md:px-6 py-3 text-center font-bold text-brand text-xs md:text-sm bg-amber-50/30">
				{dtv}
			</td>
			<td className="px-4 md:px-6 py-3 text-center text-text-secondary text-xs md:text-sm">
				{priv}
			</td>
			<td className="px-4 md:px-6 py-3 text-center text-text-secondary text-xs md:text-sm">
				{ltr}
			</td>
			<td className="px-4 md:px-6 py-3 text-center text-text-secondary text-xs md:text-sm">
				{retire}
			</td>
		</tr>
	);
}

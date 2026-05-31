/**
 * app/visas/retirement/page.tsx — リタイアメント VISA (NON-O) 詳細ページ
 * ----------------------------------------------------------------------------
 * ケース別に最適プランを判定できるフロー設計 (Yosuke 指示)
 *
 * 出典 (ナレッジ):
 *   - 03_thai_visa_glossary.md §2-3 NON-O Retirement
 *   - 02_pricing_master.md §1-2 (5 プラン詳細)
 *   - 07_bank_account_2026.md (口座開設サポート +6,000 THB)
 *
 * 推測値禁止 - 全数値は lib/walc-data/pricing.ts (= ナレッジ 02) 参照
 * ----------------------------------------------------------------------------
 */

import {
	AlertCircle,
	ArrowRight,
	Banknote,
	Building2,
	Calendar,
	CheckCircle2,
	Clock,
	CreditCard,
	Globe,
	Home,
	Landmark,
	MessageCircle,
	Palmtree,
	RefreshCw,
	ShieldCheck,
	UserCheck,
	Users,
	Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { formatTHB, VISA_RETIREMENT } from "@/lib/walc-data/pricing";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
	title: "リタイアメント VISA(NON-O / 50 歳以上)| WALC VISA Consulting",
	description:
		"50 歳以上の方向けタイ長期 VISA。新規 13,000 THB〜 / 更新 22,000 THB〜。残高 80 万 THB 未満でも WALC 独自の残高サポート付プランで申請可能。銀行口座開設可。",
};

// ---------------------------------------------------------------------------
// 5 プラン (pricing.ts と完全同期)
// ---------------------------------------------------------------------------
interface PlanCard {
	id: string;
	type: "new" | "renew";
	tag: string;
	title: string;
	subtitle: string;
	target: string;
	whenToUse: string[];
	highlight?: boolean;
}

const PLAN_DETAILS: PlanCard[] = [
	{
		id: "retire-new-evisa-japan",
		type: "new",
		tag: "新規 01",
		title: "日本国内 E-VISA(初期 3 ヶ月 NON-O)",
		subtitle: "渡航前に日本で取得",
		target: "渡航前に取得したい方・日本国内の手続きを希望",
		whenToUse: [
			"まずタイに入国して様子を見たい",
			"日本にいる間に書類を揃えられる",
			"残高 80 万 THB が用意できる",
		],
		highlight: true,
	},
	{
		id: "retire-new-savan",
		type: "new",
		tag: "新規 02",
		title: "ラオス・サワンナケート申請",
		subtitle: "2 泊 3 日・現地同行",
		target: "既にタイに滞在中で日本帰国不可・直接近隣国で申請したい",
		whenToUse: [
			"日本帰国の時間がない",
			"既にタイ滞在中で渡航コストを抑えたい",
			"確実に取得したい(同行サポート希望)",
		],
	},
	{
		id: "retire-new-thailand-full",
		type: "new",
		tag: "新規 03・全部込み",
		title: "タイ国内フルサポート",
		subtitle: "15 ヶ月分込み + 口座開設付",
		target: "タイ国内で全て完結したい・銀行口座も同時開設したい",
		whenToUse: [
			"日本に戻らず、タイ国内で完結したい",
			"銀行口座開設も同時にやりたい",
			"15 ヶ月分の長期サポートを希望",
		],
	},
	{
		id: "retire-renew-standard",
		type: "renew",
		tag: "更新 04",
		title: "タイ国内 1 年延長(通常更新)",
		subtitle: "残高 80 万 THB 以上の方",
		target: "既にリタイア VISA 保有・通常更新",
		whenToUse: [
			"既にリタイア VISA を保有している",
			"残高 80 万 THB 以上をキープできる",
			"毎年の更新作業を WALC に任せたい",
		],
	},
	{
		id: "retire-renew-walc-original",
		type: "renew",
		tag: "更新 05・★ WALC 独自",
		title: "残高サポート付更新",
		subtitle: "残高 80 万 THB 未満の方も更新可",
		target: "残高 80 万 THB を準備できないが更新したい",
		whenToUse: [
			"残高 80 万 THB を一時的に準備できない",
			"これまで通り 1 年更新を継続したい",
			"他社では断られたケース",
		],
		highlight: true,
	},
];

// ---------------------------------------------------------------------------
// 要件 (50 歳以上 / 残高 / 口座)
// ---------------------------------------------------------------------------
const REQUIREMENTS: { Icon: typeof UserCheck; label: string; desc: string }[] = [
	{
		Icon: UserCheck,
		label: "年齢",
		desc: "50 歳以上(取得日基準)",
	},
	{
		Icon: Wallet,
		label: "残高 / 収入",
		desc: "タイ口座残高 800,000 THB 以上、または月年金 65,000 THB 以上",
	},
	{
		Icon: CreditCard,
		label: "銀行口座",
		desc: "タイ国内銀行口座(WALC オプションで +6,000 THB で開設サポート可)",
	},
];

// ---------------------------------------------------------------------------
// ケース別ガイド
// ---------------------------------------------------------------------------
const CASE_GUIDE: {
	caseTitle: string;
	description: string;
	recommended: string;
	planId: string;
}[] = [
	{
		caseTitle: "ケース A: 渡航前に日本で取得したい",
		description: "まずタイに入国してから判断したい・日本にいる間に書類整備可能",
		recommended: "新規 01: 日本国内 E-VISA(13,000 THB)",
		planId: "retire-new-evisa-japan",
	},
	{
		caseTitle: "ケース B: 既にタイ滞在中・日本帰国は避けたい",
		description: "渡航のコストや時間を抑えつつ確実に取得したい",
		recommended: "新規 02: ラオス・サワンナケート(26,000 THB・2 泊 3 日)",
		planId: "retire-new-savan",
	},
	{
		caseTitle: "ケース C: タイ国内で全て完結・口座開設も希望",
		description: "15 ヶ月分の長期サポート + 銀行口座開設まで一括",
		recommended: "新規 03: タイ国内フルサポート(72,000 THB)",
		planId: "retire-new-thailand-full",
	},
	{
		caseTitle: "ケース D: 既に保有・通常 1 年更新",
		description: "残高 80 万 THB 以上をキープ・毎年の更新作業を WALC へ",
		recommended: "更新 04: タイ国内 1 年延長(22,000 THB)",
		planId: "retire-renew-standard",
	},
	{
		caseTitle: "ケース E: 残高 80 万 THB 未満・他社で断られた",
		description: "WALC 独自スキームで残高サポート付き更新が可能",
		recommended: "更新 05: 残高サポート付更新(31,000 THB)",
		planId: "retire-renew-walc-original",
	},
];

// ---------------------------------------------------------------------------
export default function RetirementPage() {
	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				{/* Hero */}
				<section className="bg-brand text-white relative overflow-hidden">
					{/* 背景画像 (Yosuke 提供 Adobe Stock) */}
					<div className="absolute inset-0 z-0">
						<Image
							src="/images/AdobeStock_98443741.jpeg"
							alt=""
							fill
							priority
							sizes="100vw"
							className="object-cover object-center"
							quality={85}
						/>
					</div>
					<div
						className="absolute inset-0 z-10 pointer-events-none"
						style={{
							background:
								"linear-gradient(135deg, rgba(6,24,48,0.94) 0%, rgba(11,42,74,0.86) 50%, rgba(11,42,74,0.74) 100%)",
						}}
					/>
					<div className="absolute -bottom-32 -right-32 opacity-[0.05] pointer-events-none z-20">
						<Palmtree className="w-[600px] h-[600px]" strokeWidth={0.5} />
					</div>
					<div className="relative mx-auto max-w-content px-5 md:px-8 py-20 md:py-28 z-30">
						<div className="max-w-3xl">
							<Link
								href="/#visa-types"
								className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white/90 transition-colors mb-6"
							>
								← VISA 一覧に戻る
							</Link>
							<div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 mb-5">
								<ShieldCheck className="w-3 h-3 text-amber-300" />
								<span className="text-[10px] tracking-[0.18em] uppercase text-amber-200 font-bold">
									NON-O Retirement
								</span>
							</div>
							<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
								リタイアメント VISA
								<br />
								<span className="text-amber-300 text-2xl md:text-3xl font-semibold">
									50 歳以上・銀行口座開設可
								</span>
							</h1>
							<p className="text-base md:text-lg text-white/85 leading-relaxed mb-8">
								新規取得 3 プラン・更新 2 プランから、お客様の状況に合わせて最適なプランをご提案します。
								<br className="hidden md:block" />
								残高 80 万 THB 未満でも更新可能な
								<span className="font-bold text-amber-200"> WALC 独自スキーム </span>
								もご用意しています。
							</p>
							<div className="flex flex-wrap gap-3 items-baseline mb-8">
								<div>
									<div className="text-[10px] uppercase tracking-wider text-white/60 mb-1">
										最小料金
									</div>
									<div className="text-3xl md:text-4xl font-bold text-amber-300 tabular-nums">
										13,000 THB
										<span className="text-base font-medium ml-1 opacity-80">〜</span>
									</div>
									<div className="text-xs text-white/70 mt-1">
										新規 / 日本国内 E-VISA
									</div>
								</div>
							</div>
							<a
								href="https://lin.ee/HQc9axW"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-brand-deep font-bold text-sm hover:bg-amber-300 transition-colors shadow-md"
							>
								<MessageCircle className="w-4 h-4" />
								最適プラン診断・LINE 無料相談
							</a>
						</div>
					</div>
				</section>

				{/* 要件 */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									Requirements
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight">
								取得要件
							</h2>
						</div>
						<ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
							{REQUIREMENTS.map((req) => {
								const { Icon } = req;
								return (
									<li
										key={req.label}
										className="bg-white border border-border-subtle rounded-xl p-5 md:p-6"
									>
										<div className="flex items-start gap-3 mb-2">
											<div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center shrink-0">
												<Icon className="w-5 h-5 text-brand" strokeWidth={1.8} />
											</div>
											<h3 className="text-sm font-bold text-text-secondary tracking-wide uppercase mt-1.5">
												{req.label}
											</h3>
										</div>
										<p className="text-sm md:text-base text-text-primary leading-relaxed">
											{req.desc}
										</p>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* ケース別ガイド */}
				<section className="bg-bg-primary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									Case-Based Guide
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
								あなたの状況から最適プランを選ぶ
							</h2>
							<p className="text-sm md:text-base text-text-secondary leading-relaxed">
								該当するケースをクリックすると、おすすめプランをご案内します。
								判断がつかない場合は LINE 無料相談で診断いたします。
							</p>
						</div>
						<ul className="space-y-3 md:space-y-4">
							{CASE_GUIDE.map((c, i) => (
								<li
									key={c.caseTitle}
									className="bg-white border border-border-subtle rounded-xl p-5 md:p-6 hover:border-brand/30 hover:shadow-md transition-all"
								>
									<div className="flex items-start gap-4 md:gap-6">
										<div className="text-2xl md:text-3xl font-bold text-brand/30 tabular-nums shrink-0 leading-none mt-1">
											{String.fromCharCode(65 + i)}
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="text-base md:text-lg font-bold text-text-primary mb-1">
												{c.caseTitle}
											</h3>
											<p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-3">
												{c.description}
											</p>
											<div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
												<ArrowRight className="w-3.5 h-3.5 text-amber-700" />
												<span className="text-xs md:text-sm font-bold text-amber-900">
													{c.recommended}
												</span>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* 5 プラン詳細 */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									All 5 Plans
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
								全 5 プラン詳細
							</h2>
							<p className="text-sm md:text-base text-text-secondary leading-relaxed">
								新規取得 3 プラン + 更新 2 プラン。料金はすべて WALC 対応料金(政府費込み)。
							</p>
						</div>
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{PLAN_DETAILS.map((plan) => {
								const planData = VISA_RETIREMENT.plans.find(
									(p) => p.id === plan.id,
								);
								if (!planData) return null;
								return (
									<li
										key={plan.id}
										className={`relative bg-white border rounded-xl p-6 md:p-7 transition-all ${
											plan.highlight
												? "border-amber-300 shadow-md"
												: "border-border-subtle hover:border-brand/30 hover:shadow-sm"
										}`}
									>
										{plan.highlight && (
											<div className="absolute -top-2.5 left-6 px-2.5 py-1 rounded-full bg-amber-400 text-brand-deep text-[10px] font-bold tracking-wider uppercase shadow-md">
												{plan.tag}
											</div>
										)}
										{!plan.highlight && (
											<div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase text-text-tertiary bg-bg-secondary mb-3">
												{plan.tag}
											</div>
										)}
										<h3 className="text-lg md:text-xl font-bold text-text-primary mb-1">
											{plan.title}
										</h3>
										<p className="text-xs text-text-tertiary mb-3">
											{plan.subtitle}
										</p>
										<p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-4">
											{plan.target}
										</p>
										<div className="border-t border-border-subtle pt-3 mb-4">
											<div className="text-[10px] tracking-wider uppercase text-text-tertiary font-semibold mb-1">
												こんな方におすすめ
											</div>
											<ul className="space-y-1">
												{plan.whenToUse.map((u) => (
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
										<div className="pt-3 border-t border-border-subtle flex items-baseline justify-between">
											<div>
												<div className="text-[10px] tracking-wider uppercase text-text-tertiary font-semibold">
													WALC 対応料金
												</div>
												{planData.notes && (
													<div className="text-[11px] text-text-tertiary mt-0.5">
														{planData.notes}
													</div>
												)}
											</div>
											<div className="text-xl md:text-2xl font-bold text-brand tabular-nums">
												{formatTHB(planData.walcFee)}
											</div>
										</div>
									</li>
								);
							})}
						</ul>
						<p className="text-xs text-text-tertiary mt-6 leading-relaxed">
							{VISA_RETIREMENT.bookingNote}
						</p>
					</div>
				</section>

				{/* DTV との比較を促す注意書き */}
				<section className="bg-bg-primary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-12 md:py-16">
						<div className="bg-amber-50 border border-amber-200 rounded-xl p-6 md:p-7">
							<div className="flex items-start gap-3">
								<div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
									<AlertCircle
										className="w-5 h-5 text-amber-700"
										strokeWidth={1.8}
									/>
								</div>
								<div className="flex-1">
									<h3 className="text-base md:text-lg font-bold text-text-primary mb-2">
										DTV との比較もご検討ください
									</h3>
									<p className="text-sm text-text-secondary leading-relaxed mb-3">
										リタイアメント VISA は
										<strong>毎年の更新作業</strong>が必要です。
										一方、
										<Link
											href="/visas/dtv"
											className="text-brand font-bold underline underline-offset-2 hover:text-brand-deep"
										>
											DTV(60,000 THB / 5 年マルチプル)
										</Link>
										は
										<strong> 5 年間更新不要</strong>で、滞在の自由度も同等以上です。
										銀行口座開設が必須でない場合は、
										コスト・運用負担の両面で DTV のほうがおすすめです。
									</p>
									<p className="text-xs text-text-tertiary leading-relaxed">
										※ 50 歳以上で「銀行口座が必須」の場合、リタイアメント VISA は最適な選択肢です。
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="bg-brand text-white">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mx-auto text-center">
							<h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
								最適プランを LINE で診断
							</h2>
							<p className="text-sm md:text-base text-white/80 mb-8 leading-relaxed">
								お客様の年齢・残高・滞在計画をお伺いし、
								<br className="hidden md:block" />
								WALC 担当者が最適なプランを 24 時間以内にご案内いたします。
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

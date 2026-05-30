/**
 * app/visas/ltr/page.tsx — LTR Visa 詳細ページ
 * ----------------------------------------------------------------------------
 * 業務的・信頼感ある構成 (Yosuke 指示)
 *
 * 出典 (ナレッジ):
 *   - 03_thai_visa_glossary.md §5 (LTR 制度概要・4 カテゴリ)
 *   - 02_pricing_master.md §1-5 (LTR 料金)
 *   - 06_tax_180day_rule.md §3-2 (税優遇)
 *
 * 推測値禁止 (RULE-NO-SPECULATION.md) - 全数値は上記ナレッジ準拠
 * ----------------------------------------------------------------------------
 */

import {
	Award,
	Briefcase,
	Building2,
	CheckCircle2,
	Clock,
	CreditCard,
	FileText,
	Globe2,
	Heart,
	Landmark,
	MessageCircle,
	ShieldCheck,
	TrendingUp,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { formatTHB, VISA_LTR } from "@/lib/walc-data/pricing";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
	title: "LTR Visa(Long-Term Resident)| WALC VISA Consulting",
	description:
		"10 年タイ滞在 + 外国所得非課税。高所得・富裕層・年金生活者向けの最強カテゴリ。WALC 手数料 180,000 THB で BOI endorsement から VISA 取得まで一括サポート。",
};

// ---------------------------------------------------------------------------
// LTR 4 カテゴリ
// ---------------------------------------------------------------------------
interface LtrCategory {
	id: string;
	name: string;
	subname: string;
	Icon: typeof TrendingUp;
	target: string;
	requirements: string[];
	taxBenefit: string;
	highlight?: boolean;
}

const LTR_CATEGORIES: LtrCategory[] = [
	{
		id: "wgc",
		name: "Wealthy Global Citizens",
		subname: "WGC・富裕層",
		Icon: Landmark,
		target: "個人資産 100 万 USD 以上 + タイ投資 50 万 USD 以上",
		requirements: [
			"個人名義資産 100 万 USD 以上(グローバル資産)",
			"タイ投資 50 万 USD 以上(国債 / 直接投資 / 不動産)",
			"健康保険への加入",
			"年齢制限なし",
		],
		taxBenefit: "外国所得が非課税",
		highlight: true,
	},
	{
		id: "wp",
		name: "Wealthy Pensioners",
		subname: "WP・リタイア層",
		Icon: Heart,
		target: "50 歳以上・年金等パッシブ所得 80,000 USD/年",
		requirements: [
			"50 歳以上",
			"パッシブ所得 80,000 USD/年(年金・配当・賃料・利息)",
			"代替: 40,000 USD + タイ投資 250,000 USD",
			"給与所得・役員報酬は対象外",
		],
		taxBenefit: "外国所得が非課税",
		highlight: true,
	},
	{
		id: "wftp",
		name: "Work-from-Thailand Professionals",
		subname: "WFTP・リモートワーカー",
		Icon: Briefcase,
		target: "海外の確立された大企業に勤務・年収 80,000 USD",
		requirements: [
			"海外の上場 or 大規模私企業に勤務",
			"年収 80,000 USD/年(過去 2 年間)",
			"代替: 40,000 USD + 修士号 / IP / Series A 資金調達",
			"タイでの就労は海外企業向けリモートワーク前提",
		],
		taxBenefit: "外国所得が非課税",
		highlight: true,
	},
	{
		id: "hsp",
		name: "Highly-Skilled Professionals",
		subname: "HSP・高度専門人材",
		Icon: Award,
		target: "BOI 指定 10 産業のタイ企業・政府・教育機関に勤務",
		requirements: [
			"業界: EV / バイオ / デジタル等(BOI 指定 10 産業)",
			"雇用先: タイ企業・政府・教育機関",
			"所得 80,000 USD/年",
			"代替: 40,000 USD + 修士号",
			"学界の場合は一部例外あり",
		],
		taxBenefit: "17% フラット税率",
	},
];

// ---------------------------------------------------------------------------
// 共通ベネフィット
// ---------------------------------------------------------------------------
const COMMON_BENEFITS: { Icon: typeof CheckCircle2; label: string; desc: string }[] =
	[
		{
			Icon: Clock,
			label: "10 年マルチプル",
			desc: "5 年 + 5 年延長で最大 10 年滞在可能",
		},
		{
			Icon: TrendingUp,
			label: "税優遇",
			desc: "WGC / WP / WFTP は外国所得非課税。HSP は 17% フラット",
		},
		{
			Icon: FileText,
			label: "年次レポート",
			desc: "90 日レポート不要・年 1 回の報告のみ",
		},
		{
			Icon: CreditCard,
			label: "銀行口座開設可能",
			desc: "2026/4 制度変更後も開設可・コンシェルジュサポート",
		},
		{
			Icon: Users,
			label: "扶養家族 最大 4 名",
			desc: "配偶者 + 20 歳未満の子 4 名まで同時取得",
		},
		{
			Icon: Globe2,
			label: "空港ファストトラック",
			desc: "VIP 入国レーンを常時利用可能",
		},
	];

// ---------------------------------------------------------------------------
// 申請プロセス
// ---------------------------------------------------------------------------
const PROCESS_STEPS: { step: string; title: string; desc: string }[] = [
	{
		step: "01",
		title: "事前ヒアリング・要件チェック",
		desc: "4 カテゴリ (WGC / WP / WFTP / HSP) のいずれに該当するかを WALC 専門スタッフが診断。書類リストアップ。",
	},
	{
		step: "02",
		title: "BOI Endorsement 申請",
		desc: "BOI (タイ投資委員会) に対する事前承認申請。WALC が公証翻訳エージェント経由で書類整備 + 申請代行。",
	},
	{
		step: "03",
		title: "BOI 承認 → VISA 申請",
		desc: "BOI 承認後 2 ヶ月以内に One Bangkok の BOI 窓口、または海外大使館での e-Visa 経由で VISA を取得。",
	},
	{
		step: "04",
		title: "VISA 取得・運用開始",
		desc: "VISA 受領後、空港ファストトラック発行・銀行口座開設サポート・年次レポート運用まで継続伴走。",
	},
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LtrPage() {
	const walcFeePlan = VISA_LTR.plans.find((p) => p.id === "ltr-walc-fee");
	const govFeePlan = VISA_LTR.plans.find((p) => p.id === "ltr-gov-fee");
	const dependentPlan = VISA_LTR.plans.find((p) => p.id === "ltr-dependent");
	const dwpPlan = VISA_LTR.plans.find((p) => p.id === "ltr-dwp");

	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				{/* Hero */}
				<section className="bg-brand text-white relative overflow-hidden">
					{/* 背景画像 (Yosuke 提供 Adobe Stock) */}
					<div className="absolute inset-0 z-0">
						<Image
							src="/images/AdobeStock_494541408.jpeg"
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
						<Award className="w-[600px] h-[600px]" strokeWidth={0.5} />
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
									Long-Term Resident Visa
								</span>
							</div>
							<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
								LTR Visa
								<br />
								<span className="text-amber-300 text-2xl md:text-3xl font-semibold">
									10 年滞在 + 外国所得非課税の最強カテゴリ
								</span>
							</h1>
							<p className="text-base md:text-lg text-white/85 leading-relaxed mb-8">
								高所得者・富裕層・年金生活者のための最長期 VISA。
								税優遇 + 年次レポート + 銀行口座開設可で
								長期居住に必要なメリットを 1 枚で実現します。
								<br className="hidden md:block" />
								要件は高めですが、該当する方には他のどの VISA よりもお勧めです。
							</p>
							<div className="flex flex-wrap gap-3">
								<a
									href="https://lin.ee/HQc9axW"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-brand-deep font-bold text-sm hover:bg-amber-300 transition-colors shadow-md"
								>
									<MessageCircle className="w-4 h-4" />
									要件チェック・無料相談 (LINE)
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* 共通ベネフィット */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									Common Benefits
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight">
								全カテゴリ共通の優遇措置
							</h2>
						</div>
						<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
							{COMMON_BENEFITS.map((b) => {
								const { Icon } = b;
								return (
									<li
										key={b.label}
										className="bg-white border border-border-subtle rounded-xl p-5 hover:border-brand/30 hover:shadow-sm transition-all"
									>
										<div className="flex items-start gap-3">
											<div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center shrink-0">
												<Icon className="w-5 h-5 text-brand" strokeWidth={1.8} />
											</div>
											<div className="flex-1 min-w-0">
												<h3 className="text-sm md:text-base font-bold text-text-primary mb-1">
													{b.label}
												</h3>
												<p className="text-xs md:text-sm text-text-secondary leading-relaxed">
													{b.desc}
												</p>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* 4 カテゴリ */}
				<section className="bg-bg-primary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									4 Categories
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
								4 つのカテゴリから該当を選択
							</h2>
							<p className="text-sm md:text-base text-text-secondary leading-relaxed">
								いずれか 1 つを満たせば LTR 取得対象となります。
								要件にご不安があれば LINE 無料相談で診断いたします。
							</p>
						</div>
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{LTR_CATEGORIES.map((cat) => {
								const { Icon } = cat;
								return (
									<li
										key={cat.id}
										className="bg-white border border-border-subtle rounded-xl p-6 md:p-7 hover:border-brand/30 hover:shadow-md transition-all"
									>
										<div className="flex items-start justify-between gap-4 mb-4">
											<div className="flex items-start gap-3">
												<div className="w-12 h-12 rounded-lg bg-brand/5 flex items-center justify-center shrink-0">
													<Icon className="w-6 h-6 text-brand" strokeWidth={1.8} />
												</div>
												<div className="flex-1 min-w-0">
													<h3 className="text-lg md:text-xl font-bold text-text-primary">
														{cat.name}
													</h3>
													<p className="text-xs text-text-tertiary mt-0.5">
														{cat.subname}
													</p>
												</div>
											</div>
											<div className="text-right shrink-0">
												<div className="text-[10px] tracking-wider uppercase text-text-tertiary font-semibold">
													税優遇
												</div>
												<div className="text-xs font-bold text-brand mt-0.5">
													{cat.taxBenefit}
												</div>
											</div>
										</div>
										<p className="text-sm text-text-secondary mb-4 leading-relaxed">
											{cat.target}
										</p>
										<ul className="space-y-1.5 border-t border-border-subtle pt-4">
											{cat.requirements.map((req) => (
												<li
													key={req}
													className="flex items-start gap-2 text-xs md:text-sm text-text-secondary leading-relaxed"
												>
													<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
													<span>{req}</span>
												</li>
											))}
										</ul>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* 料金 */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mb-10">
							<div className="inline-flex items-center gap-2.5 mb-3">
								<span className="w-8 h-px bg-accent-blue" />
								<span className="text-[11px] tracking-[0.22em] uppercase text-accent-blue font-semibold">
									Pricing
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight">
								料金
							</h2>
						</div>
						<div className="bg-white border border-border-subtle rounded-xl overflow-hidden">
							<table className="w-full">
								<tbody className="divide-y divide-border-subtle">
									<PriceRow
										label={walcFeePlan?.label ?? ""}
										amount={walcFeePlan?.walcFee ?? null}
										notes={walcFeePlan?.notes}
										highlight
									/>
									<PriceRow
										label={govFeePlan?.label ?? ""}
										amount={govFeePlan?.walcFee ?? null}
									/>
									<PriceRow
										label={dependentPlan?.label ?? ""}
										amount={dependentPlan?.walcFee ?? null}
									/>
									<PriceRow
										label={dwpPlan?.label ?? ""}
										amount={dwpPlan?.walcFee ?? null}
									/>
								</tbody>
							</table>
						</div>
						<p className="text-xs text-text-tertiary mt-4 leading-relaxed">
							{VISA_LTR.bookingNote}
						</p>
					</div>
				</section>

				{/* プロセス */}
				<section className="bg-bg-primary">
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

				{/* CTA */}
				<section className="bg-brand text-white">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
						<div className="max-w-2xl mx-auto text-center">
							<div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 mb-5">
								<Building2 className="w-3 h-3 text-amber-300" />
								<span className="text-[10px] tracking-[0.18em] uppercase text-amber-200 font-bold">
									LTR Inquiry
								</span>
							</div>
							<h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
								該当しそうかどうか、まずチェックさせてください。
							</h2>
							<p className="text-sm md:text-base text-white/80 mb-8 leading-relaxed">
								LTR は要件が複雑なため、お客様の状況を伺った上で
								最適カテゴリと申請ルートを WALC 専門スタッフがご案内します。
							</p>
							<div className="flex flex-wrap justify-center gap-3">
								<a
									href="https://lin.ee/HQc9axW"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-brand-deep font-bold text-sm hover:bg-amber-300 transition-colors shadow-md"
								>
									<MessageCircle className="w-4 h-4" />
									LINE で無料相談
								</a>
								<Link
									href="/#trouble-support"
									className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/25 text-white/90 font-semibold text-sm hover:bg-white/5 transition-colors"
								>
									他の VISA を見る
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

// ---------------------------------------------------------------------------
function PriceRow({
	label,
	amount,
	notes,
	highlight = false,
}: {
	label: string;
	amount: number | null;
	notes?: string;
	highlight?: boolean;
}) {
	return (
		<tr className={highlight ? "bg-amber-50/50" : ""}>
			<td className="px-5 md:px-7 py-4 text-sm md:text-base font-medium text-text-primary">
				<div>{label}</div>
				{notes && (
					<div className="text-[11px] text-text-tertiary mt-0.5">{notes}</div>
				)}
			</td>
			<td className="px-5 md:px-7 py-4 text-right text-sm md:text-lg font-bold text-brand tabular-nums whitespace-nowrap">
				{formatTHB(amount)}
			</td>
		</tr>
	);
}

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

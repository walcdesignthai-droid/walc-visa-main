/**
 * components/lp/TroubleSupport.tsx — 困った時の WALC サポート
 * ----------------------------------------------------------------------------
 * オーバーステイ / イミグレ拒否 / アラート保有 / ビザラン疲れ等の
 * VISA トラブル全般を WALC がサポートすることを目立つブロックで訴求。
 *
 * 出典: walc-studio/knowledge/
 *   - 04_immigration_practice.md (イミグレ実務・アラート制度)
 *   - 05_overstay_practice.md (オーバーステイ罰金・入国禁止)
 * ----------------------------------------------------------------------------
 */

import {
	AlertTriangle,
	ArrowRight,
	Clock,
	MessageCircle,
	Plane,
	Shield,
	ShieldAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TroubleItem {
	Icon: typeof AlertTriangle;
	title: string;
	desc: string;
}

const TROUBLES: TroubleItem[] = [
	{
		Icon: AlertTriangle,
		title: "オーバーステイで困っている",
		desc: "1 日でも超えると罰金 500 THB/日。自主出頭でペナルティ大幅軽減。出国前後の戦略立案までサポート。",
	},
	{
		Icon: ShieldAlert,
		title: "イミグレで止められた / 拒否歴あり",
		desc: "アラート保有・別室送り経験のある方も対応可。空港イミグレサポートで安全に入国。",
	},
	{
		Icon: Plane,
		title: "ビザランを 2 回以上繰り返している",
		desc: "100 日前後の累計滞在で次回入国拒否リスク大。DTV 取得への切替を含めて最適解をご提案。",
	},
	{
		Icon: Clock,
		title: "30 日延長が拒否された",
		desc: "却下歴のある方も DTV / リタイア / Privilege 等への移行で長期解決が可能です。",
	},
];

export function TroubleSupport() {
	return (
		<section
			id="trouble-support"
			className="bg-gradient-to-br from-amber-50 via-white to-rose-50/40 border-y border-amber-100/60"
		>
			<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-24">
				{/* セクションヘッダー */}
				<div className="text-center mb-10 md:mb-12">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/70 mb-5">
						<Shield className="w-3.5 h-3.5 text-amber-700" />
						<span className="text-[11px] tracking-[0.18em] uppercase text-amber-800 font-bold">
							Trouble Support
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
						どんな VISA の悩みも、まず WALC へ。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
						オーバーステイ・イミグレ拒否・アラート保有・ビザラン疲れ——
						<br className="hidden md:block" />
						どんな状況でも、現地法人 6 年・累計 200 名以上の対応実績で
						<br className="hidden md:block" />
						必ず解決策をご提案します。
					</p>
				</div>

				{/* トラブル例カード */}
				<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
					{TROUBLES.map((trouble) => {
						const { Icon } = trouble;
						return (
							<li
								key={trouble.title}
								className="bg-white/80 backdrop-blur-sm border border-amber-100 rounded-xl p-5 md:p-6 hover:border-amber-300 hover:shadow-md transition-all"
							>
								<div className="flex items-start gap-4">
									<div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
										<Icon
											className="w-5 h-5 text-amber-700"
											strokeWidth={1.8}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="text-sm md:text-base font-bold text-text-primary mb-1">
											{trouble.title}
										</h3>
										<p className="text-xs md:text-sm text-text-secondary leading-relaxed">
											{trouble.desc}
										</p>
									</div>
								</div>
							</li>
						);
					})}
				</ul>

				{/* メイン訴求 + CTA */}
				<div className="relative bg-brand text-white rounded-2xl p-7 md:p-10 shadow-xl overflow-hidden">
					{/* 装飾画像 (うるさくない程度に・opacity 控えめ) */}
					<div className="absolute inset-0 z-0 opacity-25">
						<Image
							src="/images/AdobeStock_281457367.jpeg"
							alt=""
							fill
							sizes="(max-width: 768px) 100vw, 1200px"
							className="object-cover object-center"
							quality={75}
						/>
					</div>
					<div
						className="absolute inset-0 z-10 pointer-events-none"
						style={{
							background:
								"linear-gradient(135deg, rgba(11,42,74,0.92) 0%, rgba(11,42,74,0.82) 100%)",
						}}
					/>
					<div className="relative z-20">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
						<div className="lg:col-span-2">
							<div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 mb-3">
								<span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
								<span className="text-[10px] tracking-[0.18em] uppercase text-amber-200 font-bold">
									24h LINE 即レス
								</span>
							</div>
							<h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
								迷ったら、まず LINE で状況をお聞かせください。
							</h3>
							<p className="text-sm md:text-base text-white/80 leading-relaxed">
								緊急性が高い場合も、まず LINE でご相談いただければ
								最短ルートで対応方針をご案内します。
								<br className="hidden md:block" />
								AI コンシェルジュが 24 時間即レス・必要に応じてスタッフへ繋ぎます。
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<a
								href="https://lin.ee/HQc9axW"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-brand-deep font-bold text-sm md:text-base hover:bg-amber-300 transition-colors shadow-md"
							>
								<MessageCircle className="w-4 h-4" />
								LINE で相談する
								<ArrowRight className="w-4 h-4" />
							</a>
							<Link
								href="#concierge"
								className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/25 text-white/90 font-semibold text-sm hover:bg-white/5 transition-colors"
							>
								AI コンシェルジュに聞く
							</Link>
						</div>
					</div>
					</div>
				</div>

				{/* 補助テキスト */}
				<p className="text-xs text-text-tertiary text-center mt-6 leading-relaxed">
					※ オーバーステイの場合、1 日でも早く動くことが何より大切です。隠れて滞在を続けると逮捕リスクが高まり、入国禁止期間も長くなります。
				</p>
			</div>
		</section>
	);
}

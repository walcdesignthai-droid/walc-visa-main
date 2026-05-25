/**
 * app/page.tsx — walc-visa.online トップページ (Sprint 0 最小版)
 * ----------------------------------------------------------------------------
 * Sprint 0 では「Coming Soon」Hero のみ。
 * Sprint 1 以降で各セクションを追加していく。
 * ----------------------------------------------------------------------------
 */

import { ArrowRight, Sparkles } from "lucide-react";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { getLineAddUrl } from "@/lib/walc-links";
import { getDtvAcquisitionStats } from "@/lib/walc-stats";

export default function HomePage() {
	const lineUrl = getLineAddUrl();
	const stats = getDtvAcquisitionStats();

	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				{/* Hero */}
				<section className="relative bg-brand text-text-on-dark overflow-hidden">
					<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-32">
						<div className="max-w-3xl">
							<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs tracking-wider uppercase mb-6">
								<Sparkles className="w-3.5 h-3.5" />
								WALC VISA Consulting
							</div>

							<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
								タイで生きる選択を、
								<br />
								<span className="text-white/90">最短・確実に。</span>
							</h1>

							<p className="text-base md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
								DTV・Thailand Privilege・LTR・リタイアメント等、
								<br className="hidden md:block" />
								全VISA種別に対応する専門コンサルティング。
								<br />
								取得実績
								<span className="font-bold text-white">
									{stats.walcTotalAcquired}+
								</span>{" "}
								件・専用CRMで一気通貫管理。
							</p>

							<div className="flex flex-col sm:flex-row gap-3 mb-12">
								<Button
									asChild
									variant="line"
									size="lg"
									className="w-full sm:w-auto"
								>
									<a href={lineUrl} target="_blank" rel="noopener noreferrer">
										LINE で無料相談
										<ArrowRight className="w-4 h-4" />
									</a>
								</Button>
								<Button
									asChild
									size="lg"
									className="w-full sm:w-auto bg-white/10 text-white border border-white/30 hover:bg-white/20"
								>
									<a
										href="https://dtv.walc-visa.online"
										target="_blank"
										rel="noopener noreferrer"
									>
										DTV 専用LPを見る
									</a>
								</Button>
							</div>

							<div className="grid grid-cols-3 gap-4 max-w-xl pt-8 border-t border-white/15">
								<div>
									<div className="text-3xl md:text-4xl font-bold tabular-nums">
										{stats.walcTotalAcquired}+
									</div>
									<div className="text-xs text-white/60 mt-1">
										VISA 取得実績
									</div>
								</div>
								<div>
									<div className="text-3xl md:text-4xl font-bold tabular-nums">
										{stats.acquired}
									</div>
									<div className="text-xs text-white/60 mt-1">DTV 取得件数</div>
								</div>
								<div>
									<div className="text-3xl md:text-4xl font-bold tabular-nums">
										100<span className="text-xl">%</span>
									</div>
									<div className="text-xs text-white/60 mt-1">DTV 取得率</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Coming Soon notice */}
				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-24 text-center">
						<p className="text-xs tracking-widest uppercase text-text-tertiary mb-3">
							Coming Soon
						</p>
						<h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
							メインサイト全面リニューアル中
						</h2>
						<p className="text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
							全 VISA 種別の料金・実績・申込フォームを順次公開予定です。
							<br />
							お急ぎの方は LINE 公式アカウントよりご相談ください。
						</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

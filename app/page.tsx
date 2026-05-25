/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.1 (2026-05-25) — Hero 刷新 + TrustStrip 追加。
 *   Coming Soon は細い帯に縮小し、追加セクションは Sprint 1 後半で。
 * ----------------------------------------------------------------------------
 */

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/lp/Hero";
import { TrustStrip } from "@/components/lp/TrustStrip";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				<Hero />
				<TrustStrip />

				{/* Sprint 1 後半で追加予定:
				 *   - VISA 種別 6 カード
				 *   - WALC を選ぶ 3 つの理由
				 *   - 取得プロセス
				 *   - お客様の声
				 *   - 代表者メッセージ
				 *   - 料金一覧
				 *   - FAQ
				 *   - CTA 帯
				 */}

				{/* Coming Soon: 細い帯のみ */}
				<section className="bg-bg-secondary border-y border-border-subtle">
					<div className="mx-auto max-w-content px-5 md:px-8 py-10 md:py-14">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div>
								<p className="text-[10px] tracking-widest uppercase text-text-tertiary font-semibold mb-1.5">
									Coming Soon
								</p>
								<h2 className="text-lg md:text-xl font-bold text-text-primary">
									全 VISA 種別の料金・申込フォームを順次公開
								</h2>
								<p className="text-sm text-text-secondary mt-1.5">
									お急ぎの方は LINE 公式アカウントよりご相談ください。
								</p>
							</div>
							<a
								href="https://dtv.walc-visa.online"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:text-accent-blue-bright transition-colors"
							>
								DTV 専用LPを見る →
							</a>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

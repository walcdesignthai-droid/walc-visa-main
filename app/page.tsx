/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.2 (2026-05-25) — Sprint 1 で本体セクション 5 件追加。
 *
 * 構成:
 *   1. Hero (バンコク夜景 + 浮かぶ実績カード)
 *   2. TrustStrip (実績ストリップ 5 項目)
 *   3. VisaTypes (VISA 6 種別カード)
 *   4. WhyWalc (選ばれる 3 つの理由)
 *   5. Process (取得プロセス 4 ステップ)
 *   6. Founder (代表者メッセージ)
 *   7. FinalCta (最終 CTA 帯)
 *
 * Sprint 2 で追加予定:
 *   - お客様の声 (Testimonials)
 *   - 料金一覧 (Pricing — 法人系含む)
 *   - FAQ
 *   - AI VISA Concierge (右下フローティング)
 * ----------------------------------------------------------------------------
 */

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { FinalCta } from "@/components/lp/FinalCta";
import { Founder } from "@/components/lp/Founder";
import { Hero } from "@/components/lp/Hero";
import { Process } from "@/components/lp/Process";
import { TrustStrip } from "@/components/lp/TrustStrip";
import { VisaTypes } from "@/components/lp/VisaTypes";
import { WhyWalc } from "@/components/lp/WhyWalc";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				<Hero />
				<TrustStrip />
				<VisaTypes />
				<WhyWalc />
				<Process />
				<Founder />
				<FinalCta />
			</main>
			<Footer />
		</>
	);
}

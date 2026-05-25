/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.3 (2026-05-25) — 信頼セクション強化:
 *   - Hero キャッチコピー差替
 *   - Founder 名修正(洋介→陽介)
 *   - CompanyProof(タイ法人実在証明)を WhyWalc と Process の間に挿入
 * ----------------------------------------------------------------------------
 */

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { CompanyProof } from "@/components/lp/CompanyProof";
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
				<CompanyProof />
				<Process />
				<Founder />
				<FinalCta />
			</main>
			<Footer />
		</>
	);
}

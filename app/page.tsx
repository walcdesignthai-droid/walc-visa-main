/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.5 (2026-05-25) — CompanyProof → CompanyInfo (簡素化)
 * ----------------------------------------------------------------------------
 */

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { CompanyInfo } from "@/components/lp/CompanyInfo";
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
				<CompanyInfo />
				<Process />
				<Founder />
				<FinalCta />
			</main>
			<Footer />
		</>
	);
}

/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.4 (2026-05-25) — AI VISA Concierge を右下にマウント
 * v1.5 (2026-05-26) — TroubleSupport セクション追加 (オーバーステイ/拒否対応訴求)
 * ----------------------------------------------------------------------------
 */

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { CompanyInfo } from "@/components/lp/CompanyInfo";
import { ConsultBlock } from "@/components/lp/ConsultBlock";
import { FinalCta } from "@/components/lp/FinalCta";
import { Founder } from "@/components/lp/Founder";
import { Hero } from "@/components/lp/Hero";
import { Process } from "@/components/lp/Process";
import { TroubleSupport } from "@/components/lp/TroubleSupport";
import { TrustStrip } from "@/components/lp/TrustStrip";
import { VisaTypes } from "@/components/lp/VisaTypes";
import { WhyWalc } from "@/components/lp/WhyWalc";
import { ConciergeBubble } from "@/components/concierge/ConciergeBubble";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				<Hero />
				<TrustStrip />
				<VisaTypes />
				<TroubleSupport />
				<ConsultBlock />
				<WhyWalc />
				<Process />
				<Founder />
				<FinalCta />
				{/* 会社概要は最下部 (業務的・信頼感) - Yosuke 指示 2026-05-26 */}
				<CompanyInfo />
			</main>
			<Footer />
			<ConciergeBubble />
		</>
	);
}

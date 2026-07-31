/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.4 (2026-05-25) — AI VISA Concierge を右下にマウント
 * v1.5 (2026-05-26) — TroubleSupport セクション追加 (オーバーステイ/拒否対応訴求)
 * ----------------------------------------------------------------------------
 */

import { ConciergeBubble } from "@/components/concierge/ConciergeBubble";
import { CompanyInfo } from "@/components/lp/CompanyInfo";
import { ConsultBlock } from "@/components/lp/ConsultBlock";
import { CorporateEntry } from "@/components/lp/CorporateEntry";
import { FinalCta } from "@/components/lp/FinalCta";
import { Founder } from "@/components/lp/Founder";
import { Hero } from "@/components/lp/Hero";
import { Process } from "@/components/lp/Process";
import { TroubleSupport } from "@/components/lp/TroubleSupport";
import { TrustStrip } from "@/components/lp/TrustStrip";
import { VisaTypes } from "@/components/lp/VisaTypes";
import { WhyWalc } from "@/components/lp/WhyWalc";
import { MainStructuredData } from "@/components/seo/StructuredData";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getDtvPublicContent } from "@/lib/walc-data/public-content";

export default async function HomePage() {
	const content = await getDtvPublicContent();

	return (
		<>
			<MainStructuredData content={content} />
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				<Hero />
				<TrustStrip />
				<VisaTypes content={content} />
				<TroubleSupport />
				<ConsultBlock />
				<WhyWalc />
				<Process />
				{/* 法人向け導線 (walc-visa.online → /corporate の起点) */}
				<CorporateEntry />
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

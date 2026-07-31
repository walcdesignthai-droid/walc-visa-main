/**
 * app/corporate/beyond-setup/page.tsx — 設立後の事業立ち上げ(WALC DESIGN 領域)
 * ----------------------------------------------------------------------------
 * 🔴 必ず「WALC DESIGN が担当」と主語を明示する(handoff §7)。
 *    VISA 事業とデザイン事業は別ブランドであり、同一視されると両方の輪郭が
 *    ぼやける。本ページは「グループ会社が担当する」ことを明確に伝える。
 * 🔴 Organization ノードは作らず #organization を @id 参照。
 * ----------------------------------------------------------------------------
 */

import type { Metadata } from "next";
import { CorporateCta } from "@/components/corporate/CorporateCta";
import { CorporateHero } from "@/components/corporate/CorporateHero";
import { CorporateSection } from "@/components/corporate/CorporateSection";
import { CrossSiteNav } from "@/components/corporate/CrossSiteNav";
import { ScopeList } from "@/components/corporate/ScopeList";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import {
	BEYOND_SETUP_DETAIL,
	BEYOND_SETUP_SERVICES,
	CORPORATE_ACCOUNTING_NOTE,
} from "@/lib/walc-data/corporate";
import { SITE_URLS } from "@/lib/walc-data/site-map";

const ORIGIN = "https://walc-visa.online";
const PAGE_URL = `${ORIGIN}/corporate/beyond-setup`;
const ORGANIZATION_ID = `${ORIGIN}/#organization`;

export const metadata: Metadata = {
	title: "設立後の事業立ち上げ｜WEB・マーケティング・社内の仕組み",
	description:
		"タイで法人をつくった後に必要になる、WEBサイト制作、SEO / MEO / GEO / LLMO、アプリ開発、顧客管理システムの導入。グループの WALC DESIGN が担当します。",
	keywords: [
		"タイ WEB制作",
		"タイ マーケティング",
		"タイ SEO",
		"タイ 業務効率化",
		"WALC DESIGN",
	],
	alternates: {
		canonical: "/corporate/beyond-setup",
		languages: {
			ja: "/corporate/beyond-setup",
			"x-default": "/corporate/beyond-setup",
		},
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/corporate/beyond-setup",
		siteName: "WALC VISA Consulting",
		title: "設立後の事業立ち上げ | WALC VISA",
		description:
			"WEBサイト、マーケティング、社内の仕組み。グループの WALC DESIGN が担当します。",
	},
};

const serviceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${PAGE_URL}#service`,
	name: "設立後の事業立ち上げ支援(WALC DESIGN 提供)",
	serviceType: [...BEYOND_SETUP_SERVICES],
	url: PAGE_URL,
	description:
		"タイでの法人設立後に必要となるWEBサイト制作、マーケティング、業務システムの導入。グループ会社の WALC DESIGN が担当します。",
	provider: { "@id": ORGANIZATION_ID },
	areaServed: { "@type": "Country", name: "Thailand" },
	audience: { "@type": "BusinessAudience" },
};

export default function BeyondSetupPage() {
	return (
		<>
			<JsonLdScript data={serviceSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "法人のお客様", url: `${ORIGIN}/corporate` },
					{ name: "設立後の事業立ち上げ", url: PAGE_URL },
				]}
			/>

			<CorporateHero
				englishLabel="Beyond Setup"
				titleLines={["登記が終わっても、", "まだ誰も来ません。"]}
				lead={[
					"会社ができた次に必要になるのは、見つけてもらう仕組みと、日々の運用が回る仕組みです。",
					"WEBサイト制作、マーケティング、業務システムは、グループの WALC DESIGN が担当します。",
				]}
				subCta={{ href: "/corporate/flow", label: "ご依頼の流れを見る" }}
			/>

			<CorporateSection
				id="services"
				englishLabel="WALC DESIGN"
				title="WALC DESIGN が担当する領域"
				lead="設立の手続きと同じ担当者に相談できるため、事業の背景を説明し直す必要がありません。"
				tinted
			>
				<ScopeList items={BEYOND_SETUP_DETAIL} />
			</CorporateSection>

			<CorporateSection
				id="brand"
				title="ブランドの位置づけ"
				lead="法人設立・Work Permit・法人口座開設は WALC VISA Consulting が、WEB・マーケティング・業務システムは WALC DESIGN が担当します。どちらも WALC DESIGN Co., Ltd. が運営しています。"
			>
				<a
					href={SITE_URLS.walcDesign}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block text-[14px] font-semibold text-accent-blue underline decoration-accent-blue/25 underline-offset-4 transition-colors hover:text-accent-blue-deep"
				>
					WALC DESIGN
				</a>
			</CorporateSection>

			<CorporateSection id="accounting" title="設立後の会計について" tinted>
				<p className="text-[14px] leading-[1.95] text-text-secondary">
					{CORPORATE_ACCOUNTING_NOTE}
				</p>
			</CorporateSection>

			<CorporateCta heading="設立と一緒に、その先も設計できます。" />
			<CrossSiteNav />
		</>
	);
}

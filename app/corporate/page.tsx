/**
 * app/corporate/page.tsx — 法人向けトップ
 * ----------------------------------------------------------------------------
 * 🔴 Organization ノードを新規作成しない。既存 #organization を @id 参照するだけ
 *    (別組織として誤認されるため。handoff §8-1)。
 * 🔴 「ワンストップ」を使わない。範囲の広さは具体名詞で示す。
 * 🔴 事例 / お客様の声の空セクションを置かない。
 * ----------------------------------------------------------------------------
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CorporateCta } from "@/components/corporate/CorporateCta";
import { CorporateHero } from "@/components/corporate/CorporateHero";
import { CorporateSection } from "@/components/corporate/CorporateSection";
import { CrossSiteNav } from "@/components/corporate/CrossSiteNav";
import { ScopeList } from "@/components/corporate/ScopeList";
import { TimelineNotice } from "@/components/corporate/TimelineNotice";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import {
	BEYOND_SETUP_SERVICES,
	CORPORATE_ACCOUNTING_NOTE,
	CORPORATE_LICENSE_NOTE,
	CORPORATE_NOT_PROVIDED,
	CORPORATE_PAGES,
	CORPORATE_SCOPE,
	CORPORATE_SCOPE_DETAIL,
} from "@/lib/walc-data/corporate";

const ORIGIN = "https://walc-visa.online";
const PAGE_URL = `${ORIGIN}/corporate`;
const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;

export const metadata: Metadata = {
	title: "法人向け｜タイ法人設立・Work Permit・法人口座開設",
	description:
		"タイでの法人設立、Work Permit、Non-Bビザ、法人銀行口座開設を日本語で。登記の完了をゴールにせず、設立後の事業立ち上げまで見据えてご相談を受けています。",
	keywords: [
		"タイ 法人設立",
		"タイ 会社設立",
		"タイ 進出",
		"タイ Work Permit",
		"タイ 法人口座",
		"Non-B ビザ 法人",
	],
	alternates: {
		canonical: "/corporate",
		languages: { ja: "/corporate", "x-default": "/corporate" },
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/corporate",
		siteName: "WALC VISA Consulting",
		title: "法人向け｜タイ法人設立・Work Permit・法人口座開設 | WALC VISA",
		description:
			"タイで会社をつくるところから、事業が動き出すまでを、一社で。法人設立・Work Permit・法人口座開設をご相談いただけます。",
	},
	twitter: {
		card: "summary_large_image",
		title: "法人向け｜タイ法人設立・Work Permit・法人口座開設 | WALC VISA",
		description:
			"法人設立、Work Permit、法人口座開設。そして設立後の事業立ち上げまで。",
	},
};

/**
 * Organization は @id 参照のみ(新規ノードを作らない)。
 * hasOfferCatalog は BEYOND_SETUP_SERVICES から生成 = SOT と drift しない。
 */
const corporateSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebPage",
			"@id": `${PAGE_URL}#webpage`,
			url: PAGE_URL,
			name: "法人向け｜タイ法人設立・Work Permit・法人口座開設｜WALC VISA Consulting",
			isPartOf: { "@id": WEBSITE_ID },
			about: { "@id": `${PAGE_URL}#service` },
			inLanguage: "ja",
		},
		{
			"@type": "Service",
			"@id": `${PAGE_URL}#service`,
			name: "タイ法人設立・就労ビザ・法人口座開設の総合支援",
			provider: { "@id": ORGANIZATION_ID },
			areaServed: { "@type": "Country", name: "Thailand" },
			audience: { "@type": "BusinessAudience" },
			serviceType: [...CORPORATE_SCOPE],
			hasOfferCatalog: {
				"@type": "OfferCatalog",
				name: "設立後の事業立ち上げ支援(オプション・WALC DESIGN 提供)",
				itemListElement: BEYOND_SETUP_SERVICES.map((service) => ({
					"@type": "Offer",
					itemOffered: { "@type": "Service", name: service },
				})),
			},
		},
	],
};

export default function CorporatePage() {
	return (
		<>
			<JsonLdScript data={corporateSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "法人のお客様", url: PAGE_URL },
				]}
			/>

			<CorporateHero
				englishLabel="Thailand Market Entry"
				titleLines={[
					"タイで会社をつくるところから、",
					"事業が動き出すまでを、一社で。",
				]}
				lead={[
					"法人設立、Work Permit、法人口座開設。そして、WEBサイトも、マーケティングも、社内の仕組みも。",
					"登記の完了を、ゴールにしません。",
				]}
				subCta={{ href: "/corporate/flow", label: "ご依頼の流れを見る" }}
			/>

			<CorporateSection
				id="scope"
				englishLabel="Scope"
				title="対応する手続き"
				lead="タイでの法人設立と、そこで働くための許可、そして事業に使う口座。着手から運用開始までを分けずに担当します。"
				tinted
			>
				<ScopeList items={CORPORATE_SCOPE_DETAIL} />
			</CorporateSection>

			<CorporateSection id="license" title={CORPORATE_LICENSE_NOTE.heading}>
				<p className="text-[14px] leading-[1.95] text-text-secondary">
					{CORPORATE_LICENSE_NOTE.body}
				</p>
				<p className="mt-6 text-[12px] leading-[1.9] text-text-secondary">
					例:{CORPORATE_LICENSE_NOTE.examples.join("、")}
				</p>
			</CorporateSection>

			<CorporateSection id="not-provided" title="対応しないこと" tinted>
				<ul className="space-y-3">
					{CORPORATE_NOT_PROVIDED.map((item) => (
						<li
							key={item}
							className="text-[14px] leading-[1.95] text-text-primary"
						>
							{item}
						</li>
					))}
				</ul>
				<p className="mt-6 text-[12px] leading-[1.9] text-text-secondary">
					対応できないことは、ご相談の最初にお伝えします。
				</p>
			</CorporateSection>

			<CorporateSection
				id="timeline"
				englishLabel="Timeline"
				title="どれくらいの期間がかかるか"
			>
				<TimelineNotice />
			</CorporateSection>

			<CorporateSection
				id="beyond"
				title="設立の、その先について"
				lead="会社をつくった後に必要になるのは、集客と、日々の運用の仕組みです。ここはグループの WALC DESIGN が担当します。"
				tinted
			>
				<ul className="space-y-3">
					{BEYOND_SETUP_SERVICES.map((service) => (
						<li
							key={service}
							className="flex gap-3 text-[14px] leading-[1.95] text-text-secondary"
						>
							<span
								className="mt-[0.85em] block h-px w-3 shrink-0 bg-border-strong"
								aria-hidden="true"
							/>
							<span>{service}</span>
						</li>
					))}
				</ul>
				<Link
					href="/corporate/beyond-setup"
					className="mt-8 inline-block text-[14px] font-semibold text-accent-blue underline decoration-accent-blue/25 underline-offset-4 transition-colors hover:text-accent-blue-deep"
				>
					設立後の事業立ち上げについて
				</Link>
			</CorporateSection>

			<CorporateSection id="accounting" title="設立後の会計について">
				<p className="text-[14px] leading-[1.95] text-text-secondary">
					{CORPORATE_ACCOUNTING_NOTE}
				</p>
			</CorporateSection>

			<CorporateSection
				id="pages"
				englishLabel="Details"
				title="手続きごとの詳細"
				tinted
			>
				<ScopeList
					items={CORPORATE_PAGES.map((page) => ({
						term: page.label,
						description: page.summary,
						href: page.path,
					}))}
				/>
			</CorporateSection>

			<CorporateCta heading="まず、何が必要かをお伝えします。" />
			<CrossSiteNav />
		</>
	);
}

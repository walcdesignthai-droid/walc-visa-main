/**
 * app/corporate/bank-account/page.tsx — 法人銀行口座開設
 * ----------------------------------------------------------------------------
 * 🔴 推測ゼロ: 銀行名・必要書類・所要日数は銀行/支店で運用が異なるため断定しない。
 *    「事前に条件を確認したうえで同行する」という提供価値の書き方に留める。
 * 🔴 Organization ノードは作らず #organization を @id 参照。
 * ----------------------------------------------------------------------------
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CorporateCta } from "@/components/corporate/CorporateCta";
import { CorporateHero } from "@/components/corporate/CorporateHero";
import { CorporateSection } from "@/components/corporate/CorporateSection";
import { CrossSiteNav } from "@/components/corporate/CrossSiteNav";
import { ScopeList } from "@/components/corporate/ScopeList";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { CORPORATE_ACCOUNTING_NOTE } from "@/lib/walc-data/corporate";

const ORIGIN = "https://walc-visa.online";
const PAGE_URL = `${ORIGIN}/corporate/bank-account`;
const ORGANIZATION_ID = `${ORIGIN}/#organization`;

export const metadata: Metadata = {
	title: "タイ法人銀行口座の開設サポート",
	description:
		"タイで設立した法人名義の銀行口座開設をサポート。銀行・支店ごとに求められる書類と面談の運用が異なるため、事前に条件を確認したうえで同行します。",
	keywords: [
		"タイ 法人口座",
		"タイ 銀行口座 法人",
		"タイ 法人 銀行",
		"タイ 会社 口座開設",
	],
	alternates: {
		canonical: "/corporate/bank-account",
		languages: {
			ja: "/corporate/bank-account",
			"x-default": "/corporate/bank-account",
		},
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/corporate/bank-account",
		siteName: "WALC VISA Consulting",
		title: "タイ法人銀行口座の開設サポート | WALC VISA",
		description:
			"銀行・支店ごとに運用が異なるため、事前に条件を確認したうえで同行します。",
	},
};

const BANK_SCOPE = [
	{
		term: "事前の条件確認",
		description:
			"銀行と支店によって、求められる書類、来店が必要な役員の範囲、面談の進め方が異なります。着手前に確認し、二度手間を避けます。",
	},
	{
		term: "書類の準備",
		description:
			"登記関係の書類と、役員・署名権者に関する書類を揃えます。翻訳や認証が必要になる場合は、その手配も含めて進めます。",
	},
	{
		term: "来店への同行",
		description:
			"窓口でのやり取りに同行します。日本語とタイ語の間で説明が食い違わないようにするための立ち会いです。",
	},
	{
		term: "開設後の設定",
		description:
			"ネットバンキングや署名権者の設定など、実際に使い始めるまでに必要な手続きを確認します。",
	},
] as const;

const serviceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${PAGE_URL}#service`,
	name: "タイ法人銀行口座開設サポート",
	serviceType: "Thailand Corporate Bank Account Opening Support",
	url: PAGE_URL,
	description:
		"タイで設立した法人名義の銀行口座開設について、事前の条件確認、書類準備、来店同行を支援します。",
	provider: { "@id": ORGANIZATION_ID },
	areaServed: { "@type": "Country", name: "Thailand" },
	audience: { "@type": "BusinessAudience" },
};

export default function BankAccountPage() {
	return (
		<>
			<JsonLdScript data={serviceSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "法人のお客様", url: `${ORIGIN}/corporate` },
					{ name: "法人銀行口座開設", url: PAGE_URL },
				]}
			/>

			<CorporateHero
				englishLabel="Corporate Bank Account"
				titleLines={["口座がなければ、", "事業は動き出しません。"]}
				lead={[
					"法人口座の開設は、銀行と支店によって求められるものが変わります。同じ書類を持って行っても、窓口で判断が分かれることがあります。",
					"事前に条件を確認したうえで、来店に同行します。",
				]}
				subCta={{ href: "/corporate/flow", label: "ご依頼の流れを見る" }}
			/>

			<CorporateSection
				id="scope"
				englishLabel="Scope"
				title="対応する範囲"
				tinted
			>
				<ScopeList items={BANK_SCOPE} />
			</CorporateSection>

			<CorporateSection
				id="notice"
				title="銀行の運用について"
				lead="必要書類、来店が必要な方の範囲、開設までの日数は、銀行・支店・事業内容によって異なります。一般論としてお伝えできる部分と、実際に確認しないと分からない部分があるため、案件ごとに確認してからご案内します。"
			/>

			<CorporateSection
				id="setup"
				title="これから法人をつくる場合"
				lead="法人口座は、登記が完了していることが前提になります。設立からご検討の場合は、口座開設まで見据えた設計をご相談ください。"
				tinted
			>
				<Link
					href="/corporate/company-setup"
					className="inline-block text-[14px] font-semibold text-accent-blue underline decoration-accent-blue/25 underline-offset-4 transition-colors hover:text-accent-blue-deep"
				>
					タイ法人設立・会社登記について
				</Link>
			</CorporateSection>

			<CorporateSection id="accounting" title="設立後の会計について">
				<p className="text-[14px] leading-[1.95] text-text-secondary">
					{CORPORATE_ACCOUNTING_NOTE}
				</p>
			</CorporateSection>

			<CorporateCta heading="開設できる状態かどうかから、確認します。" />
			<CrossSiteNav />
		</>
	);
}

/**
 * app/corporate/company-setup/page.tsx — タイ法人設立・会社登記
 * ----------------------------------------------------------------------------
 * 業種別ライセンスは本ページ内のセクションとして内包する
 * (専用ページ /corporate/license は作らない = 要望ベースの調査であるため)。
 * 🔴 Organization ノードは作らず #organization を @id 参照。
 * ----------------------------------------------------------------------------
 */

import type { Metadata } from "next";
import { CorporateCta } from "@/components/corporate/CorporateCta";
import { CorporateHero } from "@/components/corporate/CorporateHero";
import { CorporateSection } from "@/components/corporate/CorporateSection";
import { CrossSiteNav } from "@/components/corporate/CrossSiteNav";
import { ScopeList } from "@/components/corporate/ScopeList";
import { TimelineNotice } from "@/components/corporate/TimelineNotice";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import {
	CORPORATE_ACCOUNTING_NOTE,
	CORPORATE_LICENSE_NOTE,
	CORPORATE_NOT_PROVIDED,
} from "@/lib/walc-data/corporate";

const ORIGIN = "https://walc-visa.online";
const PAGE_URL = `${ORIGIN}/corporate/company-setup`;
const ORGANIZATION_ID = `${ORIGIN}/#organization`;

export const metadata: Metadata = {
	title: "タイ法人設立・会社登記",
	description:
		"タイでの法人設立と会社登記を日本語で。社名の予約から定款、商務省への登記、VAT・所在地登記まで。業種ごとに必要となる許認可の調査にも対応します。",
	keywords: [
		"タイ 法人設立",
		"タイ 会社設立",
		"タイ 会社登記",
		"タイ 現地法人",
		"タイ VAT 登録",
	],
	alternates: {
		canonical: "/corporate/company-setup",
		languages: {
			ja: "/corporate/company-setup",
			"x-default": "/corporate/company-setup",
		},
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/corporate/company-setup",
		siteName: "WALC VISA Consulting",
		title: "タイ法人設立・会社登記 | WALC VISA",
		description:
			"社名の予約から商務省への登記、VAT・所在地登記まで。業種ごとの許認可も調査します。",
	},
};

const SETUP_STEPS = [
	{
		term: "社名の予約",
		description:
			"使用できる社名かを確認し、予約します。似た社名が既にある場合は候補を出し直すことになるため、複数案をご用意いただきます。",
	},
	{
		term: "定款・発起人",
		description:
			"事業目的、資本金、株主構成を確定し、定款を作成します。タイ人株主が必要になる構成の場合は、その手配についてもご相談ください。",
	},
	{
		term: "商務省への登記",
		description:
			"必要書類が揃った状態で商務省(DBD)へ登記します。書類が完全に整っていれば、登記そのものは短期間で完了します。",
	},
	{
		term: "VAT登録・所在地登記",
		description:
			"事業に応じた税務登録と、オフィス所在地の登記。登記そのものより、こちらに時間がかかることが多い部分です。",
	},
] as const;

const serviceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${PAGE_URL}#service`,
	name: "タイ法人設立・会社登記サポート",
	serviceType: "Thailand Company Registration Support",
	url: PAGE_URL,
	description:
		"タイでの法人設立と会社登記。社名予約、定款作成、商務省への登記、VAT・所在地登記までを日本語で支援します。",
	provider: { "@id": ORGANIZATION_ID },
	areaServed: { "@type": "Country", name: "Thailand" },
	audience: { "@type": "BusinessAudience" },
};

export default function CompanySetupPage() {
	return (
		<>
			<JsonLdScript data={serviceSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "法人のお客様", url: `${ORIGIN}/corporate` },
					{ name: "タイ法人設立・会社登記", url: PAGE_URL },
				]}
			/>

			<CorporateHero
				englishLabel="Company Registration"
				titleLines={["タイに会社をつくる、", "最初の手続きから。"]}
				lead={[
					"社名の予約、定款の作成、商務省への登記、そして税務と所在地の登記。順序を守らないと後戻りが発生する手続きです。",
					"どこまでをご自身で進めるかも含めて、最初にご相談ください。",
				]}
				subCta={{ href: "/corporate/flow", label: "ご依頼の流れを見る" }}
			/>

			<CorporateSection
				id="steps"
				englishLabel="Steps"
				title="設立までに通る手続き"
				tinted
			>
				<ScopeList items={SETUP_STEPS} />
			</CorporateSection>

			<CorporateSection id="license" title={CORPORATE_LICENSE_NOTE.heading}>
				<p className="text-[14px] leading-[1.95] text-text-secondary">
					{CORPORATE_LICENSE_NOTE.body}
				</p>
				<p className="mt-6 text-[12px] leading-[1.9] text-text-secondary">
					例:{CORPORATE_LICENSE_NOTE.examples.join("、")}
				</p>
				<p className="mt-3 text-[12px] leading-[1.9] text-text-secondary">
					許認可が事業の前提になる場合は、設立の設計そのものが変わります。業種は最初にお知らせください。
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
			</CorporateSection>

			<CorporateSection
				id="timeline"
				englishLabel="Timeline"
				title="どれくらいの期間がかかるか"
			>
				<TimelineNotice />
			</CorporateSection>

			<CorporateSection id="accounting" title="設立後の会計について" tinted>
				<p className="text-[14px] leading-[1.95] text-text-secondary">
					{CORPORATE_ACCOUNTING_NOTE}
				</p>
			</CorporateSection>

			<CorporateCta heading="設立の設計から、ご相談ください。" />
			<CrossSiteNav />
		</>
	);
}

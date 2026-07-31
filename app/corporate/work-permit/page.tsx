/**
 * app/corporate/work-permit/page.tsx — Work Permit / Non-B ビザ(法人視点)
 * ----------------------------------------------------------------------------
 * 個人向けの /visas/non-b-work-permit(申請者本人の視点・必要書類の詳細)とは
 * 役割を分ける。本ページは「会社が従業員・駐在員の分を手配する」視点。
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
import { SITE_URLS } from "@/lib/walc-data/site-map";

const ORIGIN = "https://walc-visa.online";
const PAGE_URL = `${ORIGIN}/corporate/work-permit`;
const ORGANIZATION_ID = `${ORIGIN}/#organization`;

export const metadata: Metadata = {
	title: "法人向け Work Permit・Non-Bビザ手配",
	description:
		"タイで従業員・駐在員を正式に雇用するための Work Permit と Non-B ビザ。会社側の書類と申請者側の書類を分けて整理し、取得の順序に沿って手配します。",
	keywords: [
		"タイ Work Permit 法人",
		"タイ 就労ビザ 会社",
		"Non-B ビザ 駐在員",
		"タイ 従業員 雇用",
		"タイ 労働許可",
	],
	alternates: {
		canonical: "/corporate/work-permit",
		languages: {
			ja: "/corporate/work-permit",
			"x-default": "/corporate/work-permit",
		},
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/corporate/work-permit",
		siteName: "WALC VISA Consulting",
		title: "法人向け Work Permit・Non-Bビザ手配 | WALC VISA",
		description:
			"会社側の書類と申請者側の書類を分けて整理し、取得の順序に沿って手配します。",
	},
};

const PERMIT_SCOPE = [
	{
		term: "会社側の書類",
		description:
			"登記、税務、タイ人雇用の状況、事業許可。従業員の人数分をまとめて手配する場合も、会社側の書類は共通で使えます。",
	},
	{
		term: "申請者側の書類",
		description:
			"パスポート、学歴、職歴、健康診断。ご本人にご準備いただくものは、確定したリストにしてお渡しします。",
	},
	{
		term: "取得の順序",
		description:
			"Non-B ビザと Work Permit は別の手続きで、順序を誤ると取り直しになります。現在の在留資格と入国予定日から逆算して組みます。",
	},
	{
		term: "更新・変更",
		description:
			"Work Permit は雇用主と職種に紐づきます。転職、職務変更、勤務地変更があった場合は手続きが必要です。",
	},
] as const;

const serviceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${PAGE_URL}#service`,
	name: "法人向け Work Permit・Non-Immigrant B ビザ手配",
	serviceType: "Thailand Work Permit and Non-B Visa Support for Employers",
	url: PAGE_URL,
	description:
		"タイで従業員・駐在員を雇用する企業向けに、Work Permit と Non-B ビザの必要書類確認・申請準備・取得順序の設計を支援します。",
	provider: { "@id": ORGANIZATION_ID },
	areaServed: { "@type": "Country", name: "Thailand" },
	audience: { "@type": "BusinessAudience" },
};

export default function CorporateWorkPermitPage() {
	return (
		<>
			<JsonLdScript data={serviceSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "法人のお客様", url: `${ORIGIN}/corporate` },
					{ name: "Work Permit / Non-Bビザ", url: PAGE_URL },
				]}
			/>

			<CorporateHero
				englishLabel="Work Permit & Non-B"
				titleLines={["従業員が働けるようにするまでが、", "雇用の手続きです。"]}
				lead={[
					"Non-B ビザは滞在の許可、Work Permit は働くための許可。2つは別の手続きで、取得の順序が結果を左右します。",
					"会社側の書類と、ご本人にご用意いただく書類を分けて整理してから着手します。",
				]}
				subCta={{ href: "/corporate/flow", label: "ご依頼の流れを見る" }}
			/>

			<CorporateSection
				id="scope"
				englishLabel="Scope"
				title="手配する範囲"
				tinted
			>
				<ScopeList items={PERMIT_SCOPE} />
			</CorporateSection>

			<CorporateSection
				id="documents"
				title="必要書類の詳細について"
				lead="申請者本人の視点での必要書類は、個人向けページで一覧を公開しています。会社としてまとめて手配される場合も、内容の確認にお使いいただけます。"
			>
				<div className="space-y-4">
					<Link
						href="/visas/non-b-work-permit"
						className="block text-[14px] font-semibold text-accent-blue underline decoration-accent-blue/25 underline-offset-4 transition-colors hover:text-accent-blue-deep"
					>
						Non-B / Work Permit の必要書類一覧(個人向け)
					</Link>
					<a
						href={SITE_URLS.guideBusiness}
						target="_blank"
						rel="noopener noreferrer"
						className="block text-[14px] font-semibold text-accent-blue underline decoration-accent-blue/25 underline-offset-4 transition-colors hover:text-accent-blue-deep"
					>
						日本語・タイ語併記の詳細ガイド
					</a>
				</div>
			</CorporateSection>

			<CorporateSection
				id="setup"
				title="これから法人をつくる場合"
				lead="Work Permit は、受け入れる会社があってはじめて申請できます。法人設立からご検討の場合は、設立の設計段階からご相談ください。"
				tinted
			>
				<Link
					href="/corporate/company-setup"
					className="inline-block text-[14px] font-semibold text-accent-blue underline decoration-accent-blue/25 underline-offset-4 transition-colors hover:text-accent-blue-deep"
				>
					タイ法人設立・会社登記について
				</Link>
			</CorporateSection>

			<CorporateCta heading="何人分を、いつまでに。ここからご相談ください。" />
			<CrossSiteNav />
		</>
	);
}

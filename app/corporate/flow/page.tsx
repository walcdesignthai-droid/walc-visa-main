/**
 * app/corporate/flow/page.tsx — ご依頼の流れ・必要書類・期間
 * ----------------------------------------------------------------------------
 * 🔴 料金の金額は書かない(CORPORATE_PRICING_NOTE のみ)。
 * 🔴 期間は必ず二段(値 + 律速要因)で見せる。
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
	CORPORATE_DOCUMENTS,
	CORPORATE_FLOW,
	CORPORATE_PRICING_NOTE,
} from "@/lib/walc-data/corporate";

const ORIGIN = "https://walc-visa.online";
const PAGE_URL = `${ORIGIN}/corporate/flow`;
const ORGANIZATION_ID = `${ORIGIN}/#organization`;

export const metadata: Metadata = {
	title: "ご依頼の流れ・必要書類・期間｜法人向け",
	description:
		"タイでの法人設立・Work Permit・法人口座開設について、ご相談から運用開始までの流れ、日本側・タイ側でご準備いただく書類、期間の目安をご案内します。",
	keywords: [
		"タイ 法人設立 流れ",
		"タイ 会社設立 必要書類",
		"タイ 法人設立 期間",
		"タイ 進出 手続き",
	],
	alternates: {
		canonical: "/corporate/flow",
		languages: { ja: "/corporate/flow", "x-default": "/corporate/flow" },
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/corporate/flow",
		siteName: "WALC VISA Consulting",
		title: "ご依頼の流れ・必要書類・期間 | WALC VISA",
		description:
			"ご相談から運用開始までの5段階と、日本側・タイ側でご準備いただく書類。",
	},
};

const howToSchema = {
	"@context": "https://schema.org",
	"@type": "HowTo",
	"@id": `${PAGE_URL}#howto`,
	name: "タイでの法人設立・就労許可・法人口座開設をWALCに依頼する流れ",
	description:
		"ご相談から必要な手続きの整理、書類準備、登記・申請、口座開設・運用開始までの流れ。",
	url: PAGE_URL,
	step: CORPORATE_FLOW.map((item, index) => ({
		"@type": "HowToStep",
		position: index + 1,
		name: item.title,
		text: item.description,
	})),
};

const webPageSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	"@id": `${PAGE_URL}#webpage`,
	url: PAGE_URL,
	name: "ご依頼の流れ・必要書類・期間｜法人向け｜WALC VISA Consulting",
	isPartOf: { "@id": `${ORIGIN}/#website` },
	about: { "@id": `${PAGE_URL}#howto` },
	publisher: { "@id": ORGANIZATION_ID },
	inLanguage: "ja",
};

export default function CorporateFlowPage() {
	return (
		<>
			<JsonLdScript data={webPageSchema} />
			<JsonLdScript data={howToSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "法人のお客様", url: `${ORIGIN}/corporate` },
					{ name: "ご依頼の流れ", url: PAGE_URL },
				]}
			/>

			<CorporateHero
				englishLabel="How We Work"
				titleLines={["何が必要かを先にお伝えしてから、", "着手します。"]}
				lead={[
					"タイでの手続きは、案件によって必要なものが大きく変わります。だからこそ、見積りの前に「何をやるか」を確定させます。",
					"見積り前に費用が発生することはありません。",
				]}
			/>

			<CorporateSection
				id="flow"
				englishLabel="Process"
				title="ご相談から運用開始まで"
				tinted
			>
				<dl className="border-t border-border-subtle">
					{CORPORATE_FLOW.map((item) => (
						<div
							key={item.step}
							className="grid gap-2 border-b border-border-subtle py-7 md:grid-cols-[minmax(0,13rem)_1fr] md:gap-8"
						>
							<dt className="text-[15px] font-semibold leading-[1.7] text-text-primary md:text-[16px]">
								<span className="mr-3 text-[12px] font-semibold tabular-nums text-brand">
									{item.step}
								</span>
								{item.title}
							</dt>
							<dd className="text-[14px] leading-[1.95] text-text-secondary">
								{item.description}
							</dd>
						</div>
					))}
				</dl>
			</CorporateSection>

			<CorporateSection
				id="documents"
				englishLabel="Documents"
				title="ご準備いただく書類"
				lead="確定したリストは、必要な手続きが決まった段階でお渡しします。ここでは大まかな内訳をご案内します。"
			>
				<ScopeList items={CORPORATE_DOCUMENTS} />
			</CorporateSection>

			<CorporateSection
				id="timeline"
				englishLabel="Timeline"
				title="どれくらいの期間がかかるか"
				tinted
			>
				<TimelineNotice />
			</CorporateSection>

			<CorporateSection id="pricing" title="料金について">
				<p className="text-[14px] leading-[1.95] text-text-secondary">
					{CORPORATE_PRICING_NOTE}
				</p>
			</CorporateSection>

			<CorporateCta
				heading="ご相談は、事業の内容だけで大丈夫です。"
				showFlowLink={false}
			/>
			<CrossSiteNav />
		</>
	);
}

/**
 * app/author/yosuke-onodera/page.tsx — 著者 / 監修者ページ(WI-031 E-E-A-T)
 * ----------------------------------------------------------------------------
 * YMYL(タイ VISA = 生活・お金に直結)領域の信頼性(E-E-A-T)を担保するため、
 * 運営責任者を可視 + 機械可読(Person JSON-LD)で前面に出す。
 *
 * 🔴 推測ゼロ: 記載事実はすべて canonical(CANONICAL-OWNER-PROFILE.md /
 *    Founder.tsx)由来の確定値のみ。保有資格など未確定の項目は記載しない。
 *    値の SOT は lib/walc-data/eeat.ts に集約。
 * ----------------------------------------------------------------------------
 */

import { Building2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import {
	buildPersonSchema,
	WALC_AUTHOR,
	WALC_ORGANIZATION,
} from "@/lib/walc-data/eeat";

export const metadata: Metadata = {
	title: "運営責任者 小野寺 陽介 | WALC VISA Consulting",
	description:
		"WALC VISA Consulting 運営責任者・小野寺 陽介(WALC DESIGN Co., Ltd. 代表取締役)のプロフィール。タイ長期 VISA の取得・運用コンサルティングを統括。",
	alternates: { canonical: "/author/yosuke-onodera" },
};

const orgFacts: Array<{
	Icon: typeof Building2;
	label: string;
	value: string;
}> = [
	{ Icon: Building2, label: "運営法人", value: WALC_ORGANIZATION.legalName },
	{
		Icon: MapPin,
		label: "所在地",
		value: `${WALC_ORGANIZATION.address.streetAddress}, ${WALC_ORGANIZATION.address.addressRegion} ${WALC_ORGANIZATION.address.postalCode}`,
	},
	{ Icon: Phone, label: "電話", value: WALC_ORGANIZATION.telephoneDisplay },
	{ Icon: Mail, label: "メール", value: WALC_ORGANIZATION.email },
];

export default function AuthorPage() {
	const personSchema = buildPersonSchema();

	return (
		<>
			<JsonLdScript data={personSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: "https://walc-visa.online/" },
					{
						name: "運営責任者 小野寺 陽介",
						url: WALC_AUTHOR.url,
					},
				]}
			/>
			<Header />
			<main>
				<section className="bg-brand text-white">
					<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-24">
						<p className="text-[11px] tracking-[0.22em] uppercase text-amber-300 font-semibold">
							Author / 運営責任者
						</p>
						<h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
							{WALC_AUTHOR.name}
						</h1>
						<p className="mt-2 text-sm text-white/70">
							{WALC_AUTHOR.givenName} {WALC_AUTHOR.familyName}
						</p>
						<p className="mt-1 text-base text-white/80">
							{WALC_AUTHOR.jobTitle}
						</p>
					</div>
				</section>

				<section>
					<div className="mx-auto max-w-content px-5 md:px-8 py-14 md:py-20">
						<div className="max-w-3xl space-y-10">
							<div>
								<h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
									<ShieldCheck className="w-5 h-5 text-brand" />
									プロフィール
								</h2>
								<p className="mt-4 text-base leading-relaxed text-text-secondary">
									{WALC_AUTHOR.bioJa}
								</p>
							</div>

							<div>
								<h2 className="text-xl font-bold tracking-tight">専門領域</h2>
								<ul className="mt-4 flex flex-wrap gap-2">
									{WALC_AUTHOR.knowsAbout.map((topic) => (
										<li
											key={topic}
											className="rounded-full border border-border-subtle bg-bg-secondary px-3 py-1 text-sm text-text-secondary"
										>
											{topic}
										</li>
									))}
								</ul>
							</div>

							<div>
								<h2 className="text-xl font-bold tracking-tight">運営者情報</h2>
								<dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
									{orgFacts.map(({ Icon, label, value }) => (
										<div
											key={label}
											className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-secondary p-4"
										>
											<Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
											<div>
												<dt className="text-xs uppercase tracking-wider text-text-tertiary">
													{label}
												</dt>
												<dd className="mt-0.5 text-sm font-medium text-text-primary">
													{value}
												</dd>
											</div>
										</div>
									))}
								</dl>
							</div>

							<div className="border-t border-border-subtle pt-8">
								<Link
									href="/"
									className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
								>
									WALC VISA Consulting トップへ
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

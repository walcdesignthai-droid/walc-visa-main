import {
	ArrowRight,
	BookOpenCheck,
	Building2,
	ExternalLink,
	FileCheck2,
	Globe2,
	LockKeyhole,
	MessageCircle,
	ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import {
	OFFICIAL_SITE_DIRECTORY,
	type OfficialSiteEntry,
	SITE_URLS,
} from "@/lib/walc-data/site-map";

const ORIGIN = "https://walc-visa.online";
const OFFICIAL_SITES_URL = "https://walc-visa.online/official-sites";
const OFFICIAL_SITES_TITLE = "WALC VISAの公式サイト一覧";
const OFFICIAL_SITES_DESCRIPTION =
	"WALC VISA公式サイト、法人・事業支援サイト、DTV専門サイト、公開ガイド、お客様専用ポータルの役割と正しい利用先をご案内します。";
const OFFICIAL_SITES_SOCIAL_IMAGE = "/images/AdobeStock_494541408.jpeg";

export const metadata: Metadata = {
	title: OFFICIAL_SITES_TITLE,
	description: OFFICIAL_SITES_DESCRIPTION,
	alternates: { canonical: OFFICIAL_SITES_URL },
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: OFFICIAL_SITES_URL,
		siteName: "WALC VISA Consulting",
		title: `${OFFICIAL_SITES_TITLE} | WALC VISA Consulting`,
		description: OFFICIAL_SITES_DESCRIPTION,
		images: [
			{
				url: OFFICIAL_SITES_SOCIAL_IMAGE,
				width: 1200,
				height: 630,
				alt: "WALC VISAの公式サイト一覧",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${OFFICIAL_SITES_TITLE} | WALC VISA Consulting`,
		description: OFFICIAL_SITES_DESCRIPTION,
		images: [OFFICIAL_SITES_SOCIAL_IMAGE],
	},
};

const SITE_ICONS = {
	main: ShieldCheck,
	corporate: Building2,
	dtv: FileCheck2,
	guide: BookOpenCheck,
	portal: LockKeyhole,
} satisfies Record<OfficialSiteEntry["id"], typeof ShieldCheck>;

const directoryJsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebPage",
			"@id": `${ORIGIN}/official-sites#webpage`,
			url: `${ORIGIN}/official-sites`,
			name: "WALC VISAの公式サイト一覧",
			description:
				"WALC VISAが運営・案内する公式サイトの役割と利用対象を明示するページ。",
			isPartOf: { "@id": `${ORIGIN}/#website` },
			about: { "@id": `${ORIGIN}/#organization` },
		},
		{
			"@type": "ItemList",
			"@id": `${ORIGIN}/official-sites#directory`,
			name: "WALC VISA 公式サイト体系",
			numberOfItems: OFFICIAL_SITE_DIRECTORY.length,
			itemListElement: OFFICIAL_SITE_DIRECTORY.map((site, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: site.name,
				url: site.url,
				description: site.role,
			})),
		},
	],
};

export default function OfficialSitesPage() {
	return (
		<>
			<JsonLdScript data={directoryJsonLd} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{
						name: "WALC VISAの公式サイト一覧",
						url: `${ORIGIN}/official-sites`,
					},
				]}
			/>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				<section className="relative overflow-hidden bg-brand-deep text-white">
					<div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_18%_15%,rgba(245,187,61,0.42),transparent_28%),radial-gradient(circle_at_84%_80%,rgba(59,130,246,0.3),transparent_32%)]" />
					<div className="relative mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
						<div className="max-w-4xl">
							<div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5">
								<Globe2 className="h-3.5 w-3.5 text-amber-300" />
								<span className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200">
									Official Directory
								</span>
							</div>
							<h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
								WALC VISAの
								<br />
								<span className="text-amber-300">公式サイト一覧</span>
							</h1>
							<p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
								WALCの情報は目的別に複数のサイトへ分かれています。
								このページでは、それぞれの役割と正しい利用先を公式にご案内します。
							</p>
							<div className="mt-8 flex flex-wrap gap-3 text-xs text-white/70">
								<span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
									運営・サービスの第一正本
								</span>
								<span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
									法人・事業支援
								</span>
								<span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
									DTV専門情報
								</span>
								<span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
									申請者向け実務ガイド
								</span>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
						<div className="mb-10 max-w-3xl">
							<p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
								Choose the right destination
							</p>
							<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
								目的に合う公式サイトを選ぶ
							</h2>
							<p className="mt-4 text-sm leading-relaxed text-text-secondary md:text-base">
								料金・対応範囲・運営情報はWALC VISA公式サイトを第一正本とし、
								各専門サイトとガイドは目的別の詳しい情報を提供します。
							</p>
						</div>

						<div className="grid gap-5 md:grid-cols-2">
							{OFFICIAL_SITE_DIRECTORY.map((site, index) => {
								const Icon = SITE_ICONS[site.id];
								const featured = site.id === "main";

								return (
									<article
										key={site.id}
										className={`group relative overflow-hidden rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-0.5 md:p-7 ${
											featured
												? "border-brand bg-brand-deep text-white md:col-span-2"
												: "border-border-subtle bg-white text-text-primary"
										}`}
									>
										<div
											className={`absolute right-5 top-4 text-6xl font-black tabular-nums ${
												featured ? "text-white/[0.05]" : "text-brand/[0.05]"
											}`}
										>
											{String(index + 1).padStart(2, "0")}
										</div>
										<div className="relative">
											<div className="flex items-start justify-between gap-4">
												<div
													className={`flex h-12 w-12 items-center justify-center rounded-xl ${
														featured
															? "bg-amber-300 text-brand-deep"
															: "bg-brand/8 text-brand"
													}`}
												>
													<Icon className="h-6 w-6" />
												</div>
												<span
													className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${
														site.publicInformation
															? featured
																? "bg-white/10 text-white/80"
																: "bg-brand/7 text-brand"
															: "bg-amber-100 text-amber-900"
													}`}
												>
													{site.badge}
												</span>
											</div>
											<h3 className="mt-5 text-xl font-bold tracking-tight md:text-2xl">
												{site.name}
											</h3>
											<p
												className={`mt-3 text-sm leading-relaxed ${
													featured ? "text-white/75" : "text-text-secondary"
												}`}
											>
												{site.role}
											</p>
											<div
												className={`mt-5 rounded-xl border px-4 py-3 ${
													featured
														? "border-white/10 bg-white/[0.04]"
														: "border-border-subtle bg-bg-secondary"
												}`}
											>
												<p
													className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
														featured ? "text-amber-300" : "text-brand"
													}`}
												>
													このサイトを使う方
												</p>
												<p
													className={`mt-1.5 text-sm ${
														featured ? "text-white/80" : "text-text-secondary"
													}`}
												>
													{site.audience}
												</p>
											</div>
											<a
												href={site.url}
												target={site.id === "main" ? undefined : "_blank"}
												rel={
													site.id === "main" ? undefined : "noopener noreferrer"
												}
												className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${
													featured
														? "text-amber-300 hover:text-amber-200"
														: "text-brand hover:text-brand-deep"
												}`}
											>
												{site.id === "portal"
													? "お客様専用画面を開く"
													: "公式サイトを開く"}
												{site.id === "main" ? (
													<ArrowRight className="h-4 w-4" />
												) : (
													<ExternalLink className="h-4 w-4" />
												)}
											</a>
										</div>
									</article>
								);
							})}
						</div>
					</div>
				</section>

				<section className="border-y border-border-subtle bg-white">
					<div className="mx-auto grid max-w-content gap-8 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-20">
						<div>
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
								<Building2 className="h-6 w-6" />
							</div>
							<h2 className="mt-5 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
								情報の正しさを守るために
							</h2>
						</div>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="rounded-xl border border-border-subtle bg-bg-secondary p-5">
								<p className="text-sm font-bold text-text-primary">公開情報</p>
								<p className="mt-2 text-sm leading-relaxed text-text-secondary">
									サービス内容・公式見解・運営情報は、本家と各専門サイトの公開ページで確認できます。
								</p>
							</div>
							<div className="rounded-xl border border-border-subtle bg-bg-secondary p-5">
								<p className="text-sm font-bold text-text-primary">
									お客様情報
								</p>
								<p className="mt-2 text-sm leading-relaxed text-text-secondary">
									申込後の進捗や追加書類は、お客様専用ポータルでのみ取り扱います。
								</p>
							</div>
							<div className="rounded-xl border border-border-subtle bg-bg-secondary p-5 sm:col-span-2">
								<p className="text-sm font-bold text-text-primary">
									外部サイトの古い情報について
								</p>
								<p className="mt-2 text-sm leading-relaxed text-text-secondary">
									検索結果や外部掲載の情報は更新に時間がかかる場合があります。
									料金・受付状況・必要書類は、必ず公式サイトまたはLINEで最新情報をご確認ください。
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-brand-deep text-white">
					<div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center md:px-8 md:py-16">
						<div>
							<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
								Still unsure?
							</p>
							<h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
								どの窓口を使うか迷ったら、LINEへ。
							</h2>
							<p className="mt-2 text-sm text-white/65">
								現在の状況を確認し、適切な公式ページと相談窓口をご案内します。
							</p>
						</div>
						<a
							href={SITE_URLS.social.line}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#06C755] px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
						>
							<MessageCircle className="h-5 w-5" />
							LINEで無料相談
							<ArrowRight className="h-4 w-4" />
						</a>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

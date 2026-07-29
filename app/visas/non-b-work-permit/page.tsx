import {
	ArrowRight,
	BadgeCheck,
	BookOpenCheck,
	BriefcaseBusiness,
	Check,
	CircleAlert,
	ClipboardCheck,
	ExternalLink,
	FileCheck2,
	Landmark,
	MessageCircle,
	ShieldCheck,
	UserRoundCheck,
	UsersRound,
	Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import {
	APPLICANT_DOCUMENTS,
	COMPANY_DOCUMENTS,
	NON_B_DOCUMENT_NOTICE,
	NON_B_FAQ,
	NON_B_PRIMARY_SOURCES,
	NON_B_PROCESS,
	type NonBRequiredDocument,
	WORK_PERMIT_DOCUMENTS,
} from "@/lib/walc-data/non-b-work-permit";
import { SITE_URLS } from "@/lib/walc-data/site-map";

const PAGE_URL = "https://walc-visa.online/visas/non-b-work-permit";

export const metadata: Metadata = {
	title: "タイ Non-Bビザ・Work Permit取得サポート",
	description:
		"タイで働くためのNon-Immigrant BとWork Permitを日本語でサポート。申請者書類、会社側の基本12書類、就労許可の追加書類と申請前の確認フローを公開しています。",
	keywords: [
		"タイ Non-B",
		"タイ ワークパーミット",
		"Thailand Work Permit",
		"タイ 就労ビザ",
		"Non-Immigrant B",
		"タイ ビジネスビザ",
	],
	alternates: {
		canonical: "/visas/non-b-work-permit",
		languages: {
			ja: "/visas/non-b-work-permit",
			"x-default": "/visas/non-b-work-permit",
		},
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/visas/non-b-work-permit",
		title: "タイ Non-Bビザ・Work Permit取得サポート | WALC VISA",
		description:
			"会社と申請者の状況確認から、必要書類の整理、申請準備まで。タイで正式に働くための手続きを日本語で伴走します。",
		siteName: "WALC VISA Consulting",
	},
	twitter: {
		card: "summary_large_image",
		title: "タイ Non-Bビザ・Work Permit取得サポート | WALC VISA",
		description:
			"Non-BとWork Permitの違い、必要書類、申請前の確認フローを日本語で解説。",
	},
};

const serviceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${PAGE_URL}#service`,
	name: "タイ Non-Immigrant Bビザ・Work Permit取得サポート",
	serviceType:
		"Thailand Non-Immigrant B Visa and Work Permit Application Support",
	url: PAGE_URL,
	description:
		"タイで就労する方と雇用企業に向けた、Non-Immigrant BビザおよびWork Permitの必要書類確認・申請準備サポート。",
	areaServed: {
		"@type": "Country",
		name: "Thailand",
	},
	audience: {
		"@type": "Audience",
		audienceType: "タイで就労する外国人と雇用企業",
	},
	provider: {
		"@type": "Organization",
		"@id": "https://walc-visa.online/#organization",
		name: "WALC VISA Consulting",
		url: "https://walc-visa.online",
	},
	availableChannel: {
		"@type": "ServiceChannel",
		serviceUrl: SITE_URLS.social.line,
		availableLanguage: ["ja", "th"],
	},
};

const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: NON_B_FAQ.map((item) => ({
		"@type": "Question",
		name: item.question,
		acceptedAnswer: {
			"@type": "Answer",
			text: item.answer,
		},
	})),
};

function DocumentGrid({
	documents,
	numberPrefix,
}: {
	documents: readonly NonBRequiredDocument[];
	numberPrefix: string;
}) {
	return (
		<ol className="grid gap-3 md:grid-cols-2">
			{documents.map((document, index) => (
				<li
					key={document.id}
					className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-white p-5 transition-colors hover:border-brand/25"
				>
					<div className="flex items-start gap-4">
						<span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-brand text-[11px] font-bold tracking-wider text-white">
							{numberPrefix}
							{String(index + 1).padStart(2, "0")}
						</span>
						<div className="min-w-0">
							<h3 className="text-[15px] font-bold leading-snug text-text-primary">
								{document.title}
							</h3>
							<p className="mt-1 break-words text-[11px] font-semibold leading-relaxed text-accent-blue">
								{document.reference}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-text-secondary">
								{document.description}
							</p>
						</div>
					</div>
				</li>
			))}
		</ol>
	);
}

export default function NonBWorkPermitPage() {
	return (
		<>
			<JsonLdScript data={serviceSchema} />
			<JsonLdScript data={faqSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: "https://walc-visa.online/" },
					{ name: "Non-B / Work Permit", url: PAGE_URL },
				]}
			/>
			<Header />

			<main className="flex-1 pt-16 md:pt-20">
				<section className="relative isolate overflow-hidden bg-brand-deep text-white">
					<div
						className="pointer-events-none absolute inset-0 opacity-30"
						aria-hidden="true"
						style={{
							backgroundImage:
								"linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
							backgroundSize: "48px 48px",
							maskImage:
								"linear-gradient(115deg, transparent 4%, black 44%, transparent 94%)",
						}}
					/>
					<div
						className="pointer-events-none absolute -right-24 -top-48 h-[520px] w-[520px] rounded-full bg-accent-blue/25 blur-3xl"
						aria-hidden="true"
					/>

					<div className="relative mx-auto grid max-w-content gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
						<div>
							<Link
								href="/#visa-types"
								className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-white/55 transition-colors hover:text-white"
							>
								<span aria-hidden="true">←</span>
								VISA一覧に戻る
							</Link>
							<div className="mb-5 flex items-center gap-3">
								<span className="h-px w-8 bg-amber-300" />
								<p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-200">
									Non-Immigrant B + Work Permit
								</p>
							</div>
							<h1 className="max-w-4xl text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl md:text-6xl">
								タイで働く準備を、
								<br />
								<span className="text-amber-300">会社書類から一つずつ。</span>
							</h1>
							<p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">
								Non-Bは就労目的の在留資格、Work
								Permitは働くための許可。会社と申請者の状況を最初に整理し、必要書類と申請順序を日本語でご案内します。
							</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<a
									href={SITE_URLS.social.line}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-line px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-line-hover"
								>
									<MessageCircle className="h-4 w-4" />
									会社・ビザ状況をLINEで相談
								</a>
								<a
									href={SITE_URLS.guideBusiness}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
								>
									必要書類の詳細ガイド
									<ExternalLink className="h-4 w-4" />
								</a>
							</div>
							<p className="mt-4 text-xs leading-relaxed text-white/45">
								料金は会社・申請者の状況確認後に正式見積もりをご案内します。
							</p>
						</div>

						<div className="relative">
							<div className="rounded-3xl border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-sm md:p-7">
								<div className="mb-6 flex items-center justify-between gap-4">
									<div>
										<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
											Before application
										</p>
										<h2 className="mt-1 text-xl font-bold">
											申請前に確認する3つの軸
										</h2>
									</div>
									<ClipboardCheck className="h-8 w-8 text-amber-300" />
								</div>
								<div className="space-y-3">
									{[
										["申請者", "現在のビザ・入国歴・職歴と希望職種"],
										["会社", "登記・税務・タイ人雇用・事業許可"],
										["手続き", "Non-BとWork Permitの順序・申請先"],
									].map(([title, description], index) => (
										<div
											key={title}
											className="flex gap-4 rounded-2xl border border-white/10 bg-brand-deep/45 p-4"
										>
											<span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-amber-300 text-xs font-bold text-brand-deep">
												{index + 1}
											</span>
											<div>
												<p className="text-sm font-bold text-white">{title}</p>
												<p className="mt-1 text-xs leading-relaxed text-white/58">
													{description}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white px-5 py-4 text-brand-deep shadow-xl md:block">
								<p className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
									First step
								</p>
								<p className="mt-1 text-sm font-bold">提出前の書類診断から</p>
							</div>
						</div>
					</div>
				</section>

				<section className="border-b border-border-subtle bg-white">
					<div className="mx-auto grid max-w-content gap-px bg-border-subtle md:grid-cols-3">
						{[
							{
								Icon: UserRoundCheck,
								title: "日本語で状況整理",
								description: "現在のビザと希望職種から確認",
							},
							{
								Icon: UsersRound,
								title: "会社担当者と直接連携",
								description: "企業とWALCのタイ人スタッフを接続",
							},
							{
								Icon: FileCheck2,
								title: "追加書類にも対応",
								description: "事業内容・申請先ごとの差を確認",
							},
						].map(({ Icon, title, description }) => (
							<div
								key={title}
								className="flex items-center gap-4 bg-white px-5 py-6 md:px-8"
							>
								<Icon className="h-6 w-6 min-w-6 text-accent-blue" />
								<div>
									<p className="text-sm font-bold text-text-primary">{title}</p>
									<p className="mt-1 text-xs text-text-secondary">
										{description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
						<div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
							<div>
								<p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-blue">
									Two permissions
								</p>
								<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
									Non-Bだけで
									<br />
									働けるわけではありません。
								</h2>
							</div>
							<p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
								2つは役割の異なる手続きです。現在の在留資格、雇用開始日、会社の書類状況をまとめて確認し、順序の不整合や書類不足を申請前に減らします。
							</p>
						</div>

						<div className="mt-10 grid gap-4 md:grid-cols-2">
							<div className="relative overflow-hidden rounded-3xl bg-brand p-7 text-white md:p-9">
								<Landmark className="h-8 w-8 text-amber-300" />
								<p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
									01 · Immigration status
								</p>
								<h3 className="mt-2 text-2xl font-bold">Non-Immigrant B</h3>
								<p className="mt-3 text-sm leading-relaxed text-white/70">
									タイで就労・ビジネス活動を行う目的に対応する在留資格。現在のビザや申請場所により準備方法を確認します。
								</p>
							</div>
							<div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-white p-7 md:p-9">
								<BriefcaseBusiness className="h-8 w-8 text-accent-blue" />
								<p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
									02 · Permission to work
								</p>
								<h3 className="mt-2 text-2xl font-bold text-text-primary">
									Work Permit
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-text-secondary">
									雇用主、職種、勤務地などを明示し、実際に働くための許可。Non-Bとは別に必要書類を整えます。
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="documents" className="bg-white">
					<div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
						<div className="max-w-3xl">
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-blue">
								Document checklist
							</p>
							<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
								最初に揃える書類を、
								<br className="hidden sm:block" />
								3つのグループで確認。
							</h2>
							<p className="mt-5 text-base leading-relaxed text-text-secondary">
								書類名だけでなく、何を確認するための書類かを整理しました。期限切れや内容不一致がある場合は、提出前に対応方法をご案内します。
							</p>
						</div>

						<div className="mt-14">
							<div className="mb-6 flex items-end justify-between gap-4">
								<div>
									<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
										A · Applicant
									</p>
									<h3 className="mt-1 text-2xl font-bold text-text-primary">
										申請者本人が準備する基本書類
									</h3>
								</div>
								<span className="hidden text-sm font-bold text-accent-blue sm:block">
									{APPLICANT_DOCUMENTS.length}項目
								</span>
							</div>
							<DocumentGrid documents={APPLICANT_DOCUMENTS} numberPrefix="A" />
						</div>

						<div className="mt-16">
							<div className="mb-6 flex items-end justify-between gap-4">
								<div>
									<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-tertiary">
										B · Thai company
									</p>
									<h3 className="mt-1 text-2xl font-bold text-text-primary">
										初回Non-Bで確認する会社書類
									</h3>
								</div>
								<span className="hidden text-sm font-bold text-accent-blue sm:block">
									基本{COMPANY_DOCUMENTS.length}項目
								</span>
							</div>
							<DocumentGrid documents={COMPANY_DOCUMENTS} numberPrefix="B" />
						</div>

						<div className="mt-16 rounded-[2rem] bg-brand-deep p-6 text-white md:p-10">
							<div className="mb-7 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
								<div>
									<p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200">
										C · Work Permit
									</p>
									<h3 className="mt-2 text-2xl font-bold">
										Work Permitで追加確認する書類
									</h3>
								</div>
								<p className="max-w-md text-xs leading-relaxed text-white/55">
									会社書類を共通資料として使いながら、職種・勤務地・会社形態に応じた資料を追加します。
								</p>
							</div>
							<ol className="grid gap-3 md:grid-cols-2">
								{WORK_PERMIT_DOCUMENTS.map((document, index) => (
									<li
										key={document.id}
										className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
									>
										<div className="flex gap-4">
											<span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-amber-300 text-[11px] font-bold text-brand-deep">
												C{String(index + 1).padStart(2, "0")}
											</span>
											<div>
												<h4 className="text-[15px] font-bold text-white">
													{document.title}
												</h4>
												<p className="mt-1 break-words text-[11px] font-semibold leading-relaxed text-amber-200/80">
													{document.reference}
												</p>
												<p className="mt-3 text-sm leading-relaxed text-white/62">
													{document.description}
												</p>
											</div>
										</div>
									</li>
								))}
							</ol>
						</div>

						<div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
							<CircleAlert className="mt-0.5 h-5 w-5 min-w-5" />
							<p className="text-sm leading-relaxed">{NON_B_DOCUMENT_NOTICE}</p>
						</div>

						<div className="mt-8 overflow-hidden rounded-3xl border border-border-subtle bg-bg-secondary">
							<div className="grid gap-7 p-6 md:grid-cols-[0.72fr_1.28fr] md:p-8">
								<div>
									<BookOpenCheck className="h-7 w-7 text-accent-blue" />
									<p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-blue">
										Primary sources
									</p>
									<h3 className="mt-2 text-2xl font-bold text-text-primary">
										公式一次情報
									</h3>
									<p className="mt-3 text-sm leading-relaxed text-text-secondary">
										公開リストは一般的な準備項目です。実際の要求書類は申請先公館、Work
										Permitの申請区分、会社・職種によって異なります。
									</p>
									<p className="mt-4 text-xs font-semibold text-text-tertiary">
										最終確認: {NON_B_PRIMARY_SOURCES[0]?.lastReviewed}
									</p>
								</div>

								<ul className="divide-y divide-border-subtle border-y border-border-subtle">
									{NON_B_PRIMARY_SOURCES.map((source) => (
										<li key={source.url} className="py-4">
											<a
												href={source.url}
												target="_blank"
												rel="noopener noreferrer"
												className="group flex items-start justify-between gap-4"
											>
												<span>
													<span className="block text-[11px] font-bold text-text-tertiary">
														{source.publisher}
													</span>
													<span className="mt-1 block text-sm font-bold text-text-primary group-hover:text-accent-blue">
														{source.title}
													</span>
													<span className="mt-1.5 block text-xs leading-relaxed text-text-secondary">
														{source.scope}
													</span>
												</span>
												<ExternalLink className="mt-1 h-4 w-4 min-w-4 text-accent-blue" />
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-8 text-center">
							<a
								href={SITE_URLS.guideBusiness}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-sm font-bold text-accent-blue underline decoration-accent-blue/30 underline-offset-4 hover:text-accent-blue-deep"
							>
								日本語・タイ語併記の詳細ガイドを見る
								<ExternalLink className="h-4 w-4" />
							</a>
						</div>
					</div>
				</section>

				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
						<div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
							<div className="lg:sticky lg:top-28 lg:self-start">
								<Workflow className="h-8 w-8 text-accent-blue" />
								<p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-accent-blue">
									Support flow
								</p>
								<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
									正式見積もりの前に、
									<br />
									会社状況を確認します。
								</h2>
								<p className="mt-5 text-sm leading-relaxed text-text-secondary">
									必要な対応がケースごとに異なるため、書類と申請順序を確認してから対応範囲を確定します。
								</p>
							</div>

							<ol className="space-y-4">
								{NON_B_PROCESS.map((item) => (
									<li
										key={item.step}
										className="relative grid grid-cols-[3rem_1fr] gap-4 rounded-2xl border border-border-subtle bg-white p-5 md:gap-6 md:p-7"
									>
										<span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xs font-bold text-white shadow-md">
											{item.step}
										</span>
										<div className="pt-1">
											<h3 className="text-lg font-bold text-text-primary">
												{item.title}
											</h3>
											<p className="mt-2 text-sm leading-relaxed text-text-secondary">
												{item.description}
											</p>
										</div>
									</li>
								))}
							</ol>
						</div>
					</div>
				</section>

				<section className="bg-white">
					<div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
						<div className="text-center">
							<ShieldCheck className="mx-auto h-8 w-8 text-accent-blue" />
							<p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-accent-blue">
								Frequently asked questions
							</p>
							<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
								よくあるご質問
							</h2>
						</div>
						<div className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
							{NON_B_FAQ.map((item) => (
								<details key={item.question} className="group py-5">
									<summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-bold text-text-primary">
										<span>{item.question}</span>
										<span className="flex h-7 w-7 min-w-7 items-center justify-center rounded-full border border-border-default text-lg font-normal text-accent-blue transition-transform group-open:rotate-45">
											+
										</span>
									</summary>
									<p className="max-w-3xl pt-4 text-sm leading-relaxed text-text-secondary">
										{item.answer}
									</p>
								</details>
							))}
						</div>
					</div>
				</section>

				<section className="bg-brand-deep text-white">
					<div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
						<div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
							<div>
								<div className="flex items-center gap-2 text-amber-300">
									<BadgeCheck className="h-5 w-5" />
									<p className="text-xs font-bold uppercase tracking-[0.18em]">
										Start with document review
									</p>
								</div>
								<h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
									会社書類が揃っているか、
									<br className="hidden sm:block" />
									まずLINEで確認できます。
								</h2>
								<p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/62">
									会社名、事業内容、希望職種、現在のビザ状況をお送りください。確認すべき書類と次の手順を整理します。
								</p>
							</div>
							<a
								href={SITE_URLS.social.line}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-line px-7 py-4 text-base font-bold text-white shadow-xl transition-colors hover:bg-line-hover"
							>
								<MessageCircle className="h-5 w-5" />
								LINEで無料相談
								<ArrowRight className="h-4 w-4" />
							</a>
						</div>
						<div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/45">
							<span className="inline-flex items-center gap-1.5">
								<Check className="h-3.5 w-3.5" />
								日本語対応
							</span>
							<span className="inline-flex items-center gap-1.5">
								<Check className="h-3.5 w-3.5" />
								会社書類から確認
							</span>
							<span className="inline-flex items-center gap-1.5">
								<Check className="h-3.5 w-3.5" />
								正式見積もりは状況確認後
							</span>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}

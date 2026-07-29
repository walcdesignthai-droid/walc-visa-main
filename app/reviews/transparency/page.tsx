import {
	BadgeCheck,
	CalendarClock,
	Check,
	CircleAlert,
	FileCheck2,
	Link2,
	Mail,
	MessageCircle,
	RefreshCw,
	Scale,
	ShieldCheck,
	UserRoundCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { SITE_URLS } from "@/lib/walc-data/site-map";

const PAGE_URL = "https://walc-visa.online/reviews/transparency";
const REVIEWED_DATE = "2026-07-29";
const PAGE_TITLE = "お客様の声とレビューの掲載方針";
const AGGREGATE_STATUS =
	"第三者プラットフォームの総レビュー件数・平均評価は、確認済みの公開元 URL と集計ルールがそろうまで掲載しません。";

export const metadata: Metadata = {
	title: "お客様の声・レビューの掲載方針",
	description:
		"WALC VISA Consultingが、お客様の声・第三者レビュー・実績数値を掲載する際の確認方法、集計ルール、転載許諾、訂正窓口を公開します。",
	alternates: { canonical: "/reviews/transparency" },
	openGraph: {
		type: "website",
		url: "/reviews/transparency",
		title: "お客様の声・レビューの掲載方針 | WALC VISA Consulting",
		description:
			"公開元、集計範囲、転載許諾、重複排除、更新日を確認できる情報だけを掲載するための透明性ポリシー。",
		images: [
			{
				url: "/images/AdobeStock_494541408.jpeg",
				width: 1200,
				height: 630,
				alt: "WALC VISA Consulting レビュー掲載方針",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "お客様の声・レビューの掲載方針 | WALC VISA Consulting",
		description:
			"公開元と集計ルールを確認できる情報だけを掲載するための透明性ポリシー。",
		images: ["/images/AdobeStock_494541408.jpeg"],
	},
};

const pageSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	"@id": `${PAGE_URL}#webpage`,
	url: PAGE_URL,
	name: PAGE_TITLE,
	description:
		"WALC VISA Consultingのお客様の声、第三者レビュー、実績数値に関する掲載・集計・訂正方針。",
	inLanguage: "ja-JP",
	datePublished: REVIEWED_DATE,
	dateModified: REVIEWED_DATE,
	isPartOf: {
		"@type": "WebSite",
		"@id": "https://walc-visa.online/#website",
		name: "WALC VISA Consulting",
		url: "https://walc-visa.online/",
	},
	about: {
		"@type": "Organization",
		"@id": "https://walc-visa.online/#organization",
		name: "WALC VISA Consulting",
	},
};

const promises = [
	{
		number: "01",
		Icon: Link2,
		title: "公開元までたどれる",
		body: "第三者レビューを紹介する場合は、原則として元の公開ページへ移動できる URL とプラットフォーム名を示します。",
	},
	{
		number: "02",
		Icon: Scale,
		title: "数字の範囲を曖昧にしない",
		body: "件数・平均評価・実績率には、対象期間、母数、対象サービス、除外条件、確認日をセットで明示します。",
	},
	{
		number: "03",
		Icon: UserRoundCheck,
		title: "本人の言葉を変えない",
		body: "引用は転載許諾または適法な公開範囲を確認し、編集した場合は要約であることを区別します。",
	},
] as const;

const publicationSteps = [
	{
		title: "公開元を確認",
		body: "公式プロフィールまたは元投稿の URL、公開日、取得日を記録します。",
	},
	{
		title: "権利と個人情報を確認",
		body: "転載許諾、表示名、画像の利用可否を確認し、非公開情報を持ち込みません。",
	},
	{
		title: "同一投稿を重複排除",
		body: "複数サイトへの転載や同じ内容の再投稿を、別のレビューとして二重集計しません。",
	},
	{
		title: "文脈を保持",
		body: "対象サービスや利用時期が確認できない内容へ、後からカテゴリーを推測して付けません。",
	},
	{
		title: "人が最終確認",
		body: "自動生成や自動公開は行わず、担当者が公開内容と根拠を照合します。",
	},
	{
		title: "更新・訂正履歴を残す",
		body: "確認日を示し、削除・訂正・公開元の変更があれば表示内容も更新します。",
	},
] as const;

const comparisonRows = [
	{
		label: "第三者レビュー",
		definition: "外部プラットフォームに投稿された評価・コメント",
		required: "公開元 URL、確認日、転載条件",
	},
	{
		label: "お客様の声",
		definition: "WALCが取材・掲載許諾を得て紹介する体験談",
		required: "掲載許諾、編集範囲、対象サービス",
	},
	{
		label: "自社実績",
		definition: "WALCの業務記録を所定の数え方で集計した数値",
		required: "母数、対象期間、集計方法、免責",
	},
] as const;

export default function ReviewTransparencyPage() {
	return (
		<>
			<JsonLdScript data={pageSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: "https://walc-visa.online/" },
					{ name: "レビュー掲載方針", url: PAGE_URL },
				]}
			/>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				<section className="relative isolate overflow-hidden bg-brand-deep text-white">
					<div
						className="absolute inset-0 -z-10 opacity-40"
						aria-hidden="true"
						style={{
							backgroundImage:
								"radial-gradient(circle at 78% 22%, rgba(245, 185, 47, 0.24), transparent 28%), linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
							backgroundSize: "auto, 42px 42px, 42px 42px",
						}}
					/>
					<div className="mx-auto grid max-w-content gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
						<div className="max-w-3xl">
							<div className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">
								<span className="h-px w-10 bg-amber-300" aria-hidden="true" />
								Trust &amp; Evidence
							</div>
							<h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
								{PAGE_TITLE}
							</h1>
							<p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
								好意的な言葉を並べることより、誰が見ても根拠を確認できること。
								WALCは、レビュー・体験談・実績数値を同じものとして扱わず、公開元と数え方を明らかにします。
							</p>
						</div>

						<aside className="border-l-2 border-amber-300 bg-white/[0.07] p-6 backdrop-blur-sm md:p-7">
							<div className="flex items-center gap-2 text-sm font-bold text-amber-300">
								<ShieldCheck className="h-5 w-5" />
								現在の公開ステータス
							</div>
							<p className="mt-5 text-2xl font-bold leading-snug">
								検証前の集計値は
								<br />
								掲載しません。
							</p>
							<p className="mt-4 text-sm leading-7 text-white/65">
								{AGGREGATE_STATUS}
							</p>
							<div className="mt-6 flex items-center gap-2 border-t border-white/15 pt-4 text-xs text-white/55">
								<CalendarClock className="h-4 w-4" />
								最終確認：
								<time dateTime="2026-07-29">2026年7月29日</time>
							</div>
						</aside>
					</div>
				</section>

				<section className="bg-white">
					<div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
						<div className="max-w-2xl">
							<p className="text-xs font-bold tracking-[0.18em] text-brand uppercase">
								Our commitment
							</p>
							<h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
								掲載前に、3つを証明します。
							</h2>
						</div>
						<div className="mt-10 grid border-y border-border-subtle md:grid-cols-3">
							{promises.map(({ number, Icon, title, body }, index) => (
								<article
									key={number}
									className={`py-8 md:px-8 ${index > 0 ? "border-t border-border-subtle md:border-t-0 md:border-l" : ""}`}
								>
									<div className="flex items-center justify-between">
										<Icon className="h-6 w-6 text-brand" />
										<span className="font-display text-3xl text-gold-muted">
											{number}
										</span>
									</div>
									<h3 className="mt-8 text-xl font-bold">{title}</h3>
									<p className="mt-3 text-sm leading-7 text-text-secondary">
										{body}
									</p>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="bg-bg-secondary">
					<div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
						<div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
							<div>
								<p className="text-xs font-bold tracking-[0.18em] text-brand uppercase">
									Definitions
								</p>
								<h2 className="mt-3 text-3xl font-bold tracking-tight">
									3種類の「信頼情報」を混同しません。
								</h2>
								<p className="mt-5 text-sm leading-7 text-text-secondary">
									外部レビュー、許諾を得た体験談、自社集計の実績は、根拠も確認方法も異なります。表示上も明確に区別します。
								</p>
							</div>

							<div className="overflow-hidden border border-border-subtle bg-white">
								{comparisonRows.map((row, index) => (
									<article
										key={row.label}
										className={`grid gap-3 p-6 sm:grid-cols-[150px_1fr] sm:gap-6 ${index > 0 ? "border-t border-border-subtle" : ""}`}
									>
										<h3 className="font-bold text-brand">{row.label}</h3>
										<div>
											<p className="text-sm leading-6 text-text-primary">
												{row.definition}
											</p>
											<p className="mt-2 text-xs leading-6 text-text-secondary">
												確認項目：{row.required}
											</p>
										</div>
									</article>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="bg-white">
					<div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
						<div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
							<div className="lg:sticky lg:top-28 lg:self-start">
								<p className="text-xs font-bold tracking-[0.18em] text-brand uppercase">
									Publication gate
								</p>
								<h2 className="mt-3 text-3xl font-bold tracking-tight">
									掲載までの6つの確認
								</h2>
								<p className="mt-5 text-sm leading-7 text-text-secondary">
									レビューや実績情報は、AIや自動処理だけで公開しません。根拠を保存し、人が確認した内容だけを通常の更新手続きへ進めます。
								</p>
								<div className="mt-7 flex items-start gap-3 border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
									<CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
									<span>
										「絶対に取得できる」「必ず成功する」など、審査結果を保証する表現には使用しません。
									</span>
								</div>
							</div>

							<ol className="relative border-l border-border-strong">
								{publicationSteps.map((step, index) => (
									<li
										key={step.title}
										className="relative pb-10 pl-8 last:pb-0 md:pl-10"
									>
										<span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand bg-white text-xs font-bold text-brand">
											{String(index + 1).padStart(2, "0")}
										</span>
										<h3 className="text-lg font-bold">{step.title}</h3>
										<p className="mt-2 text-sm leading-7 text-text-secondary">
											{step.body}
										</p>
									</li>
								))}
							</ol>
						</div>
					</div>
				</section>

				<section className="bg-brand text-white">
					<div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
						<div className="grid gap-8 lg:grid-cols-2">
							<div className="border border-white/15 p-7 md:p-9">
								<div className="flex items-center gap-3">
									<FileCheck2 className="h-6 w-6 text-amber-300" />
									<h2 className="text-2xl font-bold">掲載する情報</h2>
								</div>
								<ul className="mt-7 space-y-4">
									{[
										"確認できる公開元とプラットフォーム名",
										"公開日・取得日・集計基準日",
										"公開表示名、または許諾済みの匿名表記",
										"対象サービスが確認できる場合のみ、その分類",
										"引用・要約・自社集計の区別",
									].map((item) => (
										<li
											key={item}
											className="flex gap-3 text-sm leading-7 text-white/75"
										>
											<Check className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
											{item}
										</li>
									))}
								</ul>
							</div>
							<div className="border border-white/15 p-7 md:p-9">
								<div className="flex items-center gap-3">
									<ShieldCheck className="h-6 w-6 text-amber-300" />
									<h2 className="text-2xl font-bold">掲載しない情報</h2>
								</div>
								<ul className="mt-7 space-y-4">
									{[
										"メール、電話番号、LINE識別子などの個人情報",
										"申請書類、パスポート情報、CRMの社内メモ",
										"公開元を確認できない口コミの転載",
										"本人の発言に見せたAI生成・創作文",
										"集計範囲を示さない評価点・件数・成功率",
									].map((item) => (
										<li
											key={item}
											className="flex gap-3 text-sm leading-7 text-white/75"
										>
											<Check className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-white">
					<div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
						<div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-16">
							<div>
								<div className="flex items-center gap-3 text-brand">
									<RefreshCw className="h-5 w-5" />
									<p className="text-xs font-bold tracking-[0.18em] uppercase">
										Correction process
									</p>
								</div>
								<h2 className="mt-4 text-3xl font-bold tracking-tight">
									訂正・削除のご連絡
								</h2>
								<p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary">
									ご本人、投稿元、または関係者から表示内容の誤り・権利・削除に関するご連絡をいただいた場合、公開元と対象箇所を確認し、必要な訂正または非表示対応を行います。
								</p>
								<div className="mt-7 flex flex-col gap-3 sm:flex-row">
									<a
										href={`mailto:${SITE_URLS.email}?subject=${encodeURIComponent("レビュー掲載内容の確認・訂正について")}`}
										className="inline-flex min-h-12 items-center justify-center gap-2 bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
									>
										<Mail className="h-4 w-4" />
										メールで連絡
									</a>
									<a
										href={SITE_URLS.social.line}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex min-h-12 items-center justify-center gap-2 bg-line px-5 py-3 text-sm font-bold text-brand-deep transition-colors hover:bg-line-hover"
									>
										<MessageCircle className="h-4 w-4" />
										LINEで連絡
									</a>
								</div>
							</div>

							<aside className="border border-border-subtle bg-bg-secondary p-6 md:p-8">
								<div className="flex items-center gap-2 text-sm font-bold text-brand">
									<BadgeCheck className="h-5 w-5" />
									確認に必要な情報
								</div>
								<ul className="mt-5 space-y-3 text-sm leading-6 text-text-secondary">
									<li>・対象ページの URL</li>
									<li>・該当する文章または画像</li>
									<li>・訂正を希望する理由</li>
									<li>・公開元を確認できる URL（ある場合）</li>
								</ul>
								<p className="mt-6 border-t border-border-subtle pt-5 text-xs leading-6 text-text-secondary">
									本人確認が必要な場合も、この公開ページへ個人情報を掲載することはありません。
								</p>
							</aside>
						</div>

						<div className="mt-14 border-t border-border-subtle pt-8">
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
							>
								WALC VISA Consulting トップへ
							</Link>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

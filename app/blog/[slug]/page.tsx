/**
 * app/blog/[slug]/page.tsx — pillar/cluster 記事レンダラ(WI-026)
 * ----------------------------------------------------------------------------
 * 構成: answer-first → 統計 → 専門家見解 → 手順 → FAQ(マニュアル Part6-2)。
 * schema: Article + Person(著者=小野寺陽介)+ Breadcrumb(WI-031 部品を再利用)。
 * 著者バイライン → 既存 /author/yosuke-onodera にリンク。
 *
 * 🔴 draft 記事は noindex / nofollow + レビューパネル(出典・プレースホルダ可視)。
 *    公開は Cowork 品質ゲート → Owner 承認後に draft:false へ(別 PR)。
 * ----------------------------------------------------------------------------
 */

import { AlertTriangle, ArrowRight, FileText, Quote } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import {
	ALL_ARTICLES,
	articleHref,
	getArticleBySlug,
} from "@/lib/blog/registry";
import {
	buildArticleSchema,
	buildPersonSchema,
	WALC_AUTHOR,
} from "@/lib/walc-data/eeat";
import { SITE_URLS } from "@/lib/walc-data/site-map";

const ORIGIN = "https://walc-visa.online";

export function generateStaticParams() {
	return ALL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article) return {};
	const canonical = `${articleHref(article.slug)}`;
	return {
		title: article.title,
		description: article.description,
		alternates: { canonical },
		// draft は検索エンジンに出さない(公開ゲート前)。
		robots: article.draft
			? { index: false, follow: false }
			: { index: true, follow: true },
	};
}

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article) notFound();

	const url = `${ORIGIN}${articleHref(article.slug)}`;
	const articleSchema = buildArticleSchema({
		headline: article.h1,
		description: article.description,
		url,
		datePublished: article.datePublished,
		dateModified: article.dateModified,
	});
	const personSchema = buildPersonSchema();

	return (
		<>
			{/* draft はインデックスさせないため schema も出さない(誤索引防止) */}
			{!article.draft && (
				<>
					<JsonLdScript data={articleSchema} />
					<JsonLdScript data={personSchema} />
					<BreadcrumbJsonLd
						items={[
							{ name: "ホーム", url: `${ORIGIN}/` },
							{ name: "ブログ", url: `${ORIGIN}/blog` },
							{ name: article.h1, url },
						]}
					/>
				</>
			)}
			<Header />
			<main>
				{article.draft && (
					<div className="bg-amber-500/15 border-b border-amber-500/30">
						<div className="mx-auto max-w-content px-5 md:px-8 py-3 flex items-center gap-2 text-sm text-amber-200">
							<AlertTriangle className="h-4 w-4 shrink-0" />
							<span>
								DRAFT — レビュー中(未公開 / noindex)。品質ゲート通過 + Owner
								承認まで公開しません。
							</span>
						</div>
					</div>
				)}

				{/* Hero */}
				<section className="bg-brand text-white">
					<div className="mx-auto max-w-content px-5 md:px-8 py-14 md:py-20">
						<p className="text-[11px] tracking-[0.22em] uppercase text-amber-300 font-semibold">
							{article.heroEyebrow}
						</p>
						<h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
							{article.h1}
						</h1>
						{/* 著者バイライン → /author */}
						<div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
							<span>監修:</span>
							<Link
								href={`/author/${WALC_AUTHOR.slug}`}
								className="font-semibold text-white hover:underline"
							>
								{WALC_AUTHOR.name}
							</Link>
							<span className="text-white/50">/ {WALC_AUTHOR.jobTitle}</span>
							<span className="text-white/50">
								更新 {article.dateModified ?? article.datePublished}
							</span>
						</div>
					</div>
				</section>

				<article className="mx-auto max-w-content px-5 md:px-8 py-12 md:py-16">
					<div className="max-w-3xl space-y-12">
						{/* answer-first */}
						<section
							aria-label="結論"
							className="rounded-2xl border border-brand/20 bg-brand/[0.04] p-6 md:p-8"
						>
							<h2 className="text-sm font-bold tracking-wide text-brand uppercase">
								結論(まず要点)
							</h2>
							<div className="mt-4 space-y-4 text-base leading-relaxed text-text-secondary">
								{article.answerFirst.map((p) => (
									<p key={p.slice(0, 24)}>{p}</p>
								))}
							</div>
						</section>

						{/* 汎用本文セクション(cluster: 必要書類等) */}
						{article.bodySections?.map((sec) => (
							<section key={sec.heading}>
								<h2 className="text-xl md:text-2xl font-bold tracking-tight">
									{sec.heading}
								</h2>
								{sec.lead && (
									<p className="mt-3 text-base leading-relaxed text-text-secondary">
										{sec.lead}
									</p>
								)}
								{sec.items && sec.items.length > 0 && (
									<ul className="mt-4 space-y-2">
										{sec.items.map((it) => (
											<li
												key={it.slice(0, 32)}
												className="flex gap-2 text-sm leading-relaxed text-text-secondary"
											>
												<span className="mt-1 text-brand">•</span>
												<span>{it}</span>
											</li>
										))}
									</ul>
								)}
							</section>
						))}

						{/* 統計(pillar / 空なら非表示) */}
						{article.statsNote.length > 0 && (
							<section>
								<h2 className="text-xl md:text-2xl font-bold tracking-tight">
									WALC の DTV 実績(数値)
								</h2>
								<div className="mt-4 space-y-3 text-base leading-relaxed text-text-secondary">
									{article.statsNote.map((p) => (
										<p key={p.slice(0, 24)}>{p}</p>
									))}
								</div>
							</section>
						)}

						{/* 専門家見解(空なら非表示) */}
						{article.expertView.length > 0 && (
							<section>
								<h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight">
									<Quote className="h-5 w-5 text-brand" />
									専門家の見解
								</h2>
								<div className="mt-4 space-y-3 text-base leading-relaxed text-text-secondary">
									{article.expertView.map((p) => (
										<p key={p.slice(0, 24)}>{p}</p>
									))}
								</div>
							</section>
						)}

						{/* 手順(空なら非表示) */}
						{article.steps.length > 0 && (
							<section>
								<h2 className="text-xl md:text-2xl font-bold tracking-tight">
									取得までの流れ
								</h2>
								<ol className="mt-4 space-y-4">
									{article.steps.map((s) => (
										<li
											key={s.heading}
											className="rounded-xl border border-border-subtle bg-bg-secondary p-5"
										>
											<h3 className="font-semibold text-text-primary">
												{s.heading}
											</h3>
											<p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
												{s.body}
											</p>
										</li>
									))}
								</ol>
							</section>
						)}

						{/* FAQ */}
						<section>
							<h2 className="text-xl md:text-2xl font-bold tracking-tight">
								よくある質問
							</h2>
							<dl className="mt-4 space-y-5">
								{article.faq.map((f) => (
									<div key={f.question}>
										<dt className="font-semibold text-text-primary">
											{f.question}
										</dt>
										<dd className="mt-1.5 text-sm leading-relaxed text-text-secondary">
											{f.answer}
										</dd>
									</div>
								))}
							</dl>
						</section>

						{/* 関連トピック(cluster) */}
						<section>
							<h2 className="text-xl md:text-2xl font-bold tracking-tight">
								関連トピック
							</h2>
							<ul className="mt-4 space-y-2">
								{article.clusterLinks.map((c) => {
									const target = getArticleBySlug(c.plannedSlug);
									const isLive = !!target && !target.draft;
									return isLive ? (
										<li key={c.promptKey}>
											<Link
												href={articleHref(c.plannedSlug)}
												className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
											>
												<ArrowRight className="h-4 w-4" />
												{c.label}
											</Link>
										</li>
									) : (
										<li
											key={c.promptKey}
											className="inline-flex items-center gap-2 text-sm text-text-tertiary"
										>
											<FileText className="h-4 w-4" />
											{c.label}
											<span className="text-xs">(準備中)</span>
										</li>
									);
								})}
							</ul>
						</section>

						{/* CTA → DTV 専用 LP / 診断 */}
						<section className="rounded-2xl bg-brand text-white p-6 md:p-8">
							<h2 className="text-lg md:text-xl font-bold">
								DTV が自分に合うか、まず確認する
							</h2>
							<p className="mt-2 text-sm text-white/80">
								WALC の無料診断で、DTV の該当枠 /
								他カテゴリの適性を切り分けできます。
							</p>
							<div className="mt-5 flex flex-wrap gap-3">
								<a
									href={SITE_URLS.diagnosis}
									className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand"
								>
									無料 VISA 診断
									<ArrowRight className="h-4 w-4" />
								</a>
								<a
									href={SITE_URLS.dtv}
									className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white"
								>
									DTV 専門サイトを見る
								</a>
							</div>
						</section>

						{/* 一次出典(政府・公的機関)— 読者に可視(YMYL / E-E-A-T) */}
						{article.references.length > 0 && (
							<section className="border-t border-border-subtle pt-8">
								<h2 className="text-base font-bold tracking-tight text-text-primary">
									出典(一次情報)
								</h2>
								<p className="mt-1 text-xs text-text-tertiary">
									本記事の制度・要件はタイ政府の一次情報に基づきます。申請前に最新版をご確認ください。
								</p>
								<ul className="mt-3 space-y-2">
									{article.references.map((r) => (
										<li key={r.url}>
											<a
												href={r.url}
												target="_blank"
												rel="noopener noreferrer nofollow"
												className="inline-flex items-start gap-2 text-sm text-brand hover:underline"
											>
												<FileText className="mt-0.5 h-4 w-4 shrink-0" />
												{r.label}
											</a>
										</li>
									))}
								</ul>
							</section>
						)}

						{/* draft レビューパネル(出典 + プレースホルダ可視) */}
						{article.draft && (
							<section className="rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/[0.06] p-6 md:p-8">
								<h2 className="text-sm font-bold uppercase tracking-wide text-amber-300">
									レビュー用メタ(公開時に非表示)
								</h2>

								<h3 className="mt-5 text-sm font-semibold text-text-primary">
									出典(事実 → ソース)
								</h3>
								<ul className="mt-2 space-y-2 text-xs leading-relaxed text-text-secondary">
									{article.sources.map((s) => (
										<li key={s.claim}>
											<span className="font-medium text-text-primary">
												{s.claim}
											</span>
											<br />
											<span className="text-text-tertiary">└ {s.source}</span>
											{s.primaryPending && (
												<span className="ml-1 rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300">
													一次出典 未付与
												</span>
											)}
										</li>
									))}
								</ul>

								<h3 className="mt-6 text-sm font-semibold text-text-primary">
									プレースホルダ(公開前に要ソース)
								</h3>
								<ul className="mt-2 space-y-2 text-xs leading-relaxed text-text-secondary">
									{article.placeholders.map((p) => (
										<li key={p.key}>
											<span className="font-medium text-amber-300">{`{{${p.key}}}`}</span>
											<br />
											<span className="text-text-tertiary">{p.note}</span>
										</li>
									))}
								</ul>
							</section>
						)}
					</div>
				</article>
			</main>
			<Footer />
		</>
	);
}

/**
 * app/blog/[slug]/page.tsx — VISA 記事(WALC VISA Journal / クリーンネイビー)。
 * Breadcrumb→ピル→H1(900)→メタ→カバーヒーロー→[本文 max680 + 目次ボックス240 sticky]。
 * 本文: リード薄ネイビー / H2 アクセント罫 / スタッツカード / 引用(serif) / 出典 / 著者 / 関連 / CTA。
 *
 * 🔴 draft は noindex/nofollow + schema 非出力 + レビューパネル。コピー・事実・出典・schema は不変。
 * YMYL: 制度・要件・金額は一次出典。禁止語 0。
 */

import { AlertTriangle, ArrowRight, FileText, Quote } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCover } from "@/components/blog/BlogCover";
import { BlogShell } from "@/components/blog/BlogShell";
import { BlogToc } from "@/components/blog/BlogToc";
import { CategoryPill } from "@/components/blog/CategoryPill";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { buildToc, readingMinutes } from "@/lib/blog/article-helpers";
import { getCategory } from "@/lib/blog/categories";
import {
	ALL_ARTICLES,
	articleHref,
	getArticleBySlug,
	PUBLISHED_ARTICLES,
} from "@/lib/blog/registry";
import {
	buildArticleSchema,
	buildFaqSchema,
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
	return {
		title: article.title,
		description: article.description,
		alternates: { canonical: articleHref(article.slug) },
		robots: article.draft
			? { index: false, follow: false }
			: { index: true, follow: true },
	};
}

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
	const { slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article) notFound();

	const url = `${ORIGIN}${articleHref(article.slug)}`;
	const cat = getCategory(article.category);
	const toc = buildToc(article);
	const mins = readingMinutes(article);
	const related = PUBLISHED_ARTICLES.filter(
		(a) => a.slug !== article.slug && a.category === article.category,
	).slice(0, 3);

	const h2 =
		"scroll-mt-24 text-xl sm:text-2xl font-bold tracking-tight text-[#16264f]";
	const accentRule = (
		<span
			aria-hidden
			className="block mt-2 h-[3px] w-10 rounded-full"
			style={{ background: cat.accent }}
		/>
	);

	return (
		<BlogShell>
			{!article.draft && (
				<>
					<JsonLdScript
						data={buildArticleSchema({
							headline: article.h1,
							description: article.description,
							url,
							datePublished: article.datePublished,
							dateModified: article.dateModified,
						})}
					/>
					<JsonLdScript data={buildPersonSchema()} />
					{article.faq.length > 0 && (
						<JsonLdScript data={buildFaqSchema(article.faq)} />
					)}
					<BreadcrumbJsonLd
						items={[
							{ name: "ホーム", url: `${ORIGIN}/` },
							{ name: "ブログ", url: `${ORIGIN}/blog` },
							{ name: article.h1, url },
						]}
					/>
				</>
			)}

			<main>
				{article.draft && (
					<div className="bg-amber-500/15 border-b border-amber-500/40">
						<div className="max-w-5xl mx-auto px-5 sm:px-6 py-3 flex items-center gap-2 text-sm text-amber-700">
							<AlertTriangle className="h-4 w-4 shrink-0" />
							<span>
								DRAFT — レビュー中(未公開 / noindex)。品質ゲート + Owner
								承認まで公開しません。
							</span>
						</div>
					</div>
				)}

				{/* Header */}
				<section className="max-w-[1000px] mx-auto px-5 sm:px-6 pt-8 sm:pt-12">
					<nav
						aria-label="パンくず"
						className="flex items-center gap-1.5 text-xs text-[#8089a0]"
					>
						<Link href="/" className="hover:text-[#46506b]">
							ホーム
						</Link>
						<span aria-hidden>/</span>
						<Link href="/blog" className="hover:text-[#46506b]">
							ブログ
						</Link>
					</nav>

					<div className="mt-4">
						<CategoryPill category={article.category} size="md" />
					</div>
					<h1 className="mt-3 text-[1.9rem] sm:text-[2.125rem] font-black tracking-tight leading-[1.25] text-[#16264f]">
						{article.h1}
					</h1>

					<div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#46506b]">
						<span
							aria-hidden
							className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-white"
							style={{ background: "#16264f" }}
						>
							Y
						</span>
						<Link
							href={WALC_AUTHOR.url}
							className="font-semibold text-[#16264f] hover:underline"
						>
							監修:{WALC_AUTHOR.name}
						</Link>
						<span aria-hidden className="text-[#c9d0e2]">
							·
						</span>
						<time dateTime={article.dateModified ?? article.datePublished}>
							更新 {article.dateModified ?? article.datePublished}
						</time>
						<span aria-hidden className="text-[#c9d0e2]">
							·
						</span>
						<span>約 {mins} 分</span>
					</div>

					<div className="mt-5">
						<ShareButtons url={url} title={article.h1} />
					</div>

					<div
						className="mt-7 rounded-2xl overflow-hidden border border-[#dde2ee]"
						style={{ boxShadow: "0 24px 48px -28px rgba(22,38,79,.4)" }}
					>
						<BlogCover article={article} variant="hero" />
					</div>
				</section>

				{/* 本文 + 目次ボックス */}
				<div className="max-w-[1000px] mx-auto px-5 sm:px-6 py-12 sm:py-16">
					<div className="grid lg:grid-cols-[minmax(0,1fr)_240px] gap-10">
						<article className="min-w-0 max-w-[680px]">
							<div className="lg:hidden mb-10">
								<BlogToc entries={toc} accent={cat.accent} />
							</div>

							<div className="space-y-12 text-[16px] sm:text-[17px] leading-[1.9] text-[#46506b]">
								{/* リード(薄ネイビーボックス) */}
								<section
									id="conclusion"
									aria-label="結論"
									className="scroll-mt-24 rounded-2xl border p-6 sm:p-7"
									style={{ borderColor: "#dde2ee", background: "#eef1f8" }}
								>
									<h2 className="text-sm font-bold tracking-wide uppercase text-[#16264f]">
										結論(まず要点)
									</h2>
									<div className="mt-3 space-y-4">
										{article.answerFirst.map((p) => (
											<p key={p.slice(0, 24)}>{p}</p>
										))}
									</div>
								</section>

								{/* スタッツカード */}
								{article.statsCards && article.statsCards.length > 0 && (
									<section id="market">
										<h2 className={h2}>数字で見る</h2>
										{accentRule}
										<div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
											{article.statsCards.map((s) => (
												<div
													key={s.label}
													className="rounded-xl border border-[#dde2ee] bg-white p-4"
												>
													<p className="font-black tracking-tight text-[#16264f]">
														<span
															className="text-[1.9rem]"
															style={{ color: cat.accent }}
														>
															{s.value}
														</span>
														{s.unit && (
															<span className="text-base ml-0.5">{s.unit}</span>
														)}
													</p>
													<p className="mt-1 text-[12px] leading-relaxed text-[#6a7793]">
														{s.label}
													</p>
												</div>
											))}
										</div>
									</section>
								)}

								{/* 統計テキスト(stats なしの記事は非表示) */}
								{article.statsNote.length > 0 && (
									<section
										id={article.statsCards?.length ? undefined : "market"}
									>
										{!article.statsCards?.length && (
											<>
												<h2 className={h2}>数字で見る</h2>
												{accentRule}
											</>
										)}
										<div className="mt-4 space-y-3">
											{article.statsNote.map((p) => (
												<p key={p.slice(0, 24)}>{p}</p>
											))}
										</div>
									</section>
								)}

								{/* 本文セクション */}
								{article.bodySections?.map((sec, i) => (
									<section id={`sec-${i}`} key={sec.heading}>
										<h2 className={h2}>{sec.heading}</h2>
										{accentRule}
										{sec.lead && <p className="mt-4">{sec.lead}</p>}
										{sec.items && sec.items.length > 0 && (
											<ul className="mt-4 space-y-2.5">
												{sec.items.map((it) => (
													<li key={it.slice(0, 32)} className="flex gap-2.5">
														<span
															aria-hidden
															className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
															style={{ background: cat.accent }}
														/>
														<span>{it}</span>
													</li>
												))}
											</ul>
										)}
									</section>
								))}

								{/* 専門家見解(引用 serif) */}
								{article.expertView.length > 0 && (
									<section id="expert">
										<h2 className={`${h2} flex items-center gap-2`}>
											<Quote
												className="h-5 w-5"
												style={{ color: cat.accent }}
											/>
											専門家の見解
										</h2>
										{accentRule}
										<blockquote
											className="mt-4 pl-5 space-y-3 text-[#16264f]"
											style={{
												borderLeft: `3px solid ${cat.accent}`,
												fontFamily: '"Noto Serif JP",serif',
											}}
										>
											{article.expertView.map((p) => (
												<p key={p.slice(0, 24)} className="leading-[1.95]">
													{p}
												</p>
											))}
										</blockquote>
									</section>
								)}

								{/* 手順 */}
								{article.steps.length > 0 && (
									<section id="steps">
										<h2 className={h2}>手順</h2>
										{accentRule}
										<ol className="mt-4 space-y-4">
											{article.steps.map((s) => (
												<li
													key={s.heading}
													className="rounded-xl border border-[#dde2ee] bg-white p-5"
												>
													<h3 className="font-semibold text-[#16264f]">
														{s.heading}
													</h3>
													<p className="mt-1.5 text-[15px] leading-relaxed text-[#6a7793]">
														{s.body}
													</p>
												</li>
											))}
										</ol>
									</section>
								)}

								{/* FAQ */}
								<section id="faq">
									<h2 className={h2}>よくある質問</h2>
									{accentRule}
									<dl className="mt-4 space-y-5">
										{article.faq.map((f) => (
											<div key={f.question}>
												<dt className="font-semibold text-[#16264f]">
													{f.question}
												</dt>
												<dd className="mt-1.5 text-[15px] leading-relaxed text-[#6a7793]">
													{f.answer}
												</dd>
											</div>
										))}
									</dl>
								</section>

								{/* 著者ボックス */}
								<section className="rounded-2xl border border-[#dde2ee] bg-white p-6">
									<div className="flex items-start gap-4">
										<span
											aria-hidden
											className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-base font-bold text-white"
											style={{ background: "#16264f" }}
										>
											Y
										</span>
										<div>
											<p className="text-[11px] uppercase tracking-wider text-[#8089a0] font-semibold">
												監修者
											</p>
											<p className="mt-0.5 font-bold text-[#16264f]">
												{WALC_AUTHOR.name}
											</p>
											<p className="mt-1 text-[13px] leading-relaxed text-[#6a7793]">
												{WALC_AUTHOR.bioJa}
											</p>
											<Link
												href={WALC_AUTHOR.url}
												className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#b8893f] hover:underline"
											>
												監修者について
												<ArrowRight className="h-3.5 w-3.5" />
											</Link>
										</div>
									</div>
								</section>

								{/* 関連(同カテゴリ・カバー付)+ cluster */}
								{(related.length > 0 || article.clusterLinks.length > 0) && (
									<section>
										<h2 className={h2}>関連トピック</h2>
										{accentRule}
										{related.length > 0 && (
											<ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
												{related.map((r) => (
													<li
														key={r.slug}
														className="rounded-xl border border-[#dde2ee] bg-white overflow-hidden"
													>
														<Link href={articleHref(r.slug)} className="block">
															<BlogCover article={r} />
															<p className="p-4 text-sm font-bold leading-snug text-[#16264f]">
																{r.h1}
															</p>
														</Link>
													</li>
												))}
											</ul>
										)}
										{article.clusterLinks.length > 0 && (
											<ul className="mt-4 space-y-2">
												{article.clusterLinks.map((c) => {
													const target = getArticleBySlug(c.plannedSlug);
													const isLive = !!target && !target.draft;
													return isLive ? (
														<li key={c.promptKey}>
															<Link
																href={articleHref(c.plannedSlug)}
																className="inline-flex items-center gap-2 text-[15px] font-medium text-[#b8893f] hover:underline"
															>
																<ArrowRight className="h-4 w-4" />
																{c.label}
															</Link>
														</li>
													) : (
														<li
															key={c.promptKey}
															className="inline-flex items-center gap-2 text-[15px] text-[#8089a0]"
														>
															<FileText className="h-4 w-4" />
															{c.label}
															<span className="text-xs">(準備中)</span>
														</li>
													);
												})}
											</ul>
										)}
									</section>
								)}

								{/* CTA(WALC VISA コンシェルジュ / LINE + 無料診断) */}
								<section
									className="rounded-2xl p-6 sm:p-8 text-white"
									style={{ background: "#16264f" }}
								>
									<h2 className="text-lg sm:text-xl font-bold">
										VISA の該当枠を、まず確認する
									</h2>
									<p className="mt-2 text-sm text-white/80">
										WALC VISA コンシェルジュ / 無料診断で、DTV
										ほか各カテゴリの適性を切り分けできます。手続きの個別相談は
										LINE で。
									</p>
									<div className="mt-5 flex flex-wrap gap-3">
										<a
											href={SITE_URLS.social.line}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#16264f]"
										>
											LINE で相談
											<ArrowRight className="h-4 w-4" />
										</a>
										<a
											href={SITE_URLS.diagnosis}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white"
										>
											無料 VISA 診断
										</a>
									</div>
								</section>

								{/* 出典ブロック */}
								{article.references.length > 0 && (
									<section
										className="rounded-2xl border p-6"
										style={{ borderColor: "#dde2ee", background: "#f4f6fd" }}
									>
										<h2 className="text-base font-bold tracking-tight text-[#16264f]">
											出典(一次情報)
										</h2>
										<p className="mt-1 text-xs text-[#8089a0]">
											本記事の制度・要件はタイ政府等の一次情報に基づきます。申請前に最新版をご確認ください。
										</p>
										<ul className="mt-3 space-y-2">
											{article.references.map((r) => (
												<li key={r.url}>
													<a
														href={r.url}
														target="_blank"
														rel="noopener noreferrer nofollow"
														className="inline-flex items-start gap-2 text-[15px] text-[#b8893f] hover:underline"
													>
														<FileText className="mt-0.5 h-4 w-4 shrink-0" />
														出典:{r.label}
													</a>
												</li>
											))}
										</ul>
									</section>
								)}

								<div className="border-t border-[#dde2ee] pt-8">
									<ShareButtons url={url} title={article.h1} />
								</div>

								{/* draft レビューパネル */}
								{article.draft && (
									<section className="rounded-2xl border border-dashed border-amber-500/50 bg-amber-500/[0.06] p-6 sm:p-8">
										<h2 className="text-sm font-bold uppercase tracking-wide text-amber-600">
											レビュー用メタ(公開時に非表示)
										</h2>
										<h3 className="mt-5 text-sm font-semibold text-[#16264f]">
											出典(事実 → ソース)
										</h3>
										<ul className="mt-2 space-y-2 text-xs leading-relaxed text-[#46506b]">
											{article.sources.map((s) => (
												<li key={s.claim}>
													<span className="font-medium text-[#16264f]">
														{s.claim}
													</span>
													<br />
													<span className="text-[#8089a0]">└ {s.source}</span>
													{s.primaryPending && (
														<span className="ml-1 rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-600">
															一次出典 未付与
														</span>
													)}
												</li>
											))}
										</ul>
										{article.placeholders.length > 0 && (
											<>
												<h3 className="mt-6 text-sm font-semibold text-[#16264f]">
													プレースホルダ(公開前に要対応)
												</h3>
												<ul className="mt-2 space-y-2 text-xs leading-relaxed text-[#46506b]">
													{article.placeholders.map((p) => (
														<li key={p.key}>
															<span className="font-medium text-amber-600">{`{{${p.key}}}`}</span>
															<br />
															<span className="text-[#8089a0]">{p.note}</span>
														</li>
													))}
												</ul>
											</>
										)}
									</section>
								)}
							</div>
						</article>

						{/* 目次ボックス(240px sticky) */}
						<aside className="hidden lg:block">
							<div className="sticky" style={{ top: 84 }}>
								<BlogToc entries={toc} accent={cat.accent} />
							</div>
						</aside>
					</div>
				</div>
			</main>
		</BlogShell>
	);
}

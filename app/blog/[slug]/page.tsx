/**
 * app/blog/[slug]/page.tsx — 記事(WI-036 クリーンネイビー)
 * ----------------------------------------------------------------------------
 * ヒーローカバー → Breadcrumb → H1(900)→ メタ(監修 Yosuke Onodera)→ 目次(sticky)
 * → 本文(answer-first / bodySections / 統計 / 専門家見解=引用 serif / 手順 / FAQ)
 * → 出典ブロック → 著者ボックス(Person schema)→ 関連 → CTA。
 * schema: Article + Person + Organization + Breadcrumb + FAQPage(draft 中は非出力)。
 * ----------------------------------------------------------------------------
 */

import { ArrowRight, FileText, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCover } from "@/components/blog/BlogCover";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import {
	articleCategory,
	CATEGORY_LABEL,
	readingMinutes,
	resolveCover,
} from "@/lib/blog/presentation";
import {
	articleHref,
	getArticleBySlug,
	PUBLISHED_ARTICLES,
} from "@/lib/blog/registry";
import type { Article } from "@/lib/blog/types";
import {
	buildArticleSchema,
	buildPersonSchema,
	WALC_AUTHOR,
	WALC_ORGANIZATION,
} from "@/lib/walc-data/eeat";
import { SITE_URLS } from "@/lib/walc-data/site-map";

const ORIGIN = "https://walc-visa.online";

/**
 * WI-immigration-LP-seo-hardening P3: 入国系記事 → 獲得LP(/immigration-support)へ
 * KW アンカーで内部リンク(文脈別の自然なアンカー)。
 */
const IMMIGRATION_LP_ANCHORS: Record<string, string> = {
	"thailand-overstay-what-to-do":
		"オーバーステイで入国を止められそう?緊急相談はこちら",
	"thailand-re-entry-permit": "再入国で止められた時の相談はこちら",
	"thailand-90-day-report-online": "タイで入国・滞在を止められたら(緊急相談)",
	"dtv-visa-run-alternative": "ビザランで入国拒否された時の相談はこちら",
	"visa-comparison": "タイで入国を止められたら(緊急相談)",
	"visa-extension-vs-90-day-report": "オーバーステイ・入国拒否の相談はこちら",
	"dtv-vs-tourist": "入国で止められた・別室に通された時の相談はこちら",
};

/**
 * 就労・法人系記事 → 法人向けページ(/corporate/*)への文脈内リンク。
 * IMMIGRATION_LP_ANCHORS と同じ設計(記事本文モデルを変えずに内部リンクを張る)。
 */
const CORPORATE_LP_ANCHORS: Record<string, { href: string; label: string }> = {
	"thailand-work-permit": {
		href: "/corporate/work-permit",
		label: "会社として従業員分を手配する場合はこちら",
	},
	"non-b-visa-extension": {
		href: "/corporate/work-permit",
		label: "法人での Work Permit / Non-B 手配はこちら",
	},
	"immigration-office-bangkok": {
		href: "/corporate/flow",
		label: "法人設立・就労手配のご依頼の流れ",
	},
};

export function generateStaticParams() {
	return PUBLISHED_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article || article.draft) return {};
	return {
		title: article.title,
		description: article.description,
		alternates: { canonical: articleHref(article.slug) },
		robots: article.draft
			? { index: false, follow: false }
			: { index: true, follow: true },
		openGraph: {
			type: "article",
			title: article.title,
			description: article.description,
			url: `${ORIGIN}${articleHref(article.slug)}`,
		},
	};
}

// ---------------------------------------------------------------------------
// 目次の項目を組み立て(本文に存在するセクションのみ)
// ---------------------------------------------------------------------------
interface TocItem {
	id: string;
	label: string;
}
function buildToc(a: Article): TocItem[] {
	const toc: TocItem[] = [{ id: "answer", label: "結論" }];
	a.bodySections?.forEach((s, i) => {
		toc.push({ id: `s-${i}`, label: s.heading });
	});
	if (a.statsNote.length) toc.push({ id: "stats", label: "実績" });
	if (a.expertView.length) toc.push({ id: "expert", label: "専門家の見解" });
	if (a.steps.length) toc.push({ id: "steps", label: "取得までの流れ" });
	if (a.faq.length) toc.push({ id: "faq", label: "よくある質問" });
	toc.push({ id: "sources", label: "出典" });
	return toc;
}

const H2 =
	"flex items-center gap-3 text-xl md:text-2xl font-bold tracking-tight text-[var(--vb-ink)] before:h-6 before:w-1 before:rounded-full before:bg-[var(--vb-gold)] before:content-['']";

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const article = getArticleBySlug(slug);
	if (!article || article.draft) notFound();

	const url = `${ORIGIN}${articleHref(article.slug)}`;
	const cover = resolveCover(article);
	const toc = buildToc(article);
	const mins = readingMinutes(article);
	const dateLabel = article.dateModified ?? article.datePublished;

	const articleSchema = buildArticleSchema({
		headline: article.h1,
		description: article.description,
		url,
		datePublished: article.datePublished,
		dateModified: article.dateModified,
	});
	const personSchema = buildPersonSchema();
	const orgSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: WALC_ORGANIZATION.name,
		legalName: WALC_ORGANIZATION.legalName,
		url: WALC_ORGANIZATION.url,
		logo: WALC_ORGANIZATION.logo,
	};
	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "ホーム", item: `${ORIGIN}/` },
			{
				"@type": "ListItem",
				position: 2,
				name: "ブログ",
				item: `${ORIGIN}/blog`,
			},
			{ "@type": "ListItem", position: 3, name: article.h1, item: url },
		],
	};
	const faqSchema =
		article.faq.length > 0
			? {
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: article.faq.map((f) => ({
						"@type": "Question",
						name: f.question,
						acceptedAnswer: { "@type": "Answer", text: f.answer },
					})),
				}
			: null;

	return (
		<>
			{!article.draft && (
				<>
					<JsonLdScript data={articleSchema} />
					<JsonLdScript data={personSchema} />
					<JsonLdScript data={orgSchema} />
					<JsonLdScript data={breadcrumbSchema} />
					{faqSchema && <JsonLdScript data={faqSchema} />}
				</>
			)}

			<main className="mx-auto max-w-5xl px-5 md:px-8 pb-20">
				{/* ヒーローカバー */}
				<div className="pt-6 md:pt-10">
					<div className="overflow-hidden rounded-2xl border border-[var(--vb-border)] shadow-sm">
						<BlogCover
							motif={cover.motif}
							kicker={cover.kicker}
							titleLines={cover.titleLines}
							accentWord={cover.accentWord}
							sub={cover.sub}
							className="w-full aspect-[1200/675]"
						/>
					</div>
				</div>

				{/* Breadcrumb */}
				<nav
					aria-label="パンくず"
					className="mt-6 text-xs text-[var(--vb-faint)]"
				>
					<Link href="/" className="hover:text-[var(--vb-ink)]">
						ホーム
					</Link>
					<span className="mx-1.5">/</span>
					<Link href="/blog" className="hover:text-[var(--vb-ink)]">
						ブログ
					</Link>
					<span className="mx-1.5">/</span>
					<span className="text-[var(--vb-muted)]">
						{CATEGORY_LABEL[articleCategory(article)]}
					</span>
				</nav>

				<header className="mt-3">
					<p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--vb-gold-text)]">
						{article.heroEyebrow}
					</p>
					<h1 className="mt-2 text-3xl md:text-[2.6rem] font-black leading-tight tracking-tight text-[var(--vb-ink)]">
						{article.h1}
					</h1>
					<div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--vb-muted)]">
						<span>
							監修:{" "}
							<Link
								href={`/author/${WALC_AUTHOR.slug}`}
								className="font-semibold text-[var(--vb-ink)] hover:underline"
							>
								{WALC_AUTHOR.name}
							</Link>
						</span>
						<span className="text-[var(--vb-border)]">|</span>
						<span>更新 {dateLabel}</span>
						<span className="text-[var(--vb-border)]">|</span>
						<span>読了 約 {mins} 分</span>
					</div>
				</header>

				<div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8 lg:gap-10">
					{/* 本文 */}
					<article className="vb-prose min-w-0 space-y-12">
						{/* answer-first */}
						<section
							id="answer"
							className="rounded-2xl border border-[var(--vb-gold)]/30 bg-[var(--vb-gold)]/[0.06] p-6 md:p-7"
						>
							<h2 className="text-xs font-bold uppercase tracking-wide text-[var(--vb-gold-text)]">
								結論(まず要点)
							</h2>
							<div className="mt-3 space-y-4 leading-relaxed text-[var(--vb-body)]">
								{article.answerFirst.map((p) => (
									<p key={p.slice(0, 24)}>{p}</p>
								))}
							</div>
						</section>

						{/* bodySections */}
						{article.bodySections?.map((sec, i) => (
							<section key={sec.heading} id={`s-${i}`}>
								<h2 className={H2}>{sec.heading}</h2>
								{sec.lead && (
									<p className="mt-3 leading-relaxed text-[var(--vb-body)]">
										{sec.lead}
									</p>
								)}
								{sec.items && (
									<ul className="mt-4 space-y-2.5">
										{sec.items.map((it) => (
											<li
												key={it.slice(0, 32)}
												className="flex gap-2.5 leading-relaxed text-[var(--vb-body)]"
											>
												<FileText className="mt-1 h-4 w-4 shrink-0 text-[var(--vb-gold-text)]" />
												<span>{it}</span>
											</li>
										))}
									</ul>
								)}
							</section>
						))}

						{/* 統計 */}
						{article.statsNote.length > 0 && (
							<section id="stats">
								<h2 className={H2}>WALC の DTV 実績(数値)</h2>
								<div className="mt-3 space-y-3 leading-relaxed text-[var(--vb-body)]">
									{article.statsNote.map((p) => (
										<p key={p.slice(0, 24)}>{p}</p>
									))}
								</div>
							</section>
						)}

						{/* 専門家見解(引用 serif) */}
						{article.expertView.length > 0 && (
							<section id="expert">
								<h2 className={H2}>専門家の見解</h2>
								<blockquote className="vb-serif mt-4 space-y-3 border-l-2 border-[var(--vb-gold)] pl-5 text-lg leading-[1.9] text-[var(--vb-ink)]">
									{article.expertView.map((p) => (
										<p key={p.slice(0, 24)}>{p}</p>
									))}
								</blockquote>
							</section>
						)}

						{/* 手順 */}
						{article.steps.length > 0 && (
							<section id="steps">
								<h2 className={H2}>取得までの流れ</h2>
								<ol className="mt-4 space-y-3">
									{article.steps.map((s) => (
										<li
											key={s.heading}
											className="rounded-xl border border-[var(--vb-border)] bg-[var(--vb-card)] p-5"
										>
											<h3 className="font-semibold text-[var(--vb-ink)]">
												{s.heading}
											</h3>
											<p className="mt-1.5 text-sm leading-relaxed text-[var(--vb-body)]">
												{s.body}
											</p>
										</li>
									))}
								</ol>
							</section>
						)}

						{/* FAQ */}
						{article.faq.length > 0 && (
							<section id="faq">
								<h2 className={H2}>よくある質問</h2>
								<dl className="mt-4 space-y-5">
									{article.faq.map((f) => (
										<div key={f.question}>
											<dt className="font-semibold text-[var(--vb-ink)]">
												{f.question}
											</dt>
											<dd className="mt-1.5 text-sm leading-relaxed text-[var(--vb-body)]">
												{f.answer}
											</dd>
										</div>
									))}
								</dl>
							</section>
						)}

						{/* 出典 */}
						<section
							id="sources"
							className="rounded-2xl border border-[var(--vb-border)] bg-[var(--vb-card)] p-6 md:p-7"
						>
							<h2 className="text-base font-bold text-[var(--vb-ink)]">
								出典(一次情報)
							</h2>
							<p className="mt-1 text-xs text-[var(--vb-faint)]">
								本記事の制度・要件は下記の一次情報に基づきます。申請前に最新版をご確認ください。
							</p>
							<ul className="mt-3 space-y-2">
								{article.references.map((r) => (
									<li key={r.url}>
										<a
											href={r.url}
											target="_blank"
											rel="noopener noreferrer nofollow"
											className="inline-flex items-start gap-2 text-sm text-[var(--vb-sub)] hover:underline"
										>
											<FileText className="mt-0.5 h-4 w-4 shrink-0" />
											{r.label}
										</a>
									</li>
								))}
							</ul>
						</section>

						{/* 著者ボックス */}
						<section className="rounded-2xl border border-[var(--vb-border)] bg-[var(--vb-card)] p-6 md:p-7">
							<p className="text-[11px] font-bold uppercase tracking-wider text-[var(--vb-gold-text)]">
								監修者
							</p>
							<div className="mt-2 flex items-start gap-4">
								<div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--vb-border)]">
									<Image
										src={WALC_AUTHOR.imagePath}
										alt={WALC_AUTHOR.imageAlt}
										fill
										sizes="56px"
										className="object-cover object-top"
									/>
								</div>
								<div>
									<Link
										href={`/author/${WALC_AUTHOR.slug}`}
										className="text-base font-bold text-[var(--vb-ink)] hover:underline"
									>
										{WALC_AUTHOR.name}
									</Link>
									<p className="text-xs text-[var(--vb-muted)]">
										{WALC_AUTHOR.jobTitle}
									</p>
									<p className="mt-2 text-sm leading-relaxed text-[var(--vb-body)]">
										{WALC_AUTHOR.bioJa}
									</p>
								</div>
							</div>
						</section>

						{/* CTA */}
						<section className="rounded-2xl bg-[var(--vb-ink)] p-6 md:p-8 text-white">
							<h2 className="text-lg md:text-xl font-bold">
								あなたの状況に合うか、無料で相談する
							</h2>
							<p className="mt-2 text-sm text-white/75">
								WALC VISA コンシェルジュ・LINE
								相談で、申請区分や必要書類を個別にご案内します。
							</p>
							<div className="mt-5 flex flex-wrap gap-3">
								<a
									href={SITE_URLS.social.line}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full bg-[var(--vb-gold)] px-5 py-2.5 text-sm font-bold text-[var(--vb-ink)]"
								>
									<MessageCircle className="h-4 w-4" />
									LINE で相談
								</a>
								<a
									href={SITE_URLS.diagnosis}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white"
								>
									無料 VISA 適性診断
									<ArrowRight className="h-4 w-4" />
								</a>
								{article.tags?.includes("DTV") && (
									<a
										href={SITE_URLS.dtv}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white"
									>
										DTV申請サポートを見る
										<ArrowRight className="h-4 w-4" />
									</a>
								)}
							</div>
						</section>
					</article>

					{/* サイドバー: 目次(sticky)+ 関連 */}
					<aside className="hidden lg:block">
						<div className="vb-toc space-y-6">
							<nav
								aria-label="目次"
								className="rounded-xl border border-[var(--vb-border)] bg-[var(--vb-card)] p-4"
							>
								<p className="text-[11px] font-bold uppercase tracking-wider text-[var(--vb-faint)]">
									目次
								</p>
								<ul className="mt-2 space-y-1.5">
									{toc.map((t) => (
										<li key={t.id}>
											<a
												href={`#${t.id}`}
												className="block text-xs leading-snug text-[var(--vb-muted)] hover:text-[var(--vb-ink)]"
											>
												{t.label}
											</a>
										</li>
									))}
								</ul>
							</nav>

							<div className="rounded-xl border border-[var(--vb-border)] bg-[var(--vb-card)] p-4">
								<p className="text-[11px] font-bold uppercase tracking-wider text-[var(--vb-faint)]">
									関連トピック
								</p>
								<ul className="mt-2 space-y-2">
									{article.clusterLinks.map((c) => {
										const target = getArticleBySlug(c.plannedSlug);
										const isLive = !!target && !target.draft;
										return isLive ? (
											<li key={c.promptKey}>
												<Link
													href={articleHref(c.plannedSlug)}
													className="inline-flex items-start gap-1.5 text-xs leading-snug text-[var(--vb-sub)] hover:underline"
												>
													<ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
													{c.label}
												</Link>
											</li>
										) : (
											<li
												key={c.promptKey}
												className="inline-flex items-start gap-1.5 text-xs leading-snug text-[var(--vb-faint)]"
											>
												<FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
												{c.label}
												<span>(準備中)</span>
											</li>
										);
									})}
								</ul>
								{IMMIGRATION_LP_ANCHORS[article.slug] && (
									<div className="mt-3 border-t border-[var(--vb-border)] pt-3">
										<Link
											href="/immigration-support"
											className="inline-flex items-start gap-1.5 text-xs font-semibold leading-snug text-[var(--vb-gold-text)] hover:underline"
										>
											<ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
											{IMMIGRATION_LP_ANCHORS[article.slug]}
										</Link>
									</div>
								)}
								{CORPORATE_LP_ANCHORS[article.slug] && (
									<div className="mt-3 border-t border-[var(--vb-border)] pt-3">
										<Link
											href={CORPORATE_LP_ANCHORS[article.slug].href}
											className="inline-flex items-start gap-1.5 text-xs font-semibold leading-snug text-[var(--vb-sub)] hover:underline"
										>
											<ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
											{CORPORATE_LP_ANCHORS[article.slug].label}
										</Link>
									</div>
								)}
							</div>
						</div>
					</aside>
				</div>
			</main>
		</>
	);
}

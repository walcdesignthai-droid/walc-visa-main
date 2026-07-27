/**
 * app/blog/page.tsx — ブログ一覧「WALC VISA Journal」(WI-036 クリーンネイビー)
 * ----------------------------------------------------------------------------
 * ブランドヘッダー + カテゴリ pill + 控えめカードグリッド + 右サイドバー
 * (サービス / 実績 / 公式 SNS)。配色は設計§1。
 * ----------------------------------------------------------------------------
 */

import { ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BlogCover } from "@/components/blog/BlogCover";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import {
	articleCategory,
	CATEGORY_LABEL,
	resolveCover,
} from "@/lib/blog/presentation";
import { articleHref, PUBLISHED_ARTICLES } from "@/lib/blog/registry";
import { getDtvPublicContent } from "@/lib/walc-data/public-content";
import { SITE_URLS } from "@/lib/walc-data/site-map";

const ORIGIN = "https://walc-visa.online";

export const metadata: Metadata = {
	title: "WALC VISA Journal｜タイ VISA の実務ガイド",
	description:
		"タイ長期 VISA(DTV / LTR / リタイア / Privilege 等)の要件・費用・滞在ルール・手続きを、一次情報と実務知見に基づき解説するガイド集。",
	alternates: { canonical: "/blog" },
};

const CATEGORY_ORDER: Array<NonNullable<ReturnType<typeof articleCategory>>> = [
	"pillar",
	"guide",
	"compare",
	"qa",
	"news",
];

export default async function BlogIndexPage() {
	const articles = PUBLISHED_ARTICLES;
	const content = await getDtvPublicContent();
	const present = CATEGORY_ORDER.filter((c) =>
		articles.some((a) => articleCategory(a) === c),
	);

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
		],
	};

	return (
		<>
			<JsonLdScript data={breadcrumbSchema} />
			<main className="mx-auto max-w-6xl px-5 md:px-8 pb-20">
				{/* ブランドヘッダー */}
				<header className="border-b border-[var(--vb-border)] pt-10 md:pt-14 pb-8">
					<p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--vb-gold-text)]">
						WALC VISA Journal
					</p>
					<h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-[var(--vb-ink)]">
						タイ VISA の実務ガイド
					</h1>
					<p className="mt-3 max-w-2xl text-[var(--vb-body)]">
						要件・費用・滞在ルール・手続きを、推測ではなく一次情報と実務に基づいて整理します。
					</p>
					{/* カテゴリ pill */}
					{present.length > 0 && (
						<div className="mt-5 flex flex-wrap gap-2">
							{present.map((c) => (
								<span
									key={c}
									className="rounded-full border border-[var(--vb-border)] bg-[var(--vb-card)] px-3 py-1 text-xs font-medium text-[var(--vb-muted)]"
								>
									{CATEGORY_LABEL[c]}
								</span>
							))}
						</div>
					)}
				</header>

				<div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-10">
					{/* カードグリッド */}
					<div>
						{articles.length === 0 ? (
							<p className="text-[var(--vb-muted)]">
								記事は準備中です。順次公開します。
							</p>
						) : (
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								{articles.map((a) => {
									const cover = resolveCover(a);
									return (
										<li
											key={a.slug}
											className="overflow-hidden rounded-2xl border border-[var(--vb-border)] bg-[var(--vb-card)] transition-shadow hover:shadow-md"
										>
											<Link href={articleHref(a.slug)}>
												<BlogCover
													motif={cover.motif}
													kicker={cover.kicker}
													titleLines={cover.titleLines}
													accentWord={cover.accentWord}
													compact
													className="w-full aspect-[1200/675] border-b border-[var(--vb-border)]"
												/>
											</Link>
											<div className="p-5">
												<p className="text-[10px] font-bold uppercase tracking-wider text-[var(--vb-gold-text)]">
													{CATEGORY_LABEL[articleCategory(a)]}
												</p>
												<h2 className="mt-1.5 text-base font-bold leading-snug text-[var(--vb-ink)]">
													<Link
														href={articleHref(a.slug)}
														className="hover:underline"
													>
														{a.h1}
													</Link>
												</h2>
												<p className="mt-2 text-sm leading-relaxed text-[var(--vb-body)] line-clamp-2">
													{a.description}
												</p>
											</div>
										</li>
									);
								})}
							</ul>
						)}
					</div>

					{/* 右サイドバー */}
					<aside className="space-y-5">
						<div className="rounded-2xl bg-[var(--vb-ink)] p-5 text-white">
							<p className="text-[11px] font-bold uppercase tracking-wider text-[var(--vb-gold)]">
								サービス
							</p>
							<p className="mt-2 text-sm leading-relaxed text-white/85">
								DTV・LTR・リタイア・Privilege など全種別のタイ長期 VISA
								を、申請から取得後まで一気通貫サポート。
							</p>
							<a
								href={SITE_URLS.social.line}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--vb-gold)] px-4 py-2 text-xs font-bold text-[var(--vb-ink)]"
							>
								<MessageCircle className="h-3.5 w-3.5" />
								LINE で相談
							</a>
						</div>

						<div className="rounded-2xl border border-[var(--vb-border)] bg-[var(--vb-card)] p-5">
							<p className="text-[11px] font-bold uppercase tracking-wider text-[var(--vb-faint)]">
								実績
							</p>
							<p className="mt-2 text-sm leading-relaxed text-[var(--vb-body)]">
								{content.trackRecord.display}の{content.trackRecord.label}。
							</p>
							<p className="mt-2 text-[11px] text-[var(--vb-faint)]">
								{content.trackRecord.disclaimer}
							</p>
						</div>

						<div className="rounded-2xl border border-[var(--vb-border)] bg-[var(--vb-card)] p-5">
							<p className="text-[11px] font-bold uppercase tracking-wider text-[var(--vb-faint)]">
								公式
							</p>
							<ul className="mt-2 space-y-1.5 text-sm">
								<li>
									<a
										href={SITE_URLS.dtv}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 text-[var(--vb-sub)] hover:underline"
									>
										<ArrowRight className="h-3.5 w-3.5" />
										DTV 専門サイト
									</a>
								</li>
								<li>
									<a
										href={SITE_URLS.social.x}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 text-[var(--vb-sub)] hover:underline"
									>
										<ArrowRight className="h-3.5 w-3.5" />
										X(@walcvisa)
									</a>
								</li>
							</ul>
						</div>
					</aside>
				</div>
			</main>
		</>
	);
}

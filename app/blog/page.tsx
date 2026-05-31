/**
 * app/blog/page.tsx — ブログ(権威ハブ)一覧
 * ----------------------------------------------------------------------------
 * 公開記事(draft:false)のみ掲載。pillar/cluster の入口。
 * 現状は DTV pillar が draft のため一覧は「準備中」表示(誤って未公開記事を
 * 露出させない)。
 * ----------------------------------------------------------------------------
 */

import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { articleHref, PUBLISHED_ARTICLES } from "@/lib/blog/registry";

const ORIGIN = "https://walc-visa.online";

export const metadata: Metadata = {
	title: "ブログ｜タイ VISA の実務ガイド",
	description:
		"タイ長期 VISA(DTV / LTR / リタイア / Privilege 等)の要件・費用・滞在ルールを、WALC の実務知見に基づき解説するガイド集。",
	alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
	const articles = PUBLISHED_ARTICLES;

	return (
		<>
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "ブログ", url: `${ORIGIN}/blog` },
				]}
			/>
			<Header />
			<main>
				<section className="bg-brand text-white">
					<div className="mx-auto max-w-content px-5 md:px-8 py-14 md:py-20">
						<p className="text-[11px] tracking-[0.22em] uppercase text-amber-300 font-semibold">
							Blog
						</p>
						<h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
							タイ VISA の実務ガイド
						</h1>
						<p className="mt-3 max-w-2xl text-base text-white/80">
							要件・費用・滞在ルールを、推測ではなく実務と一次情報に基づいて整理します。
						</p>
					</div>
				</section>

				<section className="mx-auto max-w-content px-5 md:px-8 py-12 md:py-16">
					{articles.length === 0 ? (
						<p className="text-text-secondary">
							記事は準備中です。順次公開します。
						</p>
					) : (
						<ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
							{articles.map((a) => (
								<li
									key={a.slug}
									className="rounded-2xl border border-border-subtle bg-bg-secondary p-6 transition-colors hover:border-brand/40"
								>
									<p className="text-[11px] uppercase tracking-wider text-text-tertiary">
										{a.kind === "pillar" ? "ピラー" : "クラスター"}
									</p>
									<h2 className="mt-2 text-lg font-bold tracking-tight text-text-primary">
										<Link
											href={articleHref(a.slug)}
											className="hover:underline"
										>
											{a.h1}
										</Link>
									</h2>
									<p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
										{a.description}
									</p>
									<Link
										href={articleHref(a.slug)}
										className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
									>
										読む
										<ArrowRight className="h-4 w-4" />
									</Link>
								</li>
							))}
						</ul>
					)}
				</section>
			</main>
			<Footer />
		</>
	);
}

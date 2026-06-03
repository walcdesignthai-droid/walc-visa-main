/**
 * app/blog/page.tsx — VISA ブログ(WALC VISA Journal)一覧。公開記事(draft:false)のみ。
 * クリーンネイビー(正本 WALC-VISA-BLOG-DESIGN.md)。hero → メイン(フィルタ+2列カード)+ サイドバー。
 */

import type { Metadata } from "next";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { BlogShell } from "@/components/blog/BlogShell";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PUBLISHED_ARTICLES } from "@/lib/blog/registry";

const ORIGIN = "https://walc-visa.online";

export const metadata: Metadata = {
	title: "ブログ｜タイ長期 VISA の実務ガイド",
	description:
		"タイ長期 VISA(DTV / LTR / リタイア / Privilege 等)の要件・費用・滞在ルールと、手続き・暮らしの Q&A を、WALC VISA の実務知見と一次情報に基づき整理するガイド集。",
	alternates: { canonical: "/blog" },
};

export default function BlogIndexPage(): React.JSX.Element {
	const articles = [...PUBLISHED_ARTICLES];

	return (
		<BlogShell>
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "ブログ", url: `${ORIGIN}/blog` },
				]}
			/>
			<main>
				<section className="border-b border-[#dde2ee]">
					<div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
						<p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[#b8893f]">
							WALC VISA JOURNAL
						</p>
						<h1 className="mt-3 text-3xl sm:text-[2.75rem] font-black tracking-tight leading-[1.15] text-[#16264f]">
							タイ長期 VISA の実務ガイド
						</h1>
						<p className="mt-3 max-w-2xl text-base text-[#46506b] leading-relaxed">
							要件・費用・滞在ルールと、手続き・暮らしの Q&A
							を、推測ではなく実務と一次情報に基づいて整理します。
						</p>
					</div>
				</section>

				<section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
					<div className="grid gap-10 lg:grid-cols-[1fr_264px]">
						<div className="min-w-0">
							<BlogIndexClient articles={articles} />
						</div>
						<BlogSidebar />
					</div>
				</section>
			</main>
		</BlogShell>
	);
}

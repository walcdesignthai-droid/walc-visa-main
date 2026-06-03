"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
	CATEGORY_ORDER,
	type CategoryKey,
	getCategory,
} from "@/lib/blog/categories";
import { articleHref } from "@/lib/blog/registry";
import type { Article } from "@/lib/blog/types";
import { BlogCover } from "./BlogCover";
import { CategoryPill } from "./CategoryPill";

type FilterKey = "all" | CategoryKey;

function fmtDate(iso: string): string {
	const [y, m, d] = iso.split("-");
	return `${y}.${m}.${d}`;
}

function ArticleCard({ a }: { a: Article }): React.JSX.Element {
	return (
		<li className="group rounded-2xl border border-[#dde2ee] bg-white overflow-hidden transition-colors hover:border-[#b8893f]/50">
			<Link href={articleHref(a.slug)} className="block">
				<BlogCover article={a} />
				<div className="p-5">
					<CategoryPill category={a.category} />
					<h3 className="mt-2.5 text-[15px] font-bold leading-snug tracking-tight text-[#16264f] line-clamp-2 group-hover:text-[#3552a0] transition-colors">
						{a.h1}
					</h3>
					<div className="mt-3 flex items-center gap-2 text-[11px] text-[#8089a0]">
						<time dateTime={a.datePublished}>
							{fmtDate(a.dateModified ?? a.datePublished)}
						</time>
						{a.tags?.[0] && (
							<>
								<span aria-hidden>·</span>
								<span>#{a.tags[0]}</span>
							</>
						)}
					</div>
				</div>
			</Link>
		</li>
	);
}

export function BlogIndexClient({
	articles,
}: {
	articles: Article[];
}): React.JSX.Element {
	const [filter, setFilter] = useState<FilterKey>("all");

	const present = useMemo(() => {
		const set = new Set(articles.map((a) => a.category));
		return CATEGORY_ORDER.filter((k) => set.has(k));
	}, [articles]);

	const filtered = useMemo(
		() =>
			filter === "all"
				? articles
				: articles.filter((a) => a.category === filter),
		[articles, filter],
	);

	return (
		<div>
			<div
				className="flex flex-wrap gap-2"
				role="tablist"
				aria-label="カテゴリで絞り込み"
			>
				{(["all", ...present] as FilterKey[]).map((k) => {
					const active = filter === k;
					const label = k === "all" ? "すべて" : getCategory(k).label;
					return (
						<button
							key={k}
							type="button"
							role="tab"
							aria-selected={active}
							data-testid={`blog-filter-${k}`}
							onClick={() => setFilter(k)}
							className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
								active
									? "border-[#16264f] bg-[#16264f] text-white"
									: "border-[#dde2ee] text-[#6a7793] hover:text-[#16264f] hover:border-[#c9d0e2]"
							}`}
						>
							{label}
						</button>
					);
				})}
			</div>

			{filtered.length === 0 ? (
				<p className="mt-10 text-sm text-[#6a7793]">
					該当する記事は準備中です。
				</p>
			) : (
				<ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
					{filtered.map((a) => (
						<ArticleCard key={a.slug} a={a} />
					))}
				</ul>
			)}
		</div>
	);
}

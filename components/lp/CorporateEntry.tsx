/**
 * components/lp/CorporateEntry.tsx — トップページの法人向け導線
 * ----------------------------------------------------------------------------
 * walc-visa.online → /corporate への内部リンクは本セクションが起点。
 * 個人向けトップの中に置くため、既存 LP のトーン(白基調・罫線)に合わせつつ、
 * 法人向けであることが一目で分かるようにする。
 * ----------------------------------------------------------------------------
 */

import Link from "next/link";
import { CORPORATE_PAGES, CORPORATE_SCOPE } from "@/lib/walc-data/corporate";
import { SITE_URLS } from "@/lib/walc-data/site-map";

export function CorporateEntry() {
	return (
		<section
			id="corporate"
			aria-labelledby="corporate-heading"
			className="bg-bg-secondary"
		>
			<div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
				<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
					<div>
						<span className="block h-px w-8 bg-brand" aria-hidden="true" />
						<p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
							For Corporate Clients
						</p>
						<h2
							id="corporate-heading"
							className="mt-3 text-2xl font-bold tracking-tight text-text-primary md:text-3xl"
						>
							法人のお客様へ
						</h2>
						<p className="mt-5 text-sm leading-relaxed text-text-secondary">
							タイでの法人設立、Work Permit、法人口座開設。
							登記の完了をゴールにせず、事業が動き出すまでをご相談いただけます。
						</p>
						<Link
							href={SITE_URLS.corporate}
							className="mt-7 inline-flex min-h-11 items-center text-sm font-bold text-accent-blue underline decoration-accent-blue/30 underline-offset-4 transition-colors hover:text-accent-blue-deep"
						>
							法人向けページを見る
						</Link>
					</div>

					<div>
						<ul className="flex flex-wrap gap-x-5 gap-y-2">
							{CORPORATE_SCOPE.map((item) => (
								<li key={item} className="text-sm font-bold text-text-primary">
									{item}
								</li>
							))}
						</ul>
						<ul className="mt-7 border-t border-border-subtle">
							{CORPORATE_PAGES.map((page) => (
								<li key={page.path} className="border-b border-border-subtle">
									<Link
										href={page.path}
										className="block py-4 text-sm font-bold text-accent-blue transition-colors hover:text-accent-blue-deep"
									>
										{page.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

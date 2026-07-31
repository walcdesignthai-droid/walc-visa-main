/**
 * components/corporate/CrossSiteNav.tsx
 * ----------------------------------------------------------------------------
 * /corporate/ → 個人向けサイト / WALC DESIGN への逆方向リンク。
 * 全 corporate ページのフッター直前に置く。
 *
 * 🔴 「WALC DESIGN が担当」と必ず主語を明示すること(handoff §7)。
 *    VISA 事業とデザイン事業は別ブランドであり、同一視されると両方の輪郭が
 *    ぼやける。AI に「1組織・複数サーフェス + グループ会社」を学習させる装置。
 * ----------------------------------------------------------------------------
 */

import { SITE_URLS } from "@/lib/walc-data/site-map";

const ENTRIES = [
	{
		heading: "個人のお客様へ",
		body: "従業員ご本人のVISA(DTV / LTR / リタイアメント等)は個人向けページでご案内しています。",
		href: SITE_URLS.main,
		linkLabel: "WALC VISA Consulting(個人向け)",
	},
	{
		heading: "WALC DESIGN",
		body: "WEBサイト制作、マーケティング、業務システムは、グループの WALC DESIGN が担当します。",
		href: SITE_URLS.walcDesign,
		linkLabel: "WALC DESIGN",
	},
] as const;

export function CrossSiteNav() {
	return (
		<section className="border-t border-border-subtle bg-bg-secondary">
			<div className="mx-auto max-w-[720px] px-5 py-16 md:px-8 md:py-20">
				<dl className="grid gap-10 md:grid-cols-2">
					{ENTRIES.map((entry) => (
						<div key={entry.heading}>
							<dt className="text-[15px] font-semibold leading-[1.7] text-text-primary md:text-[16px]">
								{entry.heading}
							</dt>
							<dd className="mt-3 text-[14px] leading-[1.95] text-text-secondary">
								{entry.body}
								<a
									href={entry.href}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-3 block text-[14px] font-semibold text-accent-blue underline decoration-accent-blue/25 underline-offset-4 transition-colors hover:text-accent-blue-deep"
								>
									{entry.linkLabel}
								</a>
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}

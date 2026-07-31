/**
 * components/corporate/CorporateCta.tsx
 * ----------------------------------------------------------------------------
 * 法人向けページ末尾の CTA。ネイビー濃色面 = ネイビー許可箇所③(handoff §4)。
 * 料金は金額を書かず CORPORATE_PRICING_NOTE のみを載せる。
 * ----------------------------------------------------------------------------
 */

import Link from "next/link";
import { CORPORATE_PRICING_NOTE } from "@/lib/walc-data/corporate";
import { SITE_URLS } from "@/lib/walc-data/site-map";

interface CorporateCtaProps {
	/** 文脈に合わせた見出し。 */
	heading: string;
	/** 「ご依頼の流れ」への導線を出すか(flow ページ自身では出さない)。 */
	showFlowLink?: boolean;
}

export function CorporateCta({
	heading,
	showFlowLink = true,
}: CorporateCtaProps) {
	return (
		<section className="bg-brand text-white">
			<div className="mx-auto max-w-[720px] px-5 py-16 md:px-8 md:py-20">
				<span className="block h-px w-8 bg-white/40" aria-hidden="true" />
				<h2 className="mt-5 font-serif text-[20px] font-semibold leading-[1.7] text-white md:text-[22px]">
					{heading}
				</h2>
				<p className="mt-6 text-[14px] leading-[1.95] text-white/75">
					{CORPORATE_PRICING_NOTE}
				</p>
				<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
					<a
						href={SITE_URLS.social.line}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-6 text-[14px] font-semibold text-brand transition-colors hover:bg-white/90"
					>
						LINEで相談する(無料)
					</a>
					{showFlowLink ? (
						<Link
							href="/corporate/flow"
							className="inline-flex min-h-11 items-center text-[14px] font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
						>
							ご依頼の流れを見る
						</Link>
					) : null}
				</div>
			</div>
		</section>
	);
}

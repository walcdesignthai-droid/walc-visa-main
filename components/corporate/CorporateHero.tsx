/**
 * components/corporate/CorporateHero.tsx
 * ----------------------------------------------------------------------------
 * 法人向け(/corporate/)共通ヒーロー。
 *
 * デザイン制約(handoff §3-3 / §4):
 *   - H1 は明朝・26px(SP)/ 32px(PC)・font-semibold・leading-[1.6]
 *   - 個人向けヒーロー(text-6xl・濃色面・グリッド装飾)より一段静かに組む
 *   - グラデーション / 装飾ゴールド / 絵文字は使わない
 * ----------------------------------------------------------------------------
 */

import Link from "next/link";
import { SITE_URLS } from "@/lib/walc-data/site-map";

interface CorporateHeroProps {
	/** 見出し上の English label(ネイビー・tracking 0.16em)。 */
	englishLabel: string;
	/** H1(明朝)。改行は配列で渡す。 */
	titleLines: readonly string[];
	/** リード文(段落配列)。 */
	lead: readonly string[];
	/** 補助リンク(任意)。LINE CTA は常設。 */
	subCta?: { href: string; label: string };
}

export function CorporateHero({
	englishLabel,
	titleLines,
	lead,
	subCta,
}: CorporateHeroProps) {
	return (
		<section className="border-b border-border-subtle bg-bg-primary">
			<div className="mx-auto max-w-[720px] px-5 py-16 md:px-8 md:py-24">
				<span className="block h-px w-8 bg-brand" aria-hidden="true" />
				<p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand md:text-[11px]">
					{englishLabel}
				</p>
				<h1 className="mt-4 font-serif text-[26px] font-semibold leading-[1.6] text-text-primary md:text-[32px]">
					{titleLines.map((line) => (
						<span key={line} className="block">
							{line}
						</span>
					))}
				</h1>
				<div className="mt-7 space-y-3">
					{lead.map((paragraph) => (
						<p
							key={paragraph}
							className="text-[14px] leading-[1.95] text-text-secondary"
						>
							{paragraph}
						</p>
					))}
				</div>

				<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
					<a
						href={SITE_URLS.social.line}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-blue px-6 text-[14px] font-semibold text-white transition-colors hover:bg-accent-blue-bright"
					>
						LINEで相談する(無料)
					</a>
					{subCta ? (
						<Link
							href={subCta.href}
							className="inline-flex min-h-11 items-center text-[14px] font-semibold text-accent-blue underline decoration-accent-blue/30 underline-offset-4 transition-colors hover:text-accent-blue-deep"
						>
							{subCta.label}
						</Link>
					) : null}
				</div>
			</div>
		</section>
	);
}

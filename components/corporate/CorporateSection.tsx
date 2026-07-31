/**
 * components/corporate/CorporateSection.tsx
 * ----------------------------------------------------------------------------
 * 法人向け(/corporate/)の共通セクション枠と見出し。
 *
 * デザイン制約(handoff §4):
 *   - 本文カラム = max-w-[720px] / セクション間 = py-24(詰めると安く見える)
 *   - H2 は明朝。直前に短いネイビー罫(w-8 h-px bg-brand)= ネイビー許可箇所①
 *   - English label はネイビー文字色 = ネイビー許可箇所②
 *   - 個人向けより一段小さく組む(大きい文字は BtoC に見える)
 * ----------------------------------------------------------------------------
 */

interface CorporateSectionProps {
	/** セクション見出し(H2・明朝)。 */
	title: string;
	/** 見出し上の English label(任意)。 */
	englishLabel?: string;
	/** 見出し直下のリード文(任意)。 */
	lead?: string;
	/** アンカーリンク用 id。 */
	id?: string;
	/** bg-bg-secondary で交互配置したい場合に true。 */
	tinted?: boolean;
	children?: React.ReactNode;
}

export function CorporateSection({
	title,
	englishLabel,
	lead,
	id,
	tinted = false,
	children,
}: CorporateSectionProps) {
	return (
		<section
			id={id}
			className={tinted ? "bg-bg-secondary" : "bg-bg-primary"}
			aria-labelledby={id ? `${id}-heading` : undefined}
		>
			<div className="mx-auto max-w-[720px] px-5 py-16 md:px-8 md:py-24">
				<CorporateHeading
					title={title}
					englishLabel={englishLabel}
					headingId={id ? `${id}-heading` : undefined}
				/>
				{lead ? (
					<p className="mt-6 text-[14px] leading-[1.95] text-text-secondary">
						{lead}
					</p>
				) : null}
				{children ? <div className="mt-10">{children}</div> : null}
			</div>
		</section>
	);
}

interface CorporateHeadingProps {
	title: string;
	englishLabel?: string;
	headingId?: string;
}

/** H2 + ネイビー罫 + English label。セクション外でも使えるよう分離。 */
export function CorporateHeading({
	title,
	englishLabel,
	headingId,
}: CorporateHeadingProps) {
	return (
		<div>
			<span className="block h-px w-8 bg-brand" aria-hidden="true" />
			{englishLabel ? (
				<p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand md:text-[11px]">
					{englishLabel}
				</p>
			) : null}
			<h2
				id={headingId}
				className={`font-serif text-[20px] font-semibold leading-[1.7] text-text-primary md:text-[22px] ${
					englishLabel ? "mt-3" : "mt-5"
				}`}
			>
				{title}
			</h2>
		</div>
	);
}

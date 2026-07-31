/**
 * components/corporate/TimelineNotice.tsx
 * ----------------------------------------------------------------------------
 * 期間 + 律速要因。**差別化の核**(競合が誰も書いていない)。
 *
 * 方針(handoff §5):
 *   - 期間は必ず二段で見せる。数値だけを置くと誇大表現になる。
 *   - 「何がスピードを決めるのか」を併記して、期間が状況依存であることを示す。
 *   - 表は罫線のみ(背景塗りなし)。数値は tabular-nums + ネイビー強調。
 * ----------------------------------------------------------------------------
 */

import {
	CORPORATE_TIMELINE,
	CORPORATE_TIMELINE_FACTORS,
} from "@/lib/walc-data/corporate";

export function TimelineNotice() {
	return (
		<div>
			<dl className="border-t border-border-subtle">
				{CORPORATE_TIMELINE.map((row) => (
					<div
						key={row.label}
						className="flex items-baseline justify-between gap-6 border-b border-border-subtle py-5"
					>
						<dt className="text-[14px] leading-[1.7] text-text-secondary">
							{row.label}
						</dt>
						<dd className="shrink-0 text-[14px] font-semibold tabular-nums text-brand">
							{row.value}
						</dd>
					</div>
				))}
			</dl>

			<div className="mt-10">
				<h3 className="text-[15px] font-semibold leading-[1.7] text-text-primary md:text-[16px]">
					期間を決めるのは、手続きそのものではありません。
				</h3>
				<p className="mt-3 text-[14px] leading-[1.95] text-text-secondary">
					登記や申請にかかる日数より、次の2つの方が全体の期間を大きく左右します。
				</p>
				<ul className="mt-5 space-y-3">
					{CORPORATE_TIMELINE_FACTORS.map((factor) => (
						<li
							key={factor}
							className="flex gap-3 text-[14px] leading-[1.95] text-text-secondary"
						>
							<span
								className="mt-[0.85em] block h-px w-3 shrink-0 bg-border-strong"
								aria-hidden="true"
							/>
							<span>{factor}</span>
						</li>
					))}
				</ul>
				<p className="mt-6 text-[12px] leading-[1.9] text-text-secondary">
					ご相談の段階で、どちらがボトルネックになりそうかをお伝えします。
				</p>
			</div>
		</div>
	);
}

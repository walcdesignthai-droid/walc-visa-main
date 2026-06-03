import type { TocEntry } from "@/lib/blog/article-helpers";

/**
 * BlogToc — 目次の枠付きボックス(番号 + ラベル)。配置は呼び出し側(sticky 240px / モバイル折りたたみ)。
 * 🔴 旧の「細列 char 折返し崩壊」を禁止 → 適正幅 + nowrap 番号 + 折返しラベル。
 */
export function BlogToc({
	entries,
	accent,
}: {
	entries: TocEntry[];
	accent: string;
}): React.JSX.Element | null {
	if (entries.length === 0) return null;
	return (
		<nav
			aria-label="目次"
			className="rounded-xl border border-[#dde2ee] bg-white p-5"
		>
			<p className="text-[11px] uppercase tracking-wider text-[#8089a0] font-semibold mb-3">
				目次
			</p>
			<ol className="space-y-2.5">
				{entries.map((e, i) => (
					<li key={e.id}>
						<a
							href={`#${e.id}`}
							className="flex gap-2.5 text-[13px] text-[#46506b] hover:text-[#16264f] transition-colors"
						>
							<span
								className="font-mono text-[11px] tabular-nums shrink-0 pt-0.5"
								style={{ color: accent }}
							>
								{String(i + 1).padStart(2, "0")}
							</span>
							<span className="leading-snug">{e.label}</span>
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
}

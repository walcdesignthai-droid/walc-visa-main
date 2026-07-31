/**
 * components/corporate/ScopeList.tsx
 * ----------------------------------------------------------------------------
 * 対応範囲・書類・サービスの列挙。
 *
 * 🔴 カードUIで並べないこと(handoff §4)。SaaS テンプレ臭の最大要因。
 *    定義リスト(<dl>)+ 罫線のみで組む。面の塗り分け・影・色帯は使わない。
 * ----------------------------------------------------------------------------
 */

import Link from "next/link";

export interface ScopeItem {
	term: string;
	description: string;
	/** 詳細ページがある場合のみ。無ければ見出しはプレーンテキスト。 */
	href?: string;
}

interface ScopeListProps {
	items: readonly ScopeItem[];
}

export function ScopeList({ items }: ScopeListProps) {
	return (
		<dl className="border-t border-border-subtle">
			{items.map((item) => (
				<div
					key={item.term}
					className="grid gap-2 border-b border-border-subtle py-7 md:grid-cols-[minmax(0,13rem)_1fr] md:gap-8"
				>
					<dt className="text-[15px] font-semibold leading-[1.7] text-text-primary md:text-[16px]">
						{item.href ? (
							<Link
								href={item.href}
								className="text-accent-blue underline decoration-accent-blue/25 underline-offset-4 transition-colors hover:text-accent-blue-deep"
							>
								{item.term}
							</Link>
						) : (
							item.term
						)}
					</dt>
					<dd className="text-[14px] leading-[1.95] text-text-secondary">
						{item.description}
					</dd>
				</div>
			))}
		</dl>
	);
}

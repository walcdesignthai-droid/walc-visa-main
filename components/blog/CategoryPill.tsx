import { type CategoryKey, getCategory } from "@/lib/blog/categories";

/** カテゴリピル(navy/gold 系 tint + ink = AA)。 */
export function CategoryPill({
	category,
	size = "sm",
}: {
	category: CategoryKey;
	size?: "sm" | "md";
}): React.JSX.Element {
	const c = getCategory(category);
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: 6,
				background: c.tint,
				color: c.ink,
				borderRadius: 999,
				padding: size === "md" ? "5px 12px" : "3px 10px",
				fontSize: size === "md" ? 13 : 11,
				fontWeight: 700,
				lineHeight: 1.2,
			}}
		>
			<span
				aria-hidden
				style={{
					width: 6,
					height: 6,
					borderRadius: "50%",
					background: c.accent,
				}}
			/>
			{c.label}
		</span>
	);
}

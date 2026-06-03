import { resolveCover } from "@/lib/blog/article-helpers";
import { buildCoverSvg } from "@/lib/blog/cover";
import type { Article } from "@/lib/blog/types";

/**
 * BlogCover — クリーンネイビーのマガジン型カバー(記事専用 SVG)を inline 描画。
 * カード / ヒーローで共用。1記事1デザイン。
 */
export function BlogCover({
	article,
	variant = "card",
}: {
	article: Article;
	variant?: "card" | "hero";
}): React.JSX.Element {
	const svg = buildCoverSvg(resolveCover(article));
	return (
		<div
			className="w-full overflow-hidden"
			style={{
				aspectRatio: variant === "hero" ? "1200 / 620" : "16 / 9.6",
				lineHeight: 0,
			}}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: 信頼できる static SVG(記事データ由来)
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}

import { ImageResponse } from "next/og";
import { resolveCover } from "@/lib/blog/article-helpers";
import { getArticleBySlug } from "@/lib/blog/registry";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "WALC VISA — ブログ";

/** OG = 記事カバーの構図(クリーンネイビー / satori-native で同質感)。 */
export default async function OG({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<ImageResponse> {
	const { slug } = await params;
	const article = getArticleBySlug(slug);
	const cover = article
		? resolveCover(article)
		: {
				motif: "passport" as const,
				kicker: "WALC VISA",
				titleLines: ["WALC VISA"],
			};
	const accent = cover.accentWord;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: "#f7f8fb",
				color: "#16264f",
				padding: "70px 80px",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					bottom: 0,
					width: 12,
					background: "#caa14a",
					display: "flex",
				}}
			/>
			<span
				style={{
					fontSize: 26,
					fontWeight: 700,
					letterSpacing: 6,
					color: "#b8893f",
				}}
			>
				{cover.kicker}
			</span>
			<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				{cover.titleLines.slice(0, 2).map((line) => {
					if (accent && line.includes(accent)) {
						const [before = "", after = ""] = line.split(accent);
						return (
							<div
								key={line}
								style={{ display: "flex", fontSize: 76, fontWeight: 900 }}
							>
								<span>{before}</span>
								<span style={{ color: "#b8893f" }}>{accent}</span>
								<span>{after}</span>
							</div>
						);
					}
					return (
						<div
							key={line}
							style={{ display: "flex", fontSize: 76, fontWeight: 900 }}
						>
							{line}
						</div>
					);
				})}
				<div
					style={{
						display: "flex",
						width: 124,
						height: 7,
						borderRadius: 4,
						background: "#caa14a",
						marginTop: 10,
					}}
				/>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<span style={{ fontSize: 20, fontWeight: 500, color: "#8089a0" }}>
					監修:WALC VISA Consulting
				</span>
				<span
					style={{
						fontSize: 26,
						fontWeight: 900,
						letterSpacing: 2,
						color: "#16264f",
					}}
				>
					WALC VISA
				</span>
			</div>
		</div>,
		{ ...size },
	);
}

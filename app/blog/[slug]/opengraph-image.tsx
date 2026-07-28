/**
 * app/blog/[slug]/opengraph-image.tsx — 記事 OG(1200×630 / WI-036)
 * ----------------------------------------------------------------------------
 * クリーンネイビー配色のカバーを OG として動的生成。JP フォント(Noto Sans JP)
 * を Google Fonts から取得。動的生成のためビルドはブロックしない。
 * ----------------------------------------------------------------------------
 */

import { ImageResponse } from "next/og";
import { buildBlogOgDescriptor } from "@/lib/blog/og-image";

export const alt = "WALC VISA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#001830";

async function loadFont(weight: number): Promise<ArrayBuffer | null> {
	try {
		const css = await fetch(
			`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&display=swap`,
			{ headers: { "User-Agent": "Mozilla/5.0" } },
		).then((r) => r.text());
		const url = css.match(
			/src:\s*url\(([^)]+)\)\s*format\('(?:woff2|truetype|opentype)'\)/,
		)?.[1];
		if (!url) return null;
		return await fetch(url).then((r) => r.arrayBuffer());
	} catch {
		return null;
	}
}

export default async function OgImage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const descriptor = buildBlogOgDescriptor(slug);

	const [bold, black] = await Promise.all([loadFont(700), loadFont(900)]);
	const fonts = [
		...(bold
			? [
					{
						name: "Noto",
						data: bold,
						weight: 700 as const,
						style: "normal" as const,
					},
				]
			: []),
		...(black
			? [
					{
						name: "Noto",
						data: black,
						weight: 900 as const,
						style: "normal" as const,
					},
				]
			: []),
	];

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: "#f7f8fb",
				padding: "58px 64px 48px",
				fontFamily: "Noto, sans-serif",
				borderTop: `12px solid ${descriptor.accentColor}`,
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						color: descriptor.accentColor,
						fontSize: 19,
						fontWeight: 700,
						letterSpacing: 5,
					}}
				>
					<span
						style={{
							width: 36,
							height: 3,
							marginRight: 16,
							background: descriptor.accentColor,
						}}
					/>
					{descriptor.kicker}
				</div>
				<div
					style={{
						color: "#6a7793",
						fontSize: 15,
						fontWeight: 700,
						letterSpacing: 3,
					}}
				>
					{descriptor.articleCode}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					flex: 1,
					alignItems: "center",
					justifyContent: "space-between",
					marginTop: 26,
				}}
			>
				<div
					style={{
						display: "flex",
						width: 780,
						flexDirection: "column",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column" }}>
						{descriptor.titleLines.map((line) => (
							<div
								key={line}
								style={{
									color: INK,
									fontSize: 67,
									fontWeight: 900,
									lineHeight: 1.13,
									letterSpacing: -2,
								}}
							>
								{line}
							</div>
						))}
					</div>
					<div
						style={{
							width: 108,
							height: 7,
							borderRadius: 4,
							background: descriptor.accentColor,
							marginTop: 24,
						}}
					/>
					{descriptor.sub ? (
						<div
							style={{
								color: "#46506b",
								fontSize: 22,
								fontWeight: 700,
								lineHeight: 1.45,
								marginTop: 22,
							}}
						>
							{descriptor.sub}
						</div>
					) : null}
				</div>

				<div
					style={{
						width: 250,
						height: 292,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						border: "2px solid #dde2ee",
						borderRadius: 24,
						background: "#ffffff",
						padding: "28px 26px",
						boxShadow: "0 16px 48px rgba(0,24,48,.08)",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<span
							style={{
								width: 18,
								height: 18,
								borderRadius: 9,
								background: descriptor.accentColor,
							}}
						/>
						<span style={{ color: "#a0a9b8", fontSize: 12, letterSpacing: 2 }}>
							OFFICIAL
						</span>
					</div>
					<div
						style={{
							color: INK,
							fontSize: 25,
							fontWeight: 900,
							lineHeight: 1.25,
						}}
					>
						{descriptor.categoryLabel}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							color: "#6a7793",
							fontSize: 12,
							fontWeight: 700,
							lineHeight: 1.5,
						}}
					>
						<span>ARTICLE</span>
						<span style={{ color: descriptor.accentColor, fontSize: 15 }}>
							{descriptor.motif.toUpperCase()}
						</span>
					</div>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					justifyContent: "space-between",
					borderTop: "1px solid #dde2ee",
					paddingTop: 20,
				}}
			>
				<div style={{ color: "#8089a0", fontSize: 16, fontWeight: 700 }}>
					監修: Yosuke Onodera ・ WALC VISA Consulting
				</div>
				<div
					style={{
						color: INK,
						fontSize: 22,
						fontWeight: 900,
						letterSpacing: 2,
					}}
				>
					WALC VISA
				</div>
			</div>
		</div>,
		{ ...size, fonts: fonts.length ? fonts : undefined },
	);
}

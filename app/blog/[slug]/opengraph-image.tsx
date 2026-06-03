/**
 * app/blog/[slug]/opengraph-image.tsx — 記事 OG(1200×630 / WI-036)
 * ----------------------------------------------------------------------------
 * クリーンネイビー配色のカバーを OG として動的生成。JP フォント(Noto Sans JP)
 * を Google Fonts から取得。動的生成のためビルドはブロックしない。
 * ----------------------------------------------------------------------------
 */

import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/blog/registry";
import { resolveCover } from "@/lib/blog/presentation";

export const alt = "WALC VISA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#16264f";
const GOLD = "#b8893f";

async function loadFont(weight: number): Promise<ArrayBuffer | null> {
	try {
		const css = await fetch(
			`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&display=swap`,
			{ headers: { "User-Agent": "Mozilla/5.0" } },
		).then((r) => r.text());
		const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:woff2|truetype|opentype)'\)/)?.[1];
		if (!url) return null;
		return await fetch(url).then((r) => r.arrayBuffer());
	} catch {
		return null;
	}
}

export default async function OgImage({
	params,
}: {
	params: { slug: string };
}) {
	const article = getArticleBySlug(params.slug);
	const cover = article
		? resolveCover(article)
		: { kicker: "WALC VISA", titleLines: ["タイ VISA ガイド"], sub: "", accentWord: undefined };

	const [bold, black] = await Promise.all([loadFont(700), loadFont(900)]);
	const fonts = [
		...(bold ? [{ name: "Noto", data: bold, weight: 700 as const, style: "normal" as const }] : []),
		...(black ? [{ name: "Noto", data: black, weight: 900 as const, style: "normal" as const }] : []),
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
				padding: "64px 70px",
				fontFamily: "Noto, sans-serif",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ color: GOLD, fontSize: 22, fontWeight: 700, letterSpacing: 6 }}>
					{cover.kicker}
				</div>
				<div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
					{cover.titleLines.map((line) => (
						<div key={line} style={{ color: INK, fontSize: 70, fontWeight: 900, lineHeight: 1.15 }}>
							{line}
						</div>
					))}
				</div>
				<div style={{ width: 124, height: 7, borderRadius: 4, background: "#caa14a", marginTop: 22 }} />
				{cover.sub ? (
					<div style={{ color: "#46506b", fontSize: 24, fontWeight: 700, marginTop: 26 }}>
						{cover.sub}
					</div>
				) : null}
			</div>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
				<div style={{ color: "#8089a0", fontSize: 16, fontWeight: 700 }}>
					監修: Yosuke Onodera ・ WALC VISA Consulting
				</div>
				<div style={{ color: INK, fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>WALC VISA</div>
			</div>
		</div>,
		{ ...size, fonts: fonts.length ? fonts : undefined },
	);
}

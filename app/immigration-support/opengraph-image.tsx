/**
 * app/immigration-support/opengraph-image.tsx — 入国サポート LP の OG(1200×630)
 * ----------------------------------------------------------------------------
 * 白地 × ネイビー#001830 × ゴールド#caa14a。見出し「タイで入国を止められたら/
 * まだ諦めないで。」+「LINE 無料相談」。Noto Sans JP を Google Fonts から取得。
 * 動的生成のためビルドはブロックしない。og:image + twitter:image を自動配線。
 * ----------------------------------------------------------------------------
 */

import { ImageResponse } from "next/og";

export const alt =
	"タイで入国を止められたら——まだ諦めないで。WALC VISA に LINE で無料相談";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#001830";
const GOLD = "#b8893f";
const GREEN = "#06c755";

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

export default async function OgImage() {
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
				background: "#ffffff",
				padding: "64px 70px",
				fontFamily: "Noto, sans-serif",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						color: GOLD,
						fontSize: 22,
						fontWeight: 700,
						letterSpacing: 6,
					}}
				>
					入国・トラブル対応 ・ 緊急相談
				</div>
				<div
					style={{ display: "flex", flexDirection: "column", marginTop: 26 }}
				>
					<div
						style={{
							color: INK,
							fontSize: 66,
							fontWeight: 900,
							lineHeight: 1.18,
						}}
					>
						タイで入国を止められたら。
					</div>
					<div
						style={{
							color: GOLD,
							fontSize: 66,
							fontWeight: 900,
							lineHeight: 1.18,
						}}
					>
						まだ、諦めないで。
					</div>
				</div>
				<div
					style={{
						width: 124,
						height: 7,
						borderRadius: 4,
						background: "#caa14a",
						marginTop: 24,
					}}
				/>
				<div
					style={{
						color: "#46506b",
						fontSize: 25,
						fontWeight: 700,
						marginTop: 26,
					}}
				>
					オーバーステイ・強制送還も。まずは LINE で無料相談を。
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						background: GREEN,
						color: "#ffffff",
						fontSize: 24,
						fontWeight: 900,
						padding: "12px 26px",
						borderRadius: 999,
					}}
				>
					LINE 無料相談
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
					}}
				>
					<div style={{ color: "#8089a0", fontSize: 16, fontWeight: 700 }}>
						タイ在住13年 ・ 監修 Yosuke Onodera
					</div>
					<div
						style={{
							color: INK,
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2,
							marginTop: 4,
						}}
					>
						WALC VISA
					</div>
				</div>
			</div>
		</div>,
		{ ...size, fonts: fonts.length ? fonts : undefined },
	);
}

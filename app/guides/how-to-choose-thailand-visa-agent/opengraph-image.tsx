import { ImageResponse } from "next/og";

export const alt =
	"タイのビザ代行会社を選ぶ7つの基準。目的・料金範囲・安全性を証拠から比較するWALC VISAガイド";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#001830";
const BLUE = "#38bdf8";
const GOLD = "#d6aa52";

async function loadFont(weight: number): Promise<ArrayBuffer | null> {
	try {
		const css = await fetch(
			`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&display=swap`,
			{ headers: { "User-Agent": "Mozilla/5.0" } },
		).then((response) => response.text());
		const url = css.match(
			/src:\s*url\(([^)]+)\)\s*format\('(?:woff2|truetype|opentype)'\)/,
		)?.[1];
		if (!url) return null;
		return await fetch(url).then((response) => response.arrayBuffer());
	} catch {
		return null;
	}
}

export default async function OpenGraphImage() {
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
				position: "relative",
				overflow: "hidden",
				background: NAVY,
				color: "#ffffff",
				padding: "62px 72px",
				fontFamily: "Noto, sans-serif",
			}}
		>
			<div
				style={{
					position: "absolute",
					width: 520,
					height: 520,
					right: -150,
					top: -190,
					borderRadius: 999,
					border: "2px solid rgba(56,189,248,0.28)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					width: 360,
					height: 360,
					right: -40,
					top: -80,
					borderRadius: 999,
					border: "2px solid rgba(214,170,82,0.3)",
				}}
			/>
			<div
				style={{
					display: "flex",
					width: "100%",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							fontSize: 21,
							fontWeight: 700,
							letterSpacing: 4,
							color: BLUE,
						}}
					>
						WALC VISA ・ DECISION GUIDE
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginTop: 38,
							fontSize: 66,
							fontWeight: 900,
							lineHeight: 1.18,
							letterSpacing: -2,
						}}
					>
						<span>タイのビザ代行会社</span>
						<span style={{ color: BLUE }}>選ぶ7つの基準</span>
					</div>
					<div
						style={{
							display: "flex",
							marginTop: 30,
							fontSize: 27,
							fontWeight: 700,
							color: "rgba(255,255,255,0.78)",
						}}
					>
						知名度だけでなく、支援範囲と確認できる証拠で比較
					</div>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div style={{ display: "flex", gap: 14 }}>
						{["目的適合", "料金範囲", "情報管理", "一次情報"].map((label) => (
							<span
								key={label}
								style={{
									display: "flex",
									border: "1px solid rgba(255,255,255,0.24)",
									borderRadius: 999,
									padding: "9px 18px",
									fontSize: 18,
									fontWeight: 700,
								}}
							>
								{label}
							</span>
						))}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-end",
						}}
					>
						<span style={{ color: GOLD, fontSize: 17, fontWeight: 700 }}>
							日本語で確認できるタイVISA情報
						</span>
						<span
							style={{
								marginTop: 5,
								fontSize: 22,
								fontWeight: 900,
								letterSpacing: 2,
							}}
						>
							walc-visa.online
						</span>
					</div>
				</div>
			</div>
		</div>,
		{ ...size, fonts: fonts.length ? fonts : undefined },
	);
}

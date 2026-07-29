/**
 * components/blog/BlogCover.tsx — VISA ブログ専用カバー(クリーンネイビー)
 * ----------------------------------------------------------------------------
 * WI-036 / 設計§2(Owner 承認 2026-06-03)。viewBox 1200×675 の SVG で、
 * ヒーロー(記事先頭)・一覧カードサムネ・OG の元として使い回す。
 *
 * トークン: bg #f7f8fb / ネイビー #001830 / ゴールド #caa14a(ライト面文字 #b8893f)
 * / 枠 #dde2ee / 本文 #46506b / faint #8089a0。walc-design ブルー不使用。
 * 1 記事 1 デザイン: motif で主役線画を切替。
 * ----------------------------------------------------------------------------
 */

import type { CoverMotif } from "@/lib/blog/types";

const INK = "#001830";
const GOLD = "#caa14a";
const GOLD_TEXT = "#b8893f";
const BORDER = "#dde2ee";

interface BlogCoverProps {
	motif: CoverMotif;
	kicker: string;
	titleLines: string[];
	accentWord?: string;
	sub?: string;
	byline?: string;
	/** ヒーロー以外(カード等)では装飾を簡略化。 */
	compact?: boolean;
	className?: string;
}

/** WALC ドットエンブレム(中心ゴールド / inner ネイビー / outer ゴールド)。 */
function WalcEmblem({ cx, cy }: { cx: number; cy: number }) {
	return (
		<g>
			<circle
				cx={cx}
				cy={cy}
				r="26"
				fill="none"
				stroke={GOLD}
				strokeWidth="3"
			/>
			<circle cx={cx} cy={cy} r="16" fill={INK} />
			<circle cx={cx} cy={cy} r="6" fill={GOLD} />
		</g>
	);
}

/** 主役モチーフ(白カード内の線画)。x,y 基準 = カード左上(800,206)。 */
function Motif({ motif }: { motif: CoverMotif }) {
	// 白カード(共通枠)+ ネイビー背表紙
	const card = (
		<>
			<rect
				x="800"
				y="206"
				width="338"
				height="300"
				rx="18"
				fill="#fff"
				stroke={BORDER}
				strokeWidth="2"
			/>
			<rect x="800" y="206" width="14" height="300" rx="7" fill={INK} />
		</>
	);
	switch (motif) {
		case "documents":
			return (
				<g transform="rotate(-6 950 360)">
					{card}
					<rect x="846" y="246" width="250" height="44" rx="6" fill="#eef1f8" />
					{[306, 340, 374, 408].map((y) => (
						<rect
							key={y}
							x="846"
							y={y}
							width="250"
							height="10"
							rx="5"
							fill="#e3e8f3"
						/>
					))}
					<rect
						x="846"
						y="306"
						width="150"
						height="10"
						rx="5"
						fill={GOLD}
						opacity="0.7"
					/>
					<text
						x="975"
						y="468"
						textAnchor="middle"
						fill="#6a7793"
						fontSize="13"
						fontWeight="500"
						letterSpacing="3"
					>
						DOCUMENTS
					</text>
				</g>
			);
		case "calendar":
			return (
				<g transform="rotate(-6 950 360)">
					{card}
					<rect x="846" y="250" width="246" height="40" rx="6" fill={INK} />
					{[0, 1, 2, 3].map((r) =>
						[0, 1, 2, 3, 4].map((c) => (
							<rect
								key={`${r}-${c}`}
								x={852 + c * 48}
								y={302 + r * 40}
								width="36"
								height="28"
								rx="4"
								fill={r === 1 && c === 2 ? GOLD : "#eef1f8"}
							/>
						)),
					)}
					<text
						x="975"
						y="476"
						textAnchor="middle"
						fill="#6a7793"
						fontSize="13"
						fontWeight="500"
						letterSpacing="3"
					>
						180 / 360 DAYS
					</text>
				</g>
			);
		case "baht":
			return (
				<g transform="rotate(-6 950 360)">
					{card}
					<circle
						cx="975"
						cy="340"
						r="78"
						fill="none"
						stroke={GOLD}
						strokeWidth="3"
					/>
					<text
						x="975"
						y="372"
						textAnchor="middle"
						fill={INK}
						fontSize="92"
						fontWeight="900"
					>
						฿
					</text>
					<text
						x="975"
						y="468"
						textAnchor="middle"
						fill="#6a7793"
						fontSize="13"
						fontWeight="500"
						letterSpacing="3"
					>
						500,000 THB
					</text>
				</g>
			);
		case "stamp":
			return (
				<g transform="rotate(-6 950 360)">
					{card}
					<g transform="rotate(-10 975 340)">
						<circle
							cx="975"
							cy="338"
							r="72"
							fill="none"
							stroke={GOLD}
							strokeWidth="4"
						/>
						<circle
							cx="975"
							cy="338"
							r="58"
							fill="none"
							stroke={GOLD}
							strokeWidth="1.5"
						/>
						<text
							x="975"
							y="330"
							textAnchor="middle"
							fill={GOLD_TEXT}
							fontSize="22"
							fontWeight="700"
							letterSpacing="3"
						>
							ARRIVAL
						</text>
						<text
							x="975"
							y="360"
							textAnchor="middle"
							fill={GOLD_TEXT}
							fontSize="13"
							fontWeight="500"
							letterSpacing="2"
						>
							THAILAND
						</text>
					</g>
					<text
						x="975"
						y="476"
						textAnchor="middle"
						fill="#6a7793"
						fontSize="13"
						fontWeight="500"
						letterSpacing="3"
					>
						IMMIGRATION
					</text>
				</g>
			);
		case "map-pin":
			return (
				<g transform="rotate(-6 950 360)">
					{card}
					<path
						d="M975 270c-34 0-60 26-60 60 0 42 60 96 60 96s60-54 60-96c0-34-26-60-60-60z"
						fill="none"
						stroke={INK}
						strokeWidth="4"
					/>
					<circle cx="975" cy="330" r="22" fill={GOLD} />
					<text
						x="975"
						y="486"
						textAnchor="middle"
						fill="#6a7793"
						fontSize="13"
						fontWeight="500"
						letterSpacing="3"
					>
						THAILAND
					</text>
				</g>
			);
		default:
			// passport(承認版リファレンス)
			return (
				<g transform="rotate(-6 950 360)">
					{card}
					<text
						x="975"
						y="262"
						textAnchor="middle"
						fill={INK}
						fontSize="16"
						fontWeight="700"
						letterSpacing="6"
					>
						PASSPORT
					</text>
					<WalcEmblem cx={975} cy={350} />
					<text
						x="975"
						y="468"
						textAnchor="middle"
						fill="#6a7793"
						fontSize="14"
						fontWeight="500"
						letterSpacing="3"
					>
						THAILAND ・ LONG STAY
					</text>
				</g>
			);
	}
}

/** titleLines を描画(accentWord をゴールド強調)。 */
function TitleLines({
	lines,
	accentWord,
}: {
	lines: string[];
	accentWord?: string;
}) {
	return (
		<>
			{lines.map((line, i) => {
				const y = 316 + i * 92;
				if (accentWord && line.includes(accentWord)) {
					const [before, after] = line.split(accentWord);
					return (
						<text
							key={line}
							x="66"
							y={y}
							fill={INK}
							fontSize="74"
							fontWeight="900"
						>
							{before}
							<tspan fill={GOLD_TEXT}>{accentWord}</tspan>
							{after}
						</text>
					);
				}
				return (
					<text
						key={line}
						x="66"
						y={y}
						fill={INK}
						fontSize="74"
						fontWeight="900"
					>
						{line}
					</text>
				);
			})}
		</>
	);
}

export function BlogCover({
	motif,
	kicker,
	titleLines,
	accentWord,
	sub,
	byline = "監修: Yosuke Onodera ・ WALC VISA Consulting",
	compact = false,
	className,
}: BlogCoverProps) {
	const underlineY = 316 + titleLines.length * 92 - 28;
	const subY = underlineY + 66;
	return (
		<svg
			viewBox="0 0 1200 675"
			className={className}
			role="img"
			aria-label={`${kicker} ${titleLines.join(" ")}`}
			preserveAspectRatio="xMidYMid slice"
		>
			<defs>
				<radialGradient id="vbo1">
					<stop offset="0" stopColor={INK} stopOpacity="0.08" />
					<stop offset="1" stopColor={INK} stopOpacity="0" />
				</radialGradient>
				<radialGradient id="vbo2">
					<stop offset="0" stopColor={GOLD} stopOpacity="0.14" />
					<stop offset="1" stopColor={GOLD} stopOpacity="0" />
				</radialGradient>
				<pattern id="vbd" width="26" height="26" patternUnits="userSpaceOnUse">
					<circle cx="2" cy="2" r="1.4" fill={INK} opacity="0.1" />
				</pattern>
			</defs>
			<rect width="1200" height="675" fill="#f7f8fb" />
			<circle cx="320" cy="150" r="320" fill="url(#vbo1)" />
			<circle cx="1020" cy="540" r="300" fill="url(#vbo2)" />
			{!compact && (
				<rect x="770" y="60" width="380" height="230" fill="url(#vbd)" />
			)}

			<Motif motif={motif} />

			<text
				x="70"
				y="172"
				fill={GOLD_TEXT}
				fontSize="21"
				fontWeight="700"
				letterSpacing="6"
			>
				{kicker}
			</text>
			<TitleLines lines={titleLines} accentWord={accentWord} />
			<rect x="70" y={underlineY} width="124" height="7" rx="3.5" fill={GOLD} />
			{sub && (
				<text x="70" y={subY} fill="#46506b" fontSize="25" fontWeight="500">
					{sub}
				</text>
			)}
			<text x="70" y="624" fill="#8089a0" fontSize="15" fontWeight="500">
				{byline}
			</text>
			<text
				x="1130"
				y="624"
				textAnchor="end"
				fill={INK}
				opacity="0.85"
				fontSize="20"
				fontWeight="900"
				letterSpacing="2"
			>
				WALC VISA
			</text>
		</svg>
	);
}

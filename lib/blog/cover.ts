/**
 * lib/blog/cover.ts — VISA ブログ「クリーンネイビー」マガジン型カバー(記事専用)。
 * ----------------------------------------------------------------------------
 * 正本: walc-studio/knowledge/WALC-VISA-BLOG-DESIGN.md(Owner 承認「B クリーンネイビー」/ 2026-06-03)。
 * トークン: bg #f7f8fb / navy #16264f / gold #caa14a(ライト面文字 #b8893f)/ slate #46506b。
 * 🔴 walc-design ブルー(#3f5bcf)は不使用。トーン=信頼・公的・安心・清潔。
 * 構成: 白基調 + 微弱 navy/gold orb + navy 網点 + 主役モチーフ + navy 900 タイポ
 *       + 1語ゴールド + ゴールド下線 + kicker + サブ + 監修ロックアップ + WALC VISA マーク。
 * モチーフ: passport / stamp / docs / map-pins / calendar / baht(記事内容で選択)。
 * SVG 文字列にして on-page(inline)と OG(resvg)で同一資産を使う。
 * ----------------------------------------------------------------------------
 */

export type MotifKey =
	| "passport"
	| "stamp"
	| "docs"
	| "map-pins"
	| "calendar"
	| "baht";

export interface CoverSpec {
	motif: MotifKey;
	kicker: string;
	titleLines: string[];
	/** 金ハイライトする語(titleLines に含まれる部分文字列)。 */
	accentWord?: string;
	sub?: string;
}

const NAVY = "#16264f";
const GOLD = "#caa14a";
const GOLD_TEXT = "#b8893f";
const SLATE = "#46506b";
const FONT = '"Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif';

function esc(s: string): string {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** WALC ドットエンブレム(中心ゴールド / inner navy / outer gold)。 */
function emblem(cx: number, cy: number, scale = 1): string {
	const r = (n: number) => (n * scale).toFixed(1);
	return `<g transform="translate(${cx} ${cy})">
    <circle r="${r(26)}" fill="none" stroke="${GOLD}" stroke-width="${r(2)}"/>
    <circle r="${r(17)}" fill="none" stroke="${NAVY}" stroke-width="${r(2)}"/>
    <circle r="${r(6)}" fill="${GOLD}"/>
  </g>`;
}

/** 主役モチーフ(右側)。passport を承認版どおり実装、他5種も同質感。 */
function motif(key: MotifKey): string {
	switch (key) {
		case "passport":
			return `<g transform="rotate(-6 950 360)">
        <rect x="800" y="206" width="338" height="300" rx="18" fill="#fff" stroke="#dde2ee" stroke-width="2"/>
        <rect x="800" y="206" width="14" height="300" rx="7" fill="${NAVY}"/>
        <text x="975" y="262" text-anchor="middle" fill="${NAVY}" font-size="16" font-weight="700" letter-spacing="6" font-family="${FONT}">PASSPORT</text>
        ${emblem(975, 350, 1)}
        <text x="975" y="468" text-anchor="middle" fill="#6a7793" font-size="14" font-weight="500" letter-spacing="3" font-family="${FONT}">THAILAND ・ LONG STAY</text>
      </g>
      <g transform="rotate(-13 1092 252)"><circle cx="1092" cy="252" r="48" fill="none" stroke="${GOLD}" stroke-width="3"/><circle cx="1092" cy="252" r="37" fill="none" stroke="${GOLD}" stroke-width="1.5"/><text x="1092" y="258" text-anchor="middle" fill="${GOLD_TEXT}" font-size="15" font-weight="900" letter-spacing="2" font-family="${FONT}">ARRIVAL</text></g>`;
		case "stamp":
			return `<g transform="rotate(-6 960 360)">
        ${[
					[880, 250, -10],
					[1040, 340, 8],
					[930, 450, -4],
				]
					.map(
						([x, y, rot]) =>
							`<g transform="rotate(${rot} ${x} ${y})"><circle cx="${x}" cy="${y}" r="58" fill="none" stroke="${GOLD}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="45" fill="none" stroke="${GOLD}" stroke-width="1.5"/><text x="${x}" y="${(y as number) + 6}" text-anchor="middle" fill="${GOLD_TEXT}" font-size="16" font-weight="900" letter-spacing="2" font-family="${FONT}">ENTRY</text></g>`,
					)
					.join("")}
      </g>`;
		case "docs":
			return `<g transform="rotate(-5 960 360)">
        <rect x="840" y="220" width="250" height="320" rx="14" fill="#fff" stroke="#dde2ee" stroke-width="2"/>
        <rect x="864" y="252" width="120" height="14" rx="7" fill="${NAVY}"/>
        ${[0, 1, 2, 3, 4]
					.map(
						(i) =>
							`<rect x="864" y="${292 + i * 26}" width="${202 - (i % 2) * 40}" height="9" rx="4.5" fill="#c9d0e2"/>`,
					)
					.join("")}
        <rect x="864" y="452" width="84" height="60" rx="8" fill="${NAVY}" opacity=".1"/>
        <g transform="rotate(-12 1066 286)"><circle cx="1066" cy="286" r="40" fill="none" stroke="${GOLD}" stroke-width="3"/><text x="1066" y="292" text-anchor="middle" fill="${GOLD_TEXT}" font-size="14" font-weight="900" font-family="${FONT}">OK</text></g>
      </g>`;
		case "map-pins":
			return `<g>
        <path d="M820 270 q150 -64 300 8 q-110 96 -300 -8z" fill="#fff" stroke="#dde2ee" stroke-width="2"/>
        ${[
					[900, 280],
					[1030, 266],
					[1080, 330],
				]
					.map(
						([x, y], i) =>
							`<path d="M${x} ${y} c -18 -26 -28 -40 0 -62 c 28 22 18 36 0 62z" fill="${i === 0 ? GOLD : NAVY}"/><circle cx="${x}" cy="${(y as number) - 44}" r="6" fill="#fff"/>`,
					)
					.join("")}
        <path d="M900 280 L1030 266 L1080 330" stroke="${GOLD}" stroke-width="2.5" fill="none" stroke-dasharray="5 7"/>
      </g>`;
		case "calendar":
			return `<g transform="rotate(-5 960 360)">
        <rect x="840" y="234" width="260" height="252" rx="14" fill="#fff" stroke="#dde2ee" stroke-width="2"/>
        <rect x="840" y="234" width="260" height="48" rx="14" fill="${NAVY}"/>
        <text x="970" y="266" text-anchor="middle" fill="#fff" font-size="18" font-weight="700" letter-spacing="3" font-family="${FONT}">180 DAYS</text>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
					.map((i) => {
						const x = 866 + (i % 4) * 58;
						const y = 312 + Math.floor(i / 4) * 54;
						const hi = i === 5;
						return `<rect x="${x}" y="${y}" width="40" height="38" rx="7" fill="${hi ? GOLD : "#eef1f8"}"/>`;
					})
					.join("")}
      </g>`;
		case "baht":
			return `<g transform="rotate(-6 960 360)">
        <circle cx="960" cy="360" r="120" fill="#fff" stroke="#dde2ee" stroke-width="2"/>
        <circle cx="960" cy="360" r="120" fill="none" stroke="${GOLD}" stroke-width="2" stroke-dasharray="3 9"/>
        <text x="960" y="402" text-anchor="middle" fill="${NAVY}" font-size="120" font-weight="900" font-family="${FONT}">฿</text>
        <g transform="rotate(-12 1066 270)"><circle cx="1066" cy="270" r="40" fill="none" stroke="${GOLD}" stroke-width="3"/><text x="1066" y="276" text-anchor="middle" fill="${GOLD_TEXT}" font-size="13" font-weight="900" font-family="${FONT}">THB</text></g>
      </g>`;
	}
}

function titleLine(line: string, y: number, accentWord?: string): string {
	const common = `x="66" y="${y}" fill="${NAVY}" font-size="74" font-weight="900" font-family="${FONT}"`;
	if (accentWord && line.includes(accentWord)) {
		const [before = "", after = ""] = line.split(accentWord);
		return `<text ${common}>${esc(before)}<tspan fill="${GOLD_TEXT}">${esc(accentWord)}</tspan>${esc(after)}</text>`;
	}
	return `<text ${common}>${esc(line)}</text>`;
}

/** カバー SVG 文字列(viewBox 1200×675)。on-page と OG で共用。 */
export function buildCoverSvg(cover: CoverSpec): string {
	const lines = cover.titleLines.slice(0, 2);
	const firstY = 316 + (lines.length === 1 ? 46 : 0);
	const titles = lines
		.map((l, i) => titleLine(l, firstY + i * 92, cover.accentWord))
		.join("");
	const underlineY = firstY + (lines.length - 1) * 92 + 32;
	const sub = cover.sub
		? `<text x="70" y="${underlineY + 60}" fill="${SLATE}" font-size="25" font-weight="500" font-family="${FONT}">${esc(cover.sub)}</text>`
		: "";

	return `<svg viewBox="0 0 1200 675" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(cover.kicker)}">
  <defs>
    <radialGradient id="o1"><stop offset="0" stop-color="${NAVY}" stop-opacity=".08"/><stop offset="1" stop-color="${NAVY}" stop-opacity="0"/></radialGradient>
    <radialGradient id="o2"><stop offset="0" stop-color="${GOLD}" stop-opacity=".14"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/></radialGradient>
    <pattern id="d" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="${NAVY}" opacity=".10"/></pattern>
  </defs>
  <rect width="1200" height="675" fill="#f7f8fb"/>
  <circle cx="320" cy="150" r="320" fill="url(#o1)"/><circle cx="1020" cy="540" r="300" fill="url(#o2)"/>
  <rect x="770" y="60" width="380" height="230" fill="url(#d)"/>
  ${motif(cover.motif)}
  <text x="70" y="172" fill="${GOLD_TEXT}" font-size="21" font-weight="700" letter-spacing="6" font-family="${FONT}">${esc(cover.kicker)}</text>
  ${titles}
  <rect x="70" y="${underlineY}" width="124" height="7" rx="3.5" fill="${GOLD}"/>
  ${sub}
  <text x="70" y="624" fill="#8089a0" font-size="15" font-weight="500" font-family="${FONT}">監修:WALC VISA Consulting</text>
  <text x="1130" y="624" text-anchor="end" fill="${NAVY}" opacity=".85" font-size="20" font-weight="900" letter-spacing="2" font-family="${FONT}">WALC VISA</text>
</svg>`;
}

export function coverDataUri(cover: CoverSpec): string {
	return `data:image/svg+xml;utf8,${encodeURIComponent(buildCoverSvg(cover))}`;
}

/**
 * app/immigration-support/layout.tsx — 入国サポート LP 専用レイアウト
 * ----------------------------------------------------------------------------
 * 白地 × ネイビー × ゴールド + LINE グリーン CTA。Noto Sans JP(900/700)+
 * Noto Serif JP を /immigration-support 配下にスコープ適用。ブログとは別の
 * デザイン言語(LP 専用)だが WALC VISA ブランドと整合。
 * ----------------------------------------------------------------------------
 */

import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./immigration.css";

const notoSans = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
	display: "swap",
	variable: "--font-imm-sans",
});

const notoSerif = Noto_Serif_JP({
	subsets: ["latin"],
	weight: ["600", "700"],
	display: "swap",
	variable: "--font-imm-serif",
});

export default function ImmigrationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`imm-theme ${notoSans.variable} ${notoSerif.variable}`}>
			{children}
		</div>
	);
}

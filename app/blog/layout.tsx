/**
 * app/blog/layout.tsx — VISA ブログ専用レイアウト(WI-036 / クリーンネイビー)
 * ----------------------------------------------------------------------------
 * 設計§1 のトークン(bg #f7f8fb / Noto Sans JP 900 + Noto Serif JP)を /blog
 * 配下にスコープ適用。サイト本体のトークンとは独立。
 * ----------------------------------------------------------------------------
 */

import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import "./blog-theme.css";

const notoSans = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
	display: "swap",
	variable: "--font-vb-sans",
});

const notoSerif = Noto_Serif_JP({
	subsets: ["latin"],
	weight: ["500", "600"],
	display: "swap",
	variable: "--font-vb-serif",
});

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<div
				className={`vb-theme ${notoSans.variable} ${notoSerif.variable} flex-1 pt-16 md:pt-20`}
			>
				{children}
			</div>
			<Footer />
		</>
	);
}

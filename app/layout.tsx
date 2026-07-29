/**
 * app/layout.tsx — walc-visa.online (メインサイト)
 * ----------------------------------------------------------------------------
 * フォント: Plus Jakarta Sans + Noto Sans JP (DTV LP と統一)
 * Cormorant Garamond は将来の装飾見出し用に保持。
 * ----------------------------------------------------------------------------
 */

import type { Metadata } from "next";
import {
	Cormorant_Garamond,
	Noto_Sans_JP,
	Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-jakarta",
});

const notoSansJp = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
	variable: "--font-noto-sans-jp",
});

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-cormorant",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://walc-visa.online"),
	title: {
		default: "WALC VISA Consulting — タイVISA取得・運用の専門コンサルティング",
		template: "%s | WALC VISA Consulting",
	},
	description:
		"DTV / リタイア / Thailand Privilege / LTR / 学生 / 結婚など、タイ長期VISA全種別に日本語対応。新規相談はLINE、申込後の進捗確認と追加書類はお客様専用画面で連携サポート。",
	keywords: [
		"タイ ビザ",
		"タイ VISA",
		"DTV",
		"Thailand Privilege",
		"LTR",
		"リタイアメントビザ",
		"学生ビザ",
		"WALC",
		"WALC VISA Consulting",
	],
	authors: [{ name: "WALC DESIGN Co., Ltd." }],
	creator: "WALC DESIGN Co., Ltd.",
	publisher: "WALC DESIGN Co., Ltd.",
	alternates: {
		canonical: "/",
		languages: { ja: "/", "x-default": "/" },
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "/",
		siteName: "WALC VISA Consulting",
		title: "WALC VISA Consulting — タイVISA取得・運用の専門コンサルティング",
		description:
			"タイ長期VISA全種別に日本語対応。新規相談はLINE、申込後の進捗確認と追加書類はお客様専用画面で連携サポート。",
		images: [
			{
				url: "/images/AdobeStock_494541408.jpeg",
				width: 1200,
				height: 630,
				alt: "WALC VISA Consulting - タイ VISA 取得代行",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "WALC VISA Consulting",
		description:
			"タイVISA取得・運用の専門コンサル。新規相談はLINE、申込後はお客様専用画面で進捗と追加書類を確認できます。",
		images: ["/images/AdobeStock_494541408.jpeg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-snippet": -1,
			"max-image-preview": "large",
			"max-video-preview": -1,
		},
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html
			lang="ja"
			className={`${jakarta.variable} ${notoSansJp.variable} ${cormorant.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
				{children}
			</body>
		</html>
	);
}

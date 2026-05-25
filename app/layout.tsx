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
		"タイ国内最大級のVISA取得実績(300件以上)。DTV / リタイア / Thailand Privilege / LTR / 学生 / 結婚 など全種別に対応。専用CRMアプリで申込から取得後の管理まで一気通貫サポート。",
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
			"タイ国内最大級のVISA取得実績(300件以上)。DTV / リタイア / Thailand Privilege / LTR など全種別に対応。",
	},
	twitter: {
		card: "summary_large_image",
		title: "WALC VISA Consulting",
		description: "タイVISA取得・運用の専門コンサル。300件超の取得実績。",
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

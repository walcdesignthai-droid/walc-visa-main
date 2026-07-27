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
import { StructuredData } from "@/components/seo/StructuredData";
import { getDtvAcquisitionStats } from "@/lib/walc-data/stats";
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

const dtvStats = getDtvAcquisitionStats();

export const metadata: Metadata = {
	metadataBase: new URL("https://walc-visa.online"),
	title: {
		default: "DTV VISA取得サポート｜5年間のタイ長期滞在ならWALC",
		template: "%s | WALC VISA Consulting",
	},
	description: `タイのDTV VISA（5年マルチプル）取得を日本語で徹底サポート。入国拒否歴・オーバーステイ歴・50万THBの資金証明に不安がある方も個別相談。${dtvStats.periodLabel}の申請通過実績は${dtvStats.successfulApplicationsLabel}（将来の取得を保証するものではありません）。`,
	keywords: [
		"DTV VISA",
		"タイ DTV ビザ",
		"タイ ノマドビザ",
		"Destination Thailand Visa",
		"DTV 申請",
		"DTV 取得サポート",
		"タイ 入国拒否",
		"タイ 長期滞在",
		"Thailand Privilege",
		"LTR",
		"リタイアメントビザ",
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
		title: "DTV VISAで5年間のタイ長期滞在｜WALC VISA Consulting",
		description:
			"入国審査の厳格化に、渡航前のDTV取得という備えを。書類確認から申請受理まで日本語で伴走します。",
		images: [
			{
				url: "/images/walc-visa-dtv-ads.png",
				width: 1040,
				height: 1040,
				alt: "DTV VISAで5年間のタイ長期滞在を支援するWALC VISA Consulting",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "DTV VISA取得サポート｜WALC VISA Consulting",
		description:
			"5年マルチプルのDTV取得を日本語で伴走。入国履歴や資金証明に不安がある方も個別相談。",
		images: ["/images/walc-visa-dtv-ads.png"],
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
			<head>
				{/* SEO 構造化データ (JSON-LD) — ProfessionalService / FAQPage / WebSite / LocalBusiness */}
				<StructuredData />
			</head>
			<body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
				{children}
			</body>
		</html>
	);
}

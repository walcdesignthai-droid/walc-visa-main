/**
 * app/corporate/layout.tsx — 法人向けセクション共通レイアウト
 * ----------------------------------------------------------------------------
 * 役割:
 *   1. 型階層のスコープ。個人向けより一段小さく組む(大きい文字は BtoC に見える)。
 *      本文 14px / leading 1.95 をこのサブツリーにだけ効かせ、他ページへ漏らさない。
 *      見出しのみ明朝(font-serif)= 全面明朝にはしない。
 *   2. 共通 Header / Footer と、モバイル下部固定の LINE CTA。
 *
 * ⚠️ Breadcrumb(JSON-LD)は各ページ側で出す(階層が異なるため)。
 * ----------------------------------------------------------------------------
 */

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { SITE_URLS } from "@/lib/walc-data/site-map";

interface CorporateLayoutProps {
	children: React.ReactNode;
}

export default function CorporateLayout({ children }: CorporateLayoutProps) {
	return (
		<>
			<Header />
			{/*
			 * pb-20 md:pb-0 = モバイル固定 CTA バーの高さぶんの逃げ。
			 * text-[14px] leading-[1.95] = 法人向けの本文基準(スコープ)。
			 */}
			<main className="flex-1 pt-16 pb-20 text-[14px] leading-[1.95] md:pt-20 md:pb-0">
				{children}
			</main>
			<Footer />

			{/* モバイル下部固定 CTA(handoff §4 レイアウト) */}
			<div className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-white/95 px-4 py-3 backdrop-blur-sm md:hidden">
				<a
					href={SITE_URLS.social.line}
					target="_blank"
					rel="noopener noreferrer"
					className="flex min-h-11 w-full items-center justify-center rounded-md bg-accent-blue text-[14px] font-semibold text-white transition-colors hover:bg-accent-blue-bright"
				>
					LINEで相談する(無料)
				</a>
			</div>
		</>
	);
}

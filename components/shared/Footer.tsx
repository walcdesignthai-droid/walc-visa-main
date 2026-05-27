/**
 * components/shared/Footer.tsx — 共通フッター (全 LP / 詳細ページ)
 * ----------------------------------------------------------------------------
 * v2.0 (2026-05-26) — 全 WALC サイトの相互リンク + CRM 法務 (Yosuke 指示)
 *   - 関連サイト: メイン / DTV / 企業向け / 顧客ポータル
 *   - 法務: 利用規約 / プライバシー / キャンセル規定 (CRM 直リンク)
 *   - VISA ナビ: 内部詳細ページへの導線統一
 * ----------------------------------------------------------------------------
 */

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { WalcLogo } from "@/components/shared/WalcLogo";
import {
	FOOTER_LEGAL_LINKS,
	FOOTER_RELATED_SITES,
	SITE_URLS,
} from "@/lib/walc-data/site-map";

const FOOTER_VISA_NAV: { href: string; label: string }[] = [
	{ href: "/visas/dtv", label: "DTV (Destination Thailand Visa)" },
	{ href: "/visas/retirement", label: "リタイアメント VISA" },
	{ href: "/visas/ltr", label: "LTR Visa" },
	{ href: "/#visa-types", label: "Thailand Privilege / 他 VISA 一覧" },
	{ href: "/#trouble-support", label: "トラブル対応 (オーバーステイ等)" },
];

const FOOTER_COMPANY_NAV: { href: string; label: string }[] = [
	{ href: "/#why-walc", label: "WALC が選ばれる理由" },
	{ href: "/#consult", label: "AI コンシェルジュ + 無料相談" },
	{ href: "/#company-info", label: "会社概要" },
];

export function Footer() {
	return (
		<footer className="bg-brand-deep text-text-on-dark">
			<div className="mx-auto max-w-content px-5 md:px-8 py-12 md:py-16">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
					{/* ロゴ + tagline */}
					<div className="col-span-2 md:col-span-1">
						<WalcLogo variant="light" />
						<p className="mt-4 text-sm text-white/70 leading-relaxed">
							タイ VISA 取得・運用の
							<br />
							専門コンサルティング
						</p>
						<p className="mt-3 text-[11px] text-white/50 leading-relaxed">
							WALC DESIGN Co., Ltd.
							<br />
							バンコク・トンロー
						</p>
					</div>

					{/* VISA */}
					<div>
						<h3 className="text-xs font-bold tracking-wider uppercase mb-4 text-white/90">
							VISA 種別
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_VISA_NAV.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-sm text-white/70 hover:text-white transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* 会社情報 */}
					<div>
						<h3 className="text-xs font-bold tracking-wider uppercase mb-4 text-white/90">
							WALC について
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_COMPANY_NAV.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className="text-sm text-white/70 hover:text-white transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* 関連サイト */}
					<div>
						<h3 className="text-xs font-bold tracking-wider uppercase mb-4 text-white/90">
							関連サイト
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_RELATED_SITES.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors group"
									>
										{item.label}
										<ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* 法務 (CRM 直参照) */}
					<div>
						<h3 className="text-xs font-bold tracking-wider uppercase mb-4 text-white/90">
							法務
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_LEGAL_LINKS.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors group"
									>
										{item.label}
										<ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
									</a>
								</li>
							))}
							<li>
								<a
									href={`mailto:${SITE_URLS.email}`}
									className="text-sm text-white/70 hover:text-white transition-colors"
								>
									{SITE_URLS.email}
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<p className="text-xs text-white/50">
						© {new Date().getFullYear()} WALC DESIGN Co., Ltd. — WALC VISA Consulting. All rights reserved.
					</p>
					<div className="flex items-center gap-4 text-xs text-white/50">
						<a
							href={SITE_URLS.portal}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							顧客ポータル ログイン
						</a>
						<a
							href={SITE_URLS.social.x}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							X (Twitter)
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

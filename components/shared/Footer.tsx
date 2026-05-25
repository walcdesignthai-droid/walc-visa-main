/**
 * components/shared/Footer.tsx — walc-visa.online メインサイト
 * ----------------------------------------------------------------------------
 * フッター(ネイビー濃色背景 + 白文字)。
 * 会社情報・法務・SNS リンクを集約。
 * ----------------------------------------------------------------------------
 */

import Link from "next/link";
import { WalcLogo } from "@/components/shared/WalcLogo";
import { EXTERNAL_LINKS } from "@/lib/walc-links";

const FOOTER_NAV = {
	visa: [
		{ href: "#dtv", label: "DTV (Destination Thailand Visa)" },
		{ href: "#elite", label: "Thailand Privilege (旧Elite)" },
		{ href: "#ltr", label: "LTR" },
		{ href: "#retirement", label: "リタイアメントVISA" },
		{ href: "#student", label: "学生VISA" },
		{ href: "#marriage", label: "結婚・家族VISA" },
	],
	company: [
		{ href: "#about", label: "WALC について" },
		{ href: "#results", label: "取得実績" },
		{ href: "#contact", label: "お問い合わせ" },
	],
	legal: [
		{ href: "/privacy", label: "プライバシーポリシー" },
		{ href: "/terms", label: "利用規約" },
		{ href: "/tokutei", label: "特定商取引法に基づく表記" },
	],
} as const;

export function Footer() {
	return (
		<footer className="bg-brand-deep text-text-on-dark">
			<div className="mx-auto max-w-content px-5 md:px-8 py-12 md:py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
					<div className="md:col-span-1">
						<WalcLogo variant="light" />
						<p className="mt-4 text-sm text-white/70 leading-relaxed">
							タイVISA取得・運用の
							<br />
							専門コンサルティング
						</p>
					</div>

					<div>
						<h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white/90">
							VISA 種別
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_NAV.visa.map((item) => (
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

					<div>
						<h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white/90">
							会社情報
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_NAV.company.map((item) => (
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

					<div>
						<h3 className="text-sm font-bold tracking-wider uppercase mb-4 text-white/90">
							法務
						</h3>
						<ul className="space-y-2.5">
							{FOOTER_NAV.legal.map((item) => (
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
				</div>

				<div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<p className="text-xs text-white/50">
						© {new Date().getFullYear()} WALC DESIGN Co., Ltd. — WALC VISA
						Consulting. All rights reserved.
					</p>
					<div className="flex items-center gap-4 text-xs text-white/50">
						<a
							href={EXTERNAL_LINKS.crm}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							CRM ログイン
						</a>
						<a
							href={EXTERNAL_LINKS.twitter}
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

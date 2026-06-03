import Link from "next/link";
import { SITE_URLS } from "@/lib/walc-data/site-map";

/**
 * BlogShell — VISA ブログ共通の「WALC VISA Journal」ヘッダー + フッター。
 * クリーンネイビー(bg #f7f8fb / navy #16264f / gold #caa14a)。walc-design ブルー不使用。
 */
const NAV = [
	{ label: "ホーム", href: "/" },
	{ label: "ブログ", href: "/blog" },
	{ label: "DTV", href: SITE_URLS.dtv, external: true },
	{ label: "無料診断", href: SITE_URLS.diagnosis, external: true },
];

export function BlogShell({
	children,
}: {
	children: React.ReactNode;
}): React.JSX.Element {
	return (
		<div
			className="min-h-screen text-[#16264f]"
			style={{ background: "#f7f8fb" }}
		>
			<header className="border-b border-[#dde2ee] bg-white/85 backdrop-blur sticky top-0 z-20">
				<div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
					<Link href="/blog" className="flex items-baseline gap-1.5">
						<span className="text-base font-bold tracking-tight text-[#16264f]">
							WALC VISA
						</span>
						<span
							className="text-base font-semibold italic tracking-tight"
							style={{ color: "#b8893f", fontFamily: '"Noto Serif JP",serif' }}
						>
							Journal
						</span>
					</Link>
					<nav className="hidden md:flex items-center gap-5 text-[13px]">
						{NAV.map((n) =>
							n.external ? (
								<a
									key={n.href}
									href={n.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#6a7793] hover:text-[#16264f] transition-colors"
								>
									{n.label}
								</a>
							) : (
								<Link
									key={n.href}
									href={n.href}
									className="text-[#6a7793] hover:text-[#16264f] transition-colors"
								>
									{n.label}
								</Link>
							),
						)}
					</nav>
					<a
						href={SITE_URLS.social.line}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-full px-4 py-2 text-[13px] font-semibold text-white"
						style={{ background: "#16264f" }}
					>
						LINE で相談
					</a>
				</div>
			</header>

			{children}

			<footer className="border-t border-[#dde2ee] bg-white">
				<div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-[#8089a0]">
					<p>© 2026 WALC DESIGN Co., Ltd. / WALC VISA Consulting</p>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
						<Link
							href="/blog"
							className="hover:text-[#16264f] transition-colors"
						>
							ブログ
						</Link>
						<a
							href={SITE_URLS.dtv}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-[#16264f] transition-colors"
						>
							DTV ガイド
						</a>
						<a
							href={SITE_URLS.diagnosis}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-[#16264f] transition-colors"
						>
							無料 VISA 診断
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

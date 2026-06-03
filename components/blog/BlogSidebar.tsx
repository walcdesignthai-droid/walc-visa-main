import { ArrowRight } from "lucide-react";
import { SITE_URLS } from "@/lib/walc-data/site-map";

/** 一覧サイドバー: サービス(navy)/ 実績 / 公式SNS。 */
export function BlogSidebar(): React.JSX.Element {
	return (
		<aside className="space-y-5">
			<div
				className="rounded-2xl p-5 text-white"
				style={{ background: "linear-gradient(135deg,#1c2f63,#16264f)" }}
			>
				<p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">
					Service
				</p>
				<h3 className="mt-1 text-base font-bold leading-snug">
					タイ長期 VISA を、確実に。
				</h3>
				<p className="mt-2 text-[13px] leading-relaxed text-white/75">
					DTV・LTR・リタイア・Privilege・学生/家族。要件診断から申請・更新まで
					WALC VISA が伴走します。
				</p>
				<div className="mt-4 flex flex-wrap gap-2">
					<a
						href={SITE_URLS.social.line}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#16264f]"
					>
						LINE で相談
						<ArrowRight className="h-3.5 w-3.5" />
					</a>
					<a
						href={SITE_URLS.diagnosis}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-[13px] font-semibold text-white"
					>
						無料診断
					</a>
				</div>
			</div>

			<div className="rounded-2xl border border-[#dde2ee] bg-white p-5">
				<p className="text-[11px] uppercase tracking-wider text-[#8089a0] font-semibold">
					Visa
				</p>
				<h3 className="mt-1 text-sm font-bold text-[#16264f]">対応ビザ</h3>
				<ul className="mt-3 space-y-1.5 text-[13px] text-[#46506b]">
					<li>· DTV(Destination Thailand Visa)</li>
					<li>· LTR / Thailand Privilege</li>
					<li>· リタイアメント(NON-O)/ 学生・家族</li>
				</ul>
				<a
					href={SITE_URLS.dtv}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#b8893f] hover:underline"
				>
					DTV 専門サイト
					<ArrowRight className="h-3.5 w-3.5" />
				</a>
			</div>

			<div className="rounded-2xl border border-[#dde2ee] bg-white p-5">
				<p className="text-[11px] uppercase tracking-wider text-[#8089a0] font-semibold">
					Follow
				</p>
				<ul className="mt-2.5 space-y-2 text-[13px]">
					<li>
						<a
							href={SITE_URLS.social.x}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#46506b] hover:text-[#16264f] transition-colors"
						>
							X(@walcvisa) →
						</a>
					</li>
					<li>
						<a
							href={SITE_URLS.social.line}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#46506b] hover:text-[#16264f] transition-colors"
						>
							LINE 公式アカウント →
						</a>
					</li>
				</ul>
			</div>
		</aside>
	);
}

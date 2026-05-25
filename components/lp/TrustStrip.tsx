/**
 * components/lp/TrustStrip.tsx — 実績ストリップ
 * ----------------------------------------------------------------------------
 * Hero 直下に細い帯で並べる「信頼の物量」表示。
 * 5 項目を横並び(モバイルは 2 列グリッド)。
 * ----------------------------------------------------------------------------
 */

import {
	CheckCircle2,
	Clock,
	MapPin,
	ShieldCheck,
	Smartphone,
} from "lucide-react";

const ITEMS = [
	{ Icon: MapPin, value: "6 年", label: "タイ拠点運営" },
	{ Icon: CheckCircle2, value: "212 / 212 件", label: "DTV 取得実績" },
	{ Icon: ShieldCheck, value: "300+ 件", label: "WALC 全体 VISA 取得" },
	{ Icon: Clock, value: "24 h 以内", label: "初回応答" },
	{ Icon: Smartphone, value: "専用 CRM", label: "申込〜運用まで一気通貫" },
] as const;

export function TrustStrip() {
	return (
		<section className="border-y border-border-subtle bg-white">
			<div className="mx-auto max-w-content px-5 md:px-8 py-6 md:py-7">
				<ul className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
					{ITEMS.map(({ Icon, value, label }) => (
						<li key={label} className="flex items-start gap-3">
							<span className="shrink-0 w-9 h-9 rounded-full bg-brand/5 flex items-center justify-center mt-0.5">
								<Icon className="w-4 h-4 text-brand" strokeWidth={2} />
							</span>
							<div className="min-w-0">
								<div className="text-base md:text-lg font-bold text-brand tabular-nums tracking-tight leading-tight">
									{value}
								</div>
								<div className="text-[11px] md:text-xs text-text-secondary mt-0.5 leading-snug">
									{label}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

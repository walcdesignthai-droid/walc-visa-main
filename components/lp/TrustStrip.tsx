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
import { WALC_AUTHOR } from "@/lib/walc-data/eeat";
import { getDtvPublicContent } from "@/lib/walc-data/public-content";

export async function TrustStrip() {
	const content = await getDtvPublicContent();
	const items = [
		{
			Icon: MapPin,
			value: WALC_AUTHOR.experience.thailandResidency,
			label: WALC_AUTHOR.experience.visaSupport,
		},
		{
			Icon: CheckCircle2,
			value: content.trackRecord.display,
			label: content.trackRecord.label,
		},
		{
			Icon: ShieldCheck,
			value: "日本語対応",
			label: "必要書類から追加対応まで伴走",
		},
		{ Icon: Clock, value: "24 h 以内", label: "初回応答(LINE 即レス)" },
		{
			Icon: Smartphone,
			value: "LINE＋専用画面",
			label: "相談〜申込後の進捗を連携",
		},
	] as const;

	return (
		<section className="border-y border-border-subtle bg-white">
			<div className="mx-auto max-w-content px-5 md:px-8 py-6 md:py-7">
				<ul className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
					{items.map(({ Icon, value, label }) => (
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

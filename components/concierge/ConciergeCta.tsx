/**
 * components/concierge/ConciergeCta.tsx
 * ----------------------------------------------------------------------------
 * AI 応答内 CTA タグから生成されるアクションカード。
 *   - line     → LINE 友だち追加 / 相談
 *   - diagnosis → DTV LP の VISA 診断
 *   - apply    → CRM 申込フォーム (visa_id クエリ付き)
 * ----------------------------------------------------------------------------
 */

import {
	ArrowUpRight,
	ClipboardCheck,
	MessageCircle,
	Sparkles,
} from "lucide-react";
import { buildApplicationUrl, getLineAddUrl } from "@/lib/walc-links";
import type { ConciergeCtaType } from "@/lib/concierge/types";

interface Props {
	cta: ConciergeCtaType;
}

const VISA_LABELS: Record<string, string> = {
	dtv: "DTV(Destination Thailand Visa)",
	elite: "Thailand Privilege",
	ltr: "LTR",
	retirement: "リタイアメント VISA",
	student: "学生 VISA",
	family: "結婚・家族 VISA",
};

export function ConciergeCta({ cta }: Props) {
	if (cta === "line") {
		const url = getLineAddUrl();
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-line text-white text-sm font-bold shadow-md hover:bg-line-hover transition-colors"
			>
				<MessageCircle className="w-4 h-4" />
				LINE で詳しく相談する
				<ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
			</a>
		);
	}

	if (cta === "diagnosis") {
		return (
			<a
				href="https://dtv.walc-visa.online/diagnosis"
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-brand text-brand text-sm font-bold shadow-sm hover:bg-brand/5 transition-colors"
			>
				<ClipboardCheck className="w-4 h-4" />
				無料 VISA 診断を始める
				<ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
			</a>
		);
	}

	// apply
	const visaId = cta.visaId;
	const label = VISA_LABELS[visaId] ?? visaId.toUpperCase();
	const url = buildApplicationUrl({
		visaId,
		source: "main-concierge",
		medium: "ai-cta",
	});

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-bold shadow-md hover:bg-brand-deep transition-colors"
		>
			<Sparkles className="w-4 h-4 text-amber-300" />
			{label} で申し込む
			<ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
		</a>
	);
}

/**
 * components/concierge/ConciergeMessage.tsx
 * ----------------------------------------------------------------------------
 * 個別メッセージ吹き出し。
 *   user: 右寄せ・ネイビー
 *   assistant: 左寄せ・白 + WALC アバター
 * ----------------------------------------------------------------------------
 */

import { Sparkles } from "lucide-react";

interface Props {
	role: "user" | "assistant";
	content: string;
}

export function ConciergeMessageBubble({ role, content }: Props) {
	if (role === "user") {
		return (
			<div className="flex justify-end">
				<div className="max-w-[85%] px-4 py-2.5 bg-brand text-white rounded-2xl rounded-tr-sm shadow-sm">
					<p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
						{content}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-start gap-2.5">
			<div className="shrink-0 w-7 h-7 rounded-full bg-brand flex items-center justify-center mt-0.5">
				<Sparkles className="w-3.5 h-3.5 text-amber-300" />
			</div>
			<div className="max-w-[85%] px-4 py-2.5 bg-white border border-border-subtle text-text-primary rounded-2xl rounded-tl-sm shadow-sm">
				<p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
					{content}
				</p>
			</div>
		</div>
	);
}

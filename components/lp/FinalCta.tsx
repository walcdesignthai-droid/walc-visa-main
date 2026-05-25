/**
 * components/lp/FinalCta.tsx — 最終 CTA 帯(フッター直前)
 * ----------------------------------------------------------------------------
 * 行動への最後のひと押し。LINE 相談 + 申込フォームの 2 つ。
 * ----------------------------------------------------------------------------
 */

import { ArrowRight, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildApplicationUrl, getLineAddUrl } from "@/lib/walc-links";

export function FinalCta() {
	const lineUrl = getLineAddUrl();
	const applyUrl = buildApplicationUrl({ source: "main-final-cta" });

	return (
		<section className="bg-bg-secondary border-y border-border-subtle">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				<div className="max-w-3xl mx-auto text-center">
					{/* キャプション */}
					<div className="inline-flex items-center gap-2.5 mb-5">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							Get Started
						</span>
						<span className="w-8 h-px bg-accent-blue" />
					</div>

					{/* 見出し */}
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight mb-5">
						まず、3 分だけお話を
						<br className="md:hidden" />
						聞かせてください。
					</h2>

					{/* サブ */}
					<p className="text-base md:text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
						どの VISA があなたに合うか、概算費用はいくらか——
						<br className="hidden md:block" />
						初回相談は無料、24 時間以内に WALC 担当者から返信いたします。
					</p>

					{/* CTA 2 つ */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
						<Button asChild variant="line" size="xl" className="w-full sm:w-auto">
							<a href={lineUrl} target="_blank" rel="noopener noreferrer">
								<MessageCircle className="w-5 h-5" />
								LINE で 3 分相談
							</a>
						</Button>
						<Button asChild size="xl" className="w-full sm:w-auto bg-brand text-white hover:bg-brand-deep border border-brand">
							<a href={applyUrl} target="_blank" rel="noopener noreferrer">
								申込フォームへ
								<ArrowRight className="w-5 h-5" />
							</a>
						</Button>
					</div>

					{/* 安心要素 */}
					<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-text-tertiary">
						<span className="flex items-center gap-1.5">
							<Clock className="w-3.5 h-3.5 text-accent-blue" />
							24 時間以内に初回応答
						</span>
						<span className="flex items-center gap-1.5">
							<ShieldCheck className="w-3.5 h-3.5 text-accent-blue" />
							初回相談 無料・しつこい営業なし
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

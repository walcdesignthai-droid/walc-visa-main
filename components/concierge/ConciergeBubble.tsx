/**
 * components/concierge/ConciergeBubble.tsx
 * ----------------------------------------------------------------------------
 * 右下フローティングバブル + Dialog 開閉トリガー。
 * 初回ロード 3 秒後にフェードイン。
 * ----------------------------------------------------------------------------
 */

"use client";

import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ConciergeChat } from "./ConciergeChat";

export function ConciergeBubble() {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	// 3 秒後にフェードイン
	useEffect(() => {
		const t = setTimeout(() => setIsVisible(true), 3000);
		return () => clearTimeout(t);
	}, []);

	return (
		<>
			{/* フローティングボタン */}
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				aria-label="AI コンシェルジュに質問する"
				className={`fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 group ${
					isVisible
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-4 pointer-events-none"
				} transition-all duration-500 ease-out ${
					isOpen ? "scale-0" : "scale-100"
				}`}
			>
				<div className="flex items-center gap-3 bg-brand text-white pl-4 pr-5 py-3 md:py-3.5 rounded-full shadow-2xl border border-white/10 hover:bg-brand-deep hover:scale-105 transition-all">
					<div className="relative">
						<MessageCircle className="w-5 h-5" strokeWidth={2} />
						{/* 通知ドット */}
						<span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
					</div>
					<div className="hidden sm:flex flex-col leading-tight text-left">
						<span className="text-[10px] tracking-widest uppercase text-amber-300 font-bold">
							AI Concierge
						</span>
						<span className="text-sm font-bold">質問する</span>
					</div>
				</div>
			</button>

			{/* ダイアログ */}
			<ConciergeChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
}

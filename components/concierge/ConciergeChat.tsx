/**
 * components/concierge/ConciergeChat.tsx
 * ----------------------------------------------------------------------------
 * チャットダイアログ本体。
 * デスクトップ: 右下に幅 420px のパネル
 * モバイル: 全画面
 * ----------------------------------------------------------------------------
 */

"use client";

import { Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
	ConciergeApiResponse,
	ConciergeCtaType,
	ConciergeMessage,
} from "@/lib/concierge/types";
import { ConciergeCta } from "./ConciergeCta";
import { ConciergeMessageBubble } from "./ConciergeMessage";
import { ConciergeQuickChips } from "./ConciergeQuickChips";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

interface UiMessage extends ConciergeMessage {
	cta?: ConciergeCtaType | null;
}

const INITIAL_GREETING: UiMessage = {
	role: "assistant",
	content:
		"こんにちは。WALC の AI VISA コンシェルジュです。\n\nタイの長期滞在 VISA に関するご質問にお答えします。例えば:\n\n・自分に合うビザを知りたい\n・DTV と Thailand Privilege の違い\n・銀行口座は開設できる?\n\nお気軽にお聞きください。",
};

export function ConciergeChat({ isOpen, onClose }: Props) {
	const [messages, setMessages] = useState<UiMessage[]>([INITIAL_GREETING]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	// 新メッセージで最下部にスクロール
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages, isLoading]);

	const sendMessage = async (text: string) => {
		const userMsg: UiMessage = { role: "user", content: text };
		const next = [...messages, userMsg];
		setMessages(next);
		setInput("");
		setIsLoading(true);
		setError(null);

		try {
			// 履歴を送る (greeting と CTA は API には送らない)
			const apiMessages: ConciergeMessage[] = next
				.filter((_, i) => i !== 0)
				.map(({ role, content }) => ({ role, content }));

			const res = await fetch("/api/concierge", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: apiMessages }),
			});

			if (!res.ok) {
				const errBody = await res.json().catch(() => ({}));
				throw new Error(errBody.error ?? `HTTP ${res.status}`);
			}

			const data = (await res.json()) as ConciergeApiResponse;

			setMessages([
				...next,
				{ role: "assistant", content: data.text, cta: data.cta },
			]);
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "通信エラー";
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = input.trim();
		if (!trimmed || isLoading) return;
		sendMessage(trimmed);
	};

	const handleQuickChip = (text: string) => {
		if (isLoading) return;
		sendMessage(text);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 md:inset-auto md:bottom-5 md:right-5 md:w-[420px] md:h-[640px] md:max-h-[calc(100vh-2.5rem)]">
			{/* モバイル backdrop */}
			<button
				type="button"
				aria-label="閉じる"
				onClick={onClose}
				className="md:hidden absolute inset-0 bg-black/50 backdrop-blur-sm"
			/>

			{/* パネル本体 */}
			<div className="absolute inset-0 md:inset-auto md:bottom-0 md:right-0 md:w-full md:h-full bg-white md:rounded-2xl shadow-2xl border border-border-subtle flex flex-col overflow-hidden">
				{/* ヘッダー */}
				<div className="flex items-center justify-between px-5 py-4 bg-brand text-white border-b border-white/10">
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
							<Sparkles className="w-4 h-4 text-amber-300" />
						</div>
						<div className="leading-tight">
							<div className="text-[10px] tracking-[0.18em] uppercase text-amber-300 font-bold">
								WALC AI Concierge
							</div>
							<div className="text-sm font-bold">タイ VISA 専門アシスタント</div>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="閉じる"
						className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* メッセージリスト */}
				<div
					ref={scrollRef}
					className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-bg-secondary"
				>
					{messages.map((msg, i) => (
						<div key={i}>
							<ConciergeMessageBubble role={msg.role} content={msg.content} />
							{msg.cta && (
								<div className="mt-3 ml-9">
									<ConciergeCta cta={msg.cta} />
								</div>
							)}
						</div>
					))}

					{/* タイピングインジケータ */}
					{isLoading && (
						<div className="flex items-center gap-2 ml-9 text-text-tertiary text-xs">
							<span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" />
							<span
								className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce"
								style={{ animationDelay: "150ms" }}
							/>
							<span
								className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce"
								style={{ animationDelay: "300ms" }}
							/>
							<span className="ml-1">AI が考えています...</span>
						</div>
					)}

					{/* エラー表示 */}
					{error && (
						<div className="ml-9 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
							{error}
						</div>
					)}

					{/* 初回時のクイック質問チップ */}
					{messages.length === 1 && !isLoading && (
						<div className="pt-2">
							<ConciergeQuickChips onSelect={handleQuickChip} />
						</div>
					)}
				</div>

				{/* 入力欄 */}
				<form
					onSubmit={handleSubmit}
					className="flex items-center gap-2 px-4 py-3 bg-white border-t border-border-subtle"
				>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="タイ VISA について質問する..."
						disabled={isLoading}
						maxLength={1000}
						className="flex-1 px-4 py-2.5 text-sm bg-bg-secondary border border-border-subtle rounded-full focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
					/>
					<button
						type="submit"
						disabled={!input.trim() || isLoading}
						aria-label="送信"
						className="w-10 h-10 shrink-0 rounded-full bg-brand text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-deep transition-colors"
					>
						<Send className="w-4 h-4" />
					</button>
				</form>

				{/* フッター注釈 */}
				<div className="px-4 py-2 bg-bg-secondary border-t border-border-subtle">
					<p className="text-[10px] text-text-tertiary text-center leading-relaxed">
						AI による回答です。最終判断は LINE で WALC スタッフへご確認ください。
					</p>
				</div>
			</div>
		</div>
	);
}

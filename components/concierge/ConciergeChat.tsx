/**
 * components/concierge/ConciergeChat.tsx — v2.0 (SSE)
 * ----------------------------------------------------------------------------
 * Server-Sent Events で AI 応答を逐次表示。
 * - delta イベントで本文を文字単位で追加
 * - done イベントで CTA カードを表示
 * - Markdown は使われない前提 (system prompt で禁止済み)
 * ----------------------------------------------------------------------------
 */

"use client";

import { Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type {
	ConciergeCtaType,
	ConciergeMessage,
	ConciergeSseEvent,
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
	streaming?: boolean;
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

		// 空の assistant メッセージを追加 (delta で content を埋めていく)
		const assistantIndex = next.length;
		setMessages([
			...next,
			{ role: "assistant", content: "", streaming: true },
		]);

		try {
			const apiMessages: ConciergeMessage[] = next
				.filter((_, i) => i !== 0) // greeting を除外
				.map(({ role, content }) => ({ role, content }));

			const res = await fetch("/api/concierge", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: apiMessages }),
			});

			if (!res.ok || !res.body) {
				throw new Error(`HTTP ${res.status}`);
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });

				// SSE フォーマット: "data: {...}\n\n" で区切り
				const lines = buffer.split("\n\n");
				buffer = lines.pop() ?? "";

				for (const line of lines) {
					const trimmed = line.trim();
					if (!trimmed.startsWith("data:")) continue;
					const json = trimmed.slice(5).trim();
					if (!json) continue;

					try {
						const event = JSON.parse(json) as ConciergeSseEvent;

						if (event.type === "delta") {
							setMessages((prev) => {
								const copy = [...prev];
								const m = copy[assistantIndex];
								if (m && m.role === "assistant") {
									copy[assistantIndex] = {
										...m,
										content: m.content + event.text,
									};
								}
								return copy;
							});
						} else if (event.type === "done") {
							setMessages((prev) => {
								const copy = [...prev];
								const m = copy[assistantIndex];
								if (m && m.role === "assistant") {
									copy[assistantIndex] = {
										...m,
										cta: event.cta,
										streaming: false,
									};
								}
								return copy;
							});
						} else if (event.type === "error") {
							setError(event.message);
							setMessages((prev) => prev.slice(0, assistantIndex));
						}
					} catch {
						// JSON parse error は無視
					}
				}
			}
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "通信エラー";
			setError(msg);
			setMessages((prev) => prev.slice(0, assistantIndex));
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
			<button
				type="button"
				aria-label="閉じる"
				onClick={onClose}
				className="md:hidden absolute inset-0 bg-black/50 backdrop-blur-sm"
			/>

			<div className="absolute inset-0 md:inset-auto md:bottom-0 md:right-0 md:w-full md:h-full bg-white md:rounded-2xl shadow-2xl border border-border-subtle flex flex-col overflow-hidden">
				<div className="flex items-center justify-between px-5 py-4 bg-brand text-white border-b border-white/10">
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
							<Sparkles className="w-4 h-4 text-amber-300" />
						</div>
						<div className="leading-tight">
							<div className="text-[10px] tracking-[0.18em] uppercase text-amber-300 font-bold">
								WALC AI Concierge
							</div>
							<div className="text-sm font-bold">
								タイ VISA 専門アシスタント
							</div>
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

				<div
					ref={scrollRef}
					className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-bg-secondary"
				>
					{messages.map((msg, i) => (
						<div key={i}>
							<ConciergeMessageBubble
								role={msg.role}
								content={msg.content || (msg.streaming ? "..." : "")}
							/>
							{msg.cta && !msg.streaming && (
								<div className="mt-3 ml-9">
									<ConciergeCta cta={msg.cta} />
								</div>
							)}
						</div>
					))}

					{isLoading &&
						messages[messages.length - 1]?.streaming &&
						messages[messages.length - 1]?.content === "" && (
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
							</div>
						)}

					{error && (
						<div className="ml-9 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
							{error}
						</div>
					)}

					{messages.length === 1 && !isLoading && (
						<div className="pt-2">
							<ConciergeQuickChips onSelect={handleQuickChip} />
						</div>
					)}
				</div>

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

				<div className="px-4 py-2 bg-bg-secondary border-t border-border-subtle">
					<p className="text-[10px] text-text-tertiary text-center leading-relaxed">
						AI による回答です。最終判断は LINE で WALC スタッフへご確認ください。
					</p>
				</div>
			</div>
		</div>
	);
}

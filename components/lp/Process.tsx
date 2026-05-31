/**
 * components/lp/Process.tsx — VISA 取得プロセス 4 ステップ
 * ----------------------------------------------------------------------------
 * 頼みやすさと透明性を担保するため、プロセスを 4 ステップで可視化。
 * ----------------------------------------------------------------------------
 */

import { FileText, MessageCircle, Send, ShieldCheck } from "lucide-react";

const STEPS = [
	{
		num: "01",
		Icon: MessageCircle,
		title: "LINE で 3 分相談",
		body: "目的・滞在期間・ご予算をお聞きし、適した VISA 種別と概算費用をお伝えします。",
		note: "24 時間以内に初回応答",
	},
	{
		num: "02",
		Icon: FileText,
		title: "専用 CRM で申込",
		body: "WALC アプリ(my.walc-visa.online)にアクセス、申込書記入と書類アップロードを完了。",
		note: "すべてオンライン完結",
	},
	{
		num: "03",
		Icon: Send,
		title: "WALC が代理申請",
		body: "WALC 担当者が大使館 / 領事館との手続きを代行。申請状況は CRM でリアルタイム共有。",
		note: "進捗をいつでも確認可能",
	},
	{
		num: "04",
		Icon: ShieldCheck,
		title: "取得後の継続サポート",
		body: "90 日レポート・更新通知・トラブル対応など、取得後の運用もアプリで継続サポート。",
		note: "最大 6 年間のリレーション",
	},
] as const;

export function Process() {
	return (
		<section id="process" className="bg-bg-primary">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-3xl mb-12 md:mb-16">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							Process
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
						申込から取得後まで、4 ステップ。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						何が起きるか、何を準備するか、いつまでに完了するか。
						<br className="hidden md:block" />
						すべて透明化したシンプルなフローです。
					</p>
				</div>

				{/* ステップ */}
				<ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
					{STEPS.map((step, i) => (
						<li
							key={step.num}
							className="relative bg-white rounded-xl p-6 md:p-7 border border-border-subtle hover:border-brand/40 hover:shadow-lg transition-all"
						>
							{/* 接続線(デスクトップ・最後以外) */}
							{i < STEPS.length - 1 && (
								<span
									aria-hidden="true"
									className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border-default"
								/>
							)}

							{/* ステップ番号 */}
							<div className="flex items-center justify-between mb-5">
								<span className="text-3xl font-bold text-brand/15 tabular-nums tracking-tight leading-none">
									{step.num}
								</span>
								<div className="w-11 h-11 rounded-lg bg-brand/5 flex items-center justify-center">
									<step.Icon className="w-4.5 h-4.5 text-brand" strokeWidth={1.8} />
								</div>
							</div>

							{/* タイトル */}
							<h3 className="text-lg font-bold text-text-primary mb-3 leading-snug">
								{step.title}
							</h3>

							{/* 本文 */}
							<p className="text-sm text-text-secondary leading-relaxed mb-4">
								{step.body}
							</p>

							{/* 注釈 */}
							<p className="text-[11px] tracking-wide text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-md inline-block font-semibold">
								{step.note}
							</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}

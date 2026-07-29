/**
 * components/lp/Process.tsx — VISA 取得プロセス 4 ステップ
 * ----------------------------------------------------------------------------
 * 頼みやすさと透明性を担保するため、プロセスを 4 ステップで可視化。
 * ----------------------------------------------------------------------------
 */

import {
	ExternalLink,
	FileText,
	MessageCircle,
	Send,
	ShieldCheck,
} from "lucide-react";
import { SITE_URLS } from "@/lib/walc-data/site-map";

const STEPS = [
	{
		num: "01",
		Icon: MessageCircle,
		title: "LINEで無料相談",
		body: "現在のVISA・入国歴・タイでの活動を確認し、対応可能な範囲と適した申請方針をご案内します。",
		note: "24時間以内に初回応答",
	},
	{
		num: "02",
		Icon: FileText,
		title: "LINEで正式申込のご案内",
		body: "対応方針とお見積もりをご確認後、LINEで正式申込の手続きをご案内します。",
		note: "申込窓口はLINEに統一",
	},
	{
		num: "03",
		Icon: Send,
		title: "必要書類の確認・申請支援",
		body: "申請先と状況に合わせて必要書類を確認し、追加依頼や申請手続きを日本語で伴走します。",
		note: "案件ごとに個別対応",
	},
	{
		num: "04",
		Icon: ShieldCheck,
		title: "専用画面で進捗確認",
		body: "申込後はお客様専用画面で進捗を確認し、追加書類を提出できます。",
		note: "申込済みのお客様専用",
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
						LINE相談から申込後まで、4ステップ。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						何を確認し、どのように準備し、申込後にどこで進捗を確認するか。
						<br className="hidden md:block" />
						相談窓口と申込後の専用画面を、迷わないように分けています。
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
									<step.Icon
										className="w-4.5 h-4.5 text-brand"
										strokeWidth={1.8}
									/>
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
				<div className="mt-7 text-center">
					<a
						href={SITE_URLS.portal}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-brand/40 hover:bg-brand/5"
					>
						申込済みの方：お客様専用画面を開く
						<ExternalLink className="h-4 w-4" aria-hidden="true" />
					</a>
				</div>
			</div>
		</section>
	);
}

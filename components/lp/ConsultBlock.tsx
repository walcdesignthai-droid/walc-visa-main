/**
 * components/lp/ConsultBlock.tsx — AI コンシェルジュ + 無料相談 統合ブロック
 * ----------------------------------------------------------------------------
 * 相談チャネルを 2 つに整理:
 *   1. AI コンシェルジュ (24h 即レス・WEB / LINE 両対応)
 *   2. 専門スタッフ無料相談 (Zoom / Google Meet / LINE 通話・30 分)
 *
 * 導線: AI で大枠把握 → 詳細はスタッフ Web 会議 → 申込
 * ----------------------------------------------------------------------------
 */

import {
	ArrowRight,
	Bot,
	Calendar,
	Clock,
	MessageCircle,
	PhoneCall,
	Sparkles,
	Users,
	Video,
} from "lucide-react";
import Image from "next/image";

interface ChannelBadge {
	icon: React.ReactNode;
	label: string;
}

interface ChannelCard {
	id: "ai" | "staff";
	tag: string;
	Icon: typeof Bot;
	title: string;
	highlight: string;
	description: string;
	bullets: string[];
	cta: { label: string; href: string };
	badges: ChannelBadge[];
}

const CHANNELS: ChannelCard[] = [
	{
		id: "ai",
		tag: "STEP 01",
		Icon: Bot,
		title: "AI コンシェルジュに質問",
		highlight: "24 時間 365 日・即レス",
		description:
			"VISA 種別の比較・大まかな料金・取得スケジュールの目安など、まず知りたいことを AI が即答。回答ベースはすべて WALC 公式知識です。",
		bullets: [
			"LINE / WEB どちらからでも質問可能",
			"基本情報は数秒で取得",
			"必要に応じてスタッフへ自動引き継ぎ",
		],
		cta: {
			label: "AI に質問する",
			href: "#concierge",
		},
		badges: [
			{ icon: <Clock className="w-3 h-3" />, label: "24h 即レス" },
			{ icon: <Sparkles className="w-3 h-3" />, label: "無料" },
		],
	},
	{
		id: "staff",
		tag: "STEP 02",
		Icon: Users,
		title: "専門スタッフと無料相談",
		highlight: "30 分・お客様の状況に合わせて",
		description:
			"AI で大枠が見えたら、専門スタッフが Zoom / Google Meet / LINE 通話で個別ご相談。適した VISA・スケジュール・概算費用までこの 30 分で全部見えます。",
		bullets: [
			"Zoom / Google Meet / LINE 通話に対応",
			"30 分・無料・営業時間内に折返し",
			"必要書類リストアップ + 申込までの段取り",
		],
		cta: {
			label: "LINE で日程調整する",
			href: "https://lin.ee/HQc9axW",
		},
		badges: [
			{ icon: <Video className="w-3 h-3" />, label: "Zoom / Meet / LINE 通話" },
			{ icon: <Calendar className="w-3 h-3" />, label: "30 分無料" },
		],
	},
];

export function ConsultBlock() {
	return (
		<section
			id="consult"
			className="relative bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden"
		>
			{/* セクション上部に画像アクセント (控えめ・装飾的) */}
			<div className="absolute top-0 left-0 right-0 h-40 md:h-48 z-0 opacity-15">
				<Image
					src="/images/AdobeStock_471451875.jpeg"
					alt=""
					fill
					sizes="100vw"
					className="object-cover object-top"
					quality={75}
				/>
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 100%)",
					}}
				/>
			</div>

			<div className="relative mx-auto max-w-content px-5 md:px-8 py-16 md:py-24 z-10">
				{/* セクションヘッダー */}
				<div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							How to Consult
						</span>
						<span className="w-8 h-px bg-accent-blue" />
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4 leading-tight">
						AI で即答 → 専門スタッフが詳細案内
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						WALC では 2 段階の相談導線をご用意。
						<br className="hidden md:block" />
						まず AI で大枠を把握し、最終判断は専門スタッフとの無料 Web 会議で。
						<br className="hidden md:block" />
						どちらも所要時間最小・初回費用ゼロです。
					</p>
				</div>

				{/* 2 カード並び */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
					{CHANNELS.map((ch) => {
						const { Icon } = ch;
						const isAi = ch.id === "ai";
						return (
							<a
								key={ch.id}
								href={ch.cta.href}
								target={isAi ? undefined : "_blank"}
								rel={isAi ? undefined : "noopener noreferrer"}
								className={`group relative flex flex-col p-7 md:p-9 rounded-2xl border-2 transition-all duration-300 ${
									isAi
										? "bg-white border-border-subtle hover:border-brand/40 hover:shadow-xl hover:-translate-y-1"
										: "bg-brand text-white border-brand hover:shadow-2xl hover:-translate-y-1"
								}`}
							>
								{/* STEP タグ */}
								<div
									className={`inline-block w-fit px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.18em] uppercase mb-5 ${
										isAi
											? "bg-bg-secondary text-text-secondary"
											: "bg-amber-400/20 text-amber-200 border border-amber-300/30"
									}`}
								>
									{ch.tag}
								</div>

								{/* アイコン */}
								<div
									className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
										isAi
											? "bg-brand/5 group-hover:bg-brand/10"
											: "bg-amber-400/15"
									} transition-colors`}
								>
									<Icon
										className={`w-7 h-7 ${
											isAi ? "text-brand" : "text-amber-300"
										}`}
										strokeWidth={1.8}
									/>
								</div>

								{/* タイトル */}
								<h3
									className={`text-xl md:text-2xl font-bold tracking-tight mb-2 ${
										isAi ? "text-text-primary" : "text-white"
									}`}
								>
									{ch.title}
								</h3>
								<p
									className={`text-sm md:text-base font-semibold mb-4 ${
										isAi ? "text-brand" : "text-amber-200"
									}`}
								>
									{ch.highlight}
								</p>

								{/* 説明 */}
								<p
									className={`text-sm leading-relaxed mb-5 flex-1 ${
										isAi ? "text-text-secondary" : "text-white/85"
									}`}
								>
									{ch.description}
								</p>

								{/* バッジ */}
								<div className="flex flex-wrap gap-2 mb-5">
									{ch.badges.map((b) => (
										<span
											key={b.label}
											className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
												isAi
													? "bg-bg-secondary text-text-secondary border border-border-subtle"
													: "bg-white/10 text-white/90 border border-white/20"
											}`}
										>
											{b.icon}
											{b.label}
										</span>
									))}
								</div>

								{/* 中身バレット */}
								<ul
									className={`space-y-1.5 mb-6 pt-4 border-t ${
										isAi ? "border-border-subtle" : "border-white/15"
									}`}
								>
									{ch.bullets.map((b) => (
										<li
											key={b}
											className={`flex items-start gap-2 text-xs md:text-sm leading-relaxed ${
												isAi ? "text-text-secondary" : "text-white/85"
											}`}
										>
											<span
												className={`mt-1 w-1 h-1 rounded-full shrink-0 ${
													isAi ? "bg-brand" : "bg-amber-300"
												}`}
											/>
											<span>{b}</span>
										</li>
									))}
								</ul>

								{/* CTA */}
								<div
									className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all mt-auto ${
										isAi
											? "bg-brand text-white group-hover:bg-brand-deep"
											: "bg-amber-400 text-brand-deep group-hover:bg-amber-300 shadow-md"
									}`}
								>
									{isAi ? (
										<MessageCircle className="w-4 h-4" />
									) : (
										<PhoneCall className="w-4 h-4" />
									)}
									{ch.cta.label}
									<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
								</div>
							</a>
						);
					})}
				</div>

				{/* フロー注記 */}
				<div className="bg-white border border-border-subtle rounded-xl p-5 md:p-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
						<div className="flex items-start gap-3">
							<div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
								<Sparkles className="w-4 h-4 text-amber-700" />
							</div>
							<div>
								<p className="text-sm md:text-base font-bold text-text-primary mb-0.5">
									どちらから始めても OK
								</p>
								<p className="text-xs md:text-sm text-text-secondary leading-relaxed">
									すぐ知りたい方は AI コンシェルジュ、しっかり相談したい方は LINE で日程調整。
									24 時間以内に初回応答いたします。
								</p>
							</div>
						</div>
						<div className="flex gap-2 shrink-0">
							<a
								href="https://lin.ee/HQc9axW"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-brand text-white text-xs md:text-sm font-semibold hover:bg-brand-deep transition-colors whitespace-nowrap"
							>
								<MessageCircle className="w-3.5 h-3.5" />
								LINE で相談
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/**
 * components/lp/WhyWalc.tsx — WALC が選ばれる 3 つの理由
 * ----------------------------------------------------------------------------
 * 差別化ポイントを 3 つに圧縮:
 *   1. オーナー確認済みの DTV 申請通過実績
 *   2. 専用 CRM アプリで取得後も徹底管理
 *   3. オーナー確認済みのタイ在住歴・VISAサポート事業歴
 * ----------------------------------------------------------------------------
 */

import { MapPin, Smartphone, Trophy } from "lucide-react";
import { WALC_AUTHOR, WALC_ORGANIZATION } from "@/lib/walc-data/eeat";
import { getDtvPublicContent } from "@/lib/walc-data/public-content";

export async function WhyWalc() {
	const content = await getDtvPublicContent();

	const REASONS = [
		{
			Icon: Trophy,
			labelKey: "Track Record",
			title: `${content.trackRecord.display}のDTV申請通過実績`,
			body: `${content.trackRecord.scope}。必要書類・資金要件・滞在計画を事前確認し、追加書類や進捗管理まで伴走します。${content.trackRecord.disclaimer}`,
			metric: {
				value: content.trackRecord.display,
				label: content.trackRecord.label,
			},
		},
		{
			Icon: Smartphone,
			labelKey: "Dedicated CRM",
			title: "専用 CRM アプリで一気通貫管理",
			body: "申込み・書類管理・進捗確認・請求・更新通知すべてを WALC 専用アプリで完結。取得後も継続的に活用でき、90 日レポートや更新時期もアプリが知らせます。",
			metric: { value: "1 アプリ", label: "申込〜運用まで" },
		},
		{
			Icon: MapPin,
			labelKey: "Local Experience",
			title: `${WALC_AUTHOR.experience.thailandResidency}・${WALC_AUTHOR.experience.visaSupport}`,
			body: `代表がタイでの実務を日本語で統括。${WALC_ORGANIZATION.businessStartedDisplay}にタイ事業を開始し、${WALC_ORGANIZATION.incorporatedDisplay}に法人設立。制度変更や追加書類にも継続して対応します。`,
			metric: {
				value: WALC_AUTHOR.experience.thailandResidency,
				label: WALC_AUTHOR.experience.visaSupport,
			},
		},
	] as const;

	return (
		<section
			id="why-walc"
			className="bg-bg-secondary border-y border-border-subtle"
		>
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-3xl mb-12 md:mb-16">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							Why WALC
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
						WALC が選ばれる、3 つの理由。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						取得して終わりではなく、取得後の運用までを 1
						社で完結する設計が私たちの強みです。
					</p>
				</div>

				{/* 理由 3 つ */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{REASONS.map((reason) => (
						<article
							key={reason.title}
							className="relative bg-white rounded-xl p-7 md:p-8 border border-border-subtle hover:border-brand/40 transition-all hover:shadow-lg"
						>
							{/* アイコン */}
							<div className="w-12 h-12 rounded-lg bg-brand/5 flex items-center justify-center mb-5">
								<reason.Icon className="w-5 h-5 text-brand" strokeWidth={1.8} />
							</div>

							{/* キー */}
							<p className="text-[10px] tracking-[0.2em] uppercase text-text-tertiary font-bold mb-2">
								{reason.labelKey}
							</p>

							{/* タイトル */}
							<h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight mb-4 leading-snug">
								{reason.title}
							</h3>

							{/* 本文 */}
							<p className="text-sm text-text-secondary leading-relaxed mb-6">
								{reason.body}
							</p>

							{/* メトリック */}
							<div className="pt-5 border-t border-border-subtle">
								<div className="text-2xl font-bold text-brand tabular-nums tracking-tight leading-none">
									{reason.metric.value}
								</div>
								<div className="text-xs text-text-tertiary mt-1.5">
									{reason.metric.label}
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

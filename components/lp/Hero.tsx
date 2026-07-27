import {
	ArrowRight,
	Check,
	MessageCircle,
	ShieldCheck,
	TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getDtvAcquisitionStats } from "@/lib/walc-data/stats";
import { getLineAddUrl } from "@/lib/walc-links";

const HERO_BG_URL =
	"https://images.unsplash.com/photo-1531169628939-e84f860fa5d6?fm=jpg&q=85&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0";

const DTV_BENEFITS = [
	"5 年マルチプル",
	"1 回最長 180 日",
	"原則 1 年ごとの更新不要",
] as const;

export function Hero() {
	const lineUrl = getLineAddUrl();
	const stats = getDtvAcquisitionStats();

	return (
		<section className="relative isolate overflow-hidden bg-brand-deep text-white">
			<div className="absolute inset-0">
				<Image
					src={HERO_BG_URL}
					alt=""
					fill
					priority
					sizes="100vw"
					className="object-cover object-center opacity-25"
					quality={75}
				/>
				<div className="absolute inset-0 bg-brand-deep/80" />
			</div>

			<div className="relative z-10 border-b border-amber-300/30 bg-amber-400 text-brand-deep">
				<div className="mx-auto flex max-w-content items-center justify-center gap-2 px-5 py-3 text-center text-sm font-bold md:px-8 md:text-base">
					<TriangleAlert className="size-5 shrink-0" aria-hidden="true" />
					<span>VISA なし長期滞在への入国審査が、全国的に厳格化しています</span>
				</div>
			</div>

			<div className="relative z-10 mx-auto max-w-content px-5 py-14 md:px-8 md:py-20 lg:py-24">
				<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
					<div className="lg:col-span-7">
						<p className="mb-5 inline-flex items-center gap-2 border-l-2 border-amber-300 pl-3 text-sm font-bold text-amber-200">
							WALC VISA Consulting｜DTV 申請サポート
						</p>

						<h1 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
							次の入国を、
							<br />
							<span className="text-amber-300">「運任せ」にしない。</span>
						</h1>

						<p className="mb-7 max-w-2xl text-pretty text-base leading-relaxed text-white/85 md:text-xl">
							DTV VISA（ノマドビザ）で、5 年間のタイ長期滞在へ。
							申請ルートの選定から追加書類への対応まで、実践経験を持つ日本語チームが伴走します。
						</p>

						<ul className="mb-8 flex flex-wrap gap-2.5">
							{DTV_BENEFITS.map((benefit) => (
								<li
									key={benefit}
									className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold"
								>
									<Check className="size-4 text-amber-300" aria-hidden="true" />
									{benefit}
								</li>
							))}
						</ul>

						<Button
							asChild
							variant="line"
							size="xl"
							className="h-auto w-full whitespace-normal px-6 py-4 text-center sm:w-auto"
						>
							<a href={lineUrl} target="_blank" rel="noopener noreferrer">
								<MessageCircle className="size-5 shrink-0" aria-hidden="true" />
								<span>
									LINE で無料相談
									<span className="block text-xs font-medium text-white/80">
										状況を送るだけ・初回相談無料
									</span>
								</span>
								<ArrowRight className="size-5 shrink-0" aria-hidden="true" />
							</a>
						</Button>

						<p className="mt-4 text-pretty text-xs leading-relaxed text-white/65">
							※
							審査・入国の最終判断はタイ当局が行います。過去実績は将来の取得を保証するものではありません。
						</p>
					</div>

					<div className="lg:col-span-5">
						<div className="border border-white/15 bg-white p-5 text-text-primary shadow-2xl md:p-7">
							<div className="mb-5 flex items-start justify-between gap-4 border-b border-border-subtle pb-5">
								<div>
									<p className="text-xs font-bold text-text-tertiary">
										2025 年 4 月の制度変更以降
									</p>
									<p className="mt-1 text-2xl font-bold text-brand">
										DTV 申請サポート実績
									</p>
								</div>
								<ShieldCheck
									className="size-8 text-success"
									aria-hidden="true"
								/>
							</div>

							<div className="mb-6 flex items-end gap-3">
								<span className="text-6xl font-bold leading-none text-brand tabular-nums md:text-7xl">
									{stats.acquired}
								</span>
								<span className="pb-1 text-xl font-bold text-text-secondary">
									/ {stats.totalAttempts} 件
								</span>
							</div>

							<p className="mb-5 text-pretty text-sm leading-relaxed text-text-secondary">
								申請受理まで必要書類・追加照会を徹底フォロー。オーバーステイ歴、入国拒否歴、前回入国時に注意を受けた方も、まずは個別に状況を確認します。
							</p>

							<div className="border-l-4 border-amber-400 bg-amber-50 px-4 py-3">
								<p className="font-bold text-amber-900">
									50 万 THB の残高を 3 ヶ月維持するのが難しい方へ
								</p>
								<p className="mt-1 text-pretty text-xs leading-relaxed text-amber-800">
									申請先・時期・カテゴリごとの必要資料を確認し、適法な選択肢を個別にご案内します。
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

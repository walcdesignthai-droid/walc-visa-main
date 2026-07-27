import {
	ArrowRight,
	BriefcaseBusiness,
	Check,
	Dumbbell,
	Landmark,
	MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTHB, VISA_DTV } from "@/lib/walc-data/pricing";
import { getLineAddUrl } from "@/lib/walc-links";

const ICONS = {
	"dtv-soft-power": Dumbbell,
	"dtv-nomad": BriefcaseBusiness,
	"dtv-freelance": BriefcaseBusiness,
} as const;

export function DtvPricing() {
	const lineUrl = getLineAddUrl();

	return (
		<section
			className="border-y border-border-subtle bg-bg-secondary"
			id="dtv-pricing"
		>
			<div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<p className="mb-4 text-sm font-bold text-accent-blue">
						DTV SUPPORT PLAN
					</p>
					<h2 className="text-balance text-3xl font-bold text-text-primary md:text-5xl">
						あなたの状況に合う申請方法を、
						<br className="hidden md:block" />
						最初から選ぶ。
					</h2>
					<p className="mt-5 text-pretty text-base leading-relaxed text-text-secondary md:text-lg">
						ソフトパワー、ノマド、フリーランス。
						収入形態・活動内容・資金証明を確認し、最適なカテゴリをご提案します。
					</p>
				</div>

				<div className="grid gap-5 lg:grid-cols-3">
					{VISA_DTV.plans.map((plan) => {
						const Icon =
							ICONS[plan.id as keyof typeof ICONS] ?? BriefcaseBusiness;
						return (
							<article
								key={plan.id}
								className={`relative flex flex-col border bg-white p-6 md:p-7 ${
									plan.recommended
										? "border-brand shadow-lg"
										: "border-border-subtle"
								}`}
							>
								{plan.recommended && (
									<p className="absolute right-0 top-0 bg-brand px-3 py-1.5 text-xs font-bold text-white">
										WALC 推奨
									</p>
								)}
								<Icon className="mb-5 size-8 text-brand" aria-hidden="true" />
								<h3 className="min-h-14 text-balance text-xl font-bold text-text-primary">
									{plan.label}
								</h3>
								<p className="mt-5 flex items-end gap-1 text-brand">
									<span className="text-4xl font-bold tabular-nums">
										{formatTHB(plan.walcFee)}
									</span>
								</p>
								<p className="mt-2 text-sm font-semibold text-text-secondary">
									申請費・書類作成サポート込み
								</p>
								<ul className="mt-6 space-y-2 border-t border-border-subtle pt-5 text-sm text-text-secondary">
									<li className="flex gap-2">
										<Check className="mt-0.5 size-4 shrink-0 text-success" />
										必要書類の事前チェック
									</li>
									<li className="flex gap-2">
										<Check className="mt-0.5 size-4 shrink-0 text-success" />
										追加照会・申請受理まで伴走
									</li>
									<li className="flex gap-2">
										<Check className="mt-0.5 size-4 shrink-0 text-success" />
										{plan.notes}
									</li>
								</ul>
								<Button
									asChild
									variant="line"
									size="lg"
									className="mt-7 w-full"
								>
									<a href={lineUrl} target="_blank" rel="noopener noreferrer">
										このプランを LINE で相談
									</a>
								</Button>
							</article>
						);
					})}
				</div>

				<div className="mt-6 grid gap-4 border border-border-subtle bg-white p-5 md:grid-cols-[auto_1fr_auto] md:items-center md:p-7">
					<div className="flex size-12 items-center justify-center rounded-full bg-brand/5">
						<Landmark className="size-6 text-brand" aria-hidden="true" />
					</div>
					<div>
						<h3 className="text-balance text-lg font-bold text-text-primary">
							DTV 取得者限定｜タイ銀行口座開設オプション
						</h3>
						<p className="mt-1 text-pretty text-sm leading-relaxed text-text-secondary">
							対象銀行・必要条件はお客様の状況により異なります。対応可否と料金は個別にご案内します。
						</p>
					</div>
					<a
						href={lineUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 font-bold text-accent-blue hover:underline"
					>
						詳細を聞く
						<ArrowRight className="size-4" aria-hidden="true" />
					</a>
				</div>

				<div className="mt-8 text-center">
					<Button asChild variant="line" size="xl" className="w-full sm:w-auto">
						<a href={lineUrl} target="_blank" rel="noopener noreferrer">
							<MessageCircle className="size-5" aria-hidden="true" />
							どのカテゴリか分からない方はこちら
						</a>
					</Button>
					<p className="mt-3 text-xs text-text-tertiary">
						初回相談無料。申請前に料金と対応範囲をご案内します。
					</p>
				</div>
			</div>
		</section>
	);
}

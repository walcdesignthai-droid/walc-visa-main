import {
	ArrowRight,
	CalendarClock,
	CircleAlert,
	FileWarning,
	MessageCircle,
	ShieldX,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getLineAddUrl } from "@/lib/walc-links";

const RISK_CASES = [
	{
		Icon: CalendarClock,
		title: "VISA なしで繰り返し入国",
		body: "短期滞在の反復や長い滞在履歴は、入国目的を詳しく確認される要因になり得ます。",
	},
	{
		Icon: FileWarning,
		title: "前回の入国で注意された",
		body: "過去の聞き取り・別室対応・注意履歴がある場合、次回入国前の準備が重要です。",
	},
	{
		Icon: ShieldX,
		title: "拒否・オーバーステイ歴がある",
		body: "一律に不可能と決めつけず、履歴と現在の申請条件を個別に確認します。",
	},
] as const;

export function EntryRisk() {
	const lineUrl = getLineAddUrl();

	return (
		<section className="bg-white" id="entry-risk">
			<div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
				<div className="mb-12 grid items-end gap-8 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<p className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-error">
							<CircleAlert className="size-5" aria-hidden="true" />
							2026 年 6 月、タイ入国審査の厳格運用が加速
						</p>
						<h2 className="text-balance text-3xl font-bold text-text-primary md:text-5xl">
							「今まで入れたから、次も大丈夫」
							<br className="hidden md:block" />
							とは限りません。
						</h2>
					</div>
					<p className="text-pretty text-sm leading-relaxed text-text-secondary lg:col-span-4">
						タイ政府広報は、入国時の資金不足・旅程不備・不審なビザラン等を理由に、
						<span className="font-bold text-text-primary">
							外国人 29,490 人
						</span>
						を入国拒否したと公表しています。
						<a
							href="https://thailand.prd.go.th/en/content/category/detail/id/43/cid/2078/iid/509718"
							target="_blank"
							rel="noopener noreferrer"
							className="ml-1 font-semibold text-accent-blue underline"
						>
							出典: タイ政府広報
						</a>
					</p>
				</div>

				<div className="grid gap-8 lg:grid-cols-12">
					<div className="lg:col-span-7">
						<ul className="grid gap-4 md:grid-cols-3">
							{RISK_CASES.map(({ Icon, title, body }) => (
								<li
									key={title}
									className="border border-border-subtle bg-bg-secondary p-5"
								>
									<Icon className="mb-4 size-7 text-error" aria-hidden="true" />
									<h3 className="text-balance text-lg font-bold text-text-primary">
										{title}
									</h3>
									<p className="mt-2 text-pretty text-sm leading-relaxed text-text-secondary">
										{body}
									</p>
								</li>
							))}
						</ul>

						<div className="mt-6 border border-error/20 bg-red-50 p-5 md:p-6">
							<p className="font-bold text-red-900">
								弊社の空港イミグレ入国サポートは、現在一時受付を停止しています。
							</p>
							<p className="mt-2 text-pretty text-sm leading-relaxed text-red-800">
								その場しのぎの入国対応ではなく、渡航前に適切な VISA
								取得を検討してください。WALC は DTV
								の申請戦略から取得までを支援します。
							</p>
						</div>

						<Button
							asChild
							variant="line"
							size="lg"
							className="mt-6 w-full md:w-auto"
						>
							<a href={lineUrl} target="_blank" rel="noopener noreferrer">
								<MessageCircle className="size-5" aria-hidden="true" />
								次回入国前に LINE で相談
								<ArrowRight className="size-4" aria-hidden="true" />
							</a>
						</Button>
					</div>

					<figure className="lg:col-span-5">
						<div className="border border-border-subtle bg-bg-secondary p-2 shadow-lg">
							<Image
								src="/images/walc-visa-dtv-ads.png"
								alt="DTV VISAで5年間のノマド滞在を案内するWALC VISA Consultingの広告"
								width={1040}
								height={1040}
								sizes="(max-width: 1024px) 100vw, 42vw"
								className="h-auto w-full"
							/>
						</div>
						<figcaption className="mt-3 text-pretty text-xs leading-relaxed text-text-tertiary">
							※ DTV
							保有は入国を保証するものではありません。申請・入国の可否は関係当局の判断です。
						</figcaption>
					</figure>
				</div>
			</div>
		</section>
	);
}

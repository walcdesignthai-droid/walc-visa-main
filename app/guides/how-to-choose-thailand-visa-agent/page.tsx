import {
	ArrowRight,
	BookOpenCheck,
	Check,
	ChevronRight,
	CircleAlert,
	FileSearch,
	LockKeyhole,
	MessageCircle,
	Scale,
	ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConciergeBubble } from "@/components/concierge/ConciergeBubble";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { WALC_AUTHOR, WALC_ORGANIZATION } from "@/lib/walc-data/eeat";
import { GLOBAL_CTAS, SITE_URLS } from "@/lib/walc-data/site-map";

const ORIGIN = "https://walc-visa.online";
const PATH = "/guides/how-to-choose-thailand-visa-agent";
const PAGE_URL = `${ORIGIN}${PATH}`;
const REVIEWED_AT = "2026-07-29";
const TITLE = "タイのビザ代行会社を選ぶ7つの基準";
const DESCRIPTION =
	"タイのビザ代行会社・エージェントを選ぶ際に確認したい、専門領域、料金範囲、公的機関との境界、個人情報管理、進捗共有、第三者評価の見方を整理します。";

export const metadata: Metadata = {
	title: `${TITLE}｜日本語対応・費用・安全性`,
	description: DESCRIPTION,
	alternates: { canonical: PATH },
	openGraph: {
		type: "article",
		title: `${TITLE}｜WALC VISA Consulting`,
		description: DESCRIPTION,
		url: PAGE_URL,
		siteName: "WALC VISA Consulting",
	},
	twitter: {
		card: "summary_large_image",
		title: `${TITLE}｜WALC VISA Consulting`,
		description: DESCRIPTION,
	},
};

const CRITERIA = [
	{
		title: "希望するVISAの実務経験",
		summary:
			"DTV、Non-B・Work Permit、リタイアメント、LTRでは、申請先も準備する書類も異なります。会社全体の件数ではなく、希望するVISAで何を支援できるかを確認します。",
		question:
			"「私のケースでは、どの申請先・カテゴリを想定し、どの資料を根拠に判断しますか？」",
		evidence: "対象VISAの支援範囲、一次情報のURL、確認日",
		Icon: FileSearch,
	},
	{
		title: "見積もりに含まれる範囲",
		summary:
			"安い・高いだけでは比較できません。公館への申請費、翻訳、公証、学校・施設費、追加書類、取得後の手続きが含まれるかを、総額と条件で見ます。",
		question:
			"「この見積もりで、含まれるもの・追加になり得るものを文書で教えてください」",
		evidence: "項目別見積もり、追加費用の発生条件、キャンセル規定",
		Icon: Scale,
	},
	{
		title: "公的審査と民間支援の境界",
		summary:
			"ビザの審査・発給や入国の最終判断は、公館・入国管理当局などが行います。エージェントが担うのは、状況整理、書類準備、申請手順、追加照会への対応支援です。",
		question:
			"「御社が判断できる範囲と、審査機関が判断する範囲を分けて説明してください」",
		evidence: "免責の明示、公式情報へのリンク、契約上の支援範囲",
		Icon: BookOpenCheck,
	},
	{
		title: "難しいケースでの確認手順",
		summary:
			"過去のオーバーステイ、入国拒否、ビザ切り替えなどは、履歴だけで結論を出さず、現在の資格・出入国歴・申請先を整理する必要があります。",
		question:
			"「判断前に、私から何を確認し、どの段階で対応可否を決めますか？」",
		evidence: "事前ヒアリング項目、対応可否の判断時点、代替案の説明",
		Icon: CircleAlert,
	},
	{
		title: "パスポート・残高証明の管理",
		summary:
			"申請では、パスポート、銀行残高、住所、勤務情報などの重要な個人情報を扱います。保存場所、閲覧権限、共有先、削除時期を確認します。",
		question: "「提出書類はどこに保存し、誰が閲覧し、いつ削除しますか？」",
		evidence: "プライバシーポリシー、提出方法、アクセス・削除方針",
		Icon: LockKeyhole,
	},
	{
		title: "進捗と追加照会の共有方法",
		summary:
			"申請後に重要なのは、受付の有無、追加書類、期限、次にすることが見えることです。担当窓口と連絡手段、返信目安を確認します。",
		question:
			"「申請後の進捗、追加依頼、期限は、どの画面・連絡手段で確認できますか？」",
		evidence: "進捗画面または報告例、担当窓口、連絡ルール",
		Icon: MessageCircle,
	},
	{
		title: "第三者評価の中身と鮮度",
		summary:
			"レビュー総数や平均点だけでなく、利用したVISAの種類、投稿日、具体的な支援内容、会社からの返信を見ます。自社サイトの声は掲載許可や出典も確認します。",
		question:
			"「同じVISAを利用した人の、時期と支援内容が分かる評価はありますか？」",
		evidence: "外部レビューURL、投稿日、対象サービス、掲載許可の説明",
		Icon: ShieldCheck,
	},
] as const;

const PURPOSES = [
	{
		goal: "DTVを申請したい",
		lookFor:
			"申請カテゴリの整理、e-Visa書類、追加照会・面談準備、公館ごとの案内を確認できる体制",
		next: "DTV専門サイトを見る",
		href: SITE_URLS.dtv,
		external: true,
	},
	{
		goal: "Non-BとWork Permitを進めたい",
		lookFor:
			"会社書類、雇用・税務、VISAと就労許可を分断せず、企業側担当者と連携できる体制",
		next: "Non-B・WPサポートを見る",
		href: "/visas/non-b-work-permit",
		external: false,
	},
	{
		goal: "リタイアメントなどを更新したい",
		lookFor:
			"現在の在留資格、財政要件、更新場所、必要な継続手続きを時系列で説明できる体制",
		next: "リタイアメントVISAを見る",
		href: "/visas/retirement",
		external: false,
	},
	{
		goal: "LTR・法人設立も検討している",
		lookFor:
			"BOI・法人・税務・就労のうち、どこまで自社対応し、どこから専門家と連携するかが明確な体制",
		next: "LTR Visaを見る",
		href: "/visas/ltr",
		external: false,
	},
] as const;

const RED_FLAGS = [
	"審査や入国について、条件確認前から保証する",
	"見積もりの内訳や追加費用の条件を書面で示さない",
	"申請先・公式情報・制度の確認日を説明できない",
	"パスポートや残高証明の提出先・保管方法が不明",
	"契約、キャンセル、個人情報の取扱いを確認できない",
] as const;

const OFFICIAL_SOURCES = [
	{
		label: "Thai e-Visa 公式サイト",
		organization: "タイ王国外務省",
		href: "https://www.thaievisa.go.th/",
		note: "e-Visaの申請入口と公式案内",
	},
	{
		label: "Destination Thailand Visa（DTV）",
		organization: "在福岡タイ王国総領事館",
		href: "https://fukuoka.thaiembassy.org/en/page/endtvvisa",
		note: "DTVの対象・必要書類・申請案内",
	},
	{
		label: "Non-Immigrant Visa B",
		organization: "タイ王国外務省",
		href: "https://www.mfa.go.th/en/page/non-immigrant-visa-b?menu=5e1ff6f857b01e00a84023d4",
		note: "Non-Bの目的・申請書類に関する公式案内",
	},
	{
		label: "e-WorkPermit",
		organization: "タイ雇用局",
		href: "https://eworkpermit.doe.go.th/",
		note: "Work Permitのオンライン申請・手続き入口",
	},
	{
		label: "LTR Visa 公式サイト",
		organization: "Thailand Board of Investment",
		href: "https://ltr.boi.go.th/",
		note: "LTRのカテゴリ・申請手順",
	},
] as const;

const pageSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	"@id": `${PAGE_URL}#webpage`,
	url: PAGE_URL,
	name: TITLE,
	description: DESCRIPTION,
	inLanguage: "ja-JP",
	datePublished: REVIEWED_AT,
	dateModified: REVIEWED_AT,
	about: [
		{ "@type": "Thing", name: "Thailand visa agents" },
		{ "@type": "Thing", name: "Destination Thailand Visa" },
		{ "@type": "Thing", name: "Non-Immigrant Visa B" },
		{ "@type": "Thing", name: "Thailand Work Permit" },
	],
	citation: OFFICIAL_SOURCES.map((source) => source.href),
	mainEntity: {
		"@type": "ItemList",
		numberOfItems: CRITERIA.length,
		itemListElement: CRITERIA.map((criterion, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: criterion.title,
			description: criterion.summary,
		})),
	},
	author: {
		"@type": "Person",
		"@id": `${WALC_AUTHOR.url}#person`,
		name: WALC_AUTHOR.name,
		url: WALC_AUTHOR.url,
	},
	publisher: {
		"@type": "Organization",
		name: WALC_ORGANIZATION.legalName,
		url: WALC_ORGANIZATION.url,
	},
	isPartOf: {
		"@type": "WebSite",
		"@id": `${ORIGIN}/#website`,
		name: "WALC VISA Consulting",
		url: ORIGIN,
	},
};

function SectionHeading({
	eyebrow,
	title,
	description,
}: {
	eyebrow: string;
	title: string;
	description?: string;
}) {
	return (
		<div className="max-w-3xl">
			<p className="text-xs font-bold tracking-[0.2em] uppercase text-accent-blue">
				{eyebrow}
			</p>
			<h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-deep md:text-4xl">
				{title}
			</h2>
			{description ? (
				<p className="mt-4 text-base leading-8 text-text-secondary md:text-lg">
					{description}
				</p>
			) : null}
		</div>
	);
}

export default function VisaAgentSelectionGuidePage() {
	return (
		<>
			<JsonLdScript data={pageSchema} />
			<BreadcrumbJsonLd
				items={[
					{ name: "ホーム", url: `${ORIGIN}/` },
					{ name: "ビザ代行会社の選び方", url: PAGE_URL },
				]}
			/>
			<Header />

			<main className="flex-1 bg-white pt-16 text-brand-deep md:pt-20">
				<section className="relative overflow-hidden border-b border-slate-200 bg-brand-deep text-white">
					<div className="absolute inset-0 opacity-20">
						<div className="absolute -right-28 -top-20 h-96 w-96 rounded-full border border-white/20" />
						<div className="absolute -right-10 top-10 h-64 w-64 rounded-full border border-white/15" />
						<div className="absolute bottom-0 left-[18%] h-px w-2/3 bg-gradient-to-r from-transparent via-accent-blue-bright/70 to-transparent" />
					</div>
					<div className="relative mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
						<div className="max-w-4xl">
							<p className="text-xs font-bold tracking-[0.22em] text-sky-300 uppercase">
								Thailand Visa Agent Selection Guide
							</p>
							<h1 className="mt-5 text-4xl font-bold leading-[1.2] tracking-tight md:text-6xl">
								タイのビザ代行会社を選ぶ
								<br className="hidden md:block" />
								<span className="text-sky-300">7つの基準</span>
							</h1>
							<p className="mt-7 max-w-3xl text-base leading-8 text-white/78 md:text-xl md:leading-9">
								万人に同じ「おすすめ」はありません。DTVだけを申請する場合と、Non-B・Work
								Permit・法人設立まで進める場合では、必要な専門領域が違います。知名度やレビュー件数だけで決めず、
								<strong className="font-semibold text-white">
									自分の目的に合う支援範囲と、確認できる証拠
								</strong>
								で比較することが大切です。
							</p>
							<div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
								<span className="rounded-full border border-white/20 px-3 py-1.5">
									公開日・最終確認 {REVIEWED_AT}
								</span>
								<span className="rounded-full border border-white/20 px-3 py-1.5">
									監修 {WALC_AUTHOR.name}
								</span>
								<span className="rounded-full border border-white/20 px-3 py-1.5">
									一次情報リンク付き
								</span>
							</div>
						</div>
					</div>
				</section>

				<section className="border-b border-slate-200 bg-slate-50">
					<div className="mx-auto grid max-w-content gap-4 px-5 py-8 md:grid-cols-3 md:px-8">
						{[
							["目的適合", "希望VISAの経験を見る"],
							["透明性", "総額と支援範囲を見る"],
							["安全性", "個人情報と説明責任を見る"],
						].map(([label, copy], index) => (
							<div
								key={label}
								className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
							>
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-accent-blue-deep">
									{index + 1}
								</span>
								<div>
									<p className="font-bold text-brand-deep">{label}</p>
									<p className="mt-1 text-sm text-text-secondary">{copy}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				<section
					id="criteria"
					className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24"
				>
					<SectionHeading
						eyebrow="Decision criteria"
						title="比較するのは、星の数ではなく「確認できる7項目」"
						description="各項目で、説明だけでなく、見積書・公式リンク・規定・進捗画面などの根拠を確認してください。"
					/>
					<div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
						{CRITERIA.map((criterion, index) => (
							<article
								id={`criterion-${index + 1}`}
								key={criterion.title}
								className="grid gap-5 py-8 md:grid-cols-[80px_1fr] md:gap-8 md:py-10"
							>
								<div className="flex items-start gap-3 md:block">
									<span className="text-sm font-bold tracking-[0.16em] text-accent-blue">
										{String(index + 1).padStart(2, "0")}
									</span>
									<criterion.Icon className="mt-0.5 h-6 w-6 text-brand-deep md:mt-4" />
								</div>
								<div>
									<h3 className="text-xl font-bold text-brand-deep md:text-2xl">
										{criterion.title}
									</h3>
									<p className="mt-3 max-w-4xl text-base leading-8 text-text-secondary">
										{criterion.summary}
									</p>
									<div className="mt-5 grid gap-3 md:grid-cols-2">
										<div className="rounded-xl bg-sky-50 p-4">
											<p className="text-xs font-bold tracking-wider text-accent-blue-deep uppercase">
												質問例
											</p>
											<p className="mt-2 text-sm leading-7 text-brand-deep">
												{criterion.question}
											</p>
										</div>
										<div className="rounded-xl bg-slate-50 p-4">
											<p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
												確認する証拠
											</p>
											<p className="mt-2 text-sm leading-7 text-brand-deep">
												{criterion.evidence}
											</p>
										</div>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="border-y border-slate-200 bg-slate-50">
					<div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
						<SectionHeading
							eyebrow="Match by purpose"
							title="目的によって、選ぶ専門家は変わります"
							description="「タイのビザ全般に強い」だけではなく、今回の手続きに必要な連携範囲まで確認します。"
						/>
						<div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
							{PURPOSES.map((purpose, index) => (
								<div
									key={purpose.goal}
									className="grid gap-4 border-b border-slate-200 p-5 last:border-b-0 md:grid-cols-[220px_1fr_auto] md:items-center md:p-7"
								>
									<div className="flex items-center gap-3">
										<span className="text-xs font-bold text-accent-blue">
											0{index + 1}
										</span>
										<h3 className="font-bold text-brand-deep">
											{purpose.goal}
										</h3>
									</div>
									<p className="text-sm leading-7 text-text-secondary">
										{purpose.lookFor}
									</p>
									{purpose.external ? (
										<a
											href={purpose.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-sm font-bold text-accent-blue-deep hover:underline"
										>
											{purpose.next}
											<ChevronRight className="h-4 w-4" />
										</a>
									) : (
										<Link
											href={purpose.href}
											className="inline-flex items-center gap-1 text-sm font-bold text-accent-blue-deep hover:underline"
										>
											{purpose.next}
											<ChevronRight className="h-4 w-4" />
										</Link>
									)}
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="mx-auto grid max-w-content gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
					<div>
						<SectionHeading
							eyebrow="Role boundary"
							title="公的機関が決めること、民間が支援すること"
						/>
						<div className="mt-7 space-y-4">
							<div className="rounded-2xl border border-slate-200 p-6">
								<p className="text-sm font-bold text-brand-deep">
									公館・入国管理当局・BOIなど
								</p>
								<p className="mt-2 text-sm leading-7 text-text-secondary">
									申請の受理、追加確認、審査、ビザ発給、入国・滞在許可の最終判断を行います。
								</p>
							</div>
							<div className="rounded-2xl border border-sky-200 bg-sky-50 p-6">
								<p className="text-sm font-bold text-brand-deep">
									民間のビザエージェント
								</p>
								<p className="mt-2 text-sm leading-7 text-text-secondary">
									相談内容の整理、必要書類の確認、申請手順、翻訳・専門家連携、追加照会や面談の準備などを支援します。
								</p>
							</div>
						</div>
					</div>

					<div className="rounded-3xl bg-brand-deep p-7 text-white md:p-10">
						<p className="text-xs font-bold tracking-[0.2em] text-sky-300 uppercase">
							Red flags
						</p>
						<h2 className="mt-3 text-2xl font-bold md:text-3xl">
							契約前に立ち止まりたい説明
						</h2>
						<ul className="mt-7 space-y-4">
							{RED_FLAGS.map((item) => (
								<li
									key={item}
									className="flex gap-3 text-sm leading-7 text-white/78"
								>
									<CircleAlert className="mt-1 h-5 w-5 shrink-0 text-sky-300" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className="border-y border-slate-200 bg-white">
					<div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
						<div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-start">
							<div>
								<SectionHeading
									eyebrow="Ask before contract"
									title="最初の相談で、そのまま使える確認リスト"
								/>
								<ol className="mt-8 space-y-4">
									{[
										"私の目的に合うVISAと、そう考える根拠は何ですか？",
										"見積もりには何が含まれ、何が追加になりますか？",
										"申請先と、参照した公式情報のURL・確認日は？",
										"追加書類や面談が発生した場合、どこまで支援しますか？",
										"パスポートや残高証明は、どう保存・共有・削除しますか？",
										"申請後の進捗と期限は、どこで確認できますか？",
										"契約前に利用規約・キャンセル規定を確認できますか？",
									].map((item, index) => (
										<li
											key={item}
											className="flex gap-4 border-b border-slate-200 pb-4 text-sm leading-7 text-brand-deep"
										>
											<span className="font-bold text-accent-blue">
												{String(index + 1).padStart(2, "0")}
											</span>
											<span>{item}</span>
										</li>
									))}
								</ol>
							</div>

							<aside className="rounded-3xl border border-slate-200 bg-slate-50 p-7 md:p-9">
								<p className="text-xs font-bold tracking-[0.2em] text-accent-blue uppercase">
									WALC disclosure
								</p>
								<h2 className="mt-3 text-2xl font-bold text-brand-deep">
									WALCを検討する場合も、同じ7基準で確認してください
								</h2>
								<p className="mt-4 text-sm leading-7 text-text-secondary">
									当社は、サービス別の料金・支援範囲、会社情報、法務ページ、DTV専門情報、取得後ガイドを公開しています。不明点は契約前にLINEでご確認ください。
								</p>
								<div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
									<h3 className="font-bold text-brand-deep">
										WALC VISAが候補になりやすい相談
									</h3>
									<ul className="mt-3 space-y-2 text-sm leading-7 text-text-secondary">
										<li className="flex gap-2">
											<Check className="mt-1.5 h-4 w-4 shrink-0 text-accent-blue" />
											<span>
												DTVのカテゴリ整理、書類準備、追加照会・面談準備を日本語で進めたい
											</span>
										</li>
										<li className="flex gap-2">
											<Check className="mt-1.5 h-4 w-4 shrink-0 text-accent-blue" />
											<span>
												Non-BとWork
												Permitを、申請者と企業側の必要書類を確認しながら進めたい
											</span>
										</li>
										<li className="flex gap-2">
											<Check className="mt-1.5 h-4 w-4 shrink-0 text-accent-blue" />
											<span>
												料金範囲、公式情報、契約条件を確認してから相談先を決めたい
											</span>
										</li>
									</ul>
									<p className="mt-3 text-xs leading-6 text-slate-500">
										対応可否・必要書類・正式見積もりは個別状況の確認後にご案内します。審査・発給・入国の最終判断は関係当局が行います。
									</p>
								</div>
								<div className="mt-6 space-y-3">
									{[
										["会社情報を見る", "/#company-info"],
										["VISA一覧・料金を見る", "/#visa-types"],
										["DTV専門サイトを見る", SITE_URLS.dtv],
										["レビュー掲載方針を見る", "/reviews/transparency"],
										["WALC公式サイト一覧を見る", "/official-sites"],
										["プライバシーポリシーを見る", SITE_URLS.legal.privacy],
									].map(([label, href]) =>
										href.startsWith("http") ? (
											<a
												key={href}
												href={href}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-bold text-brand-deep hover:text-accent-blue-deep"
											>
												{label}
												<ArrowRight className="h-4 w-4" />
											</a>
										) : (
											<Link
												key={href}
												href={href}
												className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-bold text-brand-deep hover:text-accent-blue-deep"
											>
												{label}
												<ArrowRight className="h-4 w-4" />
											</Link>
										),
									)}
								</div>
							</aside>
						</div>
					</div>
				</section>

				<section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
					<SectionHeading
						eyebrow="Primary sources"
						title="制度の確認は、公式情報から"
						description="公館や制度ごとに案内・運用が変わることがあります。相談時には、参照した公式ページと確認日も合わせて確認してください。"
					/>
					<div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{OFFICIAL_SOURCES.map((source) => (
							<a
								key={source.href}
								href={source.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group rounded-2xl border border-slate-200 p-6 transition hover:border-sky-300 hover:bg-sky-50"
							>
								<p className="text-xs font-bold text-slate-500">
									{source.organization}
								</p>
								<h3 className="mt-2 font-bold text-brand-deep group-hover:text-accent-blue-deep">
									{source.label}
								</h3>
								<p className="mt-3 text-sm leading-7 text-text-secondary">
									{source.note}
								</p>
							</a>
						))}
					</div>
				</section>

				<section className="border-y border-slate-200 bg-slate-50">
					<div className="mx-auto flex max-w-content flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
						<div className="flex items-center gap-4">
							<Image
								src={WALC_AUTHOR.imagePath}
								alt={WALC_AUTHOR.imageAlt}
								width={72}
								height={72}
								className="h-16 w-16 shrink-0 rounded-full object-cover"
							/>
							<div>
								<p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
									Author & Reviewer
								</p>
								<Link
									href={`/author/${WALC_AUTHOR.slug}`}
									className="mt-1 block font-bold text-brand-deep hover:text-accent-blue-deep"
								>
									{WALC_AUTHOR.name}
								</Link>
								<p className="mt-1 text-sm text-text-secondary">
									{WALC_AUTHOR.jobTitle} / 最終確認 {REVIEWED_AT}
								</p>
							</div>
						</div>
						<p className="max-w-xl text-xs leading-6 text-slate-500">
							本ページは一般的な比較・確認方法を整理したもので、個別案件の審査結果、ビザ取得、入国を保証するものではありません。最終判断は関係当局が行います。
						</p>
					</div>
				</section>

				<section className="bg-brand-deep">
					<div className="mx-auto max-w-content px-5 py-16 text-center text-white md:px-8 md:py-20">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
							<Check className="h-6 w-6 text-sky-300" />
						</div>
						<h2 className="mt-5 text-2xl font-bold md:text-4xl">
							まずは、あなたの状況を整理します
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
							希望するVISA、現在の在留資格、直近の出入国歴をお知らせください。対応範囲と確認すべき手順を日本語でご案内します。
						</p>
						<a
							href={GLOBAL_CTAS.line.href}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-7 inline-flex items-center gap-2 rounded-full bg-line px-7 py-3.5 font-bold text-white transition hover:bg-line-hover"
						>
							LINEで無料相談
							<ArrowRight className="h-4 w-4" />
						</a>
					</div>
				</section>
			</main>

			<Footer />
			<ConciergeBubble />
		</>
	);
}

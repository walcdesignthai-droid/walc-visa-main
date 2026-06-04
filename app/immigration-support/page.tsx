/**
 * app/immigration-support/page.tsx — 入国・イミグレ緊急サポート LP(独立・非ブログ)
 * ----------------------------------------------------------------------------
 * 白地 × ネイビー × ゴールド / LINE グリーン CTA + 緊急赤バッジ + 追従バー。
 * schema = Service + FAQPage + BreadcrumbList + Organization + Person(監修)。
 * 🔴 DRAFT 中は noindex + JSON-LD 非出力。公開は Cowork 検証 + Owner 目視後。
 * グレー配慮: 料金・成功率・断定や約束的表現は不使用。希望は与えるが断定しない・免責明示。
 * ----------------------------------------------------------------------------
 */

import {
	AlertTriangle,
	ArrowRight,
	FileText,
	MessageCircle,
	Phone,
	Plus,
	ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import {
	buildPersonSchema,
	organizationPostalAddress,
	WALC_AUTHOR,
	WALC_ORGANIZATION,
} from "@/lib/walc-data/eeat";
import {
	CASE_EXAMPLES,
	CONSULT_FLOW,
	CURRENT_REASONS,
	DEPORT_POINTS,
	DISCLAIMER,
	DRAFT,
	EMPATHY_CHIPS,
	emergencyCallHref,
	FAQ_ITEMS,
	friendAddHref,
	LP_PATH,
	ORIGIN,
	OVERSTAY_POINTS,
	PROTECT_THREE,
	RELATED_BLOG,
	SOURCES,
	WHAT_WE_CAN_DO,
} from "./data";

const TITLE =
	"タイで入国拒否・イミグレで止められた時の相談｜オーバーステイ・強制送還も｜WALC VISA";
const DESCRIPTION =
	"タイの空港・国境で入国を止められた/別室に通された/オーバーステイ・強制送還が不安——まだ諦めないでください。タイ在住13年の WALC VISA が、状況に応じたアドバイス・サポートを LINE でご相談に対応。今すぐ無料通話。";

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	alternates: { canonical: LP_PATH },
	robots: DRAFT
		? { index: false, follow: false }
		: { index: true, follow: true },
	openGraph: {
		type: "website",
		title: TITLE,
		description: DESCRIPTION,
		url: `${ORIGIN}${LP_PATH}`,
		siteName: "WALC VISA Consulting",
	},
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: DESCRIPTION,
	},
};

// ---------------------------------------------------------------------------
// CTA(LINE グリーン緊急通話 / 友だち追加)
// ---------------------------------------------------------------------------
function CallButton({
	placement,
	label,
}: {
	placement: string;
	label: string;
}) {
	return (
		<a
			href={emergencyCallHref(placement)}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06c755] px-6 py-3.5 text-sm md:text-base font-bold text-white shadow-sm transition-colors hover:bg-[#05a648]"
		>
			<Phone className="h-4 w-4" />
			{label}
		</a>
	);
}

function AddFriendButton({
	placement,
	label,
}: {
	placement: string;
	label: string;
}) {
	return (
		<a
			href={friendAddHref(placement)}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center justify-center gap-2 rounded-full border border-[#16264f]/25 bg-white px-6 py-3.5 text-sm md:text-base font-semibold text-[#16264f] transition-colors hover:border-[#16264f]/50"
		>
			<MessageCircle className="h-4 w-4" />
			{label}
		</a>
	);
}

const H2 = "text-2xl md:text-3xl font-black tracking-tight text-[#16264f]";

export default function ImmigrationSupportPage() {
	const url = `${ORIGIN}${LP_PATH}`;

	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "タイ入国・イミグレ緊急サポート相談(WALC VISA)",
		serviceType: "タイ入国・ビザに関する相談・サポート",
		description: DESCRIPTION,
		areaServed: { "@type": "Country", name: "Thailand" },
		provider: {
			"@type": "Organization",
			name: WALC_ORGANIZATION.legalName,
			url: WALC_ORGANIZATION.url,
		},
		availableChannel: {
			"@type": "ServiceChannel",
			serviceUrl: "https://lin.ee/7sV0zzU",
			availableLanguage: ["ja"],
		},
		url,
	};
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: FAQ_ITEMS.map((f) => ({
			"@type": "Question",
			name: f.question,
			acceptedAnswer: { "@type": "Answer", text: f.answer },
		})),
	};
	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "ホーム", item: `${ORIGIN}/` },
			{
				"@type": "ListItem",
				position: 2,
				name: "入国・イミグレ緊急サポート",
				item: url,
			},
		],
	};
	const orgSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: WALC_ORGANIZATION.name,
		legalName: WALC_ORGANIZATION.legalName,
		url: WALC_ORGANIZATION.url,
		logo: WALC_ORGANIZATION.logo,
		email: WALC_ORGANIZATION.email,
		telephone: WALC_ORGANIZATION.telephone,
		address: organizationPostalAddress(),
		foundingDate: WALC_ORGANIZATION.foundingDate,
	};
	const personSchema = buildPersonSchema();

	return (
		<>
			{!DRAFT && (
				<>
					<JsonLdScript data={serviceSchema} />
					<JsonLdScript data={faqSchema} />
					<JsonLdScript data={breadcrumbSchema} />
					<JsonLdScript data={orgSchema} />
					<JsonLdScript data={personSchema} />
				</>
			)}

			<main className="imm-has-stickybar bg-white text-[#16264f]">
				{/* ───── HERO ───── */}
				<section className="imm-band-soft border-b border-[#e6eaf3]">
					<div className="mx-auto max-w-5xl px-5 md:px-8 pt-12 md:pt-16 pb-12">
						<div className="inline-flex items-center gap-2 rounded-full bg-[#d64550]/10 px-3 py-1 text-[11px] font-bold text-[#d64550]">
							<AlertTriangle className="h-3.5 w-3.5" />
							入国・トラブル対応 ・ 緊急相談
						</div>
						<h1 className="mt-4 text-3xl md:text-5xl font-black leading-tight tracking-tight text-[#16264f]">
							タイで入国を止められた。
							<br className="hidden md:block" />
							オーバーステイしてしまった。
							<br />
							<span className="text-[#b8893f]">
								——まだ、諦めないでください。
							</span>
						</h1>
						<p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-[#3a4a73]">
							タイ在住13年・VISAサポート事業7年目。止められた今も、これからの不安も。まずは落ち着いて、状況をお聞かせください。
						</p>
						<div className="mt-7 flex flex-col sm:flex-row gap-3">
							<CallButton
								placement="hero"
								label="LINE無料通話で今すぐ相談(緊急)"
							/>
							<AddFriendButton
								placement="hero"
								label="LINEで友だち追加して相談"
							/>
						</div>
						<div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5b6680]">
							<span className="inline-flex items-center gap-1.5">
								<ShieldCheck className="h-4 w-4 text-[#b8893f]" />
								タイ現地13年
							</span>
							<span>・ 日本語対応</span>
							<span>・ まず相談無料</span>
						</div>
					</div>
				</section>

				{/* ───── ① 共感チップ ───── */}
				<section className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
					<p className="imm-kicker">こんな状況ではありませんか?</p>
					<h2 className={`mt-2 ${H2}`}>その不安、一人で抱えないでください</h2>
					<div className="mt-6 flex flex-wrap gap-2.5">
						{EMPATHY_CHIPS.map((c) => (
							<span
								key={c}
								className="rounded-full border border-[#e6eaf3] bg-[#f7f8fb] px-3.5 py-1.5 text-sm text-[#3a4a73]"
							>
								{c}
							</span>
						))}
					</div>
					<p className="mt-6 text-base md:text-lg leading-relaxed text-[#16264f]">
						状況によっては、まだ打つ手があります。一人で判断せず、まず状況をお聞かせください。
						<span className="text-sm text-[#8a93a8]">
							(※結果を保証するものではありません)
						</span>
					</p>
				</section>

				{/* ───── ② 今、止められている方へ — まず守る3つ ───── */}
				<section className="imm-band-soft border-y border-[#e6eaf3]">
					<div className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
						<div className="inline-flex items-center gap-2 rounded-full bg-[#d64550]/10 px-3 py-1 text-[11px] font-bold text-[#d64550]">
							<AlertTriangle className="h-3.5 w-3.5" />
							今、止められている方へ
						</div>
						<h2 className={`mt-3 ${H2}`}>まず守ってほしい3つのこと</h2>
						<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
							{PROTECT_THREE.map((p, i) => (
								<div key={p.head} className="imm-card p-5">
									<div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e6eaf3] text-base font-black text-[#b8893f]">
										{i + 1}
									</div>
									<h3 className="mt-3 font-bold text-[#16264f]">{p.head}</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-[#3a4a73]">
										{p.body}
									</p>
								</div>
							))}
						</div>
						<div className="mt-7">
							<CallButton placement="protect3" label="緊急LINE無料通話" />
						</div>
					</div>
				</section>

				{/* ───── ③ なぜ今、これほど止められるのか ───── */}
				<section className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
					<p className="imm-kicker">2025–2026 の現状</p>
					<h2 className={`mt-2 ${H2}`}>なぜ今、これほど止められるのか</h2>
					<p className="mt-3 max-w-3xl leading-relaxed text-[#3a4a73]">
						タイ入管は2025年以降、ビザ免除制度の乱用対策として審査を強化しています(公的・報道情報)。空港でも追加審査・別室送り・入国拒否が増えています。止められやすい主な要因は次のとおりです。
					</p>
					<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
						{CURRENT_REASONS.map((r) => (
							<div key={r.head} className="imm-card p-5">
								<h3 className="font-bold text-[#16264f]">{r.head}</h3>
								<p className="mt-1.5 text-sm leading-relaxed text-[#3a4a73]">
									{r.body}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* ───── ④ 実例集 ───── */}
				<section className="imm-band-soft border-y border-[#e6eaf3]">
					<div className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
						<p className="imm-kicker">空港・国境で実際にあった状況</p>
						<h2 className={`mt-2 ${H2}`}>入国拒否・別室送りの実例</h2>
						<p className="mt-3 text-sm text-[#8a93a8]">
							※報道・公開情報・体験談より(匿名化・結果を保証するものではありません)。
						</p>
						<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{CASE_EXAMPLES.map((c) => (
								<div key={c.title} className="imm-card p-5">
									<h3 className="text-sm font-bold leading-snug text-[#16264f]">
										{c.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-[#3a4a73]">
										{c.body}
									</p>
								</div>
							))}
						</div>
						<p className="mt-6 leading-relaxed text-[#16264f]">
							共通する教訓は「止められる前の準備」と「止められた時の冷静な対応・早い相談」です。状況は一人ひとり違います。まずはご相談を。
						</p>
					</div>
				</section>

				{/* ───── ⑤ 強制送還された方へ ───── */}
				<section className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
					<p className="imm-kicker">タイ 強制送還 再入国 / ブラックリスト</p>
					<h2 className={`mt-2 ${H2}`}>以前、強制送還された方へ</h2>
					<ul className="mt-5 space-y-3">
						{DEPORT_POINTS.map((p) => (
							<li
								key={p.slice(0, 24)}
								className="flex gap-2.5 leading-relaxed text-[#3a4a73]"
							>
								<ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#b8893f]" />
								<span>{p}</span>
							</li>
						))}
					</ul>
					<p className="mt-5 leading-relaxed text-[#16264f]">
						「自分は ban
						なのか/いつ・どの方法なら可能性があるか」は、記録と経緯の整理が出発点です。現実的な選択肢を一緒に整理します。まず
						LINE で。
						<span className="text-sm text-[#8a93a8]">(可否は保証しません)</span>
					</p>
				</section>

				{/* ───── ⑥ オーバーステイした方へ ───── */}
				<section className="imm-band-soft border-y border-[#e6eaf3]">
					<div className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
						<p className="imm-kicker">
							タイ オーバーステイ 入国 / 再入国 / 罰金
						</p>
						<h2 className={`mt-2 ${H2}`}>オーバーステイしてしまった方へ</h2>
						<ul className="mt-5 space-y-3">
							{OVERSTAY_POINTS.map((p) => (
								<li
									key={p.slice(0, 24)}
									className="flex gap-2.5 leading-relaxed text-[#3a4a73]"
								>
									<ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#b8893f]" />
									<span>{p}</span>
								</li>
							))}
						</ul>
						<p className="mt-5 leading-relaxed text-[#16264f]">
							「今
							何日超過」「これから出たい」「将来もタイに戻りたい」——状況に応じた動き方をご案内します。摘発前に、まず
							LINE で。
						</p>
						<div className="mt-6">
							<CallButton placement="overstay" label="緊急LINE無料通話" />
						</div>
					</div>
				</section>

				{/* ───── ⑦ WALC にできること ───── */}
				<section className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
					<p className="imm-kicker">WALC VISA にできること</p>
					<h2 className={`mt-2 ${H2}`}>
						まず、現実的な選択肢を一緒に整理します
					</h2>
					<p className="mt-3 max-w-3xl leading-relaxed text-[#3a4a73]">
						タイ在住13年・VISAサポート事業7年目の知見で、入国時に止められた方、過去の滞在やオーバーステイ・送還に不安がある方のご相談に対応します。
					</p>
					<ul className="mt-5 space-y-3">
						{WHAT_WE_CAN_DO.map((w) => (
							<li
								key={w.slice(0, 24)}
								className="flex gap-2.5 leading-relaxed text-[#3a4a73]"
							>
								<ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#b8893f]" />
								<span>{w}</span>
							</li>
						))}
					</ul>
				</section>

				{/* ───── ⑧ ご相談の流れ ───── */}
				<section className="imm-band-soft border-y border-[#e6eaf3]">
					<div className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
						<p className="imm-kicker">ご相談の流れ</p>
						<h2 className={`mt-2 ${H2}`}>3ステップ・まずは LINE から</h2>
						<ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
							{CONSULT_FLOW.map((s, i) => (
								<li key={s.head} className="imm-card p-5">
									<div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16264f] text-base font-black text-white">
										{i + 1}
									</div>
									<h3 className="mt-3 font-bold text-[#16264f]">{s.head}</h3>
									<p className="mt-1.5 text-sm leading-relaxed text-[#3a4a73]">
										{s.body}
									</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				{/* ───── ⑨ FAQ(native details = FAQPage 同期)───── */}
				<section className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
					<p className="imm-kicker">よくある質問</p>
					<h2 className={`mt-2 ${H2}`}>FAQ</h2>
					<div className="mt-6 divide-y divide-[#e6eaf3] border-y border-[#e6eaf3]">
						{FAQ_ITEMS.map((f) => (
							<details key={f.question} className="imm-acc group py-4">
								<summary className="flex items-start justify-between gap-3">
									<span className="font-semibold text-[#16264f]">
										{f.question}
									</span>
									<Plus className="imm-acc-icon mt-1 h-4 w-4 shrink-0 text-[#b8893f]" />
								</summary>
								<p className="mt-2.5 text-sm leading-relaxed text-[#3a4a73]">
									{f.answer}
								</p>
							</details>
						))}
					</div>
				</section>

				{/* ───── 関連ブログ(相互リンク)───── */}
				<section className="mx-auto max-w-5xl px-5 md:px-8 pb-4">
					<div className="imm-card p-6">
						<p className="imm-kicker">もっと詳しく(ブログ)</p>
						<ul className="mt-3 space-y-2">
							{RELATED_BLOG.map((r) => (
								<li key={r.href}>
									<Link
										href={r.href}
										className="inline-flex items-start gap-2 text-sm text-[#3a4a73] hover:text-[#16264f] hover:underline"
									>
										<FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#b8893f]" />
										{r.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* ───── ⑩ 最終CTA ───── */}
				<section className="mx-auto max-w-5xl px-5 md:px-8 py-12 md:py-16">
					<div className="imm-card p-8 md:p-10 text-center">
						<h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#16264f]">
							一人で抱え込まないでください。
						</h2>
						<p className="mt-3 text-base md:text-lg text-[#3a4a73]">
							まずは LINE で、状況をお聞かせください。
						</p>
						<div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
							<CallButton placement="final" label="緊急LINE無料通話" />
							<AddFriendButton placement="final" label="LINE友だち追加" />
						</div>
					</div>
				</section>

				{/* ───── Footer + 免責 + 出典 ───── */}
				<footer className="border-t border-[#e6eaf3] bg-[#f7f8fb]">
					<div className="mx-auto max-w-5xl px-5 md:px-8 py-10 text-sm text-[#5b6680]">
						<p className="font-semibold text-[#16264f]">
							監修:{WALC_AUTHOR.name}(WALC VISA Consulting 代表)
						</p>
						<p className="mt-3 leading-relaxed">{DISCLAIMER}</p>
						<div className="mt-5">
							<p className="imm-kicker">出典(公的・公開)</p>
							<ul className="mt-2 space-y-1.5">
								{SOURCES.map((s) => (
									<li key={s.url}>
										<a
											href={s.url}
											target="_blank"
											rel="noopener noreferrer nofollow"
											className="inline-flex items-center gap-1.5 text-[#3a4a73] hover:underline"
										>
											<ArrowRight className="h-3.5 w-3.5" />
											{s.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</footer>
			</main>

			{/* ───── 追従 CTA バー(モバイル最優先)───── */}
			<div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e6eaf3] bg-white/95 backdrop-blur md:hidden">
				<div className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-2.5">
					<a
						href={emergencyCallHref("stickybar")}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#06c755] px-4 py-2.5 text-sm font-bold text-white"
					>
						<Phone className="h-4 w-4" />
						無料通話で相談
					</a>
					<a
						href={friendAddHref("stickybar")}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#16264f]/25 px-4 py-2.5 text-sm font-semibold text-[#16264f]"
					>
						<MessageCircle className="h-4 w-4" />
						友だち追加
					</a>
				</div>
			</div>
		</>
	);
}

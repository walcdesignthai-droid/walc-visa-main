/**
 * components/lp/CompanyInfo.tsx — 会社概要 (最下部・業務的)
 * ----------------------------------------------------------------------------
 * v3.0 (2026-05-26) — 最下部配置 + 業務的な信頼感ある構成に改訂
 *   - 営業時間 / 公式 WEB / 問合せ Email 追加
 *   - 創業年と法人登記日を分けて表示
 *   - 装飾を抑え、企業ポータル風の整然レイアウト
 *
 * 出典: walc-studio/knowledge/01_walc_company_info.md
 * 非表示項目 (Yosuke 指示): 振込先 / 提携先一覧 / 取扱業務一覧 / 取扱わない業務
 * ----------------------------------------------------------------------------
 */

import { Building2, Globe, Mail } from "lucide-react";

interface CompanyRow {
	label: string;
	value: string;
}

const COMPANY_PROFILE: CompanyRow[] = [
	{ label: "法人名", value: "WALC DESIGN Co., Ltd." },
	{ label: "代表取締役", value: "小野寺 陽介(Yosuke Onodera)" },
	{ label: "事業内容", value: "タイ VISA 取得代行 / 渡航コンサルティング" },
	{ label: "本社所在地", value: "タイ・バンコク・トンロー" },
	{ label: "創業", value: "2020 年(タイ拠点 6 年)" },
	{ label: "法人設立", value: "2021 年 8 月 27 日" },
	{ label: "資本金", value: "5,000,000 バーツ" },
	{ label: "登記", value: "タイ商務省にて正規法人登記済" },
	{ label: "営業時間", value: "月〜金 9:00 – 18:00(タイ時間・GMT+7)" },
	{ label: "対応言語", value: "日本語(書類・面談・LINE 連絡まで完結)" },
];

export function CompanyInfo() {
	return (
		<section
			id="company-info"
			className="bg-slate-50 border-t border-border-subtle"
		>
			<div className="mx-auto max-w-content px-5 md:px-8 py-16 md:py-20">
				{/* セクションヘッダー */}
				<div className="max-w-2xl mb-10 md:mb-12">
					<div className="inline-flex items-center gap-2.5 mb-3">
						<span className="w-8 h-px bg-text-tertiary" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-text-secondary font-semibold">
							Corporate Profile
						</span>
					</div>
					<h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-3">
						会社概要
					</h2>
					<p className="text-sm md:text-base text-text-secondary leading-relaxed">
						タイ商務省登記の現地法人として、日本人向けの長期 VISA 取得・移住サポートを専門に提供しております。
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
					{/* 左: 会社情報テーブル */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg border border-border-subtle overflow-hidden">
							<dl className="divide-y divide-border-subtle">
								{COMPANY_PROFILE.map(({ label, value }) => (
									<div
										key={label}
										className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 px-5 md:px-7 py-3.5 md:py-4"
									>
										<dt className="col-span-1 text-xs md:text-sm font-semibold text-text-secondary tracking-wide">
											{label}
										</dt>
										<dd className="col-span-2 md:col-span-3 text-sm md:text-[15px] text-text-primary leading-relaxed">
											{value}
										</dd>
									</div>
								))}
							</dl>
						</div>

						{/* コンプラ姿勢 */}
						<p className="text-[11px] md:text-xs text-text-tertiary mt-4 leading-relaxed">
							※ タイの法令・運用は予告なく変更されることがあります。WALC は正規エージェントとして、書類の偽造・改ざんは一切行いません。各料金は本サイト記載時点のものであり、最新情報は公式 LINE にて即時ご確認いただけます。
						</p>
					</div>

					{/* 右: 連絡先カード */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg border border-border-subtle p-5 md:p-6 space-y-5">
							<div>
								<div className="flex items-center gap-2 mb-1">
									<Building2 className="w-3.5 h-3.5 text-text-tertiary" />
									<h3 className="text-xs font-semibold text-text-secondary tracking-wide uppercase">
										Contact
									</h3>
								</div>
								<p className="text-xs text-text-tertiary mt-2">
									日本語でお気軽にご相談ください
								</p>
							</div>

							<a
								href="https://walc-visa.online"
								className="block group"
							>
								<div className="flex items-center gap-2 text-text-tertiary mb-1">
									<Globe className="w-3.5 h-3.5" />
									<span className="text-[10px] uppercase tracking-wider font-semibold">
										公式 WEB
									</span>
								</div>
								<div className="text-sm md:text-base font-medium text-text-primary group-hover:text-brand transition-colors break-all">
									walc-visa.online
								</div>
							</a>

							<a href="mailto:walcvisa@gmail.com" className="block group">
								<div className="flex items-center gap-2 text-text-tertiary mb-1">
									<Mail className="w-3.5 h-3.5" />
									<span className="text-[10px] uppercase tracking-wider font-semibold">
										Email
									</span>
								</div>
								<div className="text-sm md:text-base font-medium text-text-primary group-hover:text-brand transition-colors break-all">
									walcvisa@gmail.com
								</div>
							</a>

							<div className="pt-4 border-t border-border-subtle">
								<a
									href="https://lin.ee/HQc9axW"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-deep transition-colors"
								>
									LINE で相談する
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

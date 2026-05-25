/**
 * components/lp/CompanyInfo.tsx — 会社概要セクション
 * ----------------------------------------------------------------------------
 * v2.0 (2026-05-25) — 旧 CompanyProof を全面簡素化。
 *   登記簿画像・登記番号・タイ語法人名・DBD バッジ等の「過剰な信頼アピール」を全削除。
 *   一般企業の about ページレベルのシンプルな会社情報のみに。
 * ----------------------------------------------------------------------------
 */

const COMPANY = [
	{ label: "法人名", value: "WALC Design Co., Ltd." },
	{ label: "設立", value: "2021 年 8 月 27 日" },
	{ label: "資本金", value: "5,000,000 バーツ" },
	{ label: "所在地", value: "タイ・バンコク" },
	{
		label: "事業内容",
		value: "タイ VISA 取得代行 / 渡航コンサルティング",
	},
	{ label: "代表取締役", value: "小野寺 陽介" },
] as const;

export function CompanyInfo() {
	return (
		<section
			id="company-info"
			className="bg-bg-secondary border-y border-border-subtle"
		>
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							About Us
						</span>
						<span className="w-8 h-px bg-accent-blue" />
					</div>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4 leading-tight">
						会社概要
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						タイの VISA 取得・運用を専門に行う、バンコク拠点の現地法人です。
					</p>
				</div>

				{/* 会社情報テーブル(中央配置) */}
				<div className="max-w-2xl mx-auto bg-white rounded-xl border border-border-subtle shadow-sm overflow-hidden">
					<dl>
						{COMPANY.map(({ label, value }, i) => (
							<div
								key={label}
								className={`grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 px-6 md:px-8 py-4 md:py-5 ${
									i !== COMPANY.length - 1 ? "border-b border-border-subtle" : ""
								}`}
							>
								<dt className="col-span-1 text-sm font-semibold text-text-secondary tracking-wide">
									{label}
								</dt>
								<dd className="col-span-2 md:col-span-3 text-sm md:text-base text-text-primary font-medium leading-relaxed">
									{value}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
}

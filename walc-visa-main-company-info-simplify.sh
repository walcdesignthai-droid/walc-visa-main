#!/bin/bash
# ============================================================================
# walc-visa-main: CompanyProof → CompanyInfo に作り替え (やりすぎ感削除)
# ----------------------------------------------------------------------------
# - 登記簿画像・登記番号・タイ語法人名・DBD バッジ全削除
# - 一般的な about ページレベルの簡素な会社情報のみに
# - レイアウトも 1 カラム中央配置でシンプルに
# ============================================================================

set -e

WMV="$HOME/walc-projects/walc-visa-main"
cd "$WMV"

# ============================================================================
# 1. CompanyProof.tsx を CompanyInfo.tsx に置換
# ============================================================================
echo "→ Rename CompanyProof.tsx → CompanyInfo.tsx"
rm -f "$WMV/components/lp/CompanyProof.tsx"

cat > "$WMV/components/lp/CompanyInfo.tsx" <<'INFO_EOF'
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
INFO_EOF

# ============================================================================
# 2. app/page.tsx の import 名を CompanyProof → CompanyInfo に置換
# ============================================================================
echo "→ Update app/page.tsx (CompanyProof → CompanyInfo)"

cat > "$WMV/app/page.tsx" <<'PAGE_EOF'
/**
 * app/page.tsx — walc-visa.online トップページ
 * ----------------------------------------------------------------------------
 * v1.5 (2026-05-25) — CompanyProof → CompanyInfo (簡素化)
 * ----------------------------------------------------------------------------
 */

import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { CompanyInfo } from "@/components/lp/CompanyInfo";
import { FinalCta } from "@/components/lp/FinalCta";
import { Founder } from "@/components/lp/Founder";
import { Hero } from "@/components/lp/Hero";
import { Process } from "@/components/lp/Process";
import { TrustStrip } from "@/components/lp/TrustStrip";
import { VisaTypes } from "@/components/lp/VisaTypes";
import { WhyWalc } from "@/components/lp/WhyWalc";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="flex-1 pt-16 md:pt-20">
				<Hero />
				<TrustStrip />
				<VisaTypes />
				<WhyWalc />
				<CompanyInfo />
				<Process />
				<Founder />
				<FinalCta />
			</main>
			<Footer />
		</>
	);
}
PAGE_EOF

# ============================================================================
# 3. 不要画像削除 (public/walc-affidavit-p1.png)
# ============================================================================
echo "→ Remove unused walc-affidavit-p1.png"
rm -f "$WMV/public/walc-affidavit-p1.png"

# ============================================================================
# 4. 検証
# ============================================================================
echo ""
echo "→ Verify: typecheck"
pnpm typecheck

# ============================================================================
# 5. commit
# ============================================================================
echo ""
echo "→ git commit"
git add -A
git commit -m "refactor(company): simplify CompanyProof → CompanyInfo

- Remove affidavit PDF image (looked overdone, suspicious)
- Remove Thai registration number 0105564127471
- Remove Thai company name (Thai characters)
- Remove DBD certification badge + external link
- Remove 'real entity / open' aggressive self-claims
- Remove visitor reception disclaimer
- Single centered card layout with 6 standard fields:
  法人名 / 設立 / 資本金 / 所在地 / 事業内容 / 代表取締役"

echo ""
echo "============================================================================"
echo "✓ Company section simplified!"
echo "============================================================================"

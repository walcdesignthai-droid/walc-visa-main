#!/bin/bash
# ============================================================================
# walc-visa-main CompanyProof 見出し修正
# ----------------------------------------------------------------------------
# 「タイ商務省登記の正規法人として、バンコクで 6 年。」(不自然)
#  → 「タイ法人として、バンコクで 6 年。」(自然・上質)
# キャプション英文も "Registered Legal Entity" → "Registered in Thailand" へ
# ============================================================================

set -e

WMV="$HOME/walc-projects/walc-visa-main"
cd "$WMV"

cat > "$WMV/components/lp/CompanyProof.tsx" <<'PROOF_EOF'
/**
 * components/lp/CompanyProof.tsx — タイ法人実在証明セクション
 * ----------------------------------------------------------------------------
 * 修正履歴:
 *   v1.1 (2026-05-25) — 見出しの硬い表現を自然化。
 *     「タイ商務省登記の正規法人として、バンコクで 6 年。」
 *      → 「タイ法人として、バンコクで 6 年。」
 *     キャプション: "Registered Legal Entity" → "Registered in Thailand"
 *     詳細(商務省・登記)は本文 + テーブルで提示。
 * ----------------------------------------------------------------------------
 */

import { Building2, ExternalLink, FileCheck2, ShieldCheck } from "lucide-react";
import Image from "next/image";

const REGISTRY = [
	{ label: "法人名 (英)", value: "WALC Design Co., Ltd." },
	{
		label: "法人名 (タイ)",
		value: "บริษัท ดับเบิลยู เอ แอล ซี ดีไซน์ จำกัด",
	},
	{ label: "登記番号", value: "0105564127471" },
	{ label: "設立", value: "2021 年 8 月 27 日" },
	{ label: "資本金", value: "5,000,000 THB(500 万バーツ)" },
	{
		label: "登記住所",
		value:
			"591 Sukhumvit Road, Samutchavanich 2 Building 20F, Khlong Tan Nuea, Watthana, Bangkok",
	},
	{ label: "発行元", value: "タイ商務省 事業開発局 (DBD)" },
	{ label: "発行日", value: "2025 年 11 月 17 日" },
] as const;

export function CompanyProof() {
	return (
		<section id="company-proof" className="bg-bg-secondary border-y border-border-subtle">
			<div className="mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				{/* セクションヘッダー */}
				<div className="max-w-3xl mb-12 md:mb-16">
					<div className="inline-flex items-center gap-2.5 mb-4">
						<span className="w-8 h-px bg-accent-blue" />
						<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-accent-blue font-semibold">
							Registered in Thailand
						</span>
					</div>
					<h2 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-4 leading-tight">
						タイ法人として、バンコクで 6 年。
					</h2>
					<p className="text-base md:text-lg text-text-secondary leading-relaxed">
						運営母体は、タイ商務省に登記された「WALC Design Co., Ltd.」。
						<br className="hidden md:block" />
						実在する現地法人として、登記情報も全てオープンにしています。
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
					{/* 左: 登記情報テーブル */}
					<div className="lg:col-span-7">
						<div className="bg-white rounded-xl border border-border-subtle p-6 md:p-8 shadow-sm">
							<div className="flex items-center gap-3 mb-6 pb-5 border-b border-border-subtle">
								<div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center">
									<Building2 className="w-5 h-5 text-brand" strokeWidth={1.8} />
								</div>
								<div>
									<p className="text-[10px] tracking-[0.22em] uppercase text-text-tertiary font-bold">
										Company Registry
									</p>
									<h3 className="text-lg font-bold text-text-primary">
										登記情報(タイ商務省データベース準拠)
									</h3>
								</div>
							</div>

							<dl className="divide-y divide-border-subtle">
								{REGISTRY.map(({ label, value }) => (
									<div
										key={label}
										className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 py-3.5"
									>
										<dt className="text-xs md:text-sm font-semibold text-text-secondary tracking-wide">
											{label}
										</dt>
										<dd className="md:col-span-2 text-sm md:text-[15px] text-text-primary font-medium leading-relaxed">
											{value}
										</dd>
									</div>
								))}
							</dl>

							{/* 認証バッジ */}
							<div className="mt-6 pt-5 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
								<div className="flex items-center gap-2.5">
									<ShieldCheck className="w-5 h-5 text-emerald-600" />
									<span className="text-xs md:text-sm font-semibold text-emerald-700">
										DBD 認証済(QR コード検証可能)
									</span>
								</div>
								<a
									href="https://www.dbd.go.th"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-accent-blue hover:text-accent-blue-bright transition-colors"
								>
									タイ商務省事業開発局
									<ExternalLink className="w-3.5 h-3.5" />
								</a>
							</div>
						</div>
					</div>

					{/* 右: 登記簿サムネイル */}
					<div className="lg:col-span-5">
						<a
							href="/walc-affidavit-p1.png"
							target="_blank"
							rel="noopener noreferrer"
							className="group block bg-white rounded-xl border border-border-subtle p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
						>
							<div className="flex items-center gap-2 mb-3 px-1">
								<FileCheck2 className="w-4 h-4 text-brand" />
								<span className="text-[11px] tracking-widest uppercase text-text-tertiary font-bold">
									登記簿 (หนังสือรับรอง)
								</span>
								<span className="ml-auto text-[11px] text-text-tertiary group-hover:text-accent-blue transition-colors">
									拡大 →
								</span>
							</div>

							<div className="relative w-full aspect-[1/1.414] bg-bg-elevated rounded-lg overflow-hidden border border-border-subtle">
								<Image
									src="/walc-affidavit-p1.png"
									alt="WALC Design Co., Ltd. 登記簿(タイ商務省発行)"
									fill
									sizes="(max-width: 1024px) 100vw, 40vw"
									className="object-contain"
								/>
							</div>

							<p className="mt-3 px-1 text-[11px] text-text-tertiary leading-relaxed">
								Ref: E10091221025789 / タイ商務省事業開発局
								<br />
								発行日: 2025 年 11 月 17 日
							</p>
						</a>
					</div>
				</div>

				{/* 補足: 来訪不可の明示 */}
				<p className="mt-10 text-xs text-text-tertiary leading-relaxed text-center max-w-2xl mx-auto">
					※ 登記住所は法人登録上の住所であり、来訪受付窓口ではありません。
					お問い合わせは LINE 公式アカウントもしくは申込フォームよりお願いいたします。
				</p>
			</div>
		</section>
	);
}
PROOF_EOF

echo "→ Verify: typecheck"
pnpm typecheck

echo ""
echo "→ git commit"
git add -A
git commit -m "refactor(company-proof): naturalize headline copy

- h2: タイ商務省登記の正規法人として、バンコクで 6 年。
   →  タイ法人として、バンコクで 6 年。
- caption: Registered Legal Entity → Registered in Thailand
- subtext: 「運営母体は、タイ商務省に登記された WALC Design Co., Ltd.」へ
  (商務省/登記の硬い表現は本文+テーブル側に降ろす)"

echo ""
echo "============================================================================"
echo "✓ Headline fix applied!"
echo "============================================================================"

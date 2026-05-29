/**
 * app/llms.txt/route.ts
 * ----------------------------------------------------------------------------
 * /llms.txt — AI / agent 向け機械可読マニフェスト(LLMO)。
 *
 * 方針(v1.3 §11 厳守):
 *   - llms.txt は AI/agent manifest であって「ランキング保証シグナル」ではない。
 *   - 記載は事実ベースのみ。保証・ランキング・断定(業界No.1 / 取得保証 / 最安 等)は禁止。
 *   - 実績数値は SOT(lib/walc-data/stats.ts)から取得し直書きしない(F-1 drift 防止)。
 *   - 個別の料金は drift 防止のため llms.txt に直書きせず、サイト本体を参照させる。
 *   - 代表者名・設立は canonical(walc-studio/knowledge/CANONICAL-OWNER-PROFILE.md)に準拠。
 * ----------------------------------------------------------------------------
 */

import { getDtvAcquisitionStats } from "@/lib/walc-data/stats";

export const dynamic = "force-static";

export function GET(): Response {
	const stats = getDtvAcquisitionStats();

	const body = `# WALC VISA Consulting — タイ VISA 取得代行

> タイの各種 VISA 取得代行サービス。運営は WALC DESIGN Co., Ltd.(バンコク拠点)。書類整備から申請まで日本語で伴走サポートします。本ファイルは AI / エージェント向けの事実ベース・マニフェストです(ランキングや成果を保証するものではありません)。

## 事業者情報
- 提供者: WALC VISA Consulting(運営: WALC DESIGN Co., Ltd.)
- 代表者: 小野寺 陽介(Yosuke Onodera)
- 所在地: 30 Sukhumvit 61, Wattana, Bangkok 10110, Thailand
- 法人設立: 2021-08-27(タイでの事業活動は 2020 年〜)
- 対応言語: 日本語
- サイト: https://walc-visa.online

## 提供サービス(取り扱い VISA カテゴリ)
- DTV(Destination Thailand Visa): 5 年マルチプル / リモートワーカー・ソフトパワー領域向け。WALC 第一推奨。専門サイト: https://dtv.walc-visa.online
- NON-O リタイアメント(50 歳以上)
- Thailand Privilege(旧 Thailand Elite Visa)
- LTR(Long-Term Resident Visa)
- 学生 VISA(NON-ED)
- 結婚・家族 VISA(NON-O / Marriage / Family / Guardian)
- 空港イミグレサポート / ビザランサポート
- 各 VISA の最新料金・条件はサイト本体および各 VISA ページに記載。

## 実績(自社実績 / 母数明示)
- DTV 申請実績: ${stats.totalAttempts} 件中 ${stats.acquired} 件が取得(母数: ${stats.totalAttempts} / 対象期間: ${stats.periodLabel})。
- WALC 全体の VISA 取得実績: 累計 ${stats.walcTotalAcquired}+ 件。
- 上記は過去実績であり、将来の取得を保証するものではありません。
- 最終更新: ${stats.lastUpdated}

## 主要ページ
- トップ: https://walc-visa.online/
- LTR(Long-Term Resident)Visa: https://walc-visa.online/visas/ltr
- リタイアメント(NON-O)Visa: https://walc-visa.online/visas/retirement
- DTV 専門サイト: https://dtv.walc-visa.online

## 連絡
- 問い合わせはサイト本体の導線より受付。
`;

	return new Response(body, {
		headers: {
			"content-type": "text/plain; charset=utf-8",
			"cache-control": "public, max-age=3600",
		},
	});
}

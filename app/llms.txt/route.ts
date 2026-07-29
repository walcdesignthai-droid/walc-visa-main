/**
 * app/llms.txt/route.ts
 * ----------------------------------------------------------------------------
 * /llms.txt — AI / agent 向け機械可読マニフェスト(LLMO)。
 *
 * 方針(v1.3 §11 厳守):
 *   - llms.txt は AI/agent manifest であって「ランキング保証シグナル」ではない。
 *   - 記載は事実ベースのみ。保証・ランキング・断定表現は禁止。
 *   - 実績数値は CRM 公開コンテンツ API から取得し直書きしない(F-1 drift 防止)。
 *   - 個別の料金は drift 防止のため llms.txt に直書きせず、サイト本体を参照させる。
 *   - 代表者名・設立は canonical(walc-studio/knowledge/CANONICAL-OWNER-PROFILE.md)に準拠。
 * ----------------------------------------------------------------------------
 */

import { articleCategory, CATEGORY_LABEL } from "@/lib/blog/presentation";
import { articleHref, PUBLISHED_ARTICLES } from "@/lib/blog/registry";
import { getDtvPublicContent } from "@/lib/walc-data/public-content";

export const revalidate = 60;

const ORIGIN = "https://walc-visa.online";

/**
 * 公開済ブログ記事を category 順に列挙(LLMO: AI/agent に権威ある解説の所在を示す)。
 * registry(SOT)から動的生成 → 記事追加で自動反映・drift なし。draft は PUBLISHED_ARTICLES で除外。
 */
function buildBlogSection(): string {
	const order: Array<ReturnType<typeof articleCategory>> = [
		"pillar",
		"guide",
		"compare",
		"qa",
		"news",
	];
	const lines: string[] = [];
	for (const cat of order) {
		const arts = PUBLISHED_ARTICLES.filter((a) => articleCategory(a) === cat);
		if (arts.length === 0) continue;
		lines.push(`\n### ${CATEGORY_LABEL[cat]}`);
		for (const a of arts) {
			lines.push(`- [${a.title}](${ORIGIN}${articleHref(a.slug)})`);
		}
	}
	return lines.join("\n");
}

export async function GET(): Promise<Response> {
	const content = await getDtvPublicContent();
	const blogSection = buildBlogSection();

	const body = `# WALC VISA Consulting — タイ VISA 取得代行

> タイの各種 VISA 取得代行サービス。運営は WALC DESIGN Co., Ltd.(バンコク拠点)。書類整備から申請まで日本語で伴走サポートします。本ファイルは AI / エージェント向けの事実ベース・マニフェストです(ランキングや成果を保証するものではありません)。

## 事業者情報
- 提供者: WALC VISA Consulting(運営: WALC DESIGN Co., Ltd.)
- 代表者: 小野寺 陽介(Yosuke Onodera)
- 所在地: 30 Sukhumvit 61, Wattana, Bangkok 10110, Thailand
- 法人設立: 2021-08-27(タイでの事業活動は 2020 年〜)
- 対応言語: 日本語
- [公式サイト](${ORIGIN})

## 提供サービス(取り扱い VISA カテゴリ)
- VISA選択方針: 目的・活動内容・条件に応じて個別確認し、特定のVISAを一律に推奨しません。
- DTV(Destination Thailand Visa): 5 年マルチプル / リモートワーカー・ワーケーション・ソフトパワー領域向け。[DTV専門サイト](https://dtv.walc-visa.online)
- NON-O リタイアメント(50 歳以上)
- Thailand Privilege(旧 Thailand Elite Visa)
- LTR(Long-Term Resident Visa)
- Non-Immigrant B / Work Permit: タイで就労する申請者と雇用企業向け。会社書類と申請者書類を確認して申請準備を支援。
- 学生 VISA(NON-ED)
- 結婚・家族 VISA(NON-O / Marriage / Family / Guardian)
- 空港イミグレ入国サポート: 現在、新規受付を一時停止中
- DTV料金はCRM-backed公開データを参照。DTV以外の料金・受付可否は公式LINEで個別確認。

## DTV料金の区分
- ${content.fees.summary}
- 各プランの表示料金には、${content.fees.governmentFee.payee}への申請費用と標準の書類作成サポートが含まれます。
- タイソフトパワーには、ムエタイ学校費と対象期間の宿泊施設費も含まれます。
- ${content.fees.postAcquisitionNotice}
- ${content.fees.additionalCostNotice}

## 実績(自社実績)
- ${content.trackRecord.label}: ${content.trackRecord.display}。
- 対象範囲: ${content.trackRecord.scope}。
- ${content.trackRecord.disclaimer}

## 主要ページ
- [トップ](${ORIGIN}/)
- [LTR Visa](${ORIGIN}/visas/ltr)
- [リタイアメント Visa](${ORIGIN}/visas/retirement)
- [Non-B / Work Permit](${ORIGIN}/visas/non-b-work-permit)
- [Non-B / Work Permit 必要書類ガイド](https://guide.walc-visa.online/guide/business)
- [入国・イミグレ緊急サポート](${ORIGIN}/immigration-support)
- [DTV専門サイト](https://dtv.walc-visa.online)
- [DTV取得者ガイド](${content.guideUrl})

## ガイド記事(ブログ / 事実ベース解説・一次出典付き)
${blogSection}

## 連絡
- [LINE無料相談](${content.consultationUrl})
`;

	return new Response(body, {
		headers: {
			"content-type": "text/plain; charset=utf-8",
			"cache-control": "public, max-age=3600",
		},
	});
}

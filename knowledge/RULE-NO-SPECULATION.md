# 🔴 WALC 絶対ルール: 推測数値の禁止

最終更新: 2026-05-26
適用範囲: 全 WALC プロジェクト (walc-visa-main / walc-visa-crm / 顧客案件 / 自社サービス)
違反時: 即座にロールバック + 該当箇所の修正必須

---

## なぜこのルールが必要か

過去事故:
- walc-visa-main の Pricing セクションで全 6 VISA の料金を Claude が推測で書き込み、
  そのまま本番デプロイ → 顧客に間違った料金表示
- 数字 1 箇所に直書きで散在 → 修正時に全箇所を grep する必要 + 漏れリスク
- preferences に「事実ベース」と書いてあっても、コード生成時に守られず

---

## 絶対ルール (3 つ)

### ルール A: 推測表記の絶対禁止

具体的な数値・料金・期間・件数・スペック等で **事実が不明な場合、コードに書かない**。

| 行為 | 判定 |
|---|---|
| 適当な数字を仮置きする (例: `60,000 THB〜`) | 🚫 NG |
| 「概ね〜」「目安として」等の濁し表現 | 🚫 NG |
| 過去セッションで自分が書いた数値を「たぶん正しい」で再利用 | 🚫 NG |
| 「業界相場として」等の一般論を WALC 案件で使う | 🚫 NG |
| **明示的プレースホルダ** (例: `PLACEHOLDER_PRICE_DTV`) | ✅ OK |
| 必須入力プロパティ + 未設定なら build error | ✅ OK |
| 「Yosuke さんから数字確認後に埋めます」と質問して止まる | ✅ OK |
| ユーザーが明示的に伝えた値 | ✅ OK |
| 公的資料 / 法令 / 公式ドキュメントの引用 (出典明記) | ✅ OK |
| システムから取得した値 (DB / API / env) | ✅ OK |

### ルール B: 数値は必ず単一ファイルで一元管理 + 編集を促す

数値・スペック類は **データソース 1 箇所** に集約。コンポーネント側に直書き禁止。

#### 標準構造

```
lib/walc-data/
  ├─ pricing.ts        ← 全 VISA 料金
  ├─ stats.ts          ← 取得実績件数 / 設立年など
  ├─ profile.ts        ← 代表者プロフィール / 会社情報
  ├─ contact.ts        ← 連絡先 / 営業時間 / 相談手段
  └─ knowledge.ts      ← AI コンシェルジュ用の事実集
```

#### 各ファイル冒頭のテンプレート

```typescript
/**
 * lib/walc-data/pricing.ts
 * ----------------------------------------------------------------------------
 * ⚠️ 数値変更時はここを編集 (他箇所への影響範囲: 下記参照)
 *
 * 参照箇所:
 *   - components/sections/Pricing.tsx
 *   - components/sections/VisaResultCard.tsx
 *   - lib/concierge/system-prompt.ts (AI が顧客に伝える料金)
 *   - app/visas/[slug]/page.tsx
 *
 * 最終確認: 2026-05-26 by Yosuke (source: WALC 内部料金表 v2)
 * ----------------------------------------------------------------------------
 */

export interface VisaPricing {
  slug: string;
  name: string;
  walcFee: number;      // WALC コンサル料金 (THB)
  govFee: number;       // 政府費用 (THB)
  currency: "THB";
  notes?: string;
}

export const VISA_PRICING: Record<string, VisaPricing> = {
  // ⚠️ Yosuke 確認待ちの値はコメントアウトしておく (build error を避けつつ仮実装防止)
  // dtv: { ... },
};
```

#### 未確認データの扱い

```typescript
// 値が不明な場合、type 定義だけ用意して実体は出さない
export const VISA_PRICING: Record<string, VisaPricing> = {
  // TODO(yosuke): 料金表を提示してもらう - 2026-05-26 確認待ち
  // dtv: { slug: 'dtv', name: 'DTV', walcFee: ?, govFee: ?, currency: 'THB' },
};

// Pricing component 側で参照する時:
const dtv = VISA_PRICING.dtv;
if (!dtv) {
  return <PricingPlaceholder visaName="DTV" />;  // 「料金は LINE で個別案内」等
}
```

### ルール C: 数値を扱う回答の最終チェック

数値を含む回答 / コードを出す前に Claude は自分に問う:

> **この数字は (1) ユーザーが明示的に伝えた値、(2) 公的資料・ドキュメントから引用した値、(3) システムから取得した値、のいずれか?**

3 つのどれにも該当しなければ:
1. **書かない**
2. **必ずプレースホルダ + 質問で返す**
3. ユーザーに「以下の数値を教えてください: ...」と明示

#### 質問テンプレート

```
## 数値確認が必要

以下の数字が必要ですが、私が事実として把握していません。
お手数ですが正値を教えてください:

| 項目 | 質問 |
|---|---|
| DTV 政府費 | XXX THB? |
| LTR WALC 料金 | XXX THB? |
| ...  | ... |

それまで該当箇所はプレースホルダで実装します。
```

---

## チェックリスト (Claude が数値を扱う時の自己点検)

数値を含むコード / 文章を生成する前に必ず:

- [ ] この数字の **出典** を 1 行で言えるか?
- [ ] 出典が「過去セッションで自分が書いた」「業界相場」「一般論」だったら → 削除する
- [ ] 単一の数字を **複数箇所** に書こうとしていないか? → データソースに集約する
- [ ] 数字を入れた後、ユーザーに「ここを確認してください」と **明示** したか?

---

## 違反検知の方法

### 静的解析 (推奨)

数値リテラル直書きをエスリント等で検知:

```javascript
// .eslintrc 案
{
  "rules": {
    "no-magic-numbers": ["warn", {
      "ignore": [0, 1, -1, 2, 100],
      "ignoreArrayIndexes": true,
      "enforceConst": true,
      "detectObjects": false
    }]
  }
}
```

### コードレビュー観点

PR / commit で以下を確認:
- THB / JPY / USD など通貨を伴う数字がコンポーネントに直書きされていないか
- 「6 年」「300 件」「212/212」等の WALC 実績数字がコンポーネントに直書きされていないか
- TODO コメントが残っているまま deploy しようとしていないか

---

## このルールは Claude (AI Agent) 向け運用の最重要事項

WALC マスタールール (`~/walc-projects/CLAUDE.md`) で最上位に参照されている。
新規セッション開始時 / 数値を扱うタスクの着手前に Claude は必ずこのルールを読むこと。

違反した場合は即座にロールバック + 修正 + 該当箇所の所在をユーザーに報告。

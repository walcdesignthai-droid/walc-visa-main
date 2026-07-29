---
title: WALC VISA knowledge-source index
version: 2.0
updated: 2026-07-29
status: active
priority: critical
---

# WALC VISA knowledge-source index

## Runtime public-answer canon

AIランタイムへ組み込む公開正本は次の2ファイルだけである。
両方とも `status: owner_confirmed` が必要。

| File | Role | Runtime |
|---|---|---|
| `knowledge_base/00_current_operations.md` | 現行サービス、申込導線、受付状態、回答原則 | included |
| `knowledge_base/07_bank_account_current.md` | DTV取得者限定の銀行口座開設サポート運用 | included |

DTVの料金・申請通過実績・受付状態などの動的情報は、
CRM公開コンテンツAPIを正本とする。
VISA制度・必要書類・審査・税務は、回答時点の公式一次情報で確認する。

`scripts/build-knowledge.mjs` のallowlistと本表が一致しない場合は、
ビルドを公開せずIssueを作成する。

この表の対象は、生成される `KNOWLEDGE_BASE` セクションである。
AIコンシェルジュ全体では、`lib/walc-data/public-content.ts`、
`lib/walc-data/dtv-authority.ts`、`lib/walc-data/pricing.ts` も
`lib/concierge/system-prompt.ts` から参照される。これらは別の公開情報面として
個別に監査し、このallowlistへの記載だけで正本化しない。

## legacy / internal-only

次のファイルは履歴参照専用の **legacy / internal-only** である。
AI回答、公開ページ、営業文面、価格、実績、推奨ロジックへ使用しない。

| File | Historical scope | Current public use |
|---|---|---|
| `knowledge_base/00_walc_principles.md` | 旧営業方針 | prohibited |
| `knowledge_base/01_walc_company_info.md` | 旧会社情報・実績 | prohibited |
| `knowledge_base/02_pricing_master.md` | 旧価格表 | prohibited |
| `knowledge_base/03_thai_visa_glossary.md` | 旧VISA辞書・制度解釈 | prohibited |
| `knowledge_base/04_immigration_practice.md` | 旧イミグレ実務 | prohibited |
| `knowledge_base/05_overstay_practice.md` | 旧オーバーステイ実務 | prohibited |
| `knowledge_base/06_tax_180day_rule.md` | 旧税務解釈 | prohibited |
| `knowledge_base/07_bank_account_2026.md` | 旧銀行口座開設運用 | prohibited |

legacy資料の情報を復活させる場合は、項目ごとに一次情報と所有者確認を取得し、
新しい `owner_confirmed` ファイルとして追加する。

## Dependency map

```text
CRM public content API
  └─ dynamic DTV prices, application track record and availability

00_current_operations.md
  └─ current service and intake rules

07_bank_account_current.md
  └─ current DTV-holder bank support rules

official primary sources
  └─ visa law, eligibility, documents, review, tax and employment

scripts/build-knowledge.mjs
  └─ owner-confirmed allowlist
      └─ lib/concierge/knowledge.ts
          └─ AI concierge

structured public-data modules
  └─ public-content.ts / dtv-authority.ts / pricing.ts
      └─ system-prompt.ts
```

## Change checklist

- Confirm whether the change belongs in CRM, owner-confirmed knowledge, or a legacy archive.
- Record the primary source URL and verification date for government rules.
- Never copy an entire legacy file back into the runtime allowlist.
- Run `pnpm knowledge:build`.
- Run `pnpm test`, `pnpm typecheck`, and `pnpm build`.
- Update `CHANGELOG.md`.

## Revision history

| version | date | change |
|---|---|---|
| 2.0 | 2026-07-29 | Separated the two runtime sources from eight legacy / internal-only files |
| 1.0 | 2026-05-14 | Initial index |

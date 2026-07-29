---
title: WALC VISA knowledge-source operating rules
version: 2.0
updated: 2026-07-29
status: active
priority: critical
---

# WALC VISA knowledge-source operating rules

このディレクトリは、WALC VISAのAI回答と社内資料で使う情報を管理する。
過去資料に有用な履歴が残っていても、公開回答へ利用できるとは限らない。

## 1. 公開回答の正本

公開サイト、AIコンシェルジュ、営業文面、構造化データで使う情報は、次の順に確認する。

1. 料金・実績・受付状態などの動的情報
   CRM公開コンテンツAPIを唯一の正本とする。APIにない値は推測しない。
2. WALCの現行運用
   `knowledge_base/00_current_operations.md`
3. DTV取得者向け銀行口座開設サポート
   `knowledge_base/07_bank_account_current.md`
4. VISA制度・必要書類・審査・税務などの制度情報
   回答時点のタイ政府、BOI、タイ大使館・領事館などの一次情報で確認する。
   未確認の場合は断定せず、公式LINEまたは公式機関へ確認を案内する。

`scripts/build-knowledge.mjs` がAIランタイムへ組み込むのは、上記2つの
`owner_confirmed` ファイルだけである。ファイルを追加する場合は、
所有者確認、出典、確認日、回帰テストをそろえた別Issue・PRで審査する。

## 2. legacy / internal-only

次のファイルは履歴保存用の **legacy / internal-only** であり、
現在の公開情報、AI回答、価格、実績、推奨ロジックの根拠に使用してはならない。

- `knowledge_base/00_walc_principles.md`
- `knowledge_base/01_walc_company_info.md`
- `knowledge_base/02_pricing_master.md`
- `knowledge_base/03_thai_visa_glossary.md`
- `knowledge_base/04_immigration_practice.md`
- `knowledge_base/05_overstay_practice.md`
- `knowledge_base/06_tax_180day_rule.md`
- `knowledge_base/07_bank_account_2026.md`

これらには当時の営業方針、料金、成功率、処理期間、制度解釈が含まれる。
ファイル名やfrontmatterの `active` 表記だけで現行情報と判断しない。
再利用する場合は、項目ごとに一次情報と所有者確認を取り、新しい
`owner_confirmed` ファイルへ移す。legacyファイルを直接ランタイムへ戻さない。

## 3. 公開表現の禁止事項

- 取得、申請通過、面談通過、入国、銀行口座開設を保証しない。
- CRM公開コンテンツAPIにない成功率、件数、価格、期間を掲載しない。
- 過去の実績を現在または将来の結果として表現しない。
- 「必ず」「完全」「100%取得」「100%入国」などの保証表現を使わない。
- 出典と確認日がない制度変更を「最新」と断定しない。
- 国籍、職業、年齢などに対する差別的・断定的な説明を使わない。
- 顧客固有情報、内部審査ロジック、非公開料金を公開ナレッジへ入れない。

## 4. 変更手順

1. 変更対象が公開正本かlegacy資料かを確認する。
2. 動的な料金・実績はCRM公開コンテンツAPI側で更新する。
3. 制度情報は一次情報のURLと確認日を記録する。
4. 公開正本ファイルは `status: owner_confirmed` を必須とする。
5. `scripts/build-knowledge.mjs` のallowlistを変更する場合は、
   `tests/walc-content-consistency.test.ts` も同じPRで更新する。
6. `pnpm knowledge:build` 後、生成物にlegacy表現が混入していないことを確認する。
7. `pnpm test`、`pnpm typecheck`、`pnpm build` を実行する。
8. `CHANGELOG.md` に目的、変更、検証結果を追記する。

## 5. エスカレーション

次の変更は所有者確認なしで公開しない。

- 料金、割引、申請費用の包含範囲
- 成功率、実績件数、口コミ、処理期間
- 審査結果や入国結果を示唆する表現
- 銀行口座開設、資金要件、税務、就労可否
- 新しいVISA推奨ロジック
- legacy資料からの情報復活

不明な場合は、値を埋めずに `UNVERIFIED` としてIssueへ記録する。

## 改訂履歴

| version | date | change |
|---|---|---|
| 2.0 | 2026-07-29 | 公開正本をowner-confirmed allowlistへ限定し、旧8ファイルをlegacy / internal-onlyへ変更 |
| 1.0 | 2026-05-14 | 初版 |

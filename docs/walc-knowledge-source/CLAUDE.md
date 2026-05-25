# CLAUDE.md

> このファイルは Claude Code / Claude Cowork が本プロジェクトで作業する際に最初に読むべき命令書です。
> 全ての作業はこのファイルの指示に従ってください。

---

## プロジェクト概要

- **プロジェクト名**: WALC VISA Consulting 全事業マニュアル制作
- **発注者**: Yosuke Onodera (WALC VISA Consulting / WALC DESIGN Co., Ltd.)
- **目的**: WALC全11事業のマニュアルを統一されたデザイン・トーン・構造で制作
- **作業開始日**: 2026-05-14
- **現在のフェーズ**: Phase 1(基盤整備)

---

## 最優先ルール(絶対遵守)

### ルール1: WALC最重要営業方針を尊重

**全ての作業は `knowledge_base/00_walc_principles.md` を最上位原則として進めること。**

特に重要な原則:
- **DTV VISA を全顧客への第一推奨**として扱う
- 抱合せ販売・パッケージ提案は**勝手に作らない**
- 空港イミグレサポート等の付随サービスは**独立サービス**として扱う
- 推測で「便利だろう」というクロスセル提案を作らない

### ルール2: 単一の真実(Single Source of Truth)

ファイル間で同じ情報を重複して書かない。情報は**1箇所**にのみ記述し、他からは参照すること。

| 情報の種類 | 唯一の真実(SoT) |
|---|---|
| 価格 | `knowledge_base/02_pricing_master.md` |
| 会社情報・実績 | `knowledge_base/01_walc_company_info.md` |
| VISA種別の定義 | `knowledge_base/03_thai_visa_glossary.md` |
| イミグレ実務 | `knowledge_base/04_immigration_practice.md` |
| オーバーステイ | `knowledge_base/05_overstay_practice.md` |
| 税法・180日ルール | `knowledge_base/06_tax_180day_rule.md` |
| 銀行口座開設ルール | `knowledge_base/07_bank_account_2026.md` |
| 営業方針 | `knowledge_base/00_walc_principles.md` |

### ルール3: 推測で素材を追加しない

仕様書・知識ベースに記載されていない情報を**勝手に推測で追加しない**。
不明点は必ず Yosuke に確認してから進める。

### ルール4: バージョン管理

ファイルを編集した際は:
1. ファイル冒頭の frontmatter の `version` と `updated` を更新
2. ファイル末尾の改訂履歴に変更内容を追加
3. `CHANGELOG.md` にプロジェクト全体の変更を記録

### ルール5: 表現運用ルール厳守

機微情報の版別取扱を厳守:

| 表現 | 顧客向け | 契約者向け | 社内 |
|---|---|---|---|
| 「実際にジムに通う必要なし」 | ✗ | △ | ◯ |
| 「実際に宿泊不要」 | ✗ | △ | ◯ |
| 「90日レポート実質不要」 | △ | ◯ | ◯ |
| 「100%取得」 | △ ただし書き必須 | ◯ | ◯ |

---

## ファイル命名規則

| 種別 | 命名規則 | 例 |
|---|---|---|
| トップレベル | `UPPERCASE.md` | `README.md`, `CLAUDE.md`, `INDEX.md` |
| 知識ベース | `{番号2桁}_{snake_case}.md` | `00_walc_principles.md` |
| 仕様書 | `{番号2桁}_{snake_case}_spec.md` | `01_dtv_spec.md` |
| マニュアル本体 | `ch{番号2桁}_{snake_case}.html` | `ch01_dtv_overview.html` |

---

## Frontmatter 規約

すべてのMarkdownファイル(README/CHANGELOG除く)に YAML frontmatter を必須とする:

```yaml
---
file_id: knowledge_base/00_walc_principles
title: WALC最重要営業方針
type: knowledge_base       # knowledge_base | spec | manual_content
version: 1.1
updated: 2026-05-14
status: active             # active | draft | archived
priority: critical         # critical | high | medium | low
references:                # このファイルが参照する他ファイル
  - knowledge_base/02_pricing_master
referenced_from:           # このファイルを参照するファイル
  - knowledge_base/01_walc_company_info
  - spec/01_dtv_spec
when_to_use:               # エージェントがいつ参照すべきか
  - 顧客への提案方針を決定する時
  - 価格交渉・抱合せ提案の判断時
tags:
  - principles
  - sales
  - dtv_first
---
```

---

## 作業フロー(エージェント用)

### 新規ファイル作成時

```
1. CLAUDE.md(本ファイル)を読む
2. README.md でプロジェクト全体を把握
3. INDEX.md で関連ファイルを確認
4. 該当する knowledge_base ファイルを参照
5. frontmatter を含めてファイル作成
6. CHANGELOG.md に追加を記録
```

### 既存ファイル編集時

```
1. ファイル冒頭の frontmatter を確認
2. version をインクリメント(例: 1.0 → 1.1)
3. updated を最新日付に更新
4. 本文修正
5. ファイル末尾の改訂履歴に追記
6. CHANGELOG.md に変更を記録
7. 影響を受ける referenced_from の各ファイルを確認・更新
```

### マニュアルHTML生成時

```
1. spec/{事業}_spec.md を読む
2. knowledge_base/ から関連ファイルを全て読み込む
3. CLAUDE.md のルール5(表現運用)を必ず適用
4. 該当する版(顧客向け/契約者向け/社内オペ)に応じた表現を選択
5. shared/styles/ の CSS を使用して HTML 生成
6. content/{事業}/ch{番号}_{名前}.html として保存
```

---

## エージェント別の使い分け

### Cowork で作業する場合

- ブラウザ環境で実行
- HTMLマニュアル生成・プレビューに最適
- frontmatter は YAML として解釈
- 1ファイル単位でレビュー → 修正のループが推奨

### Claude Code で作業する場合

- ターミナル環境で実行
- 複数ファイル横断検索・編集に最適
- frontmatter の `references` フィールドで依存関係を辿る
- 一括バージョン更新等のスクリプト処理に強い

### ハイブリッド運用(推奨)

```
[戦略設計・素材整理] → 通常Claude(本会話)
       ↓
[仕様書・知識ベース更新] → Claude Code
       ↓
[マニュアルHTML生成] → Claude Cowork
       ↓
[最終確認・配布] → Yosuke
```

---

## 禁止事項

```
✗ 推測でパッケージ・セット価格を作成
✗ 抱合せ販売の提案
✗ 仕様書にない情報の追加
✗ 機微情報を顧客向け版に記載
✗ 単一の真実(SoT)以外の場所に価格・会社情報を記述
✗ バージョン番号・改訂履歴の更新忘れ
✗ frontmatter なしでファイル作成
✗ CLAUDE.md の指示を無視した独自判断
✗ Yosuke未確認の制度情報を「最新」として記載
```

---

## エスカレーション基準

以下の場合は作業を停止し、Yosuke に確認を求める:

```
1. 仕様書に記載のない事象・要件が出てきた
2. 機微情報の版別取扱に迷う
3. 価格・実績数値が古い可能性がある
4. 顧客固有情報の取扱に迷う
5. 法的・コンプライアンス的に判断に迷う
6. ファイル削除・大規模リファクタが必要
```

---

## 関連ファイル

| ファイル | 役割 |
|---|---|
| `README.md` | プロジェクト全体概要 |
| `INDEX.md` | 全ファイル索引・参照関係マップ |
| `CHANGELOG.md` | プロジェクト全体の改訂履歴 |
| `00_master_spec.md` | 全事業マスター仕様書 |
| `knowledge_base/*.md` | 共通知識リポジトリ(8ファイル) |
| `spec/*.md` | 事業別仕様書 |

---

## バージョン

- **CLAUDE.md version**: 1.0
- **最終更新**: 2026-05-14
- **更新者**: Yosuke Onodera

---

**このファイルの指示に従って作業すること。**
**疑問点は推測せず、必ず確認を求めること。**

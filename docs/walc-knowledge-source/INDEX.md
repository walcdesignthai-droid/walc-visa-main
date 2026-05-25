# INDEX — 全ファイル索引・参照関係マップ

> プロジェクト内の全ファイルとその役割・参照関係を一覧化したもの。
> 新しいファイルを追加・編集する際は、本ファイルも必ず更新すること。

---

## 全ファイル一覧

### トップレベル(4ファイル)

| ファイル | 役割 | 必読度 |
|---|---|---|
| `CLAUDE.md` | エージェント命令書 | ⭐⭐⭐ 必須 |
| `README.md` | プロジェクト概要 | ⭐⭐⭐ 必須 |
| `INDEX.md` | 全ファイル索引(本ファイル) | ⭐⭐ 推奨 |
| `CHANGELOG.md` | プロジェクト全体改訂履歴 | ⭐ 任意 |
| `00_master_spec.md` | 全事業マスター仕様書 | ⭐⭐⭐ 必須 |

### knowledge_base/(8ファイル・共通知識リポジトリ)

| ファイル | 役割 | 重要度 |
|---|---|---|
| `00_walc_principles.md` | WALC最重要営業方針 | ⭐⭐⭐ 最上位原則 |
| `01_walc_company_info.md` | 会社情報・実績データ | ⭐⭐⭐ |
| `02_pricing_master.md` | 全事業価格マスター | ⭐⭐⭐ |
| `03_thai_visa_glossary.md` | タイVISA全種別辞書 | ⭐⭐⭐ |
| `04_immigration_practice.md` | イミグレ入国実務 | ⭐⭐ |
| `05_overstay_practice.md` | オーバーステイ実務 | ⭐⭐ |
| `06_tax_180day_rule.md` | 税法・180日ルール | ⭐⭐ |
| `07_bank_account_2026.md` | 2026/4 口座開設変更 | ⭐⭐⭐ |

### spec/(事業別仕様書)

| ファイル | 役割 | ステータス |
|---|---|---|
| `01_dtv_spec.md` | DTV専用仕様書 | ✅ 完成 |
| `02_airport_support_spec.md` | 空港サポート仕様書 | ⏳ Phase 2で作成 |
| `03_retirement_visa_spec.md` | リタイア仕様書 | ⏳ Phase 2で作成 |
| `04_thailand_privilege_spec.md` | エリート仕様書 | ⏳ Phase 3で作成 |
| `05_ltr_visa_spec.md` | LTR仕様書 | ⏳ Phase 3で作成 |
| `06_overstay_spec.md` | オーバーステイ仕様書 | ⏳ Phase 2で作成 |
| `07_visarun_spec.md` | ビザラン仕様書 | ⏳ Phase 3で作成 |
| `08_non_b_spec.md` | NON-B仕様書 | ⏳ Phase 4で作成 |
| `09_marriage_family_spec.md` | 結婚・家族VISA仕様書 | ⏳ Phase 4で作成 |
| `10_company_registration_spec.md` | 会社登記仕様書 | ⏳ Phase 4で作成 |

---

## 参照関係マップ(依存関係)

### knowledge_base 内の依存

```
                  00_walc_principles
                  (最上位・全てが参照)
                          │
        ┌─────────┬───────┴──────┬────────────────┐
        ▼         ▼              ▼                ▼
   01_walc_   02_pricing_   03_thai_visa_    07_bank_account_
   company    master        glossary         2026
        │                        │                 │
        │         ┌──────────────┼─────────────────┤
        ▼         ▼              ▼                 ▼
   全マニュアル   06_tax_180day   04_immigration   全マニュアル
                                  │
                                  ▼
                                  05_overstay
```

### spec → knowledge_base の依存

各仕様書は以下の knowledge_base ファイルを必ず参照する:

| 仕様書 | 必須参照 |
|---|---|
| `01_dtv_spec.md` | 00 / 01 / 02 / 03 / 04 / 06 / 07 |
| `02_airport_support_spec.md` | 00 / 01 / 02 / 04 / 05 |
| `03_retirement_visa_spec.md` | 00 / 01 / 02 / 03 / 06 / 07 |
| `04_thailand_privilege_spec.md` | 00 / 01 / 02 / 03 / 06 / 07 |
| `05_ltr_visa_spec.md` | 00 / 01 / 02 / 03 / 06 / 07 |
| `06_overstay_spec.md` | 00 / 01 / 02 / 04 / 05 |
| `07_visarun_spec.md` | 00 / 01 / 02 / 04 |
| `08_non_b_spec.md` | 00 / 01 / 02 / 03 / 06 / 07 |
| `09_marriage_family_spec.md` | 00 / 01 / 02 / 03 |
| `10_company_registration_spec.md` | 00 / 01 / 02 |

---

## ファイル別のユースケース早見表

### 「価格を確認したい」

→ `knowledge_base/02_pricing_master.md`

### 「DTV vs エリートを比較したい」

→ `knowledge_base/00_walc_principles.md` §3 + `knowledge_base/03_thai_visa_glossary.md`

### 「顧客に最適なVISAを提案したい」

→ `knowledge_base/03_thai_visa_glossary.md` §8(顧客像→最適VISA早見表)

### 「銀行口座開設について顧客に説明したい」

→ `knowledge_base/07_bank_account_2026.md`

### 「税務・居住者判定の質問が来た」

→ `knowledge_base/06_tax_180day_rule.md`

### 「ノービザ・ビザランのリスク評価」

→ `knowledge_base/04_immigration_practice.md`

### 「オーバーステイ顧客への対応」

→ `knowledge_base/05_overstay_practice.md`

### 「WALCの強み・実績を訴求したい」

→ `knowledge_base/01_walc_company_info.md`

### 「DTVマニュアルを生成したい」

→ `spec/01_dtv_spec.md` + 上記knowledge_base全て

---

## 変更時の影響範囲(チェックリスト)

### 価格が変わった場合

```
☐ knowledge_base/02_pricing_master.md を更新
☐ 影響を受ける knowledge_base ファイル確認
   - 00_walc_principles.md(DTV vs エリート比較)
   - 07_bank_account_2026.md(リタイア訴求の数値)
☐ 影響を受ける spec ファイル確認(該当事業の§3)
☐ 既存マニュアルHTML の Ch.3 を再生成
☐ CHANGELOG.md に記録
```

### 制度変更があった場合

```
☐ 該当 knowledge_base ファイルを更新
☐ 影響を受ける全 spec ファイルを確認
☐ 全マニュアルの Ch.12「最新制度情報」を更新
☐ CHANGELOG.md に記録
```

### WALC会社情報・実績が変わった場合

```
☐ knowledge_base/01_walc_company_info.md を更新
☐ 全マニュアルの Ch.9「WALC強み」を再生成
☐ CHANGELOG.md に記録
```

---

## 制作優先順序(現行)

```
[完成済み]
   ✅ CLAUDE.md
   ✅ README.md
   ✅ INDEX.md(本ファイル)
   ✅ 00_master_spec.md
   ✅ knowledge_base/00 - 07(8ファイル)
   ✅ spec/01_dtv_spec.md

[次に作成]
   ⏳ CHANGELOG.md
   ⏳ shared/styles/ (CSS整備)
   ⏳ DTVマニュアル HTML(3版)
   ⏳ spec/02_airport_support_spec.md

[Phase 2]
   ⏳ spec/03_retirement_visa_spec.md
   ⏳ spec/06_overstay_spec.md

[Phase 3以降]
   spec/04, 05, 07 - 10 を順次
```

---

## ファイル命名規則(再掲)

| 種別 | パターン | 例 |
|---|---|---|
| トップレベル | `UPPERCASE.md` | `README.md`, `CLAUDE.md` |
| マスター仕様 | `{2桁}_master_spec.md` | `00_master_spec.md` |
| 知識ベース | `{2桁}_{snake_case}.md` | `00_walc_principles.md` |
| 事業別仕様 | `{2桁}_{snake_case}_spec.md` | `01_dtv_spec.md` |
| マニュアル本体 | `ch{2桁}_{snake_case}.html` | `ch01_dtv_overview.html` |

---

## バージョン

- **INDEX.md version**: 1.0
- **最終更新**: 2026-05-14
- **次回更新**: ファイル追加・削除時に必須更新

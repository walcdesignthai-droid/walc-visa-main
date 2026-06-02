# WALC VISA Regulation Updates Log

> Daily-scan による制度変更検知ログ.
> 自動生成: scheduled-task `walc-regulation-watch`
> 採用基準: 公式ソース (boi.go.th / immigration.go.th / mfa.go.th) または主要メディア複数引用で確認できたもののみ.
> 推測ゼロ (RULE-NO-SPECULATION 準拠).

---

## 2026-05-29 検知

**変更内容**: タイ閣議が 60 日ビザ免除を廃止し 30 日ビザ免除へ復元する決定 (2026/5/19 閣議決定)

**影響範囲**: 観光カテゴリ全般 (Visa Exemption / 通称 w30・w60 / 日本パスポート保持者の短期入国運用)
- 日本人は新制度で「30 日ビザ免除」枠へ移行
- 中国は二国間協定で 30 日、韓国は二国間協定で 90 日に再編
- 4 系統 (30 日免除 / 15 日免除 / VoA / 二国間協定) への再編
- 観光目的限定・タイ国内で 30 日 1 回延長可

**実施時期**: 官報掲載 15 日後に発効 (現時点で公布日未確定 / 早ければ 2026/6 中)

**出典**:
- 日本経済新聞 (2026/5/20): https://www.nikkei.com/article/DGXZQOCC203E50Q6A520C2000000/
- Al Jazeera (2026/5/19): https://www.aljazeera.com/news/2026/5/19/thailand-to-slash-tourist-visa-free-stays
- Nation Thailand: https://www.nationthailand.com/news/tourism/40066494
- タイランドハイパーリンクス (2026/5/20): https://www.thaich.net/news/20260520nn.htm
- アジアトラベルノート (2026/5/19): https://www.asiatravelnote.com/2026/05/19/thailand_cuts_visa_free_stay_may_2026.php
- VisasNews: https://visasnews.com/en/thailand-cabinet-approves-end-of-60-day-visa-free-entry-for-93-countries/

**現状の WALC ファクト (陳腐化済)**:
- `lib/concierge/knowledge.ts` 行 1551 / 1561-1564 / 1915 / 1923-1924 / 2203 で「60 日のまま / フェイクニュース注意」と記述
- 上記は 2026/5/19 閣議決定により事実と矛盾

**WALC 推奨対応**:

1. **knowledge.ts 更新 (P0)**
   - knowledge_base/03_thai_visa_glossary §3-4 の「現在 60 日許可」「フェイクニュース注意」記述を削除
   - 代わりに「2026/5/19 閣議決定により 30 日に短縮確定 / 官報掲載 15 日後施行 / 日本人は 30 日免除枠」へ書き換え
   - knowledge_base §1-2 ノービザ運用テンプレ (行 1911-1924 / 2200-2204) の 60 日表現を全て更新

2. **営業方針への影響 (P0)**
   - DTV 第一推奨方針は **強化方向** (短期ビザ縮小 → 長期ビザ需要増)
   - 「ノービザ運用で十分」と判断していた既存顧客へ DTV 提案再アプローチの好機

3. **顧客向け告知 (P1)**
   - LINE 自動応答メッセージの「現在 60 日ノービザ」表現を一斉点検 (P0)
   - LP / walc-visa.online の同表現を点検
   - リッチメニュー「最新情報」に告知文配信 (案文):
     > 🚨 タイ Immigration 制度変更速報
     > 2026/5/19 閣議決定でノービザ 60 日が 30 日に短縮決定。
     > 短期渡航での頻繁な往復はリスク増。長期滞在をご希望なら
     > DTV (5 年マルチプル) を強く推奨します。詳細は無料相談へ。

4. **チェック項目 (P2)**
   - 官報公布日の確定タイミングを次回 watch でフォロー
   - 実施日確定後、knowledge.ts 該当箇所に施行日を追記

---

## 2026-05-29 補足 (同日 2 回目検知 / 追加詳細のみ)

**概要**: 同日早朝の検知 (60→30 日ビザ免除廃止) と同じ閣議決定について TAT Newsroom (公式) + Bangkok Post で詳細内訳が公表されたため追記.

**新規ファクト**:
- 30 日ビザ免除 = **54 カ国**対象 (日本含む)
- 15 日ビザ免除 = **3 カ国**新設 (Seychelles / Maldives / Mauritius)
- Visa on Arrival (VoA) = 31 カ国 → **4 カ国に縮小** (Belarus / Serbia / India / Azerbaijan)
- 設計原則: "One country, one Thai visa exemption privilege"
- 閣議承認の正確な日付 = **2026-05-19** (前回検知と一致 / 公布は 2026-05-21 時点で未済)

**追加出典**:
- TAT Newsroom (公式 / 2026-05-21): https://www.tatnews.org/2026/05/thai-cabinet-approves-revision-of-60-day-visa-exemption-scheme-pending-royal-gazette-publication/
- Bangkok Post: https://www.bangkokpost.com/business/general/3257580/thailand-ends-60day-visafree-stay
- Asia News Network: https://asianews.network/thailand-updates-visa-free-rules-after-scrapping-60-day-scheme/

**WALC 推奨対応への影響**: 既存 P0/P1/P2 アクションに変更なし. knowledge.ts 更新時に「54 カ国 30 日 / 3 カ国 15 日 / VoA 4 カ国」の内訳も併記すること.

---

## 2026-05-29 検証ログ (新規変更なし / 他カテゴリ)

| カテゴリ | 検証結果 | 出典 |
|---|---|---|
| DTV | 変更なし (5 年マルチ / 180 日 / 500k THB 残高 / オンライン申請 維持) | thaiembassy.com / phuketcommunity.com / taxesforexpats.com |
| DTV (補足) | 「語学学校で DTV 申請」は明示的に不可化 (時期不明・既知 fact / WALC 既存方針と整合) | thaitimes.com |
| LTR | 変更なし (BOI Por. 3/2568 = 2025-02-04 の WGC 緩和は既知 / 2026 新規変更なし) | siam-legal.com / hlbthai.com / boi.go.th |
| Thailand Privilege Bronze | 変更なし (2026-09-30 まで 650,000 THB / pricing.ts と一致) | natlawreview.com / thailandelitevisas.com |
| NON-O Retirement | 変更なし (50 歳以上 / 80 万 THB / 1 年更新 維持) | longstay-thailand.com / thailand-ijyunavi.com |
| 学生 VISA (NON-ED) | 変更なし | (本検索で新規 source なし) |

---

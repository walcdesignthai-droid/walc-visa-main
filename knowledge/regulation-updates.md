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

## 2026-06-28 検知

**変更内容**: BOI が LTR ビザ「高度技能専門職 (Highly-Skilled Professional / HSP)」カテゴリの **対象産業 (targeted industries) 区分を改定し、より広く包括的な定義へ拡大** (実質的な対象要件の緩和・拡大)。BOI 公式サイト掲載済。

**影響範囲**: LTR (HSP カテゴリのみ)
- 従来は狭く専門特化した産業区分 → 改定後はより広い産業分類へ。対象となる産業・企業の範囲が拡大。
- **据置 (変更なし)**: HSP の中核要件は不変 — 個人所得 USD 80,000/年・17% フラット課税・10 年滞在・保険 USD 50,000 (or 預金 USD 100,000)。今回拡大したのは「どの産業が対象か」の範囲のみ。
- **既知分との区別**: 2026-05-29 ログ記載の Por 3/2568 (2025-02-04 / WGC 所得要件撤廃・HSP/WFTP の職歴要件撤廃) とは**別件**。また 2023-03-16 改定 (HSP 15 産業化) の更新版にあたる。前回 watch (2026-05-29) は「LTR 2026 新規変更なし」と記録 → 本件は未ログの新規検知。

**出典**:
- KPMG Thailand Tax News Flash Issue 158 (2026-05 / 公式 BOI サイト更新を引用): https://kpmg.com/th/en/insights/2026/05/th-tax-news-flash-issue-158.html
- KPMG Global GMS Flash Alert 2026-148: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-148.html
- BOI 公式 (LTR 対象産業): https://ltr.boi.go.th/page/targeted-industries.html
- (参考・2023 歴史的経緯) Bangkok Post: https://www.bangkokpost.com/business/investment/2653779/boi-expands-ltr-visa-opportunities-for-highly-skilled-professionals

**WALC 推奨対応**:

1. **knowledge.ts 軽微更新 (P2)**
   - knowledge_base の LTR / HSP 記述に「2026-05 BOI 改定で HSP 対象産業の区分が拡大 (より広い産業定義へ)。中核要件 (USD 80k・17%・10 年) は不変」を一文追記。
   - pricing.ts は**変更不要** (料金・カテゴリ・17% フラットいずれも不変)。
   - ※ 直接編集は本タスク範囲外。Code への spec / handoff で反映。

2. **営業方針への影響 (P3 / 小)**
   - DTV 第一推奨は**不変**。LTR は引き続き「該当者のみ・専門スタッフ転送」。
   - わずかに追い風: これまで産業区分で外れていた専門職 (AI・金融・マーケ等の周辺含む) が HSP 対象に入りうる → 高所得・税優遇志向の見込み客で LTR 提案余地が広がる。
   - 顧客告知は不要レベル (中核要件・料金不変のため)。Owner 承認後に必要なら個別案内のみ。

3. **確認事項 (P3)**
   - 拡大後の正確な産業リスト確定は BOI 公式 (ltr.boi.go.th) を一次ソースとし、LTR 案件発生時に都度照合。

---

## 2026-06-28 検証ログ (他カテゴリ — 新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **状況不変** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未確定 / 掲載 15 日後施行 / それまで 60 日継続)。前回 2026-05-29 から進展なし → 継続監視 | tatnews.org / siam-legal.com |
| DTV | 変更なし (5 年マルチ / 180 日 / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須 / 語学学校除外 — いずれも既知)。料金 (ソフトパワー60k/ノマド45k/フリー48k) 不変 | thaiembassy.com / thethaiger.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB / 2026-09-30 まで延長・pricing.ts と一致 / 5 ティア不変) | natlawreview.com / thailandelite.net |
| NON-O リタイア | 変更なし (50 歳以上 / 80 万 THB / 1 年更新 / 2019-03-01 預金ルール不変)。「制度の枠組みに大きな変更なし」 (JP ソース複数) | longstay-thailand.com / 在チェンマイ日本国総領事館 |
| 学生 VISA (NON-ED) | 実質変更なし。"ED Plus" (大学学位課程・卒業後 1 年就活延長) を確認するも**新規 2026 変更とは断定不可** (時期不明・2024 改革期の既存枠の可能性大)。WALC は学生ビザ非推奨のため影響軽微 → 今回は未ログ扱い | thaiembassyjakarta.com (公式) / roedl.com |
| TDAC (入国カード) | 既知 (2025-05-01 TM6 廃止 →TDAC 必須 / 全ビザ・全入国で要登録)。新規変更なし | tdac.immigration.go.th (公式) |

**総括**: 今回の新規検知は **LTR HSP 対象産業拡大 (1 件)** のみ。料金 (pricing.ts) に影響する変更はゼロ。ノービザ 30 日化は依然「官報待ち」で発効せず、継続フォロー対象。

---

## 2026-06-29 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。Owner 通知なし (変更なし扱い)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定 / 掲載 15 日後施行 / それまで 60 日が国境で有効)。前回 06-28 から変化なし → 継続監視 | tatnews.org / EY globaltaxnews (2026-1194) / siam-legal.com |
| LTR / HSP | **既ログ** (06-28 検知の BOI HSP 対象産業拡大と同一 = KPMG Flash Alert 2026-148)。Por 3/2568 の WGC 所得要件撤廃・HSP/WFTP 職歴要件撤廃も 05-29 で既知。新規変更なし | kpmg.com (2026-148) / ltr.boi.go.th |
| DTV | 変更なし (5 年マルチ / 180 日 / 残高 500k・3 ヶ月シーズニング / e-Visa)。料金 (ソフトパワー60k/ノマド45k/フリー48k) 不変。二次ソースの「対象カテゴリ拡大 (startup/研究者 new for 2026)」は公式未確認 → 推測ゼロ原則で未ログ | thaiembassy.com / siam-legal.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB / 2026-09-30 まで延長 / 5 ティア = pricing.ts と完全一致) | thailandelite.net / natlawreview.com |
| NON-O リタイア | 変更なし (50 歳以上 / 80 万 THB / 3 ヶ月維持 / 1 年更新 / 2019-03-01 預金ルール)。枠組み変更なし・実務運用の厳格化のみ | longstay-thailand.com / 在チェンマイ日本国総領事館 |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**新規・継続監視フラグ (未発効 / 要追跡)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。次回 watch で公布有無を最優先確認。
2. **LTR 扶養家族枠の拡大 (NEW)** — BOI 改定で扶養家族に「親・全法定扶養者・人数無制限」を含める方向。ただし **内務省 (Ministry of Interior) の追加告示で発効** = 現時点未発効。発効すれば `pricing.ts` 行 243「扶養家族追加 (最大 4 名)」の上限記述に影響しうる。発効まではログ化せず継続監視 (KPMG GMS Flash Alert 2026-148 / 推測ゼロ)。

---

## 2026-06-30 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定 = late June 2026 時点で未発効・60 日が国境で有効)。前回 06-29 から変化なし → 継続監視。VoA は 31→4 カ国 (Azerbaijan/Belarus/Serbia/India) も発効待ち | tatnews.org / EY globaltaxnews (2026-1194) / siam-legal.com / thethaiger.com |
| DTV | 変更なし (5 年マルチ / 180 日 / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須 / 語学学校除外 / 居住証明要件 — いずれも既知)。料金 (ソフトパワー60k/ノマド45k/フリー48k) 不変。所得要件は Option A 残高 500k / B 月収 50k×6ヶ月 / C 併用 (既知の運用) | thaiembassy.com / siam-legal.com / thai-visa-services.com |
| LTR / HSP | **既ログ** (06-28 検知の BOI HSP 対象産業拡大 = KPMG 2026-148 と同一)。Por 3/2568 (WGC 所得要件撤廃・HSP/WFTP 職歴要件撤廃) も既知。中核要件 (USD 1M 資産・USD 500k 投資・10 年・保険) 不変。新規変更なし | kpmg.com (2026-148) / ltr.boi.go.th / hlbthai.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB / 2026-09-30 まで延長 / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致) | thailandelite.net / natlawreview.com / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 80 万 THB / 更新前3ヶ月維持→更新後3ヶ月80万→以降6ヶ月40万 の 2019 預金ルール / 1 年更新)。「制度の枠組みに大きな変更なし」(JP ソース複数)・実務運用の厳格化のみ | longstay-thailand.com / thailand-ijyunavi.com / 在チェンマイ日本国総領事館 |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 06-29 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。次回 watch で公布有無を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省告示待ち = 現時点未発効。現行は配偶者 + 20 歳未満の子のみ・上限 4 名が有効。発効すれば pricing.ts 行 243「最大 4 名」に影響しうる。継続監視。

**補足**: The Nation Thailand の "Immigration Bureau / 2026-06-06 government policy" 言及 (Facebook) を確認したが、内容は上記ノービザ政策再編の文脈で本文非公開・新規の発効済み変更とは断定不可 → 推測ゼロ原則で未ログ。

---

## 2026-07-01 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定 = late June 2026 時点で複数ソースが「国境では依然 60 日スタンプを発給」と明記)。前回 06-30 から変化なし → 継続監視 (最重要)。発効は官報公布の 15 日後。詳細は内務省 3 告示で公布予定 | tatnews.org / siam-legal.com / EY globaltaxnews 2026-1194 / thethaiger.com |
| DTV | 変更なし (5 年マルチ / 180 日 / 残高 500k THB or 月収 50k×6ヶ月 or 併用・3 ヶ月シーズニング / e-Visa 必須)。料金 (ソフトパワー60k/ノマド45k/フリー48k) 不変。**注**: 二次ソースが「将来の改定案 = 滞在期間別ティア料金・Digital ID 連携・扶養家族枠拡大・限定的フリーランス就労」に言及するが、いずれも *signaled/discussed* で**未発効・公式未確認** → 推測ゼロ原則で未ログ (新規監視メモ) | thaiembassy.com / thai-visa-services.com / siam-legal.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大は 06-28 既ログ (KPMG 2026-148)。扶養家族枠拡大 (親+全法定扶養者・上限撤廃 = Por 3/2568) は依然 **内務省規則待ち・未発効** (現行は配偶者+20歳未満の子・上限 4 名 / 同性婚は扶養対象として認定済)。中核要件不変 | ltr.boi.go.th / emerhub.com / kpmg.com (2026-148) |
| Thailand Privilege | 変更なし (Bronze 650,000 THB / 2026-09-30 まで延長 / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致) | thailandelite.net / natlawreview.com / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 80 万 THB・3 ヶ月維持 / 1 年更新 / 2019 預金ルール)。「制度の枠組みに大きな変更なし」(JP 複数) ・実務運用の厳格化のみ。※健康保険必須は NON-**OA** の話で WALC 取扱の NON-O とは別物・混同しない | longstay-thailand.com / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 06-30 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→4 カ国 (Azerbaijan/Belarus/Serbia/India) 発効待ち。次回 watch で公布有無を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省告示待ち = 現時点未発効。現行は配偶者+20 歳未満の子・上限 4 名が有効。発効すれば pricing.ts 行 243「最大 4 名」に影響しうる。継続監視。
3. **(新規メモ) DTV 将来改定案** — ティア料金 / Digital ID 連携 / 扶養枠拡大 / 限定フリーランス就労。二次ソースのみ・公式未確認・未発効。推測ゼロ原則でログ化せず監視のみ。

---

## 2026-07-04 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 注: 前回 regulation-watch = 2026-07-01。07-02 / 07-03 は未実行 (ログなし) → 本 07-04 run が 3 日分をキャッチアップ照合。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定 = early July 2026 時点で複数ソース + **JETRO (公式)** が「国境では依然 60 日が有効」と明記)。公布 15 日後施行・2026 年中施行見込み。前回 07-01 から変化なし → 継続監視 (最重要) | tatnews.org / siam-legal.com / jetro.go.jp (2026-06) / EY globaltaxnews 2026-1194 |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須・GPS/IP 判定 / 語学学校除外 / WP 不可)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。二次ソースの「対象カテゴリ拡大 (研究者 new for 2026)」「将来改定案」は公式未確認・推測ゼロ原則で未ログ | thaiembassy.com / thethaiger.com / siam-legal.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大は 06-28 既ログ (KPMG 2026-148 / Por 3/2568)。扶養家族枠拡大 (親+法定扶養者・上限撤廃) は依然 **内務省告示待ち・未発効** (現行 = 配偶者+20 歳未満の子・上限 4 名)。中核要件 (USD 80k 所得・17% フラット・10 年・保険) 不変 | ltr.boi.go.th / kpmg.com (2026-148) / hlbthai.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・2026-09-30 まで延長 / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致) | thailandelite.net / natlawreview.com / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 80 万 THB・2〜3 ヶ月シーズニング→維持 / 月収 65k 方式 / 1 年更新 / 2019 預金ルール)。JP 複数ソースが「制度の枠組みに大きな変更なし・実務審査の厳格化のみ」。※健康保険必須は NON-**OA** の話で WALC 取扱の NON-O とは別物・混同しない | longstay-thailand.com / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-01 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→4 カ国 (Azerbaijan/Belarus/Serbia/India) 発効待ち。次回 watch で公布有無を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省告示待ち = 現時点未発効。発効すれば pricing.ts 行 243「最大 4 名」に影響しうる。継続監視。
3. **(メモ) DTV 将来改定案** — ティア料金 / Digital ID / 扶養枠 / 限定フリーランス就労。二次ソースのみ・公式未確認・未発効。推測ゼロ原則でログ化せず監視のみ。

---

## 2026-07-05 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-04。本 07-05 run は直近 24h を照合 (連続実行・キャッチアップなし)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定)。**TAT 公式ページ (tatnews.org) を本日 07-05 実取得で確認 → 記事は「pending Royal Gazette publication」のまま・TAT の 7 月プレスリリースに公布フォローアップ記事なし = 未発効を実証**。60 日が国境で依然有効。前回 07-04 から変化なし → 継続監視 (最重要)。発効は 3 内務省告示の官報公布 15 日後 | tatnews.org (公式・07-05 実取得) / siam-legal.com / EY globaltaxnews 2026-1194 |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須・IP/GPS 判定 / 語学学校除外 / VISA fee 10k THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。二次ソースの「対象カテゴリ拡大 (startup/研究者 new for 2026)」は既知シグナル・公式確定の新規発効変更ではない → 推測ゼロ原則で未ログ | thaiembassy.com / thethaiger.com / thai-visa-services.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大は 06-28 既ログ (KPMG 2026-148 / Por 3/2568)。**扶養家族枠拡大 (親+全法定扶養者・上限撤廃) は依然 内務省 (Ministry of Interior) 施行規則待ち・未発効** (mid-2026 時点 "not yet officially in effect" を複数ソース明記 / 現行 = 配偶者+20 歳未満の子・上限 4 名)。中核要件 (USD 80k 所得・17% フラット・10 年・保険) 不変 | siam-legal.com / emerhub.com / hlbthai.com / ltr.boi.go.th |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・2026-09-30 まで延長 / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致)。09-30 期限後の価格保証なし・grandfather 条項は既知 | natlawreview.com / thailandelite.net / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB or 併用 80k / 更新後 40 万維持 / 1 年 / 2019 預金ルール)。枠組み変更なし。※二次ソースの「2026 銀行 KYC 強化」は運用側の話・スキーム変更ではない・詳細不完全 → 推測ゼロで未ログ。健康保険必須は NON-**OA** の別制度で混同しない | siam-legal.com / thaiembassy.com / thaiconsulatela.thaiembassy.org (公式) |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-04 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→4 カ国 (Azerbaijan/Belarus/Serbia/India) 発効待ち。次回 watch で公布有無を最優先確認 (最重要)。TAT が公式に「官報公布後に更新告知」と明言 → TAT/MFA の公布フォロー記事出現を次回シグナルとする。
2. **LTR 扶養家族枠の拡大** — 内務省告示待ち = 現時点未発効。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」の上限記述に影響しうる。継続監視。
3. **(メモ) DTV 将来改定案** — ティア料金 / Digital ID / 扶養枠 / 限定フリーランス就労。二次ソースのみ・公式未確認・未発効。推測ゼロ原則でログ化せず監視のみ。

**補足 (新規変更ではない参考メモ)**: TAT が「Thailand Immigration Management (THIM) app」を mid-June 2026 に導入 (TDAC 提出の効率化)。TDAC 必須化 (2025-05-01 TM6 廃止) は既知・全ビザ共通で、5 カテゴリの制度・料金に影響なし → ログ化不要。

---

## 2026-07-06 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-05。本 07-06 run は直近 24h を照合 (連続実行・キャッチアップなし)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定)。TAT 公式 (tatnews.org) は依然「pending Royal Gazette publication」・07-05 から公布フォロー記事の追加なし = 未発効継続。60 日が国境で依然有効。前回 07-05 から変化なし → 継続監視 (最重要)。発効は官報公布 15 日後 | tatnews.org (公式) / siam-legal.com / EY globaltaxnews 2026-1194 |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。二次ソースが「2026 運用厳格化: 500k シーズニング再徹底 (既知)・居住証明の明文化・語学学校をソフトパワー対象から除外→NON-ED 誘導・startup/研究者カテゴリ追加・e-Visa 60 カ国超対応」に言及するが、いずれも運用/文書化レベルまたは既知シグナルで**公式官報の新規発効変更ではない** → 推測ゼロ原則で未ログ。※語学学校除外は WALC のムエタイ (ソフトパワー) プランに影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大は 06-28 既ログ (KPMG 2026-148 / Por 3/2568)。**Por 3/2568 の緩和一式 (WGC の USD 80k 個人所得要件撤廃・HSP 実務経験要件撤廃・扶養枠を親+全法定扶養者に拡大し上限撤廃) は依然 内務省 (Ministry of Interior) + Immigration Bureau の施行規則待ちで未発効** (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・中核投資閾値は不変 | kpmg.com (2026-148) / zagdim.com / hlbthai.com / ltr.boi.go.th |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・2026-09-30 まで延長 / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致)。※二次ソースが "Next Member" 家族追加プロモ 750,000 THB/人 (Platinum/Diamond/Reserve のみ・2026-08-14 期限・Gold/Bronze 対象外) に言及するが、5 ティア中核価格の変更ではなく取次プロモ (agency blog) → pricing.ts 影響なし・監視メモのみ | natlawreview.com / thailandelite.net / thailand-elite.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB / 申請後 3 ヶ月維持→以降減額維持 / 1 年更新 / 2019 預金ルール)。JP 複数ソースが「制度の枠組みに大きな変更なし・審査/書類確認の厳格化のみ」。健康保険必須は NON-**OA** の別制度で混同しない | longstay-thailand.com / thaiconsulate-visa.jp / rumavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-05 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→4 カ国 (Azerbaijan/Belarus/Serbia/India) 発効待ち。次回 watch で TAT/MFA の公布フォロー記事出現を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省告示待ち = 現時点未発効。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」の上限記述に影響しうる。継続監視。
3. **(メモ) DTV 将来改定案** — ティア料金 / Digital ID / 扶養枠 / 限定フリーランス就労。二次ソースのみ・公式未確認・未発効。推測ゼロ原則でログ化せず監視のみ。

**補足 (既存の未処理 P0 メモ)**: knowledge.ts 行 1551/1561-1564 の「現在 60 日許可 / 変更情報はフェイクニュース」記述は 2026-05-29 検知で陳腐化フラグ済 (現在も国境は 60 日で数値自体は正だが「フェイクニュース」の枠組みは誤り)。官報公布の確定を待って一括修正が適切なため、本 run でも据え置き (新規検知ではない)。

---

## 2026-07-07 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-06。本 07-07 run は直近 24h を照合 (連続実行・キャッチアップなし)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定)。複数ソースが「as of 2 July 2026, 現行 60 日ビザ免除が依然有効 (remains in force)」と明記 = 未発効継続。前回 07-06 から変化なし → 継続監視 (最重要)。発効は官報公布 15 日後。30 日=54 カ国 (日本含む) / 15 日=3 領域 (Maldives/Mauritius/Seychelles) / VoA=4 カ国 (Azerbaijan/Belarus/India/Serbia) の内訳も不変 | tatnews.org (公式) / insubuy.com / EY globaltaxnews 2026-1194 / thailandinsiderguide.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。二次ソースの「2026 運用厳格化 (500k シーズニング再徹底・居住証明の明文化・語学学校をソフトパワー除外→NON-ED 誘導・startup/研究者カテゴリ追加・e-Visa 60 カ国超対応)」は 07-06 既ログの運用/文書化レベルで**公式官報の新規発効変更ではない** → 未ログ。※語学学校除外は WALC のムエタイ (ソフトパワー) プランに影響なし | thai-visa-services.com / thethaiger.com / thaiembassy.com |
| LTR / HSP + 扶養枠 | 変更なし。**本日の公式照合で Por 3/2568 の発効区分を精密化**: WGC の USD 80k 個人所得要件撤廃・HSP/WFTP の実務経験要件撤廃は **2025-02-04 に即日発効済** (>1 年前・既発効)。**未発効なのは「扶養家族枠の拡大 (親+全法定扶養者・上限撤廃)」のみ** = 内務省 + Immigration Bureau の施行規則待ち (現行 = 配偶者+20 歳未満の子・上限 4 名)。knowledge.ts 行 1622 は既に「年収 2025年2月に要件撤廃 (旧:80kUSD/年)」と**正しく反映済** = 陳腐化なし。10 年構造・保険・中核投資閾値 (資産 USD 1M・タイ投資 USD 500k) 不変 | kpmg.com (2026-148) / zagdim.com / lexology.com / ltr.boi.go.th |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・2026-09-30 まで延長 / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致)。Bronze は 2024-12 導入の期間限定ティア (常設ではない) を再確認。"Next Member" プロモ (07-06 メモ) は取次プロモで中核価格不変 | siam-legal.com / thailandelite.net / natlawreview.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB / 申請時 3 ヶ月維持→更新後 3 ヶ月 80 万→以降 6 ヶ月 40 万 の 2019-03-01 預金ルール / 1 年更新)。JP 複数ソースが「制度の枠組みに大きな変更なし・書類/審査の厳格化のみ」。健康保険必須は NON-**OA** の別制度で混同しない | 在チェンマイ日本国総領事館 (公式) / thailand-ijyunavi.com / thaiconsulate-visa.jp |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-06 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→4 カ国発効待ち。次回 watch で TAT/MFA の公布フォロー記事出現を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省 + Immigration Bureau 施行規則待ち = 現時点未発効。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」の上限記述に影響しうる。継続監視。
3. **(メモ) DTV 将来改定案** — ティア料金 / Digital ID / 扶養枠 / 限定フリーランス就労。二次ソースのみ・公式未確認・未発効。推測ゼロ原則でログ化せず監視のみ。

**精密化メモ (新規変更ではない)**: 07-06 ログは「Por 3/2568 の緩和一式が未発効」と一括表現していたが、本日の照合で **中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済 / 未発効は扶養枠拡大のみ** と区分が明確化。knowledge.ts は既に正 (行 1622) のため修正不要。

---

## 2026-07-08 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-07。本 07-08 run は直近 24h を照合 (連続実行・キャッチアップなし)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定)。複数ソース (EY globaltaxnews / insubuy / TAT 公式) が「as of 2 July 2026, 現行 60 日ビザ免除が依然有効 (remains in force)」と明記 = 未発効継続。前回 07-07 から変化なし → 継続監視 (最重要)。発効は官報公布 15 日後。30 日=54 カ国 (日本含む) / 15 日=3 領域 (Maldives/Mauritius/Seychelles) / VoA=4 カ国 (Azerbaijan/Belarus/India/Serbia) の内訳も不変 | tatnews.org (公式) / globaltaxnews.ey.com 2026-1194 / insubuy.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。二次ソースの「2026 運用厳格化 (500k シーズニング再徹底・語学学校をソフトパワー除外→NON-ED 誘導・タイ国内申請 auto-reject・陸路 2 回/年 上限)」は既ログの運用レベルで**公式官報の新規発効変更ではない** → 未ログ。※語学学校除外は WALC のムエタイ (ソフトパワー) プランに影響なし | thai-visa-services.com / thethaiger.com / thaiembassy.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大は 06-28 既ログ (KPMG 2026-148 / Por 3/2568)。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済 (既ログ)。**未発効は扶養家族枠拡大 (親+全法定扶養者・上限撤廃) のみ = 内務省 + Immigration Bureau 施行規則待ち** (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・中核投資閾値 (資産 USD 1M・タイ投資 USD 500k) 不変 | kpmg.com (2026-148) / zagdim.com / ltr.boi.go.th / hlbthai.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・2026-09-30 まで延長 / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致)。**(新規監視メモ)** 50,000 THB のメンバーシップ申請手数料 (membership application fee) が全申請で一時免除中との二次ソース言及 — ただし WALC pricing.ts はティア政府費のみ計上し申請手数料を別掲していない + 一時プロモにつき **pricing.ts 影響なし・未ログ**。"Next Member" 家族プロモも取次プロモで中核価格不変 | siam-legal.com / thailandelitevisas.com / thailandprivilege.co.th |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB or 併用 / 申請時 3 ヶ月維持→更新後の減額維持 / 1 年更新 / 2019-03-01 預金ルール)。JP 複数ソースが「制度の枠組みに大きな変更なし・審査/書類確認の厳格化のみ」。健康保険必須は NON-**OA** の別制度で混同しない | longstay-thailand.com / thaiconsulate-visa.jp / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。ED Plus (大学課程・卒業後 1 年就活延長) / TDAC / 学生ビザ濫用対策 5 措置はいずれも 2025 既知・新規 2026 発効変更ではない | thaiembassyjakarta.com (公式) / thaievisa.go.th (公式) |

**継続監視フラグ (未発効 / 要追跡 — 07-07 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→4 カ国 (Azerbaijan/Belarus/India/Serbia) 発効待ち。次回 watch で TAT/MFA の公布フォロー記事出現を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省 + Immigration Bureau 施行規則待ち = 現時点未発効。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」の上限記述に影響しうる。継続監視。
3. **(メモ) DTV 将来改定案** — ティア料金 / Digital ID / 扶養枠 / 限定フリーランス就労。二次ソースのみ・公式未確認・未発効。推測ゼロ原則でログ化せず監視のみ。
4. **(新規メモ) Thailand Privilege 50k 申請手数料の一時免除** — 二次ソース (agency / 公式サイト)。一時プロモ・WALC pricing.ts 非計上項目のため影響なし。恒久化や WALC 取次原価への波及があれば再評価。

---

## 2026-07-10 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-08 (2026-07-09 は未実行/未ログ)。本 07-10 run は直近を照合 (公式・準公式優先)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05 閣議決定・承認のまま / **官報未掲載**・公布日未設定)。複数ソース (TAT 公式 / EY taxnews / thailandinsiderguide) が「as of 2 July 2026, 現行 60 日ビザ免除が依然有効・国境で 60 日スタンプ継続」と明記 = 未発効継続。前回 07-08 から変化なし → 継続監視 (最重要)。発効は官報公布 15 日後。30 日=54 カ国 (日本含む) / 15 日=3 領域 / VoA=限定国の内訳も不変 | tatnews.org (公式) / taxnews.ey.com 2026-1194 / thailandinsiderguide.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング or 月収 50k×6 ヶ月 or 併用 / e-Visa 必須)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。二次ソースの「2026 運用厳格化 (500k シーズニング再徹底・居住証明明文化・語学学校をソフトパワー除外→NON-ED 誘導)」は既ログの運用レベルで**公式官報の新規発効変更ではない** → 未ログ。ムエタイ (registered camp) は引き続き有効カテゴリと明記 = WALC ソフトパワープランに影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大は 06-28 既ログ (KPMG 2026-148 / Por 3/2568)。中核要件緩和 (WGC の USD 80k 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済 (既ログ)。**未発効は扶養家族枠拡大 (親+全法定扶養者・上限撤廃) のみ = 内務省 + Immigration Bureau 施行規則待ち** (2026-03 時点 pending)。10 年構造・保険・中核投資閾値 (資産 USD 1M・タイ投資 USD 500k) 不変 | kpmg.com (2026-148) / zagdim.com / hlbthai.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・2026-09-30 まで / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致)。50k 申請手数料の一時免除は 07-08 既メモ (継続)。家族追加プロモは 750,000 THB/人 (Platinum/Diamond/Reserve・2026-08-14 期限) — 取次プロモで中核ティア価格不変・pricing.ts 非計上のため影響なし | thailandelite.net / siam-legal.com / superagent.co |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB or 併用 / 申請前 2-3 ヶ月+申請後 3 ヶ月維持→以降減額維持 / 1 年更新 / 2019 預金ルール)。JP 複数ソースが「制度の枠組みに大きな変更なし・審査/書類の厳格化のみ」。健康保険必須は NON-**OA** の別制度で混同しない | 在チェンマイ日本国総領事館 (公式) / thaiconsulate-visa.jp / rumavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-08 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→限定国発効待ち。次回 watch で TAT/MFA の公布フォロー記事出現を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省 + Immigration Bureau 施行規則待ち = 現時点未発効。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」の上限記述に影響しうる。継続監視。
3. **(メモ) DTV 将来改定案** — ティア料金 / Digital ID / 扶養枠 / WP 統合。ThaiEmbassy.com が "signaled further refinements throughout 2026" と明記するが、いずれも公式官報未発効のシグナルのみ → 推測ゼロ原則でログ化せず監視のみ。
4. **(メモ) Thailand Privilege 50k 申請手数料の一時免除** — 二次ソース。一時プロモ・pricing.ts 非計上のため影響なし。恒久化や WALC 取次原価への波及があれば再評価。

---

## 2026-07-11 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-10。本 07-11 run は直近 24h を照合 (連続実行・キャッチアップなし・公式/準公式優先)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定)。複数ソース (TAT 公式 / EY globaltaxnews 2026-1194 / insubuy / siam-legal / thailandinsiderguide) が依然「as of 2 July 2026, 現行 60 日ビザ免除が有効 (remains in force)・国境で 60 日スタンプ継続」と明記 = 未発効継続。より新しい公布 dateline の出現なし。前回 07-10 から変化なし → 継続監視 (最重要)。発効は官報公布 15 日後。30 日=54 カ国 (日本含む) / 15 日=3 領域 (Maldives/Mauritius/Seychelles) / VoA=4 カ国 (Azerbaijan/Belarus/India/Serbia) の内訳も不変 | tatnews.org (公式) / globaltaxnews.ey.com 2026-1194 / insubuy.com / siam-legal.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング or 月収 50k×6 ヶ月 or 併用 / e-Visa 必須・IP/GPS 判定 / 基本 VISA fee 10k THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。二次ソースの「2026 運用厳格化 (500k シーズニング再徹底・語学学校をソフトパワー除外→NON-ED 誘導・陸路 2 回/年 上限・タイ国内申請 auto-reject・startup/研究者カテゴリ new for 2026)」は既ログの運用/既知シグナルレベルで**公式官報の新規発効変更ではない** → 未ログ。ムエタイ (registered camp) は引き続き有効カテゴリ = WALC ソフトパワープランに影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大は 06-28 既ログ (KPMG 2026-148 / Por 3/2568)。中核要件緩和 (WGC の USD 80k 所得撤廃・HSP/WFTP 職歴撤廃・雇用主収益閾値引下げ) は 2025-02-04 発効済 (既ログ)。**未発効は扶養家族枠拡大 (親+全法定扶養者・上限撤廃) のみ = 内務省 + Immigration Bureau 施行規則待ち** ("still pending as of March 2026" を BOI/KPMG 系ソースが明記 / 現行 = 配偶者+20 歳未満の子・同性婚配偶者含む・上限 4 名)。10 年構造・保険・中核投資閾値 (資産 USD 1M・タイ投資 USD 500k) 不変 | ltr.boi.go.th (公式) / kpmg.com (2026-148) / zagdim.com / emerhub.com / hlbthai.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 まで**の期間限定 / 09-30 後は Gold 900k が最低ティア / Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致)。50k 申請手数料の一時免除・家族追加プロモ 750k/人 (Platinum/Diamond/Reserve・2026-08-14 期限) は既メモの取次プロモで中核ティア価格不変・pricing.ts 非計上のため影響なし | thailandelite.net / natlawreview.com / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB or 併用 / 更新前 3 ヶ月 80 万維持→更新後 3 ヶ月 80 万→以降 6 ヶ月 40 万 の 2019-03-01 預金ルール / 1 年更新)。JP 複数ソースが「制度の枠組みに大きな変更なし・審査/書類確認・資金管理の厳格化のみ」。健康保険必須は NON-**OA** の別制度で WALC 取扱の NON-O とは別物・混同しない | longstay-thailand.com / thaiconsulate-visa.jp / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。ED Plus / TDAC / 学生ビザ濫用対策は 2025 既知・新規 2026 発効変更ではない | — |

**継続監視フラグ (未発効 / 要追跡 — 07-10 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→4 カ国 (Azerbaijan/Belarus/India/Serbia) 発効待ち。次回 watch で TAT/MFA の公布フォロー記事出現を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省 + Immigration Bureau 施行規則待ち = 現時点未発効。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」の上限記述に影響しうる。継続監視。
3. **(メモ) DTV 将来改定案** — ティア料金 / Digital ID / 扶養枠 / WP 統合。二次ソースのみ・公式未確認・未発効。推測ゼロ原則でログ化せず監視のみ。
4. **(メモ) Thailand Privilege 50k 申請手数料の一時免除** — 二次ソース。一時プロモ・pricing.ts 非計上のため影響なし。恒久化や WALC 取次原価への波及があれば再評価。

## 2026-07-12 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置、または既ログ・未発効の継続監視案件のみ。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-11。本 07-12 run は直近 24h を照合 (連続実行・公式/準公式優先・TAT 公式を実取得検証)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定)。**TAT 公式記事を本日実取得 → `meta-article:modified_time = 2026-05-21` のまま更新なし + TAT の 7 月プレスリリース一覧に公布フォロー記事なし = 未発効を実証**。記事本文も「Until the revised measures take effect, current entry conditions remain in place」「TAT will provide further updates once the revised measures are officially published in the Royal Gazette」を維持。60 日が国境で依然有効。前回 07-11 から変化なし → 継続監視 (最重要)。内訳不変: 30 日=54 カ国 (日本含む) / 15 日=3 領域 (Maldives/Mauritius/Seychelles) / VoA=4 カ国 | tatnews.org (公式・07-12 実取得) / siam-legal.com / globaltaxnews.ey.com 2026-1194 |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 (延長料 1,900 THB) / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須 (2025-01-01 以降 全在外公館))。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。二次ソースの「2026 運用厳格化 (500k シーズニング再徹底・語学学校をソフトパワー除外→NON-ED 誘導・startup/研究者カテゴリ・e-Visa 60 カ国超対応)」は既ログの運用/既知シグナルレベルで**公式官報の新規発効変更ではない** → 未ログ。ムエタイ (registered camp) は引き続き有効 = WALC ソフトパワープランに影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大は 06-28 既ログ (KPMG 2026-148 / Por 3/2568)。中核要件緩和 (WGC の USD 80k 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済 (既ログ)。**未発効は扶養家族枠拡大 (親+全法定扶養者・人数上限撤廃) のみ = 内務省 (MOI) の後続告示待ち**。本日の再照合でも "will take effect only upon a subsequent announcement by the Ministry of Interior" を確認・**7 月の MOI 告示の形跡なし** (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・中核投資閾値 (資産 USD 1M・タイ投資 USD 500k) 不変 | ltr.boi.go.th (公式) / kpmg.com (2026-148) / zagdim.com / hlbthai.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 まで**の期間限定 / 09-30 後は Gold 900k が最低ティア / Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts と完全一致)。本日照合でも「Bronze 値上げアナウンスなし・価格据置」を明示確認。50k 申請手数料の一時免除・家族追加プロモ 750k/人 (2026-08-14 期限) は既メモの取次プロモで中核ティア価格不変・pricing.ts 非計上のため影響なし | thailandelite.net / natlawreview.com / siam-legal.com / thai-visa-services.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB or 併用 / 2019-03-01 預金ルール / 1 年更新)。**JP 検索で Forvis Mazars「リタイアメントビザの取得延長要件改定」がヒットしたが、実取得の結果 2019 年 1 月タイ警察庁改定の記事 = 既知 (2019 預金ルール) で新規 2026 変更ではない** → 未ログ。JP 複数ソースは引き続き「制度の枠組みに大きな変更なし・審査/書類/資金管理の厳格化のみ」。健康保険必須は NON-**OA** の別制度で混同しない | forvismazars.com (2019 記事・実取得確認) / thaiconsulate-visa.jp / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-11 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日。公布後 15 日で発効。VoA も 31→4 カ国発効待ち。次回 watch で TAT/MFA の公布フォロー記事出現を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — 内務省 (MOI) 後続告示待ち = 現時点未発効。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」の上限記述に影響しうる。継続監視。
3. **(メモ) DTV 将来改定案** — ティア料金 / Digital ID / 扶養枠 / 限定フリーランス就労。二次ソースのみ・公式未確認・未発効。推測ゼロ原則でログ化せず監視のみ。
4. **(メモ) Thailand Privilege 50k 申請手数料の一時免除** — 二次ソース。一時プロモ・pricing.ts 非計上のため影響なし。恒久化や WALC 取次原価への波及があれば再評価。

**新規メモ (制度変更ではない / 営業・接客に有用)**: TAT 公式が **2026-07-06「Thailand entry reminder on proof of funds for foreign visitors」** を発出。記事は **"does not introduce a new measure"** と明記 = **新規制度変更ではない** (根拠は 1980 年内務省告示・金額は 2000 年改定)。金額: Transit / 一部ビザ免除 = 10,000 THB/人・20,000 THB/家族 / VoA = 同 / Tourist = 20,000 THB/人・40,000 THB/家族 / **Non-Immigrant = 20,000 THB/人・40,000 THB/家族** (12 歳未満は対象外)。最終判断は入国審査官。
→ **WALC 活用**: 空港イミグレサポートの説明・LINE FAQ・入国前チェックリストに「所持金証明 (Non-Immigrant 2 万 THB/人)」を明記できる公式ソース。制度変更ログではないため pricing.ts / knowledge.ts の必須修正はなし (P3・任意の FAQ 強化)。
出典: https://www.tatnews.org/2026/07/thailand-entry-reminder-on-proof-of-funds-for-foreign-visitors/

## 2026-07-13 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-12。本 07-13 run は直近 24h を照合 (連続実行・公式/準公式優先・EN/JP 6 クエリ)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定)。複数ソースが依然「as of 2 July 2026 で 60 日継続・国境で有効」を維持し、より新しい公布 dateline の出現なし。JP 側も JETRO (2026-06) 含め「官報掲載 15 日後施行・掲載日未定」で一致。内訳不変: 30 日=54 カ国 (日本含む) / 15 日=3 領域 / VoA=4 カ国。※JP 二次ソースに「対象 65 カ国」表記の揺れあり (TAT 公式 54+3 を正とする) | tatnews.org (公式) / jetro.go.jp (2026-06) / globaltaxnews.ey.com 2026-1194 / siam-legal.com |
| DTV | 変更なし (5 年マルチ / 180 日 / 残高 500k THB・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須 / 保険 USD 40k)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 運用厳格化 (シーズニング再徹底・語学学校のソフトパワー除外・研究者カテゴリ)」は既ログの運用レベルで新規発効変更ではない。ムエタイ (registered camp) 引き続き有効 = WALC ソフトパワープラン影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大 (Por 3/2568) = 既ログ。**扶養家族枠拡大 (親+上限撤廃) は依然 MOI 告示待ち・未発効** — 本日再照合でも「MOI の後続告示までは現行ルール (配偶者+20 歳未満の子・上限 4 名) で申請」を確認・7 月告示の形跡なし | ltr.boi.go.th (公式) / zagdim.com / hlbthai.com |
| Thailand Privilege | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。家族追加プロモ 750k/人 (2026-08-14 期限)・50k 申請手数料一時免除は既メモの取次プロモ・pricing.ts 非計上 = 影響なし | siam-legal.com / thai-visa-services.com / thailandelitevisas.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB / 2019 預金ルール / 1 年更新)。保険必須は NON-**OA** の別制度・混同しない。7 月新規変更シグナルなし | siam-legal.com / issacompass.com / lexology.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-12 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日 (公布後 15 日で発効)。VoA 31→4 カ国も発効待ち。次回 watch で TAT/MFA 公布フォロー記事を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — 二次ソースのみ・公式未確認。推測ゼロ原則で未ログ・監視のみ。

## 2026-07-14 検証ログ (新規変更なし)

**結論**: **新規の発効済み制度変更ゼロ**。全カテゴリ据置。pricing.ts / knowledge.ts への影響なし。Owner 通知なし (変更なし扱い)。

> 前回 regulation-watch = 2026-07-13。本 07-14 run は直近 24h を照合 (連続実行・公式/準公式優先・EN/JP 6 クエリ)。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし** (2026-05-19 閣議決定のまま / **官報未掲載**・公布日未設定)。複数ソースが依然「公布日未アナウンス・60 日が国境で有効」を維持 (最新 dateline = as of 2 July 2026)。より新しい公布報道の出現なし。内訳不変: 30 日=54 カ国 (日本含む) / 15 日=3 領域 (Maldives/Mauritius/Seychelles) / VoA=4 カ国。公布後 15 日で施行 + 現地 30 日延長 (1,900 THB) で実質 60 日維持可の構造も不変 | tatnews.org (公式) / siam-legal.com / taxnews.ey.com 2026-1194 / thaich.net |
| DTV | 変更なし (5 年マルチ / 180 日 / 残高 500k THB・3 ヶ月シーズニング / e-Visa 必須 / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 運用厳格化 (シーズニング再徹底・語学学校のソフトパワー除外・研究者カテゴリ追加・60 カ国超 e-Visa 対応・IP/GPS フラグ)」は既ログの運用レベルで新規官報発効の変更ではない。ムエタイ (registered camp) 引き続き有効 = WALC ソフトパワープラン影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大 (Por 3/2568) = 既ログ。**扶養家族枠拡大 (親+上限撤廃) は依然 MOI 告示待ち・未発効** — 本日再照合でも "will take effect only upon a subsequent announcement by the Ministry of Interior" を確認・7 月告示の形跡なし (現行 = 配偶者+20 歳未満の子・上限 4 名) | ltr.boi.go.th (公式) / zagdim.com / hlbthai.com / lexology.com |
| Thailand Privilege | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。09-30 後は Gold 900k が最低ティアの構造も既ログ通り | siam-legal.com / thailandelite.net / natlawreview.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB / 2019 預金ルール / 1 年更新)。「2026 は審査・銀行・報告義務の運用厳格化」論調は継続も新規の制度変更なし。保険必須は NON-**OA** の別制度・混同しない | siam-legal.com / issacompass.com / lexology.com / emerhub.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-13 から変化なし)**:
1. **ノービザ 30 日化** — 官報公布日 (公布後 15 日で発効)。VoA 31→4 カ国も発効待ち。次回 watch で TAT/MFA 公布フォロー記事を最優先確認 (最重要)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — 二次ソースのみ・公式未確認。推測ゼロ原則で未ログ・監視のみ。

**新規メモ (制度変更ではない / 参考)**: タイ人向け**日本側**のビザ免除措置が 2027-06 末まで延長 (thaich.net 2026-07-09)。逆方向 (タイ→日本) の話で WALC 取扱 5 カテゴリに影響なし。ログ化不要・メモのみ。

## 2026-07-15 検証ログ (発効済み新規変更なし / ただし継続監視①に重要更新)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。ただし **継続監視①「ノービザ 30 日化」に重要な進展あり = 2026-07-14 に閣議が同スキームを再改定** (対象国内訳を変更)。依然 **官報未掲載・未発効** のため pricing.ts / knowledge.ts の即時修正は不要だが、公布時に反映する数値が更新されたため詳細を記録。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。

> 前回 regulation-watch = 2026-07-14 (本日実行前の午前 run とみられ、Nation Thailand の 07-14 16:08 +07 記事を捕捉できず「54 カ国・内訳不変」と記録)。本 07-15 run が当該閣議再改定を新規捕捉し内訳を是正。

### 🟡 重要更新: 2026-07-14 閣議によるノービザ・スキーム再改定 (一次ソース検証済 / 未発効)

**出典**: The Nation (公式報道 / `published 2026-07-14T16:08 +07` ・`modified 16:24`): https://www.nationthailand.com/news/policy/40068630 ／ The Star (Asia News Network 転載): https://www.thestar.com.my/aseanplus/aseanplus-news/2026/07/14/thailand-revamps-visa-rules-for-65-countries-and-territories

副政府報道官 Ploytalay Laksameesangchan が 2026-07-14 (火) 発表。閣議が「ビザ免除措置と査証特典の**さらなる見直し (further review)**」を承認。"one country, one entitlement" 原則で重複権利を排除・TDAC スクリーニング強化。**60 日免除 (93 カ国) 撤回の方針は不変**だが、対象国の内訳が 05-19 決定から更新された。

| 区分 | 07-14 再改定後 (最新) | 05-19 決定時 (既ログ) | 差分 |
|---|---|---|---|
| 30 日ビザ免除 | **59 カ国** (EU 27 全加盟国 + インド含む) | 54 カ国 | +5 (実質: 6 カ国 India/Croatia/Bulgaria/Cyprus/Malta/Maldives を追加し EU 27 全部を同権利化) |
| 15 日ビザ免除 | **2 領域** (Mauritius / Seychelles) | 3 領域 (Maldives/Mauritius/Seychelles) | Maldives が 30 日枠へ昇格 |
| VoA | **3 カ国** (Azerbaijan / Belarus / Serbia) | 4 カ国 (+ India) | India が VoA から除外 (15 日免除へ移行と記載・記事内で 30 日枠にも列挙され表記ゆれあり = 報道段階のノイズ) |
| 合計 | **65 カ国・地域** | — | — |

**発効状況 (最重要)**: 5 本の内務省 (MOI) 告示ドラフトは **官報公布の 15 日後に発効**。**公布日は依然未確定・未発効**。既入国者は従前権利の残存期間まで滞在可 (経過措置)。→ 国境では **60 日スタンプが引き続き有効**。

**WALC への影響評価**:
- **pricing.ts: 影響ゼロ** (料金・プラン・カテゴリいずれも不変)。
- **日本人 (WALC 中核顧客): 新規影響なし** — 日本は 05-19 時点から 30 日枠で、07-14 の 6 カ国追加 (印+EU 5) に日本は含まれない。「60→30 日・公布待ち」という顧客への説明は不変。
- **knowledge.ts: 公布時反映用の数値のみ更新** — ノービザ内訳を **30 日=59 カ国 / 15 日=2 領域 (Mauritius・Seychelles) / VoA=3 カ国 (Azerbaijan・Belarus・Serbia)** へ差し替える (従来キューは 54/3/4)。**発効までは修正不要** (2026-05-29 P0 フラグに内訳更新メモを上書き)。直接編集は本タスク範囲外 → 公布確認後に Code handoff。
- **営業方針: DTV 第一推奨は不変〜微強化** (短期ビザ縮小の確度が上がり長期ビザ需要の追い風)。
- **Owner 通知: なし** — 発効ゼロ + 見出し事実 (「60→30 日・公布待ち」) は 05-29 既知から不変のため、変更なし基準を適用 (低シグナル通知の抑制)。公布が確認され次第、次回 watch で検知→通知に切替。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 運用厳格化 (シーズニング再徹底・語学学校のソフトパワー除外→NON-ED 誘導・startup/研究者カテゴリ・陸路 2 回/年 上限)」は既ログの運用/既知シグナルで新規官報発効ではない。ムエタイ (registered camp) 引き続き有効 = WALC ソフトパワープラン影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。HSP 対象産業拡大 (Por 3/2568) = 既ログ。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**未発効は扶養家族枠拡大 (親+全法定扶養者・上限撤廃) のみ = MOI 告示待ち** — 本日再照合でも "confirmed but not yet in force — Ministry of Interior announcement still required" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・中核投資閾値不変 | ltr.boi.go.th (公式) / emerhub.com / zagdim.com / siam-legal.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 値上げなし・据置」を明示確認 (09-30 後は Gold 900k が最低ティア)。50k 申請手数料一時免除・家族追加プロモ 750k/人 (2026-08-14 期限) は既メモの取次プロモ・pricing.ts 非計上 = 影響なし | thailandelite.net / siam-legal.com / natlawreview.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・申請前 2-3 ヶ月+申請後 3 ヶ月維持→以降減額 or 月収 65k THB / 2019-03-01 預金ルール / 1 年更新)。JP 複数ソースが「制度の枠組みに大きな変更なし・審査/書類/資金管理の厳格化のみ」。健康保険必須は NON-**OA** の別制度で混同しない | 在チェンマイ日本国総領事館 / thaiconsulate-visa.jp / longstay-thailand.com / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡)**:
1. **ノービザ 30 日化** — **07-14 閣議で再改定 (内訳更新・上記詳細)**。依然 **官報未掲載・未発効**。次回 watch で **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効 (07-14 から変化なし)。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — 二次ソースのみ・公式未確認・未発効。推測ゼロ原則で未ログ・監視のみ。

## 2026-07-16 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-15 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-15 (07-14 閣議の再改定=30日59カ国/15日2/VoA3 を一次ソース是正捕捉)。本 07-16 run は直近 24h を照合 (EN/JP 8 クエリ・公式/準公式優先)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点で公布報道なし・TAT 公式見出しも依然 "pending Royal Gazette publication"。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効**。TAT Newsroom 公式が依然「pending Royal Gazette publication」を維持。**官報公布日は本日時点で未確定・未掲載**。国境では 60 日スタンプ引き続き有効 (最新 dateline = "as of 2 July 2026 で 60 日継続" より新しい公布報道の出現なし)。07-14 閣議再改定の内訳 (30日=59カ国[EU27全+印] / 15日=2領域[Mauritius・Seychelles] / VoA=3カ国[Azerbaijan・Belarus・Serbia] / 合計65) は 07-15 で捕捉済・本日変化なし。既入国者は従前権利の残存期間まで滞在可 (経過措置)。日本は 05-19 時点から 30 日枠 = 新規影響なし | tatnews.org (公式) / nationthailand.com / thestar.com.my / visasupdate.com / taxnews.ey.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 運用厳格化 (シーズニング厳格適用・語学学校のソフトパワー除外→NON-ED/新設 ED Plus 誘導・陸路 2 回/年 上限・反復入国フラグ)」は既ログの運用シグナルで新規官報発効ではない。ムエタイ (registered camp) 引き続き有効 = WALC ソフトパワープラン影響なし。「将来改定案 (手数料調整・Digital ID 連携・扶養拡大・WP 統合)」は proposals/discussions 段階・公式未確定 = 推測ゼロで監視のみ | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**未発効は扶養家族枠拡大 (親+全法定扶養者・上限撤廃 / Por 3/2568) のみ = MOI 告示待ち** — 本日再照合でも "will take effect only upon a subsequent announcement by the Ministry of Interior / not yet published" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・中核投資閾値不変 | ltr.boi.go.th (公式) / zagdim.com / aimbangkok.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 値上げ・期限延長なし・据置 / 09-30 後は Gold 900k が最低ティア (差 250k)」を明示確認。Bronze 期限超の提供有無は未アナウンス | thailand-elite.com / siam-legal.com / natlawreview.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・申請前 2-3 ヶ月維持 or 月収 65k THB / 2019-03-01 預金ルール / 1 年更新)。JP 複数ソースが「基本枠組み (年齢・資金・1 年延長) 維持・審査/書類/資金管理の厳格化のみ」。健康保険必須は NON-**OA** の別制度で混同しない | thaiconsulate-visa.jp / longstay-thailand.com / siam-legal.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。新設 ED Plus は語学・文化コース向けで NON-ED 系統・DTV ソフトパワー (ムエタイ) とは別 = WALC 提案に影響なし | thai-visa-services.com |

**継続監視フラグ (未発効 / 要追跡 — 07-15 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (07-14 閣議再改定の内訳 59/2/3 で確定・公布待ち)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。公布時 knowledge.ts 反映数値 = 30日59カ国 / 15日2領域 / VoA3カ国。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効 (07-15 から変化なし)。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals/discussions のみ・公式未確認・未発効。推測ゼロ原則で未ログ・監視のみ。

## 2026-07-16 補足 (Owner 指摘「スタンプ既に30日?」→ SNS/実報告 精査)

**契機**: Owner より「すでに入国スタンプが30日になった模様、SNSを洗って」との指摘。実スタンプ報告を SNS・フォーラム・タイ語一次で追加精査。

**結論 (変更なし維持)**: **官報 (ราชกิจจานุเบกษา) 公布は本日時点で確認できず → 30日化は依然 未発効**。「スタンプが一律30日になった」を裏付ける系統的な実報告は発見できず。本日の 検証ログ (新規変更なし) の結論を維持。Owner 通知は保留 (発効確認できず)。

**精査ソースと結果**:
- **TAT 公式** (tatnews.org・本日 7/16 時点で生ページ): 見出し・本文とも依然 "pending Royal Gazette publication" / "current entry conditions remain in place"。公布後に更新告知する旨を明記。
- **Reddit r/Thailand** (sort=new・直近1ヶ月・old.reddit で実閲覧): 「30日スタンプを受けた」旅行者報告は **ゼロ**。移民系で最も反応が速いサブで無風 = 系統的変更なしの傍証。
- **タイ語一次照合**: 「15 กรกฎาคม」で出る官報公布は **พ.ศ. 2567 (=2024年)** の「90カ国・60日」ยกเว้นวีซ่า 発効告示。2026 (2569) の30日化官報は未掲載。閣議決定 (5/19・7/14 再改定) 止まり。
- **日本語ソース**: 「7/14 閣議承認をもって直ちに60日終了ではない。施行日は官報掲載で確定。**入国審査官の判断で実際の許可日数は異なる場合あり**」(旅行情報系・thaich 等)。
- **zero-asia.biz「ビザ免除60日、7月15日から正式施行」= 2024/7/16 の旧記事** (60日制度が始まった時の話・今回の30日化とは無関係)。

**「既に30日スタンプ」の合理的説明 (推測ゼロで確定できるのは①の存在自体)**:
1. **審査官裁量による短縮スタンプ** — 60日免除下でも、頻回のビザ免除入国 / 復路チケット不備 / 資金証明不足 / 陸路入国 等で 30日 (以下) を付与される個別ケースは従来から存在。日本語一次も明記。← 最有力。
2. 陸路 visa-exempt の厳格運用 / 元々30・15日枠の国籍 / TDAC・個別事案の SNS 拡散。
3. 官報が直近48hで公布された可能性 = 本日照合では**痕跡なし** (公布なら TAT/MFA/Bangkok Post が即報)。

**WALC 対応方針**: 「決定≠施行 (国境は今も60日)」を正確に。ただし**裁量短縮の実在 + 30日化の官報秒読み** は DTV (5年マルチ) 推奨の追い風として営業メッセージに活用可。顧客告知は Owner 承認後。**次回 watch も官報公布を最優先監視** (公布=検知→Owner 通知へ切替)。

---

## 2026-07-17 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-16 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-16。本 07-17 run は直近 24h を照合 (EN/JP 6 クエリ・公式/準公式優先)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも公布報道なし・TAT 公式見出しは依然 "pending Royal Gazette publication"。

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効**。TAT Newsroom 公式が依然「pending Royal Gazette publication」を維持・現行 60 日継続。官報公布日は本日時点でも未確定・未掲載。07-14 閣議再改定 (30日59カ国 / 15日2領域 / VoA3カ国) は 07-15 捕捉済で本日変化なし。**日本は 30 日枠 = 新規影響なし・pricing.ts 影響ゼロ**。JETRO/thaich 等 JP 一次も「閣議承認≠施行・施行日は官報掲載で確定・審査官裁量で実許可日数は異なりうる」を再確認 | tatnews.org (公式) / nationthailand.com / jetro.go.jp / thaich.net / siam-legal.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / 政府費 10,000 THB / e-Visa 必須・IP/GPS クロスチェックでタイ国内申請不可)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。語学学校除外・ムエタイ registered camp 有効・startup/研究者カテゴリ (2026 初頭既ログ) = すべて既知。新規官報発効なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**未発効は扶養家族枠拡大 (親+全法定扶養者・上限撤廃 / Por 3/2568) のみ = MOI 告示待ち** — 本日再照合でも "confirmed but not yet in force — Ministry of Interior announcement still required" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・中核投資閾値不変 | ltr.boi.go.th (公式) / kpmg.com / zagdim.com / aimbangkok.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 据置・09-30 後は Gold 900k が最低ティア (差 250k)」を再確認。家族追加プロモ 750k/人 (2026-08-14 期限) は取次プロモ・pricing.ts 非計上 = 影響なし | thailandelite.net / bangkokpost.com / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k THB / 2019-03-01 預金ルール / 1 年更新)。本日の全クエリで新規の制度変更シグナルなし | (07-16 照合を継続・新規シグナルなし) |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。ED Plus は語学・文化コース系で DTV ソフトパワー (ムエタイ) とは別 = WALC 提案に影響なし | thai-visa-services.com |

**継続監視フラグ (未発効 / 要追跡 — 07-16 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (07-14 閣議再改定の内訳で確定・公布待ち)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。公布時 knowledge.ts 反映数値 = 30日59カ国 / 15日2領域 / VoA3カ国。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効 (07-16 から変化なし)。発効すれば pricing.ts 行 243「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals/discussions のみ・公式未確認・未発効。推測ゼロ原則で未ログ・監視のみ。

**データ整合メモ (推測ゼロ)**: 本日 The Nation 経由で 07-14 追加 6 カ国が "India, Croatia, Bulgaria, Cyprus, Malta, Maldives" と表記される二次情報あり。07-15 ログの「EU27全+印」と細部が食い違うが、(a) いずれも**未発効・官報前**の内訳で公式確定前、(b) **日本の 30 日枠・pricing.ts への影響はいずれでもゼロ**のため WALC 判断に影響なし。公布時に官報の確定内訳で数値を最終化する。

---

## 2026-07-18 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-17 から実質進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-17。本 07-18 run は直近 24h を照合 (EN/JP 4 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ データ整合メモの解消 (07-17 表記ゆれ → TAT 公式で確定)

TAT Newsroom が 07-14 閣議再改定の公式詳報を **2026-07-16 に公開** (旧 05 月記事 URL から `/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/` へリダイレクト・published 2026-07-16T10:36 UTC・本日 07-18 実取得)。公式確定内訳:

- **30 日免除 = 59 カ国・地域** — India, Croatia, Bulgaria, Cyprus, Malta, Maldives を含み、**EU 27 全加盟国を同権利化** (07-15 ログ「EU27全+印」と 07-17 The Nation 経由 6 カ国表記は**両方正しい** = 相互補完であり矛盾ではなかった)
- **15 日免除 = 2 領域** (Mauritius / Seychelles)
- **VoA = 3 カ国** (Azerbaijan / Belarus / Serbia)。India は VoA → 30 日免除へ昇格 (平均滞在 7.17 日/trip を理由に明記)
- 原則 = "one country or territory, one entry category" / 別途二国間協定 (90/30/14 日) は継続
- **発効状況: MOI 告示 5 本は依然 "remain pending publication in the Royal Gazette"・公布 15 日後発効・現行 60 日継続** (TAT 公式本文で再確認)。TDAC 強化も本文に明記

→ 公布時 knowledge.ts 反映数値 **59/2/3 で最終確定** (官報公布を待つのみ)。日本は 30 日枠 = 新規影響なし・pricing.ts 影響ゼロ。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記の通り TAT 公式 07-16 詳報で内訳確定も官報未掲載) | tatnews.org (公式・07-18 実取得) / nationthailand.com / thaich.net / taxnews.ey.com |
| DTV | 変更なし (5 年マルチ / 180 日 / 残高 500k・3 ヶ月シーズニング / e-Visa 必須 / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 厳格化 (シーズニング・語学学校除外・startup/研究者追加・60 カ国超 e-Visa)」は全て既ログの運用レベル。ムエタイ registered camp 有効 | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。**扶養家族枠拡大 (Por 3/2568・親+上限撤廃) は依然 MOI 告示待ち・未発効** — 本日再照合でも "will take effect only upon a subsequent announcement by the Ministry of Interior" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名) | ltr.boi.go.th (公式) / zagdim.com / hlbthai.com / aimbangkok.com |
| Thailand Privilege | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。**メモ (制度変更ではない)**: ①「Thailand Privilege Pass (TPP)」= ビザなしのライフスタイル特典専用メンバーシップが登場 (長期滞在ビザ 5 ティアとは別商品・pricing.ts 影響なし) ② 二次ブログに「entry 600,000 THB」表記 1 件 → 公式・複数ソースは 650k 維持のため誤記と判断・推測ゼロ原則で未採用 | thailandelitevisas.com / superagent.co / austchamthailand.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k / 2019 預金ルール / 1 年更新)。O-A・LTR-WP・Privilege の 3 択比較論調のみ・新規制度変更シグナルなし | lexology.com / thaiembassy.com / issacompass.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-17 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (TAT 公式 07-16 詳報で内訳 59/2/3 は最終確定・公布待ちのみ)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

---

## 2026-07-19 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-18 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-18。本 07-19 run は直近 24h を照合 (EN/JP 6 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日 (日曜) 時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-19 実取得**・記事 modified 2026-07-16T10:37 UTC / 表示 "3 days ago") は依然:
- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「TAT will provide further updates **once the measures are officially published in the Royal Gazette**.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge.ts 反映数値 = 59/2/3 (30 日免除 59 カ国 [India/Croatia/Bulgaria/Cyprus/Malta/Maldives + EU27 全] / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia) で最終確定済・公布を待つのみ。日本は 30 日枠 = 新規影響なし・pricing.ts 影響ゼロ。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-19 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-19 実取得) / nationthailand.com / taxnews.ey.com / thailand-business-news.com |
| DTV | 変更なし (5 年マルチ / 180 日 / 残高 500k・3 ヶ月シーズニング / e-Visa 必須 / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 厳格化 (シーズニング徹底・語学学校をソフトパワー除外・研究者カテゴリ追加・repeat entry フラグ)」は全て既ログの運用レベルで新規官報発効なし。ムエタイ registered camp 有効 | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。**扶養家族枠拡大 (Por 3/2568・親+全法定扶養者・上限撤廃) は依然 MOI 告示待ち・未発効** — 本日再照合でも "confirmed but not yet in force — a Ministry of Interior announcement is still required" を確認 (現行 = 配偶者+子・上限 4 名 / 同性婚配偶者の扶養認定は 2025 婚姻平等法の下流で新規変更ではない)。10 年構造・保険・中核閾値不変 | ltr.boi.go.th (公式) / kpmg.com / zagdim.com |
| Thailand Privilege | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 据置・09-30 後は Gold 900k が最低ティア (差 250k)」を再確認 | thailandelite.net / siam-legal.com / natlawreview.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB or 月収 65k / 2019 預金ルール = 申請前 2 ヶ月 80 万維持・許可後 3 ヶ月 80 万・以降 40 万 / 1 年更新)。JP 一次照合で「制度の枠組み変更なし・運用厳格化のみ」を再確認 | longstay-thailand.com / thailand-ijyunavi.com / rumavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-18 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (TAT 公式 07-16 詳報で内訳 59/2/3 最終確定・公布待ちのみ)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

---

## 2026-07-20 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-19 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-19。本 07-20 (月) run は直近 24h を照合 (EN/JP 6 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-20 実取得**・ページヘッダ "Monday, July 20 2026"・記事 modified 2026-07-16T10:37 UTC / 表示 "3 days ago") は依然:
- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge.ts 反映数値 = 59/2/3 (30 日免除 59 カ国 [India/Croatia/Bulgaria/Cyprus/Malta/Maldives + EU27 全] / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia) で最終確定済・公布を待つのみ。日本は 30 日枠 = 新規影響なし・pricing.ts 影響ゼロ。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-20 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-20 実取得) / nationthailand.com / visasupdate.com / taxnews.ey.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須 60+ カ国 / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 厳格化 (シーズニング徹底・語学学校をソフトパワー除外→NON-ED 誘導・研究者カテゴリ追加・居住証明要件化)」は全て既ログの運用レベルで新規官報発効なし。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**扶養家族枠拡大 (親+全法定扶養者・上限撤廃) は依然 MOI 告示待ち・未発効** — 本日再照合でも "confirmed but not yet in force — a Ministry of Interior announcement is still required" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・中核投資閾値不変 | ltr.boi.go.th (公式) / kpmg.com / zagdim.com / aimbangkok.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 据置・値上げ/延長アナウンスなし・09-30 後は Gold 900k が最低ティア (差 250k)」を再確認 | thailandelite.net / siam-legal.com / natlawreview.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 残高 40 万+年金 40 万 or 月収 65k THB / 2019-03-01 預金ルール / 1 年更新)。JP 一次照合で「基本枠組み (年齢・資金・1 年延長) 維持・審査/書類/資金管理の厳格化のみ」。健康保険必須 (外来4万/入院40万) は NON-**OA** の別制度で混同しない | thaiconsulate-visa.jp / longstay-thailand.com / forvismazars.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-19 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (TAT 公式 07-16 詳報で内訳 59/2/3 最終確定・公布待ちのみ)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

---

## 2026-07-21 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-20 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-20。本 07-21 (火) run は直近 24h を照合 (EN/JP 6 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-21 実取得**・ページヘッダ "Tuesday, July 21 2026"・記事 modified 2026-07-16T10:37 UTC / 表示 "4 days ago") は依然:
- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge.ts 反映数値 = 59/2/3 (30 日免除 59 カ国 [India/Croatia/Bulgaria/Cyprus/Malta/Maldives + EU27 全] / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia) で最終確定済・公布を待つのみ。日本は 30 日枠 = 新規影響なし・pricing.ts 影響ゼロ。補助検索に旧 "54 カ国" (2026-05 版) 表記が残存するが TAT 公式の 59 を正とする (矛盾ではなく版差)。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-21 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-21 実取得) / nationthailand.com / taxnews.ey.com / zagdim.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須・IP/GPS クロスチェック / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 厳格化 (シーズニング徹底・語学学校をソフトパワー除外・研究者カテゴリ追加・居住証明要件化)」は全て既ログの運用レベルで新規官報発効なし。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし | thaiembassy.com / thai-visa-services.com / thethaiger.com |
| LTR / HSP + 扶養枠 | 変更なし。BOI の HSP 対象産業区分の広域化 (KPMG GMS Flash 2026-148) は 2026-06-28 既ログと同一・新規性なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025 発効済。**扶養家族枠拡大 (親+上限撤廃) は依然 MOI 告示待ち・未発効** (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・USD80k・17% フラット不変 | ltr.boi.go.th (公式) / kpmg.com / siam-legal.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 据置・09-30 後は Gold 900k が最低ティア (差 250k)」を再確認 | thailandelite.net / siam-legal.com / natlawreview.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月収 65k THB / 2019 預金ルール / 1 年更新)。JP 一次照合で「制度の枠組み変更なし・審査/書類/資金管理の厳格化のみ」を再確認 | longstay-thailand.com / thaiconsulate-visa.jp / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-20 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (TAT 公式 07-16 詳報で内訳 59/2/3 最終確定・公布待ちのみ)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-22 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-21 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-21。本 07-22 (水) run は直近 24h を照合 (EN/JP 7 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-22 実取得**・ページヘッダ "Wednesday, July 22 2026"・記事 modified 2026-07-16T10:37 UTC / 表示 "5 days ago") は依然:
- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge.ts 反映数値 = 59/2/3 (30 日免除 59 カ国 [India/Croatia/Bulgaria/Cyprus/Malta/Maldives + EU27 全] / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia) で最終確定済・公布を待つのみ。日本は 30 日枠 = 新規影響なし・pricing.ts 影響ゼロ。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-22 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-22 実取得) / nationthailand.com / visasupdate.com / zagdim.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須・IP/GPS クロスチェックでタイ国内申請不可 / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。「2026 厳格化 (シーズニング徹底・語学学校をソフトパワー除外→NON-ED/ED Plus 誘導・研究者カテゴリ追加・e-Visa 60+ カ国拡大)」は全て既ログの運用レベルで新規官報発効なし。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし | thethaiger.com / thaiembassy.com / thai-visa-services.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。BOI HSP 対象産業広域化 (KPMG 2026-148) は 06-28 既ログ。**扶養家族枠拡大 (親+全法定扶養者・上限撤廃 / Por 3/2568) は依然 MOI 告示待ち・未発効** — 本日再照合でも "announced but not yet in effect — implementing regulations by the Ministry of Interior still required" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・USD80k・17% フラット不変 | ltr.boi.go.th (公式) / globalcitizensolutions.com / zagdim.com / aimbangkok.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 据置・09-30 後は Gold 900k が最低ティア (差 250k・約 $19,000)」を再確認。補助検索に旧「Bronze は 2025-12-31 で恒久終了」表記 1 件残存 → natlawreview / thailandelite.net 公式が 2026-09-30 延長を明示のため旧版と判断・pricing.ts (09-30) を正とする | natlawreview.com / thailandelite.net / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月収 65k THB / 2019-03-01 預金ルール / 1 年更新)。JP 一次照合で「制度の枠組み変更なし・審査/書類/資金管理の厳格化のみ (金融証明・保険・犯罪/健康証明の運用厳格化)」を再確認。健康保険必須は NON-**OA** の別制度で混同しない | thaiconsulate-visa.jp / longstay-thailand.com / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。ED Plus は語学・文化コース系で DTV ソフトパワー (ムエタイ) とは別 = WALC 提案に影響なし | thai-visa-services.com |

**継続監視フラグ (未発効 / 要追跡 — 07-21 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (TAT 公式 07-16 詳報で内訳 59/2/3 最終確定・公布待ちのみ)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-23 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-22 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-22。本 07-23 (木) run は直近 24h を照合 (EN/JP 6 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-23 実取得**・ページヘッダ "Thursday, July 23 2026"・記事 modified 2026-07-16T10:37 UTC / 表示 "6 days ago" / 閲覧 19,255) は依然:
- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge.ts 反映数値 = 59/2/3 (30 日免除 59 カ国 [India/Croatia/Bulgaria/Cyprus/Malta/Maldives + EU27 全] / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia) で最終確定済・公布を待つのみ。日本は 30 日枠 = 新規影響なし・pricing.ts 影響ゼロ。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-23 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-23 実取得) / siam-legal.com / thaiembassy.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須・IP/GPS クロスチェック / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。本日照合の「500k シーズニング厳格化・語学学校をソフトパワー除外→NON-ED 誘導・研究者カテゴリ new for 2026・居住証明の文書化」は全て既ログの運用/文書化レベルで新規官報発効なし。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし | thaiembassy.com / thethaiger.com / thai-visa-services.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。BOI HSP 対象産業広域化 (KPMG 2026-148) は 06-28 既ログ。**扶養家族枠拡大 (親+全法定扶養者・上限撤廃 / Por 3/2568) は依然 MOI 告示待ち・未発効** — 本日再照合でも "expanded to include parents and all legal dependents with no numerical cap — pending Ministry of Interior confirmation" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・USD80k・17% フラット不変 | kpmg.com (2026-148) / zagdim.com / hlbthai.com / ltr.boi.go.th |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 据置・09-30 後は Gold 900k が最低ティア」を再確認。補助検索の旧「Bronze は 2025-12-31 終了」表記は natlawreview 公式が 2026-09-30 延長を明示のため旧プロモ窓と判断・pricing.ts (09-30) を正とする | natlawreview.com / thailandelite.net / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月収 65k THB / 2019 預金ルール / 1 年更新)。JP 一次照合で「制度の枠組み変更なし・審査/書類/資金管理の厳格化のみ」を再確認 | longstay-thailand.com / thaiconsulate-visa.jp / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-22 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (TAT 公式 07-16 詳報で内訳 59/2/3 最終確定・公布待ちのみ)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-25 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-23 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-23。**07-24 は未実行 (ログなし) → 本 07-25 (土) run が 07-24 + 07-25 の 2 日分をキャッチアップ照合** (EN/JP 6 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-25 実取得**・ページヘッダ "Friday, July 24 2026"・記事 modified 2026-07-16T10:37 UTC / 表示 "1 week ago" / 閲覧 19,589 [07-23 の 19,255 から増加 = ライブページ・記事再公開なし]) は依然:
- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge.ts 反映数値 = 65 カ国対象・内訳 59/2/3 (30 日免除 59 カ国 [India/Croatia/Bulgaria/Cyprus/Malta/Maldives + EU27 全] / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia) で最終確定済・公布を待つのみ。日本は 30 日枠 = 新規影響なし・pricing.ts 影響ゼロ。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-25 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-25 実取得) / nationthailand.com / visasupdate.com / lexbangkok.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須・IP/GPS クロスチェック / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。本日照合の「500k シーズニング厳格化・語学学校をソフトパワー除外→NON-ED 誘導・研究者カテゴリ new for 2026・rejection 率上昇」は全て既ログの運用/文書化レベルで新規官報発効なし。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし | thaiembassy.com / thethaiger.com / thai-visa-services.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。BOI HSP 対象産業広域化 (KPMG 2026-148) は 06-28 既ログ。**扶養家族枠拡大 (親+全法定扶養者・上限撤廃 / Por 3/2568) は依然 MOI 告示待ち・未発効** — 本日再照合でも "expanded to include parents and all legal dependents with no numerical cap — pending Ministry of Interior confirmation / not yet in effect" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名)。10 年構造・保険・USD80k・17% フラット不変 | kpmg.com (2026-148) / zagdim.com / aimbangkok.com / ltr.boi.go.th |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 据置・値上げ/延長アナウンスなし・09-30 後は Gold 900k が最低ティア (差 250k・約 $19,950)」を再確認 | natlawreview.com / thailandelitevisas.com / thailandelite.net |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月収 65k THB / 2019-03-01 預金ルール / 1 年更新)。JP 一次照合で「基本枠組み (年齢・資金・1 年延長) 維持・審査/書類/資金管理の厳格化 (金融証明・医療保険・犯罪/健康証明) のみ」を再確認。健康保険必須は NON-**OA** の別制度で混同しない | thaiconsulate-visa.jp / longstay-thailand.com / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-23 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (TAT 公式 07-16 詳報で 65 カ国・内訳 59/2/3 最終確定・公布待ちのみ)。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響しうる。
3. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-26 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリの料金・中核要件は据置・pricing.ts 完全一致。継続監視 3 フラグは 2026-07-25 から進展なし (ノービザ = **官報未掲載のまま** / LTR 扶養枠 = MOI 告示待ち)。

> 前回 regulation-watch = 2026-07-25。本 07-26 (日) run は直近 24h を照合 (EN/JP 6 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-26 実取得**・ページヘッダ "Sunday, July 26 2026"・記事 published/modified 2026-07-16T10:36-10:37 UTC / 表示 "1 week ago" / 閲覧 19,836 [07-25 の 19,589 から増加 = ライブページ・記事再公開なし]) は依然:
- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge 反映数値 = **65 カ国対象・内訳 59/2/3** (30 日免除 59 [India/Croatia/Bulgaria/Cyprus/Malta/Maldives + EU27 全] / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia) で最終確定済・公布を待つのみ。日本は 30 日枠 (+ 現地 30 日延長 1,900 THB で実質 60 日) = 新規影響なし・pricing.ts 影響ゼロ。
- ⚠️ **ノイズ注記**: 本日の補助検索に「30 日免除 = 54 カ国」とする二次情報 1 件 (portail-asie 系サマリ) が混在。TAT 公式 (07-16) は **59** を明示、nationthailand も 59 で一致 → **59 を正**とし 54 は旧案/誤記と判断 (推測ゼロ原則により pricing/knowledge へは未反映のまま)。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-26 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-26 実取得) / nationthailand.com / thaich.net / siam-legal.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須 2025-01-01〜 / 政府費 10,000 THB)。料金 (ソフトパワー60k・ノマド45k・フリー48k) 不変。本日照合の「500k シーズニング厳格化・タイ語学校をソフトパワー除外・研究者カテゴリ new for 2026」は全て既ログ済の運用/文書化レベルで新規官報発効なし。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし。なおノービザ 30 日化が発効すれば DTV の相対優位はむしろ上昇 (営業上のプラス) | thaiembassy.com / thethaiger.com / thai-visa-services.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**扶養家族枠拡大 (親+全法定扶養者・上限撤廃 / BOI Por 3/2568) は依然 MOI 告示待ち・未発効** — 本日再照合でも "will take effect upon a later announcement by the Ministry of Interior / not yet in effect" を確認 (現行 = 配偶者+20 歳未満の子・上限 4 名 = pricing.ts 記載どおり)。10 年構造・保険・USD80k・17% フラット不変 | boi.go.th / ltr.boi.go.th / kpmg.com / prnewswire (BOI 公式リリース) / globalcitizensolutions.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 650k 据置・値上げ/再延長アナウンスなし・09-30 で廃止 → 以後 Gold 900k が最低ティア (差 250k・約 $19,000)」を再確認。**残り約 2 ヶ月 = 営業上の唯一の時限要素** | natlawreview.com / thailandelite.net / thaiembassy.com / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月年金 65k THB / 1 年更新)。JP 一次照合でも「2026 年時点で制度そのものの大きな枠組み変更なし・審査運用/書類確認/資金管理の厳格化のみ」を再確認。健康保険必須は NON-**OA** の別制度で混同しない | longstay-thailand.com / dlife.co.jp / jiyuland.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ) | — |

**継続監視フラグ (未発効 / 要追跡 — 07-25 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効**。次回 watch でも **官報公布の有無を最優先確認** (公布=発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響。
3. **Thailand Privilege Bronze 2026-09-30 期限** — 制度変更ではないが **残り約 2 ヶ月の時限**。再延長 / 前倒し終了のアナウンスを継続監視 (発生時は pricing.ts 要更新)。
4. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-27 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリ (DTV / LTR / Privilege / NON-O リタイア / NON-ED) の料金・中核要件は `lib/walc-data/pricing.ts` と完全一致。継続監視 4 フラグは 2026-07-26 から進展なし。

> 前回 regulation-watch = 2026-07-26。本 07-27 (月) run は直近 24h を照合 (EN/JP 5 クエリ + TAT 公式ページ実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-27 実取得**・ページヘッダ **"Monday, July 27 2026"**・記事 published/modified 2026-07-16T10:36-10:37 UTC / 表示 "1 week ago" / 閲覧 **19,998** [07-26 の 19,836 から増加 = ライブページ・記事再公開なし]) は依然:
- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge 反映数値 = **65 カ国対象・内訳 59/2/3** で確定 (本日の全文実取得で再確認):
- 30 日免除 **59** (India / Croatia / Bulgaria / Cyprus / Malta / **Maldives** + EU27 全) ※India は VoA → 30 日免除へ移行 (平均滞在 7.17 日を根拠に明記)
- 15 日免除 **2** = **Mauritius・Seychelles のみ**
- VoA **3** = Azerbaijan・Belarus・Serbia
- 二国間協定枠 (90 / 30 / 14 日) は別途継続 / TDAC 強化も併記
- 日本は 30 日枠 (+ 現地 30 日延長 1,900 THB で実質 60 日) = 新規影響なし・pricing.ts 影響ゼロ

⚠️ **ノイズ注記 (前日から継続)**: 本日の二次情報にも「30 日免除 = **54** カ国」「15 日 = Maldives/Mauritius/Seychelles の 3 カ国」とする記述が混在 (portail-asie 系サマリ)。**TAT 公式全文 (本日実取得) は 59 / Mauritius・Seychelles の 2 カ国を明示**、nationthailand・The Star も 59 で一致 → **59・2・3 を正**とし 54 / 3 カ国説は旧案または誤記と判断。推測ゼロ原則により pricing/knowledge へは未反映のまま。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-27 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-27 実取得) / nationthailand.com / thestar.com.my / siam-legal.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング [2026-05〜] / e-Visa 必須 2025-01-01〜 / 政府費 10,000 THB)。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変。本日照合の「タイ語学校をソフトパワー除外→NON-ED 誘導」「研究者カテゴリ new for 2026」「e-Visa オンライン対象拡大」は全て既ログ済の運用/文書化レベルで**新規官報発効なし**。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし | thaiembassy.com / thethaiger.com / thai-visa-services.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**扶養家族枠拡大 (親 + 全法定扶養者・上限撤廃 / BOI Por 3/2568) は依然 MOI 告示待ち・未発効** — 本日再照合でも "expanded ... pending Ministry of Interior confirmation / not yet in force" を確認 (現行 = 配偶者 [同性婚含む] + 20 歳未満の子・上限 4 名 = pricing.ts 記載どおり)。10 年構造・保険・USD80k・17% フラット不変 | zagdim.com / lexbangkok.com / aimbangkok.com / hlbthai.com / visaatlas.org |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 650k ($19,950) 据置・再延長/前倒し終了のアナウンスなし・09-30 以降は Gold 900k が最低ティア (差 250k)」を再確認。**残り約 2 ヶ月 = 営業上の唯一の時限要素** | natlawreview.com / thailand-elite.com / thailandelitevisas.com / thailandelite.net / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月年金 65k THB / 1 年更新)。JP 一次照合でも「2026 年時点で基本枠組み (年齢・資金・1 年延長) 維持・審査運用/書類/資金管理の厳格化のみ」を再確認。更新は自動延長でなく毎年審査。健康保険必須は NON-**OA** の別制度で混同しない | longstay-thailand.com / thaiconsulate-visa.jp / jiyuland.com / kyujin.careerlink.asia |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。DTV のタイ語学校除外により NON-ED への誘導圧は継続 (既ログ・新規発効なし) | thethaiger.com |

**継続監視フラグ (未発効 / 要追跡 — 07-26 から変化なし)**:
1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効**。次回 watch でも **官報公布の有無を最優先確認** (公布 = 発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響。
3. **Thailand Privilege Bronze 2026-09-30 期限** — 制度変更ではないが **残り約 2 ヶ月の時限**。再延長 / 前倒し終了のアナウンスを継続監視 (発生時は pricing.ts 要更新)。
4. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-28 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリ (DTV / LTR / Privilege / NON-O リタイア / NON-ED) の料金・中核要件は `lib/walc-data/pricing.ts` と完全一致・修正不要。継続監視フラグは 2026-07-27 から進展なし。**本ランで監視フラグを 1 件追加 (THIM 義務化 = 8 月・制度変更ではないが運用影響あり)**。

> 前回 regulation-watch = 2026-07-27。本 07-28 (火) run は直近 24h を照合 (EN/JP 6 クエリ + TAT 公式ページ全文実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-28 実取得**・ページヘッダ **"Tuesday, July 28 2026"**・記事 published/modified 2026-07-16T10:36-10:37 UTC / 表示 "2 weeks ago" / 閲覧 **20,218** [07-27 の 19,998 から増加 = ライブページ・記事再公開なし]) は依然:

- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「Foreign nationals who enter Thailand before the new measures take effect will be permitted to remain for the duration of their existing permitted stay.」(既入国者の既得滞在は保護 = 顧客案内に使える)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge 反映数値 = **65 カ国対象・内訳 59/2/3** で確定 (本日の全文実取得で 3 日連続再確認):

- 30 日免除 **59** (India / Croatia / Bulgaria / Cyprus / Malta / Maldives + EU27 全) ※India は VoA → 30 日免除へ移行 (平均滞在 7.17 日を根拠に明記)
- 15 日免除 **2** = **Mauritius・Seychelles のみ**
- VoA **3** = Azerbaijan・Belarus・Serbia
- 二国間協定枠 (90 / 30 / 14 日) は別途継続 / TDAC 強化も併記
- 日本は 30 日枠 (+ 現地 30 日延長 1,900 THB で実質 60 日) = 新規影響なし・pricing.ts 影響ゼロ

⚠️ **ノイズ注記 (3 日連続)**: 二次情報に「30 日免除 = **54** カ国」「対象 **93** 国籍から再編」等の異なる数値が混在 (portail-asie / visasnews / travelandtourworld 系)。**TAT 公式全文 (本日実取得) の 59 / 2 / 3・65 カ国を正**とし、他は旧案・別カウント基準・誤記と判断。推測ゼロ原則により pricing/knowledge へは未反映のまま。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-28 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-28 実取得) / nationthailand.com / siam-legal.com / thaich.net |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング [2026-05〜] / e-Visa 必須 2025-01-01〜 / 政府費 10,000 THB)。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変。本日照合の「タイ語学校をソフトパワー除外→NON-ED 誘導」「研究者カテゴリ new for 2026」「e-Visa オンライン申請の対象拡大」は全て既ログ済で**新規官報発効なし**。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし。ノービザ 30 日化が発効すれば DTV の相対優位はむしろ上昇 (営業上のプラス) | thethaiger.com / thaiembassy.com / thai-visa-services.com / siam-legal.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**扶養家族枠拡大 (親 + 全法定扶養者・上限撤廃 / BOI Por 3/2568) は依然 MOI 告示待ち・未発効** — 本日再照合でも "pending Ministry of Interior confirmation / not yet in force / will only apply once implementing regulations are issued by the MOI" を確認 (現行 = 配偶者 + 20 歳未満の子・上限 4 名 = pricing.ts 記載どおり)。10 年構造・保険・USD80k・17% フラット不変 | ltr.boi.go.th (Por 3/2568 原文) / boi.go.th / lexology.com / zagdim.com / aimbangkok.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 650k 据置・再延長 / 前倒し終了のアナウンスなし・09-30 で withdraw → 以後 Gold 900k が最低ティア (差 250k)」を再確認。政府承認 4〜12 週 = **09-30 申込でも承認は 10〜12 月**の運用注意。**残り約 2 ヶ月 = 営業上の唯一の時限要素** | natlawreview.com / thailandelitevisas.com / thailandprivilege.co.th / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月年金 65k THB / 1 年更新)。JP 一次照合でも「2026 年時点で基本枠組み (年齢・資金・1 年延長) 維持・審査運用 / 書類確認 / 資金管理の厳格化のみ」を再確認。健康保険必須は NON-**OA** の別制度で混同しない | longstay-thailand.com / thaiconsulate-visa.jp / jiyuland.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。DTV のタイ語学校除外による NON-ED 誘導圧は継続 (既ログ・新規発効なし) | thethaiger.com |

### 🆕 本日の新規シグナル (制度変更ではない / 運用影響あり)

**THIM (Thailand Immigration Management) アプリの義務化が 8 月開始と報道**。2026-06 導入時は voluntary pilot だったが、複数ソースが「**mandatory compliance across all Thai entry checkpoints begins August 2026**」と報道 (TDAC を THIM 経由で生成)。

- **判定**: 5 ビザカテゴリの制度・料金には**影響なし** (TDAC 必須化自体は 2025-05-01 TM6 廃止で既知・全ビザ共通) → **pricing.ts / knowledge.ts の修正不要・Owner 通知不要**。
- **ただし運用影響あり**: 8 月以降の渡航顧客への案内 (アプリ DL / パスポート読取 / 日本語対応済) と空港イミグレサポートの説明に反映余地。TAT 公式リリース (2026-06-11) は義務化日を明記しておらず、**義務化日の公式確定は未確認** → 推測ゼロ原則で日付を断定しない。
- **WALC 活用 (P3・任意)**: LINE FAQ / 渡航前チェックリストに「THIM アプリで TDAC を事前生成 (日本語対応)」を追記候補。
- 出典: nationthailand.com (before August launch) / siam-legal.com / thaiembassy.com / thim.in.th / tatnews.org (2026-06-11 公式)

**継続監視フラグ (未発効 / 要追跡)**:

1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (07-27 から変化なし)。次回 watch でも **官報公布の有無を最優先確認** (公布 = 発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響。
3. **Thailand Privilege Bronze 2026-09-30 期限** — 制度変更ではないが **残り約 2 ヶ月の時限**。再延長 / 前倒し終了のアナウンスを継続監視 (発生時は pricing.ts 要更新)。承認 4〜12 週のリードタイムも訴求材料。
4. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。
5. **🆕 THIM 義務化 (8 月)** — 制度変更ではないが運用影響。**義務化開始日の公式確定 (Immigration Bureau / TAT) を次回以降確認**。確定すれば LINE FAQ・渡航前チェックリストへ反映 (P3)。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-29 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリ (DTV / LTR / Privilege / NON-O リタイア / NON-ED) の料金・中核要件は `lib/walc-data/pricing.ts` と完全一致・修正不要。**本ランで監視フラグを 1 件追加 (指紋ベース犯罪経歴証明 = 制度変更だが 5 カテゴリの料金・中核要件に影響なし)**。

> 前回 regulation-watch = 2026-07-28。本 07-29 (水) run は直近 24h を照合 (EN/JP/TH 8 クエリ + TAT 公式ページ全文実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-29 実取得**・ページヘッダ **"Wednesday, July 29 2026"**・記事 published/modified 2026-07-16T10:36-10:37 UTC / 表示 "2 weeks ago" / 閲覧 **20,373** [07-28 の 20,218 から増加 = ライブページ・記事再公開なし]) は依然:

- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「Foreign nationals who enter Thailand before the new measures take effect will be permitted to remain for the duration of their existing permitted stay.」(既入国者の既得滞在は保護 = 顧客案内に使える)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge 反映数値 = **65 カ国対象・内訳 59/2/3** で確定 (本日の全文実取得で 4 日連続再確認):

- 30 日免除 **59** (India / Croatia / Bulgaria / Cyprus / Malta / Maldives + EU27 全) ※India は VoA → 30 日免除へ移行 (平均滞在 7.17 日を根拠に明記)
- 15 日免除 **2** = **Mauritius・Seychelles のみ**
- VoA **3** = Azerbaijan・Belarus・Serbia
- 二国間協定枠 (90 / 30 / 14 日) は別途継続 / TDAC 強化も併記
- 日本は 30 日枠 (+ 現地 30 日延長 1,900 THB で実質 60 日) = 新規影響なし・pricing.ts 影響ゼロ

⚠️ **ノイズ注記 (4 日連続)**: 二次情報に「30 日免除 = **54** カ国」「対象 **93** 国籍から再編」「15 日 = 3 カ国」等の異なる数値が混在 (portail-asie / visasnews / visasupdate / oravisa 系)。**TAT 公式全文 (本日実取得) の 59 / 2 / 3・65 カ国を正**とし、他は旧案・別カウント基準・誤記と判断。推測ゼロ原則により pricing/knowledge へは未反映のまま。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-29 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-29 実取得) / nationthailand.com / thaiembassy.com / siam-legal.com |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング or 月収 50k×6 ヶ月 / e-Visa 必須・IP/GPS クロスチェックでタイ国内申請不可 / 政府費 10,000 THB)。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変。本日照合の「2026 厳格化 = シーズニング徹底・語学学校をソフトパワー除外→NON-ED 誘導・居住証明 (申請国での賃貸/公共料金/免許) の文書要件化・rejection 率上昇」は**全て既ログの運用/文書化レベルで新規官報発効なし**。ムエタイ registered camp 有効 = WALC ソフトパワープラン影響なし。ノービザ 30 日化が発効すれば DTV の相対優位はむしろ上昇 (営業上のプラス) | thethaiger.com / thaiembassy.com / thai-visa-services.com / siam-legal.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**扶養家族枠拡大 (親 + 全法定扶養者・上限撤廃 / BOI Por 3/2568) は依然 MOI 告示待ち・未発効** — 本日再照合でも "pending Ministry of Interior confirmation / will apply only after the MOI and Immigration Bureau issue the necessary implementing regulations" を確認 (現行 = 配偶者 + 20 歳未満の子・上限 4 名 = pricing.ts 記載どおり)。10 年構造・保険・USD80k・17% フラット不変 | prnewswire (BOI 公式リリース) / boi.go.th / hlbthai.com / zagdim.com / aimbangkok.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 650k 据置・09-30 で申込窓口 close → 以後 Gold 900k が最低ティア (差 250k)・政府承認 4〜12 週・支払いは承認後」を再確認。前倒し終了 / 再延長のアナウンスなし。**残り約 2 ヶ月 = 営業上の唯一の時限要素** (09-30 申込でも承認は 10〜12 月の運用注意) | natlawreview.com / thailandelitevisas.com / thailandelite.net / siam-legal.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月年金 65k THB / 1 年更新)。JP 一次照合でも「2026 年時点で基本枠組み (年齢・資金・1 年延長) に変更なし・審査運用 / 書類確認 / 資金の動きの確認が厳格化のみ」を再確認。健康保険必須は NON-**OA** の別制度で混同しない | longstay-thailand.com / jiyuland.com / thailand-ijyunavi.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。DTV のタイ語学校除外による NON-ED 誘導圧は継続 (既ログ・新規発効なし) | thethaiger.com / thai-visa-services.com |

### 🆕 本日の新規シグナル (制度変更 / ただし 5 カテゴリの料金・中核要件に影響なし)

**指紋ベースの犯罪経歴証明が必須化 (名前検索の廃止)**。Royal Thai Police 犯罪記録課 (Criminal Records Division) が **2026 年 7 月付**で、9 カテゴリの申請について犯罪経歴照会を**指紋ベースのみ**とし、氏名検索を廃止。**外国人による犯罪経歴照会 (第 9 分類)** および **Immigration Bureau 関連 (永住権・滞在延長 = 第 3 分類)** を含む。申請には所管官庁/組織の公式レターが必要。

- **判定**: **WALC 5 カテゴリ (DTV / LTR / Privilege / NON-O リタイア / NON-ED) の料金・中核要件には影響なし** → **pricing.ts / knowledge.ts の修正不要・Owner 通知不要**。DTV / リタイア / Privilege の標準フローは犯罪経歴証明を要求しない。
- **ただし運用影響あり (限定)**: 永住権 (PR)・タイ国籍・就労関連など**犯罪経歴証明を要する派生案件**では、指紋採取のためバンコク (Royal Thai Police Clearance Service Center / Pathum Wan) 出頭とリードタイムが必要。該当相談が来た場合の案内文言に反映余地。
- 一次報道は 2026-07-19 (Nation Thailand / The Star)。**本 watch で初検知 = 07-19〜07-28 のランで拾えていなかった漏れ**。以後「police clearance / criminal record」系キーワードを日次クエリに追加すること (改善メモ)。
- 出典: nationthailand.com (40068808) / thestar.com.my (2026-07-19) / visasupdate.com / thailawonline.com / siam-legal.com

**(参考・5 カテゴリ外)** 2026-07-01 発効の **E-Work Permit 仮就労許可証** (承認即時に Temporary Work Permit 発給)、2026-07-14 閣議承認の**移民労働者約 77 万人の就労許可延長**、2026-05-27 からの**エボラ水際強化 (DRC / ウガンダ発は 21 日隔離)** を確認。いずれも WALC 取扱 5 カテゴリの料金・要件に影響なし → 未ログ扱い (本項に参考記載のみ)。

**継続監視フラグ (未発効 / 要追跡)**:

1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (07-28 から変化なし)。次回 watch でも **官報公布の有無を最優先確認** (公布 = 発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響。
3. **Thailand Privilege Bronze 2026-09-30 期限** — 制度変更ではないが **残り約 2 ヶ月の時限**。再延長 / 前倒し終了のアナウンスを継続監視 (発生時は pricing.ts 要更新)。承認 4〜12 週のリードタイムも訴求材料。
4. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。
5. **THIM 義務化 (8 月)** — 制度変更ではないが運用影響。**義務化開始日の公式確定 (Immigration Bureau / TAT) は本日時点でも未確認** (二次情報は "August 2026 mandatory" で一致、TAT 公式 2026-06-11 リリースは日付明記なし)。確定すれば LINE FAQ・渡航前チェックリストへ反映 (P3)。
6. **🆕 指紋ベース犯罪経歴証明の必須化 (2026-07 発効)** — 5 カテゴリ影響なし。PR / 国籍 / 就労系の派生相談での案内リードタイムに反映余地 (P3)。運用細則の追加告示を継続監視。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-30 検証ログ (新規変更なし)

**結論**: **発効済みの新規制度変更ゼロ** → Owner 通知なし (変更なし基準)。全 5 カテゴリ (DTV / LTR / Privilege / NON-O リタイア / NON-ED) の料金・中核要件は `lib/walc-data/pricing.ts` と完全一致・修正不要 (本日 pricing.ts 実読で DTV 60k/45k/48k・Privilege 650k/900k/1.5M/2.5M/5M・リタイア 80 万 THB / 月年金 65k を逐条照合)。**本ランで監視フラグを 1 件追加 (国外送還規則 = 制度新設だが 5 カテゴリの料金・中核要件に影響なし)**。

> 前回 regulation-watch = 2026-07-29。本 07-30 (木) run は直近 24h を照合 (EN/JP/TH 8 クエリ + TAT 公式ページ全文実取得)。**最優先確認事項 = ノービザ 30 日化の官報公布有無** → 本日時点でも未公布。

### ✅ 最優先確認: 官報公布なし (TAT 公式を本日実取得)

TAT Newsroom 公式 (`/2026/07/thai-cabinet-approves-updated-visa-measures-pending-royal-gazette-publication/`・**本日 2026-07-30 実取得**・ページヘッダ **"Thursday, July 30 2026"**・記事 published/modified 2026-07-16T10:36-10:37 UTC / 表示 "2 weeks ago" / 閲覧 **20,506** [07-29 の 20,373 から増加 = ライブページ・記事再公開なし]) は依然:

- 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication.」
- 「Until the new measures take effect, **current entry conditions remain in place**.」(現行 60 日継続)
- 「Foreign nationals who enter Thailand before the new measures take effect will be permitted to remain for the duration of their existing permitted stay.」(既入国者の既得滞在は保護 = 顧客案内に使える)
- 「TAT will provide further updates once the measures are officially published in the Royal Gazette.」

→ 07-16 詳報から新情報なし・**官報公布は本日も未発生**。公布時 knowledge 反映数値 = **65 カ国対象・内訳 59/2/3** で確定 (本日の全文実取得で 5 日連続再確認):

- 30 日免除 **59** (India / Croatia / Bulgaria / Cyprus / Malta / Maldives + EU27 全) ※India は VoA → 30 日免除へ移行 (平均滞在 7.17 日を根拠に明記)
- 15 日免除 **2** = **Mauritius・Seychelles のみ**
- VoA **3** = Azerbaijan・Belarus・Serbia
- 二国間協定枠 (90 / 30 / 14 日) は別途継続 / TDAC 強化 (省庁 DB 連携・出発時点リスク評価) も併記
- 日本は 30 日枠 (+ 現地 30 日延長 1,900 THB で実質 60 日) = 新規影響なし・pricing.ts 影響ゼロ

⚠️ **ノイズ注記 (5 日連続)**: 二次情報に「30 日免除 = **54** カ国」「対象 **93** 国籍から再編」「15 日 = 3 カ国」等の異なる数値が混在 (oravisa / insubuy / visasupdate / travelandtourworld / lexbangkok 系)。**TAT 公式全文 (本日実取得) の 59 / 2 / 3・65 カ国を正**とし、他は旧案・別カウント基準・誤記と判断。推測ゼロ原則により pricing/knowledge へは未反映のまま。

⚠️ **日付ノイズ**: タイ語官庁系 (PRD foreign.prd.go.th) は 7 月分の閣議承認日を **2569-07-14 (2026-07-14)** と記載、TAT 公式リリースは **2026-07-16** 付。5 月 (2026-05-19) の第 1 次承認 → 7 月 (07-14 閣議 / 07-16 TAT 公表) の詳細確定、という二段構成として整理 (既ログと矛盾なし)。**いずれにせよ官報公布はまだ = 発効カウント未開始**。

### 他カテゴリ検証 (発効済み新規変更なし)

| カテゴリ | 検証結果 | 出典 (主) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効** (上記 TAT 公式 07-30 実取得で "pending Royal Gazette publication" 維持・現行 60 日継続) | tatnews.org (公式・07-30 実取得) / foreign.prd.go.th (タイ政府 PR 局) / consular.mfa.go.th / jetro.go.jp / thaich.net |
| DTV | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング / e-Visa 必須・IP/GPS クロスチェックでタイ国内申請不可 / 政府費 10,000 THB)。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変。本日照合の「語学学校をソフトパワー除外→NON-ED 誘導」「500k シーズニング厳格化・90 日以内の一括入金は systematic rejection」「rejection 率上昇 (曖昧なフリーランス書類・短期/未承認プログラム)」は**全て既ログの運用/文書化レベルで新規官報発効なし**。ノービザ 30 日化が発効すれば DTV の相対優位は上昇 (thethaiger も同旨) | thethaiger.com / thaiembassy.com / thai-visa-services.com / siam-legal.com |
| LTR / HSP + 扶養枠 | 変更なし。中核要件緩和 (WGC 所得撤廃・HSP/WFTP 職歴撤廃) は 2025-02-04 発効済。**扶養家族枠拡大 (親 + 全法定扶養者・人数上限撤廃) は依然 MOI 告示待ち・未発効** — 本日再照合でも "will take effect following the official BOI announcement and the Ministry of Interior's announcement / not yet in effect / only apply once implementing regulations are issued by the MOI" を確認 (現行 = 配偶者 + 20 歳未満の子・上限 4 名 = pricing.ts 記載どおり)。扶養者の預金要件 USD 25,000 も既知。10 年構造・保険・USD80k・17% フラット不変 | prnewswire (BOI 公式リリース) / boi.go.th (press_releases 136393) / kpmg.com (flash alert) / aimbangkok.com / zagdim.com |
| Thailand Privilege | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k・Platinum 1.5M・Diamond 2.5M・Reserve 5M = pricing.ts 完全一致)。本日照合でも「Bronze 650k net・09-30 まで・政府承認 4〜12 週 (国籍により変動)・支払いは承認後 = 前払リスクなし・この価格帯は 09-30 以降保証なし」を再確認。前倒し終了 / 再延長のアナウンスなし。**残り約 2 ヶ月 = 営業上の唯一の時限要素** (09-30 申込でも承認は 10〜12 月) | natlawreview.com / thailandelitevisas.com / siam-legal.com / thaiembassy.com |
| NON-O リタイア | 変更なし (50 歳以上 / 残高 80 万 THB・3 ヶ月維持 or 月年金 65k THB / 1 年更新)。JP 一次照合でも「2026 年時点で基本枠組みに大きな変更なし・審査運用 / 資金準備タイミング / 口座管理 / 書類整合性の厳格化のみ」を再確認。更新後 3 ヶ月 80 万 THB 維持 → 以後 6 ヶ月 40 万 THB 以上維持の資金ルールも既知。健康保険必須は NON-**OA** (国外取得) の別制度で、タイ国内取得・更新の「カテゴリー O」は対象外 = 混同しない | longstay-thailand.com / thaiconsulate-visa.jp / jiyuland.com / thailandpicks.com |
| 学生 NON-ED | 変更シグナルなし (WALC 非推奨カテゴリ)。DTV のタイ語学校除外による NON-ED 誘導圧は継続 (既ログ)。2025〜2026 の運用強化 (出席率 80% 要件・学校の月次出席報告義務・スポットチェック・違反校のライセンス失効) も既知レベルで**新規発効なし** | thailawonline.com / thai-visa-services.com / thaivisaexpert.com |

### 🆕 本日の新規シグナル (制度新設 / ただし 5 カテゴリの料金・中核要件に影響なし)

**タイ初の「国外送還 (deportation) 規則」が閣議承認 (2026-07-14)**。首相府規則 (Prime Minister's Office regulation) の**草案**として承認。従来、送還を所管する正式な行政規則が存在せず省庁間調整に空白があった問題への対応。

- **送還 6 事由**: ① 不法入国・不法滞在 ② 外国人労働法違反の就労 ③ 外国人事業法違反の事業 ④ 公文書偽造・偽造公文書の使用 ⑤ **法定刑 3 年以上の罪の犯行** ⑥ ①〜⑤ の主犯・教唆・支援。
- **手続**: 矯正局長 → 内務省次官 (または指定官) → 内務大臣が遅滞なく送還命令を検討、内務省が本国送還を手配。
- **判定**: **WALC 5 カテゴリ (DTV / LTR / Privilege / NON-O リタイア / NON-ED) の料金・中核要件には影響なし** → **pricing.ts / knowledge.ts の修正不要・Owner 通知不要**。適法に滞在する顧客に新たな義務・費用は発生しない。
- **ただし運用影響あり (限定)**: 顧客案内の「オーバーステイ / 不法就労のリスク」説明を**より強い表現で裏付けられる**材料になる (従来の罰金・ブラックリストに加え、正式な送還手続が整備される方向)。特に「ノービザ往復での実質就労」「無許可のリモートワーク相談」への抑止説明に使える → **DTV 正規化提案の補強材料 (営業上のプラス)**。
- **ステータス注記**: 閣議承認は**草案 (draft)** 段階。官報公布・施行日は本日時点で未確認 → **推測ゼロ原則で施行日を断定しない**。
- 一次報道は 2026-07-14〜17 (Khaosod English / Nation Thailand / Bangkok Post)。**本 watch で初検知 = 07-14〜07-29 のランで拾えていなかった漏れ** (07-29 の「指紋ベース犯罪経歴証明」と同種の取りこぼし)。以後 **"deportation / 送還 / Immigration Act amendment / PM Office regulation" 系キーワードを日次クエリに追加**すること (改善メモ)。
- 出典: khaosodenglish.com (2026-07-14) / nationthailand.com (40068647) / bangkokpost.com (3285949) / luther-lawfirm.com (July 2026 newsflash) / eng.mizzima.com (2026-07-17)

**継続監視フラグ (未発効 / 要追跡)**:

1. **ノービザ 30 日化** — 依然 **官報未掲載・未発効** (07-29 から変化なし)。次回 watch でも **官報公布の有無を最優先確認** (公布 = 発効 15 日前カウント開始 → 検知→Owner 通知に切替)。
2. **LTR 扶養家族枠の拡大** — MOI 後続告示待ち・未発効。発効すれば pricing.ts「扶養家族追加 (最大 4 名)」に影響。
3. **Thailand Privilege Bronze 2026-09-30 期限** — 制度変更ではないが **残り約 2 ヶ月の時限**。再延長 / 前倒し終了のアナウンスを継続監視 (発生時は pricing.ts 要更新)。承認 4〜12 週のリードタイムも訴求材料。
4. **(メモ) DTV 将来改定案** — proposals 段階・公式未確認・推測ゼロで監視のみ。
5. **THIM 義務化 (8 月)** — 制度変更ではないが運用影響。二次情報は「8 月から全入国審査場で mandatory」で一致 (現在は voluntary pilot・8 月までは THIM / TDAC web どちらも有効) だが、**Immigration Bureau / TAT 公式による義務化開始日の明示は本日時点でも未確認**。**8 月に入るため次回以降は最優先で公式確認** (確定すれば LINE FAQ・渡航前チェックリストへ反映 P2 に昇格)。
6. **指紋ベース犯罪経歴証明の必須化 (2026-07 発効)** — 5 カテゴリ影響なし。PR / 国籍 / 就労系の派生相談での案内リードタイムに反映余地 (P3)。運用細則の追加告示を継続監視。
7. **🆕 国外送還規則 (2026-07-14 閣議承認・草案)** — 5 カテゴリ影響なし。**官報公布・施行日の確定を継続監視**。確定後、LINE FAQ「オーバーステイ / 不法就労のリスク」節の裏付けを更新 (P3)。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-07-31 検証ログ (新規の発効済み制度変更なし)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` / `knowledge.ts` 修正不要**。
ただし **WALC 側の文言に 1 件の不整合を検出** (制度変更ではなく自社コピーの陳腐化 / 下記 🟠 P1)。

### 全 5 カテゴリ 逐条照合結果

| カテゴリ | 判定 | 主要ソース (本日実取得) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効**。TAT 公式を本日実取得 (ページヘッダ **"Friday, July 31 2026"** / 記事 modified 2026-07-16 / 閲覧 **20,672**) → **"pending Royal Gazette publication"・現行 60 日継続**。内訳 **65 カ国 / 30 日 59 (India・Croatia・Bulgaria・Cyprus・Malta・Maldives 含む・EU27 統一) / 15 日 Mauritius・Seychelles の 2 / VoA Azerbaijan・Belarus・Serbia の 3** を **6 日連続**で全文再確認。二次情報の「54 カ国」「93 国籍」「15 日 3 カ国」は**未反映** (推測ゼロ)。TAT 本文で **TDAC 高度化 (出入国記録の照合・省庁 DB 連携・出発時点のリスク評価)** も明記 | tatnews.org (公式・07-31 実取得) |
| **DTV** | 変更なし (5 年マルチ / 180 日 +180 延長 / 残高 500k・3 ヶ月シーズニング / e-Visa 必須 / 政府費 10,000 THB)。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変。本日照合の「タイ語学校のソフトパワー除外 (2025 年〜・大使館へ却下指示)」「startup founder / academic researcher の新カテゴリ追加」「500k シーズニング厳格化」「rejection 率上昇」は**いずれも二次情報 (Thaiger / thai-visa-services / Lexology) で MFA 一次公表を未確認・新規官報発効なし** → 採用せず監視のみ。**ムエタイ・料理・スポーツ・医療・セミナー等のソフトパワー適格は維持** = WALC の DTV ソフトパワー商品に影響なし | thethaiger.com / thai-visa-services.com / lexology.com / muaythaivisathailand.com |
| **LTR** | 変更なし。**扶養家族枠拡大 (親 + 全法定扶養者・人数上限撤廃 / BOI 告示 Por 3/2568) は依然 MOI 告示待ち・未発効**を本日再確認 ("confirmed but not yet in force / a Ministry of Interior announcement is still required")。現行 = 配偶者 + 20 歳未満の子・上限 4 名 = `pricing.ts` 記載どおり。10 年構造 / USD80k / 17% フラット / 保険要件 不変 | zagdim.com (KPMG / BOI Por 3/2568 引用) / hlbthai.com / lexbangkok.com |
| **Thailand Privilege** | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = `pricing.ts` 完全一致)。本日照合で **「09-30 以降 Bronze は廃止 → 最下位が Gold 900k = 実質 +250,000 THB」** を明示するソース複数を再確認。再延長 / 前倒し終了のアナウンスなし。**残り約 2 ヶ月 = 唯一の時限要素** | thailandelitevisas.com / siam-legal.com / thaireloservices.com |
| **NON-O リタイア** | 変更なし (50 歳以上 / 残高 80 万 THB or 月年金 65k THB / 1 年更新)。「2026 年に 80 万 THB 要件そのものの変更なし・審査運用と資金維持期間 (申請前 2〜3 ヶ月 / 承認後 3 ヶ月) の厳格化のみ」を再確認。健康保険必須は NON-**OA** (国外取得) の別制度 = 混同しない (既ログどおり) | siam-legal.com / thailawonline.com / thethaiger.com |
| **学生 NON-ED** | 変更シグナルなし (WALC 非推奨カテゴリ)。DTV のタイ語学校除外による NON-ED 誘導圧は継続 (既ログ) | thai-visa-services.com |

### 🟠 P1 内部整合フラグ (制度変更ではない / WALC 自社コピーの陳腐化)

`lib/walc-data/pricing.ts` の **`VISA_STUDENT.bookingNote`** に以下の記述:

> 「同じ**「ムエタイ・語学学習」**目的なら DTV ソフトパワー (60,000 THB / 5 年) が圧倒的に費用対効果が高いため、問合せ時はそちらをご案内します。」

**問題**: **タイ語学習は DTV ソフトパワーの適格活動から除外済** (MFA がタイ語学習を「文化交流」ではなく「正規教育」に分類し、大使館へ却下指示 / 2025 年〜)。したがって「語学学習目的なら DTV ソフトパワー」は**現行運用と矛盾**し、そのまま案内すると **DTV 却下 → 顧客クレームのリスク**がある。ムエタイ・料理・スポーツ等は適格のため**「ムエタイ」部分は正しい**。

**判定**: 本日の新規制度変更ではない (2025 年からの運用) が、**過去ランで未検出の自社コピー不整合** → 制度変更ではないため **Owner LINE Push はせず**、次回 Owner 確認事項として記録。
**推奨対応 (要 Owner 承認 / 一次情報の裏取り後)**:
1. `VISA_STUDENT.bookingNote` の「ムエタイ・語学学習」→ **「ムエタイ・タイ料理・スポーツ等のソフトパワー活動」** に修正し、**タイ語学習のみを目的とする場合は NON-ED が正規ルート**と明記する。
2. 実施前に **MFA / タイ王国大使館の一次公表**でタイ語学校除外を確認 (現時点は二次情報のみ = RULE-NO-SPECULATION により自動修正はしない)。
3. LINE 自動応答 / LP に同種の「語学学習 → DTV」表現がないか横断点検。

### 継続監視フラグ

1. **ノービザ 30 日化の官報公布** — 依然未掲載 (6 日連続)。公布 = 発効 15 日前カウント開始 → 検知即 Owner 通知に切替。
2. **LTR 扶養家族枠の拡大** — MOI 告示待ち・未発効。発効すれば `pricing.ts`「扶養家族追加 (最大 4 名)」を更新。
3. **Thailand Privilege Bronze 2026-09-30 期限** — 残り **2 ヶ月**。承認 4〜12 週のため **実質の申込リミットは 8 月中**。営業上の最優先訴求。
4. **DTV 改定案** — 「タイ語学校除外」「startup founder / academic researcher 追加」は二次情報のみ。**MFA 一次情報での裏取りを次回タスク化** (上記 P1 と連動)。
5. **THIM 義務化 (8 月)** — **明日 8/1 突入**。Immigration Bureau 一次発表 (Nation 2026-06-07 / Pol Maj Gen Pratchaya Prasansuk) では **"official full launch is scheduled for August 2026"** までが公式表現で、**「義務化 (mandatory)」「開始日」は Immigration Bureau / TAT 公式で本日時点も未確認** (mandatory 表現は Siam Legal 等の二次情報)。**次回ランの最優先確認項目**。
6. **指紋ベース犯罪経歴証明 (2026-07 発効)** — 5 カテゴリ影響なし。運用細則の追加告示を監視。
7. **国外送還規則 (2026-07-14 閣議承認・草案)** — 官報公布・施行日を監視。本日時点で公布確認なし。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-08-01 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。
前ランの最優先確認項目だった **THIM 義務化 (8/1 突入)** を一次ソースで検証した結果、**「義務化」は公式未確認 = 二次情報のみ**と確定。**顧客案内で「8/1 から THIM 必須」と言ってはいけない**(下記 🟠 P1)。

### 全 5 カテゴリ 逐条照合結果

| カテゴリ | 判定 | 主要ソース (本日実取得) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効**。TAT 公式記事を本日実取得 (ページヘッダ **"Saturday, August 1 2026"** / 記事 modified 2026-07-16 / 閲覧 **20,815** ← 07-31 時点 20,672 = 新規改訂なしのまま閲覧のみ増加) → **"remain pending publication in the Royal Gazette"・"current entry conditions remain in place"**。内訳 **65 カ国・地域 / 30 日 59 (India・Croatia・Bulgaria・Cyprus・Malta・Maldives 含む・EU27 統一) / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia** を **7 日連続**で全文再確認。**発効 = 官報掲載の 15 日後**、既入国者は既得の滞在期限まで有効 (経過措置) も明記 | tatnews.org (公式・08-01 実取得) / nationthailand.com 40068630 (07-14 閣議・07-15 modified) |
| **DTV** | 変更なし (5 年マルチ / 1 回 180 日 + 180 日延長 / 残高 500,000 THB / e-Visa / 20 歳以上)。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変。二次情報が言う「タイ語学校のソフトパワー除外」「academic researcher / startup founder 追加」は**本日も MFA 一次公表を確認できず**・新規官報発効なし → **採用せず監視継続**。ムエタイ・料理・スポーツ等のソフトパワー適格は維持 = WALC の DTV 商品に影響なし | thai-visa-services.com / thethaiger.com / thaiembassy.com (いずれも二次) |
| **LTR** | 変更なし。**扶養家族枠拡大 (親 + 全法定扶養者・人数上限撤廃 / BOI 告示 Por 3/2568) は依然 MOI 告示待ち・未発効**を本日再確認 ("confirmed but not yet in force — a Ministry of Interior announcement is still required")。現行 = 配偶者 (同性婚含む) + 20 歳未満の子・上限 4 名 = `pricing.ts` 記載どおり。10 年構造 / 政府費 50,000 THB / 17% フラット 不変 | zagdim.com (KPMG / BOI Por 3/2568 引用) / hlbthai.com / silklegal.com |
| **Thailand Privilege** | 変更なし (Bronze 650,000 THB・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = `pricing.ts` 完全一致)。再延長・前倒し終了のアナウンスなし。背景審査 **4〜8 週** (ソースにより 4〜12 週) の記載を再確認 | thailandelitevisas.com / natlawreview.com (プレスリリース) / thaireloservices.com / siam-legal.com |
| **NON-O リタイア** | 変更なし (50 歳以上 / 残高 800,000 THB or 月収入・年金 65,000 THB or 合算年 800,000 THB / 1 年更新)。**800,000 THB 要件は 2008 年以来据置・2026 年の変更発表なし**を再確認。健康保険必須は NON-**OA** の別制度 = 混同しない (既ログどおり) | thethaiger.com / siam-legal.com / thailawonline.com |
| **学生 NON-ED** | 変更シグナルなし (WALC 非推奨カテゴリ) | thai-visa-services.com |

### 🟠 P1 更新: THIM 義務化は「公式未確認」で確定 (顧客案内の事故防止)

**一次ソース (TAT Newsroom 公式 / 2026-06-11 / 本日実取得) の正確な表現**:
- 「Immigration Bureau が THIM の **pilot access** を開放。**official launch is expected in August 2026**」
- 「**During the pilot phase, THIM is an optional app**」
- 「**THIM is not an additional arrival-card requirement and does not replace TDAC at this stage**」
- 「Foreign visitors should **continue to complete the TDAC** as required by the Immigration Bureau」
- 「TAT will provide further updates **when the Immigration Bureau confirms** additional THIM functions, **implementation dates**, or any changes to traveller requirements」

**判定**: 本日 8/1 時点で **TAT 公式サイトに THIM の新規発表・義務化告知は掲載なし** (トップの Latest Updates / Visitor Information カテゴリを実取得して確認)。
一方、**二次情報 (Siam Legal / Wego / ThaiEmbassy.com / Travel And Tour World 等) は「Mandatory compliance across all Thai entry checkpoints begins August 2026」「10/1 から追加機能」と断定**しており、一次と二次で明確に乖離。

**WALC 推奨対応 (即時・自動修正不要 / 案内トークの統制のみ)**:
1. LINE 自動応答・LP・営業トークで **「8 月から THIM 必須」と断定しない**。正しい案内は「**TDAC が引き続き必須。THIM は任意 (TDAC を代替しない)。義務化時期は Immigration Bureau の正式発表待ち**」。
2. THIM は**入国時の到着登録レイヤー**であり、**DTV / LTR / Privilege / NON-O / NON-ED の取得要件・料金には影響しない** → `pricing.ts` 修正不要。
3. 将来の THIM 拡張機能 (90 日レポート・オンライン申請・予約) が正式化されれば **WALC のリタイア顧客の更新業務フローに直撃** → 発表を継続監視。

### 継続監視フラグ (優先順)

1. **Privilege Bronze 2026-09-30 期限** — 残り **60 日**。審査 4〜8 週 → **実質の申込リミットは 8 月中**。09-30 以降は最下位が Gold 900k = **実質 +250,000 THB**。**今月が営業訴求の最優先材料**(制度変更ではなく確定済みの時限要素)。
2. **ノービザ 30 日化の官報公布** — 依然未掲載 (7 日連続)。公布 = 発効 15 日前カウント開始 → **検知即 Owner 通知**に切替。
3. **THIM 義務化の Immigration Bureau 正式発表** — 8 月中の発表可能性が最も高い。TAT 公式の更新を毎日確認。
4. **LTR 扶養家族枠の拡大** — MOI 告示待ち・未発効。発効すれば `pricing.ts`「扶養家族追加 (最大 4 名)」を更新。
5. **DTV 改定 (タイ語学校除外 / 新カテゴリ追加)** — 二次情報のみ。MFA 一次裏取りを継続 (前ランの `VISA_STUDENT.bookingNote` 修正提案と連動・Owner 承認待ち)。
6. **指紋ベース犯罪経歴証明 (2026-07 発効)** — 5 カテゴリ影響なし。運用細則の追加告示を監視。
7. **国外送還規則 (2026-07-14 閣議承認・草案)** — 官報公布・施行日を監視。本日時点で公布確認なし。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-08-02 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。

### 全 5 カテゴリ + 継続監視フラグ 照合結果

| 項目 | 判定 | 主要ソース (本日確認) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効**。TAT 公式 (05-21 記事) を本日 web_fetch 実取得 → 「revised entry conditions will apply **15 days after publication in the Royal Gazette**」「Until the revised measures take effect, **current entry conditions remain in place**」を原文で再確認。**官報公布の報道・公示は本日も検出ゼロ** = 現行 60 日継続 (8 日連続) | tatnews.org (公式・08-02 web_fetch 実取得) |
| **THIM 義務化** | **公式未確認のまま (8/2 時点)**。検索結果は依然 06 月時点の二次情報 (「Mandatory begins August 2026」= Siam Legal / ThaiEmbassy 等) のみで、**Immigration Bureau / TAT の新規義務化告知は 8/2 時点で未検出**。前ラン確定の案内トーク統制を継続: 「TDAC は必須・THIM は任意 (TDAC を代替しない)・義務化時期は正式発表待ち」 | tatnews.org (06-11 記事のみ) / siam-legal.com / thaiembassy.com (二次) |
| **DTV** | 変更なし。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k)・5 年マルチ / 180 日構造は不変。「タイ語学校除外」「academic researcher 追加」は**本日も二次情報のみ (Thaiger / thai-visa-services / Siam Legal)・MFA 一次未確認** → 採用せず監視継続。`VISA_STUDENT.bookingNote` 修正は Owner 承認待ちのまま | thethaiger.com / thai-visa-services.com (二次) |
| **LTR** | 変更なし。**扶養枠拡大 (親 + 法定扶養者・人数無制限) は "confirmed but not yet in force — MOI announcement still required" を本日再確認 = 未発効**。現行 = 配偶者 + 20 歳未満の子・上限 4 名 = pricing.ts どおり。※一部二次ソースに「dependent fee THB 10,000/人」記載あり — pricing.ts の 50,000 THB (政府費・10 年) と粒度が異なる可能性 (5 年分割納付等) があり**一次 (BOI ltr.boi.go.th) 未確認のため不採用・要注意メモのみ** | zagdim.com / hlbthai.com / visaatlas.org (二次) |
| **Thailand Privilege** | 中核変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = pricing.ts 完全一致)。🆕 **時限プロモ 2 件を検出 (価格改定ではない)**: ① 家族追加が Platinum/Diamond/Reserve で **750,000 THB/人・2026-08-14 まで** ② 旧 Elite 会員のアップグレードオファー **申込 08-31 締切**。いずれも二次ソースのため取次時に Thailand Privilege 公式で要確認。Bronze は審査 4〜8 週 → **「8 月中旬までに申込 + デポジット」推奨の明記をソースで確認** = 実質リミットがさらに手前倒し | thailandelitevisas.com / siam-legal.com / bangkokpost.com (PR) |
| **NON-O リタイア** | 変更なし (50 歳 / 80 万 THB or 月 65k)。2026 年の要件変更発表なし | siam-legal.com 他 |
| **学生 NON-ED** | 変更シグナルなし | — |
| **国外送還規則** | **依然ドラフト・官報未公布**。07-14 閣議承認後の続報 = Asylum Access 等の見直し要求声明・Bangkok Post 論説のみ。「moving toward finalization and publication in the Royal Gazette」段階 = 施行日未確定 | nationthailand.com / khaosodenglish.com / bangkokpost.com |

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Bronze 09-30 期限** — 残り 59 日・審査 4〜8 週 → **実質申込リミットは 8 月中旬**。🆕 家族追加プロモ 750k は **08-14 締切 = 残り 12 日** (営業訴求は本日が実質最終週レンジ)。
2. **ノービザ 30 日化の官報公布** — 未掲載 8 日連続。検知即 Owner 通知。
3. **THIM 義務化の正式発表** — 8 月中の発表可能性大。TAT / Immigration Bureau 公式を毎日確認。
4. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば pricing.ts「最大 4 名」更新。
5. **DTV 改定 (タイ語学校除外等)** — MFA 一次裏取り継続 (VISA_STUDENT.bookingNote 修正は Owner 承認待ち)。
6. **指紋ベース犯罪経歴証明** — 運用細則監視。
7. **国外送還規則** — 官報公布・施行日監視 (本日も未公布)。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-08-03 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。

### 全 5 カテゴリ + 継続監視フラグ 照合結果

| 項目 | 判定 | 主要ソース (本日確認) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効**。TAT 公式 07-16 記事を本日 web_fetch 実取得 (ページヘッダ **"Monday, August 3 2026"** / modified 2026-07-16 のまま / 閲覧 **21,082**) → 「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette**」「current entry conditions remain in place」を原文再確認。**官報公布の検出ゼロ (9 日連続)・現行 60 日継続**。内訳 65 カ国 / 30 日 59 (India・EU27 統一含む) / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia を原文で再確認。※補足: 05-21 記事 (第 1 次承認) は「54 カ国 / 15 日 3 / VoA 4」の旧枠組みで、07-16 記事 (詳細確定) が 65/59/2/3 に置換 = 二次情報の「54 カ国」説は旧記事由来と構造的に確定 | tatnews.org 07-16 記事 (公式・08-03 web_fetch 実取得) / tatnews.org 05-21 記事 (同・旧枠組み確認) |
| **THIM 義務化** | **公式未確認のまま (8/3 時点)**。検索ヒットは依然 06 月一次 (TAT 06-11 "optional / does not replace TDAC") + 二次の「Mandatory begins August」のみ。**Immigration Bureau / TAT の新規義務化告知なし**。案内トーク統制継続: 「TDAC 必須・THIM 任意 (TDAC を代替しない)・義務化時期は正式発表待ち」 | tatnews.org (06-11 のみ) / nationthailand.com / siam-legal.com / blog.wego.com (二次) |
| **DTV** | 変更なし。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k)・5 年マルチ / 180 日 / 残高 500k THB 不変。「タイ語学校のソフトパワー除外」「academic researcher / startup founder 追加」は**本日も二次情報のみ・MFA 一次未確認** → 不採用・監視継続。`VISA_STUDENT.bookingNote` 修正は Owner 承認待ちのまま | thethaiger.com / thai-visa-services.com / siam-legal.com (二次) |
| **LTR** | 変更なし。扶養枠拡大 (親 + 法定扶養者・人数無制限) = 「confirmed but **not yet in force** — MOI announcement still required」を本日再確認 = 未発効。現行 = 配偶者 + 20 歳未満の子・上限 4 名 = pricing.ts どおり。「dependent fee 10,000 THB/人」説は引き続き BOI 一次未確認で不採用 (次回 ltr.boi.go.th 直接確認候補・継続) | zagdim.com / hlbthai.com / globalcitizensolutions.com (二次) / boi.go.th (一次・新告示なし) |
| **Thailand Privilege** | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = pricing.ts 完全一致)。「Once the September 30, 2026 window closes, there is no guarantee the Bronze tier will return」を再確認。時限プロモ (家族追加 750k = **08-14 締切・残り 11 日** / 旧 Elite UG = 08-31) は 08-02 検知どおり | natlawreview.com / thailandelitevisas.com / siam-legal.com |
| **NON-O リタイア** | 変更なし (50 歳 / 80 万 THB or 月 65k / 更新後 3 ヶ月 80 万維持→以後 40 万)。日本語ソース側も「2026 年に大枠変更なし・審査運用の厳格化のみ」で一致 | longstay-thailand.com / thaiconsulate-visa.jp (二次・日本語) |
| **学生 NON-ED** | 変更シグナルなし | — |
| **国外送還規則** | **依然ドラフト・官報未公布**。08-02 Thai Examiner が「sweeping overhaul」続報を出したが内容は 07-14 閣議承認の詳報 = 施行日未確定のまま | thaiexaminer.com (08-02) / bangkokpost.com |

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Bronze 09-30 期限** — 残り 58 日・審査 4〜8 週 → 実質申込リミット 8 月中旬。家族追加プロモ 750k は **08-14 締切 = 残り 11 日**。
2. **ノービザ 30 日化の官報公布 (MOI 告示 5 本)** — 未掲載 9 日連続。検知即 Owner 通知。
3. **THIM 義務化の正式発表** — 8 月中の発表可能性大。TAT / Immigration Bureau 公式を毎日確認。
4. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば pricing.ts「最大 4 名」更新。
5. **DTV 改定 (タイ語学校除外等)** — MFA 一次裏取り継続 (VISA_STUDENT.bookingNote 修正は Owner 承認待ち)。
6. **指紋ベース犯罪経歴証明** — 運用細則監視。
7. **国外送還規則** — 官報公布・施行日監視 (本日も未公布)。

**運用メモ**: タスク定義の `lib/walc-data/knowledge.ts` は現存せず (実体 = `lib/concierge/knowledge.ts`)。タスク SKILL.md のパス更新を推奨。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

## 2026-08-04 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。

### 全 5 カテゴリ + 継続監視フラグ 照合結果

| 項目 | 判定 | 主要ソース (本日確認) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効 (10 日連続)**。TAT 公式 07-16 記事を本日 web_fetch 実取得 → ページヘッダ **"Tuesday, August 4 2026"** / `article:modified_time` **2026-07-16T10:37:04Z のまま** / 閲覧 **21,272** (08-03 は 21,082 = +190・記事改訂なし)。原文「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect **15 days after publication**」「Until the new measures take effect, **current entry conditions remain in place**」を再確認。内訳 65 カ国 / 30 日 59 (India・EU27 統一含む) / 15 日 Mauritius・Seychelles / VoA Azerbaijan・Belarus・Serbia。**現行 60 日継続** | tatnews.org 07-16 記事 (公式・08-04 web_fetch 実取得) |
| **THIM 義務化** | **公式未確認のまま (8/4 時点)**。本日タイ語・英語双方で再検索したが、一次は依然 TAT 06-11 記事 (「official launch **expected in** August 2026」「pilot 中は **optional**」「**does not replace TDAC**」) のみ。**Immigration Bureau / TAT の新規義務化告知は 8/4 時点でも未検出**。二次 (Siam Legal / ThaiEmbassy / TravelAndTourWorld / thim.in.th) の「Mandatory begins August 2026」は一次と乖離 → 不採用。案内トーク統制継続: 「**TDAC は必須・THIM は任意 (TDAC を代替しない)・義務化時期は正式発表待ち**」 | tatnews.org (06-11 一次) / siam-legal.com / thaiembassy.com / expatden.com (二次) |
| **DTV** | 変更なし。5 年マルチ / 180 日 +180 延長 / 残高 500k THB・3 ヶ月シーズニング or 月収 50k×6 ヶ月 or 併用 / e-Visa 必須 / 政府費 10,000 THB。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変 = pricing.ts と一致。本日照合の「タイ語学校をソフトパワー除外→NON-ED 誘導」「500k シーズニング厳格化」「タイ国内申請は 2025 以降 auto-reject」は**いずれも既ログ済の二次情報レベル・MFA 一次未確認・新規官報発効なし** → 採用せず監視継続。`VISA_STUDENT.bookingNote` 修正は Owner 承認待ちのまま | thethaiger.com / thai-visa-services.com / atlys.com / expatlife.ai (二次) |
| **LTR** | 変更なし。扶養枠拡大 (親 + 法定扶養者・人数無制限) は本日も「**expanded / confirmed**」表現の二次のみで **MOI 告示による発効確認は取れず = 未発効**。現行 = 配偶者 + 20 歳未満の子・上限 4 名 = pricing.ts どおり。HSP 対象産業拡大 (2026-05 / KPMG 経由) は 06-28 既ログ。BOI プレスリリース一覧を本日も照会したが **8 月の新告示なし**。「dependent fee 10,000 THB/人」説は引き続き BOI 一次未確認で不採用 | boi.go.th (一次・新告示なし) / kpmg.com / visaatlas.org / hlbthai.com / siam-legal.com (二次) |
| **Thailand Privilege** | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = pricing.ts 完全一致)。「Once the September 30, 2026 window closes, there is **no guarantee the Bronze tier will return** at its current price point or with its current benefits structure」「Members who secure membership before the deadline are **grandfathered into existing terms** for the full 5-year validity」を本日再確認。時限プロモ (家族追加 750k = **08-14 締切・残り 10 日** / 旧 Elite UG = 08-31) は 08-02 検知どおり据置 | natlawreview.com / thailandelitevisas.com / siam-legal.com / thaireloservices.com |
| **NON-O リタイア** | 変更なし (50 歳以上 / 残高 800,000 THB or 月年金 65,000 THB / 1 年更新)。日本語一次系も「**2026 年時点で制度の枠組み変更なし・審査運用と書類確認の厳格化のみ**」で一致。O-A の医療保険義務 (外来 4 万 / 入院 40 万 THB・2019-10-31〜) は既知で変更なし | longstay-thailand.com / thaiconsulate-visa.jp / thailand-ijyunavi.com (二次・日本語) |
| **学生 NON-ED** | 変更シグナルなし | — |
| **所持金証明 (TAT 07-06)** | 制度変更ではない (既ログ 07-15)。本日 TAT 原文を web_fetch 実取得し金額を再確認: Transit / 一部ビザ免除 = 10,000 THB/人・20,000 THB/家族 / VoA 同 / Tourist = 20,000・40,000 / **Non-Immigrant = 20,000 THB/人・40,000 THB/家族** / 12 歳未満は対象外。記事自ら「**does not introduce a new measure**」(根拠 = 1980 年 MOI 告示・金額は 2000 年改定) と明記 → ログ対象外・FAQ 素材としてのみ有効 | tatnews.org 07-06 記事 (公式・08-04 web_fetch 実取得) |
| **国外送還規則** | 進展の新規検出なし。07-14 閣議承認の草案段階のまま・官報未公布 | (本日新規ソースなし) |

### 🆕 本日の運用改善 (制度変更ではない)

**タイ語一次ソース経路を確定** — タイ語クエリ (`ราชกิจจานุเบกษา ยกเว้นวีซ่า 30 วัน ประกาศกระทรวงมหาดไทย 2569`) で以下の**タイ政府一次サイト**を初めて捕捉。今後の官報公布検知は英語二次より速い可能性が高く、次回以降の必須クエリに追加する:

- 外務省領事局 (一次): https://consular.mfa.go.th/th/content/20-5-69-0000?cate=5ddbe42115e39c4768007e1d
- 政府広報局 国際 (一次): https://foreign.prd.go.th/th/content/category/detail/id/2881/iid/522681
- ツーリストポリス (一次): https://www.touristpolice.go.th/post/tpbnews2026052101

いずれも **2026-05-19/21 の閣議決定の告知**であり、**官報公布の告知ではない** (= 本日時点で公布は依然未確認)。なお検索結果に `voabkkimmigration.go.th` の「ประกาศราชกิจจาฯ แล้ว "วีซ่าฟรี" สำหรับชาวอินเดียและไต้หวัน」(官報公布済・インド/台湾のビザ免除) が混在したが、**これは 2024 年の旧措置に関する記事の可能性が高く、本件 (2026 年 5 本の MOI 告示) とは別物**。日付未検証のため**不採用**・次回一次確認候補 (RULE-NO-SPECULATION)。

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Bronze 09-30 期限** — 残り **57 日**・審査 4〜8 週 → 実質申込リミット 8 月中旬。家族追加プロモ 750k は **08-14 締切 = 残り 10 日**。今月の営業訴求で最強の確定材料。
2. **ノービザ 30 日化の官報公布 (MOI 告示 5 本)** — 未掲載 **10 日連続**。検知即 Owner 通知。**次回からタイ語一次 3 サイト (consular.mfa / foreign.prd / touristpolice) を必須巡回に追加**。
3. **THIM 義務化の正式発表** — 8 月に入って 4 日経過も公式告知ゼロ。二次の「8 月義務化」は一次と乖離 → 断定禁止トーク継続。
4. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば pricing.ts「最大 4 名」更新。
5. **DTV 改定 (タイ語学校除外等)** — MFA 一次裏取り継続 (`VISA_STUDENT.bookingNote` 修正は Owner 承認待ち)。
6. **指紋ベース犯罪経歴証明** — 運用細則監視。
7. **国外送還規則** — 官報公布・施行日監視 (本日も未公布)。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

## 2026-08-05 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。

### 全 5 カテゴリ + 継続監視フラグ 照合結果

| 項目 | 判定 | 主要ソース (本日確認) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効 (11 日連続)**。TAT 公式 07-16 記事を本日 web_fetch 実取得 → ページヘッダ **"Wednesday, August 5 2026"** / `article:modified_time` **2026-07-16T10:37:04Z のまま** / 閲覧 **21,410** (08-04 は 21,272 = +138・記事改訂なし)。原文「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette**」「Until the new measures take effect, **current entry conditions remain in place**」を再確認。**現行 60 日継続** | tatnews.org 07-16 記事 (公式・08-05 web_fetch 実取得) |
| **THIM 義務化** | **公式未確認のまま (8/5 時点)**。Immigration Bureau 一次発表 (06-06 発表 / Nation Thailand 06-07 記事を本日 web_fetch 実取得・`modified_time` 2026-06-07) を原文精読 → 「Trial use begins, with launch set for August 2026」「The official full launch is scheduled for August 2026」まで。**"mandatory" の語も開始日も一次に存在しない**。二次 (TravelAndTourWorld / ThaiEmbassy / Siam Legal) の「Mandatory begins August 2026」「becomes mandatory for all arriving foreign nationals」は一次と乖離 → **不採用**。案内トーク統制継続: 「**TDAC は必須・THIM は任意 (TDAC を代替しない)・義務化時期は正式発表待ち**」 | nationthailand.com 06-07 (Immigration Bureau 発表の一次報) / tatnews.org 06-11 / travelandtourworld.com・thaiembassy.com (二次) |
| **DTV** | 変更なし。5 年マルチ / 180 日 / 残高 500k THB / e-Visa。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変 = pricing.ts と一致。「タイ語学校をソフトパワー除外 (2025〜)→NON-ED 誘導」「500k シーズニング厳格化」「embassy はほぼ e-visa 一択」は本日も **Thaiger / thai-visa-services 等の二次のみ・MFA 一次未確認** → 採用せず監視継続。`VISA_STUDENT.bookingNote` 修正は Owner 承認待ちのまま | thethaiger.com / thai-visa-services.com (二次) |
| **LTR** | 変更なし。扶養枠拡大 (親 + 法定扶養者・人数無制限 / BOI 告示 ป 3/2568) は本日も「**confirmed but not yet in force — a Ministry of Interior announcement is still required**」「still pending regulatory approval」で一致 = **未発効**。現行 = 配偶者 (同性婚含む) + 20 歳未満の子・上限 4 名 = pricing.ts どおり | hlbthai.com / zagdim.com / visaatlas.org / lexbangkok.com (二次) |
| **Thailand Privilege** | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = pricing.ts 完全一致)。「期限後の最下位ティアは **Gold ฿900,000** = 実質 **+250,000 THB** の段差」「background check は **4〜8 週**」「期限後に Bronze が現価格・現特典で戻る保証なし」を再確認。時限プロモ (家族追加 750k = **08-14 締切・残り 9 日** / 旧 Elite UG = 08-31) は据置 | natlawreview.com / thailandelitevisas.com / thailandelite.net / siam-legal.com |
| **NON-O リタイア** | 変更なし (50 歳以上 / 残高 800,000 THB or 月年金 65,000 THB / 1 年更新 / 更新後 3 ヶ月 80 万維持→以後 40 万)。日本語ソースも「2026 年時点で**基本的な枠組み (年齢要件・資金条件・1 年延長制度) は維持**・書類確認の厳格化のみ」で一致 | thaiconsulate-visa.jp / longstay-thailand.com / thailand-ijyunavi.com (二次・日本語) |
| **学生 NON-ED** | 変更シグナルなし | — |
| **国外送還規則** | 進展の新規検出なし。07-14 閣議承認の草案段階のまま・官報未公布 | (本日新規ソースなし) |

### 🆕 本日の一次ソース照合で判明した事実 (制度変更ではない / 記録用)

タスク運用改善で追加したタイ語一次 3 サイトのうち 2 件を本日初めて **web_fetch で実取得**し、英語二次の記述と突き合わせた。制度の中身は変わらないが、**社内での日付・本数の説明を正す材料**として記録する。

1. **閣議承認は 2 段階**である。MFA 領事局 (一次) は「**2569-05-19 (2026-05-19)** 閣議で枠組み承認」、PRD 国際 (一次・記事日 16/07/2569・閲覧 859) は「**2026 年 7 月 14 日**に承認」と明記。→ **05-19 = 枠組み (1国1権利・ผ.60 全 93 廃止・ผ.30 を 57→54・ผ.15 新設 3・VoA 31→4)**、**07-14 = 国別リストを含む詳細版 (65 / 30日 59 / 15日 2 / VoA 3)** の 2 段階。TAT 07-16 記事の "updated details" はこの 07-14 分を指す。
2. **MOI 告示の本数が 3 → 5 に変わっている**。MFA 一次 (05-20 掲載) は「ประกาศกระทรวงมหาดไทย **จำนวน 3 ฉบับ** (3 announcements)」、TAT 07-16 は「the **five** related Ministry of Interior announcements」。詳細版で本数が増えたと解するのが自然。**官報公布の検知時は「5 本すべて」を確認対象とする**。
3. MFA 一次の経過措置原文を確保: 「新措置の発効前に入国済み / 発効前に渡航する外国人は**従前の許可滞在期間の満了まで滞在可**」「発効後は (1) 新権利 (2) 二国間協定 (3) e-Visa のいずれかで入国」。**顧客案内でそのまま使える**。
4. MFA 一次ページの閲覧数は 46,327 (更新日 2569-05-21 のまま) = **05-21 以降ページ改訂なし → 官報公布の告知は本日時点でも未掲載**。

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Bronze 09-30 期限** — 残り **56 日**・審査 4〜8 週 → 実質申込リミット 8 月中旬。家族追加プロモ 750k は **08-14 締切 = 残り 9 日**。今月の営業訴求で最強の確定材料。
2. **ノービザ 30 日化の官報公布 (MOI 告示 **5 本**)** — 未掲載 **11 日連続**。検知即 Owner 通知。巡回 = TAT 07-16 記事 + タイ語一次 3 サイト (consular.mfa / foreign.prd / touristpolice)。
3. **THIM 義務化の正式発表** — 8 月に入って 5 日経過も Immigration Bureau / TAT の公式告知ゼロ。一次に "mandatory" の語なし → 断定禁止トーク継続。
4. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば pricing.ts「最大 4 名」更新。
5. **DTV 改定 (タイ語学校除外等)** — MFA 一次裏取り継続 (`VISA_STUDENT.bookingNote` 修正は Owner 承認待ち)。
6. **指紋ベース犯罪経歴証明** — 運用細則監視。
7. **国外送還規則** — 官報公布・施行日監視 (本日も未公布)。

**運用メモ (再掲)**: タスク定義の `lib/walc-data/knowledge.ts` は現存せず (実体 = `lib/concierge/knowledge.ts`)。タスク SKILL.md のパス更新を推奨。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

## 2026-08-06 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。

### 全 5 カテゴリ + 継続監視フラグ 照合結果

| 項目 | 判定 | 主要ソース (本日 08-06 確認) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効 (12 日連続)**。一次 3 本を本日 web_fetch 実取得: ① TAT 07-16 記事 = ページヘッダ **"Thursday, August 6 2026"** / `article:modified_time` **2026-07-16T10:37:04Z のまま** / 閲覧 **21,568** (08-05 は 21,410 = +158・記事本文改訂なし)。原文「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette**」「Until the new measures take effect, **current entry conditions remain in place**」を再確認。② MFA 領事局 (タイ政府一次) = 更新日 **21 พ.ค. 2569 のまま**・閲覧 **47,326** (08-05 は 46,327 = +999)。**官報公布の告知は本日時点でも未掲載**。③ PRD 国際 (一次) = 記事日 16/07/2569・閲覧 **859** (08-05 も 859 = 増減なし)・改訂なし。**現行 60 日継続** | tatnews.org 07-16 / consular.mfa.go.th (一次) / foreign.prd.go.th (一次) — いずれも 08-06 web_fetch 実取得 |
| **THIM 義務化** | **公式未確認のまま (8/6 時点)**。本日タイ語一次経路を新規開拓 (下記 🆕 参照)。入管局の下部組織サイト・政府広報 (GCC1111) の記述はいずれも「**เปิดใช้งานอย่างเป็นทางการเต็มรูปแบบในเดือนสิงหาคม 2569** (2026 年 8 月に正式フル稼働)」まで。**「บังคับ (mandatory)」の語も開始日も一次に存在しない**。二次 (ThaiEmbassy / Siam Legal / TravelAndTourWorld) の「becomes mandatory in August 2026」「Mandatory compliance across all Thai entry checkpoints begins August 2026」は一次と乖離 → **不採用**。案内トーク統制継続: 「**TDAC は必須・THIM は任意 (TDAC を代替しない)・義務化時期は正式発表待ち**」 | division5.immigration.go.th / nakhonsithammarat.imm.police.go.th (入管局下部・一次) / GCC1111 政府広報 / thaiembassy.com・siam-legal.com (二次) |
| **DTV** | 変更なし。5 年マルチ / 180 日 / 残高 500k THB / e-Visa。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変 = pricing.ts と一致。二次 (thai-visa-services 08-03 更新版) の「500k シーズニング再強化 (申請前 90 日以内の一括入金は系統的に却下)」「タイ語学校をソフトパワー資格活動から除外」「申請先国の居住証明が 2024 年のソフト要件→現在は正式要件」「e-Visa が IP / GPS をフラグしタイ国内申請を防止」は**依然 MFA 一次未確認** → 採用せず監視継続。`VISA_STUDENT.bookingNote` 修正は Owner 承認待ちのまま | thai-visa-services.com / thethaiger.com (二次) |
| **LTR** | 変更なし。扶養枠拡大 (親 + 法定扶養者・人数無制限 / BOI 告示 ป 3/2568) は本日も「**confirmed but not yet in force — a Ministry of Interior announcement is still required**」「will take effect upon a later announcement by the Ministry of Interior」で一致 = **未発効**。現行 = 配偶者 (同性婚含む) + 20 歳未満の子・上限 4 名 = pricing.ts どおり | kpmg.com / boi.go.th / hlbthai.com / zagdim.com |
| **Thailand Privilege** | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = pricing.ts 完全一致)。「期限後の最下位ティアは **Gold ฿900,000**」「background check **4〜8 週** → 承認保証には **8 月中旬まで**に完全書類で提出」「期限後の Bronze 存続は未発表」を再確認。時限プロモ (家族追加 = **08-14 締切・残り 8 日** / 旧 Elite UG = **08-31 締切**) は据置 | natlawreview.com / bangkokpost.com / thailandelitevisas.com / siam-legal.com |
| **NON-O リタイア** | 変更なし (50 歳以上 / 残高 800,000 THB or 月年金 65,000 THB / 1 年更新)。2026 年の論調も「枠組み維持・**運用/エンフォースメントの厳格化のみ** (空港ウォッチリスト・TM30 の紐付け・90 日レポート厳格運用・オーバーステイ一斉摘発)」で一致 | lexology.com / thethaiger.com / siam-legal.com (二次) |
| **学生 NON-ED** | 変更シグナルなし | — |
| **国外送還規則** | 進展の新規検出なし。07-14 閣議承認の草案段階のまま・官報未公布 | (本日新規ソースなし) |

### 🆕 本日の一次ソース開拓 (制度変更ではない / 運用改善)

THIM は従来「入管局発表 → Nation Thailand が報じた英語一次報」しか押さえていなかったが、本日**タイ語で入管局系ドメインを直接叩く経路**を確保した。次回以降の THIM 監視はここを一次とする:

- 入管局第 5 方面隊 (一次): https://division5.immigration.go.th/thai-immigration-thim-application/ — ※ **本日の web_fetch は本文空 (JS レンダリング) → 原文取得は [未確認]**。次回は Chrome 経由で取得する
- ナコンシータマラート入管 (一次): https://nakhonsithammarat.imm.police.go.th/แอปที่แนะนำ-thim/
- 政府広報 GCC1111 公式 X (一次): https://x.com/GCC_1111/status/2063504735672402175

**判明した事実 (制度変更ではない・記録用)**: タイ語一次系の記述は一貫して「ทดลองใช้งาน (試験運用中)・TDAC とリンク済・**สิงหาคม 2569 に正式フル稼働**」であり、**義務化 (บังคับ) の語は現れない**。将来構想として「Super App 化 = オンライン予約・e-Extension・TM30 届出・90 日レポート統合」が挙げられている点も一次で確認。→ **「8 月から THIM 必須」と顧客に言わない**方針を継続する根拠が一次で補強された。

**不採用にした二次情報 (日付未検証・一次未確認)**: 「2025 年 8 月に非移民ビザのカテゴリが 17 → 7 に統合された」(ananasinsider)。過去事象の主張だが一次未確認・当社ファクトに影響しないため **不採用** (RULE-NO-SPECULATION)。

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Bronze 09-30 期限** — 残り **55 日**・審査 4〜8 週 → 実質申込リミット **8 月中旬**。家族追加プロモは **08-14 締切 = 残り 8 日**。旧 Elite アップグレードは **08-31 締切**。今月の営業訴求で最強の確定材料。
2. **ノービザ 30 日化の官報公布 (MOI 告示 5 本)** — 未掲載 **12 日連続**。検知即 Owner 通知。巡回 = TAT 07-16 記事 + タイ語一次 3 サイト (consular.mfa / foreign.prd / touristpolice)。**MFA 一次の閲覧数と更新日が最速の改訂検知シグナル**として機能中。
3. **THIM 義務化の正式発表** — 8 月に入って 6 日経過も入管局・TAT の公式告知ゼロ。一次に "mandatory / บังคับ" の語なし → 断定禁止トーク継続。**次回は division5 を Chrome 経由で原文取得**。
4. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば pricing.ts「最大 4 名」更新。
5. **DTV 改定 (タイ語学校除外・500k シーズニング・居住証明)** — MFA 一次裏取り継続 (`VISA_STUDENT.bookingNote` 修正は Owner 承認待ち)。
6. **指紋ベース犯罪経歴証明** — 運用細則監視。
7. **国外送還規則** — 官報公布・施行日監視 (本日も未公布)。

**運用メモ (再掲)**: タスク定義の `lib/walc-data/knowledge.ts` は現存せず (実体 = `lib/concierge/knowledge.ts`)。タスク SKILL.md のパス更新を推奨。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

## 2026-08-08 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。

**⚠️ ラン欠落**: `2026-08-07` のログが存在しない (スケジュールタスク未実行と判断)。本ランは **08-06 → 08-08 の 2 日分**をカバーし、その間の発効を一次で照合済み。

### 全 5 カテゴリ + 継続監視フラグ 照合結果

| 項目 | 判定 | 主要ソース (本日 08-08 確認) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効 (14 日連続)**。一次 2 本を本日 web_fetch 実取得: ① TAT 07-16 記事 = ページヘッダ **"Saturday, August 8 2026"** / `article:modified_time` **2026-07-16T10:37:04Z のまま** / 閲覧 **21,831** (08-06 は 21,568 = +263 / 2日・記事本文改訂なし)。原文「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette**」「Until the new measures take effect, **current entry conditions remain in place**」を再確認。② MFA 領事局 (タイ政府一次) = **วันที่ปรับปรุงข้อมูล 21 พ.ค. 2569 のまま**・閲覧 **49,081** (08-06 は 47,326 = +1,755 / 2日)。**官報公布の告知は本日時点でも未掲載**。③ ราชกิจจานุเบกษา 側でも当該 MOI 告示の掲載を検出できず。**現行 60 日継続** | tatnews.org 07-16 (08-08 web_fetch 実取得) / consular.mfa.go.th 20-5-69-0000 (一次・08-08 web_fetch 実取得) |
| **THIM 義務化** | **公式未確認のまま (8/8 時点)**。8 月に入って 8 日経過も入管局 / TAT の「義務化」公式告知ゼロ。一次 (Immigration Bureau 発表の一次報 nationthailand 06-07 / TAT 06-11) は「full official launch is scheduled for August 2026」まで。二次 (ThaiEmbassy / Siam Legal / TravelAndTourWorld) の「**Mandatory compliance across all Thai entry checkpoints begins August 2026**」は一次と乖離 → **不採用**。案内トーク統制継続: 「**TDAC は必須・THIM は任意 (TDAC を代替しない)・義務化時期は正式発表待ち**」 | thaiembassy.com / siam-legal.com / timeout.com / nationthailand 40067126 (いずれも二次または一次報の再掲) |
| **DTV** | 変更なし。5 年マルチ / 180 日 (延長でもう 180 日) / 残高 **500,000 THB** / e-Visa。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変 = pricing.ts と一致。「タイ語学校を MFA ソフトパワー資格リストから除外 → NON-ED 誘導」は本日も **Thaiger 等の二次のみ・MFA 一次未確認** → 採用せず監視継続。`VISA_STUDENT.bookingNote` 修正は Owner 承認待ちのまま | thethaiger.com / thaiembassy.com / siam-legal.com (二次) |
| **LTR** | 変更なし。扶養枠拡大 (親 + 法定扶養者・人数無制限) は本日も「**all changes take effect following the official BOI announcement and the Ministry of Interior's announcement on the expansion of dependents' rights**」= **MOI 告示待ち・未発効**。現行 = 配偶者 + 20 歳未満の子・**上限 4 名** = pricing.ts どおり | boi.go.th / prnewswire (BOI 公式リリース) / hlbthai.com / visaatlas.org |
| **Thailand Privilege** | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = pricing.ts 完全一致)。「期限後の最下位ティアは **Gold ฿900,000** = 実質 +250,000 THB の段差」「期限後に Bronze が現価格・現特典で戻る保証なし」を再確認。**Next Member (家族追加) プロモ = 750,000 THB / 期間 2026-05-18〜08-14 = 残り 6 日**。対象は **Platinum / Diamond / Reserve 会員**、標準追加料金比で 1 人あたり **250,000〜1,250,000 THB** 節約。**書類一式 + 支払いの両方が 08-14 までに完了していること**が条件。旧 Elite アップグレードは 08-31 締切 | natlawreview.com / bangkokpost.com PR / thaireloservices.com / thailandelitevisas.com / thailand-elite.com |
| **NON-O リタイア** | 変更なし (50 歳以上 / 残高 800,000 THB or 月年金 65,000 THB / 1 年更新)。日本語二次も「枠組み維持・運用の厳格化のみ」で一致。**2025 年以降バンコク銀行等で残高証明取得に 4 ヶ月以上の残高維持が必要**、および**ノービザ/短期滞在での新規口座開設は事実上不可**という運用面の記述を確認 (いずれも二次・従来の当社案内と矛盾せず、pricing.ts への影響なし) | thaiconsulate-visa.jp / longstay-thailand.com / thailand-ijyunavi.com (二次・日本語) |
| **学生 NON-ED** | 変更シグナルなし | — |
| **国外送還規則** | **草案段階のまま・官報未公布**。下記 🆕 参照 | nationthailand 40068647 (07-15) / fortifyrights.org 08-06 (いずれも 08-08 web_fetch 実取得) |

### 🆕 本日の新規検出 (制度変更ではない / 監視材料として記録)

**国外送還規則 (ระเบียบสำนักนายกรัฐมนตรีว่าด้วยการเนรเทศ) に 08-06 付の新規一次級ソース**

Fortify Rights が **2026-08-06** にニュースリリース「Thailand: New Regulations on Deportations Risk Enabling Forcible Returns of Refugees」を公開 (`article:published_time` 2026-08-06T05:16:41Z を実取得で確認)。本日 web_fetch で原文精読した結果:

- **ステータスは依然「draft」**。同リリースは「Cabinet **approved the draft**」と書き、**採択の停止 (halt the regulation's adoption) を政府に要求**している = **官報未公布・未施行**。当社ファクトへの影響なし。
- Nation Thailand 07-15 記事 (`modified_time` 2026-07-15) を併せて実取得し、**送還対象 6 類型**を原文で確定: ① 不法入国・不法滞在 ② 外国人労働法違反の就労 ③ 外国人事業法違反の事業運営 ④ 公文書偽造・行使 ⑤ **3 年以上の懲役刑に当たる罪** ⑥ ①〜⑤ の正犯・教唆・幇助。
- 手続: 矯正局長 → 内務省次官 → 内務大臣が**釈放前に**送還命令を発出できる建付け。国籍不明者は**入国前の最終居住国**へ送還。
- **WALC 顧客への含意**: 6 類型はいずれも**違法行為が前提**であり、DTV / LTR / Privilege / NON-O の適法保持者に直接の影響はない。ただし**オーバーステイが①に該当**するため、**期限管理の重要性を裏付ける材料**として営業・アフター案内で使える (施行前のため「新規則により」とは言わない)。

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Next Member プロモ 08-14 締切 — 残り 6 日**。書類 + 支払い**両方**の完了が条件のため、実質的な打診リミットは今週中。対象 = Platinum / Diamond / Reserve 保有者。**今週いちばん時間価値の高い営業材料**。
2. **Privilege Bronze 09-30 期限** — 残り **53 日**・審査 4〜8 週 → 実質申込リミット **8 月中旬**。旧 Elite アップグレードは 08-31 締切。
3. **ノービザ 30 日化の官報公布 (MOI 告示 5 本)** — 未掲載 **14 日連続**。検知即 Owner 通知。巡回 = TAT 07-16 記事 + MFA 領事局 (閲覧数と更新日が最速の改訂検知シグナル) + PRD 国際 + touristpolice。
4. **THIM 義務化の正式発表** — 8 月 8 日時点で公式告知ゼロ。一次に "mandatory / บังคับ" の語なし → 断定禁止トーク継続。**division5.immigration.go.th は JS レンダリングのため Chrome 経由での原文取得が未達 (積み残し)**。
5. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば pricing.ts「最大 4 名」更新。
6. **DTV 改定 (タイ語学校除外・500k シーズニング・居住証明)** — MFA 一次裏取り継続 (`VISA_STUDENT.bookingNote` 修正は Owner 承認待ち)。
7. **国外送還規則** — 法制委員会 (Council of State) 審査中。官報公布・施行日監視。
8. **指紋ベース犯罪経歴証明** — 運用細則監視。

**運用メモ (再掲)**: タスク定義の `lib/walc-data/knowledge.ts` は現存せず (実体 = `lib/concierge/knowledge.ts`)。タスク SKILL.md のパス更新を推奨。加えて **08-07 のラン欠落**が発生しているため、スケジュールタスクの実行履歴確認を推奨。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-08-09 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。

### 全 5 カテゴリ + 継続監視フラグ 照合結果

| 項目 | 判定 | 主要ソース (本日 08-09 確認) |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効 (15 日連続)**。一次を本日 web_fetch 実取得: ① TAT 07-16 記事 = ページヘッダ **"Sunday, August 9 2026"**(= 本日付の実取得を証明) / `article:modified_time` **2026-07-16T10:37:04Z のまま** / 閲覧 **21,941** (08-08 は 21,831 = +110 / 1 日・本文改訂なし)。原文「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette**」「Until the new measures take effect, **current entry conditions remain in place**」を再確認。② **PRD 国際局 (タイ政府一次) を本日新規に実取得** = 掲載日 **16/07/2569 のまま**・閲覧 **992**・原文「จะมีผลบังคับใช้ **15 วันหลังประกาศในราชกิจจานุเบกษา**」= **官報公布は本日時点でも未掲載**。内訳 **65 / 59 / 2 / 3** をタイ語原文で再確認 (30 日免除 59・15 日免除 = モーリシャス/セーシェル・VoA = アゼルバイジャン/ベラルーシ/セルビア・インドは VoA 廃止 → 30 日免除へ)。**現行 60 日継続** | tatnews.org 07-16 (08-09 web_fetch 実取得) / foreign.prd.go.th 522681 (一次・08-09 web_fetch 実取得) |
| **THIM 義務化** | **公式未確認のまま (8/9 時点)**。8 月に入って 9 日経過も入管局 / TAT の「義務化」公式告知ゼロ。一次 (Immigration Bureau 一次報 nationthailand 40067126 / TAT 06-11) は「full official launch is scheduled for August 2026」まで。二次 (ThaiEmbassy / Siam Legal / TimeOut / thim.in.th) の「**mandatory ... begins August 2026**」は一次と乖離 → **不採用**。案内トーク統制継続: 「**TDAC は必須・THIM は任意 (TDAC を代替しない)・義務化時期は正式発表待ち**」 | thaiembassy.com / siam-legal.com / timeout.com / thim.in.th (いずれも二次または一次報の再掲) |
| **DTV** | 変更なし。5 年マルチ / 180 日 (延長でもう 180 日) / 残高 **500,000 THB** / e-Visa。料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変 = pricing.ts と一致。「タイ語学校を MFA ソフトパワー資格リストから除外 → NON-ED 誘導」は本日も **Thaiger 等の二次のみ・MFA 一次未確認** → 採用せず監視継続。`VISA_STUDENT.bookingNote` 修正は Owner 承認待ちのまま | thethaiger.com / thaiembassy.com / siam-legal.com (二次) |
| **LTR** | 変更なし。扶養枠拡大 (親 + 法定扶養者・人数無制限) は本日も「**all changes take effect following the official BOI announcement and the Ministry of Interior's announcement on the expansion of dependents' rights**」= **MOI 告示待ち・未発効**。BOI 一次 (boi.go.th / PRD NBT World) に 8 月の新規告示なし。現行 = 配偶者 + 20 歳未満の子・**上限 4 名** = pricing.ts どおり | boi.go.th / prnewswire (BOI 公式リリース) / thainews.prd.go.th 832998 |
| **Thailand Privilege** | 変更なし (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = pricing.ts 完全一致)。**Next Member (家族追加) プロモを本日一次級ソースで原文実取得**: 期間 **2026-05-18〜08-14**・**プロモ価格 750,000 THB/人**・対象 **Platinum (10y) / Diamond (15y) / Reserve (20y)**・標準 Next Member 料金は Platinum 1,000,000 / Diamond 1,500,000 / Reserve 2,000,000 THB → **1 人あたり 250,000〜1,250,000 THB 節約**。対象は「新規申込で家族追加」「既存 Plat/Dia/Res 会員の追加」「申込中で**未払い**の者 (再提出要件に従う)」の 3 パターン = **既存会員も対象**であることを原文で確定。**残り 5 日** | thaireloservices.com (GSSA・08-09 web_fetch 実取得 / `modified_time` 2026-05-19 のまま) / natlawreview.com / thailandelitevisas.com |
| **NON-O リタイア** | 変更なし (50 歳以上 / 残高 800,000 THB or 月年金 65,000 THB / 1 年更新)。日本語二次も「枠組み維持・運用の厳格化のみ」で一致。残高の事前維持期間 (更新時 3 ヶ月以上 / 銀行実務では 4 ヶ月以上求められる例) は従来案内と矛盾せず、pricing.ts への影響なし | longstay-thailand.com / thailand-ijyunavi.com / thailandpicks.com (二次・日本語) |
| **学生 NON-ED** | 変更シグナルなし | — |
| **国外送還規則** | **草案段階のまま・官報未公布**。08-06 の Fortify Rights リリース以降、本日までに新規の一次級ソースなし | (08-08 ログ参照) |

### 🆕 本日の新規確定事項 (制度変更ではない / 営業材料の精度向上)

**Privilege Next Member プロモの適用条件を原文で確定** — 従来ログでは「対象 = Platinum / Diamond / Reserve 会員」とだけ記録していたが、本日 GSSA 原文を実取得し **既存会員の追加のみならず「新規申込に家族を同時追加」「申込中で支払い未完了の案件の切替 (再提出要件あり)」も対象**であることを確認。**申込中で未払いの見込み客がいれば 08-14 までに切替を打診できる** = 残り 5 日で動かせる具体材料。

**タイ政府一次の巡回経路を 1 本追加** — `foreign.prd.go.th` (กองการต่างประเทศ / PRD 国際局) の当該記事を本日新規に実取得。掲載日 + 閲覧数が改訂検知シグナルとして機能し、かつ**タイ語原文で国別内訳を確認できる**ため、MFA 領事局と併せて官報公布の早期検知経路として定着させる。

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Next Member プロモ 08-14 締切 — 残り 5 日**。書類 + 支払い**両方**の完了が条件。**申込中・未払い案件の切替も対象**(本日確定)。今週いちばん時間価値の高い営業材料。
2. **Privilege Bronze 09-30 期限** — 残り **52 日**・審査 4〜8 週 → 実質申込リミット **8 月中旬**。旧 Elite アップグレードは 08-31 締切。
3. **ノービザ 30 日化の官報公布 (MOI 告示 5 本)** — 未掲載 **15 日連続**。検知即 Owner 通知。巡回 = TAT 07-16 記事 + MFA 領事局 + **PRD 国際局 (本日追加)** + touristpolice。
4. **THIM 義務化の正式発表** — 8 月 9 日時点で公式告知ゼロ。一次に "mandatory / บังคับ" の語なし → 断定禁止トーク継続。**division5.immigration.go.th は JS レンダリングのため Chrome 経由での原文取得が未達 (積み残し)**。
5. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば pricing.ts「最大 4 名」更新。
6. **DTV 改定 (タイ語学校除外・500k シーズニング・居住証明)** — MFA 一次裏取り継続 (`VISA_STUDENT.bookingNote` 修正は Owner 承認待ち)。
7. **国外送還規則** — 法制委員会 (Council of State) 審査中。官報公布・施行日監視。
8. **指紋ベース犯罪経歴証明** — 運用細則監視。

**運用メモ**: タスク定義の `lib/walc-data/knowledge.ts` は現存せず (実体 = `lib/concierge/knowledge.ts`)。タスク SKILL.md のパス更新を推奨 (7 ラン連続で未対応)。08-07 のラン欠落は本日も未解消のまま (08-08 ランで内容はカバー済み)。

**[未確認]**: `consular.mfa.go.th` の領事局ページは本日 provenance 制約により直接取得できず (検索結果に URL は出現・本文未取得)。代替として **PRD 国際局のタイ語一次**で官報未公布を確認済み。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-08-10 検証ログ (新規変更なし / 全 5 カテゴリ)

**結論**: **regulation-watch = 変更なし**。発効済みの新規制度変更ゼロ → **Owner 通知なし・`pricing.ts` 修正不要**。

### 全 5 カテゴリ + 継続監視フラグ 照合結果

| 項目 | 判定 | 本日 (08-10) の一次確認 |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効 (16 日連続)** | ① TAT 07-16 記事を本日 web_fetch 実取得: ページヘッダ **"Monday, August 10 2026"**(本日付取得の証明)/ `article:modified_time` **2026-07-16T10:37:04+00:00 のまま**(改訂なし)/ 閲覧 **22,034**(08-09 は 21,941 = **+93 / 1 日**・本文差分ゼロ)。原文「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication」。② PRD 国際局タイ語一次も本日実取得: 掲載 **16/07/2569**・閲覧 **1,084**・原文「จะมีผลบังคับใช้ 15 วันหลังประกาศในราชกิจจานุเบกษา」= **官報未公布**。③ タイ語検索 (ราชกิจจานุเบกษา / ประกาศกระทรวงมหาดไทย) でも MOI 告示 5 本の掲載を確認できず |
| **THIM 義務化** | **公式未確認のまま (8/10 時点)**。一次 (TAT 06-11 / Immigration Bureau 一次報) は「pilot = optional・full official launch expected August 2026」まで。「mandatory」は二次 (ThaiEmbassy / Siam Legal / Wego / travelandtourworld) のみ → **断定禁止トーク継続**。なお二次に「10/1 以降 長期滞在者向けモジュール (書類提出・ステータス照会・予約・90 日レポート) を順次追加」の記述あり = **WALC アフター業務に効く可能性・要一次裏取り** | TAT 06-11 / nationthailand 40067126 |
| **DTV** | **変更なし**。5 年マルチ / 1 回 180 日 (延長でもう 180 日) / 残高 **500,000 THB** / e-Visa。WALC 料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変 = `pricing.ts` と一致。「タイ語学校をソフトパワー資格リストから除外」「500k シーズニング (申請前 90 日のまとめ入金を拒否)」「居住証明 (公共料金・賃貸契約・運転免許)」は本日も **Thaiger / Lexology / thai-visa-services 等の二次のみ・MFA 一次未確認** → 採用せず監視継続 | 二次のみ |
| **LTR** | **変更なし**。扶養枠拡大 (親 + 法定扶養者・人数無制限) は本日も「all changes take effect following the official BOI announcement and the **Ministry of Interior's announcement** on the expansion of dependents' rights」= **MOI 告示待ち・未発効**。BOI 一次 (boi.go.th / osos.boi.go.th) に 8 月の新規告示なし。現行 = 配偶者 + 20 歳未満の子・最大 4 名 (`pricing.ts` 現行値で正) | boi.go.th / osos.boi.go.th |
| **Thailand Privilege** | **変更なし** (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = `pricing.ts` 完全一致)。Next Member プロモ **08-14 締切・750,000 THB/人・対象 Platinum / Diamond / Reserve** を本日も再確認 (条件変更なし) | thailandelitevisas / thaireloservices / thailandelite.net |
| **NON-O リタイア** | **変更なし** (50 歳以上 / 残高 800,000 THB or 月年金 65,000 THB / 1 年更新)。日本語一次級・二次とも 8 月の制度変更報道ゼロ | longstay-thailand.com / thailandpicks 他 |
| **学生 NON-ED** | **変更なし** (下記「新規確定事項」参照) | Royal Thai Embassy Jakarta (MFA 在外公館) |
| **国外送還規則** | **草案段階のまま・官報未公布**。08-06 の Fortify Rights リリース以降、本日までに新規の一次級ソースなし | — |

### 🆕 本日の新規確定事項 (制度変更ではない / 営業トークの誤り是正)

**「ED Plus = 語学学校の受け皿」は誤り — MFA 在外公館一次で反証確定**。
二次 (Lexology / thai-visa-services / atlys) は「ED Plus は DTV ソフトパワーから外れた語学・文化コース向けに新設された」と書くが、**MFA 在外公館 (Royal Thai Embassy, Jakarta) の一次を本日実取得**したところ原文は:

> Non-Immigrant **"ED PLUS"** Visa may be granted to international students currently studying at universities/institutions in Thailand **at a bachelor's degree level or above**.

= **学位課程 (学士以上) 在学者限定**。語学学校・ムエタイ・料理学校は **対象外**。ED Plus は 2024 年 6 月閣議で導入済みの既存カテゴリであり **2026 年の新設ではない**。
→ **WALC への含意**: 「語学学校なら ED Plus」と案内すると誤誘導になる。語学学校ルートは従来どおり **NON-ED (3 ヶ月更新・口座開設不可)**、WALC の推奨は **DTV ソフトパワー (60,000 THB / 5 年)** のまま変更なし。`pricing.ts` の `VISA_STUDENT` 記述 (「3 ヶ月ごとの更新が必要・口座開設不可」「DTV ソフトパワーを強く推奨」) は**正しい**ため修正不要。
ED Plus の副次特典 (再入国許可不要 / 大学が延長申請を代行 / 卒業後 1 年の就職活動延長) は、**大学留学の顧客が来た場合のみ**有効な材料として記録。

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Next Member プロモ 08-14 締切 — 残り 4 日**。書類 + 支払い**両方**の完了が条件のため、**実質の打診リミットは本日〜明日**。対象 = Platinum / Diamond / Reserve (新規申込への家族同時追加・未払い案件の切替も対象)。**今週いちばん時間価値の高い営業材料**。
2. **Privilege Bronze 09-30 期限** — 残り **51 日**・審査 4〜8 週 → 実質申込リミット **8 月中旬**。旧 Elite アップグレードは 08-31 締切。
3. **ノービザ 30 日化の官報公布 (MOI 告示 5 本)** — 未掲載 **16 日連続**。検知即 Owner 通知。巡回 = TAT 07-16 記事 (modified_time + 閲覧数) + PRD 国際局 + MFA 領事局 + touristpolice。
4. **THIM 義務化の正式発表** — 8 月 10 日時点で公式告知ゼロ。断定禁止トーク継続。**10/1 の長期滞在者向けモジュール (90 日レポート等) は一次裏取り待ち**。division5.immigration.go.th は JS レンダリングのため Chrome 経由取得が未達 (積み残し)。
5. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば `pricing.ts`「最大 4 名」更新。
6. **DTV 改定 (タイ語学校除外・500k シーズニング・居住証明)** — MFA 一次裏取り継続。`VISA_STUDENT.bookingNote` 修正は**不要と本日判明** (ED Plus 誤解を排除したため)。
7. **国外送還規則** — 法制委員会審査中。官報公布・施行日監視。
8. **指紋ベース犯罪経歴証明** — 運用細則監視。

**運用メモ**: タスク定義の `lib/walc-data/knowledge.ts` は現存せず (実体 = `lib/concierge/knowledge.ts`)。タスク SKILL.md のパス更新を推奨 (**8 ラン連続で未対応**)。

**[未確認]**: `consular.mfa.go.th` 領事局ページは本日も provenance 制約で本文未取得 (検索結果に URL は出現)。`immigration.go.th` / `ratchakitcha.soc.go.th` の直接取得も provenance 未成立。代替として PRD 国際局タイ語一次 + TAT 一次で官報未公布を確認済み。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

---

## 2026-08-11 検証ログ (制度変更なし / DTV 一次資料を初取得・自社ファクト誤りを1件是正)

**結論**: **regulation-watch = 発効済みの新規制度変更ゼロ** → 制度としての Owner 緊急通知は不要。
ただし本ランで **MFA 一次 (DTV 公式チェックリスト PDF) を初めて実取得**し、**WALC 側ファクトの誤り 1 件 (DTV-O 家族の年齢上限) を確定・修正**した。`pricing.ts` の料金・期間・残高要件はすべて現行のままで正。

### 全カテゴリ 照合結果

| 項目 | 判定 | 本日 (08-11) の一次確認 |
|---|---|---|
| **ノービザ 60→30 日** | **進展なし・未発効 (17 日連続)** | ① TAT 07-16 記事を本日 web_fetch 実取得: ページヘッダ **"Tuesday, August 11 2026"**(本日付取得の証明)/ `article:modified_time` **2026-07-16T10:37:04+00:00 のまま**(改訂なし)/ 閲覧 **22,192**(08-10 は 22,034 = **+158**・本文差分ゼロ)。原文「The five related Ministry of Interior announcements **remain pending publication in the Royal Gazette** and will take effect 15 days after publication」。② **MFA 領事局 (consular.mfa.go.th) を本日実取得**(前 2 ラン provenance 制約で未達 → 本日解消): 更新日 **21 พ.ค. 2569 のまま**・閲覧 **50,851**(08-08 は 49,081)・原文「ประกาศกระทรวงมหาดไทย จำนวน 3 ฉบับ ซึ่งจะมีผลใช้บังคับเมื่อพ้นกำหนด 15 วัน นับแต่วันประกาศในราชกิจจานุเบกษา」= **官報未公布**。③ PRD 国際局タイ語一次も実取得 (掲載 16/07/2569・閲覧 1,084・無改訂)。④ タイ語検索 (ราชกิจจานุเบกษา / ประกาศกระทรวงมหาดไทย) でも当該告示の掲載を検出できず |
| **DTV** | **制度変更なし**。5 年マルチ / 1 回 180 日 / 残高 **500,000 THB** / e-Visa。WALC 料金 (ソフトパワー 60k・ノマド 45k・フリーランス 48k) 不変 = `pricing.ts` と一致 | 🆕 **MFA 一次 (Checklist_DTV.pdf) を初取得** — 下記「新規確定事項」参照 |
| **LTR** | **変更なし・未発効**。扶養枠拡大 (親 + 法定扶養者・人数無制限) は本日も「will take effect following the official BOI announcement and the **Ministry of Interior's announcement**」= MOI 告示待ち。BOI 一次 (boi.go.th / osos.boi.go.th) に 8 月の新規告示なし。現行 = 配偶者 + 20 歳未満の子・最大 4 名 (`pricing.ts` 現行値で正) | osos.boi.go.th |
| **Thailand Privilege** | **変更なし** (Bronze 650k・**2026-09-30 期限** / Gold 900k / Platinum 1.5M / Diamond 2.5M / Reserve 5M = `pricing.ts` 一致)。Next Member プロモ **08-14 締切・750,000 THB/人・Platinum / Diamond / Reserve 対象**を本日も再確認。**「延長不可・返金不可」を GSSA 原文で確認**。Bronze 09-30 以降の存続・改定・廃止は **Thailand Privilege 未確定** (= 期限訴求の裏付け) | thailandelitevisas / thaireloservices / thailandelite.net / bangkokpost PR |
| **NON-O リタイア** | **変更なし** (50 歳以上 / 残高 800,000 THB or 月年金 65,000 THB / 1 年更新)。日本語一次級・二次とも 8 月の制度変更報道ゼロ | longstay-thailand.com 他 |
| **学生 NON-ED / ED Plus** | **変更なし** (08-10 ランで確定した「ED Plus = 学士以上の学位課程限定」を維持。語学学校は NON-ED、WALC 推奨は DTV ソフトパワー) | — |
| **THIM** | **公式未確認のまま (8/11 時点)**。一次 (TAT 06-11) は「pilot = optional / full official launch expected August 2026」まで。「mandatory」は二次 (ThaiEmbassy / Siam Legal / Wego / travelandtourworld / visasupdate) のみ → **断定禁止トーク継続** (TDAC 必須 / THIM 任意 / 義務化時期は正式発表待ち) | TAT 06-11 / nationthailand 40067126 |
| **国外送還規則** | **草案段階のまま・官報未公布**。08-06 の Fortify Rights リリース以降、新規の一次級ソースなし | — |

### 🆕 本日の新規確定事項 ①: MFA 一次 DTV チェックリストを初取得 (5 ラン越しの積み残しを解消)

**出典**: `https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf` (MFA 公式ドメイン・本日実取得)

**境界条件 (重要・断定範囲を限定する)**: 本 PDF は文中に **MYR 65,000 換算**と **Malaysian PR card / Wisma Putra 認証**の追加要件を含む → **在マレーシア タイ大使館 (KL) 版のチェックリスト**であり、**全在外公館共通の規則ではない**。また **PDF 内に発行日・改訂日の記載がない** → 「◯年◯月に変わった」とは言えない。**「MFA が公開している一次チェックリストに、以下の要件が現に記載されている」までが本日確定できる範囲**。

原文で確定した内容 (A: ワーケーション / B: ソフトパワー / C: 家族 の 3 区分):

1. **残高**: 全 3 区分共通で「A copy of the bank statement for **the last 3 months** with an ending balance of **no less than 500,000 THB**」= **3 ヶ月分の取引明細 + 期末残高 50 万 THB**。二次が言う「3 ヶ月シーズニング」は、一次では「**3 ヶ月分の明細提出**」として現れる (「90 日間 50 万を維持」とまでは書かれていない)。→ WALC 既存ファクト (`knowledge.ts`「50万THB相当を3ヶ月キープ」) は**実務上正しく、過小でもない**ため修正不要。
2. **居住証明**: 全 3 区分共通で「**Proof of prolonged residence in Thailand for at least 6 months**, such as a condominium rental agreement, lease agreement etc.」= **タイでの 6 ヶ月以上の居住を示す賃貸契約等**。二次のみだった「居住証明」要件が**一次で裏取り完了**。
3. **収入証明**: 区分 A・B ともに「Proof of salary slip/monthly income for **the last 6 months**」。**ソフトパワー区分でも収入証明が要る**点は営業トークで落としやすい。
4. **区分 A の追加**: 海外雇用契約書 + 会社登記/事業ライセンスの**当該国タイ大使館認証**、ポートフォリオ。
5. **ソフトパワーの例示**: 区分 B の見出しは「Thai soft power related activities **e.g. Muaythai, Thai culinary training and medical treatment**」。**タイ語学校は不記載**。ただし "e.g." のため**明示的な除外条項ではない** → 「除外が明文化された」とは書かない (08-10 までの判断を維持)。

**WALC への含意**: DTV は「残高 50 万だけ」ではなく **①3 ヶ月分の明細 ②6 ヶ月分の収入証明 ③タイでの 6 ヶ月以上の居住証明** が揃って初めて通る。**この 3 点セットを事前に組める代行業者は少ない = WALC の差別化ポイント**。特に③は初来タイ客が自力で用意できない (賃貸契約が先に要る) → **「物件手配 + DTV 申請」をセットで売る根拠が一次で確定**。

### 🆕 本日の新規確定事項 ②: 自社ファクトの誤り 1 件を確定・修正 (DTV-O 家族の年齢上限)

MFA 一次チェックリスト 区分 C の原文:

> C. Required Documents for a DTV: **Spouse and children under 20 years old** of DTV visa holders

一方 WALC 側は **「配偶者・15 歳未満の子」**と記載していた (3 ファイル)。かつ**同一リポ内で表記が割れていた** (`lib/blog/thailand-nomad-visa-guide.ts` は 3 箇所とも正しく「20 歳未満」)。
→ **「15 歳未満」が誤り**。15〜19 歳の子を持つ見込み客を、自社サイトの記述で自ら弾いていた (**取りこぼし方向の誤り**)。

**修正済み (本ランで実施・PR 化)**:

| ファイル | 変更 |
|---|---|
| `lib/walc-data/pricing.ts` (`VISA_DTV.bookingNote`) | 配偶者・15 歳未満の子 → **20 歳未満** |
| `lib/concierge/knowledge.ts` (DTV 料金表 DTV-O 行) | 同上 |
| `lib/blog/dtv-required-documents.ts` (必要書類 家族欄) | 同上 |

**検証**: 修正後 `grep -rn "15 歳未満\|15歳未満" lib/ app/` = **0 件**(リポ内の表記揺れ解消を確認済み)。

### 継続監視フラグ (優先順・次回ラン用)

1. **Privilege Next Member プロモ 08-14 締切 — 残り 3 日**。書類 + 支払い**両方**の完了が条件・**延長不可 / 返金不可**を原文確認済み → **実質の打診リミットは本日**。対象 = Platinum / Diamond / Reserve (新規申込への家族同時追加・未払い案件の切替も対象)。節約幅 = 250,000〜1,250,000 THB/人。
2. **Privilege Bronze 09-30 期限** — 残り **50 日**・審査 4〜8 週 → 実質申込リミット **8 月中旬**。09-30 以降の Bronze の扱い (存続 / 改定 / 廃止) は **Thailand Privilege 側が未確定**。期限後の最下位は Gold 900k (= +250k)。旧 Elite アップグレードは 08-31 締切。
3. **ノービザ 30 日化の官報公布 (MOI 告示 3〜5 本)** — 未掲載 **17 日連続**。検知即 Owner 通知。巡回 = TAT 07-16 記事 (modified_time + 閲覧数) + **MFA 領事局 (本日 provenance 回復)** + PRD 国際局 + touristpolice。※ MFA 領事局原文は「ประกาศกระทรวงมหาดไทย จำนวน **3 ฉบับ**」= **3 本**、TAT 英文は「**five** related MOI announcements」= **5 本**で**食い違いがある**。次回ラン以降、官報検索時は **3〜5 本の幅**で当たること。
4. **THIM 義務化の正式発表** — 8 月 11 日時点で公式告知ゼロ。断定禁止トーク継続。10/1 の長期滞在者向けモジュール (90 日レポート等) は一次裏取り待ち。division5.immigration.go.th は JS レンダリングのため Chrome 経由取得が未達 (積み残し)。
5. **LTR 扶養枠拡大** — MOI 告示待ち。発効すれば `pricing.ts`「最大 4 名」更新。
6. **DTV**: 「タイ語学校の明示的除外」は本日の一次でも**明文化を確認できず** (e.g. 列挙のみ) → 引き続き二次扱い・監視継続。**KL 版以外 (特に在東京大使館) のチェックリスト原本取得**を次回の優先タスクに格上げ (WALC 顧客は日本申請が主のため、KL 版の要件をそのまま日本客に断定しない)。
7. **国外送還規則** — 法制委員会審査中。官報公布・施行日監視。
8. **指紋ベース犯罪経歴証明** — 運用細則監視。

**運用メモ**: タスク SKILL.md の `lib/walc-data/knowledge.ts` は現存せず (実体 = `lib/concierge/knowledge.ts`)。**9 ラン連続で未対応** — 本ランで実ファイルを直接特定して照合済みのため実害は出ていないが、SKILL.md のパス更新を推奨。

**[未確認]**: `immigration.go.th` / `ratchakitcha.soc.go.th` の直接取得は本日も provenance 未成立 (検索結果に URL が出現しないため web_fetch 不可)。官報未公布の判定は TAT + MFA 領事局 + PRD 国際局の 3 本の一次で代替。THIM 「義務化」の一次原文は本日も未取得。`Checklist_DTV.pdf` の**発行日・改訂日は不明**(PDF 内に記載なし)。

**AI モデル名言及**: 本ラン該当なし (RULE-AI-MODEL-VERIFICATION 抵触なし)。

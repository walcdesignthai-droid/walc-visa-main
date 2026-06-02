# LINE リッチメニュー設定手順書

> **対象**: WALC VISA Consulting LINE 公式アカウント
> **目的**: AI 自動応答停止運用 (`LINE_AI_AUTO_REPLY_ENABLED=false`) に合わせて、
> 顧客の入り口をリッチメニュー経由に集約し、AI 相談は外部ブラウザの
> AI コンシェルジュへ誘導する。
> **作成**: 2026-05-27

---

## 1. 背景

2026-05-27、顧客 LINE 着信に対して WALC スタッフが手動応答している間、
AI も同時に CRM データを参照して別の内容を返信してしまい、顧客が混乱した。
事後、AI 自動応答を全停止する kill switch を webhook に実装した
(`app/api/line/ai-reply/route.ts` v9.0)。

これにより、顧客のメッセージは LINE Manager にだけ届くようになる。
代わりに AI 相談窓口は **外部ブラウザの AI コンシェルジュ**
(<https://dtv.walc-visa.online/?concierge=open&from=line>) に集約する。

リッチメニューはその誘導と、よく押される導線 (申請進捗・料金・スタッフ呼出) を
固定で並べる役割を担う。

---

## 2. リッチメニュー仕様 (推奨構成)

### サイズ

- **タイプ**: Large (2500 × 1686 px) 推奨。Compact でも可
- **背景**: WALC ブランド (dark navy + amber アクセント)。
  画像が無い場合は LINE 公式 Manager のテンプレで 6 分割を選択

### 6 ボタン配置

```
┌──────────────────────────────────────────────┐
│   🤖 AI に相談    │  👤 スタッフに相談  │  📋 申請進捗   │
├──────────────────────────────────────────────┤
│   💰 料金一覧    │  ❓ よくある質問    │  📞 直接連絡   │
└──────────────────────────────────────────────┘
```

### 各ボタンのアクション

| # | ラベル | Action タイプ | 値 | 備考 |
|---|---|---|---|---|
| 1 | 🤖 AI に相談 | **リンク (URI Action)** | `https://dtv.walc-visa.online/?concierge=open&from=line` | 外部ブラウザで AI コンシェルジュが自動 open。LINE 経由ユーザー向け挨拶が表示される |
| 2 | 👤 スタッフに相談 | **メッセージ (Message Action)** | `スタッフに相談したいです` | 顧客から本文送信 → LINE Manager に届く (AI は停止中なので返信は手動) |
| 3 | 📋 申請進捗 | **リンク (URI Action)** | `https://crm.walc-visa.online/portal` | 顧客ポータル(申請ステータス・チャット・請求書) |
| 4 | 💰 料金一覧 | **リンク (URI Action)** | `https://dtv.walc-visa.online/#pricing` | DTV LP の料金セクションへアンカー |
| 5 | ❓ よくある質問 | **リンク (URI Action)** | `https://walc-visa.online/#faq` | メインサイトの FAQ |
| 6 | 📞 直接連絡 | **リンク (URI Action)** | `tel:+66XXXXXXXXX` | 実電話番号は 1Password の `WALC-INTERNAL` vault `LINE OA 設定` を参照 |

---

## 3. LINE Official Account Manager 設定手順

### 前提

- LINE Business ID で `walc-visa-thailand` (LINE 公式) にログイン済
  <https://manager.line.biz/>

### 手順

1. **左サイドバー → ホーム → リッチメニュー**
2. **「作成」** をクリック
3. **タイトル**: `WALC VISA メインメニュー v2 (AI 外部運用)`
4. **表示期間**: 開始日 = 設定日, 終了日 = 未設定 (恒久表示)
5. **テンプレートを選択**: **Large → 6 分割 (Type E: 3列 × 2行)**
6. **コンテンツ設定**:
   - 各エリアをクリックして 1〜6 のアクションを設定
   - ラベル文字列は LINE 上で表示されないが、内部管理用に上表のラベルを入れておく
7. **アクション設定**:
   - **エリア 1 (左上)**: リンク → URL 入力欄に `https://dtv.walc-visa.online/?concierge=open&from=line`
   - **エリア 2 (中上)**: テキスト → `スタッフに相談したいです`
   - **エリア 3 (右上)**: リンク → `https://crm.walc-visa.online/portal`
   - **エリア 4 (左下)**: リンク → `https://dtv.walc-visa.online/#pricing`
   - **エリア 5 (中下)**: リンク → `https://walc-visa.online/#faq`
   - **エリア 6 (右下)**: リンク → `tel:+66XXXXXXXXX` (実電話番号は 1Password 参照)
8. **画像**: ブランド画像を Figma / Canva で作成後アップロード。
   暫定は LINE 公式テンプレでも稼働可
9. **既定で表示**: ✅ ON
10. **保存** → **公開**

---

## 4. 動作確認 (Owner 必須)

公開後、自分の LINE で WALC 公式アカウントを開き、以下を確認:

| 確認項目 | 期待結果 |
|---|---|
| リッチメニューが表示される | ✅ 6 ボタン表示 |
| 🤖 AI に相談 をタップ | 外部ブラウザが立ち上がり `dtv.walc-visa.online` 表示 + AI コンシェルジュが自動 open + LINE 用挨拶が表示 |
| 👤 スタッフに相談 をタップ | 自分の LINE で「スタッフに相談したいです」と送信される。AI は応答せず、LINE Manager 受信箱とスタッフ通知グループに通知 |
| 📋 申請進捗 をタップ | 外部ブラウザで `crm.walc-visa.online/portal` 開く |
| 💰 料金一覧 / ❓ FAQ | 各アンカーへジャンプ |
| 📞 直接連絡 | 電話アプリが起動 |

---

## 5. kill switch との連動関係

```
┌─ 顧客が LINE で自由テキスト送信
│
├─→ Vercel webhook 受信 (walc-visa-main /api/line/ai-reply)
│
├─→ LINE_AI_AUTO_REPLY_ENABLED=false
│   │
│   ├─→ AI 応答完全停止
│   ├─→ notifyStaffMessageInKillSwitch でスタッフ通知グループに送信
│   └─→ スタッフが LINE Manager で手動応答
│
└─ 顧客が「🤖 AI に相談」リッチメニューをタップ
    │
    └─→ 外部ブラウザで dtv.walc-visa.online?concierge=open&from=line
        │
        └─→ AI コンシェルジュが自動 open + LINE 用挨拶
            (LINE webhook を経由しないので kill switch 無関係)
```

**結論**: 顧客の AI 体験は維持しつつ、LINE 上の事故をゼロ化できる。

---

## 6. 将来の改善案

### LIFF 化 (Phase 2 候補・任意)

外部ブラウザではなく LINE 内ブラウザに popup で AI コンシェルジュを開く構成。

**メリット**:

- 顧客が LINE アプリから離脱しない
- LIFF ID で LINE userId / プロフィールを自動引継
- AI 回答を Push 通知で会話履歴にも残せる

**工数**: 約 1〜2 日 (LINE Developers Console での LIFF 登録 + `@line/liff` 組込 + `?liff=true` 経路追加)

**判断軸**: Phase 1 で 1〜2 週間運用してみて、外部ブラウザ遷移の離脱率が高ければ Phase 2 に進む。

### 個別顧客 AI ON/OFF (Phase 3 候補・任意)

CRM 管理画面で顧客ごとに AI 自動応答の ON/OFF を切り替えられる UI。
重要 / VIP 顧客のみ AI を停止して、その他は AI で 1 次対応する運用が可能になる。

---

## 7. 関連ファイル

- `app/api/line/ai-reply/route.ts` (v9.0 kill switch 本体)
- `lib/line/fetch-client.ts` (`notifyStaffMessageInKillSwitch`)
- `dtv-walc-visa/components/concierge/ConciergeBubble.tsx` (URL クエリ自動 open)
- `dtv-walc-visa/components/concierge/ConciergeChat.tsx` (LINE 用初回挨拶)

## 8. Roll back 手順 (緊急時のみ)

AI 自動応答を再開したい場合:

```bash
# Vercel ENV を反転
curl -X PATCH -H "Authorization: Bearer $VERCEL_API_TOKEN" \
  "https://api.vercel.com/v9/projects/prj_nOMrmnhCHS5IzmbeFmmgxmI07Uk5/env/vPP6E6mXL8lKmTfW?teamId=team_Xd9BPzI8ADrlrkN3wa1bxeBQ" \
  -H "Content-Type: application/json" \
  -d '{"value":"true"}'

# Vercel 再デプロイ (もしくは git push で自動再デプロイ)
```

または Vercel Dashboard → walc-visa-main → Settings → Environment Variables →
`LINE_AI_AUTO_REPLY_ENABLED` → Edit → `true` → Save → Redeploy。

---

**最終更新**: 2026-05-27 / WALC DESIGN

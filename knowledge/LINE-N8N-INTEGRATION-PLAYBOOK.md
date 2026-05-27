# LINE + n8n + Vercel 統合プレイブック (WALC 標準)

最終更新: 2026-05-26
対象: LINE OA を Vercel 上の Next.js で受ける全プロジェクト
適用: WALC VISA / 顧客案件 / 自社 SaaS すべて

このドキュメントは WALC が実装で踏んだ落とし穴と、その回避策を体系化したもの。新規 LINE 案件の着手時 / 障害発生時に必ず確認すること。

---

## 1. アーキテクチャ標準形

```
LINE App
  ↓ user event (message / postback / sticker / etc)
LINE Platform
  ↓ webhook
n8n (walc.app.n8n.cloud 等)
  ↓ events[0] をそのまま転送 (POST /api/line/ai-reply)
Vercel Next.js (Node.js runtime / region=hnd1)
  ├─ message → AI 応答 (Gemini / Claude)
  └─ postback → mode 切替 + 通知
```

### 構成要素 (役割分担)

| レイヤー | 役割 | 注意点 |
|---|---|---|
| LINE Platform | webhook 発火元 | 標準 LINE webhook event 形式で送信 |
| n8n | 中継 + 並行処理 (CRM 登録 / 履歴記録 / AI 呼出) | body 加工は最小限・event 全体を転送 |
| Vercel Edge → **Node.js** | エンドポイント本体 | **Edge は LINE Japan API への到達性問題あり (後述)** |
| Supabase | mode 状態管理 / CRM | line_user_modes テーブルで AI/Human モード保存 |

---

## 2. 致命的に重要な Gotcha (踏むと半日溶ける)

### 2.1. **Vercel Edge runtime は LINE Japan API と相性が悪い**

**症状**: `lineReply` / `linePush` / `getLineProfile` がきっかり 30 秒で empty body 504 を返す。
**根因**: Edge runtime は地理的に分散していて、Paris/Frankfurt 等の EU リージョンに割り振られる。LINE API (東京) との TCP/TLS 接続が不安定で 30s タイムアウト。
**`preferredRegion` は hint だけで強制力なし** (Vercel 公式仕様)。

#### 標準解決策

LINE Messaging API を叩く API Route は **必ず Node.js runtime + vercel.json で region 強制固定**:

```typescript
// app/api/line/*/route.ts
export const runtime = "nodejs";
export const maxDuration = 60;
```

```json
// vercel.json
{
  "regions": ["hnd1"]
}
```

→ Node.js Serverless は region pinning が強制される。`hnd1` (東京) で LINE API への低レイテンシ通信。

### 2.2. **replyToken は 30 秒で失効**

**症状**: Reply API が 504 (empty body) を返す。
**根因**: replyToken は LINE 仕様で **30 秒** 有効 (古いドキュメントの 1 分は誤り)。waitUntil 内で Gemini API 数秒 + CRM 呼出 + その他で簡単に超過。

#### 標準解決策

**`replyOrPush(replyToken, userId, messages)` パターン** を必ず使う:

```typescript
export async function replyOrPush(opts: {
  replyToken: string;
  userId?: string;
  messages: LineMessage[];
}): Promise<{ method: "reply" | "push"; ok: boolean }> {
  try {
    await lineReply(replyToken, messages);
    return { method: "reply", ok: true };
  } catch (replyErr) {
    if (userId) {
      try {
        await linePush(userId, messages);
        return { method: "push", ok: true };
      } catch {
        return { method: "push", ok: false };
      }
    }
    return { method: "reply", ok: false };
  }
}
```

Push API は時間制限なし。`userId` があれば fallback 可能。

### 2.3. **n8n は event を加工しないで丸ごと転送する**

**症状**: postback ボタン押下が無反応。endpoint が `missing_required` で early return。
**根因**: n8n の HTTP Request ノードで `{replyToken, userText, userId}` 形式に変換すると、postback event (message プロパティなし) では userText="" になり endpoint で skip される。

#### 標準解決策

n8n の Body 設定は **シンプルに event 全体を転送**:

```javascript
{{ JSON.stringify($json.body.events[0]) }}
```

endpoint 側で event.type を判別:

```typescript
if (event.type === "message" && event.message?.type === "text") {
  // AI 応答
} else if (event.type === "postback") {
  // postback 処理
} else {
  // skip (sticker / image / etc)
}
```

これで:
- 将来の event type 追加 (audio / video / location) にも自動対応
- n8n 編集を最小化 (障害時の diff 確認が楽)

### 2.4. **Rich Menu には 2 種類あり、優先順位が複雑**

**症状**: 「自分のスマホでは見える、友人のスマホには表示されない」
**根因**:
- **Bot API Rich Menu**: Messaging API で作成。Default 設定 (全員) と Individual link (個別) がある
- **UI Rich Menu**: LINE Official Account Manager (manager.line.biz) で作成
- 両者は別管理。UI が「使用中」だと優先される場合あり
- Default 未設定だと、Individual link されたユーザーだけに表示される

#### 標準解決策

新規 Rich Menu 公開時のチェックリスト:

1. **LINE OA Manager の既存 UI Rich Menu を全て「使用停止」**
2. **Bot API で Rich Menu 作成**
3. **PNG アップロード** (2500x1686 推奨)
4. **Default 設定**: `POST /v2/bot/user/all/richmenu/{rm_id}` + `-d ''` (Content-Length 0 必須)
5. **設定確認**: `GET /v2/bot/user/all/richmenu` で `{richMenuId: "..."}` が返ることを確認
6. **既存 Bot Rich Menu の削除** (古いものが残っていると混乱)

#### 注意: `-d ''` を忘れると HTTP 411

```bash
# ✗ NG (HTTP 411 Length Required)
curl -X POST -H "Authorization: Bearer $TOKEN" \
  https://api.line.me/v2/bot/user/all/richmenu/$RM_ID

# ✓ OK
curl -X POST -H "Authorization: Bearer $TOKEN" -d '' \
  https://api.line.me/v2/bot/user/all/richmenu/$RM_ID
```

### 2.5. **Vercel `vercel logs` CLI は信用しすぎない**

**症状**: 関数が動いているのに `vercel logs` が "No logs found" を返す。
**根因**: CLI は "branch=main" でフィルタする (デフォルト)。CLI 経由 (`vercel --prod`) でデプロイした関数のログが拾えないケースあり。

#### 標準解決策

**ダッシュボードのランタイムログを正とする**:
- https://vercel.com/{org}/{project}/logs
- 個別の POST 行をクリック → 右パネルで関連ログ全件展開

CLI は補助的に使う:
```bash
pnpm dlx vercel logs --environment production --since 5m 2>&1 | tail -50
```

### 2.6. **Sensitive 環境変数は `vercel env pull` で空に見える**

**症状**: ローカルと Vercel の env を diff したら token が "" (空) に見えた → 「Vercel が空だから 401」と誤診。
**根因**: Vercel で Sensitive にマークされた env は CLI で値を返さない (空文字列扱い)。

#### 標準解決策

**Token 系の env を diff する場合**:
- ローカルの token で直接 LINE API を叩く (`curl /v2/bot/info`) → HTTP 200 なら token 自体は健全
- Vercel 側の値の検証はダッシュボードでマスク状態を見るしかない
- 不一致を疑う場合は Vercel ダッシュボードで上書き or LINE Console で再発行

### 2.7. **1Password に値を登録する時はスクリプト文を貼らない**

**症状**: 1Password の `LINE_CHANNEL_ACCESS_TOKEN` を取得したら 576 文字でスクリプト断片が混入。
**根因**: 過去の作業でコピペ時に shell コマンド全文を credential として入れてしまった。

#### 標準解決策

```bash
# ✗ NG (shell コマンドごと貼られる可能性)
op item create --category="..." credential="$(pbpaste)"

# ✓ OK (まず変数に入れて長さ確認)
NEW=$(pbpaste | tr -d '\n')
echo "Length: ${#NEW}"   # 期待値 (LINE は 172, Gemini は ~40)
op item edit "..." credential="$NEW"
```

登録後は必ず `op item get` で取得 → 期待文字数か確認。

### 2.8. **Gemini Free Tier = 20 req/day**

**症状**: テスト中に AI 応答が「申し訳ありません」固定になる。
**根因**: Gemini API の Free Tier 上限。

#### 標準解決策

**新規プロジェクトの初期セットアップで必ず Paid Tier に切替**:
- https://aistudio.google.com/app/apikey
- 該当 API key の GCP Project で Billing 有効化
- GCP Console で月 ¥1,500 程度の Budget アラート設定

コスト: 月 100 req/日 程度なら **約 ¥750/月** (Gemini 2.5 Flash)。

### 2.9. **CRM by-line endpoint は email 衝突を救出するパターン**

**症状**: 同じ LINE userId からの POST が 409 "Email already in use"。
**根因**: 過去に placeholder email (`line_*@line.placeholder`) だけ作られて line_user_id が NULL のレコードが残っている。

#### 標準解決策

CRM の by-line endpoint は **rescue UPDATE パターン**:

```typescript
// INSERT 試行
const { error: insErr } = await sb.from('customers').insert({...});

if (insErr?.code === '23505') {  // UNIQUE 違反
  // email で既存レコード取得
  const { data: orphan } = await sb.from('customers')
    .select('*').eq('email', email).maybeSingle();
  
  if (orphan && !orphan.line_user_id) {
    // line_user_id が NULL なら救出 UPDATE
    await sb.from('customers').update({ line_user_id }).eq('id', orphan.id);
    return orphan;
  }
  // 他人に紐付いていれば 409 のまま
}
```

---

## 3. 標準実装パターン (コピペ可能)

### 3.1. mode-store.ts (継続時間定数の集約)

```typescript
// lib/line/mode-store.ts

/** Human モード継続時間 — UI / 通知文と setLineMode で完全一致 */
export const HUMAN_MODE_DURATION_HOURS = 6;
export const HUMAN_MODE_DURATION_MS = HUMAN_MODE_DURATION_HOURS * 60 * 60 * 1000;

// 利用者向けメッセージは ${HUMAN_MODE_DURATION_HOURS} を使ってテンプレ化
// → 24h → 6h 変更時に 1 箇所変更で全箇所反映
```

### 3.2. universal LINE event handler

```typescript
// app/api/line/ai-reply/route.ts
export const runtime = "nodejs";
export const maxDuration = 60;

interface LineEvent {
  type: string;
  replyToken?: string;
  source?: { userId?: string };
  message?: { type: string; text?: string };
  postback?: { data?: string };
}

export async function POST(req: NextRequest) {
  // secret check
  const event: LineEvent = await req.json();
  
  if (!event.replyToken) {
    return NextResponse.json({ ok: true, skipped: "no_reply_token" });
  }
  
  if (event.type === "message" && event.message?.type === "text" && event.message.text) {
    waitUntil(processAiReply({
      replyToken: event.replyToken,
      userText: event.message.text,
      userId: event.source?.userId,
    }));
    return NextResponse.json({ ok: true, queued: "message" });
  }
  
  if (event.type === "postback") {
    waitUntil(handlePostback({
      replyToken: event.replyToken,
      userId: event.source?.userId,
      data: event.postback?.data ?? "",
    }));
    return NextResponse.json({ ok: true, queued: "postback" });
  }
  
  return NextResponse.json({ ok: true, skipped: `unsupported:${event.type}` });
}
```

### 3.3. エラーメッセージの 429 分岐

```typescript
function getUserFriendlyErrorMessage(e: unknown): string {
  const errStr = e instanceof Error ? e.message : String(e);
  const status = e instanceof Error && "status" in e
    ? (e as Error & { status?: number }).status
    : undefined;

  if (status === 429 || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("quota")) {
    return "現在アクセスが集中しております。少々お待ちいただき、改めてお試しください。";
  }
  return "申し訳ありません。一時的に応答できません。改めてお試しください。";
}
```

### 3.4. タイミング計測の標準ログ

```typescript
async function processAiReply(input: AiReplyInput): Promise<void> {
  const t0 = Date.now();
  
  const tMode0 = Date.now();
  const modeInfo = await getLineModeFull(userId);
  console.log(`[ai-reply] getLineModeFull ${Date.now() - tMode0}ms mode=${modeInfo.mode}`);
  
  // ... 同様に CRM / Gemini / Reply 各 phase の時間を log
  
  console.log(`[ai-reply] send via ${result.method} ${ms}ms ok=${result.ok} (total=${Date.now() - t0}ms)`);
}
```

→ 障害時の切り分けが 1 ログで完了。

---

## 4. 診断コマンド集 (障害時即実行)

### 4.1. LINE token 健全性確認

```bash
TOKEN=$(grep "^LINE_CHANNEL_ACCESS_TOKEN=" .env.local | cut -d= -f2-)
echo "Length: ${#TOKEN}"   # 172 が正常
curl -sS -w "\nHTTP %{http_code} (%{time_total}s)\n" \
  -H "Authorization: Bearer $TOKEN" \
  https://api.line.me/v2/bot/info
```

→ HTTP 200 + 1 秒以内 = token 健全。

### 4.2. Rich Menu 状態確認

```bash
echo "=== Default ==="
curl -sS -H "Authorization: Bearer $TOKEN" \
  https://api.line.me/v2/bot/user/all/richmenu

echo "=== 特定 user の個別 link ==="
curl -sS -H "Authorization: Bearer $TOKEN" \
  https://api.line.me/v2/bot/user/{USER_ID}/richmenu

echo "=== 登録一覧 ==="
curl -sS -H "Authorization: Bearer $TOKEN" \
  https://api.line.me/v2/bot/richmenu/list | jq
```

### 4.3. n8n execution 確認

n8n UI → Workflows → [該当] → **Executions タブ** → 直近 execution の OUTPUT 確認:
- `ok: true, queued: true` → endpoint 受領
- `ok: true, skipped: missing_required` → body 形式不一致
- エラー → n8n 側でこけている

### 4.4. Vercel ダッシュボードログ

https://vercel.com/{org}/{project}/logs

→ POST /api/line/ai-reply クリック → 8 行ログ展開
→ Received in {region} 確認 (hnd1 期待)
→ `[ai-reply]` / `[line]` プレフィックスで phase ごとの時間確認

### 4.5. Supabase mode 状態 (Yosuke userId 例)

```bash
SERVICE_KEY=$(op item get "SUPABASE_SERVICE_ROLE_KEY [walc-studio]" \
  --vault WALC-INTERNAL --fields credential --reveal)

curl -sS \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  "https://gphpgrxzvwlrbpwwvwrf.supabase.co/rest/v1/line_user_modes?line_user_id=eq.{USER_ID}"
```

---

## 5. 新規 LINE 連携プロジェクトのセットアップ Checklist

新規顧客案件 / 自社サービスで LINE 連携を始める時の標準手順:

### Phase 0: 事前準備
- [ ] LINE Developers Console で Channel 作成 (Messaging API)
- [ ] Channel access token (long-lived) を発行 → 1Password に保存 (`LINE_CHANNEL_ACCESS_TOKEN [{env}]`)
- [ ] Channel secret も 1Password に保存
- [ ] LINE Official Account Manager の既存 UI Rich Menu を全て「使用停止」

### Phase 1: Vercel プロジェクト初期設定
- [ ] Next.js 15.5.x + Node.js runtime
- [ ] `vercel.json` で `regions: ["hnd1"]` (Tokyo 強制固定)
- [ ] `app/api/line/*/route.ts` で `export const runtime = "nodejs"` + `maxDuration = 60`
- [ ] `WALC_RELAY_SECRET` (32 文字以上ランダム) を 1Password に登録 + Vercel env に追加
- [ ] AI API (Gemini Paid Tier 推奨) を Billing 有効化 + GCP Budget アラート設定

### Phase 2: コード実装
- [ ] `lib/line/fetch-client.ts` (lineReply / linePush / **replyOrPush** / notifyStaffGroup)
- [ ] `lib/line/mode-store.ts` (Supabase line_user_modes テーブル + 定数集約)
- [ ] `lib/line/postback-handler.ts` (postback 処理)
- [ ] `app/api/line/ai-reply/route.ts` (universal handler)
- [ ] Supabase migration: `line_user_modes` テーブル

### Phase 3: n8n ワークフロー
- [ ] Webhook ノード (LINE 受信)
- [ ] HTTP Request ノードで `/api/line/ai-reply` に転送
- [ ] **Body: `{{ JSON.stringify($json.body.events[0]) }}`** (シンプル)
- [ ] Header: `x-walc-relay-secret: {{ $env.WALC_RELAY_SECRET }}`
- [ ] 並行で CRM 登録 / 履歴記録ノード (任意)

### Phase 4: Rich Menu
- [ ] PNG 作成 (2500x1686 推奨)
- [ ] Bot API で Rich Menu 作成
- [ ] PNG アップロード
- [ ] **Default 設定 (必ず `-d ''` 付き)**
- [ ] `GET /v2/bot/user/all/richmenu` で設定確認
- [ ] 友人 / 同僚のアカウントで表示確認

### Phase 5: 動作確認
- [ ] LINE で text メッセージ送信 → AI 応答
- [ ] postback ボタン押下 → mode 切替 + 通知
- [ ] sticker / 絵文字 → skip 処理 (エラーにならない)
- [ ] Vercel ダッシュボードログで Received in `hnd1` 確認
- [ ] 各 phase の timing ログ確認

---

## 6. コスト管理

### AI API
| モデル | Input $/1M | Output $/1M | 月コスト目安 (3000 req/月) |
|---|---|---|---|
| Gemini 2.5 Flash (Paid) ⭐ | $0.30 | $2.50 | ¥750 |
| Claude Haiku 4.5 | $1 | $5 | ¥2,200 |
| Claude Sonnet 4.6 | $3 | $15 | ¥7,500 |

### Vercel
- Hobby: 無料 (個人開発のみ・商用不可)
- **Pro: $20/月** ← WALC 案件の最低ライン
- waitUntil 60 秒対応も Pro から

### Supabase
- Free: 500 MB DB / 50K MAU
- **Pro: $25/月** ← 商用なら必須

### GCP Budget アラート (必須)
- AI API プロジェクトに月 ¥1,500 (50% / 90% / 100%) でアラート設定
- 暴走防止

---

## 7. 過去の事故ログ (再発防止)

### Case 1: Edge runtime → LINE 30s ハング (2026-05-26)
- 症状: Reply / Push 両方 504 で 30s 経過
- 真因: Edge が Paris で実行 → LINE Japan 到達性問題
- 解決: Node.js runtime + vercel.json regions=hnd1
- 所要修復時間: 約 2 時間 (preferredRegion 効かない検証含む)

### Case 2: postback 無反応 (2026-05-26)
- 症状: 「スタッフに繋ぐ」ボタン押下で何も起きない
- 真因: n8n が postback も /api/line/ai-reply に流す + endpoint が flat 形式 ({replyToken, userText}) 期待のため userText="" で skip
- 解決: universal handler + n8n body 簡素化
- 所要修復時間: 約 30 分

### Case 3: Rich Menu が個別ユーザーにだけ表示 (2026-05-26)
- 症状: Yosuke の LINE にだけ表示、友人には何も表示されない
- 真因: Default Rich Menu 未設定 + Yosuke にだけ Individual link
- 解決: `POST /v2/bot/user/all/richmenu/{id}` with `-d ''`
- 過去のスクリプトで Default 設定 API を呼んだが `-d ''` 抜けで HTTP 411 → エラー握りつぶしで気付けなかった
- 所要修復時間: 約 20 分

### Case 4: Gemini Free Tier 上限 (2026-05-26)
- 症状: AI 応答が「申し訳ありません」固定
- 真因: 20 req/day 超過
- 解決: Paid Tier 化 + Budget アラート
- 所要修復時間: 約 10 分

### Case 5: 1Password 値の文字列汚染 (2026-05-26)
- 症状: op item get で 576 文字、スクリプト断片が credential に混入
- 真因: 過去のコピペ操作ミス
- 解決: .env.local の正値で上書き
- 教訓: 登録後は必ず `${#TOKEN}` で文字数確認

---

## 8. アンチパターン (絶対やってはいけない)

| アンチパターン | 正しいやり方 |
|---|---|
| Edge runtime で LINE Messaging API を叩く | Node.js runtime + region=hnd1 |
| Reply API のみで応答 (Push fallback なし) | replyOrPush 必ず使用 |
| n8n で event を flat 加工 ({replyToken, userText}) | events[0] そのまま転送 |
| Rich Menu Default 設定で `-d ''` 抜き | 必ず `-d ''` 付与 |
| Channel secret や API key を平文 commit | 1Password / Vercel env 経由のみ |
| Gemini Free Tier のまま運用 | Paid + Budget アラート |
| HUMAN_MODE_DURATION を複数箇所にハードコード | 定数集約 + import |
| `vercel logs` だけで判断 | ダッシュボードログを正とする |
| 確証なしで「完全に分かった」と断言 | 事実とラベル付き仮説を分離 |
| `cat >> file << EOF` で複雑なコード追記 | Edit/Write ツール経由 |

---

## 9. AI Agent 向けノート (今後のセッションで参照)

このプレイブックは AI Agent が **新規 LINE 案件着手時** および **障害発生時** に必ず先頭から読むべき内容。

### 障害が起きた時の標準診断順序

1. **症状から事実を 3 つ集める** (推測ではなく、ログ / レスポンス / スクショ)
2. **真因の候補を 2-3 個リストアップ** (各候補に確証レベルを明示)
3. **最も確証が高い候補を 1 コマンドで検証** (curl / log filter)
4. **検証結果から対策を決定** (推測で大幅な改修をしない)

### 「完全に分かった」を言わない

確証なしで断言すると、検証もせず無関係な箇所を改修して時間を浪費する。常に:
- 「**確定した事実**」(検証済み)
- 「**確度高の仮説**」(まだ未検証)
- 「**確証なしの推測**」(他に手がかりがない時の叩き台)

を明示的に分けて報告すること。

### 場当たり修正の検知

同じ症状に対して 3 回以上修正案が変わったら、**根本原因の理解が間違っている可能性** を疑う。一旦立ち止まり、フロー全体図を書き直して観測点を再設定する。

---

## Appendix A: 1Password 標準命名規則

```
{SERVICE}_{TYPE} [{env}]

例:
- LINE_CHANNEL_ACCESS_TOKEN [production]
- LINE_CHANNEL_SECRET [production]
- GEMINI_API_KEY [production]
- SUPABASE_SERVICE_ROLE_KEY [walc-studio]
- WALC_RELAY_SECRET [production]
```

Vault: `WALC-INTERNAL`
Category: `API Credential` または `Database` または `Secure Note`

---

## Appendix B: 参照リンク

- LINE Messaging API: https://developers.line.biz/en/docs/messaging-api/
- Vercel Runtime: https://vercel.com/docs/functions/runtimes
- Vercel Regions: https://vercel.com/docs/edge-network/regions
- Gemini Pricing: https://ai.google.dev/pricing
- n8n Workflow: https://docs.n8n.io/
- Supabase: https://supabase.com/docs

---

このプレイブックは生きたドキュメント。新しい落とし穴を踏んだら必ず追記すること。

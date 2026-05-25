#!/bin/bash
# ============================================================================
# WALC Projects レジストリ永続化セットアップ
# ----------------------------------------------------------------------------
# セッション跨ぎで情報が失われる問題を解決:
#   1. ~/walc-projects/REGISTRY.md (グローバル・全プロジェクト一覧)
#   2. ~/walc-projects/walc-visa-main/AGENTS.md (個別レジストリ追記)
#   3. dtv-walc-visa/AGENTS.md にもクロスリファレンス
# ============================================================================

set -e

ROOT="$HOME/walc-projects"
WMV="$ROOT/walc-visa-main"
DTV="$ROOT/dtv-walc-visa"

# ============================================================================
# 1. グローバルレジストリ ~/walc-projects/REGISTRY.md
# ============================================================================
echo "→ Create ~/walc-projects/REGISTRY.md (global)"

cat > "$ROOT/REGISTRY.md" <<'REG_EOF'
# WALC Projects Registry

> 全 WALC プロジェクトの基本情報一覧。
> **セッション開始時に必ず参照すること。** Claude / Cowork は新セッションで
> このファイルとプロジェクト個別 CLAUDE.md / AGENTS.md を自動読込してください。
> 「Vercel project は?」「Supabase は?」等を毎回確認しないこと。

最終更新: 2026-05-26

---

## 共通設定(全プロジェクト共通)

- **Vercel Team**: `walc-design`(internal ID: `walcdesignthai-9322`)
- **GitHub Org**: `walcdesignthai-droid`
- **Git commit author**: `WALC DESIGN <walc.design.thai@gmail.com>`
- **1Password Vault (secrets)**: `WALC-INTERNAL` (API keys / tokens)
- **1Password Vault (apps)**: `WALC-APPS`
- **DNS Registrar**: ConoHa WING (大半のドメイン)

### 1Password Item 命名規則

```
{SERVICE}_{TYPE} [environment]
例: ANTHROPIC_API_KEY [production]
    SUPABASE_SERVICE_ROLE [production]
    VERCEL_TOKEN [production]
```

タグ: `env:production`, `scope:internal`, `service:{name}`

### 1Password CLI 使い方(WALC 標準)

```bash
# サインイン (必要時)
eval $(op signin)

# 値取得
op item get "<item名>" --vault WALC-INTERNAL --fields credential --reveal

# .env.local に差し込み (sed 方式)
API_KEY=$(op item get "ANTHROPIC_API_KEY [production]" --vault WALC-INTERNAL --fields credential --reveal)
sed -i '' "s|^ANTHROPIC_API_KEY=.*|ANTHROPIC_API_KEY=$API_KEY|" .env.local
```

---

## アクティブプロジェクト

### walc-visa.online 系

| プロジェクト | 用途 | 本番ドメイン | Vercel Project | GitHub Repo |
|---|---|---|---|---|
| **dtv-walc-visa** | DTV 専用 LP + AI 診断 | https://dtv.walc-visa.online | `dtv-walc-visa` | `walcdesignthai-droid/dtv-walc-visa` |
| **walc-visa-main** | メインサイト + AI Concierge | https://walc-visa.online | `walc-visa-main` | `walcdesignthai-droid/walc-visa-main` |
| **walc-visa-crm** | CRM (申込フォーム・顧客管理) | https://crm.walc-visa.online | `walc-visa-crm` | `walcdesignthai-droid/walc-visa-crm` |

### その他

(必要に応じて追記)

---

## サービス連携状況

### Supabase

| プロジェクト | Supabase Project ID | 用途 |
|---|---|---|
| dtv-walc-visa | `wcqxqivvidtprexghucc` (ap-northeast-1) | 診断結果・LP 解析 |
| walc-visa-main | (未使用・将来 AI Concierge 会話履歴用) | — |
| walc-visa-crm | (要確認) | 顧客 DB |

### Anthropic API

| プロジェクト | 用途 | 1Password reference |
|---|---|---|
| walc-visa-main | AI VISA Concierge (Claude Sonnet) | `op://WALC-INTERNAL/ANTHROPIC_API_KEY [production]/credential` |
| dtv-walc-visa | (将来 AI 機能追加時) | 同上 |

### LINE

| 用途 | URL / Token |
|---|---|
| 友だち追加 | https://lin.ee/pQkudMM |
| Channel Access Token | `op://WALC-INTERNAL/LINE_CHANNEL_ACCESS_TOKEN [production]/credential` (要確認) |

---

## セッション開始時チェックリスト(Claude 側)

新セッションで作業を始める前に必ず:

```
☐ このファイル (~/walc-projects/REGISTRY.md) を読む
☐ ~/walc-projects/CLAUDE.md (マスタールール) を読む
☐ 作業対象プロジェクトの CLAUDE.md / AGENTS.md を読む
☐ ユーザーから新情報をもらったら、即このファイル + 該当 AGENTS.md に追記する
   (例: 新ドメイン取得、新 SaaS 契約、新 API key 発行 等)
```

---

## 共通スタック(Next.js プロジェクト)

```
Next.js 15.5.x or 16.x + React 19 + TypeScript 5 strict
Tailwind CSS 4 (beta)
Biome 2.4 / pnpm 9.12+
motion v12 / lucide-react
@anthropic-ai/sdk (AI 機能あり)
@supabase/supabase-js (DB 必要時)
```

---

## 改訂履歴

| 日付 | 変更内容 |
|---|---|
| 2026-05-26 | 初版作成。walc-visa-main / dtv-walc-visa / walc-visa-crm 3 プロジェクト登録 |
REG_EOF

echo "  ✓ ~/walc-projects/REGISTRY.md created"
echo ""

# ============================================================================
# 2. walc-visa-main/AGENTS.md に個別レジストリ追加
# ============================================================================
echo "→ Update walc-visa-main/AGENTS.md (project registry)"

# 既存 AGENTS.md があれば bak で保存
if [ -f "$WMV/AGENTS.md" ]; then
  cp "$WMV/AGENTS.md" "$WMV/AGENTS.md.bak"
fi

cat > "$WMV/AGENTS.md" <<'AGENTS_EOF'
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:walc-secrets-rule -->
# WALC Secrets / API Keys ルール(絶対遵守)

全 secrets は 1Password (Vault: `WALC-INTERNAL`) に集約済。
ユーザーへ「API key 取得しましたか?」「環境変数設定しましたか?」を**毎回確認しないこと**。

詳細は `~/walc-projects/REGISTRY.md` の「1Password CLI 使い方」セクション参照。
<!-- END:walc-secrets-rule -->

<!-- BEGIN:walc-visa-main-registry -->
# walc-visa-main プロジェクトレジストリ

> 詳細な全社共通情報は `~/walc-projects/REGISTRY.md` を参照。

## 基本情報

- **プロジェクト名**: walc-visa-main
- **用途**: WALC VISA Consulting メインサイト + AI VISA Concierge
- **本番ドメイン**: https://walc-visa.online (Phase 2 切替予定)
- **仮ドメイン**: https://walc-visa-main.vercel.app
- **設立**: 2026-05-25

## GitHub

- **Repository**: https://github.com/walcdesignthai-droid/walc-visa-main
- **Branch**: main
- **Auto-deploy**: 有効(push で Vercel に自動デプロイ)
- **Commit author**: `WALC DESIGN <walc.design.thai@gmail.com>` (固定)

## Vercel

- **Team**: walc-design (`walcdesignthai-9322`)
- **Project**: walc-visa-main
- **Dashboard**: https://vercel.com/walc-design/walc-visa-main
- **Settings → Domains**: walc-visa.online (apex) + www.walc-visa.online + walc-visa-main.vercel.app

## ConoHa WING (DNS)

- **管理ドメイン**: walc-visa.online
- **DNS Records (Vercel 向け)**:
  - `A    @    76.76.21.21              TTL 3600`
  - `CNAME www cname.vercel-dns.com     TTL 3600`
- **MX**: 触らない(WALC メール運用)

## 1Password (secrets)

| Key | Vault | Item | Field |
|---|---|---|---|
| ANTHROPIC_API_KEY | WALC-INTERNAL | `ANTHROPIC_API_KEY [production]` | credential |
| ANTHROPIC_MODEL | (env value) | — | `claude-sonnet-4-5-20250929` |
| (将来) NEXT_PUBLIC_SUPABASE_URL | WALC-INTERNAL | `SUPABASE_URL [production]` | credential |
| (将来) SUPABASE_SERVICE_ROLE_KEY | WALC-INTERNAL | `SUPABASE_SERVICE_ROLE [production]` | credential |

## .env.local 注入コマンド (1Password CLI)

```bash
cd ~/walc-projects/walc-visa-main

# ANTHROPIC_API_KEY のみ注入(現状)
API_KEY=$(op item get "ANTHROPIC_API_KEY [production]" --vault WALC-INTERNAL --fields credential --reveal)
sed -i '' "s|^ANTHROPIC_API_KEY=.*|ANTHROPIC_API_KEY=$API_KEY|" .env.local
```

## Vercel 環境変数登録 (Production)

```bash
op item get "ANTHROPIC_API_KEY [production]" --vault WALC-INTERNAL --fields credential --reveal | \
  pnpm dlx vercel env add ANTHROPIC_API_KEY production
```

## スタック

- Next.js 16.2.6 + React 19 + TypeScript 5 strict
- Tailwind CSS 4 (beta)
- Biome 2.4.15 / pnpm 9.x
- motion v12 / lucide-react / @radix-ui/react-slot
- @anthropic-ai/sdk (AI Concierge)

## ナレッジベース連携

- **SoT**: `~/walc-projects/dtv-walc-visa/docs/walc-knowledge-source/knowledge_base/*.md`
- **同期**: `pnpm knowledge:sync` (dtv-walc-visa から copy)
- **dev 反映**: 即時(NODE_ENV !== production はメモリキャッシュ無効)

## セクション構成

```
Header
├ Hero (バンコク夜景背景 + 浮かぶ実績カード)
├ TrustStrip (5 metric items)
├ VisaTypes (6 visa cards, DTV highlighted)
├ WhyWalc (3 reasons)
├ CompanyInfo (6 fields)
├ Process (4 steps)
├ Founder (小野寺 陽介 / placeholder photo: YO initials)
└ FinalCta (LINE + apply)
Footer
ConciergeBubble (right-bottom, AI Sonnet)
```

## 未完了タスク

- [ ] Phase 2: walc-visa.online DNS 切替 (ConoHa WING)
- [ ] Phase 3: 旧 WP データ退避 + サイト撤去
- [ ] Yosuke 顔写真 (placeholder YO → 実写真)
- [ ] 法人系 VISA 料金確定 (BOI / Co.,Ltd / 駐在員)
- [ ] Sprint 2: Testimonials / Pricing / FAQ
- [ ] SSE 完成度確認 (本番でレスポンス時間計測)
<!-- END:walc-visa-main-registry -->
AGENTS_EOF

echo "  ✓ walc-visa-main/AGENTS.md updated"
echo ""

# ============================================================================
# 3. dtv-walc-visa/AGENTS.md にクロスリファレンス追加
# ============================================================================
echo "→ Add cross-reference to dtv-walc-visa/AGENTS.md"

# 既に walc-projects-cross-ref がなければ追加
if ! grep -q "BEGIN:walc-projects-cross-ref" "$DTV/AGENTS.md" 2>/dev/null; then
  cat >> "$DTV/AGENTS.md" <<'CROSSREF_EOF'

<!-- BEGIN:walc-projects-cross-ref -->
# 関連 WALC プロジェクト

- **walc-visa-main** (`~/walc-projects/walc-visa-main`) — メインサイト walc-visa.online
  - DTV LP の デザイントークン・WalcLogo・Header/Footer 共通利用
  - ナレッジ SoT は本プロジェクト (`docs/walc-knowledge-source/knowledge_base/`)
  - `pnpm knowledge:sync` で walc-visa-main に同期

- **walc-visa-crm** (`~/walc-projects/walc-visa-crm`) — CRM (crm.walc-visa.online)
  - 申込フォーム連携先 (`buildApplicationUrl({ visaId, source })`)

全プロジェクト共通レジストリ: `~/walc-projects/REGISTRY.md`
<!-- END:walc-projects-cross-ref -->
CROSSREF_EOF
  echo "  ✓ dtv-walc-visa/AGENTS.md cross-ref added"
else
  echo "  ✓ dtv-walc-visa/AGENTS.md cross-ref already exists (skip)"
fi
echo ""

# ============================================================================
# 4. ~/walc-projects/CLAUDE.md にレジストリ参照を追加
# ============================================================================
echo "→ Ensure ~/walc-projects/CLAUDE.md references REGISTRY.md"

MASTER_CLAUDE="$ROOT/CLAUDE.md"

if [ ! -f "$MASTER_CLAUDE" ]; then
  echo "  ! $MASTER_CLAUDE not found (skipping master rule update)"
elif ! grep -q "BEGIN:walc-registry-reference" "$MASTER_CLAUDE" 2>/dev/null; then
  cat >> "$MASTER_CLAUDE" <<'MASTER_EOF'

<!-- BEGIN:walc-registry-reference -->
# 🔒 セッション開始時の必読ファイル

新セッション開始時、もしくは情報が不明になった時は必ず:

1. **`~/walc-projects/REGISTRY.md`** — 全プロジェクト一覧 + 共通設定
2. 作業対象プロジェクトの **`CLAUDE.md` / `AGENTS.md`** — プロジェクト個別情報

これらにユーザーから聞いた情報(Vercel project ID / Supabase / 1Password items / DNS 等)が
全て記録されているため、「Vercel は?」「1Password は?」を毎回確認する必要はありません。

新情報を入手した際は、即この 2 ファイルに追記すること。
<!-- END:walc-registry-reference -->
MASTER_EOF
  echo "  ✓ ~/walc-projects/CLAUDE.md updated"
else
  echo "  ✓ ~/walc-projects/CLAUDE.md already has reference (skip)"
fi
echo ""

# ============================================================================
# 5. dtv-walc-visa の git に追加
# ============================================================================
echo "→ Stage changes in dtv-walc-visa"
cd "$DTV"
git add AGENTS.md
git commit -m "docs(agents): cross-reference walc-visa-main + REGISTRY.md" 2>/dev/null || echo "  (no changes to commit in dtv-walc-visa)"

echo ""
echo "→ Stage changes in walc-visa-main"
cd "$WMV"
git add AGENTS.md
git commit -m "docs(agents): full project registry (Vercel/GitHub/ConoHa/1Password)" 2>/dev/null || echo "  (no changes to commit)"

echo ""
echo "============================================================================"
echo "✓ WALC Registry セットアップ完了"
echo "============================================================================"
echo ""
echo "今後の効果:"
echo "  ✓ 次セッションで自動的に REGISTRY.md + AGENTS.md が context に注入される"
echo "  ✓ Vercel / GitHub / Supabase / 1Password / DNS 情報を毎回確認不要"
echo "  ✓ 新情報を聞いたら、即 REGISTRY.md or 該当 AGENTS.md に追記"
echo ""
echo "次セッション開始時の挨拶例:"
echo "  「~/walc-projects/REGISTRY.md と walc-visa-main/AGENTS.md を確認した上で、"
echo "   Phase 3 の WP データ退避を進めて」"
echo "  → 私が即文脈把握 → 確認質問ゼロ → 作業に直行"

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

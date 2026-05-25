#!/bin/bash
# ============================================================================
# walc-visa-main Phase 1: 仮ドメイン本番ビルド
# ----------------------------------------------------------------------------
# 1. v2.1 が未適用なら適用
# 2. Vercel 環境変数登録 (1Password → Vercel) Production
# 3. 本番デプロイ
# 4. 仮ドメイン URL を表示
# ============================================================================

set -e

WMV="$HOME/walc-projects/walc-visa-main"
DTV="$HOME/walc-projects/dtv-walc-visa"
cd "$WMV"

# ============================================================================
# 0. 前提チェック
# ============================================================================
echo "→ 前提チェック"

if ! command -v op &>/dev/null; then
  echo "✗ 1Password CLI (op) がインストールされていません"
  exit 1
fi

if ! op vault list &>/dev/null; then
  echo "✗ 1Password CLI 未サインイン。実行: eval \$(op signin)"
  exit 1
fi

if ! command -v vercel &>/dev/null && ! pnpm dlx vercel --version &>/dev/null; then
  echo "✗ Vercel CLI が使えません。pnpm dlx vercel で確認してください"
  exit 1
fi

echo "  ✓ 1Password CLI OK"
echo "  ✓ Vercel CLI OK"
echo ""

# ============================================================================
# 1. v2.1 適用確認
# ============================================================================
echo "→ v2.1 適用確認"

if ! grep -q "stripCtaTags" "$WMV/components/concierge/ConciergeChat.tsx" 2>/dev/null; then
  echo "  ! v2.1 未適用。適用中..."
  bash "$DTV/walc-visa-main-concierge-v2.1.sh"
else
  echo "  ✓ v2.1 適用済み"
fi
echo ""

# ============================================================================
# 2. 未 push の commit があれば push
# ============================================================================
echo "→ git status 確認"
git status --short

if [ -n "$(git log @{u}..HEAD --oneline 2>/dev/null)" ]; then
  echo ""
  echo "→ 未 push の commit を push"
  git push
else
  echo "  ✓ all commits pushed"
fi
echo ""

# ============================================================================
# 3. Vercel 環境変数登録 (1Password から取得)
# ============================================================================
echo "→ Vercel 環境変数登録 (Production)"
echo ""

# ANTHROPIC_API_KEY
echo "  - ANTHROPIC_API_KEY"
API_KEY=$(op item get "ANTHROPIC_API_KEY [production]" --vault WALC-INTERNAL --fields credential --reveal)

# Vercel env に既に登録されているか確認
EXISTING=$(pnpm dlx vercel env ls production 2>/dev/null | grep "^  ANTHROPIC_API_KEY" || true)
if [ -n "$EXISTING" ]; then
  echo "    ! 既に登録済み。差し替えるため一旦削除"
  echo "y" | pnpm dlx vercel env rm ANTHROPIC_API_KEY production 2>/dev/null || true
fi

# 登録
printf "%s" "$API_KEY" | pnpm dlx vercel env add ANTHROPIC_API_KEY production > /dev/null 2>&1
echo "    ✓ 登録完了"

# ANTHROPIC_MODEL
echo "  - ANTHROPIC_MODEL"
EXISTING_MODEL=$(pnpm dlx vercel env ls production 2>/dev/null | grep "^  ANTHROPIC_MODEL" || true)
if [ -n "$EXISTING_MODEL" ]; then
  echo "    ! 既に登録済み。スキップ"
else
  printf "claude-sonnet-4-5-20250929" | pnpm dlx vercel env add ANTHROPIC_MODEL production > /dev/null 2>&1
  echo "    ✓ 登録完了"
fi

echo ""

# ============================================================================
# 4. 本番デプロイ
# ============================================================================
echo "→ Vercel 本番デプロイ"
echo ""
pnpm dlx vercel --prod

echo ""
echo "============================================================================"
echo "✓ Phase 1 完了"
echo "============================================================================"
echo ""
echo "次の手順:"
echo ""
echo "  1. 上記の Production URL を開いて全機能チェック:"
echo "     - Hero / TrustStrip / VisaTypes / WhyWalc / CompanyInfo / Process"
echo "     - Founder / FinalCta / Footer"
echo "     - AI Concierge (右下バブル → 質問 → ストリーミング応答 + CTA ボタン)"
echo "     - モバイル表示"
echo ""
echo "  2. 全機能 OK なら Phase 2 (独自ドメイン切替) に進む"
echo ""
echo "  3. 問題があれば URL を共有 + エラー内容を報告"

#!/bin/bash
# ============================================================================
# WALC 1Password → .env.local 即時差し込み
# ----------------------------------------------------------------------------
# - Vault: WALC-INTERNAL
# - Item:  ANTHROPIC_API_KEY [production]
# - Field: 自動探索 (credential / password / api_key / etc.)
# ============================================================================

set -e

cd ~/walc-projects/walc-visa-main

VAULT="WALC-INTERNAL"
ITEM="ANTHROPIC_API_KEY [production]"

echo "================================================================"
echo "1Password item 構造の確認"
echo "================================================================"
op item get "$ITEM" --vault "$VAULT" 2>&1 | head -40
echo ""

echo "================================================================"
echo "フィールド自動探索 → API key 取得"
echo "================================================================"

API_KEY=""
FOUND_FIELD=""
for FIELD in credential password "api key" api_key token value secret; do
  CANDIDATE=$(op read "op://$VAULT/$ITEM/$FIELD" 2>/dev/null || true)
  if [ -n "$CANDIDATE" ] && [ "$CANDIDATE" != "null" ]; then
    API_KEY="$CANDIDATE"
    FOUND_FIELD="$FIELD"
    echo "✓ Found field: '$FIELD'"
    break
  fi
done

if [ -z "$API_KEY" ]; then
  echo ""
  echo "✗ 標準フィールドで取得できませんでした。手動確認:"
  echo "  op item get \"$ITEM\" --vault \"$VAULT\" --format=json | grep -E '\"(label|id)\":'"
  exit 1
fi

# .env.local に差し込み
sed -i '' "s|^ANTHROPIC_API_KEY=.*|ANTHROPIC_API_KEY=$API_KEY|" .env.local
echo ""
echo "================================================================"
echo "差し込み結果"
echo "================================================================"
PREVIEW=$(grep ^ANTHROPIC_API_KEY .env.local | cut -c1-30)
echo "✓ $PREVIEW..."
echo ""
echo "確定した 1Password reference:"
echo "  op://$VAULT/$ITEM/$FOUND_FIELD"
echo ""
echo "================================================================"
echo "次のコマンド: dev サーバー再起動"
echo "================================================================"
echo "  kill 3266 2>/dev/null; pnpm dev"

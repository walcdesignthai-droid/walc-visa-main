#!/bin/bash
# ============================================================================
# WALC ナレッジ同期: dtv-walc-visa (SoT) → walc-visa-main
# ----------------------------------------------------------------------------
# - knowledge_base/*.md を walc-visa-main にコピー
# - system prompt のメモリキャッシュをリセットするため dev 再起動を促す
# ============================================================================

set -e

DTV="$HOME/walc-projects/dtv-walc-visa"
WMV="$HOME/walc-projects/walc-visa-main"

echo "→ Sync knowledge_base from SoT (dtv-walc-visa) to walc-visa-main"
cp "$DTV/docs/walc-knowledge-source/knowledge_base/"*.md \
   "$WMV/docs/walc-knowledge-source/knowledge_base/"

cd "$WMV"

echo "→ Changed files:"
git -C "$WMV" status --short docs/walc-knowledge-source/

echo ""
echo "→ git commit (knowledge update)"
git add docs/walc-knowledge-source/
git commit -m "knowledge: 学生VISA(NON-ED)の口座開設可否を詳細化

語学学校・ムエタイ・調理学校等の私塾系 → 開設不可
認可大学・高度専門学校系 → 開設可能
顧客対応スクリプト + 銀行・支店別の運用注意も追記"

echo ""
echo "============================================================================"
echo "✓ Knowledge synced + committed!"
echo "============================================================================"
echo ""
echo "重要: system prompt のメモリキャッシュをリセットするため"
echo "      dev サーバーを必ず再起動してください:"
echo ""
echo "  ps aux | grep 'next dev' | grep -v grep"
echo "  kill <PID>"
echo "  pnpm dev"
echo ""
echo "再起動後、AI に再度「学生VISAでも口座開設できますか?」と聞くと"
echo "学校種別による違いを正確に答えるようになります。"

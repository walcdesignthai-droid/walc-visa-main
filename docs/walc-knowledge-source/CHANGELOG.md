# WALC VISA knowledge-source changelog

## 2026-07-29

### Changed

- AIランタイムのナレッジを、所有者確認済みの現行運用と銀行口座開設運用の2ファイルに限定。
- 2026年5月以前の旧8ファイルを `legacy / internal-only` と明記。
- 旧VISA辞書に含まれていた未再検証の料金、期間、税務、口座可否、推奨ロジックを生成済みAIナレッジから除外。
- ランタイム正本とビルドallowlistの不一致を検出する回帰テストを追加。
- 公開正本の `status: owner_confirmed` が欠ける場合、ナレッジ生成を失敗させるよう変更。

### Validation

- `pnpm knowledge:build`
- `pnpm test`
- `pnpm typecheck`
- `pnpm build`

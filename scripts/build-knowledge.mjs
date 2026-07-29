#!/usr/bin/env node
/**
 * scripts/build-knowledge.mjs
 * ----------------------------------------------------------------------------
 * docs/walc-knowledge-source/knowledge_base/*.md を統合して
 * lib/concierge/knowledge.ts (TypeScript const) として書き出す。
 *
 * 理由:
 *   - Edge Runtime は fs.readFileSync が使えない
 *   - ビルド時に static import 形式にして Edge 対応 + 高速化
 *
 * 実行: pnpm knowledge:build (or knowledge:sync 内から自動呼出)
 * ----------------------------------------------------------------------------
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { hasOwnerConfirmedFrontmatter } from "./knowledge-frontmatter.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const KNOWLEDGE_FILES = [
	"00_current_operations.md",
	"07_bank_account_current.md",
];

const blocks = KNOWLEDGE_FILES.map((file) => {
	const path = join(ROOT, "docs/walc-knowledge-source/knowledge_base", file);
	const content = readFileSync(path, "utf-8");

	if (!hasOwnerConfirmedFrontmatter(content)) {
		throw new Error(
			`Runtime knowledge source must be owner_confirmed: ${file}`,
		);
	}

	return `<file path="knowledge_base/${file}">\n${content}\n</file>`;
}).join("\n\n");

// テンプレートリテラル衝突回避: バッククォート・${} をエスケープ
const escaped = blocks.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const output = `/**
 * lib/concierge/knowledge.ts
 * ----------------------------------------------------------------------------
 * AUTO-GENERATED — Do not edit manually.
 * Source: owner-confirmed allowlist in scripts/build-knowledge.mjs
 * Build:  pnpm knowledge:build (or pnpm knowledge:sync)
 * ----------------------------------------------------------------------------
 */

export const KNOWLEDGE_BASE = \`${escaped}\`;
`;

const outPath = join(ROOT, "lib/concierge/knowledge.ts");
writeFileSync(outPath, output, "utf-8");

console.log(
	`✓ Built lib/concierge/knowledge.ts (${escaped.length} chars from ${KNOWLEDGE_FILES.length} files)`,
);

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
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const KNOWLEDGE_FILES = [
	"00_walc_principles.md",
	"01_walc_company_info.md",
	"02_pricing_master.md",
	"03_thai_visa_glossary.md",
	"04_immigration_practice.md",
	"05_overstay_practice.md",
	"06_tax_180day_rule.md",
	"07_bank_account_2026.md",
];

const blocks = KNOWLEDGE_FILES.map((file) => {
	const path = join(ROOT, "docs/walc-knowledge-source/knowledge_base", file);
	try {
		const content = readFileSync(path, "utf-8");
		return `<file path="knowledge_base/${file}">\n${content}\n</file>`;
	} catch (e) {
		console.warn(`! ${file} not found`);
		return `<file path="knowledge_base/${file}" status="not_found"></file>`;
	}
}).join("\n\n");

// テンプレートリテラル衝突回避: バッククォート・${} をエスケープ
const escaped = blocks.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const output = `/**
 * lib/concierge/knowledge.ts
 * ----------------------------------------------------------------------------
 * AUTO-GENERATED — Do not edit manually.
 * Source: docs/walc-knowledge-source/knowledge_base/*.md
 * Build:  pnpm knowledge:build (or pnpm knowledge:sync)
 * ----------------------------------------------------------------------------
 */

export const KNOWLEDGE_BASE = \`${escaped}\`;
`;

const outPath = join(ROOT, "lib/concierge/knowledge.ts");
writeFileSync(outPath, output, "utf-8");

console.log(`✓ Built lib/concierge/knowledge.ts (${escaped.length} chars from ${KNOWLEDGE_FILES.length} files)`);

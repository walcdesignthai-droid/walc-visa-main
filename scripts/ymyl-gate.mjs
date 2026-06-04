#!/usr/bin/env node
/**
 * scripts/ymyl-gate.mjs — ブログ記事の YMYL / 景表法ゲート(恒久・単一正本)
 * ----------------------------------------------------------------------------
 * WALC VISA = YMYL(ビザ=お金・生活)。誇大・断定・保証表現を本番前に機械検出する。
 * WI-038-fix(最も/最適 反映漏れ)を恒久化。WI-overnight Batch F。
 *
 * 使い方:
 *   node scripts/ymyl-gate.mjs            # lib/blog/*.ts を走査
 *   node scripts/ymyl-gate.mjs <file...>  # 指定ファイルのみ
 * 仕様:
 *   - コメント行(スラッシュ2つ や アスタリスク で始まる行)は除外(先頭の禁止語リスト等で誤検出しないため)。
 *   - banned 表現を1つでも検出したら exit 1(CI/pre-commit でブロック可能)。
 *   - 「保証」は免責句のみ許容: 「保証するものではありません」「保証する性質のものではありません」。
 *     それ以外の文脈での "保証" / "完全保証" は NG。
 * ----------------------------------------------------------------------------
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// 単一正本の banned 集合(本番コピーで使用禁止の景表法 NG 表現)。
const BANNED = [
	"最高",
	"最安",
	"最強",
	"最大級",
	"最適",
	"最も",
	"業界一",
	"断然",
	"完全保証",
	"必ず",
	"100%",
	"他社は",
	"タイ国内最大級",
];
// 動的(数字付き)NG: 取得率N% / 成功率N% / No.1。
const BANNED_RE = [/No\.?\s?1/i, /取得率\s?[0-9０-９]/, /成功率\s?[0-9０-９]/];

// 免責の許容句(これらを含む "保証" は OK)。
const DISCLAIMER_OK = [
	"保証するものではありません",
	"保証する性質のものではありません",
	"保証されるものではありません",
];

function isCommentLine(line) {
	const t = line.trimStart();
	return (
		t.startsWith("//") ||
		t.startsWith("*") ||
		t.startsWith("/*") ||
		t.startsWith("*/")
	);
}

function scanFile(path) {
	const violations = [];
	const lines = readFileSync(path, "utf8").split("\n");
	lines.forEach((line, i) => {
		if (isCommentLine(line)) return;
		const lineNo = i + 1;
		for (const w of BANNED) {
			if (line.includes(w))
				violations.push({ lineNo, hit: w, line: line.trim() });
		}
		for (const re of BANNED_RE) {
			const m = line.match(re);
			if (m) violations.push({ lineNo, hit: m[0], line: line.trim() });
		}
		// 保証: 免責句以外での使用を NG(完全保証は上で既に検出)
		if (line.includes("保証")) {
			const ok = DISCLAIMER_OK.some((d) => line.includes(d));
			if (!ok)
				violations.push({ lineNo, hit: "保証(非免責)", line: line.trim() });
		}
	});
	return violations;
}

function targets() {
	const args = process.argv.slice(2);
	if (args.length > 0) return args;
	const dir = join(process.cwd(), "lib", "blog");
	return readdirSync(dir)
		.filter(
			(f) =>
				f.endsWith(".ts") &&
				f !== "types.ts" &&
				f !== "presentation.ts" &&
				f !== "registry.ts",
		)
		.map((f) => join(dir, f));
}

let total = 0;
const files = targets();
for (const f of files) {
	const v = scanFile(f);
	if (v.length) {
		total += v.length;
		for (const x of v) {
			console.error(`✗ ${f}:${x.lineNo}  [${x.hit}]  ${x.line.slice(0, 80)}`);
		}
	}
}

if (total > 0) {
	console.error(
		`\nYMYL gate: ${total} 件の違反。本番公開前に中立化が必要です。`,
	);
	process.exit(1);
}
console.log(`✅ YMYL gate: ${files.length} files clean (banned 0)`);

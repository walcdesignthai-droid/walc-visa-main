import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

function configuredQualities(nextConfig: string): number[] {
	const match = nextConfig.match(/qualities:\s*\[([^\]]+)\]/);
	if (!match) return [75];

	return match[1]
		.split(",")
		.map((value) => Number.parseInt(value.trim(), 10))
		.filter(Number.isFinite);
}

describe("Hero image quality", () => {
	it("uses only image qualities allowed by the Next.js configuration", async () => {
		const [hero, nextConfig] = await Promise.all([
			read("components/lp/Hero.tsx"),
			read("next.config.ts"),
		]);
		const allowed = configuredQualities(nextConfig);
		const requested = [...hero.matchAll(/quality=\{(\d+)\}/g)].map((match) =>
			Number.parseInt(match[1], 10),
		);

		for (const quality of requested) {
			expect(allowed).toContain(quality);
		}
	});

	it("keeps the full-width Hero image responsive", async () => {
		const hero = await read("components/lp/Hero.tsx");

		expect(hero).toContain('sizes="100vw"');
	});
});

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

describe("repository quality tooling", () => {
	it("parses the Tailwind v4 directives used by the global stylesheet", async () => {
		const config = JSON.parse(
			await readFile(resolve(ROOT, "biome.json"), "utf8"),
		) as {
			css?: { parser?: { tailwindDirectives?: boolean } };
		};

		expect(config.css?.parser?.tailwindDirectives).toBe(true);
	});
});

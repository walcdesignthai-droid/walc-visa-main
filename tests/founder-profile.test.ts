import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("canonical founder experience", () => {
	it("renders owner-confirmed experience labels from WALC_AUTHOR", async () => {
		const [eeat, founder] = await Promise.all([
			read("lib/walc-data/eeat.ts"),
			read("components/lp/Founder.tsx"),
		]);

		expect(eeat).toContain('thailandResidency: "タイ在住13年"');
		expect(eeat).toContain('visaSupport: "VISAサポート事業7年目"');
		expect(founder).toContain("WALC_AUTHOR.experience.thailandResidency");
		expect(founder).toContain("WALC_AUTHOR.experience.visaSupport");
		expect(founder).not.toMatch(/10\s*年以上/);
	});
});

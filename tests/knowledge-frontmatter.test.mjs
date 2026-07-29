import { describe, expect, it } from "vitest";
import { hasOwnerConfirmedFrontmatter } from "../scripts/knowledge-frontmatter.mjs";

describe("AI knowledge frontmatter approval gate", () => {
	it("accepts owner confirmation only inside the leading frontmatter block", () => {
		expect(
			hasOwnerConfirmedFrontmatter(`---
title: Current operations
status: owner_confirmed
---

# Current operations
`),
		).toBe(true);
	});

	it("rejects an owner confirmation marker that appears only in the body", () => {
		expect(
			hasOwnerConfirmedFrontmatter(`# Unreviewed note

status: owner_confirmed
`),
		).toBe(false);
	});

	it("rejects malformed or ambiguous approval frontmatter", () => {
		expect(
			hasOwnerConfirmedFrontmatter(`---
title: Missing closing delimiter
status: owner_confirmed
`),
		).toBe(false);

		expect(
			hasOwnerConfirmedFrontmatter(`---
status: owner_confirmed
status: draft
---
`),
		).toBe(false);

		expect(
			hasOwnerConfirmedFrontmatter(`---
status: owner_confirmed # unparsed comment
---
`),
		).toBe(false);
	});
});

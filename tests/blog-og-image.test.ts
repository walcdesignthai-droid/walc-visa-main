import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildBlogOgDescriptor } from "../lib/blog/og-image";
import { PUBLISHED_ARTICLES } from "../lib/blog/registry";

const ROOT = resolve(import.meta.dirname, "..");

describe("blog Open Graph image identity", () => {
	it("awaits Next.js 16 dynamic route parameters", async () => {
		const route = await readFile(
			resolve(ROOT, "app/blog/[slug]/opengraph-image.tsx"),
			"utf8",
		);

		expect(route).toContain("params: Promise<{ slug: string }>");
		expect(route).toContain("const { slug } = await params");
		expect(route).toContain("buildBlogOgDescriptor(slug)");
	});

	it("gives every published article a distinct render descriptor", () => {
		const descriptors = PUBLISHED_ARTICLES.map((article) =>
			buildBlogOgDescriptor(article.slug),
		);
		const fingerprints = descriptors.map((descriptor) =>
			JSON.stringify(descriptor),
		);

		expect(descriptors).toHaveLength(24);
		expect(new Set(fingerprints).size).toBe(descriptors.length);
		expect(descriptors.every((descriptor) => !descriptor.fallback)).toBe(true);
	});

	it("keeps an explicit fallback for an invalid slug", () => {
		const descriptor = buildBlogOgDescriptor("not-a-real-article");

		expect(descriptor.fallback).toBe(true);
		expect(descriptor.kicker).toBe("WALC VISA");
		expect(descriptor.titleLines).toEqual(["タイ VISA ガイド"]);
	});
});

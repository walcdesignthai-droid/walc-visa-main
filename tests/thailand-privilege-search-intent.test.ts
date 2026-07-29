import { describe, expect, it } from "vitest";
import { getArticleBySlug } from "../lib/blog/registry";
import { THAILAND_PRIVILEGE_OVERVIEW } from "../lib/blog/thailand-privilege-overview";

const OFFICIAL_REBRAND_URL =
	"https://www.thailandprivilege.co.th/news/more-choices-more-freedom";
const OFFICIAL_LEGACY_MEMBER_URL =
	"https://www.thailandprivilege.co.th/news/membership-upgrade-information";
const OFFICIAL_PACKAGE_URL =
	"https://www.thailandprivilege.co.th/why-thailand/compare-thailand-privilege-card-membership-packages-find-the-perfect-fit-for-you";

describe("Thailand Privilege difference-intent guide", () => {
	it("answers the difference query in the title, H1, description, and first answer", () => {
		expect(THAILAND_PRIVILEGE_OVERVIEW.title).toContain(
			"Thailand PrivilegeとThailand Eliteの違い",
		);
		expect(THAILAND_PRIVILEGE_OVERVIEW.h1).toContain(
			"Thailand PrivilegeとThailand Eliteの違い",
		);
		expect(THAILAND_PRIVILEGE_OVERVIEW.description).toContain(
			"Thailand PrivilegeとThailand Eliteの違い",
		);
		expect(THAILAND_PRIVILEGE_OVERVIEW.answerFirst[0]).toMatch(/^結論:/);
		expect(THAILAND_PRIVILEGE_OVERVIEW.answerFirst[0]).toContain("2023年");
		expect(THAILAND_PRIVILEGE_OVERVIEW.answerFirst[0]).toContain("名称・ロゴ");
	});

	it("distinguishes current applicants from legacy members without implying automatic conversion", () => {
		const earlyCopy = [
			...THAILAND_PRIVILEGE_OVERVIEW.answerFirst,
			...(THAILAND_PRIVILEGE_OVERVIEW.bodySections ?? [])
				.slice(0, 2)
				.flatMap((section) => [
					section.heading,
					section.lead,
					...(section.items ?? []),
				]),
		].join("\n");

		expect(earlyCopy).toContain("旧プランの会員は従来区分のまま継続");
		expect(earlyCopy).toContain("新規申込");
		expect(earlyCopy).toContain("5区分");
		expect(earlyCopy).not.toContain("すべて自動");
	});

	it("links the official rebrand, legacy-member, and current-package sources", () => {
		const urls = THAILAND_PRIVILEGE_OVERVIEW.references.map(
			(reference) => reference.url,
		);

		expect(urls).toContain(OFFICIAL_REBRAND_URL);
		expect(urls).toContain(OFFICIAL_LEGACY_MEMBER_URL);
		expect(urls).toContain(OFFICIAL_PACKAGE_URL);
		expect(
			THAILAND_PRIVILEGE_OVERVIEW.sources.every(
				(source) => source.primaryPending === false,
			),
		).toBe(true);
	});

	it("keeps the current five official packages and truthful internal-link state", () => {
		const packageCopy = (THAILAND_PRIVILEGE_OVERVIEW.bodySections ?? [])
			.flatMap((section) => section.items ?? [])
			.join("\n");

		expect(packageCopy).toContain("Bronze: 入会金 650,000バーツ");
		expect(packageCopy).toContain("Gold: 入会金 900,000バーツ");
		expect(packageCopy).toContain("Platinum: 入会金 1,500,000バーツ");
		expect(packageCopy).toContain("Diamond: 入会金 2,500,000バーツ");
		expect(packageCopy).toContain("Reserve: 入会金 5,000,000バーツ");

		for (const link of THAILAND_PRIVILEGE_OVERVIEW.clusterLinks) {
			const target = getArticleBySlug(link.plannedSlug);
			expect(target?.draft).toBe(false);
			expect(link.published).toBe(true);
		}
	});
});

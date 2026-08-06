import { describe, expect, it } from "vitest";
import {
	ALL_VISA_CATEGORIES,
	VISA_LTR,
	VISA_RETIREMENT,
	VISA_RUN_SUPPORT,
	VISA_STUDENT,
} from "../lib/walc-data/pricing";

describe("public VISA source copy safety", () => {
	it("does not expose absolute recommendations or unconditional tax and bank claims", () => {
		const categoryCopy = ALL_VISA_CATEGORIES.flatMap((category) => [
			category.primaryDesc,
			category.bookingNote ?? "",
		]).join("\n");
		const publicSourceCopy = `${categoryCopy}\n${VISA_RUN_SUPPORT.description}`;

		expect(publicSourceCopy).not.toMatch(
			/絶対にお勧め|圧倒的に費用対効果が高い|外国所得非課税|銀行口座開設可能|口座開設不可|自由度同等|3 ヶ月ごとの更新が必要|WALC 第一推奨/,
		);
	});

	it("keeps variable VISA conditions explicitly conditional", () => {
		expect(VISA_LTR.primaryDesc).toContain("カテゴリー");
		expect(VISA_LTR.primaryDesc).toContain("公式情報");
		expect(VISA_RETIREMENT.primaryDesc).toContain("申請区分");
		expect(VISA_RETIREMENT.primaryDesc).toContain("個別に確認");
		expect(VISA_STUDENT.primaryDesc).toContain("教育機関");
		expect(VISA_STUDENT.primaryDesc).toContain("個別に確認");
	});
});

import { describe, expect, it } from "vitest";
import { buildConciergeFallback } from "../lib/concierge/fallback";
import { getConciergeSystemPrompt } from "../lib/concierge/system-prompt";
import type { DtvPublicContent } from "../lib/walc-data/public-content";

const DTV_FIXTURE = {
	hero: {
		eyebrow: "Destination Thailand Visa",
		headline: "DTV",
		description: "Verified DTV support",
	},
	trackRecord: {
		display: "200件以上",
		label: "DTV申請通過実績",
		evidenceStatus: "owner_confirmed",
		scope: "WALC VISA Consultingの申請サポート実績",
		disclaimer: "過去実績であり、将来の取得を保証しません。",
	},
	facts: ["5年マルチプル"],
	support: ["必要書類チェック"],
	pricing: [
		{
			id: "softpower",
			name: "タイソフトパワー",
			audience: "タイ文化活動を目的とする方",
			priceThb: 60_000,
			includedItems: ["申請費用", "書類作成サポート"],
		},
		{
			id: "nomad",
			name: "ワーケーション（ノマド・会社員）",
			audience: "リモートワーカー",
			priceThb: 45_000,
			includedItems: ["申請費用", "書類作成サポート"],
		},
		{
			id: "freelance",
			name: "ワーケーション（フリーランス）",
			audience: "フリーランス",
			priceThb: 48_000,
			includedItems: ["申請費用", "書類作成サポート"],
		},
	],
	fees: {
		supportFeeIncludesGovernmentFee: true,
		summary: "表示料金は申請費用を含む総額です。",
		postAcquisitionNotice: "取得後の手続きは別途ご案内します。",
		additionalCostNotice: "標準範囲外は着手前にご案内します。",
		governmentFee: {
			payee: "タイ大使館・領事館",
			includedInDisplayedPrice: true,
			variesByApplicationPost: true,
			sourceUrl: "https://www.thaievisa.go.th/",
		},
	},
	reviewedAt: "2026-07-29",
	guideUrl: "https://guide.walc-visa.online/guide/dtv/owner",
	consultationUrl: "https://lin.ee/PGFYVNZ",
	applicationStatus: "line_first",
} satisfies DtvPublicContent;

describe("concierge public fact contract", () => {
	it("quotes current CRM-backed DTV prices without stale non-DTV price claims", () => {
		const prompt = getConciergeSystemPrompt(DTV_FIXTURE);

		expect(prompt).toContain("45,000 THB");
		expect(prompt).toContain("48,000 THB");
		expect(prompt).toContain("60,000 THB");
		expect(prompt).toContain("DTV以外の料金はAIで断定せず");
		expect(prompt).not.toContain("13,000 THB");
		expect(prompt).not.toContain("72,000 THB");
		expect(prompt).not.toContain("650,000 THB");
		expect(prompt).not.toContain("17,600 THB");
	});

	it("uses owner-confirmed experience and user-needs-first routing", () => {
		const prompt = getConciergeSystemPrompt(DTV_FIXTURE);

		expect(prompt).toContain("タイ在住13年");
		expect(prompt).toContain("VISAサポート事業7年目");
		expect(prompt).toContain("本人の目的に合わないVISA");
		expect(prompt).toContain("タイ国内企業での就労が目的の場合");
		expect(prompt).not.toContain("第一推奨は DTV");
		expect(prompt).not.toContain("タイ・バンコク拠点 6 年");
		expect(prompt).not.toContain("資本金: 5,000,000");
	});

	it("does not answer a Non-B question with DTV prices during provider failure", () => {
		const fallback = buildConciergeFallback(
			[{ role: "user", content: "Non-BとWork Permitの料金を教えて" }],
			DTV_FIXTURE,
		);

		expect(fallback).toContain("AIでは未確認の料金や取得可否を断定せず");
		expect(fallback).toContain("[CTA:line]");
		expect(fallback).not.toContain("45,000 THB");
		expect(fallback).not.toContain("DTV申請通過実績");
	});
});

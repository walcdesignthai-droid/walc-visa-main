import "server-only";

import { z } from "zod";

const CONTENT_ENDPOINT = "https://crm.walc-visa.online/api/v1/public/content";

const DtvContentSchema = z.object({
	contentVersion: z.string().min(1),
	dtv: z.object({
		hero: z.object({
			eyebrow: z.string().min(1),
			headline: z.string().min(1),
			description: z.string().min(1),
		}),
		trackRecord: z.object({
			display: z.string().min(1),
			label: z.string().min(1),
			evidenceStatus: z.literal("owner_confirmed"),
			scope: z.string().min(1),
			disclaimer: z.string().min(1),
		}),
		facts: z.array(z.string().min(1)).min(1),
		support: z.array(z.string().min(1)).min(1),
		pricing: z.array(
			z.object({
				id: z.enum(["softpower", "nomad", "freelance"]),
				name: z.string().min(1),
				audience: z.string().min(1),
				priceThb: z.number().int().positive(),
			}),
		),
		guideUrl: z.string().url(),
		consultationUrl: z.string().url(),
		applicationStatus: z.literal("line_first"),
	}),
});

export type DtvPublicContent = z.infer<typeof DtvContentSchema>["dtv"];

/** API 障害時も未確認情報へ戻さない、オーナー確認済みの公開用フォールバック。 */
export const VERIFIED_DTV_FALLBACK: DtvPublicContent = {
	hero: {
		eyebrow: "Destination Thailand Visa",
		headline: "入国拒否多発中！ DTV VISAで安心の滞在へ",
		description:
			"短期滞在の繰り返しに不安がある方へ。状況と入国歴を確認し、DTV申請の可能性と準備方法を日本語でご案内します。",
	},
	trackRecord: {
		display: "200件以上",
		label: "DTV申請通過実績",
		evidenceStatus: "owner_confirmed",
		scope: "WALC VISA Consultingの申請サポート実績",
		disclaimer:
			"過去の実績であり、将来の取得を保証するものではありません。最終判断は審査機関が行います。",
	},
	facts: [
		"5年マルチプル",
		"1回最長180日",
		"毎年のビザ更新手続きは不要",
		"資金要件や入国歴を事前確認",
	],
	support: [
		"必要書類チェック",
		"資金要件の確認",
		"滞在計画の確認",
		"申請手続きサポート",
		"追加書類・進捗管理のサポート",
	],
	pricing: [
		{
			id: "softpower",
			name: "タイソフトパワー",
			audience: "ムエタイ・タイ料理など、タイ文化活動を目的とする方",
			priceThb: 60_000,
		},
		{
			id: "nomad",
			name: "ワーケーション（ノマド・会社員）",
			audience: "海外企業の仕事をタイからリモートで行う方",
			priceThb: 45_000,
		},
		{
			id: "freelance",
			name: "ワーケーション（フリーランス）",
			audience: "海外顧客との取引や実績を証明できる個人事業主",
			priceThb: 48_000,
		},
	],
	guideUrl: "https://guide.walc-visa.online/guide/dtv/owner",
	consultationUrl: "https://lin.ee/PGFYVNZ",
	applicationStatus: "line_first",
};

export async function getDtvPublicContent(): Promise<DtvPublicContent> {
	try {
		const response = await fetch(CONTENT_ENDPOINT, {
			next: { revalidate: 60 },
			headers: { Accept: "application/json" },
		});
		if (!response.ok) return VERIFIED_DTV_FALLBACK;

		const parsed = DtvContentSchema.safeParse(await response.json());
		return parsed.success ? parsed.data.dtv : VERIFIED_DTV_FALLBACK;
	} catch {
		return VERIFIED_DTV_FALLBACK;
	}
}

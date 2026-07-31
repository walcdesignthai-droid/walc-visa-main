export interface ConditionalPublicRoute {
	id: "immigration-support" | "corporate";
	label: string;
	path: `/${string}`;
	published: boolean;
	changeFrequency: "weekly" | "monthly" | "yearly";
	priority: number;
}

/**
 * Conditional public routes are kept here so page metadata, sitemap.xml, and
 * llms.txt cannot disagree about whether a route is ready for indexing.
 */
export const IMMIGRATION_SUPPORT_PUBLICATION = {
	id: "immigration-support",
	label: "入国・イミグレ緊急サポート",
	path: "/immigration-support",
	published: false,
	changeFrequency: "weekly",
	priority: 0.7,
} as const satisfies ConditionalPublicRoute;

/**
 * 法人向けトップ。下層 5 ページは app/sitemap.ts に直接登録する
 * (条件付き公開の単位はトップのみ = 公開/非公開を 1 箇所で切り替える)。
 */
export const CORPORATE_PUBLICATION = {
	id: "corporate",
	label: "法人向け(タイ進出・法人設立・Work Permit)",
	path: "/corporate",
	published: true,
	changeFrequency: "monthly",
	priority: 0.9,
} as const satisfies ConditionalPublicRoute;

export const CONDITIONAL_PUBLIC_ROUTES: readonly ConditionalPublicRoute[] = [
	IMMIGRATION_SUPPORT_PUBLICATION,
	CORPORATE_PUBLICATION,
];

export function getIndexableConditionalRoutes(
	routes: readonly ConditionalPublicRoute[] = CONDITIONAL_PUBLIC_ROUTES,
): readonly ConditionalPublicRoute[] {
	return routes.filter((route) => route.published);
}

export function renderConditionalLlmsLinks(
	origin: string,
	routes: readonly ConditionalPublicRoute[] = CONDITIONAL_PUBLIC_ROUTES,
): string {
	const normalizedOrigin = origin.replace(/\/+$/, "");

	return getIndexableConditionalRoutes(routes)
		.map((route) => `- [${route.label}](${normalizedOrigin}${route.path})`)
		.join("\n");
}

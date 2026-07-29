export interface ConditionalPublicRoute {
	id: "immigration-support";
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

export const CONDITIONAL_PUBLIC_ROUTES: readonly ConditionalPublicRoute[] = [
	IMMIGRATION_SUPPORT_PUBLICATION,
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

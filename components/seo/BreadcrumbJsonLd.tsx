/**
 * components/seo/BreadcrumbJsonLd.tsx — BreadcrumbList JSON-LD (WI-020)
 * ----------------------------------------------------------------------------
 * 各ページに階層パンくずの構造化データを出力する。
 * BreadcrumbList は 2026 時点でリッチリザルト有効(FAQ は 2026-05 廃止だが本タイプは継続)。
 *
 * 使い方(各 page.tsx で):
 *   <BreadcrumbJsonLd items={[
 *     { name: "ホーム", url: "https://walc-visa.online/" },
 *     { name: "LTR Visa", url: "https://walc-visa.online/visas/ltr" },
 *   ]} />
 *
 * Server Component(JSON-LD は静的)。
 * ----------------------------------------------------------------------------
 */

interface BreadcrumbItem {
	name: string;
	url: string;
}

export function BreadcrumbJsonLd({ items }: { items: ReadonlyArray<BreadcrumbItem> }) {
	const schema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: item.url,
		})),
	};
	return (
		<script
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD は信頼できる static data
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}

export const BLOG_INDEX_URL = "https://walc-visa.online/blog";

interface BlogIndexArticle {
	slug: string;
	h1: string;
	draft: boolean;
}

export function buildBlogIndexStructuredData(
	articles: ReadonlyArray<BlogIndexArticle>,
) {
	const publishedArticles = articles.filter((article) => !article.draft);

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${BLOG_INDEX_URL}#webpage`,
				url: BLOG_INDEX_URL,
				name: "WALC VISA Journal｜タイ VISA の実務ガイド",
				description:
					"タイ長期 VISAの要件・滞在ルール・手続きを、一次情報と実務知見に基づいて解説する公開記事一覧です。",
				inLanguage: "ja-JP",
				isPartOf: {
					"@id": "https://walc-visa.online/#website",
				},
				mainEntity: {
					"@id": `${BLOG_INDEX_URL}#article-list`,
				},
				publisher: {
					"@id": "https://walc-visa.online/#organization",
				},
			},
			{
				"@type": "ItemList",
				"@id": `${BLOG_INDEX_URL}#article-list`,
				name: "WALC VISA Journal 公開記事",
				numberOfItems: publishedArticles.length,
				itemListElement: publishedArticles.map((article, index) => ({
					"@type": "ListItem",
					position: index + 1,
					url: `${BLOG_INDEX_URL}/${article.slug}`,
					name: article.h1,
				})),
			},
		],
	} as const;
}

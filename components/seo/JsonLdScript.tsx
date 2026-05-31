/**
 * components/seo/JsonLdScript.tsx
 * ----------------------------------------------------------------------------
 * 任意の JSON-LD オブジェクトを <script type="application/ld+json"> として
 * 出力する汎用コンポーネント(Person / Article 等で再利用)。
 * ----------------------------------------------------------------------------
 */

interface JsonLdScriptProps {
	data: Record<string, unknown>;
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD は信頼できる static data
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

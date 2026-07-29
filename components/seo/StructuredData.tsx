/**
 * Page-specific, connected JSON-LD for the public WALC VISA home page.
 *
 * The graph deliberately excludes portal/CRM hosts from sameAs because they
 * are applications, not independent public identities. Corporate surfaces are
 * also excluded until their public role and canonical facts are owner-approved.
 */

import type { DtvPublicContent } from "@/lib/walc-data/public-content";
import { buildMainStructuredDataGraph } from "@/lib/walc-data/structured-data";

export function MainStructuredData({ content }: { content: DtvPublicContent }) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: server-generated JSON-LD from validated public content
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(buildMainStructuredDataGraph(content)).replace(
					/</g,
					"\\u003c",
				),
			}}
		/>
	);
}

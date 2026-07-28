/**
 * The former public payment form is permanently retired.
 *
 * Returning 410 prevents customers and search engines from mistaking an
 * obsolete payment surface for the current application flow.
 */
export function GET(): Response {
	return new Response(null, {
		status: 410,
		headers: {
			"X-Robots-Tag": "noindex, nofollow",
			"Cache-Control": "no-store",
		},
	});
}

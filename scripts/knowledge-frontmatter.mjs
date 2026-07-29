const FRONTMATTER_PATTERN = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const STATUS_PATTERN = /^status:\s*(.*?)\s*$/;

export function hasOwnerConfirmedFrontmatter(content) {
	const frontmatter = content.match(FRONTMATTER_PATTERN)?.[1];
	if (!frontmatter) {
		return false;
	}

	const statuses = frontmatter
		.split(/\r?\n/)
		.map((line) => line.match(STATUS_PATTERN)?.[1])
		.filter((status) => status !== undefined);

	return statuses.length === 1 && statuses[0] === "owner_confirmed";
}

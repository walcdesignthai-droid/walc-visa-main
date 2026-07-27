import type { ConciergeGenerateOptions } from "./gemini-client";

const MODEL = "claude-sonnet-5";

interface ClaudeTextBlock {
	type: "text";
	text: string;
}

interface ClaudeResponse {
	content?: ClaudeTextBlock[];
}

export async function claudeGenerate(
	options: ConciergeGenerateOptions,
): Promise<string> {
	const apiKey = process.env.ANTHROPIC_API_KEY;
	if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

	const response = await fetch("https://api.anthropic.com/v1/messages", {
		method: "POST",
		headers: {
			"anthropic-version": "2023-06-01",
			"content-type": "application/json",
			"x-api-key": apiKey,
		},
		body: JSON.stringify({
			model: MODEL,
			max_tokens: options.maxOutputTokens ?? 2048,
			system: options.systemPrompt,
			messages: options.messages,
		}),
	});

	if (!response.ok) {
		throw new Error(`Claude request failed (${response.status})`);
	}

	const data = (await response.json()) as ClaudeResponse;
	return (
		data.content
			?.filter((block) => block.type === "text")
			.map((block) => block.text)
			.join("") ?? ""
	);
}

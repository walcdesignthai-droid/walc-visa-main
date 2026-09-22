import type { ConciergeGenerateOptions } from "./gemini-client";

const MODEL = "claude-opus-5-5";

// Opus 5.5 always thinks and thinking consumes output tokens.
const MIN_OUTPUT_TOKENS = 8000;

interface ClaudeTextBlock {
	type: "text";
	text: string;
}

interface ClaudeThinkingBlock {
	type: "thinking" | "redacted_thinking";
}

type ClaudeContentBlock = ClaudeTextBlock | ClaudeThinkingBlock;

interface ClaudeResponse {
	content?: ClaudeContentBlock[];
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
			max_tokens: Math.max(
				options.maxOutputTokens ?? 2048,
				MIN_OUTPUT_TOKENS,
			),
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
			?.filter((block): block is ClaudeTextBlock => block.type === "text")
			.map((block) => block.text)
			.join("") ?? ""
	);
}

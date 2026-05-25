/**
 * lib/line/client.ts — LINE Messaging API クライアント
 */

import { messagingApi } from "@line/bot-sdk";

let cached: messagingApi.MessagingApiClient | null = null;

export function getLineClient(): messagingApi.MessagingApiClient {
	if (cached) return cached;
	const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
	if (!channelAccessToken) {
		throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not configured");
	}
	cached = new messagingApi.MessagingApiClient({ channelAccessToken });
	return cached;
}

export function getLineChannelSecret(): string {
	const secret = process.env.LINE_CHANNEL_SECRET;
	if (!secret) {
		throw new Error("LINE_CHANNEL_SECRET is not configured");
	}
	return secret;
}

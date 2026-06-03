"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";

/** ShareButtons — X / コピー / ネイティブ共有。 */
export function ShareButtons({
	url,
	title,
}: {
	url: string;
	title: string;
}): React.JSX.Element {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch {
			/* clipboard 不可環境 */
		}
	}

	async function nativeShare() {
		try {
			if (navigator.share) await navigator.share({ title, url });
		} catch {
			/* cancelled */
		}
	}

	const btn =
		"inline-flex items-center gap-1.5 rounded-full border border-[#dde2ee] px-4 py-2 text-xs font-semibold text-[#46506b] hover:text-[#16264f] hover:border-[#c9d0e2] transition-colors";

	return (
		<div className="flex flex-wrap items-center gap-2">
			<span className="text-xs text-[#8089a0] mr-1">シェア</span>
			<a
				className={btn}
				href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				X でシェア
			</a>
			<button
				type="button"
				className={btn}
				onClick={copy}
				data-testid="share-copy"
			>
				{copied ? (
					<Check className="h-3.5 w-3.5" />
				) : (
					<Link2 className="h-3.5 w-3.5" />
				)}
				{copied ? "コピーしました" : "URL コピー"}
			</button>
			<button
				type="button"
				className={btn}
				onClick={nativeShare}
				data-testid="share-native"
			>
				<Share2 className="h-3.5 w-3.5" />
				共有
			</button>
		</div>
	);
}

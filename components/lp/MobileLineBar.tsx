import { MessageCircle } from "lucide-react";
import { getLineAddUrl } from "@/lib/walc-links";

export function MobileLineBar() {
	return (
		<div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/20 bg-brand-deep px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden">
			<a
				href={getLineAddUrl()}
				target="_blank"
				rel="noopener noreferrer"
				className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-line px-4 py-2.5 text-center font-bold text-white shadow-lg"
			>
				<MessageCircle className="size-5" aria-hidden="true" />
				LINE で無料相談
				<span className="text-xs font-medium text-white/80">
					状況を送るだけ
				</span>
			</a>
		</div>
	);
}

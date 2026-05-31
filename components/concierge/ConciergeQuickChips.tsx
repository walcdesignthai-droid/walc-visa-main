/**
 * components/concierge/ConciergeQuickChips.tsx
 * ----------------------------------------------------------------------------
 * 初回表示時の質問テンプレートチップ。
 * クリックでそのまま AI に送信。
 * ----------------------------------------------------------------------------
 */

const QUICK_QUESTIONS = [
	"私に適したビザを教えてください",
	"DTV と Thailand Privilege の違いは?",
	"50 代でタイに移住したい。何ビザがいい?",
	"DTV の料金と申請期間は?",
	"タイで銀行口座は開設できますか?",
] as const;

interface Props {
	onSelect: (question: string) => void;
}

export function ConciergeQuickChips({ onSelect }: Props) {
	return (
		<div className="ml-9 space-y-2">
			<p className="text-[11px] tracking-wider uppercase text-text-tertiary font-bold mb-2">
				よくある質問
			</p>
			{QUICK_QUESTIONS.map((q) => (
				<button
					key={q}
					type="button"
					onClick={() => onSelect(q)}
					className="block w-full text-left px-3.5 py-2.5 text-xs md:text-sm bg-white border border-border-subtle hover:border-brand hover:bg-brand/[0.03] rounded-xl text-text-primary transition-colors"
				>
					{q}
				</button>
			))}
		</div>
	);
}

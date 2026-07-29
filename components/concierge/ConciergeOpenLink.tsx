"use client";

import type {
	ComponentPropsWithoutRef,
	MouseEvent as ReactMouseEvent,
} from "react";

export const OPEN_CONCIERGE_EVENT = "walc:open-concierge";

type Props = ComponentPropsWithoutRef<"a"> & {
	href: string;
};

/**
 * Keeps a real, shareable anchor while explicitly opening the client dialog.
 * Other href values retain native anchor behavior.
 */
export function ConciergeOpenLink({
	href,
	onClick,
	children,
	...props
}: Props) {
	const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
		onClick?.(event);
		if (event.defaultPrevented || href !== "#concierge") return;

		event.preventDefault();
		const nextUrl = `${window.location.pathname}${window.location.search}#concierge`;
		window.history.pushState(null, "", nextUrl);
		window.dispatchEvent(new CustomEvent(OPEN_CONCIERGE_EVENT));
	};

	return (
		<a href={href} onClick={handleClick} {...props}>
			{children}
		</a>
	);
}

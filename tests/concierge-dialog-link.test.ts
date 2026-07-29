import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");

async function read(path: string) {
	return readFile(resolve(ROOT, path), "utf8");
}

describe("AI concierge public links", () => {
	it("owns the #concierge target and opens from links or changed hashes", async () => {
		const [link, bubble] = await Promise.all([
			read("components/concierge/ConciergeOpenLink.tsx"),
			read("components/concierge/ConciergeBubble.tsx"),
		]);

		expect(link).toContain('href !== "#concierge"');
		expect(link).toContain("event.preventDefault()");
		expect(link).toContain("window.history.pushState");
		expect(link).toContain("window.dispatchEvent");
		expect(link).toContain("OPEN_CONCIERGE_EVENT");
		expect(bubble).toContain('id="concierge"');
		expect(bubble).toContain('window.location.hash === "#concierge"');
		expect(bubble).toContain('window.addEventListener("hashchange"');
		expect(bubble).toContain("window.addEventListener(OPEN_CONCIERGE_EVENT");
		expect(bubble).toContain("window.setTimeout(openFromHash");
		expect(bubble).toContain("setIsVisible(true)");
		expect(bubble).toContain("setIsOpen(true)");
		expect(bubble).toContain('window.history.replaceState(null, "", nextUrl)');
	});

	it("connects the trigger to one labelled modal dialog", async () => {
		const [bubble, chat] = await Promise.all([
			read("components/concierge/ConciergeBubble.tsx"),
			read("components/concierge/ConciergeChat.tsx"),
		]);

		expect(bubble).toContain('aria-haspopup="dialog"');
		expect(bubble).toContain('aria-controls="concierge-dialog"');
		expect(bubble).toContain("aria-expanded={isOpen}");
		expect(chat).toContain('id="concierge-dialog"');
		expect(chat).toContain('role="dialog"');
		expect(chat).toContain("aria-modal");
		expect(chat).toContain('aria-labelledby="concierge-dialog-title"');
		expect(chat).toContain('id="concierge-dialog-title"');
	});

	it("focuses the opened dialog and supports Escape dismissal", async () => {
		const chat = await read("components/concierge/ConciergeChat.tsx");

		expect(chat).toContain("dialogRef.current?.focus()");
		expect(chat).toContain('event.key === "Escape"');
		expect(chat).toContain('event.key !== "Tab"');
		expect(chat).toContain("FOCUSABLE_SELECTOR");
		expect(chat).toContain("focusable.includes(active)");
		expect(chat).toContain("last.focus()");
		expect(chat).toContain("first.focus()");
		expect(chat).toContain("tabIndex={-1}");
		expect(chat).toContain('window.addEventListener("keydown"');
		expect(chat).toContain('window.removeEventListener("keydown"');
	});

	it("provides accessible names and error announcements inside the dialog", async () => {
		const chat = await read("components/concierge/ConciergeChat.tsx");

		expect(chat).toContain('aria-label="タイ VISA の質問"');
		expect(chat).toContain('role="alert"');
	});

	it("connects both homepage AI CTAs to the interactive opener", async () => {
		const [consult, trouble] = await Promise.all([
			read("components/lp/ConsultBlock.tsx"),
			read("components/lp/TroubleSupport.tsx"),
		]);

		expect(consult).toContain("ConciergeOpenLink");
		expect(consult).toContain('href: "#concierge"');
		expect(trouble).toContain("ConciergeOpenLink");
		expect(trouble).toContain('href="#concierge"');
	});
});

/**
 * components/lp/Founder.tsx — 代表者メッセージ
 * ----------------------------------------------------------------------------
 * 修正履歴:
 *   v1.1 (2026-05-25) — 漢字修正: 洋介 → 陽介
 *   v1.2 (2026-05-26) — 在住歴修正: 「バンコク在住 6 年」(WALC 社歴と混同)
 *                                  → 「バンコク在住 10 年以上」(Yosuke 本人歴)
 *                                  + 「WALC 創業 6 年」を別途明示
 *                       出典: walc-studio/knowledge/01_walc_company_info.md
 * ----------------------------------------------------------------------------
 */

import { Quote } from "lucide-react";

export function Founder() {
	return (
		<section id="founder" className="bg-brand text-white relative overflow-hidden">
			<div className="absolute -bottom-20 -right-20 opacity-[0.04] pointer-events-none">
				<Quote className="w-[500px] h-[500px]" strokeWidth={0.5} />
			</div>

			<div className="relative mx-auto max-w-content px-5 md:px-8 py-20 md:py-28">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
					<div className="lg:col-span-4">
						<div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
							<span className="text-5xl md:text-6xl font-bold text-white/70 tracking-tight">
								YO
							</span>
						</div>

						<div className="space-y-1">
							<p className="text-[11px] tracking-[0.22em] uppercase text-amber-300 font-semibold">
								Founder & CEO
							</p>
							<h3 className="text-2xl md:text-3xl font-bold tracking-tight">
								小野寺 陽介
							</h3>
							<p className="text-sm text-white/70">Yosuke Onodera</p>
						</div>

						<p className="text-xs text-white/55 mt-5 leading-relaxed">
							WALC DESIGN Co., Ltd. 代表取締役
							<br />
							WALC VISA Consulting 統括
							<br />
							バンコク在住 10 年以上 / WALC 創業 6 年
						</p>
					</div>

					<div className="lg:col-span-8">
						<div className="inline-flex items-center gap-2.5 mb-5">
							<span className="w-8 h-px bg-amber-400/70" />
							<span className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-amber-200 font-semibold">
								Message from Founder
							</span>
						</div>

						<blockquote className="space-y-5 text-base md:text-lg leading-relaxed md:leading-[1.95] text-white/90">
							<p className="text-xl md:text-2xl font-bold text-white leading-snug">
								「タイに住みたい、その思いを、確かな現実に。」
							</p>
							<p>
								タイは、リモートワーカー・退職後の方・起業家・ご家族にとって、
								今もっとも現実的で魅力的な長期滞在先のひとつです。
								一方で、VISA・税務・銀行口座など、制度面の複雑さで一歩踏み出せない方も少なくありません。
							</p>
							<p>
								WALC VISA Consulting は、その「複雑さ」を私たちが代わりに引き受け、
								お客様には「タイで何をするか」だけに集中していただけるよう設計しました。
								取得率 100% の実績、専用 CRM での一気通貫管理、バンコク現地法人 6 年の経験——
								すべては、お客様の思いを確かな形にするためにあります。
							</p>
							<p className="text-amber-200/90 text-sm md:text-base font-semibold">
								まずは LINE で 3 分、お話を聞かせてください。
							</p>
						</blockquote>
					</div>
				</div>
			</div>
		</section>
	);
}

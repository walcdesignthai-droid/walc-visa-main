/**
 * lib/crm/client.ts — WALC VISA CRM REST API クライアント (Edge 対応)
 * ----------------------------------------------------------------------------
 * https://crm.walc-visa.online/api/v1/* を fetch で叩く。
 * 認証: Authorization: Bearer {WALC_CRM_API_KEY}
 * ----------------------------------------------------------------------------
 */

const BASE_URL =
	process.env.NEXT_PUBLIC_WALC_CRM_BASE_URL ?? "https://crm.walc-visa.online";

function getKey(): string {
	const k = process.env.WALC_CRM_API_KEY;
	if (!k) throw new Error("WALC_CRM_API_KEY is not configured");
	return k;
}

function headers(extra?: Record<string, string>) {
	return {
		Authorization: `Bearer ${getKey()}`,
		"Content-Type": "application/json",
		...(extra ?? {}),
	};
}

/* ============================================================================
 * 型定義 (CRM レスポンスの最小サブセット)
 * ========================================================================== */

export interface CrmCustomer {
	id: string;
	full_name: string;
	full_name_en?: string | null;
	email: string;
	line_user_id?: string | null;
	line_display_name?: string | null;
	passport_number?: string | null;
	language?: string;
	auth_user_id?: string | null;
	is_line_pending?: boolean;
}

export type CrmApplicationStatus =
	| "inquiry" | "consulting"
	| "deposit_pending" | "deposit_paid"
	| "form_pending" | "docs_collecting"
	| "muaythai_requested" | "muaythai_received"
	| "evisa_preparing" | "evisa_submitted" | "evisa_additional_docs"
	| "awaiting_customer" | "interview_scheduled" | "pending_approval"
	| "visa_issued" | "final_payment_pending"
	| "completed" | "cancelled";

export interface CrmApplication {
	id: string;
	customer_id: string;
	application_number: string;
	visa_type: string;
	dtv_type?: string | null;
	status: CrmApplicationStatus;
	deadline?: string | null;
	deposit_paid: boolean;
	final_paid: boolean;
	total_amount?: number | null;
	currency?: string;
	created_at: string;
	updated_at: string;
}

/* ============================================================================
 * 顧客 API
 * ========================================================================== */

/** LINE user_id から顧客を検索 or 自動作成 */
export async function getOrCreateCustomerByLine(
	lineUserId: string,
	displayName?: string,
): Promise<CrmCustomer | null> {
	if (!lineUserId) return null;

	const res = await fetch(`${BASE_URL}/api/v1/customers/by-line`, {
		method: "POST",
		headers: headers(),
		body: JSON.stringify({
			line_user_id: lineUserId,
			line_display_name: displayName,
		}),
	});
	if (!res.ok) {
		console.error("CRM by-line failed:", res.status, await res.text().catch(() => ""));
		return null;
	}
	const json = (await res.json()) as { data?: CrmCustomer };
	return json.data ?? null;
}

/** 顧客 ID から取得 */
export async function getCustomerById(id: string): Promise<CrmCustomer | null> {
	if (!id) return null;
	const res = await fetch(`${BASE_URL}/api/v1/customers/${id}`, {
		headers: headers(),
	});
	if (!res.ok) return null;
	const json = (await res.json()) as { data?: CrmCustomer };
	return json.data ?? null;
}

/* ============================================================================
 * 申請 API
 * ========================================================================== */

/** 顧客 ID から申請を取得 (最新順) */
export async function listApplicationsByCustomer(
	customerId: string,
): Promise<CrmApplication[]> {
	if (!customerId) return [];
	const url = new URL(`${BASE_URL}/api/v1/applications`);
	url.searchParams.set("customer_id", customerId);
	url.searchParams.set("order", "updated_at.desc");
	url.searchParams.set("limit", "5");

	const res = await fetch(url.toString(), { headers: headers() });
	if (!res.ok) {
		console.error("CRM applications failed:", res.status);
		return [];
	}
	const json = (await res.json()) as { data?: CrmApplication[] };
	return json.data ?? [];
}

/* ============================================================================
 * ステータスの顧客向け日本語マッピング
 * ========================================================================== */

const STATUS_LABEL: Record<CrmApplicationStatus, string> = {
	inquiry: "お問い合わせ受付",
	consulting: "相談中",
	deposit_pending: "着手金のお支払いをお待ちしています",
	deposit_paid: "着手金入金確認済",
	form_pending: "申請フォームのご記入をお待ちしています",
	docs_collecting: "必要書類の収集中",
	muaythai_requested: "ムエタイ書類の手配中",
	muaythai_received: "ムエタイ書類受領済",
	evisa_preparing: "E-VISA 申請準備中",
	evisa_submitted: "E-VISA 申請提出済(結果待ち)",
	evisa_additional_docs: "E-VISA 追加書類要請があります",
	awaiting_customer: "お客様のご対応をお待ちしています",
	interview_scheduled: "面接予定",
	pending_approval: "承認待ち",
	visa_issued: "VISA 発給済 🎉",
	final_payment_pending: "残金のお支払いをお待ちしています",
	completed: "完了",
	cancelled: "キャンセル済",
};

export function formatStatusLabel(s: CrmApplicationStatus): string {
	return STATUS_LABEL[s] ?? String(s);
}

const VISA_TYPE_LABEL: Record<string, string> = {
	dtv: "DTV (Destination Thailand Visa)",
	immigration_support: "入管対応サポート",
	overstay: "オーバーステイ対応",
	retirement: "リタイアメント VISA",
	ltr: "LTR",
	student: "学生 VISA",
	fast_pass: "Fast Pass",
	business: "ビジネス VISA",
	marriage: "結婚 VISA",
	non_immigrant: "Non-Immigrant VISA",
	other: "その他",
};

export function formatVisaTypeLabel(t: string): string {
	return VISA_TYPE_LABEL[t] ?? t.toUpperCase();
}

/* ============================================================================
 * AI に渡す顧客コンテキストを 1 行に整形
 * ========================================================================== */

export function buildCustomerContext(
	customer: CrmCustomer | null,
	applications: CrmApplication[],
): string {
	if (!customer) return "(未登録の LINE ユーザー)";

	const lines: string[] = [];
	lines.push(`顧客名: ${customer.full_name}`);
	if (customer.is_line_pending) lines.push("ステータス: LINE 経由・仮登録(正規顧客マージ前)");

	if (applications.length === 0) {
		lines.push("申請: なし(まだ申請手続き未開始)");
	} else {
		lines.push("申請:");
		for (const a of applications) {
			lines.push(
				`  - ${a.application_number} / ${formatVisaTypeLabel(a.visa_type)} / ${formatStatusLabel(a.status)}${a.deadline ? ` / 期限: ${a.deadline}` : ""}`,
			);
		}
	}

	return lines.join("\n");
}

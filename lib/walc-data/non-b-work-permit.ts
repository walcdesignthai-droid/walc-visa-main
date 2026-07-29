export interface NonBRequiredDocument {
	id: string;
	group: "applicant" | "company" | "work-permit";
	title: string;
	reference: string;
	description: string;
}

export interface NonBPrimarySource {
	title: string;
	publisher: string;
	url: string;
	scope: string;
	lastReviewed: string;
}

export const NON_B_PRIMARY_SOURCES: readonly NonBPrimarySource[] = [
	{
		title: "Non-Immigrant Visa “B”",
		publisher: "タイ王国外務省",
		url: "https://www.mfa.go.th/en/page/non-immigrant-visa-b",
		scope: "Non-Bの目的、申請者・雇用企業が準備する基本資料",
		lastReviewed: "2026-07-29",
	},
	{
		title: "外国人就労許可の申請書・添付書類一覧",
		publisher: "タイ王国雇用局（Department of Employment）",
		url: "https://www.doe.go.th/prd/main/downloads/param/site/1/cat/14/sub/0/pull/category/view/list-label/object_id/6062",
		scope: "Work Permitの申請区分別フォームと公式添付書類",
		lastReviewed: "2026-07-29",
	},
	{
		title: "海外在住者に代わるWork Permit申請（บต.32）添付書類",
		publisher: "タイ王国雇用局（Department of Employment）",
		url: "https://www.doe.go.th/prd/download/download_by_pool_file/103502",
		scope: "บต.32申請で求められる本人・雇用企業・事業所資料",
		lastReviewed: "2026-07-29",
	},
] as const;

export const APPLICANT_DOCUMENTS: readonly NonBRequiredDocument[] = [
	{
		id: "passport",
		group: "applicant",
		title: "パスポート・現在のビザ・入国記録",
		reference: "Passport / Visa / Entry stamp",
		description:
			"顔写真ページ、現在のビザ、直近の入国スタンプなどを確認します。原本提示が必要になる場合があります。",
	},
	{
		id: "photo",
		group: "applicant",
		title: "証明写真",
		reference: "Recent photographs",
		description:
			"申請先と手続き区分により規格・枚数が異なるため、準備前に確認します。",
	},
	{
		id: "education-employment",
		group: "applicant",
		title: "学歴証明・職歴証明",
		reference: "Educational certificate / Employment reference",
		description:
			"卒業証明、資格証明、在職証明などを用い、申請する職種との整合性を確認します。",
	},
	{
		id: "employment-contract",
		group: "applicant",
		title: "雇用契約・職務内容",
		reference: "Employment contract / Job description",
		description:
			"役職、業務内容、勤務先、雇用条件が申請内容と一致していることを確認します。",
	},
	{
		id: "medical-certificate",
		group: "applicant",
		title: "タイ国内医療機関の健康診断書",
		reference: "Medical certificate issued in Thailand",
		description:
			"Work Permit申請で使用します。発行時期と記載要件を申請前に確認します。",
	},
];

export const COMPANY_DOCUMENTS: readonly NonBRequiredDocument[] = [
	{
		id: "tm30",
		group: "company",
		title: "T.M.30（住居届）",
		reference: "T.M.30 · แจ้งที่พักอาศัย",
		description: "申請者のタイ国内における居住届を確認します。",
	},
	{
		id: "affidavit-boj5",
		group: "company",
		title: "会社登記証明書・株主名簿",
		reference: "Affidavit หนังสือรับรองบริษัท / Boj.5 บอจ.5",
		description: "原則として発行から3か月以内の書類を準備します。",
	},
	{
		id: "boj2",
		group: "company",
		title: "基本定款・設立時および変更後の書類",
		reference: "Boj.2 · หนังสือบริคณสนธิ จัดตั้ง และ ฉบับปรับปรุง",
		description: "設立時の内容と、その後の変更内容が分かる一式を確認します。",
	},
	{
		id: "financial-statement",
		group: "company",
		title: "直近年度の法人税申告・財務諸表",
		reference: "P.N.D.50 / Financial statement / Sor.Por.Chor.3",
		description: "ภงด.50、งบการเงิน、สปช.3の直近年度分を確認します。",
	},
	{
		id: "vat",
		group: "company",
		title: "VAT関連書類",
		reference: "PP.01 / PP.09 / PP.20 · ภ.พ.01 / ภ.พ.09 / ภ.พ.20",
		description: "VATの登録・変更・登録証明に関する書類を確認します。",
	},
	{
		id: "por-kor-0401",
		group: "company",
		title: "Por Kor 0401",
		reference: "Por Kor 0401 · พ.ค.0401",
		description: "会社で保管している該当書類を準備します。",
	},
	{
		id: "pnd1",
		group: "company",
		title: "P.N.D.1および納付領収書",
		reference: "P.N.D.1 and receipt · ภงด.1 พร้อมใบเสร็จรับเงิน",
		description: "原則として直近3か月分を確認します。",
	},
	{
		id: "company-map",
		group: "company",
		title: "会社所在地の地図",
		reference: "Company map · แผนที่บริษัท",
		description: "会社所在地と実際の就労場所が分かる地図を準備します。",
	},
	{
		id: "lease",
		group: "company",
		title: "会社の賃貸契約書",
		reference: "Lease agreement · สัญญาเช่า",
		description: "登記住所と実際の事業場所との一致を確認します。",
	},
	{
		id: "director-id",
		group: "company",
		title: "会社取締役の身分証明書コピー",
		reference: "Director ID card · สำเนาบัตรกรรมการ",
		description: "署名権限者・取締役の情報を確認します。",
	},
	{
		id: "staff-id",
		group: "company",
		title: "タイ人スタッフの身分証明書コピー",
		reference: "Staff ID cards（4名以上）· สำเนาบัตรพนักงาน อย่างน้อย 4 คน",
		description: "対象となるタイ人スタッフ4名以上の書類を準備します。",
	},
	{
		id: "business-license",
		group: "company",
		title: "事業許可証",
		reference: "Business certificate / License · ใบอนุญาตประกอบกิจการ",
		description:
			"飲食店・ホテルなど、事業内容に応じて必要となる営業許可や許認可書類を確認します。",
	},
];

export const WORK_PERMIT_DOCUMENTS: readonly NonBRequiredDocument[] = [
	{
		id: "wp-form",
		group: "work-permit",
		title: "Work Permit申請書",
		reference: "Work Permit application form",
		description: "申請区分に対応する所定フォームを使用します。",
	},
	{
		id: "employment-certificate",
		group: "work-permit",
		title: "雇用証明書",
		reference: "Employment certificate",
		description: "雇用主、役職、職務内容、外国人を雇用する必要性を整理します。",
	},
	{
		id: "foreign-employees",
		group: "work-permit",
		title: "外国人従業員一覧",
		reference: "List of foreign employees holding work permits",
		description:
			"会社に所属する外国人従業員とWork Permit保有状況を確認します。",
	},
	{
		id: "organization-chart",
		group: "work-permit",
		title: "組織図",
		reference: "Organization chart",
		description:
			"タイ人・外国人スタッフの氏名、役職、人数と、申請者の位置付けを示します。",
	},
	{
		id: "professional-license",
		group: "work-permit",
		title: "職業資格・事業ライセンス",
		reference: "Professional license / Business-specific permit",
		description: "法令上の資格が必要な職種のみ、職種に応じて追加提出します。",
	},
	{
		id: "power-of-attorney",
		group: "work-permit",
		title: "委任状",
		reference: "Power of attorney",
		description: "代理人が手続きを行う場合に準備します。",
	},
];

export const NON_B_PROCESS = [
	{
		step: "01",
		title: "LINEで事前相談",
		description:
			"会社名、事業内容、希望職種、申請者の現在地とビザ状況をお知らせください。",
	},
	{
		step: "02",
		title: "会社・個人の状況確認",
		description:
			"会社の登記・税務・タイ人雇用状況と、申請者の入国歴・現在の在留資格を確認します。",
	},
	{
		step: "03",
		title: "必要書類の事前診断",
		description:
			"基本リストと照合し、不足書類、有効期限、追加許認可の有無を整理します。",
	},
	{
		step: "04",
		title: "申請方針と正式見積もり",
		description:
			"必要な手続きと対応範囲が確定した後、ケースに合わせた正式見積もりをご案内します。",
	},
	{
		step: "05",
		title: "会社担当者と実務開始",
		description:
			"企業のタイ人担当者とWALCのタイ人スタッフをつなぎ、書類収集・確認・申請準備を進めます。",
	},
] as const;

export const NON_B_FAQ = [
	{
		question: "タイで正式に働くにはNon-Bだけで足りますか？",
		answer:
			"原則として、Non-Immigrant Bは就労目的の在留資格、Work Permitは実際に働くための許可です。タイ国内で就労する場合は、両方を適切に整える必要があります。",
	},
	{
		question: "初回Non-Bの会社書類は何が必要ですか？",
		answer:
			"T.M.30、会社登記証明書・Boj.5、Boj.2、直近年度の税務・財務書類、VAT書類、Por Kor 0401、直近3か月のP.N.D.1と領収書、会社地図、賃貸契約、取締役ID、タイ人スタッフ4名以上のID、事業許可証を基本として確認します。",
	},
	{
		question: "会社書類がすべて揃っていない場合も相談できますか？",
		answer:
			"はい。まず現在の書類と会社状況を確認し、不足、有効期限、再発行、追加許認可の有無を整理します。",
	},
	{
		question: "退職後や別のビザから切り替える場合も相談できますか？",
		answer:
			"現在のビザ、退職日、取消手続き、滞在期限、次の雇用開始日などを確認したうえで、申請順序と必要な準備をご案内します。",
	},
	{
		question: "費用はいつ分かりますか？",
		answer:
			"会社の事業内容、登記・税務・雇用状況、申請者のビザと書類を確認し、対応範囲を確定した後に正式見積もりをご案内します。",
	},
] as const;

export const NON_B_DOCUMENT_NOTICE =
	"上記は基本書類です。事業内容や会社・申請者の状況、申請先の運用により、追加書類が必要になる場合があります。";

/**
 * Mock data — used automatically when the KYC backend is not reachable,
 * so the demo always renders something meaningful.
 */

import type {
  Case,
  KycDocument,
  ScreeningResult,
  RiskEvaluation,
  AgentRun,
  AuditEvent,
  Task,
} from "./api";

const now = new Date();
const iso = (offsetMin: number) => new Date(now.getTime() - offsetMin * 60_000).toISOString();

export const mockCases: Case[] = [
  {
    id: "c1f2a3b4-d5e6-4f78-9a01-b2c3d4e5f601",
    organization: {
      legal_name: "Acme Industries LLC",
      registration_number: "REG-12345",
      incorporation_country: "US",
      incorporation_state: "DE",
      website: "https://acme.example",
      business_description: "Industrial machinery distribution",
    },
    case_type: "onboarding",
    customer_type: "business",
    jurisdiction: "US",
    priority: "normal",
    status: "in_review",
    risk_level: "medium",
    risk_score: 58.4,
    created_at: iso(60 * 26),
  },
  {
    id: "c1f2a3b4-d5e6-4f78-9a01-b2c3d4e5f602",
    organization: {
      legal_name: "Beijing Hanwei Tech Co Ltd",
      registration_number: "91110108MA01XY7K2P",
      incorporation_country: "CN",
      website: "https://hanwei.example.cn",
      business_description: "Semiconductor design & EDA tooling",
    },
    case_type: "onboarding",
    customer_type: "business",
    jurisdiction: "CN",
    priority: "high",
    status: "edd_required",
    risk_level: "high",
    risk_score: 81.2,
    created_at: iso(60 * 6),
  },
  {
    id: "c1f2a3b4-d5e6-4f78-9a01-b2c3d4e5f603",
    organization: {
      legal_name: "Lumen Capital Partners Ltd",
      registration_number: "UK-7782341",
      incorporation_country: "GB",
      website: "https://lumencap.example",
      business_description: "Private credit asset manager",
    },
    case_type: "onboarding",
    customer_type: "business",
    jurisdiction: "UK",
    priority: "high",
    status: "submitted",
    risk_level: "medium",
    risk_score: 64.0,
    created_at: iso(60 * 2),
  },
  {
    id: "c1f2a3b4-d5e6-4f78-9a01-b2c3d4e5f604",
    organization: {
      legal_name: "Nordic Maritime AS",
      registration_number: "NO-987654321",
      incorporation_country: "NO",
      website: "https://nordicmar.example",
      business_description: "Shipping & logistics",
    },
    case_type: "onboarding",
    customer_type: "business",
    jurisdiction: "EU",
    priority: "normal",
    status: "screening",
    risk_level: "low",
    risk_score: 22.1,
    created_at: iso(60 * 18),
  },
  {
    id: "c1f2a3b4-d5e6-4f78-9a01-b2c3d4e5f605",
    organization: {
      legal_name: "Sunbelt Restaurants Group Inc",
      registration_number: "FL-44551122",
      incorporation_country: "US",
      incorporation_state: "FL",
      website: "https://sunbeltrest.example",
      business_description: "QSR franchise operator",
    },
    case_type: "onboarding",
    customer_type: "business",
    jurisdiction: "US",
    priority: "low",
    status: "approved",
    risk_level: "low",
    risk_score: 14.7,
    created_at: iso(60 * 72),
  },
  {
    id: "c1f2a3b4-d5e6-4f78-9a01-b2c3d4e5f606",
    organization: {
      legal_name: "Singapore Trade Holdings Pte",
      registration_number: "SG-201912345K",
      incorporation_country: "SG",
      website: "https://sgtrade.example",
      business_description: "Commodities trading & freight forwarding",
    },
    case_type: "onboarding",
    customer_type: "business",
    jurisdiction: "SG",
    priority: "urgent",
    status: "in_review",
    risk_level: "critical",
    risk_score: 92.3,
    created_at: iso(60 * 4),
  },
  {
    id: "c1f2a3b4-d5e6-4f78-9a01-b2c3d4e5f607",
    organization: {
      legal_name: "Helix Bio Labs SA",
      registration_number: "CH-330712001",
      incorporation_country: "CH",
      website: "https://helixbio.example",
      business_description: "Diagnostic reagents manufacturer",
    },
    case_type: "onboarding",
    customer_type: "business",
    jurisdiction: "EU",
    priority: "normal",
    status: "intake",
    risk_level: "low",
    risk_score: 18.9,
    created_at: iso(45),
  },
  {
    id: "c1f2a3b4-d5e6-4f78-9a01-b2c3d4e5f608",
    organization: {
      legal_name: "Kraken Crypto Exchange UAB",
      registration_number: "LT-305987142",
      incorporation_country: "LT",
      website: "https://kraken-uab.example",
      business_description: "Virtual asset service provider",
    },
    case_type: "onboarding",
    customer_type: "business",
    jurisdiction: "EU",
    priority: "high",
    status: "edd_required",
    risk_level: "high",
    risk_score: 76.5,
    created_at: iso(60 * 12),
  },
];

const docsByCase: Record<string, KycDocument[]> = {};
mockCases.forEach((c, i) => {
  docsByCase[c.id] = i === 0
    ? [
        { id: "d1", case_id: c.id, document_type: "certificate_of_incorporation", file_name: "incorporation.pdf", file_url: "#", mime_type: "application/pdf", created_at: iso(60 * 20) },
        { id: "d2", case_id: c.id, document_type: "ownership_chart", file_name: "ownership.png", file_url: "#", mime_type: "image/png", created_at: iso(60 * 20) },
        { id: "d3", case_id: c.id, document_type: "proof_of_address", file_name: "utility-bill.pdf", file_url: "#", mime_type: "application/pdf", created_at: iso(60 * 19) },
      ]
    : i === 1
      ? [
          { id: "d4", case_id: c.id, document_type: "certificate_of_incorporation", file_name: "营业执照.pdf", file_url: "#", mime_type: "application/pdf", created_at: iso(60 * 5) },
        ]
      : [];
});

const screeningByCase: Record<string, ScreeningResult[]> = {
  [mockCases[1].id]: [
    { id: "s1", case_id: mockCases[1].id, party_name: "Zhang Wei", screening_type: "pep", query_name: "Zhang Wei", matched_name: "Zhang Wei (former MIIT official)", match_score: 87, disposition: "potential_match", provider_name: "ComplyAdvantage" },
    { id: "s2", case_id: mockCases[1].id, party_name: "Beijing Hanwei Tech Co Ltd", screening_type: "sanctions", query_name: "Beijing Hanwei Tech", matched_name: undefined, match_score: 12, disposition: "cleared", provider_name: "OFAC" },
    { id: "s3", case_id: mockCases[1].id, party_name: "Beijing Hanwei Tech Co Ltd", screening_type: "adverse_media", query_name: "Hanwei semiconductor export", matched_name: "Hanwei flagged in 2024 export-control review", match_score: 64, disposition: "potential_match", provider_name: "Refinitiv" },
  ],
  [mockCases[5].id]: [
    { id: "s4", case_id: mockCases[5].id, party_name: "Singapore Trade Holdings Pte", screening_type: "sanctions", query_name: "Singapore Trade Holdings", matched_name: "SG Trade Holdings (OFAC SDN, 2023)", match_score: 96, disposition: "true_match", provider_name: "OFAC" },
  ],
};

const riskByCase: Record<string, RiskEvaluation> = {
  [mockCases[0].id]: { case_id: mockCases[0].id, total_score: 58.4, risk_level: "medium", triggered_rules: ["industry:industrial-machinery", "jurisdiction:US-domestic"], recommendation: "Standard review — request UBO confirmation", edd_required: false },
  [mockCases[1].id]: { case_id: mockCases[1].id, total_score: 81.2, risk_level: "high", triggered_rules: ["jurisdiction:high-risk-CN", "pep:potential-match", "industry:dual-use-tech"], recommendation: "Escalate to EDD — engage export-control specialist", edd_required: true },
  [mockCases[5].id]: { case_id: mockCases[5].id, total_score: 92.3, risk_level: "critical", triggered_rules: ["sanctions:true-match", "jurisdiction:offshore-SG", "industry:commodities"], recommendation: "Reject — confirmed sanctions hit", edd_required: true },
};

const agentRunsByCase: Record<string, AgentRun[]> = {
  [mockCases[0].id]: [
    { id: "a1", case_id: mockCases[0].id, agent_type: "intake", status: "completed", result: { standardized: true, missing_documents: [], confidence: 0.94 }, created_at: iso(60 * 24) },
    { id: "a2", case_id: mockCases[0].id, agent_type: "summary", status: "completed", result: { summary: "US-domiciled industrial distributor. Clean screening. Recommend approve pending UBO confirmation.", confidence: 0.88 }, created_at: iso(60 * 2) },
  ],
  [mockCases[1].id]: [
    { id: "a3", case_id: mockCases[1].id, agent_type: "intake", status: "completed", result: { standardized: true, missing_documents: ["ownership_chart", "ubo_declaration"], confidence: 0.71 }, created_at: iso(60 * 5) },
  ],
};

const auditByCase: Record<string, AuditEvent[]> = {
  [mockCases[0].id]: [
    { id: "e1", case_id: mockCases[0].id, event_type: "case.created", created_at: iso(60 * 26) },
    { id: "e2", case_id: mockCases[0].id, event_type: "document.uploaded", payload: { document_type: "certificate_of_incorporation" }, created_at: iso(60 * 25) },
    { id: "e3", case_id: mockCases[0].id, event_type: "screening.run", payload: { provider: "ComplyAdvantage", hits: 0 }, created_at: iso(60 * 24) },
    { id: "e4", case_id: mockCases[0].id, event_type: "risk.evaluated", payload: { score: 58.4, level: "medium" }, created_at: iso(60 * 23) },
    { id: "e5", case_id: mockCases[0].id, event_type: "agent.intake.completed", created_at: iso(60 * 22) },
  ],
};

export const mockTasks: Task[] = [
  { id: "t1", case_id: mockCases[1].id, title: "Request ownership chart from Hanwei", status: "open", due_at: iso(-60 * 24) },
  { id: "t2", case_id: mockCases[2].id, title: "Verify Lumen FCA registration", status: "in_progress", due_at: iso(-60 * 48) },
  { id: "t3", case_id: mockCases[5].id, title: "Confirm OFAC sanctions match", status: "open", due_at: iso(-60 * 4) },
  { id: "t4", case_id: mockCases[0].id, title: "Request UBO declaration from Acme", status: "open", due_at: iso(-60 * 72) },
];

export const mockApi = {
  listCases: () => Promise.resolve(mockCases),
  getCase: (id: string) => {
    const c = mockCases.find((c) => c.id === id);
    if (!c) return Promise.reject(new Error("Case not found"));
    return Promise.resolve(c);
  },
  listDocuments: (id: string) => Promise.resolve(docsByCase[id] ?? []),
  listScreening: (id: string) => Promise.resolve(screeningByCase[id] ?? []),
  runScreening: (id: string) => {
    const fresh: ScreeningResult[] = [
      { id: `s-new-${Date.now()}`, case_id: id, party_name: "(re-run)", screening_type: "sanctions", query_name: "re-run", matched_name: undefined, match_score: 8, disposition: "cleared", provider_name: "OFAC" },
    ];
    screeningByCase[id] = [...(screeningByCase[id] ?? []), ...fresh];
    return Promise.resolve(screeningByCase[id]);
  },
  getRisk: (id: string) => {
    const r = riskByCase[id];
    if (!r) return Promise.reject(new Error("not evaluated"));
    return Promise.resolve(r);
  },
  evaluateRisk: (id: string) => {
    const c = mockCases.find((c) => c.id === id);
    const score = c?.risk_score ?? 40;
    const r: RiskEvaluation = {
      case_id: id,
      total_score: score,
      risk_level: (c?.risk_level as string) ?? "medium",
      triggered_rules: ["jurisdiction:" + (c?.jurisdiction ?? "US"), "industry:" + (c?.organization?.business_description?.split(" ")[0]?.toLowerCase() ?? "general")],
      recommendation: score > 80 ? "Escalate to EDD" : score > 50 ? "Standard review" : "Auto-approve eligible",
      edd_required: score > 80,
    };
    riskByCase[id] = r;
    return Promise.resolve(r);
  },
  listAgentRuns: (id: string) => Promise.resolve(agentRunsByCase[id] ?? []),
  runIntakeAgent: (id: string) => {
    const run: AgentRun = { id: `a-${Date.now()}`, case_id: id, agent_type: "intake", status: "completed", result: { standardized: true, confidence: 0.91 }, created_at: new Date().toISOString() };
    agentRunsByCase[id] = [run, ...(agentRunsByCase[id] ?? [])];
    return Promise.resolve(run);
  },
  runSummaryAgent: (id: string) => {
    const run: AgentRun = { id: `a-${Date.now()}`, case_id: id, agent_type: "summary", status: "completed", result: { summary: "Auto-generated analyst memo (mock).", confidence: 0.85 }, created_at: new Date().toISOString() };
    agentRunsByCase[id] = [run, ...(agentRunsByCase[id] ?? [])];
    return Promise.resolve(run);
  },
  listAudit: (id: string) => Promise.resolve(auditByCase[id] ?? [
    { id: "e0", case_id: id, event_type: "case.created", created_at: iso(60) },
  ]),
  listTasks: () => Promise.resolve(mockTasks),
  createCase: (body: { organization: { legal_name: string }; jurisdiction?: string; priority?: string }) => {
    const c: Case = {
      id: `c-${Date.now()}`,
      organization: body.organization,
      case_type: "onboarding",
      customer_type: "business",
      jurisdiction: body.jurisdiction,
      priority: (body.priority as Case["priority"]) ?? "normal",
      status: "intake",
      risk_level: undefined,
      risk_score: undefined,
      created_at: new Date().toISOString(),
    };
    mockCases.unshift(c);
    return Promise.resolve(c);
  },
  addDocument: (id: string, body: { document_type: string; file_name: string; file_url: string; mime_type?: string }) => {
    const d: KycDocument = { id: `d-${Date.now()}`, case_id: id, ...body, created_at: new Date().toISOString() };
    docsByCase[id] = [...(docsByCase[id] ?? []), d];
    return Promise.resolve(d);
  },
  recordDecision: (id: string, body: { decision_type: string; decision_reason?: string; decision_notes?: string }) => {
    const c = mockCases.find((x) => x.id === id);
    if (c) c.status = body.decision_type === "approve" ? "approved" : body.decision_type === "reject" ? "rejected" : "edd_required";
    return Promise.resolve({ id: `dec-${Date.now()}`, case_id: id, ...body });
  },
};

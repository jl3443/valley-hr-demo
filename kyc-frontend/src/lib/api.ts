/**
 * KYC backend client — matches yuwang1028/kyc FastAPI routes.
 * Uses Vite dev proxy: /api → http://localhost:8000
 */

const BASE = import.meta.env.VITE_API_BASE ?? "/api/v1";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type Organization = {
  legal_name: string;
  registration_number?: string;
  incorporation_country?: string;
  incorporation_state?: string;
  registered_address?: string;
  operating_address?: string;
  website?: string;
  business_description?: string;
  industry_code?: string;
};

export type Case = {
  id: string;
  organization?: Organization & { id?: string };
  organization_id?: string;
  case_type: string;
  customer_type: string;
  jurisdiction?: string;
  priority?: "low" | "normal" | "high" | "urgent";
  status?: string;
  risk_level?: "low" | "medium" | "high" | "critical";
  risk_score?: number;
  assigned_to?: string;
  created_at?: string;
  updated_at?: string;
};

export type KycDocument = {
  id: string;
  case_id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  mime_type?: string;
  file_size?: number;
  created_at?: string;
};

export type ScreeningResult = {
  id: string;
  case_id: string;
  party_name: string;
  screening_type: string;
  query_name: string;
  matched_name?: string;
  match_score?: number;
  disposition?: string;
  provider_name?: string;
  created_at?: string;
};

export type RiskEvaluation = {
  case_id: string;
  total_score: number;
  risk_level: string;
  triggered_rules: string[];
  recommendation: string;
  edd_required: boolean;
};

export type AgentRun = {
  id: string;
  case_id: string;
  agent_type: string;
  status?: string;
  result?: unknown;
  created_at?: string;
};

export type Decision = {
  id: string;
  case_id: string;
  decision_type: string;
  decided_by?: string;
  decision_reason?: string;
  decision_notes?: string;
  created_at?: string;
};

export type AuditEvent = {
  id: string;
  case_id?: string;
  event_type: string;
  payload?: unknown;
  created_at?: string;
};

export type Task = {
  id: string;
  case_id?: string;
  title?: string;
  status?: string;
  assigned_to?: string;
  due_at?: string;
  created_at?: string;
};

export const api = {
  listCases: () => req<Case[]>("/cases"),
  getCase: (id: string) => req<Case>(`/cases/${id}`),
  createCase: (body: { organization: Organization; case_type?: string; customer_type?: string; jurisdiction?: string; priority?: string }) =>
    req<Case>("/cases", { method: "POST", body: JSON.stringify(body) }),
  updateCase: (id: string, body: Partial<Case>) =>
    req<Case>(`/cases/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  submitCase: (id: string) => req<Case>(`/cases/${id}/submit`, { method: "POST" }),

  listDocuments: (caseId: string) => req<KycDocument[]>(`/cases/${caseId}/documents`),
  addDocument: (caseId: string, body: Omit<KycDocument, "id" | "case_id" | "created_at">) =>
    req<KycDocument>(`/cases/${caseId}/documents`, { method: "POST", body: JSON.stringify(body) }),

  runScreening: (caseId: string) => req<ScreeningResult[]>(`/cases/${caseId}/screening/run`, { method: "POST" }),
  listScreening: (caseId: string) => req<ScreeningResult[]>(`/cases/${caseId}/screening/results`),

  evaluateRisk: (caseId: string) => req<RiskEvaluation>(`/cases/${caseId}/risk/evaluate`, { method: "POST" }),
  getRisk: (caseId: string) => req<RiskEvaluation>(`/cases/${caseId}/risk`),

  runIntakeAgent: (caseId: string) => req<AgentRun>(`/cases/${caseId}/agents/intake`, { method: "POST" }),
  runSummaryAgent: (caseId: string) => req<AgentRun>(`/cases/${caseId}/agents/summary`, { method: "POST" }),
  listAgentRuns: (caseId: string) => req<AgentRun[]>(`/cases/${caseId}/agent-runs`),

  recordDecision: (caseId: string, body: { decision_type: string; decision_reason?: string; decision_notes?: string }) =>
    req<Decision>(`/cases/${caseId}/decision`, { method: "POST", body: JSON.stringify(body) }),

  listAudit: (caseId: string) => req<AuditEvent[]>(`/cases/${caseId}/audit`),

  listTasks: () => req<Task[]>("/tasks"),
  updateTask: (id: string, body: Partial<Task>) =>
    req<Task>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(body) }),

  refresh: () => req<{ status: string }>("/refresh/run", { method: "POST" }),
};

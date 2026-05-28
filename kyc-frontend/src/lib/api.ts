/**
 * KYC backend client — matches yuwang1028/kyc FastAPI routes.
 *
 * Falls back to in-memory mock data when the backend is unreachable so
 * the demo always renders. Set VITE_KYC_MOCK=1 to force mock mode.
 */

import { mockApi } from "./mockData";

const BASE = import.meta.env.VITE_API_BASE ?? "/api/v1";
const FORCE_MOCK = import.meta.env.VITE_KYC_MOCK === "1";

let liveMode = !FORCE_MOCK;
let probed = false;

export function isMockMode() {
  return !liveMode;
}

async function probeBackend(): Promise<boolean> {
  if (FORCE_MOCK) return false;
  try {
    const res = await fetch(`${BASE}/cases`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

async function ensureProbed() {
  if (probed) return;
  probed = true;
  liveMode = await probeBackend();
  if (!liveMode && !FORCE_MOCK) {
    console.warn("[KYC] backend unreachable — running in mock mode");
  }
}

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

async function withFallback<T>(live: () => Promise<T>, mock: () => Promise<T>): Promise<T> {
  await ensureProbed();
  if (!liveMode) return mock();
  try {
    return await live();
  } catch (e) {
    console.warn("[KYC] live call failed, using mock", e);
    liveMode = false;
    return mock();
  }
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
  listCases: () => withFallback(() => req<Case[]>("/cases"), mockApi.listCases),
  getCase: (id: string) => withFallback(() => req<Case>(`/cases/${id}`), () => mockApi.getCase(id)),
  createCase: (body: { organization: Organization; case_type?: string; customer_type?: string; jurisdiction?: string; priority?: string }) =>
    withFallback(
      () => req<Case>("/cases", { method: "POST", body: JSON.stringify(body) }),
      () => mockApi.createCase(body),
    ),
  updateCase: (id: string, body: Partial<Case>) =>
    withFallback(
      () => req<Case>(`/cases/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
      async () => ({ ...(await mockApi.getCase(id)), ...body }),
    ),
  submitCase: (id: string) =>
    withFallback(
      () => req<Case>(`/cases/${id}/submit`, { method: "POST" }),
      () => mockApi.getCase(id),
    ),

  listDocuments: (caseId: string) =>
    withFallback(() => req<KycDocument[]>(`/cases/${caseId}/documents`), () => mockApi.listDocuments(caseId)),
  addDocument: (caseId: string, body: Omit<KycDocument, "id" | "case_id" | "created_at">) =>
    withFallback(
      () => req<KycDocument>(`/cases/${caseId}/documents`, { method: "POST", body: JSON.stringify(body) }),
      () => mockApi.addDocument(caseId, body),
    ),

  runScreening: (caseId: string) =>
    withFallback(
      () => req<ScreeningResult[]>(`/cases/${caseId}/screening/run`, { method: "POST" }),
      () => mockApi.runScreening(caseId),
    ),
  listScreening: (caseId: string) =>
    withFallback(() => req<ScreeningResult[]>(`/cases/${caseId}/screening/results`), () => mockApi.listScreening(caseId)),

  evaluateRisk: (caseId: string) =>
    withFallback(() => req<RiskEvaluation>(`/cases/${caseId}/risk/evaluate`, { method: "POST" }), () => mockApi.evaluateRisk(caseId)),
  getRisk: (caseId: string) =>
    withFallback(() => req<RiskEvaluation>(`/cases/${caseId}/risk`), () => mockApi.getRisk(caseId)),

  runIntakeAgent: (caseId: string) =>
    withFallback(() => req<AgentRun>(`/cases/${caseId}/agents/intake`, { method: "POST" }), () => mockApi.runIntakeAgent(caseId)),
  runSummaryAgent: (caseId: string) =>
    withFallback(() => req<AgentRun>(`/cases/${caseId}/agents/summary`, { method: "POST" }), () => mockApi.runSummaryAgent(caseId)),
  listAgentRuns: (caseId: string) =>
    withFallback(() => req<AgentRun[]>(`/cases/${caseId}/agent-runs`), () => mockApi.listAgentRuns(caseId)),

  recordDecision: (caseId: string, body: { decision_type: string; decision_reason?: string; decision_notes?: string }) =>
    withFallback(
      () => req<Decision>(`/cases/${caseId}/decision`, { method: "POST", body: JSON.stringify(body) }),
      () => mockApi.recordDecision(caseId, body),
    ),

  listAudit: (caseId: string) =>
    withFallback(() => req<AuditEvent[]>(`/cases/${caseId}/audit`), () => mockApi.listAudit(caseId)),

  listTasks: () => withFallback(() => req<Task[]>("/tasks"), mockApi.listTasks),
  updateTask: (id: string, body: Partial<Task>) =>
    withFallback(
      () => req<Task>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
      async () => ({ id, ...body }),
    ),
};

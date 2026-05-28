import * as React from "react";
import { useApp } from "@/state";
import {
  api,
  type Case,
  type KycDocument,
  type ScreeningResult,
  type RiskEvaluation,
  type AgentRun,
  type AuditEvent,
} from "@/lib/api";
import { TopRow } from "@/components/blocks/TopRow";
import { Card, CardHeader } from "@/components/ds/card";
import { Tabs } from "@/components/ds/tabs";
import { Button } from "@/components/ds/button";
import { Chip } from "@/components/ds/chip";
import { StatusPill, RiskPill } from "@/components/blocks/StatusPill";
import { Input, Textarea, Select, Field } from "@/components/ds/input";
import { ArrowLeft, FileText, ShieldAlert, Sparkles, Activity, Gavel } from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "documents", label: "Documents" },
  { id: "screening", label: "Screening" },
  { id: "risk", label: "Risk" },
  { id: "agents", label: "AI agents" },
  { id: "decision", label: "Decision" },
  { id: "audit", label: "Audit" },
];

export function CaseDetail({ id }: { id: string }) {
  const { go } = useApp();
  const [tab, setTab] = React.useState("overview");
  const [c, setC] = React.useState<Case | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);

  const refetch = React.useCallback(() => {
    setLoading(true);
    api.getCase(id)
      .then(setC)
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  React.useEffect(() => { refetch(); }, [refetch]);

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-4 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow
        breadcrumb={{ label: c?.organization?.legal_name ?? "Case", chip: c?.jurisdiction ?? "—" }}
        right={
          <button
            onClick={() => go({ kind: "cases" })}
            className="flex items-center gap-1 text-[12px] font-bold hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" /> Back to cases
          </button>
        }
      />

      {err && (
        <div className="text-[12px] font-bold text-[color:var(--mark-red)] bg-[color:var(--surface-rose)] px-3 py-2 rounded">
          {err}
        </div>
      )}

      {loading && !c ? (
        <div className="text-[14px] text-[color:var(--mute)] py-8 text-center">Loading…</div>
      ) : c ? (
        <>
          <Card>
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--mute)]">
                  Case · {c.id.slice(0, 8)}
                </div>
                <div className="text-[24px] font-bold tracking-[-0.01em] mt-1">
                  {c.organization?.legal_name ?? "Unnamed organization"}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <StatusPill status={c.status} />
                  <RiskPill risk={c.risk_level} />
                  {c.priority && <Chip variant="fog">Priority · {c.priority}</Chip>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] uppercase font-bold tracking-[0.08em] text-[color:var(--mute)]">
                  Risk score
                </div>
                <div className="text-[40px] font-bold tracking-[-0.02em] leading-none">
                  {c.risk_score?.toFixed(1) ?? "—"}
                </div>
              </div>
            </div>
          </Card>

          <Tabs items={tabs} value={tab} onChange={setTab} />

          {tab === "overview" && <Overview c={c} />}
          {tab === "documents" && <Documents caseId={c.id} />}
          {tab === "screening" && <Screening caseId={c.id} />}
          {tab === "risk" && <Risk caseId={c.id} onRefresh={refetch} />}
          {tab === "agents" && <Agents caseId={c.id} />}
          {tab === "decision" && <DecisionTab caseId={c.id} onRefresh={refetch} />}
          {tab === "audit" && <Audit caseId={c.id} />}
        </>
      ) : null}
    </div>
  );
}

function Overview({ c }: { c: Case }) {
  const org = c.organization;
  const rows: [string, string | undefined][] = [
    ["Legal name", org?.legal_name],
    ["Registration #", org?.registration_number],
    ["Country", org?.incorporation_country],
    ["State", org?.incorporation_state],
    ["Website", org?.website],
    ["Industry", org?.industry_code],
    ["Description", org?.business_description],
    ["Jurisdiction", c.jurisdiction],
    ["Type", c.case_type],
    ["Customer", c.customer_type],
  ];
  return (
    <Card>
      <CardHeader eyebrow="Organization" title="Submitted information" />
      <dl className="grid grid-cols-2 gap-y-3 gap-x-8 text-[14px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-[color:var(--divider)] pb-2">
            <dt className="text-[color:var(--mute)] font-bold uppercase text-[11px] tracking-[0.06em]">{k}</dt>
            <dd className="text-right">{v ?? "—"}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function Documents({ caseId }: { caseId: string }) {
  const [docs, setDocs] = React.useState<KycDocument[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [form, setForm] = React.useState({ document_type: "certificate_of_incorporation", file_name: "incorporation.pdf", file_url: "https://example.com/incorporation.pdf" });

  const refresh = React.useCallback(() => {
    setLoading(true);
    api.listDocuments(caseId).then(setDocs).finally(() => setLoading(false));
  }, [caseId]);

  React.useEffect(() => { refresh(); }, [refresh]);

  async function add() {
    await api.addDocument(caseId, { ...form, mime_type: "application/pdf" });
    refresh();
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-2">
        <CardHeader eyebrow="Evidence" title="Uploaded documents" action={<FileText className="w-4 h-4 text-[color:var(--mute)]" />} />
        {loading ? (
          <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">Loading…</div>
        ) : docs.length === 0 ? (
          <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">No documents uploaded yet.</div>
        ) : (
          <ul className="divide-y divide-[color:var(--divider)]">
            {docs.map((d) => (
              <li key={d.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[14px]">{d.file_name}</div>
                  <div className="text-[12px] text-[color:var(--mute)]">{d.document_type}</div>
                </div>
                <Chip variant="mint">{d.mime_type ?? "file"}</Chip>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Card>
        <CardHeader eyebrow="Quick add" title="Register a document" />
        <div className="space-y-3">
          <Field label="Document type">
            <Select value={form.document_type} onChange={(e) => setForm({ ...form, document_type: e.target.value })}>
              <option value="certificate_of_incorporation">Certificate of incorporation</option>
              <option value="ownership_chart">Ownership chart</option>
              <option value="proof_of_address">Proof of address</option>
              <option value="bank_statement">Bank statement</option>
              <option value="passport">Passport / ID</option>
            </Select>
          </Field>
          <Field label="File name">
            <Input value={form.file_name} onChange={(e) => setForm({ ...form, file_name: e.target.value })} />
          </Field>
          <Field label="File URL">
            <Input value={form.file_url} onChange={(e) => setForm({ ...form, file_url: e.target.value })} />
          </Field>
          <Button variant="green" size="secondary" onClick={add} className="w-full">
            Register document
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Screening({ caseId }: { caseId: string }) {
  const [results, setResults] = React.useState<ScreeningResult[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [running, setRunning] = React.useState(false);

  const refresh = React.useCallback(() => {
    setLoading(true);
    api.listScreening(caseId).then(setResults).finally(() => setLoading(false));
  }, [caseId]);

  React.useEffect(() => { refresh(); }, [refresh]);

  async function run() {
    setRunning(true);
    try {
      const r = await api.runScreening(caseId);
      setResults(r);
    } finally {
      setRunning(false);
    }
  }

  return (
    <Card>
      <CardHeader
        eyebrow="Sanctions · PEP · Adverse media"
        title="Screening results"
        action={
          <Button variant="dark" size="secondary" onClick={run} disabled={running}>
            {running ? "Running…" : "Run screening"}
          </Button>
        }
      />
      {loading ? (
        <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">Loading…</div>
      ) : results.length === 0 ? (
        <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">No results yet. Click "Run screening" to invoke the provider.</div>
      ) : (
        <table className="w-full text-[14px]">
          <thead className="text-[11px] uppercase tracking-[0.06em] text-[color:var(--mute)]">
            <tr>
              <th className="text-left py-2 font-bold">Party</th>
              <th className="text-left py-2 font-bold">Type</th>
              <th className="text-left py-2 font-bold">Match</th>
              <th className="text-left py-2 font-bold">Score</th>
              <th className="text-left py-2 font-bold">Disposition</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-t border-[color:var(--divider)]">
                <td className="py-2 font-bold">{r.party_name}</td>
                <td className="py-2 capitalize">{r.screening_type}</td>
                <td className="py-2">{r.matched_name ?? "—"}</td>
                <td className="py-2 font-bold">{r.match_score?.toFixed(0) ?? "—"}</td>
                <td className="py-2">
                  <Chip variant={r.disposition === "cleared" ? "green" : r.disposition === "true_match" ? "red" : "sage"}>
                    {r.disposition ?? "—"}
                  </Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

function Risk({ caseId, onRefresh }: { caseId: string; onRefresh: () => void }) {
  const [r, setR] = React.useState<RiskEvaluation | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    api.getRisk(caseId).then(setR).catch(() => setR(null)).finally(() => setLoading(false));
  }, [caseId]);

  async function evaluate() {
    setRunning(true);
    try {
      const res = await api.evaluateRisk(caseId);
      setR(res);
      onRefresh();
    } finally {
      setRunning(false);
    }
  }

  return (
    <Card>
      <CardHeader
        eyebrow="Rules engine"
        title="Risk assessment"
        action={
          <Button variant="dark" size="secondary" onClick={evaluate} disabled={running}>
            <ShieldAlert className="w-4 h-4" /> {running ? "Evaluating…" : "Evaluate"}
          </Button>
        }
      />
      {loading ? (
        <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">Loading…</div>
      ) : !r ? (
        <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">
          No risk evaluation yet. Click "Evaluate" to score this case.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[color:var(--surface-fog)] p-4 rounded-md">
            <div className="text-[11px] uppercase font-bold tracking-[0.08em] text-[color:var(--mute)]">Total score</div>
            <div className="text-[40px] font-bold tracking-[-0.02em] leading-none">{r.total_score.toFixed(1)}</div>
            <div className="mt-2"><RiskPill risk={r.risk_level} /></div>
          </div>
          <div className="col-span-2 space-y-3">
            <div>
              <div className="text-[11px] uppercase font-bold tracking-[0.08em] text-[color:var(--mute)] mb-1">Recommendation</div>
              <div className="text-[15px] font-bold">{r.recommendation}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold tracking-[0.08em] text-[color:var(--mute)] mb-1">Triggered rules</div>
              <div className="flex flex-wrap gap-2">
                {r.triggered_rules.length === 0 && <Chip variant="green">No rules triggered</Chip>}
                {r.triggered_rules.map((rule) => (
                  <Chip key={rule} variant="sage">{rule}</Chip>
                ))}
              </div>
            </div>
            {r.edd_required && (
              <Chip variant="red">EDD required</Chip>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

function Agents({ caseId }: { caseId: string }) {
  const [runs, setRuns] = React.useState<AgentRun[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [busy, setBusy] = React.useState<string | null>(null);

  const refresh = React.useCallback(() => {
    setLoading(true);
    api.listAgentRuns(caseId).then(setRuns).finally(() => setLoading(false));
  }, [caseId]);

  React.useEffect(() => { refresh(); }, [refresh]);

  async function run(kind: "intake" | "summary") {
    setBusy(kind);
    try {
      if (kind === "intake") await api.runIntakeAgent(caseId);
      else await api.runSummaryAgent(caseId);
      refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader eyebrow="Intake agent" title="Standardize & validate" action={<Sparkles className="w-4 h-4 text-[color:var(--mute)]" />} />
          <p className="text-[13px] text-[color:var(--mute)] mb-3">
            Normalizes organization data, requests missing documents, and prepares the case for screening.
          </p>
          <Button variant="green" size="secondary" onClick={() => run("intake")} disabled={busy !== null}>
            {busy === "intake" ? "Running…" : "Run intake agent"}
          </Button>
        </Card>
        <Card>
          <CardHeader eyebrow="Summary agent" title="Analyst brief" action={<Sparkles className="w-4 h-4 text-[color:var(--mute)]" />} />
          <p className="text-[13px] text-[color:var(--mute)] mb-3">
            Produces an analyst-ready memo from documents, screening hits, and risk score.
          </p>
          <Button variant="green" size="secondary" onClick={() => run("summary")} disabled={busy !== null}>
            {busy === "summary" ? "Running…" : "Run summary agent"}
          </Button>
        </Card>
      </div>

      <Card>
        <CardHeader eyebrow="History" title="Agent runs" action={<Activity className="w-4 h-4 text-[color:var(--mute)]" />} />
        {loading ? (
          <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">Loading…</div>
        ) : runs.length === 0 ? (
          <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">No runs yet.</div>
        ) : (
          <ul className="divide-y divide-[color:var(--divider)]">
            {runs.map((r) => (
              <li key={r.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="font-bold text-[14px] capitalize">{r.agent_type}</div>
                  <div className="text-[11px] text-[color:var(--mute)]">{r.created_at}</div>
                  {r.result != null && (
                    <pre className="mt-2 text-[12px] bg-[color:var(--surface-fog)] p-3 rounded max-w-[640px] overflow-auto">
                      {JSON.stringify(r.result, null, 2)}
                    </pre>
                  )}
                </div>
                <Chip variant={r.status === "completed" ? "green" : r.status === "failed" ? "red" : "sage"}>
                  {r.status ?? "—"}
                </Chip>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function DecisionTab({ caseId, onRefresh }: { caseId: string; onRefresh: () => void }) {
  const [type, setType] = React.useState("approve");
  const [reason, setReason] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  async function record() {
    setSaving(true);
    setSaved(false);
    try {
      await api.recordDecision(caseId, { decision_type: type, decision_reason: reason, decision_notes: notes });
      setSaved(true);
      onRefresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader eyebrow="Final action" title="Record decision" action={<Gavel className="w-4 h-4 text-[color:var(--mute)]" />} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Decision">
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
            <option value="edd">Escalate to EDD</option>
            <option value="request_info">Request more info</option>
          </Select>
        </Field>
        <Field label="Reason">
          <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Clean screening, low risk" />
        </Field>
        <Field label="Notes" className="col-span-2">
          <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional analyst notes…" />
        </Field>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button variant="green" size="secondary" onClick={record} disabled={saving}>
          {saving ? "Recording…" : "Record decision"}
        </Button>
        {saved && <Chip variant="green">Decision recorded</Chip>}
      </div>
    </Card>
  );
}

function Audit({ caseId }: { caseId: string }) {
  const [events, setEvents] = React.useState<AuditEvent[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.listAudit(caseId).then(setEvents).finally(() => setLoading(false));
  }, [caseId]);

  return (
    <Card>
      <CardHeader eyebrow="Compliance" title="Audit trail" />
      {loading ? (
        <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">Loading…</div>
      ) : events.length === 0 ? (
        <div className="text-[14px] text-[color:var(--mute)] py-6 text-center">No audit events.</div>
      ) : (
        <ul className="space-y-2">
          {events.map((e) => (
            <li key={e.id} className="flex items-start gap-3 text-[13px] border-b border-[color:var(--divider)] pb-2">
              <Chip variant="fog">{e.event_type}</Chip>
              <div className="flex-1">
                {e.payload != null && (
                  <pre className="text-[12px] text-[color:var(--mute)] whitespace-pre-wrap">
                    {JSON.stringify(e.payload, null, 2)}
                  </pre>
                )}
              </div>
              <div className="text-[11px] text-[color:var(--mute)] whitespace-nowrap">{e.created_at}</div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

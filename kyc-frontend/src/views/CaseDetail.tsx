import * as React from "react";
import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { PillButton } from "@/components/blocks/PillButton";
import { StatusPill, RiskPill } from "@/components/blocks/StatusPill";
import { AIDot } from "@/components/ai/AIDot";
import { SpringIn } from "@/components/ai/SpringIn";
import { StaggerList } from "@/components/ai/StaggerList";
import { StreamingText } from "@/components/ai/StreamingText";
import { kycCases } from "@/data/kyc";
import {
  ShieldAlert,
  Sparkles,
  FileText,
  Activity,
  Gavel,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

type TabId = "overview" | "documents" | "screening" | "risk" | "agents" | "decision" | "audit";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview",   label: "Overview" },
  { id: "documents",  label: "Documents" },
  { id: "screening",  label: "Screening" },
  { id: "risk",       label: "Risk" },
  { id: "agents",     label: "AI agents" },
  { id: "decision",   label: "Decision" },
  { id: "audit",      label: "Audit" },
];

export function CaseDetail({ id }: { id: string }) {
  const { go } = useApp();
  const [tab, setTab] = React.useState<TabId>("overview");

  const c = kycCases.find((x) => x.id.toLowerCase() === id.toLowerCase()) ?? kycCases[0];

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow
        breadcrumb={{ label: c.title, chip: c.jurisdiction }}
      />

      <SpringIn>
        <section className="bg-white border border-divider rounded-md overflow-hidden">
          <div className="bg-surface-deep text-ink-inverse px-5 py-4 flex items-start justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage mb-1">
                Case · {c.id}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[18px]">
                  {c.flag}
                </div>
                <div>
                  <div className="text-[22px] font-bold tracking-[-0.01em]">{c.title}</div>
                  <div className="text-[13px] text-ink-inverse/80 mt-0.5">{c.sub}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusPill label={c.status} kind={c.statusKind} />
                <RiskPill level={riskLevelFromScore(c.riskScore)} />
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">
                  {c.type}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">
                  {c.jurisdiction}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-ink-inverse/70">
                Risk score
              </div>
              <div className="text-[44px] font-bold tracking-[-0.02em] leading-none text-surface-sage">
                {c.riskScore?.toFixed(1) ?? "—"}
              </div>
              <div className="text-[11px] text-ink-inverse/60 mt-1">/ 100</div>
            </div>
          </div>

          <div className="flex items-center px-2 border-b border-divider bg-white">
            {tabs.map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={
                    "px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] -mb-px border-b-2 transition-colors " +
                    (active
                      ? "text-surface-deep border-surface-deep"
                      : "text-mute border-transparent hover:text-ink")
                  }
                >
                  {t.label}
                </button>
              );
            })}
            <div className="ml-auto pr-2">
              <button
                onClick={() => go({ kind: "cases" })}
                className="text-[12px] text-mute hover:text-ink flex items-center gap-1"
              >
                <ArrowLeft size={12} /> Back to cases
              </button>
            </div>
          </div>
        </section>
      </SpringIn>

      {tab === "overview" && <Overview c={c} />}
      {tab === "documents" && <Documents />}
      {tab === "screening" && <Screening />}
      {tab === "risk" && <Risk c={c} />}
      {tab === "agents" && <Agents />}
      {tab === "decision" && <Decision c={c} />}
      {tab === "audit" && <Audit />}
    </div>
  );
}

function Panel({
  eyebrow,
  title,
  action,
  children,
}: {
  eyebrow: string;
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-divider rounded-md overflow-hidden">
      <header className="px-4 py-2.5 border-b border-divider flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            {eyebrow}
          </span>
          {title && <span className="text-[12px] text-mute">{title}</span>}
        </div>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Overview({ c }: { c: (typeof kycCases)[number] }) {
  const rows: [string, string][] = [
    ["Legal name", c.title.split(" · ")[0]],
    ["Case ID", c.id],
    ["Jurisdiction", c.jurisdiction],
    ["Case type", c.type],
    ["Status", c.status],
    ["Risk score", c.riskScore?.toFixed(1) ?? "—"],
    ["Created", "2 days ago"],
    ["Analyst", "Compliance analyst · senior"],
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2 space-y-3">
        <Panel eyebrow="Agent summary" action={<Sparkles size={14} className="text-surface-deep" />}>
          <p className="text-[14px] text-ink leading-[22px]">
            <StreamingText
              cps={120}
              caret={false}
              text={`${c.title.split(" · ")[0]} is a ${c.jurisdiction}-domiciled entity flagged at risk level ${riskLevelFromScore(c.riskScore) ?? "unknown"}. Intake agent standardized ${c.type.toLowerCase()} data; screening returned ${c.statusKind === "critical" ? "one true match plus one potential match" : "no actionable matches"}. Recommended next step: ${c.statusKind === "critical" ? "escalate to enhanced due diligence." : "proceed with analyst review."}`}
            />
          </p>
        </Panel>
        <Panel eyebrow="Organization" title="Submitted information">
          <dl className="grid grid-cols-2 gap-y-3 gap-x-8 text-[14px]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-divider pb-2">
                <dt className="text-mute font-medium uppercase text-[11px] tracking-[0.06em]">{k}</dt>
                <dd className="text-right text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
      <div className="space-y-3">
        <Panel eyebrow="Auto-actions" action={<Activity size={14} className="text-surface-deep" />}>
          <StaggerList step={60}>
            {[
              { icon: CheckCircle2, label: "Intake data standardized", tone: "text-surface-deep" },
              { icon: CheckCircle2, label: "Documents OCR complete", tone: "text-surface-deep" },
              { icon: AlertTriangle, label: "Sanctions screening run · 3 hits", tone: "text-mark-red" },
              { icon: CheckCircle2, label: "Risk score evaluated", tone: "text-surface-deep" },
              { icon: AlertTriangle, label: "EDD checklist generated", tone: "text-mark-red" },
            ].map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-center gap-2 py-1.5 text-[13px]">
                  <Icon size={14} className={a.tone} />
                  <span className="text-ink">{a.label}</span>
                </div>
              );
            })}
          </StaggerList>
        </Panel>
      </div>
    </div>
  );
}

function Documents() {
  const docs = [
    { name: "Certificate of incorporation.pdf", type: "Incorporation",  status: "Verified" },
    { name: "Ownership chart.png",              type: "Ownership",      status: "Verified" },
    { name: "UBO declaration.pdf",              type: "UBO",            status: "Pending" },
    { name: "Proof of address · utility bill.pdf", type: "Address",     status: "Verified" },
    { name: "Audited financials FY24.pdf",      type: "Financials",     status: "Verified" },
  ];
  return (
    <Panel eyebrow="Evidence" title="Uploaded documents" action={<FileText size={14} className="text-surface-deep" />}>
      <div className="divide-y divide-divider">
        {docs.map((d) => (
          <div key={d.name} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-surface-fog flex items-center justify-center">
                <FileText size={14} className="text-mute" />
              </div>
              <div>
                <div className="text-[14px] font-medium">{d.name}</div>
                <div className="text-[12px] text-mute">{d.type}</div>
              </div>
            </div>
            <StatusPill label={d.status} kind={d.status === "Verified" ? "ok" : "warn"} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Screening() {
  const rows = [
    { party: "Zhang Wei",                  type: "PEP",            match: "Zhang Wei (former MIIT official)",  score: 87, disposition: "potential_match" },
    { party: "Beijing Hanwei Tech Co Ltd", type: "Sanctions",      match: "—",                                   score: 12, disposition: "cleared" },
    { party: "Beijing Hanwei Tech Co Ltd", type: "Adverse media",  match: "Flagged in 2024 export-control review", score: 64, disposition: "potential_match" },
  ];
  return (
    <Panel
      eyebrow="Sanctions · PEP · Adverse media"
      title="Screening results"
      action={<PillButton variant="primary" size="sm">Re-run screening</PillButton>}
    >
      <div className="overflow-hidden border border-divider rounded-md">
        <div className="grid grid-cols-[2fr_1fr_3fr_80px_140px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5">Party</div>
          <div className="px-4 py-2.5">Type</div>
          <div className="px-4 py-2.5">Match</div>
          <div className="px-4 py-2.5">Score</div>
          <div className="px-4 py-2.5">Disposition</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_1fr_3fr_80px_140px] border-t border-divider text-[13px] hover:bg-surface-mint/40"
          >
            <div className="px-4 py-3 font-medium">{r.party}</div>
            <div className="px-4 py-3">{r.type}</div>
            <div className="px-4 py-3 text-mute">{r.match}</div>
            <div className="px-4 py-3 font-bold">{r.score}</div>
            <div className="px-4 py-3">
              <StatusPill
                label={r.disposition}
                kind={r.disposition === "cleared" ? "ok" : r.disposition === "true_match" ? "alert" : "warn"}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Risk({ c }: { c: (typeof kycCases)[number] }) {
  return (
    <Panel
      eyebrow="Rules engine"
      title="Risk assessment"
      action={
        <PillButton variant="primary" size="sm">
          <ShieldAlert size={14} /> Re-evaluate
        </PillButton>
      }
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface-fog rounded-md p-4">
          <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-mute">Total score</div>
          <div className="text-[44px] font-bold tracking-[-0.02em] leading-none mt-1">
            {c.riskScore?.toFixed(1) ?? "—"}
          </div>
          <div className="mt-2"><RiskPill level={riskLevelFromScore(c.riskScore)} /></div>
        </div>
        <div className="col-span-2 space-y-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-mute mb-1">
              Recommendation
            </div>
            <div className="text-[15px] font-bold">
              {(c.riskScore ?? 0) > 85
                ? "Reject — confirmed sanctions hit"
                : (c.riskScore ?? 0) > 70
                  ? "Escalate to EDD — engage specialist"
                  : (c.riskScore ?? 0) > 40
                    ? "Standard review — request UBO confirmation"
                    : "Auto-approve eligible"}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-mute mb-2">
              Triggered rules
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                `jurisdiction:${c.jurisdiction.toLowerCase()}`,
                c.statusKind === "critical" ? "sanctions:true-match" : "screening:clean",
                "industry:" + c.type.toLowerCase(),
              ].map((r) => (
                <span key={r} className="px-2.5 py-1 rounded-full bg-surface-sage text-surface-deep text-[12px] font-medium">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Agents() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Panel eyebrow="Intake agent" title="Standardize & validate" action={<Sparkles size={14} className="text-surface-deep" />}>
          <p className="text-[13px] text-mute leading-[20px] mb-3">
            Normalizes organization data, requests missing documents, and prepares the case for screening.
          </p>
          <PillButton variant="primary" size="sm">Run intake agent</PillButton>
        </Panel>
        <Panel eyebrow="Summary agent" title="Analyst brief" action={<Sparkles size={14} className="text-surface-deep" />}>
          <p className="text-[13px] text-mute leading-[20px] mb-3">
            Produces an analyst-ready memo from documents, screening hits, and risk score.
          </p>
          <PillButton variant="primary" size="sm">Run summary agent</PillButton>
        </Panel>
      </div>
      <Panel eyebrow="History" title="Agent runs" action={<Activity size={14} className="text-surface-deep" />}>
        <StaggerList step={60}>
          {[
            { type: "Intake", time: "2 hours ago",  text: "Standardized 12 fields. Flagged 2 missing documents (UBO declaration, ownership chart)." },
            { type: "Screening", time: "1 hour ago", text: "Ran 3 screening passes (OFAC, ComplyAdvantage PEP, Refinitiv adverse media). 2 potential matches surfaced." },
            { type: "Summary", time: "12 min ago",   text: "Generated analyst memo. Recommendation: escalate to EDD; engage export-control specialist." },
          ].map((r, i) => (
            <div key={i} className="border-b border-divider last:border-b-0 py-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-mint flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-surface-deep" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold">{r.type} agent</span>
                  <span className="text-[11px] text-mute">· {r.time}</span>
                </div>
                <div className="text-[13px] text-mute mt-0.5">{r.text}</div>
              </div>
              <StatusPill label="completed" kind="ok" />
            </div>
          ))}
        </StaggerList>
      </Panel>
    </div>
  );
}

function Decision({ c }: { c: (typeof kycCases)[number] }) {
  const isCritical = c.statusKind === "critical";
  return (
    <Panel eyebrow="Final action" title="Record decision" action={<Gavel size={14} className="text-surface-deep" />}>
      <div className="grid grid-cols-3 gap-3">
        <button className="ui-pill text-left bg-white border border-divider rounded-md p-4 hover:border-surface-deep">
          <CheckCircle2 size={20} className="text-surface-deep mb-2" />
          <div className="text-[14px] font-bold">Approve</div>
          <div className="text-[12px] text-mute mt-1">Onboarding completes, monitoring engaged.</div>
        </button>
        <button className={"ui-pill text-left rounded-md p-4 hover:border-surface-deep " + (isCritical ? "bg-surface-sage border border-surface-sage" : "bg-white border border-divider")}>
          <AlertTriangle size={20} className="text-surface-deep mb-2" />
          <div className="text-[14px] font-bold">Escalate to EDD</div>
          <div className="text-[12px] text-mute mt-1">Open EDD checklist · assign specialist.</div>
        </button>
        <button className="ui-pill text-left bg-white border border-divider rounded-md p-4 hover:border-mark-red">
          <XCircle size={20} className="text-mark-red mb-2" />
          <div className="text-[14px] font-bold">Reject</div>
          <div className="text-[12px] text-mute mt-1">Decline onboarding, log to SAR queue.</div>
        </button>
      </div>
      <div className="mt-4">
        <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-mute mb-1">Decision notes</div>
        <textarea
          rows={3}
          placeholder="Optional analyst rationale…"
          className="w-full px-3 py-2 bg-surface-fog rounded-md text-[14px] outline-none focus:bg-white focus:ring-2 focus:ring-surface-deep"
        />
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <PillButton variant="secondary" size="sm">Save draft</PillButton>
        <PillButton variant="primary" size="sm" arrow>Record decision</PillButton>
      </div>
    </Panel>
  );
}

function Audit() {
  const events = [
    { ts: "Today · 11:14",  type: "agent.summary.completed", who: "Summary agent",  text: "Generated analyst memo." },
    { ts: "Today · 11:02",  type: "screening.hit",          who: "OFAC provider",   text: "Potential match surfaced for Zhang Wei (PEP)." },
    { ts: "Today · 10:48",  type: "risk.evaluated",         who: "Rules engine",    text: "Risk score 81.2 · level high." },
    { ts: "Today · 10:42",  type: "screening.run",          who: "Compliance analyst", text: "Triggered re-screening across 3 providers." },
    { ts: "Yesterday · 16:20", type: "document.uploaded",   who: "Client portal",   text: "营业执照.pdf received." },
    { ts: "Yesterday · 15:55", type: "case.created",        who: "Client portal",   text: "Beijing Hanwei Tech submitted intake." },
  ];
  return (
    <Panel eyebrow="Compliance" title="Audit trail">
      <StaggerList step={50}>
        {events.map((e, i) => (
          <div key={i} className="border-b border-divider last:border-b-0 py-2.5 flex items-start gap-3 text-[13px]">
            <div className="w-2 h-2 rounded-full bg-surface-deep mt-1.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-mute font-mono text-[11px]">{e.ts}</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-fog text-[11px] font-medium">{e.type}</span>
                <span className="text-[11px] text-mute">{e.who}</span>
              </div>
              <div className="text-ink mt-0.5">{e.text}</div>
            </div>
          </div>
        ))}
      </StaggerList>
    </Panel>
  );
}

function riskLevelFromScore(s?: number) {
  if (s == null) return undefined;
  if (s >= 85) return "critical";
  if (s >= 70) return "high";
  if (s >= 40) return "medium";
  return "low";
}

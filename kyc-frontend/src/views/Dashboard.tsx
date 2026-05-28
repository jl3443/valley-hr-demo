import * as React from "react";
import { useApp } from "@/state";
import { api, type Case } from "@/lib/api";
import { TopRow } from "@/components/blocks/TopRow";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { KPIStrip, type KPI } from "@/components/blocks/KPIStrip";
import { CasesTable } from "@/components/blocks/CasesTable";
import { Button } from "@/components/ds/button";

export function Dashboard() {
  const { go } = useApp();
  const [cases, setCases] = React.useState<Case[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    api.listCases()
      .then((r) => setCases(r))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const open = cases.filter((c) => !["approved", "rejected", "closed"].includes(c.status ?? ""));
  const needDecision = cases.filter((c) => c.status === "in_review" || c.status === "submitted");
  const highRisk = cases.filter((c) => c.risk_level === "high" || c.risk_level === "critical");
  const approved = cases.filter((c) => c.status === "approved");

  const kpis: KPI[] = [
    { label: "Open cases", value: open.length, trend: { delta: "3", direction: "up" } },
    { label: "Need decision", value: needDecision.length, highlight: "yellow", trend: { delta: "1", direction: "up" } },
    { label: "High risk", value: highRisk.length, trend: { delta: "0", direction: "flat" } },
    { label: "Approved (30d)", value: approved.length, trend: { delta: "4", direction: "up" } },
  ];

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "KYC dashboard", chip: "Compliance" }} />

      <HeroBanner
        eyebrow="Agentic KYC operations"
        summary={
          loading
            ? "Loading cases from backend…"
            : `${needDecision.length} cases need your decision · ${highRisk.length} high-risk in flight · ${cases.length} total in pipeline.`
        }
        cta={
          <Button variant="sage" size="secondary" onClick={() => go({ kind: "intake" })}>
            + New intake
          </Button>
        }
        meta={err ? `Backend offline — ${err}` : "Live · Supabase Postgres"}
      />

      <KPIStrip items={kpis} />

      <div className="flex items-center justify-between pt-2">
        <h3 className="text-[14px] font-bold uppercase tracking-[0.08em] text-[color:var(--mute)]">
          Recent cases
        </h3>
        <button
          className="text-[12px] font-bold underline underline-offset-4"
          onClick={() => go({ kind: "cases" })}
        >
          View all
        </button>
      </div>

      {loading ? (
        <div className="text-[14px] text-[color:var(--mute)] py-8 text-center">Loading…</div>
      ) : (
        <CasesTable cases={cases.slice(0, 8)} onOpen={(id) => go({ kind: "case", id })} />
      )}
    </div>
  );
}

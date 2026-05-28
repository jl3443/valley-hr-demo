import * as React from "react";
import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { PillButton } from "@/components/blocks/PillButton";
import { StatusPill, RiskPill } from "@/components/blocks/StatusPill";
import { StaggerList } from "@/components/ai/StaggerList";
import { AIDot } from "@/components/ai/AIDot";
import { kycCases } from "@/data/kyc";
import { Search } from "lucide-react";

export function Cases() {
  const { go } = useApp();
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");

  const filtered = kycCases.filter((c) => {
    if (status !== "all" && c.statusKind !== status) return false;
    if (q && !c.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Cases", chip: `${kycCases.length} total` }} />

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            All KYC cases
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-fog border border-divider text-[13px] w-[260px]">
              <Search size={14} className="text-mute" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search organization…"
                className="bg-transparent outline-none flex-1 text-[13px]"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-surface-fog border border-divider text-[13px] outline-none"
            >
              <option value="all">All statuses</option>
              <option value="critical">Critical</option>
              <option value="warn">In review</option>
              <option value="ready">Ready to review</option>
              <option value="resolved">Resolved</option>
            </select>
            <PillButton variant="primary" size="sm" onClick={() => go({ kind: "intake" })}>
              + New intake
            </PillButton>
          </div>
        </header>

        <div className="grid grid-cols-[80px_2.5fr_120px_1fr_1fr_120px_40px] bg-surface-deep text-ink-inverse text-[11px] tracking-[0.08em] uppercase font-medium">
          <div className="px-4 py-2.5">ID</div>
          <div className="px-4 py-2.5">Organization</div>
          <div className="px-4 py-2.5">Jurisdiction</div>
          <div className="px-4 py-2.5">Type</div>
          <div className="px-4 py-2.5">Status</div>
          <div className="px-4 py-2.5">Risk</div>
          <div />
        </div>

        <StaggerList step={50}>
          {filtered.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => go(c.target)}
              className="ui-pill w-full grid grid-cols-[80px_2.5fr_120px_1fr_1fr_120px_40px] items-center border-t border-divider first:border-t-0 text-left hover:bg-surface-mint/40"
            >
              <div className="px-4 py-3 text-[12px] text-mute font-mono">{c.id}</div>
              <div className="px-4 py-3 flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-full bg-surface-fog flex items-center justify-center text-[14px] shrink-0">
                  {c.flag}
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-medium text-ink truncate">{c.title}</div>
                  <div className="text-[12px] text-mute truncate">{c.sub}</div>
                </div>
              </div>
              <div className="px-4 py-3 text-[13px] text-mute">{c.jurisdiction}</div>
              <div className="px-4 py-3 text-[13px]">{c.type}</div>
              <div className="px-4 py-3"><StatusPill label={c.status} kind={c.statusKind} /></div>
              <div className="px-4 py-3"><RiskPill level={riskLevelFromScore(c.riskScore)} /></div>
              <div className="px-2 text-ink text-right" aria-hidden>→</div>
            </button>
          ))}
        </StaggerList>
      </section>
    </div>
  );
}

function riskLevelFromScore(s?: number) {
  if (s == null) return undefined;
  if (s >= 85) return "critical";
  if (s >= 70) return "high";
  if (s >= 40) return "medium";
  return "low";
}

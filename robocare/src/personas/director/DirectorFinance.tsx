import * as React from "react";
import { TopRow } from "@/components/blocks/TopRow";
import { AIDot } from "@/components/ai/AIDot";
import { StatusPill } from "@/components/blocks/StatusPill";
import { projects, clientById, portfolioStats } from "@/data/projects";
import { invoices } from "@/data/activity";
import { ChevronDown, ChevronRight } from "lucide-react";

type Granularity = "month" | "quarter" | "year";

export function DirectorFinance() {
  const [gran, setGran] = React.useState<Granularity>("quarter");
  const [open, setOpen] = React.useState<Record<string, boolean>>({ "Q1 2025": true });

  const buckets = (() => {
    if (gran === "year") return ["2024", "2025"];
    if (gran === "quarter") return ["Q4 2024", "Q1 2025", "Q2 2025", "Q3 2025"];
    return ["Mar 2025", "Apr 2025", "May 2025"];
  })();

  function bucketTotal(bucket: string) {
    if (gran === "quarter") {
      return projects.reduce((acc, p) => {
        const q = p.spendByQuarter.find((q) => q.quarter === bucket);
        return acc + (q?.amount ?? 0);
      }, 0);
    }
    if (gran === "year") {
      return projects.reduce((acc, p) => {
        const qs = p.spendByQuarter.filter((q) => q.quarter.endsWith(bucket));
        return acc + qs.reduce((a, q) => a + q.amount, 0);
      }, 0);
    }
    // month: approximate from invoices
    return invoices
      .filter((i) => i.status === "Approved" && i.date.startsWith(bucketIsoPrefix(bucket)))
      .reduce((a, i) => a + i.amount, 0);
  }

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Finance", chip: "drill-down" }} />

      <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage">Operating expense</div>
          <div className="text-[28px] font-bold tracking-[-0.02em] mt-1">
            ${(portfolioStats.totalSpendYtd / 1000).toFixed(0)}k YTD
          </div>
          <div className="text-[13px] text-ink-inverse/75 mt-0.5">
            Across {portfolioStats.active} active projects · {Object.keys(invoices).length} approved invoices
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
          {(["month", "quarter", "year"] as Granularity[]).map((g) => (
            <button
              key={g}
              onClick={() => setGran(g)}
              className={"px-3 py-1.5 rounded-full text-[12px] uppercase tracking-[0.08em] font-bold " + (gran === g ? "bg-surface-sage text-surface-deep" : "text-ink-inverse/80 hover:bg-white/10")}
            >
              {g === "month" ? "Month" : g === "quarter" ? "Quarter" : "Year"}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Period totals · click to drill into projects → invoices
          </span>
        </header>
        <div className="grid grid-cols-[40px_2fr_180px_180px_180px_180px_120px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5" />
          <div className="px-4 py-2.5">Period</div>
          <div className="px-4 py-2.5">Labor</div>
          <div className="px-4 py-2.5">Equipment</div>
          <div className="px-4 py-2.5">Travel</div>
          <div className="px-4 py-2.5">Reimbursable</div>
          <div className="px-4 py-2.5">Total</div>
        </div>
        {buckets.map((b) => {
          const total = bucketTotal(b);
          // proportional breakdown
          const lab = total * 0.62;
          const eq = total * 0.16;
          const tr = total * 0.13;
          const re = total * 0.09;
          const isOpen = !!open[b];
          return (
            <div key={b}>
              <button
                onClick={() => setOpen({ ...open, [b]: !isOpen })}
                className="ui-pill w-full grid grid-cols-[40px_2fr_180px_180px_180px_180px_120px] border-t border-divider items-center text-[13px] text-left hover:bg-surface-mint/40"
              >
                <div className="px-4 py-3 text-surface-deep">
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
                <div className="px-4 py-3 font-bold">{b}</div>
                <div className="px-4 py-3">${(lab / 1000).toFixed(0)}k</div>
                <div className="px-4 py-3">${(eq / 1000).toFixed(0)}k</div>
                <div className="px-4 py-3">${(tr / 1000).toFixed(0)}k</div>
                <div className="px-4 py-3">${(re / 1000).toFixed(0)}k</div>
                <div className="px-4 py-3 font-bold">${(total / 1000).toFixed(0)}k</div>
              </button>
              {isOpen && <DrillDown bucket={b} />}
            </div>
          );
        })}
      </section>
    </div>
  );
}

function DrillDown({ bucket }: { bucket: string }) {
  const rows = projects
    .filter((p) => p.spendByQuarter.some((q) => q.quarter === bucket))
    .map((p) => {
      const q = p.spendByQuarter.find((q) => q.quarter === bucket)!;
      return { p, amount: q.amount };
    })
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="bg-surface-fog/50">
      <div className="grid grid-cols-[40px_2fr_1.4fr_1fr_180px_120px] text-[11px] uppercase tracking-[0.08em] text-mute font-medium px-1">
        <div />
        <div className="px-4 py-2">Project</div>
        <div className="px-4 py-2">Client</div>
        <div className="px-4 py-2">Status</div>
        <div className="px-4 py-2">Invoices in period</div>
        <div className="px-4 py-2">Amount</div>
      </div>
      {rows.map(({ p, amount }) => {
        const c = clientById(p.clientId);
        const invs = invoices.filter((i) => i.projectId === p.id && i.status === "Approved" && matchesBucket(i.date, bucket)).length;
        return (
          <div key={p.id} className="grid grid-cols-[40px_2fr_1.4fr_1fr_180px_120px] items-center border-t border-divider text-[13px] hover:bg-white">
            <div />
            <div className="px-4 py-2.5 font-medium">{p.name}</div>
            <div className="px-4 py-2.5 text-mute"><span className="mr-1">{c?.flag}</span>{c?.name}</div>
            <div className="px-4 py-2.5"><StatusPill label={p.status} kind={p.status === "In Progress" ? "active" : p.status === "Completed" ? "ok" : "neutral"} /></div>
            <div className="px-4 py-2.5 text-mute">{invs} invoice{invs === 1 ? "" : "s"}</div>
            <div className="px-4 py-2.5 font-bold">${(amount / 1000).toFixed(0)}k</div>
          </div>
        );
      })}
    </div>
  );
}

function bucketIsoPrefix(b: string) {
  const map: Record<string, string> = {
    "Mar 2025": "2025-03",
    "Apr 2025": "2025-04",
    "May 2025": "2025-05",
  };
  return map[b] ?? "0000";
}

function matchesBucket(date: string, bucket: string) {
  const month = Number(date.slice(5, 7));
  const year = Number(date.slice(0, 4));
  const m: Record<string, [number, number[]]> = {
    "Q4 2024": [2024, [10, 11, 12]],
    "Q1 2025": [2025, [1, 2, 3]],
    "Q2 2025": [2025, [4, 5, 6]],
    "Q3 2025": [2025, [7, 8, 9]],
  };
  const entry = m[bucket];
  if (!entry) return false;
  return year === entry[0] && entry[1].includes(month);
}

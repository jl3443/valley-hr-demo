import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { KPIStrip, type KPI } from "@/components/blocks/KPIStrip";
import { PillButton } from "@/components/blocks/PillButton";
import { StatusPill } from "@/components/blocks/StatusPill";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";
import { projects, clientById, clients, portfolioStats } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export function DirectorDashboard() {
  const { go } = useApp();
  const active = projects.filter((p) => p.status === "In Progress").sort((a, b) => b.spent - a.spent);
  const overrunRisk = active.filter((p) => p.spent / p.budget > p.progress / 100 + 0.1).length;

  const kpis: KPI[] = [
    { label: "Active projects",      value: portfolioStats.active,                                                       trend: { delta: "1", direction: "up" },   spark: [4, 4, 5, 5, 6, 6, 6, 6] },
    { label: "YTD spend",            value: Math.round(portfolioStats.totalSpendYtd / 1000), prefix: "$", suffix: "k",   trend: { delta: "12", direction: "up" },  spark: [320, 480, 640, 820, 980, 1180, 1380, 1604] },
    { label: "Budget burn",          value: Math.round((portfolioStats.totalSpendYtd / portfolioStats.budgetTotal) * 100), suffix: "%", highlight: "yellow", trend: { delta: "4", direction: "up" }, spark: [38, 41, 44, 48, 52, 56, 58, 60] },
    { label: "Overrun risk",         value: overrunRisk,                                                                  trend: { delta: "0", direction: "flat" }, spark: [1, 1, 1, 1, 1, 1, 1, 1] },
  ];

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Director console", chip: "read-only" }} />

      <HeroBanner
        eyebrow="Portfolio rollup"
        summary={`${portfolioStats.active} active projects across ${clients.length} clients · $${(portfolioStats.totalSpendYtd / 1000).toFixed(0)}k spent YTD against $${(portfolioStats.budgetTotal / 1000).toFixed(0)}k budget · ${overrunRisk} project flagged for cost-vs-progress drift.`}
        cta={<PillButton variant="mint" size="sm" onClick={() => go({ kind: "director", page: "finance" })}>Drill into finance →</PillButton>}
        meta="Live · auto-rolled from PM entries"
      />

      <KPIStrip items={kpis} />

      <div className="grid grid-cols-[1.5fr_1fr] gap-3">
        <section className="bg-white border border-divider rounded-md overflow-hidden">
          <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Top active projects · by spend
            </span>
            <span className="text-[12px] text-mute ml-auto">Tap to drill down</span>
          </header>
          <StaggerList step={60}>
            {active.map((p) => {
              const c = clientById(p.clientId);
              const burn = Math.round((p.spent / p.budget) * 100);
              const drift = burn - p.progress;
              return (
                <button
                  key={p.id}
                  onClick={() => go({ kind: "director", page: "project", id: p.id })}
                  className="ui-pill w-full px-4 py-3 border-b border-divider last:border-b-0 flex items-center justify-between text-left hover:bg-surface-mint/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-surface-fog flex items-center justify-center text-[15px]">{c?.flag}</div>
                    <div className="min-w-0">
                      <div className="text-[12px] text-mute font-mono">{p.id} · {c?.name}</div>
                      <div className="text-[14px] font-bold mt-0.5">{p.name}</div>
                      <div className="text-[12px] text-mute mt-0.5">{p.location} · team of {p.teamIds.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-[0.06em] text-mute font-medium">Spend</div>
                      <div className="text-[14px] font-bold">${(p.spent / 1000).toFixed(0)}k</div>
                      <div className="text-[11px] text-mute">of ${(p.budget / 1000).toFixed(0)}k</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-[0.06em] text-mute font-medium">Progress</div>
                      <div className="text-[14px] font-bold">{p.progress}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-[0.06em] text-mute font-medium">Drift</div>
                      <div className={"text-[14px] font-bold " + (drift > 10 ? "text-mark-red" : drift < -5 ? "text-surface-deep" : "text-ink")}>
                        {drift > 0 ? "+" : ""}{drift}pp
                      </div>
                    </div>
                    <StatusPill label={drift > 10 ? "Watch" : "On track"} kind={drift > 10 ? "warn" : "ok"} />
                    <ArrowRight size={14} className="text-mute" />
                  </div>
                </button>
              );
            })}
          </StaggerList>
        </section>

        <section className="bg-white border border-divider rounded-md overflow-hidden">
          <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Spend by category · YTD
            </span>
          </header>
          <div className="p-5">
            <CategoryBars cats={portfolioStats.spendByCategoryYtd} total={portfolioStats.totalSpendYtd} />
          </div>
        </section>
      </div>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Client portfolio
          </span>
        </header>
        <div className="grid grid-cols-[60px_1.8fr_1.4fr_120px_120px_140px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5" />
          <div className="px-4 py-2.5">Client</div>
          <div className="px-4 py-2.5">Industry</div>
          <div className="px-4 py-2.5">Projects</div>
          <div className="px-4 py-2.5">Active</div>
          <div className="px-4 py-2.5">Spend YTD</div>
        </div>
        {clients.map((c) => {
          const myProjects = projects.filter((p) => p.clientId === c.id);
          const myActive = myProjects.filter((p) => p.status === "In Progress").length;
          const spend = myProjects.filter((p) => p.status !== "Completed").reduce((s, p) => s + p.spent, 0);
          return (
            <div key={c.id} className="grid grid-cols-[60px_1.8fr_1.4fr_120px_120px_140px] border-t border-divider items-center text-[13px] hover:bg-surface-mint/40">
              <div className="px-4 py-3 text-[18px]">{c.flag}</div>
              <div className="px-4 py-3 font-bold">{c.name}</div>
              <div className="px-4 py-3 text-mute">{c.industry}</div>
              <div className="px-4 py-3">{myProjects.length}</div>
              <div className="px-4 py-3">{myActive}</div>
              <div className="px-4 py-3 font-bold">${(spend / 1000).toFixed(0)}k</div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function CategoryBars({
  cats,
  total,
}: {
  cats: { labor: number; travel: number; equipment: number; invoices: number };
  total: number;
}) {
  const rows: { label: string; v: number; tone: string }[] = [
    { label: "Labor",        v: cats.labor,     tone: "bg-surface-deep" },
    { label: "Equipment",    v: cats.equipment, tone: "bg-accent-green" },
    { label: "Travel",       v: cats.travel,    tone: "bg-surface-sage" },
    { label: "Reimbursable", v: cats.invoices,  tone: "bg-valley-blue" },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const pct = Math.round((r.v / total) * 100);
        return (
          <div key={r.label}>
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-[12px] text-ink font-medium">{r.label}</div>
              <div className="text-[12px] text-mute">${(r.v / 1000).toFixed(0)}k · {pct}%</div>
            </div>
            <div className="h-3 rounded-md bg-surface-fog overflow-hidden">
              <div className={"h-full " + r.tone} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

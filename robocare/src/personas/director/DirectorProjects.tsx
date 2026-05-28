import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { StatusPill } from "@/components/blocks/StatusPill";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";
import { projects, clientById } from "@/data/projects";
import { employeeById } from "@/data/employees";

export function DirectorProjects() {
  const { go } = useApp();
  const sorted = [...projects].sort((a, b) => (b.spent / b.budget) - (a.spent / a.budget));
  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Projects portfolio", chip: `${projects.length} total` }} />

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            All projects · click to drill into quarterly spend
          </span>
        </header>
        <div className="grid grid-cols-[100px_2fr_1.2fr_1fr_140px_140px_120px_120px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5">ID</div>
          <div className="px-4 py-2.5">Project</div>
          <div className="px-4 py-2.5">Client</div>
          <div className="px-4 py-2.5">PM</div>
          <div className="px-4 py-2.5">Period</div>
          <div className="px-4 py-2.5">Spend / Budget</div>
          <div className="px-4 py-2.5">Progress</div>
          <div className="px-4 py-2.5">Status</div>
        </div>
        <StaggerList step={30}>
          {sorted.map((p) => {
            const c = clientById(p.clientId);
            const pm = employeeById(p.pmId);
            const burn = Math.round((p.spent / p.budget) * 100);
            return (
              <button
                key={p.id}
                onClick={() => go({ kind: "director", page: "project", id: p.id })}
                className="ui-pill w-full grid grid-cols-[100px_2fr_1.2fr_1fr_140px_140px_120px_120px] border-t border-divider items-center text-[13px] text-left hover:bg-surface-mint/40"
              >
                <div className="px-4 py-3 font-mono text-mute">{p.id}</div>
                <div className="px-4 py-3 font-medium">{p.name}</div>
                <div className="px-4 py-3 text-mute"><span className="mr-1">{c?.flag}</span>{c?.name}</div>
                <div className="px-4 py-3 text-mute">{pm?.name}</div>
                <div className="px-4 py-3 text-mute">{p.startDate.slice(0, 7)} → {p.endDate.slice(0, 7)}</div>
                <div className="px-4 py-3">
                  <div className="font-bold text-[13px]">${(p.spent / 1000).toFixed(0)}k / ${(p.budget / 1000).toFixed(0)}k</div>
                  <div className="h-1 mt-1 rounded-full bg-surface-fog">
                    <div className={"h-full rounded-full " + (burn > 90 ? "bg-mark-red" : burn > 70 ? "bg-valley-yellow" : "bg-surface-deep")}
                         style={{ width: `${Math.min(100, burn)}%` }} />
                  </div>
                </div>
                <div className="px-4 py-3 font-bold">{p.progress}%</div>
                <div className="px-4 py-3"><StatusPill label={p.status} kind={p.status === "In Progress" ? "active" : p.status === "Completed" ? "ok" : "neutral"} /></div>
              </button>
            );
          })}
        </StaggerList>
      </section>
    </div>
  );
}

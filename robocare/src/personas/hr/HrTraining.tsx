import { TopRow } from "@/components/blocks/TopRow";
import { AIDot } from "@/components/ai/AIDot";
import { employees } from "@/data/employees";
import { StatusPill } from "@/components/blocks/StatusPill";

export function HrTraining() {
  const sorted = [...employees].sort((a, b) => b.trainingScore - a.trainingScore);
  const avg = Math.round(employees.reduce((a, e) => a + e.trainingScore, 0) / employees.length);

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Training", chip: "scoring & certs" }} />

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Avg score", value: `${avg}` },
          { label: "Above 90",  value: `${sorted.filter((e) => e.trainingScore >= 90).length}` },
          { label: "Below 80",  value: `${sorted.filter((e) => e.trainingScore < 80).length}` },
          { label: "Cert. on file", value: `${sorted.reduce((a, e) => a + e.certs.length, 0)}` },
        ].map((k) => (
          <div key={k.label} className="rounded-md bg-white border border-divider px-4 py-3 h-[92px] flex flex-col justify-between">
            <div className="text-[12px] tracking-[0.08em] uppercase font-medium text-mute">{k.label}</div>
            <div className="text-[24px] font-bold tracking-[-0.02em]">{k.value}</div>
          </div>
        ))}
      </div>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Training scoreboard · all employees
          </span>
        </header>
        <div className="grid grid-cols-[2fr_1.2fr_1fr_2fr_90px_120px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5">Employee</div>
          <div className="px-4 py-2.5">Role</div>
          <div className="px-4 py-2.5">Class</div>
          <div className="px-4 py-2.5">Certifications</div>
          <div className="px-4 py-2.5">Score</div>
          <div className="px-4 py-2.5">Bar</div>
        </div>
        {sorted.map((e) => (
          <div key={e.id} className="grid grid-cols-[2fr_1.2fr_1fr_2fr_90px_120px] border-t border-divider items-center text-[13px] hover:bg-surface-mint/40">
            <div className="px-4 py-2.5 font-medium">{e.name}</div>
            <div className="px-4 py-2.5 text-mute">{e.role}</div>
            <div className="px-4 py-2.5"><StatusPill label={e.kind} kind={e.kind === "W2" ? "ready" : "warn"} /></div>
            <div className="px-4 py-2.5 text-mute truncate">{e.certs.join(" · ") || "—"}</div>
            <div className="px-4 py-2.5 font-bold">{e.trainingScore}</div>
            <div className="px-4 py-2.5">
              <div className="h-1.5 rounded-full bg-surface-fog">
                <div className={"h-full rounded-full " + (e.trainingScore >= 90 ? "bg-surface-deep" : e.trainingScore >= 80 ? "bg-accent-green" : "bg-valley-yellow")}
                     style={{ width: `${e.trainingScore}%` }} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

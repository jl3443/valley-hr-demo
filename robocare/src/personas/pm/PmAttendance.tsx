import * as React from "react";
import { TopRow } from "@/components/blocks/TopRow";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";
import { projects, clientById } from "@/data/projects";
import { employeeById } from "@/data/employees";
import { Check, Clock, UtensilsCrossed } from "lucide-react";

export function PmAttendance() {
  const myProjects = projects.filter((p) => p.pmId === "EMP-001" && p.status === "In Progress");
  const [projectId, setProjectId] = React.useState(myProjects[0]?.id ?? "");
  const project = myProjects.find((p) => p.id === projectId)!;
  const teamEmployees = project.teamIds.map((id) => employeeById(id)!).filter(Boolean);

  type Row = { employeeId: string; present: boolean; regular: number; ot: number; meal: boolean };
  const [rows, setRows] = React.useState<Row[]>(() =>
    teamEmployees.map((e) => ({ employeeId: e.id, present: true, regular: 8, ot: 0, meal: true })),
  );

  // Re-init on project change
  React.useEffect(() => {
    setRows(teamEmployees.map((e) => ({ employeeId: e.id, present: true, regular: 8, ot: 0, meal: true })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const present = rows.filter((r) => r.present);
  const totalReg = present.reduce((s, r) => s + Number(r.regular || 0), 0);
  const totalOt = present.reduce((s, r) => s + Number(r.ot || 0), 0);
  const totalLabor = present.reduce((s, r) => {
    const e = employeeById(r.employeeId);
    if (!e) return s;
    return s + (Number(r.regular) + Number(r.ot) * 1.5) * e.hourlyRate;
  }, 0);

  function update(id: string, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.employeeId === id ? { ...r, ...patch } : r)));
  }

  const client = clientById(project.clientId);

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Attendance entry", chip: "today · 2025-05-27" }} />

      <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-4">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[18px]">{client?.flag}</div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage">Project</div>
              <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="bg-white/10 text-ink-inverse rounded-md px-3 py-1.5 text-[15px] font-bold mt-1 outline-none">
                {myProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <div className="text-[12px] text-ink-inverse/70 mt-1">{client?.name} · {project.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <Stat label="Present"      value={`${present.length} / ${rows.length}`} />
            <Stat label="Regular h"    value={`${totalReg}`} />
            <Stat label="OT h"         value={`${totalOt}`} accent="yellow" />
            <Stat label="Labor today"  value={`$${Math.round(totalLabor).toLocaleString()}`} />
          </div>
        </div>
      </section>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Team roster · check who's present + enter hours
            </span>
          </div>
          <PillButton variant="primary" size="sm"><Check size={14} /> Submit attendance</PillButton>
        </header>
        <div className="grid grid-cols-[60px_1.6fr_1fr_120px_120px_120px_120px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5">Present</div>
          <div className="px-4 py-2.5">Employee</div>
          <div className="px-4 py-2.5">Role</div>
          <div className="px-4 py-2.5">Class</div>
          <div className="px-4 py-2.5">Regular h</div>
          <div className="px-4 py-2.5">OT h</div>
          <div className="px-4 py-2.5">Meal</div>
        </div>
        <StaggerList step={30}>
          {rows.map((r) => {
            const e = employeeById(r.employeeId)!;
            return (
              <div key={e.id} className={"grid grid-cols-[60px_1.6fr_1fr_120px_120px_120px_120px] border-t border-divider items-center text-[13px] " + (r.present ? "bg-white" : "bg-surface-fog/60 text-mute")}>
                <div className="px-4 py-2.5">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--accent-green-deep)]"
                    checked={r.present}
                    onChange={(ev) => update(e.id, { present: ev.target.checked })} />
                </div>
                <div className="px-4 py-2.5 font-medium flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-surface-mint text-surface-deep flex items-center justify-center text-[11px] font-bold">
                    {e.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </div>
                  {e.name}
                </div>
                <div className="px-4 py-2.5 text-mute">{e.role}</div>
                <div className="px-4 py-2.5">{e.kind}</div>
                <div className="px-4 py-2.5">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-fog">
                    <Clock size={12} className="text-mute" />
                    <input type="number" value={r.regular} step={0.5} min={0} max={24}
                      onChange={(ev) => update(e.id, { regular: Number(ev.target.value) })}
                      disabled={!r.present}
                      className="bg-transparent outline-none w-full text-[13px]" />
                  </div>
                </div>
                <div className="px-4 py-2.5">
                  <div className={"flex items-center gap-1 px-2 py-1 rounded-md " + (r.ot > 0 ? "bg-surface-sage" : "bg-surface-fog")}>
                    <Clock size={12} className={r.ot > 0 ? "text-surface-deep" : "text-mute"} />
                    <input type="number" value={r.ot} step={0.5} min={0} max={12}
                      onChange={(ev) => update(e.id, { ot: Number(ev.target.value) })}
                      disabled={!r.present}
                      className="bg-transparent outline-none w-full text-[13px] font-bold" />
                  </div>
                </div>
                <div className="px-4 py-2.5">
                  <label className="inline-flex items-center gap-1.5 text-[13px]">
                    <input type="checkbox" className="w-4 h-4 accent-[var(--accent-green-deep)]"
                      checked={r.meal}
                      onChange={(ev) => update(e.id, { meal: ev.target.checked })}
                      disabled={!r.present} />
                    <UtensilsCrossed size={12} className="text-mute" />
                    <span className="text-mute">${e.mealAllowance}</span>
                  </label>
                </div>
              </div>
            );
          })}
        </StaggerList>
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "yellow" }) {
  return (
    <div className="text-right leading-tight">
      <div className="text-[11px] uppercase tracking-[0.06em] font-medium text-ink-inverse/65">{label}</div>
      <div className={"text-[22px] font-bold tracking-[-0.01em] " + (accent === "yellow" ? "text-surface-sage" : "text-ink-inverse")}>
        {value}
      </div>
    </div>
  );
}

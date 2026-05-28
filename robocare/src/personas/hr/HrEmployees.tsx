import * as React from "react";
import { TopRow } from "@/components/blocks/TopRow";
import { StatusPill } from "@/components/blocks/StatusPill";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";
import { employees, type Employee } from "@/data/employees";
import { Search } from "lucide-react";

export function HrEmployees() {
  const [q, setQ] = React.useState("");
  const [kind, setKind] = React.useState<"all" | "W2" | "1099">("all");
  const [selected, setSelected] = React.useState<Employee | null>(null);

  const filtered = employees.filter((e) => {
    if (kind !== "all" && e.kind !== kind) return false;
    if (q) {
      const needle = q.toLowerCase();
      if (!e.name.toLowerCase().includes(needle) && !e.role.toLowerCase().includes(needle) && !e.id.toLowerCase().includes(needle)) return false;
    }
    return true;
  });

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Employees", chip: `${employees.length} total` }} />

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Workforce roster
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-fog border border-divider text-[13px] w-[260px]">
              <Search size={14} className="text-mute" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, role, ID…" className="bg-transparent outline-none flex-1 text-[13px]" />
            </div>
            <select value={kind} onChange={(e) => setKind(e.target.value as typeof kind)} className="px-3 py-1.5 rounded-full bg-surface-fog border border-divider text-[13px] outline-none">
              <option value="all">All classes</option>
              <option value="W2">W2</option>
              <option value="1099">1099</option>
            </select>
            <PillButton variant="primary" size="sm">+ Add employee</PillButton>
          </div>
        </header>

        <div className="grid grid-cols-[100px_2fr_1.4fr_1.2fr_90px_90px_90px_90px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5">ID</div>
          <div className="px-4 py-2.5">Name</div>
          <div className="px-4 py-2.5">Role</div>
          <div className="px-4 py-2.5">Location</div>
          <div className="px-4 py-2.5">Class</div>
          <div className="px-4 py-2.5">Status</div>
          <div className="px-4 py-2.5">PTO h</div>
          <div className="px-4 py-2.5">Rate $/h</div>
        </div>
        <StaggerList step={20}>
          {filtered.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e)}
              className="ui-pill w-full grid grid-cols-[100px_2fr_1.4fr_1.2fr_90px_90px_90px_90px] items-center border-t border-divider text-[13px] text-left hover:bg-surface-mint/40"
            >
              <div className="px-4 py-3 font-mono text-mute">{e.id}</div>
              <div className="px-4 py-3 font-medium">{e.name}</div>
              <div className="px-4 py-3 text-mute">{e.role}</div>
              <div className="px-4 py-3 text-mute">{e.baseLocation}</div>
              <div className="px-4 py-3"><StatusPill label={e.kind} kind={e.kind === "W2" ? "ready" : "warn"} /></div>
              <div className="px-4 py-3"><StatusPill label={e.status} kind={statusKind(e.status)} /></div>
              <div className="px-4 py-3 font-bold">{e.ptoBalance}</div>
              <div className="px-4 py-3">${e.hourlyRate}</div>
            </button>
          ))}
        </StaggerList>
      </section>

      {selected && <EmployeeDrawer e={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function statusKind(s: Employee["status"]): React.ComponentProps<typeof StatusPill>["kind"] {
  switch (s) {
    case "On project": return "active";
    case "On leave":   return "warn";
    case "Bench":      return "critical";
    case "Active":     return "ok";
  }
}

function EmployeeDrawer({ e, onClose }: { e: Employee; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/30" onClick={onClose}>
      <div className="w-[520px] bg-white h-full overflow-y-auto" onClick={(ev) => ev.stopPropagation()}>
        <div className="bg-surface-deep text-ink-inverse px-5 py-4">
          <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage">{e.id}</div>
          <div className="text-[22px] font-bold mt-1">{e.name}</div>
          <div className="text-[13px] text-ink-inverse/75 mt-0.5">{e.role} · {e.department}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusPill label={e.kind} kind={e.kind === "W2" ? "ready" : "warn"} />
            <StatusPill label={e.status} kind={statusKind(e.status)} />
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">{e.baseLocation}</span>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <KV k="Hire date" v={e.hireDate} />
          <KV k="Tenure"     v={tenureLabel(e.hireDate)} />
          <KV k="Hourly rate"v={`$${e.hourlyRate} / hr`} />
          {e.kind === "W2" && <KV k="Monthly salary" v={`$${e.monthlySalary.toLocaleString()}`} />}
          <KV k="Meal allowance" v={`$${e.mealAllowance} / day`} />
          <Section title="PTO & comp time">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Balance" value={`${e.ptoBalance}h`} />
              <Stat label="Accrued YTD" value={`${e.ptoAccrued}h`} />
              <Stat label="Comp time (调休)" value={`${e.compTime}h`} />
            </div>
          </Section>
          <Section title="Certifications">
            <div className="flex flex-wrap gap-2">
              {e.certs.length ? e.certs.map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-full bg-surface-mint text-surface-deep text-[12px] font-medium">{c}</span>
              )) : <span className="text-[12px] text-mute">None on file</span>}
            </div>
          </Section>
          <Section title="Training score">
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-bold tracking-[-0.02em]">{e.trainingScore}</span>
              <span className="text-[14px] text-mute">/100</span>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-divider pb-2 text-[14px]">
      <span className="text-mute font-medium uppercase text-[11px] tracking-[0.06em]">{k}</span>
      <span>{v}</span>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.08em] font-bold text-mute mb-2">{title}</div>
      {children}
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-fog rounded-md p-3">
      <div className="text-[11px] uppercase tracking-[0.06em] text-mute font-medium">{label}</div>
      <div className="text-[18px] font-bold mt-1">{value}</div>
    </div>
  );
}
function tenureLabel(iso: string) {
  const start = new Date(iso).getTime();
  const months = (Date.now() - start) / (1000 * 60 * 60 * 24 * 30.4);
  if (months < 12) return `${Math.round(months)} months`;
  const yrs = Math.floor(months / 12);
  const rem = Math.round(months - yrs * 12);
  return rem ? `${yrs}y ${rem}m` : `${yrs}y`;
}

import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { StatusPill } from "@/components/blocks/StatusPill";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { SpringIn } from "@/components/ai/SpringIn";
import { projectById, clientById } from "@/data/projects";
import { employeeById } from "@/data/employees";
import { invoices } from "@/data/activity";
import { ArrowLeft } from "lucide-react";

export function DirectorProjectDetail({ id }: { id: string }) {
  const { go } = useApp();
  const p = projectById(id);
  if (!p) return <div className="p-8 text-mute">Project not found.</div>;
  const c = clientById(p.clientId);
  const pm = employeeById(p.pmId);
  const projInvoices = invoices.filter((i) => i.projectId === p.id);

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: p.name, chip: p.location }} />

      <SpringIn>
        <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-4 flex items-start justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage">{p.id} · {c?.name}</div>
            <div className="text-[24px] font-bold tracking-[-0.01em] mt-1">{p.name}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <StatusPill label={p.status} kind={p.status === "In Progress" ? "active" : "ok"} />
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">PM · {pm?.name}</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">{p.startDate} → {p.endDate}</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">Team of {p.teamIds.length}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-ink-inverse/65">Progress</div>
            <div className="text-[40px] font-bold tracking-[-0.02em] leading-none text-surface-sage">{p.progress}%</div>
            <PillButton variant="mint" size="sm" className="mt-2" onClick={() => go({ kind: "director", page: "projects" })}>
              <ArrowLeft size={14} /> Back
            </PillButton>
          </div>
        </section>
      </SpringIn>

      <div className="grid grid-cols-3 gap-3">
        <Tile label="Total budget" value={`$${(p.budget / 1000).toFixed(0)}k`} />
        <Tile label="Spent" value={`$${(p.spent / 1000).toFixed(0)}k`} sub={`${Math.round((p.spent / p.budget) * 100)}% burned`} />
        <Tile label="Remaining" value={`$${((p.budget - p.spent) / 1000).toFixed(0)}k`} sub={"runway to " + p.endDate} />
      </div>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Lifecycle spend by category
          </span>
        </header>
        <div className="p-5 grid grid-cols-2 gap-4">
          {Object.entries(p.spendByCategory).map(([k, v]) => {
            const pct = Math.round((v / p.spent) * 100) || 0;
            return (
              <div key={k}>
                <div className="flex items-baseline justify-between mb-1">
                  <div className="text-[13px] capitalize">{k === "invoices" ? "Reimbursable" : k}</div>
                  <div className="text-[12px] text-mute">${(v / 1000).toFixed(0)}k · {pct}%</div>
                </div>
                <div className="h-2 rounded-md bg-surface-fog overflow-hidden">
                  <div className={"h-full " + (k === "labor" ? "bg-surface-deep" : k === "equipment" ? "bg-accent-green" : k === "travel" ? "bg-surface-sage" : "bg-valley-blue")} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Quarterly spend
          </span>
        </header>
        <div className="p-5 flex items-end gap-3 h-[160px]">
          {p.spendByQuarter.map((q) => {
            const max = Math.max(...p.spendByQuarter.map((x) => x.amount));
            const h = Math.round((q.amount / max) * 100);
            return (
              <div key={q.quarter} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-[11px] font-bold">${(q.amount / 1000).toFixed(0)}k</div>
                <div className="w-full bg-surface-deep rounded-t-md" style={{ height: `${h}%` }} />
                <div className="text-[11px] text-mute uppercase tracking-[0.06em]">{q.quarter}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Invoice ledger
          </span>
        </header>
        <div className="grid grid-cols-[100px_2fr_1.2fr_140px_120px_140px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5">ID</div>
          <div className="px-4 py-2.5">Vendor</div>
          <div className="px-4 py-2.5">Category</div>
          <div className="px-4 py-2.5">Date</div>
          <div className="px-4 py-2.5">Amount</div>
          <div className="px-4 py-2.5">Status</div>
        </div>
        {projInvoices.map((i) => (
          <div key={i.id} className="grid grid-cols-[100px_2fr_1.2fr_140px_120px_140px] border-t border-divider items-center text-[13px]">
            <div className="px-4 py-3 font-mono text-mute">{i.id}</div>
            <div className="px-4 py-3 font-medium">{i.vendor}</div>
            <div className="px-4 py-3 text-mute">{i.category}</div>
            <div className="px-4 py-3 text-mute">{i.date}</div>
            <div className="px-4 py-3 font-bold">${i.amount.toLocaleString()}</div>
            <div className="px-4 py-3"><StatusPill label={i.status} kind={i.status === "Approved" ? "ok" : i.status === "Disputed" ? "critical" : "warn"} /></div>
          </div>
        ))}
      </section>
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-md bg-white border border-divider px-4 py-3 h-[92px] flex flex-col justify-between">
      <div className="text-[12px] tracking-[0.08em] uppercase font-medium text-mute">{label}</div>
      <div>
        <div className="text-[24px] font-bold tracking-[-0.02em]">{value}</div>
        {sub && <div className="text-[11px] text-mute mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

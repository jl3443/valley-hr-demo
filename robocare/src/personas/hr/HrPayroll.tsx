import * as React from "react";
import { TopRow } from "@/components/blocks/TopRow";
import { PillButton } from "@/components/blocks/PillButton";
import { StatusPill } from "@/components/blocks/StatusPill";
import { AIDot } from "@/components/ai/AIDot";
import { employees } from "@/data/employees";
import { attendance } from "@/data/activity";
import { Download, FileSpreadsheet, FileText, AlertCircle } from "lucide-react";

export function HrPayroll() {
  const [period, setPeriod] = React.useState("2025-05");

  // Roll up attendance × employee rate for the period (mock: full month).
  const rows = employees.map((e) => {
    const empAtt = attendance.filter((a) => a.employeeId === e.id);
    const regular = empAtt.reduce((s, a) => s + a.regularHours, 0);
    const ot = empAtt.reduce((s, a) => s + a.otHours, 0);
    const meals = empAtt.filter((a) => a.meal).length;
    const base = e.kind === "W2" ? e.monthlySalary : (regular + ot * 1.5) * e.hourlyRate;
    const mealUsd = meals * e.mealAllowance;
    return { e, regular, ot, meals, base, mealUsd, total: base + mealUsd };
  });

  const totalPayroll = rows.reduce((s, r) => s + r.total, 0);

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Payroll export", chip: "ADP-ready" }} />

      <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage">Period</div>
          <div className="flex items-center gap-3 mt-1">
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="bg-white/10 text-ink-inverse rounded-md px-3 py-1.5 text-[14px] outline-none">
              <option value="2025-05">May 2025</option>
              <option value="2025-04">April 2025</option>
              <option value="2025-03">March 2025</option>
            </select>
            <span className="text-[14px] text-ink-inverse/75">
              {rows.length} employees · ${totalPayroll.toLocaleString(undefined, { maximumFractionDigits: 0 })} gross
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PillButton variant="mint" size="sm"><FileSpreadsheet size={14} /> Download CSV</PillButton>
          <PillButton variant="mint" size="sm"><Download size={14} /> Download XLSX</PillButton>
        </div>
      </section>

      <div className="bg-surface-rose border border-mark-red/30 rounded-md px-4 py-3 flex items-start gap-3">
        <AlertCircle size={16} className="text-mark-red mt-0.5" />
        <div className="text-[13px] text-mark-red">
          <strong>Important:</strong> this export is for <strong>manual entry into ADP</strong>. PTO / OT / comp-time
          rules apply to <strong>both W2 employees and 1099 contractors</strong> — ADP only handles W2, so this
          system acts as the service layer for 1099 benefits.
        </div>
      </div>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Payroll preview · {period}
          </span>
          <FileText size={14} className="text-mute ml-auto" />
        </header>
        <div className="grid grid-cols-[80px_2fr_70px_90px_90px_90px_110px_110px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-3 py-2.5">ID</div>
          <div className="px-3 py-2.5">Name</div>
          <div className="px-3 py-2.5">Class</div>
          <div className="px-3 py-2.5">Reg. h</div>
          <div className="px-3 py-2.5">OT h</div>
          <div className="px-3 py-2.5">Meals</div>
          <div className="px-3 py-2.5">Base $</div>
          <div className="px-3 py-2.5">Total $</div>
        </div>
        {rows.map((r) => (
          <div key={r.e.id} className="grid grid-cols-[80px_2fr_70px_90px_90px_90px_110px_110px] border-t border-divider items-center text-[13px] hover:bg-surface-mint/40">
            <div className="px-3 py-2.5 font-mono text-mute">{r.e.id}</div>
            <div className="px-3 py-2.5 font-medium">{r.e.name}</div>
            <div className="px-3 py-2.5"><StatusPill label={r.e.kind} kind={r.e.kind === "W2" ? "ready" : "warn"} /></div>
            <div className="px-3 py-2.5">{r.regular}</div>
            <div className="px-3 py-2.5 font-bold">{r.ot}</div>
            <div className="px-3 py-2.5">{r.meals}</div>
            <div className="px-3 py-2.5">${r.base.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="px-3 py-2.5 font-bold">${r.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

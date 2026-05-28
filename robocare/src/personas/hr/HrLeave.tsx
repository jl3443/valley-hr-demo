import { TopRow } from "@/components/blocks/TopRow";
import { StatusPill } from "@/components/blocks/StatusPill";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";
import { employeeById } from "@/data/employees";
import { leaveRequests } from "@/data/activity";
import { Check, X } from "lucide-react";

export function HrLeave() {
  const pending = leaveRequests.filter((l) => l.status === "Pending");
  const decided = leaveRequests.filter((l) => l.status !== "Pending");
  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Leave & PTO", chip: "approvals" }} />

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AIDot size={6} tone="deep" pulse />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Pending approvals
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-sage text-surface-deep text-[11px] font-semibold">
            {pending.length} awaiting action
          </span>
        </header>
        <StaggerList step={50}>
          {pending.map((l) => {
            const emp = employeeById(l.employeeId);
            const balanceAfter = (emp?.ptoBalance ?? 0) - (l.type === "PTO" ? l.hours : 0);
            return (
              <div key={l.id} className="px-5 py-4 border-b border-divider last:border-b-0 flex items-center justify-between gap-4 hover:bg-surface-mint/40">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-surface-mint flex items-center justify-center text-surface-deep font-bold text-[13px]">
                    {emp?.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[12px] text-mute">
                      <span className="font-mono">{l.id}</span>
                      <span>·</span>
                      <span>{emp?.role}</span>
                      <span>·</span>
                      <span>{emp?.kind}</span>
                    </div>
                    <div className="text-[15px] font-bold mt-0.5">
                      {emp?.name} · {l.type} · {l.hours}h
                    </div>
                    <div className="text-[12px] text-mute mt-0.5">
                      {l.startDate} → {l.endDate} · {l.reason}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right leading-tight">
                    <div className="text-[11px] uppercase tracking-[0.06em] text-mute font-medium">PTO balance after</div>
                    <div className={"text-[14px] font-bold " + (balanceAfter < 0 ? "text-mark-red" : "text-ink")}>
                      {balanceAfter}h
                    </div>
                  </div>
                  <PillButton variant="secondary" size="sm"><X size={14} /> Reject</PillButton>
                  <PillButton variant="primary" size="sm"><Check size={14} /> Approve</PillButton>
                </div>
              </div>
            );
          })}
        </StaggerList>
      </section>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Recent decisions
          </span>
        </header>
        <div className="grid grid-cols-[100px_1.8fr_1fr_120px_140px_140px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5">ID</div>
          <div className="px-4 py-2.5">Employee</div>
          <div className="px-4 py-2.5">Type</div>
          <div className="px-4 py-2.5">Hours</div>
          <div className="px-4 py-2.5">Date range</div>
          <div className="px-4 py-2.5">Status</div>
        </div>
        {decided.map((l) => {
          const emp = employeeById(l.employeeId);
          return (
            <div key={l.id} className="grid grid-cols-[100px_1.8fr_1fr_120px_140px_140px] border-t border-divider items-center text-[13px]">
              <div className="px-4 py-3 font-mono text-mute">{l.id}</div>
              <div className="px-4 py-3 font-medium">{emp?.name}</div>
              <div className="px-4 py-3">{l.type}</div>
              <div className="px-4 py-3 font-bold">{l.hours}h</div>
              <div className="px-4 py-3 text-mute">{l.startDate} → {l.endDate}</div>
              <div className="px-4 py-3"><StatusPill label={l.status} kind={l.status === "Approved" ? "ok" : l.status === "Rejected" ? "alert" : "neutral"} /></div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

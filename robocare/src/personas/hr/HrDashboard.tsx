import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { KPIStrip, type KPI } from "@/components/blocks/KPIStrip";
import { PillButton } from "@/components/blocks/PillButton";
import { StatusPill } from "@/components/blocks/StatusPill";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";
import { employees, workforceStats } from "@/data/employees";
import { leaveRequests } from "@/data/activity";
import { GraduationCap, ArrowRight } from "lucide-react";

const sparks = {
  hc: [27, 27, 28, 28, 29, 29, 30, 30],
  pto: [88, 92, 95, 98, 102, 108, 112, 114],
  pending: [1, 2, 2, 3, 3, 4, 4, 5],
  training: [82, 83, 85, 85, 86, 87, 87, 88],
};

export function HrDashboard() {
  const { go } = useApp();
  const pendingLeave = leaveRequests.filter((l) => l.status === "Pending").length;
  const kpis: KPI[] = [
    { label: "Headcount",        value: workforceStats.total,      trend: { delta: "2",  direction: "up" }, spark: sparks.hc },
    { label: "Pending leave",    value: pendingLeave,                trend: { delta: "1", direction: "up" }, spark: sparks.pending, highlight: "yellow" },
    { label: "Avg PTO balance",  value: workforceStats.avgPto,     suffix: "h", trend: { delta: "6", direction: "up" }, spark: sparks.pto },
    { label: "Training score",   value: workforceStats.avgTraining, suffix: "/100", trend: { delta: "1.6", direction: "up" }, spark: sparks.training },
  ];

  const recentLeave = leaveRequests
    .filter((l) => l.status === "Pending")
    .slice(0, 4);

  const topTraining = [...employees].sort((a, b) => b.trainingScore - a.trainingScore).slice(0, 5);

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "HR dashboard", chip: "人事" }} />

      <HeroBanner
        eyebrow="AI-powered HR operations"
        summary={`${pendingLeave} leave requests awaiting your approval · 18 employees on active projects today · 1 employee currently on leave.`}
        cta={
          <PillButton variant="mint" size="sm" onClick={() => go({ kind: "hr", page: "leave" })}>
            Review approvals
          </PillButton>
        }
        meta="Updated 2 min ago"
      />

      <KPIStrip items={kpis} />

      <div className="grid grid-cols-[1.5fr_1fr] gap-3">
        <section className="bg-white border border-divider rounded-md overflow-hidden">
          <header className="px-4 py-2.5 border-b border-divider flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AIDot size={6} tone="deep" />
              <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
                Workforce composition
              </span>
            </div>
            <span className="text-[12px] text-mute">{workforceStats.w2} W2 · {workforceStats.c1099} 1099</span>
          </header>
          <div className="p-5 grid grid-cols-3 gap-4">
            <CompositionTile label="On project"  value={workforceStats.onProject} total={workforceStats.total} tone="bg-surface-deep" />
            <CompositionTile label="Available"   value={workforceStats.total - workforceStats.onProject - workforceStats.onLeave - workforceStats.bench} total={workforceStats.total} tone="bg-accent-green" />
            <CompositionTile label="On leave"    value={workforceStats.onLeave} total={workforceStats.total} tone="bg-surface-sage" />
            <CompositionTile label="Bench"       value={workforceStats.bench} total={workforceStats.total} tone="bg-mark-red" />
            <CompositionTile label="W2 employees"value={workforceStats.w2} total={workforceStats.total} tone="bg-surface-deep" />
            <CompositionTile label="1099 contractors" value={workforceStats.c1099} total={workforceStats.total} tone="bg-valley-yellow" />
          </div>
        </section>

        <section className="bg-white border border-divider rounded-md overflow-hidden">
          <header className="px-4 py-2.5 border-b border-divider flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AIDot size={6} tone="deep" pulse />
              <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
                Pending leave requests
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-sage text-surface-deep text-[11px] font-semibold">
              {pendingLeave} pending
            </span>
          </header>
          <StaggerList step={60}>
            {recentLeave.map((l) => {
              const emp = employees.find((e) => e.id === l.employeeId);
              return (
                <button
                  key={l.id}
                  onClick={() => go({ kind: "hr", page: "leave" })}
                  className="ui-pill w-full px-4 py-3 border-b border-divider last:border-b-0 flex items-center justify-between text-left hover:bg-surface-mint/40"
                >
                  <div>
                    <div className="text-[13px] font-medium">{emp?.name}</div>
                    <div className="text-[12px] text-mute">{l.type} · {l.hours}h · {l.startDate.slice(5)} → {l.endDate.slice(5)}</div>
                  </div>
                  <StatusPill label={l.type} kind={l.type === "PTO" ? "active" : l.type === "Sick" ? "warn" : "neutral"} />
                </button>
              );
            })}
          </StaggerList>
          <button
            onClick={() => go({ kind: "hr", page: "leave" })}
            className="ui-pill w-full px-4 py-2.5 flex items-center justify-between text-[13px] text-surface-deep font-medium hover:bg-surface-mint/40"
          >
            <span>View all requests</span> <ArrowRight size={14} />
          </button>
        </section>
      </div>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Training scoreboard · top performers
            </span>
          </div>
          <GraduationCap size={14} className="text-surface-deep" />
        </header>
        <div className="grid grid-cols-[60px_2.5fr_1.2fr_1.2fr_120px_120px] bg-surface-deep text-ink-inverse text-[11px] uppercase tracking-[0.08em] font-medium">
          <div className="px-4 py-2.5">Rank</div>
          <div className="px-4 py-2.5">Employee</div>
          <div className="px-4 py-2.5">Role</div>
          <div className="px-4 py-2.5">Department</div>
          <div className="px-4 py-2.5">Class</div>
          <div className="px-4 py-2.5">Score</div>
        </div>
        {topTraining.map((e, i) => (
          <div key={e.id} className="grid grid-cols-[60px_2.5fr_1.2fr_1.2fr_120px_120px] border-t border-divider items-center text-[13px] hover:bg-surface-mint/40">
            <div className="px-4 py-3 font-bold text-surface-deep">#{i + 1}</div>
            <div className="px-4 py-3 font-medium">{e.name}</div>
            <div className="px-4 py-3 text-mute">{e.role}</div>
            <div className="px-4 py-3 text-mute">{e.department}</div>
            <div className="px-4 py-3"><StatusPill label={e.kind} kind={e.kind === "W2" ? "ready" : "warn"} /></div>
            <div className="px-4 py-3 font-bold">{e.trainingScore}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

function CompositionTile({ label, value, total, tone }: { label: string; value: number; total: number; tone: string }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="border border-divider rounded-md p-4">
      <div className="text-[11px] uppercase tracking-[0.08em] text-mute font-medium">{label}</div>
      <div className="text-[28px] font-bold tracking-[-0.02em] mt-1">{value}</div>
      <div className="text-[12px] text-mute mt-0.5">{pct}% of total</div>
      <div className="mt-2 h-1.5 rounded-full bg-surface-fog overflow-hidden">
        <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

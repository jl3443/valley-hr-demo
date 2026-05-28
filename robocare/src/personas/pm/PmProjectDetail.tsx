import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { StatusPill } from "@/components/blocks/StatusPill";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { SpringIn } from "@/components/ai/SpringIn";
import { projectById, clientById } from "@/data/projects";
import { employeeById } from "@/data/employees";
import { dailyReports, attendance } from "@/data/activity";
import { ArrowLeft } from "lucide-react";

export function PmProjectDetail({ id }: { id: string }) {
  const { go } = useApp();
  const p = projectById(id);
  if (!p) return <div className="p-8 text-mute">Project not found.</div>;
  const c = clientById(p.clientId);
  const team = p.teamIds.map((id) => employeeById(id)!).filter(Boolean);
  const todayReport = dailyReports.find((r) => r.projectId === p.id && r.date === "2025-05-27");
  const todayAttendees = attendance.filter((a) => a.projectId === p.id && a.date === "2025-05-27").length;

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: p.name, chip: p.location }} />

      <SpringIn>
        <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-4 flex items-start justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage">{p.id} · {c?.name}</div>
            <div className="text-[24px] font-bold mt-1">{p.name}</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              <StatusPill label={p.status} kind="active" />
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">{p.startDate} → {p.endDate}</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">{p.progress}% complete</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-[12px] font-medium">Team of {team.length}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <PillButton variant="mint" size="sm" onClick={() => go({ kind: "pm", page: "attendance" })}>Enter attendance</PillButton>
            <PillButton variant="secondary" size="sm" onClick={() => go({ kind: "pm", page: "dashboard" })}><ArrowLeft size={14} /> Back</PillButton>
          </div>
        </section>
      </SpringIn>

      <div className="grid grid-cols-[1.4fr_1fr] gap-3">
        <section className="bg-white border border-divider rounded-md overflow-hidden">
          <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">Today's daily report</span>
            <span className="text-[12px] text-mute">{todayAttendees} on-site</span>
          </header>
          {todayReport ? (
            <div className="p-5 grid grid-cols-3 gap-4">
              <Column tone="bg-surface-sage text-surface-deep" title="In Progress" items={todayReport.inProgress} />
              <Column tone="bg-accent-green text-white" title="Completed" items={todayReport.completed} />
              <Column tone="bg-surface-deep text-white" title="Future plans" items={todayReport.futurePlans} />
            </div>
          ) : (
            <div className="p-5 text-[14px] text-mute">No daily report yet — head to Daily report to draft one.</div>
          )}
          {todayReport?.risks && (
            <div className="px-5 pb-5">
              <div className="bg-surface-rose border border-mark-red/30 rounded-md px-4 py-3 text-[13px] text-mark-red">
                <strong>Risk:</strong> {todayReport.risks}
              </div>
            </div>
          )}
        </section>

        <section className="bg-white border border-divider rounded-md overflow-hidden">
          <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">Team on this project</span>
          </header>
          <div className="p-3 space-y-1">
            {team.map((e) => (
              <div key={e.id} className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-surface-mint/40 text-[13px]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-mint text-surface-deep flex items-center justify-center text-[12px] font-bold shrink-0">
                    {e.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{e.name}</div>
                    <div className="text-[12px] text-mute truncate">{e.role}</div>
                  </div>
                </div>
                <StatusPill label={e.kind} kind={e.kind === "W2" ? "ready" : "warn"} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Column({ title, tone, items }: { title: string; tone: string; items: string[] }) {
  return (
    <div>
      <div className={"px-3 py-1.5 rounded-t-md text-[11px] uppercase tracking-[0.08em] font-bold " + tone}>{title}</div>
      <ul className="px-3 py-2 space-y-2 border border-divider rounded-b-md">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px]">
            <span className="w-1.5 h-1.5 rounded-full bg-surface-deep mt-2 shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

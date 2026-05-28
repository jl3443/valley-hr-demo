import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { KPIStrip, type KPI } from "@/components/blocks/KPIStrip";
import { PillButton } from "@/components/blocks/PillButton";
import { StatusPill } from "@/components/blocks/StatusPill";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";
import { projects, clientById } from "@/data/projects";
import { attendance, dailyReports } from "@/data/activity";
import { ArrowRight } from "lucide-react";

export function PmDashboard() {
  const { go } = useApp();
  // Persona-as-PM Wang Lei (EMP-001) — show only his projects.
  const myProjects = projects.filter((p) => p.pmId === "EMP-001");
  const todayAttCount = attendance.filter((a) => a.enteredBy === "EMP-001" && a.date === "2025-05-27").length;
  const todayReports = dailyReports.filter((r) => r.authorId === "EMP-001" && r.date === "2025-05-27").length;

  const kpis: KPI[] = [
    { label: "My projects",       value: myProjects.length,         trend: { delta: "0", direction: "flat" }, spark: [3, 3, 3, 3, 3, 3, 3, 3] },
    { label: "Today's attendance",value: todayAttCount,             highlight: "yellow", trend: { delta: "8", direction: "up" }, spark: [4, 6, 7, 8, 8, 8, 8, 8] },
    { label: "Open invoices",     value: 5,                          trend: { delta: "2", direction: "up" }, spark: [1, 2, 2, 3, 3, 4, 4, 5] },
    { label: "Daily report due",  value: 2,                          trend: { delta: "0", direction: "flat" }, spark: [2, 2, 2, 2, 2, 2, 2, 2] },
  ];

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "PM dashboard", chip: "Wang Lei · Senior PM" }} />

      <HeroBanner
        eyebrow="AI-assisted PM operations"
        summary={`${todayAttCount} employees logged on-site today across ${myProjects.length} projects · ${todayReports} daily reports submitted · 2 invoices awaiting OCR review.`}
        cta={
          <PillButton variant="mint" size="sm" onClick={() => go({ kind: "pm", page: "attendance" })}>
            Enter today's attendance
          </PillButton>
        }
        meta="Updated just now"
      />

      <KPIStrip items={kpis} />

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            My projects
          </span>
          <span className="text-[12px] text-mute">Tap to open workspace</span>
        </header>
        <StaggerList step={70}>
          {myProjects.map((p) => {
            const c = clientById(p.clientId);
            const burn = Math.round((p.spent / p.budget) * 100);
            const onBudget = burn <= p.progress + 10;
            return (
              <button
                key={p.id}
                onClick={() => go({ kind: "pm", page: "project", id: p.id })}
                className="ui-pill w-full px-4 py-4 border-b border-divider last:border-b-0 flex items-center justify-between text-left hover:bg-surface-mint/40"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-surface-fog flex items-center justify-center text-[18px] shrink-0">
                    {c?.flag}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[12px] text-mute">
                      <span className="font-mono">{p.id}</span>
                      <span>·</span>
                      <span>{c?.name}</span>
                      <span>·</span>
                      <span>{p.location}</span>
                    </div>
                    <div className="text-[15px] font-bold mt-0.5">{p.name}</div>
                    <div className="text-[12px] text-mute mt-0.5">
                      {p.startDate} → {p.endDate} · team of {p.teamIds.length}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-[0.06em] text-mute font-medium">Progress</div>
                    <div className="text-[14px] font-bold">{p.progress}%</div>
                    <div className="w-[120px] mt-1 h-1.5 rounded-full bg-surface-fog">
                      <div className="h-full rounded-full bg-surface-deep" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-[0.06em] text-mute font-medium">Spend</div>
                    <div className={"text-[14px] font-bold " + (onBudget ? "text-ink" : "text-mark-red")}>
                      ${(p.spent / 1000).toFixed(0)}k / ${(p.budget / 1000).toFixed(0)}k
                    </div>
                    <div className="text-[11px] text-mute">{burn}% burned</div>
                  </div>
                  <StatusPill label={p.status} kind={p.status === "In Progress" ? "active" : p.status === "Completed" ? "ok" : "neutral"} />
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
            This week · checklist
          </span>
        </header>
        <div className="grid grid-cols-3 divide-x divide-divider">
          <ChecklistCol
            tone="bg-surface-sage text-surface-deep"
            title="In Progress"
            items={[
              "Atlas Newark · AGV cell 2 alignment (3-day)",
              "Atlas Edison · charging dock survey",
              "Coordinate Atlas WMS handshake test",
            ]}
          />
          <ChecklistCol
            tone="bg-accent-green text-white"
            title="Completed"
            items={[
              "Floor magnetic strip · Atlas zone A",
              "Fleet manager server stand-up",
              "OSHA 30 toolbox talk · all on-site staff",
            ]}
          />
          <ChecklistCol
            tone="bg-surface-deep text-white"
            title="Future plans"
            items={[
              "Tue: WMS integration handshake test",
              "Wed-Thu: live load dry run",
              "Fri: Atlas client SAT walk-through",
            ]}
          />
        </div>
      </section>
    </div>
  );
}

function ChecklistCol({ title, tone, items }: { title: string; tone: string; items: string[] }) {
  return (
    <div>
      <div className={"px-4 py-2 text-[11px] uppercase tracking-[0.08em] font-bold " + tone}>{title}</div>
      <ul className="p-4 space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-[13px] text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-surface-deep mt-2 shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

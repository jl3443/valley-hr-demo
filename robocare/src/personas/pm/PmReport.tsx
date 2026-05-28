import * as React from "react";
import { TopRow } from "@/components/blocks/TopRow";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { dailyReports } from "@/data/activity";
import { projects, clientById } from "@/data/projects";
import { Plus, X, Send } from "lucide-react";

export function PmReport() {
  const myProjects = projects.filter((p) => p.pmId === "EMP-001" && p.status === "In Progress");
  const [projectId, setProjectId] = React.useState(myProjects[0]?.id ?? "");
  const today = dailyReports.find((r) => r.projectId === projectId && r.date === "2025-05-27");
  const [inProgress, setInProgress] = React.useState<string[]>(today?.inProgress ?? [""]);
  const [completed,  setCompleted]  = React.useState<string[]>(today?.completed  ?? [""]);
  const [future,     setFuture]     = React.useState<string[]>(today?.futurePlans?? [""]);
  const [risks,      setRisks]      = React.useState(today?.risks ?? "");

  React.useEffect(() => {
    const r = dailyReports.find((r) => r.projectId === projectId && r.date === "2025-05-27");
    setInProgress(r?.inProgress ?? [""]);
    setCompleted(r?.completed ?? [""]);
    setFuture(r?.futurePlans ?? [""]);
    setRisks(r?.risks ?? "");
  }, [projectId]);

  const project = myProjects.find((p) => p.id === projectId)!;
  const client = clientById(project.clientId);

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Daily report", chip: today ? "draft saved" : "new entry" }} />

      <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[18px]">{client?.flag}</div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage">Daily report · 2025-05-27</div>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="bg-white/10 text-ink-inverse rounded-md px-3 py-1.5 text-[16px] font-bold mt-1 outline-none">
              {myProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>
        <PillButton variant="mint" size="sm"><Send size={14} /> Submit daily report</PillButton>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <Column title="In Progress" tone="bg-surface-sage text-surface-deep" items={inProgress} setItems={setInProgress} />
        <Column title="Completed"   tone="bg-accent-green text-white"        items={completed}  setItems={setCompleted} />
        <Column title="Future plans"tone="bg-surface-deep text-white"        items={future}     setItems={setFuture} />
      </div>

      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
          <AIDot size={6} tone="deep" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">Risks & blockers</span>
        </header>
        <div className="p-5">
          <textarea
            value={risks}
            onChange={(e) => setRisks(e.target.value)}
            rows={3}
            placeholder="Anything that could slow the project? Vendor delays, missing approvals, weather..."
            className="w-full px-3 py-2 bg-surface-fog rounded-md text-[14px] outline-none focus:bg-white focus:ring-2 focus:ring-surface-deep"
          />
        </div>
      </section>
    </div>
  );
}

function Column({
  title,
  tone,
  items,
  setItems,
}: {
  title: string;
  tone: string;
  items: string[];
  setItems: (n: string[]) => void;
}) {
  return (
    <section className="bg-white border border-divider rounded-md overflow-hidden">
      <header className={"px-4 py-2 text-[11px] uppercase tracking-[0.08em] font-bold " + tone}>
        {title}
      </header>
      <ul className="p-4 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-surface-deep mt-2.5 shrink-0" />
            <input
              value={it}
              onChange={(e) => setItems(items.map((x, j) => (j === i ? e.target.value : x)))}
              placeholder="Add an entry…"
              className="flex-1 px-2 py-1 bg-surface-fog rounded text-[13px] outline-none focus:bg-white focus:ring-2 focus:ring-surface-deep"
            />
            <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="text-mute hover:text-mark-red">
              <X size={14} />
            </button>
          </li>
        ))}
        <button onClick={() => setItems([...items, ""])} className="flex items-center gap-1 text-[12px] text-surface-deep font-bold mt-1">
          <Plus size={14} /> Add row
        </button>
      </ul>
    </section>
  );
}

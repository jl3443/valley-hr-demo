import { cn } from "@/lib/utils";
import { useApp, type View } from "@/state";
import { LayoutDashboard, Folder, FilePlus, ClipboardList, ShieldCheck } from "lucide-react";

const items: { label: string; icon: typeof LayoutDashboard; view: View }[] = [
  { label: "Dashboard", icon: LayoutDashboard, view: { kind: "dashboard" } },
  { label: "Cases", icon: Folder, view: { kind: "cases" } },
  { label: "New intake", icon: FilePlus, view: { kind: "intake" } },
  { label: "Tasks", icon: ClipboardList, view: { kind: "tasks" } },
];

export function Sidebar() {
  const { view, go } = useApp();
  return (
    <aside className="flex flex-col w-[240px] shrink-0 h-screen bg-white border-r border-[color:var(--divider)] sticky top-0">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[color:var(--accent-green-deep)] flex items-center justify-center">
            <ShieldCheck className="text-white w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[14px] font-bold">KYC concierge</div>
            <div className="text-[11px] text-[color:var(--mute)]">Agentic KYC for compliance</div>
          </div>
        </div>
      </div>

      <div className="px-3 mt-2 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[color:var(--mute)] px-3 mb-2">
          Workspace
        </div>
        <nav className="space-y-0.5">
          {items.map((it) => {
            const Icon = it.icon;
            const active =
              view.kind === it.view.kind ||
              (it.view.kind === "cases" && view.kind === "case");
            return (
              <button
                key={it.label}
                onClick={() => go(it.view)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-bold transition-colors",
                  active
                    ? "bg-[color:var(--surface-mint)] text-[color:var(--accent-green-deep)]"
                    : "text-[color:var(--ink)] hover:bg-[color:var(--surface-fog)]",
                )}
              >
                <Icon size={16} strokeWidth={2} />
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[color:var(--divider)] text-[11px] text-[color:var(--mute)]">
        <div className="font-bold text-[color:var(--ink)]">Demo build</div>
        Backend: <code>localhost:8000</code>
      </div>
    </aside>
  );
}

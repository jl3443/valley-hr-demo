import { cn } from "@/lib/utils";
import { useApp, type View, type Persona } from "@/state";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Receipt,
  GraduationCap,
  FolderKanban,
  ClipboardList,
  FileText,
  LineChart,
  Building2,
  LogOut,
  Sparkles,
} from "lucide-react";

type NavItem = { label: string; icon: typeof Users; view: View };
type Section = { title: string; items: NavItem[] };

const navByPersona: Record<Persona, { brand: string; cn: string; sections: Section[] }> = {
  hr: {
    brand: "HR workspace",
    cn: "人事管理",
    sections: [
      { title: "Overview",   items: [
        { label: "Dashboard",       icon: LayoutDashboard, view: { kind: "hr", page: "dashboard" } },
      ]},
      { title: "People",     items: [
        { label: "Employees",       icon: Users,           view: { kind: "hr", page: "employees" } },
        { label: "Leave & PTO",     icon: CalendarCheck,   view: { kind: "hr", page: "leave" } },
        { label: "Training",        icon: GraduationCap,   view: { kind: "hr", page: "training" } },
      ]},
      { title: "Payroll",    items: [
        { label: "Payroll export",  icon: Receipt,         view: { kind: "hr", page: "payroll" } },
      ]},
    ],
  },
  pm: {
    brand: "PM workspace",
    cn: "项目经理",
    sections: [
      { title: "Overview",   items: [
        { label: "Dashboard",        icon: LayoutDashboard,  view: { kind: "pm", page: "dashboard" } },
      ]},
      { title: "Today",      items: [
        { label: "Attendance",       icon: CalendarCheck,    view: { kind: "pm", page: "attendance" } },
        { label: "Invoices · OCR",   icon: Receipt,          view: { kind: "pm", page: "invoices" } },
        { label: "Daily report",     icon: ClipboardList,    view: { kind: "pm", page: "report" } },
      ]},
    ],
  },
  director: {
    brand: "Director console",
    cn: "总监 · 只读",
    sections: [
      { title: "Overview",   items: [
        { label: "Dashboard",         icon: LayoutDashboard, view: { kind: "director", page: "dashboard" } },
      ]},
      { title: "Portfolio",  items: [
        { label: "Projects",          icon: FolderKanban,    view: { kind: "director", page: "projects" } },
        { label: "Finance",           icon: LineChart,       view: { kind: "director", page: "finance" } },
      ]},
    ],
  },
};

export function Sidebar() {
  const { view, persona, go, exit } = useApp();
  if (!persona) return null;
  const cfg = navByPersona[persona];
  const activeKind = view.kind === persona ? view.page : null;

  return (
    <aside className="flex flex-col w-[240px] shrink-0 h-screen bg-white border-r border-divider sticky top-0">
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-surface-deep flex items-center justify-center">
            <Sparkles className="text-surface-sage w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[14px] font-bold text-ink">{cfg.brand}</div>
            <div className="text-[12px] text-mute">{cfg.cn}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto pt-3">
        {cfg.sections.map((section) => (
          <div key={section.title} className="pb-3">
            <div className="px-5 pb-1 text-[11px] font-medium uppercase tracking-[0.06em] text-mute">
              {section.title}
            </div>
            <ul>
              {section.items.map((item) => {
                const isActive =
                  view.kind === persona && (item.view as Extract<View, { kind: typeof persona }>).page === activeKind;
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => go(item.view)}
                      className={cn(
                        "ui-pill w-full flex items-center gap-2.5 px-5 py-1.5 text-[13px] text-left",
                        "border-l-4 border-transparent",
                        isActive && "bg-surface-mint border-surface-deep text-surface-deep font-medium",
                        !isActive && "text-ink hover:bg-surface-mint/40",
                      )}
                    >
                      <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                      <span className="flex-1">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-divider">
        <button
          onClick={exit}
          className="ui-pill w-full px-5 py-3 flex items-center gap-2 text-[12px] text-mute hover:bg-surface-fog"
        >
          <LogOut size={14} /> Switch role
        </button>
        <div className="px-4 py-3 flex items-center gap-2.5 border-t border-divider">
          <div className="w-8 h-8 rounded-full bg-surface-sage flex items-center justify-center text-[11px] font-bold text-surface-deep">
            {persona === "hr" ? "HR" : persona === "pm" ? "PM" : "DR"}
          </div>
          <div className="leading-tight flex-1 min-w-0">
            <div className="text-[13px] text-ink truncate">
              {persona === "hr" ? "Priya Sharma" : persona === "pm" ? "Wang Lei" : "Sarah Mitchell"}
            </div>
            <div className="text-[11px] text-mute">
              {persona === "hr" ? "HR Generalist" : persona === "pm" ? "Senior PM" : "Director"}
            </div>
          </div>
          <Building2 size={14} className="text-mute" />
          <FileText size={14} className="text-mute hidden" />
        </div>
      </div>
    </aside>
  );
}

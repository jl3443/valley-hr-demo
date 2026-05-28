import { useApp } from "@/state";
import { SpringIn } from "@/components/ai/SpringIn";
import { Sparkles, Users, FolderKanban, LineChart, ArrowRight } from "lucide-react";

const personas = [
  {
    id: "hr" as const,
    label: "HR",
    cn: "人事管理",
    summary: "员工档案、PTO 累计、请假审批、培训记录、Payroll 导出。",
    icon: Users,
    accent: "bg-surface-sage text-surface-deep",
    kpi: "30 名员工 · 4 条待审请假",
  },
  {
    id: "pm" as const,
    label: "Project Manager",
    cn: "项目管理",
    summary: "考勤录入、发票上传 + OCR、日报、项目文件、周维度 Checklist。",
    icon: FolderKanban,
    accent: "bg-white text-surface-deep border border-divider",
    kpi: "6 个在执行项目 · 今日 16 名出勤",
  },
  {
    id: "director" as const,
    label: "Director",
    cn: "总监 · 只读",
    summary: "跨项目进度与成本、公司运营支出面板、按 Q 下钻到发票。",
    icon: LineChart,
    accent: "bg-surface-deep text-ink-inverse",
    kpi: "$1.6M YTD 支出 · 5 客户 · 6 项目",
  },
];

export function Landing() {
  const { enter } = useApp();
  return (
    <div className="min-h-screen flex flex-col bg-surface-deep text-ink-inverse">
      <header className="px-12 py-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-sage flex items-center justify-center">
            <Sparkles size={18} className="text-surface-deep" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold">Robocare Ops</div>
            <div className="text-[12px] text-ink-inverse/60">Unified project · finance · workforce console</div>
          </div>
        </div>
        <div className="text-[12px] text-ink-inverse/60 uppercase tracking-[0.1em]">
          Demo · select your role
        </div>
      </header>

      <SpringIn>
        <section className="flex-1 px-12 pt-16 pb-12 flex flex-col gap-10 items-center justify-center">
          <div className="text-center max-w-[920px]">
            <div className="text-[11px] tracking-[0.16em] uppercase text-surface-sage font-medium mb-3">
              Robocare · operations workspace
            </div>
            <h1 className="text-[48px] md:text-[64px] leading-[1.05] tracking-[-0.02em] font-display font-medium">
              One console for project, finance, and workforce.
            </h1>
            <p className="mt-4 text-[15px] text-ink-inverse/75 max-w-[720px] mx-auto leading-[24px]">
              Replaces the DingTalk Boss-管账 / Team Vision split. PMs enter attendance and upload invoices on-site,
              HR manages 1099 + W2 benefits in one layer, and Directors see live cost rollups by quarter.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 w-full max-w-[1140px]">
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => enter(p.id)}
                  className="ui-pill text-left bg-white text-ink rounded-md p-6 hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${p.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.12em] text-mute mb-1">{p.cn}</div>
                  <div className="text-[24px] font-bold tracking-[-0.01em]">{p.label}</div>
                  <p className="text-[13px] text-mute leading-[20px] mt-3 min-h-[60px]">{p.summary}</p>
                  <div className="mt-4 pt-4 border-t border-divider text-[12px] text-surface-deep font-medium">
                    {p.kpi}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-surface-deep">
                    Enter workspace <ArrowRight size={14} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </SpringIn>

      <footer className="px-12 py-5 text-[11px] text-ink-inverse/50 tracking-[0.08em] uppercase text-center border-t border-white/10">
        Robocare ops · confidential · pilot build
      </footer>
    </div>
  );
}

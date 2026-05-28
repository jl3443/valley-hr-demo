import { TopRow } from "@/components/blocks/TopRow";
import { PillButton } from "@/components/blocks/PillButton";
import { StatusPill } from "@/components/blocks/StatusPill";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";
import { invoices } from "@/data/activity";
import { projectById } from "@/data/projects";
import { Upload, FileText, Sparkles } from "lucide-react";

export function PmInvoices() {
  const myInvoices = invoices.filter((i) => i.uploader === "EMP-001");
  const pending = myInvoices.filter((i) => i.status === "OCR pending" || i.status === "Pending review");

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Invoices · OCR", chip: `${pending.length} in queue` }} />

      <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={28} className="text-surface-sage hr-pulse" />
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] font-medium text-surface-sage">Agentic OCR</div>
            <div className="text-[14px]">
              Drag a vendor receipt or invoice. Amount, vendor and date are auto-extracted with confidence score; click any
              row to review or correct.
            </div>
          </div>
        </div>
        <PillButton variant="mint" size="sm"><Upload size={14} /> Upload invoice</PillButton>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <section className="bg-white border border-divider rounded-md overflow-hidden">
          <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
            <AIDot size={6} tone="deep" pulse />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Awaiting review
            </span>
          </header>
          <StaggerList step={50}>
            {pending.map((i) => {
              const p = projectById(i.projectId);
              return (
                <div key={i.id} className="px-4 py-3 border-b border-divider last:border-b-0 flex items-center gap-3 hover:bg-surface-mint/40">
                  <div className="w-10 h-10 rounded-md bg-surface-fog flex items-center justify-center">
                    <FileText size={16} className="text-mute" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] text-mute font-mono">{i.id} · {p?.name}</div>
                    <div className="text-[14px] font-bold mt-0.5 truncate">{i.fileName}</div>
                    <div className="text-[12px] text-mute mt-0.5">{i.vendor} · {i.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[16px] font-bold">${i.amount.toLocaleString()}</div>
                    <div className="text-[11px] text-mute">OCR · {i.ocrConfidence}%</div>
                    <StatusPill label={i.status} kind={i.status === "OCR pending" ? "warn" : "active"} className="mt-1" />
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
              Recently approved
            </span>
          </header>
          <StaggerList step={50}>
            {myInvoices.filter((i) => i.status === "Approved").map((i) => {
              const p = projectById(i.projectId);
              return (
                <div key={i.id} className="px-4 py-3 border-b border-divider last:border-b-0 flex items-center justify-between hover:bg-surface-mint/40">
                  <div className="min-w-0">
                    <div className="text-[12px] text-mute font-mono">{i.id} · {p?.name}</div>
                    <div className="text-[14px] font-bold mt-0.5 truncate">{i.vendor}</div>
                    <div className="text-[12px] text-mute mt-0.5">{i.category} · {i.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[16px] font-bold">${i.amount.toLocaleString()}</div>
                    <StatusPill label={i.status} kind="ok" className="mt-1" />
                  </div>
                </div>
              );
            })}
          </StaggerList>
        </section>
      </div>
    </div>
  );
}

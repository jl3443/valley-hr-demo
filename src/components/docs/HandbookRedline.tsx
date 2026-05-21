import { DocChrome, Paper, SideRail } from "./DocChrome";
import { AIDot } from "@/components/ai/AIDot";

/**
 * Employee handbook redline — Section 6 (Recruitment & Pay Disclosure),
 * proposed update to comply with the NJ Wage Transparency Act.
 * Component name kept as `HandbookRedline` for back-compat.
 */
export function HandbookRedline() {
  return (
    <DocChrome
      title="Document · Employee handbook · NJ Wage Transparency · proposed update"
      secondary={{ label: "Reject" }}
      primary={{ label: "Accept all changes" }}
    >
      <Paper>
        <header className="space-y-1 pb-5 border-b border-divider">
          <div className="text-[11px] tracking-[0.08em] uppercase text-mute font-medium">
            Employee handbook · v2.4 → v2.5 proposed
          </div>
          <h1 className="text-[28px] font-bold tracking-[-0.01em]">Section 6. Recruitment & pay disclosure</h1>
          <p className="text-[13px] text-mute">
            New Jersey · applies to all employees in NJ-posted roles + NJ-eligible remote
          </p>
        </header>

        <section className="space-y-2">
          <h3 className="text-[15px] font-bold">6.1  Job postings · scope</h3>
          <p className="text-[14px] leading-[22px]">
            Every internal or external job posting for new employment or promotion in New Jersey shall
            include the disclosures defined in 6.2 in accordance with the NJ Wage Transparency Act
            (P.L. 2024, Ch. 91).
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-[15px] font-bold">6.2  Required pay disclosure</h3>
          <div className="bg-surface-fog rounded p-4 space-y-3">
            <p className="text-[14px] leading-[22px] text-mark-red line-through">
              Job postings should reference Valley's competitive compensation philosophy and refer
              candidates to a recruiter for salary information.
            </p>
            <div className="bg-surface-mint rounded px-4 py-3">
              <p className="text-[14px] leading-[22px] text-ink">
                Job postings shall include the hourly wage or salary range (lower bound and upper
                bound) and a general description of benefits and other compensation programs.
                Open-ended ranges are not permitted. Applies from June 1, 2025 in accordance with
                the NJ Wage Transparency Act.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AIDot size={6} tone="deep" />
              <span className="text-[12px] tracking-[0.04em] text-surface-deep">
                AI drafted change · reason: NJ Wage Transparency Act · effective Jun 1, 2025
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-[15px] font-bold">6.3  Promotion opportunities</h3>
          <p className="text-[14px] leading-[22px]">
            Promotion opportunities shall be made known to all current employees in the affected
            department(s) prior to making a promotion decision, with the same pay disclosure required
            by Section 6.2.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-[15px] font-bold">6.4  Cross-state postings</h3>
          <p className="text-[14px] leading-[22px]">
            Remote roles open to NJ residents are treated as NJ postings for the purposes of this
            policy. NY metro and other multi-state postings follow the disclosure rules of the most
            restrictive jurisdiction in scope (currently NJ for in-NJ candidates; NY State Pay
            Transparency for in-NY candidates).
          </p>
        </section>
      </Paper>

      <SideRail>
        <div className="bg-white border border-divider rounded-md p-5 space-y-3">
          <div className="text-[14px] font-bold text-ink">Changes in this update</div>
          {[
            { lbl: "6.2  Pay disclosure",     badge: "Major change",     bg: "bg-mark-red" },
            { lbl: "6.4  Cross-state postings", badge: "Cross-ref update", bg: "bg-surface-deep" },
            { lbl: "Sections 6.1, 6.3",       badge: "No change",        bg: "bg-mute" },
          ].map((r) => (
            <div key={r.lbl} className="flex items-center justify-between gap-3">
              <span className="text-[13px] text-ink">{r.lbl}</span>
              <span
                className={`text-[11px] font-medium text-ink-inverse px-2 py-0.5 rounded-full ${r.bg}`}
              >
                {r.badge}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-surface-mint rounded-md p-5 space-y-2.5">
          <div className="text-[11px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Approval flow
          </div>
          {[
            { ic: "✓", lbl: "AI drafted change",     who: "Done" },
            { ic: "○", lbl: "HRBP review",            who: "You" },
            { ic: "○", lbl: "Legal review",           who: "auto-routed" },
            { ic: "○", lbl: "Publish to handbook",    who: "after legal" },
          ].map((r) => (
            <div key={r.lbl} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[13px] text-ink">
                <span className="text-surface-deep">{r.ic}</span>
                {r.lbl}
              </span>
              <span className="text-[11px] text-mute">{r.who}</span>
            </div>
          ))}
        </div>
      </SideRail>
    </DocChrome>
  );
}

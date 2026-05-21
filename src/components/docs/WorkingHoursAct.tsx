import { DocChrome, Paper, SideRail } from "./DocChrome";
import { AIDot } from "@/components/ai/AIDot";

/**
 * Source-of-law document — NJ Wage Transparency Act (S.2310/A.4151).
 * Component name retained as `WorkingHoursAct` for back-compat with state.tsx
 * + scenarios.ts doc IDs; the rendered content is fully NJ-localized.
 */
export function WorkingHoursAct() {
  return (
    <DocChrome
      title="Source document · New Jersey · detected at 7:14 AM today"
      secondary={{ label: "View on NJ.gov" }}
      primary={{ label: "Download PDF" }}
    >
      <Paper>
        {/* Letterhead */}
        <div className="flex items-center gap-3.5 pb-5 border-b border-divider">
          <div className="w-14 h-14 rounded-full border-2 border-ink flex items-center justify-center text-[14px] font-bold">
            NJ
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] text-mute">
              State of New Jersey · Department of Labor and Workforce Development
            </div>
            <div className="text-[14px] text-ink mt-0.5">P.L. 2024, Chapter 91 · Wage Transparency Act</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-[28px] leading-[34px] font-bold tracking-[-0.01em]">
            New Jersey Wage Transparency Act · S.2310 / A.4151
          </h1>
          <p className="text-[14px] text-ink">
            An Act concerning the disclosure of compensation in employment postings and promotion opportunities
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 text-[13px]">
          {[
            ["Enacted",          "Nov 18, 2024"],
            ["Effective",        "June 1, 2025"],
            ["Jurisdiction",     "New Jersey statewide"],
            ["Covered employers","≥10 employees · all sectors"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11px] tracking-[0.08em] uppercase text-mute font-medium">{k}</div>
              <div className="text-[13px] text-ink mt-0.5">{v}</div>
            </div>
          ))}
        </div>

        <section className="space-y-2">
          <h3 className="text-[15px] font-bold">§ 1  Purpose</h3>
          <p className="text-[14px] leading-[22px] text-ink">
            This Act requires employers in New Jersey to disclose the hourly wage or salary range, and a general
            description of benefits, in every posting advertising new employment or promotion opportunities.
          </p>
        </section>

        {/* Highlighted §2 — the key change */}
        <section className="bg-surface-mint rounded-md p-5 space-y-2">
          <div className="flex items-center gap-2">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.06em] uppercase text-surface-deep font-medium">
              AI flagged this paragraph as the key change
            </span>
          </div>
          <h3 className="text-[15px] font-bold">§ 2  Required disclosures in postings</h3>
          <p className="text-[14px] leading-[22px] text-ink">
            Every internal or external posting for new employment or promotion shall include the hourly wage or
            salary range, including the lower bound and upper bound, and a general description of benefits and
            other compensation programs. Open-ended ranges (e.g. "$60,000 and up") are not permitted.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-[15px] font-bold">§ 3  Promotion opportunities</h3>
          <p className="text-[14px] leading-[22px] text-ink">
            Employers shall make reasonable efforts to announce, post, or otherwise make known opportunities for
            promotion to all current employees in the affected department(s) prior to making a promotion decision,
            and shall include the same wage and benefits disclosure required by § 2.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-[15px] font-bold">§ 4  Enforcement & penalties</h3>
          <p className="text-[14px] leading-[22px] text-ink">
            The NJ Department of Labor and Workforce Development is authorized to enforce this Act. Civil penalties
            shall not exceed $300 for a first violation and $600 for each subsequent violation, per posting. The
            Act takes effect on the first day of the seventh month following enactment.
          </p>
        </section>
      </Paper>

      <SideRail>
        <div className="bg-surface-deep text-ink-inverse rounded-md p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-surface-mint text-surface-deep text-[12px] font-bold rounded-md w-7 h-7 flex items-center justify-center">
              AI
            </span>
            <div className="text-[15px] font-bold">Plain-English summary</div>
          </div>
          <p className="text-[13px] leading-[20px] text-surface-mint">
            New Jersey requires every job posting and promotion announcement to show the pay range plus a benefits
            summary. Open-ended ranges aren't allowed. Effective June 1, 2025. Civil penalties per violation
            posting. Promotions must also be announced internally.
          </p>
        </div>

        <div className="bg-white border border-divider rounded-md p-5 space-y-3">
          <div className="text-[14px] font-bold text-ink">What this means for us</div>
          {[
            ["147", "open postings to update (all states + NJ-applicable remote)"],
            ["12",  "careers-page templates to revise"],
            ["4",   "ATS integrations to reconfigure (Workday, LinkedIn, Indeed, Greenhouse)"],
            ["1",   "HR bulletin to send to managers + hiring teams"],
            ["90",  "days until full compliance"],
          ].map(([n, txt]) => (
            <div key={txt} className="flex items-center gap-3">
              <div className="text-[20px] font-bold text-surface-deep w-10">{n}</div>
              <div className="text-[13px] text-ink">{txt}</div>
            </div>
          ))}
        </div>

        <div className="bg-surface-fog rounded-md p-4">
          <div className="text-[11px] tracking-[0.08em] uppercase text-mute font-medium mb-1">
            How the AI found this
          </div>
          <div className="text-[13px] text-ink">NJ DOL regulatory feed</div>
          <div className="text-[12px] text-mute mt-1">
            Picked up at 7:14 AM today, 13 minutes after publication on NJ.gov.
          </div>
        </div>
      </SideRail>
    </DocChrome>
  );
}

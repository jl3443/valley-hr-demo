import { DocChrome, Paper, SideRail } from "./DocChrome";

/**
 * Offboarding letter — Wayne NJ Senior Commercial Lender Carlos Ramirez.
 * Localized to NJ employment law: at-will + voluntary resignation, NJ-required
 * accrued PTO payout, prorated annual bonus.
 */
export function TerminationLetter() {
  return (
    <DocChrome
      title="Document · Offboarding letter · Wayne NJ · English"
      secondary={{ label: "Edit" }}
      primary={{ label: "Send signed PDF" }}
    >
      <Paper>
        <header className="flex items-center gap-3.5 pb-5 border-b border-divider">
          <div className="w-10 h-10 rounded-lg bg-surface-deep flex items-center justify-center text-ink-inverse text-[14px] font-bold">
            VB
          </div>
          <div className="text-[13px] leading-tight">
            <div className="text-ink">Valley People team · Wayne NJ HQ</div>
            <div className="text-mute text-[12px]">1455 Valley Road, Wayne NJ 07470</div>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-6 text-[13px]">
          {[
            ["Document",   "Voluntary separation acknowledgment"],
            ["Reference",  "SEP-2026-0178"],
            ["Date",       "May 19, 2026"],
            ["Last day",   "May 23, 2026"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11px] tracking-[0.08em] uppercase text-mute font-medium">{k}</div>
              <div className="text-[13px] text-ink mt-0.5">{v}</div>
            </div>
          ))}
        </div>

        <div className="space-y-0.5">
          <div className="text-[13px] text-ink">To:</div>
          <div className="text-[15px] font-bold text-ink">Carlos Ramirez</div>
          <div className="text-[13px] text-mute">Senior Commercial Lending Officer · Employee ID 8842-NJ</div>
        </div>

        <div className="bg-surface-mint rounded p-4 space-y-1.5">
          <div className="text-[11px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Subject
          </div>
          <div className="text-[15px] font-bold text-ink leading-tight">
            Acknowledgment of voluntary resignation effective May 23, 2026
          </div>
        </div>

        <div className="space-y-3 text-[14px] leading-[22px] text-ink">
          <p>Dear Carlos,</p>
          <p>
            This letter acknowledges receipt of your two-week resignation notice dated May 9, 2026,
            and confirms your last working day as Friday, May 23, 2026. On behalf of Valley
            National Bank, thank you for your contributions to the Commercial Lending team over
            the past several years.
          </p>
          <p>
            Your final paycheck will include base salary through May 23, your prorated 2026 annual
            bonus, and a payout of accrued, unused PTO (16 days, NJ-required), for a gross total of
            $14,820. Final pay will be deposited on the next scheduled payroll cycle (May 26)
            in accordance with NJ wage payment law.
          </p>
          <p>
            Your system accesses (23 applications including nCino, Salesforce, FIS Profile, and Q2)
            will be deactivated at 6:00 PM ET on your last day. Your client portfolio will be
            reassigned per the knowledge-transfer plan attached. We will provide a neutral
            verification-of-employment letter on request, in line with Valley's standard
            reference policy.
          </p>
          <p>If you have any questions, please reply directly or reach out to HR Concierge.</p>
        </div>

        <div className="pt-3 space-y-1">
          <div className="text-[13px] text-ink">Sincerely,</div>
          <div className="text-[15px] font-bold text-ink">Annika Vasquez</div>
          <div className="text-[12px] text-mute">HR Director · Valley National Bank · e-signed May 19, 2026, 10:42 ET</div>
        </div>
      </Paper>

      <SideRail>
        <div className="bg-white border border-divider rounded-md p-5 space-y-2">
          <div className="text-[14px] font-bold text-ink mb-1">Final pay breakdown</div>
          {[
            ["May salary (Apr 26–May 23)", "$11,200"],
            ["2026 annual bonus (prorated)", "$2,440"],
            ["Accrued PTO payout (16 days)", "$1,180"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-[13px]">
              <span className="text-ink">{k}</span>
              <span className="text-ink">{v}</span>
            </div>
          ))}
          <div className="pt-2 mt-2 border-t border-divider flex items-center justify-between">
            <span className="text-[13px] text-ink">Gross total</span>
            <span className="text-[16px] font-bold text-surface-deep">$14,820</span>
          </div>
        </div>

        <div className="bg-surface-mint rounded-md p-5 space-y-2.5">
          <div className="text-[11px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            What happens next
          </div>
          <div className="text-[14px] font-bold text-ink">Last 4 working days</div>
          {[
            ["Mon May 19", "Letter sent to Carlos"],
            ["Tue May 20", "Portfolio handoff to Brian + Priya"],
            ["Wed May 21", "Knowledge transfer wiki finalized"],
            ["Thu May 22", "Exit interview at 3:00 PM ET"],
            ["Fri May 23", "Last day · access removed 6:00 PM"],
            ["Mon May 26", "Final paycheck · $14,820"],
            ["~Jun 19",    "Verification letter on request"],
          ].map(([d, lbl]) => (
            <div key={lbl} className="flex items-start gap-3">
              <div className="text-[12px] font-medium text-surface-deep w-16 shrink-0">{d}</div>
              <div className="text-[13px] text-ink">{lbl}</div>
            </div>
          ))}
        </div>
      </SideRail>
    </DocChrome>
  );
}

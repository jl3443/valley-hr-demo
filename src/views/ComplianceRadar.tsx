import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { PillButton } from "@/components/blocks/PillButton";
import { SpringIn } from "@/components/ai/SpringIn";
import { CountUp } from "@/components/ai/CountUp";
import { AIDot } from "@/components/ai/AIDot";
import { StaggerList } from "@/components/ai/StaggerList";

/**
 * Compliance Radar — Valley Bank (US banking) jurisdictions only.
 *
 * Active alert: the live NJ Wage Transparency Act remediation (matches UC2).
 * Recent: 2 items the agent already cleared, both bank-relevant.
 * Upcoming: 3 audits in the next 90 days — all US banking regulators:
 *   FINRA license renewals · FDIC compliance exam · NY DFS Part 500 attestation
 * Yellow accents on the primary CTA + active eyebrow per Valley brand.
 */
export function ComplianceRadar() {
  const { go } = useApp();

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Compliance radar", chip: "Live" }} />

      {/* ACTIVE — needs your decision */}
      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-divider">
          <div className="flex items-center gap-2">
            <AIDot size={6} tone="deep" pulse />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Active · needs your decision
            </span>
          </div>
          <span className="text-[11px] text-mute">
            Monitoring 6 US regulators · synced 2 min ago
          </span>
        </header>

        <SpringIn>
          <article className="bg-surface-mint m-3 rounded-md px-4 py-3 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-black text-ink-inverse text-[10px] tracking-[0.08em] uppercase font-medium">
                    New Jersey
                  </span>
                  <span className="text-[12px] text-ink">NJ Wage Transparency Act</span>
                </div>
                <h2 className="text-[18px] leading-[22px] font-bold text-ink">
                  Every job posting must show a real pay range
                </h2>
              </div>
              <div className="bg-surface-deep text-ink-inverse text-center px-3 py-1.5 rounded shrink-0">
                <div className="text-[18px] leading-none font-bold">90</div>
                <div className="text-[9px] tracking-[0.08em] uppercase mt-0.5">Days</div>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-2 items-center">
              <p className="text-[13px] text-ink leading-[19px]">
                <span className="inline-flex items-center gap-1.5 align-middle mr-1.5">
                  <AIDot size={5} tone="deep" />
                  <span className="text-[11px] font-bold tracking-[0.06em] uppercase text-surface-deep">
                    AI rec
                  </span>
                </span>
                Update 147 job postings to show real pay ranges. Roll out in three
                phases over 90 days.
              </p>
              <div className="flex items-center gap-2 shrink-0">
                {/* Yellow primary CTA — high-attention click target per Valley brand. */}
                <PillButton
                  variant="mint"
                  size="sm"
                  arrow
                  onClick={() => go({ kind: "workspace", flow: "uc2" })}
                >
                  Review in workspace
                </PillButton>
                <PillButton
                  variant="secondary"
                  size="sm"
                  onClick={() => go({ kind: "doc", id: "working-hours-act" })}
                >
                  Source law
                </PillButton>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2 border-t border-surface-deep/15">
              {[
                { label: "Impact", value: <><CountUp to={147} delay={200} /> postings</> },
                { label: "Templates", value: <><CountUp to={12} delay={280} /> to update</> },
                { label: "Risk", value: "Medium" },
                { label: "Cost", value: "$78K/yr" },
              ].map((m) => (
                <div key={m.label} className="flex items-baseline gap-1.5">
                  <span className="text-[10px] tracking-[0.08em] uppercase text-mute font-medium">
                    {m.label}
                  </span>
                  <span className="text-[14px] font-bold text-ink">{m.value}</span>
                </div>
              ))}
            </div>
          </article>
        </SpringIn>
      </section>

      {/* RECENT — handled silently */}
      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-divider">
          <div className="flex items-center gap-2">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Recent · handled silently by the agent
            </span>
          </div>
          <span className="text-[11px] text-mute">2 items this week</span>
        </header>
        <div className="grid grid-cols-2 divide-x divide-divider">
          {[
            {
              tag: "New York",
              title: "NY DFS Part 500 cybersecurity attestation",
              note: "Annual attestation pre-filled from system inventory. Reviewed and submitted to NYDFS portal on May 18.",
            },
            {
              tag: "Federal",
              title: "Q2 federal pay-equity audit",
              note: "Audit ran May 12. All bands within tolerance. EEO-1 report packaged and filed for you on May 15.",
            },
          ].map((r) => (
            <article
              key={r.tag + r.title}
              className="px-4 py-3 space-y-2 hover:bg-surface-mint/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-accent-green text-ink-inverse text-[10px] font-medium uppercase tracking-[0.06em]">
                  {r.tag}
                </span>
                <span className="text-[13px] text-ink">{r.title}</span>
              </div>
              <div className="flex items-start gap-2">
                <AIDot size={6} tone="deep" className="mt-1.5" />
                <p className="text-[13px] text-ink leading-[19px]">{r.note}</p>
              </div>
              <button className="ui-pill text-[12px] text-surface-deep font-medium hover:underline">
                View →
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* UPCOMING */}
      <section className="bg-white border border-divider rounded-md overflow-hidden">
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-divider">
          <div className="flex items-center gap-2">
            <AIDot size={6} tone="deep" />
            <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
              Upcoming · scheduled audits
            </span>
          </div>
          <span className="text-[11px] text-mute">3 in the next 90 days</span>
        </header>
        <StaggerList step={70}>
          {[
            { title: "FINRA license renewals · quarterly cohort", due: "Due Aug 2, 2026", days: "75 days", tag: "FINRA" },
            { title: "FDIC compliance exam · consumer protection",  due: "Due Jul 1, 2026", days: "43 days", tag: "FDIC"  },
            { title: "FL Branch Manager NMLS renewal cohort",       due: "Due Jun 15, 2026", days: "27 days", tag: "NMLS"  },
          ].map((u) => (
            <div
              key={u.title}
              className="grid grid-cols-[60px_1fr_auto_auto] items-center gap-4 px-4 py-2.5 border-t border-divider first:border-t-0 hover:bg-surface-mint/40 transition-colors"
            >
              <span className="text-[14px] font-semibold text-surface-deep">{u.tag}</span>
              <span className="text-[14px] text-ink">{u.title}</span>
              <span className="text-[12px] text-mute">{u.due}</span>
              <span className="text-[12px] font-bold text-surface-deep w-16 text-right">{u.days}</span>
            </div>
          ))}
        </StaggerList>
      </section>
    </div>
  );
}

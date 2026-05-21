/**
 * People Lifecycle · Decision Console
 *
 * Built for CXO eyes, not HR-ops daily scan. The page answers four questions:
 *   1. What needs MY decision today?     → DecisionsHero (full-width, top)
 *   2. What's broken right now?           → ExceptionsList (right rail)
 *   3. What's the throughput?             → LifecycleFlowChart (5-stage volumes)
 *   4. Where are we trending + at risk?   → HeadcountTrend + ComplianceHealth
 *   + 24h agent activity log              → ActivityStream
 *
 * Layout mirrors Dashboard.tsx (same padding, same 2fr|1fr split, same panel
 * chrome, same eyebrow-header style) so the two pages feel like one product.
 * No Kanban — Kanban is HRBP daily-ops, not CXO control tower.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { KPIStrip, type KPI } from "@/components/blocks/KPIStrip";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { SpringIn } from "@/components/ai/SpringIn";
import { StaggerList } from "@/components/ai/StaggerList";
import { Sparkline } from "@/components/ai/Sparkline";
import { CountUp } from "@/components/ai/CountUp";
import {
  lifecycleCards,
  lifecycleDecisions,
  lifecycleActivity,
  stageVolumes,
  headcountTrend,
  complianceHealth,
  type Branch,
  type Stage,
  type StatusKind,
} from "@/data/lifecycle";

// ─── KPI strip (5 tiles) ─────────────────────────────────────────────────
function useLifecycleKpis(): KPI[] {
  const { go } = useApp();
  return [
    { label: "Headcount",             value: 3247 },
    { label: "Net hires · QTD",       value: 41   },
    { label: "Voluntary attrition",   value: 3,    suffix: ".2%", decimals: 0 },
    { label: "Avg time to fill",      value: 28,   suffix: "d"   },
    {
      label: "Compliance hold",
      value: 1,
      highlight: "yellow",
      onClick: () => go({ kind: "compliance-radar" }),
    },
  ];
}

// Branch chip tone
const branchTone: Record<Branch, string> = {
  WYN: "bg-surface-deep text-ink-inverse",
  PAT: "bg-surface-deep text-ink-inverse",
  NWK: "bg-surface-deep text-ink-inverse",
  TPA: "bg-surface-deep text-ink-inverse",
  NYC: "bg-surface-deep text-ink-inverse",
  BHM: "bg-surface-deep text-ink-inverse",
};

const statusTone: Record<StatusKind, { dot: string; chip: string; label: string }> = {
  "on-track": { dot: "bg-accent-green",  chip: "bg-accent-green/10 text-accent-green border border-accent-green/30", label: "On track" },
  action:     { dot: "bg-surface-sage",  chip: "bg-surface-sage/30 text-surface-deep border border-surface-sage",     label: "Action needed" },
  blocked:    { dot: "bg-mark-red",      chip: "bg-mark-red/10 text-mark-red border border-mark-red/30",              label: "Blocked" },
};

export function PeopleLifecycle() {
  const { go } = useApp();
  const kpis = useLifecycleKpis();
  /* Stage filter selected from LifecycleFlowChart. When set, ExceptionsList
     narrows to that stage's at-risk employees. Toggle off by clicking again. */
  const [stageFilter, setStageFilter] = useState<Stage | null>(null);
  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "People lifecycle", chip: "HR Ops · control tower" }} />

      <HeroBanner
        eyebrow="Lifecycle agent · live"
        summary="3 decisions need you today · 1 compliance hold open · agent handled 27 lifecycle steps in the past 24h."
        meta="Auto-refresh · 30s"
        cta={
          <PillButton
            variant="mint"
            size="sm"
            onClick={() => go({ kind: "compliance-radar" })}
          >
            + Start new lifecycle event
          </PillButton>
        }
      />

      <KPIStrip items={kpis} cols={5} />

      <div className="grid grid-cols-[2fr_1fr] gap-3 items-stretch">
        <DecisionsHero />
        <ExceptionsList stageFilter={stageFilter} onClear={() => setStageFilter(null)} />
      </div>

      <LifecycleFlowChart
        activeStage={stageFilter}
        onSelectStage={(s) => setStageFilter((curr) => (curr === s ? null : s))}
      />

      <div className="grid grid-cols-[2fr_1fr] gap-3 items-stretch">
        <HeadcountTrendChart />
        <ComplianceHealthPanel />
      </div>

      <ActivityStream />
    </div>
  );
}

/* ════════════════════════ Panel chrome helper ═══════════════════════════ */

function Panel({
  eyebrow,
  rightMeta,
  children,
  className,
}: {
  eyebrow: string;
  rightMeta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  /* h-full + flex-col so 2fr|1fr grid siblings stretch to identical heights.
     Body content fills remaining vertical space via the children wrapper. */
  return (
    <section className={cn("bg-white border border-divider rounded-md overflow-hidden h-full flex flex-col", className)}>
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-divider shrink-0">
        <div className="flex items-center gap-3">
          <AIDot size={6} tone="yellow" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            {eyebrow}
          </span>
        </div>
        {rightMeta}
      </header>
      <div className="flex-1 flex flex-col">{children}</div>
    </section>
  );
}

/* ════════════════════════ Decisions hero ════════════════════════════════ */

const urgencyChip: Record<"critical" | "high" | "medium", string> = {
  critical: "bg-mark-red text-ink-inverse",
  high: "bg-surface-sage text-surface-deep",
  medium: "bg-surface-fog text-ink",
};

function DecisionsHero() {
  const { go } = useApp();
  return (
    <Panel
      eyebrow="Decisions needing you · this week"
      rightMeta={
        <span className="px-2 py-0.5 rounded-full bg-surface-sage text-surface-deep text-[11px] font-semibold">
          3 awaiting
        </span>
      }
    >
      <div className="flex-1 flex flex-col divide-y divide-divider">
        {lifecycleDecisions.map((d, i) => (
          <SpringIn key={d.cardId} delay={i * 90}>
            {/* CXO card — single plain-English sentence + one action.
                No sub-text under the title (the rule). Urgency + date are
                discrete metadata chips, NOT explanations of the title. */}
            {/* Fixed-width columns on urgency + date so the chip / date / title
                left-align vertically across all 3 rows regardless of text width
                (HIGH vs CRITICAL, Today vs Tomorrow vs End of week). */}
            <article className="px-5 py-5 grid grid-cols-[88px_120px_1fr_auto] gap-3 items-center min-h-[88px]">
              <span className={cn("inline-flex justify-center text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-1 rounded w-fit", urgencyChip[d.urgency])}>
                {d.urgency}
              </span>
              <span className="text-[12px] font-semibold text-surface-deep">
                {d.dueWhen}
              </span>
              <h3 className="text-[16px] font-bold leading-[22px] text-ink truncate">
                {d.title}
              </h3>
              <PillButton
                variant="primary"
                size="sm"
                onClick={() => d.primary.target && go(d.primary.target)}
              >
                {d.primary.label} →
              </PillButton>
            </article>
          </SpringIn>
        ))}
      </div>
    </Panel>
  );
}

/* ════════════════════════ Exceptions list ═══════════════════════════════ */

function ExceptionsList({
  stageFilter,
  onClear,
}: {
  stageFilter: Stage | null;
  onClear: () => void;
}) {
  const { go } = useApp();
  const allExceptions = lifecycleCards.filter((c) => c.status !== "on-track");
  const exceptions = stageFilter
    ? allExceptions.filter((c) => c.stage === stageFilter)
    : allExceptions;
  return (
    <Panel
      eyebrow="Exceptions · needs action"
      rightMeta={
        stageFilter ? (
          <button
            type="button"
            onClick={onClear}
            className="px-2 py-0.5 rounded-full bg-surface-sage/30 text-surface-deep text-[11px] font-semibold hover:bg-surface-sage/50 transition-colors"
          >
            {stageFilter.replace("-", " ")} · clear ×
          </button>
        ) : (
          <span className="text-[11px] text-mute">
            <span className="text-mark-red font-semibold">{exceptions.length}</span> open
          </span>
        )
      }
    >
      <div className="flex-1 flex flex-col divide-y divide-divider">
        {exceptions.length === 0 && (
          <div className="flex-1 flex items-center justify-center px-4 py-8 text-[12px] text-mute">
            No exceptions in this stage · all on track
          </div>
        )}
        {exceptions.map((c) => {
          const tone = statusTone[c.status];
          const clickable = !!c.target;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => c.target && go(c.target)}
              disabled={!clickable}
              title={c.ai}
              className={cn(
                "w-full px-4 py-3 text-left flex items-center gap-3 transition-colors min-h-[56px]",
                clickable && "hover:bg-surface-mint/40 cursor-pointer",
              )}
            >
              <span className={cn("w-2 h-2 rounded-full shrink-0", tone.dot)} aria-label={tone.label} />
              <span className="text-[13.5px] font-semibold text-ink truncate flex-1">{c.name}</span>
              <span className={cn("text-[10px] font-bold tracking-[0.04em] px-1.5 py-0.5 rounded leading-none shrink-0", branchTone[c.branch])}>
                {c.branch}
              </span>
              <span className="text-[12px] font-medium text-surface-deep shrink-0 w-12 text-right">
                {c.date}
              </span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

/* ════════════════════════ Lifecycle flow chart ═════════════════════════
   5 horizontal stages. Each shows count + WoW delta + trend sparkline.
   This is the CXO's throughput view — replaces the Kanban entirely. */

function LifecycleFlowChart({
  activeStage,
  onSelectStage,
}: {
  activeStage: Stage | null;
  onSelectStage: (s: Stage) => void;
}) {
  // Total throughput for the flow-volume bar at the bottom
  const total = stageVolumes.reduce((a, b) => a + b.count, 0);
  return (
    <Panel
      eyebrow="Lifecycle throughput · 8-week view"
      rightMeta={
        <span className="text-[11px] text-mute">
          {activeStage
            ? <>filtering exceptions · <span className="text-surface-deep font-semibold">{activeStage.replace("-", " ")}</span></>
            : <><span className="text-surface-deep font-semibold">{total.toLocaleString()}</span> in flight · click a stage to filter</>}
        </span>
      }
    >
      <div className="grid grid-cols-5 divide-x divide-divider">
        {stageVolumes.map((s, i) => {
          const up = s.delta > 0;
          const down = s.delta < 0;
          const isActive = activeStage === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectStage(s.id)}
              className={cn(
                "px-4 py-4 flex flex-col gap-2 text-left transition-colors cursor-pointer",
                isActive ? "bg-surface-sage/15" : "hover:bg-surface-mint/30",
              )}
            >
              <div className="text-[11px] uppercase tracking-[0.08em] text-mute font-semibold">
                {s.title}
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[28px] leading-none font-bold tracking-[-0.02em] text-surface-deep">
                  <CountUp to={s.count} duration={900} delay={i * 80} grouped />
                </span>
                <span
                  className={cn(
                    "text-[12px] font-semibold",
                    up && "text-accent-green",
                    down && "text-mark-red",
                    !up && !down && "text-mute",
                  )}
                >
                  {up ? "↑" : down ? "↓" : "·"} {Math.abs(s.delta)}
                </span>
              </div>
              <Sparkline points={s.spark} filled stroke={isActive ? "var(--accent-green-deep)" : "var(--accent-green-deep)"} width={180} height={28} />
            </button>
          );
        })}
      </div>
      {/* Flow strip — segment widths proportional to volume */}
      <div className="px-4 py-3 border-t border-divider">
        <div className="text-[10px] uppercase tracking-[0.08em] text-mute font-semibold mb-2">
          Stage distribution
        </div>
        <div className="flex h-3 rounded-full overflow-hidden border border-divider">
          {stageVolumes.map((s) => {
            const pct = (s.count / total) * 100;
            return (
              <div
                key={s.id}
                className={cn(
                  "transition-all",
                  s.id === "active"         && "bg-surface-deep",
                  s.id === "onboarding"     && "bg-accent-green",
                  s.id === "offer-accepted" && "bg-surface-sage",
                  s.id === "transitioning"  && "bg-accent-green/60",
                  s.id === "offboarding"    && "bg-mute",
                )}
                style={{ width: `${pct}%` }}
                title={`${s.title} · ${s.count}`}
              />
            );
          })}
        </div>
        <div className="flex gap-4 mt-2 text-[10.5px] text-mute flex-wrap">
          {stageVolumes.map((s) => (
            <span key={s.id} className="inline-flex items-center gap-1.5">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  s.id === "active"         && "bg-surface-deep",
                  s.id === "onboarding"     && "bg-accent-green",
                  s.id === "offer-accepted" && "bg-surface-sage",
                  s.id === "transitioning"  && "bg-accent-green/60",
                  s.id === "offboarding"    && "bg-mute",
                )}
              />
              {s.title}
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ════════════════════════ Headcount trend chart ═════════════════════════
   12-month area chart of headcount, plus an inline net-hire delta strip.
   Hand-rolled SVG — same shape as the design-system showcase charts. */

function HeadcountTrendChart() {
  const w = 720;
  const h = 200;
  const pad = { l: 48, r: 16, t: 16, b: 30 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const values = headcountTrend.map((p) => p.headcount);
  const min = Math.min(...values) - 20;
  const max = Math.max(...values) + 20;
  const range = max - min;
  const x = (i: number) => pad.l + (i / (headcountTrend.length - 1)) * innerW;
  const y = (v: number) => pad.t + (1 - (v - min) / range) * innerH;
  const linePath = headcountTrend
    .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.headcount)}`)
    .join(" ");
  const areaPath = `${linePath} L ${x(headcountTrend.length - 1)} ${pad.t + innerH} L ${x(0)} ${pad.t + innerH} Z`;
  const ytdNet = headcountTrend.reduce((a, b) => a + b.hires - b.exits, 0);
  const ytdHires = headcountTrend.reduce((a, b) => a + b.hires, 0);
  const ytdExits = headcountTrend.reduce((a, b) => a + b.exits, 0);
  return (
    <Panel
      eyebrow="Headcount trend · trailing 12 months"
      rightMeta={
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-mute">
            Hires <span className="font-semibold text-accent-green">+{ytdHires}</span>
          </span>
          <span className="text-mute">
            Exits <span className="font-semibold text-mark-red">−{ytdExits}</span>
          </span>
          <span className="text-mute">
            Net <span className="font-semibold text-surface-deep">+{ytdNet}</span>
          </span>
        </div>
      }
    >
      <div className="flex-1 px-2 py-3 flex items-center">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          <defs>
            <linearGradient id="lifecycle-area-fade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-green-deep)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent-green-deep)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* y-axis grid */}
          {[3100, 3150, 3200, 3250].map((v) => (
            <g key={v}>
              <line
                x1={pad.l}
                x2={w - pad.r}
                y1={y(v)}
                y2={y(v)}
                stroke="var(--divider)"
                strokeDasharray="2 3"
              />
              <text
                x={pad.l - 8}
                y={y(v) + 3}
                textAnchor="end"
                className="fill-mute"
                style={{ fontSize: "10px" }}
              >
                {v.toLocaleString()}
              </text>
            </g>
          ))}
          {/* x labels */}
          {headcountTrend.map((p, i) => (
            <text
              key={p.month}
              x={x(i)}
              y={h - 10}
              textAnchor="middle"
              className="fill-mute"
              style={{ fontSize: "10px" }}
            >
              {p.month}
            </text>
          ))}
          <path d={areaPath} fill="url(#lifecycle-area-fade)" />
          <path d={linePath} fill="none" stroke="var(--accent-green-deep)" strokeWidth="2" />
          {headcountTrend.map((p, i) => (
            <circle
              key={i}
              cx={x(i)}
              cy={y(p.headcount)}
              r={i === headcountTrend.length - 1 ? 4 : 2}
              fill={i === headcountTrend.length - 1 ? "var(--surface-sage)" : "white"}
              stroke="var(--accent-green-deep)"
              strokeWidth={i === headcountTrend.length - 1 ? 2 : 1.5}
            />
          ))}
        </svg>
      </div>
    </Panel>
  );
}

/* ════════════════════════ Compliance health panel ═══════════════════════
   Bank-specific. Four horizontal coverage bars (FINRA · NJ WTA · BSA · OFAC).
   The one currently being remediated renders yellow — the others green. */

function ComplianceHealthPanel() {
  const { go } = useApp();
  return (
    <Panel
      eyebrow="Compliance health"
      rightMeta={<span className="text-[11px] text-mute">Updated 4 min ago</span>}
    >
      <div className="flex-1 px-4 py-4 flex flex-col justify-around gap-4">
        {complianceHealth.map((m) => {
          const pct = (m.current / m.total) * 100;
          const tone =
            m.status === "good"
              ? "bg-accent-green"
              : m.status === "warning"
                ? "bg-surface-sage"
                : "bg-mark-red";
          /* Each metric is clickable → routes to Compliance Radar.
             Yellow-status metrics get a stronger hover hint (they're the
             remediable ones the CXO can act on). */
          return (
            <button
              key={m.label}
              type="button"
              onClick={() => go({ kind: "compliance-radar" })}
              title={m.note}
              className="w-full text-left group cursor-pointer"
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[13.5px] font-semibold text-ink group-hover:text-surface-deep transition-colors">
                  {m.label}
                </span>
                <span className="text-[13px] font-semibold text-surface-deep tabular-nums">
                  {pct.toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-surface-fog rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", tone)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

/* ════════════════════════ Activity stream ═══════════════════════════════ */

function ActivityStream() {
  const { go } = useApp();
  return (
    <Panel
      eyebrow="Activity stream · last 24 hours"
      rightMeta={
        <span className="text-[11px] text-mute">
          <span className="text-surface-deep font-semibold">27</span> agent actions
        </span>
      }
    >
      <div className="px-2 py-2">
        <StaggerList step={70} initialDelay={180}>
          {lifecycleActivity.map((a, i) => (
            <div
              key={i}
              onClick={() => a.target && go(a.target)}
              role={a.target ? "button" : undefined}
              tabIndex={a.target ? 0 : undefined}
              className={cn(
                "px-3 py-2 rounded-md flex items-center gap-3 transition-colors",
                a.highlight && "bg-surface-sage/15",
                a.target
                  ? "cursor-pointer hover:bg-surface-mint/60"
                  : "hover:bg-surface-mint/30",
              )}
            >
              <span className="w-16 shrink-0 text-[11px] tabular-nums text-mute font-medium">
                {a.at}
              </span>
              <span
                className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  a.highlight ? "bg-surface-sage" : a.actor === "Agent" ? "bg-surface-deep" : a.actor === "System" ? "bg-mute" : "bg-accent-green",
                )}
              />
              <div className="min-w-0 flex-1 text-[12.5px] text-ink leading-[17px] truncate">
                {a.what}
                {a.who && <span className="text-surface-deep font-semibold"> · {a.who}</span>}
              </div>
              {a.branch && (
                <span className="text-[9px] font-bold tracking-[0.06em] px-1.5 py-0.5 rounded bg-surface-deep text-ink-inverse leading-none shrink-0">
                  {a.branch}
                </span>
              )}
            </div>
          ))}
        </StaggerList>
      </div>
    </Panel>
  );
}

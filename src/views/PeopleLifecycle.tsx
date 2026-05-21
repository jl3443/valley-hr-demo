/**
 * People Lifecycle · Control Tower
 *
 * Composition (top → bottom):
 *   1. TopRow                — search + breadcrumb (reused)
 *   2. KPIStrip · 5 tiles    — 4 neutral + 1 yellow compliance highlight
 *   3. Kanban (2/3)          — 5 columns × stages, employee cards with
 *                              progress + status + AI line + branch chip
 *      AI Decisions (1/3)    — 3 spring-in cards, same pattern as the
 *                              dashboard's PendingDecisionsPanel
 *   4. Activity stream       — last 24h of agent work, stagger-in
 *
 * Reuses: TopRow · KPIStrip · PillButton · AIDot · StaggerList · SpringIn ·
 *         StreamingText · CountUp. Banking-specific data from lifecycle.ts.
 */

import { cn } from "@/lib/utils";
import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { KPIStrip, type KPI } from "@/components/blocks/KPIStrip";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { SpringIn } from "@/components/ai/SpringIn";
import { StaggerList } from "@/components/ai/StaggerList";
import { CountUp } from "@/components/ai/CountUp";
import {
  stages,
  lifecycleCards,
  activeStats,
  lifecycleDecisions,
  lifecycleActivity,
  type LifecycleCard,
  type StatusKind,
  type Branch,
} from "@/data/lifecycle";

// KPI strip — 5 tiles. CXO-clean: number + label only, no trend mini-text below
// the big number (per user: "any big text doesn't need small text underneath").
// Compliance-hold tile (yellow) routes to Compliance Radar.
function useLifecycleKpis(): KPI[] {
  const { go } = useApp();
  return [
    { label: "Onboarded this month",  value: 4 },
    { label: "Offboarded this month", value: 2 },
    { label: "In probation",          value: 7 },
    { label: "Internal transfers",    value: 3 },
    {
      label: "Compliance hold",
      value: 1,
      highlight: "yellow",
      onClick: () => go({ kind: "compliance-radar" }),
    },
  ];
}

// Branch chip color — navy-deep is the default; transfer chips use yellow accent
const branchTone: Record<Branch, string> = {
  WYN: "bg-surface-deep text-ink-inverse",
  PAT: "bg-surface-deep text-ink-inverse",
  NWK: "bg-surface-deep text-ink-inverse",
  TPA: "bg-surface-deep text-ink-inverse",
  NYC: "bg-surface-deep text-ink-inverse",
  BHM: "bg-surface-deep text-ink-inverse",
};

const statusTone: Record<StatusKind, { dot: string; chip: string; label: string }> = {
  "on-track": { dot: "bg-accent-green",  chip: "bg-accent-green/10 text-accent-green border border-accent-green/30", label: "text-accent-green" },
  action:     { dot: "bg-surface-sage",  chip: "bg-surface-sage/30 text-surface-deep border border-surface-sage",     label: "text-surface-deep" },
  blocked:    { dot: "bg-mark-red",      chip: "bg-mark-red/10 text-mark-red border border-mark-red/30",              label: "text-mark-red" },
};

export function PeopleLifecycle() {
  const { go } = useApp();
  const kpis = useLifecycleKpis();
  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "People lifecycle", chip: "HR Ops · control tower" }} />

      {/* Banner — reuses the same HeroBanner pattern as Dashboard for visual consistency.
          CTA routes to Compliance Radar (the most actionable "new lifecycle event" target). */}
      <HeroBanner
        eyebrow="Lifecycle agent · live"
        summary="14 employees in motion · 3 need your decision · agent handled 27 lifecycle steps in the past 24h."
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

      {/* ── KPI strip · 5 tiles ──────────────────────────────────────── */}
      <KPIStrip items={kpis} cols={5} />

      {/* ── Kanban + AI Decisions split ──────────────────────────────── */}
      <div className="grid grid-cols-[2fr_1fr] gap-3 items-start">
        <KanbanBoard />
        <DecisionsPanel />
      </div>

      {/* ── Activity stream ──────────────────────────────────────────── */}
      <ActivityStream />
    </div>
  );
}

/* ════════════════════════ Kanban ═══════════════════════════════════ */

function KanbanBoard() {
  // Bucket cards by stage so each column reads cleanly
  const byStage = Object.fromEntries(
    stages.map((s) => [s.id, lifecycleCards.filter((c) => c.stage === s.id)]),
  ) as Record<string, LifecycleCard[]>;

  return (
    <section className="bg-white border border-divider rounded-md overflow-hidden">
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-divider">
        <div className="flex items-center gap-3">
          <AIDot size={6} tone="yellow" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Lifecycle board · Wayne NJ HQ + branch network
          </span>
        </div>
        <span className="text-[11px] text-mute">
          <span className="font-semibold text-surface-deep">14</span> in flight · updated just now
        </span>
      </header>

      <div className="grid grid-cols-5 divide-x divide-divider">
        {stages.map((stage) => {
          const cards = byStage[stage.id] ?? [];
          const isActive = stage.id === "active";
          return (
            <div key={stage.id} className="flex flex-col bg-surface-fog/30 min-h-[560px]">
              {/* Column header — title + count on one line, no sub-text explanation */}
              <div className="px-3 pt-3 pb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-surface-deep">
                  {stage.title}
                </span>
                <span className="text-[11px] font-bold text-surface-deep bg-white border border-divider rounded-full px-2 py-0.5 leading-none">
                  {isActive ? activeStats.total : cards.length}
                </span>
              </div>

              <div className="flex-1 px-2 pb-3 space-y-2">
                {isActive ? <ActiveAggregateTile /> : cards.map((c, i) => <KanbanCard key={c.id} card={c} delay={i * 60} />)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ActiveAggregateTile() {
  /* CXO-clean: single big number, no explanatory small text, no dead "Filter
     by branch / role →" link. The column header already says "ACTIVE · 184". */
  return (
    <SpringIn>
      <div className="rounded-md bg-white border border-divider px-4 py-8 flex items-center justify-center">
        <div
          className="text-[44px] leading-none font-light tracking-[-0.02em] text-surface-deep"
          style={{ fontFamily: "var(--font-display, inherit)" }}
        >
          <CountUp to={activeStats.total} duration={900} grouped />
        </div>
      </div>
    </SpringIn>
  );
}

function KanbanCard({ card, delay }: { card: LifecycleCard; delay: number }) {
  const { go } = useApp();
  const tone = statusTone[card.status];
  const pct = (card.stepsDone / card.stepsTotal) * 100;
  const clickable = !!card.target;
  return (
    <div
      onClick={() => card.target && go(card.target)}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          card.target && go(card.target);
        }
      }}
      className={cn(
        "relative rounded-md bg-white border border-divider p-3 transition-all group",
        clickable
          ? "cursor-pointer hover:border-surface-deep hover:shadow-md hover:-translate-y-0.5"
          : "cursor-default",
      )}
      style={{
        animation: `lifecycleIn 360ms cubic-bezier(0.34, 1.32, 0.64, 1) ${delay}ms backwards`,
      }}
    >
      {/* ── Row 1: Identity ─────────────────────────────────────────────
          Avatar + name + role, with branch chip(s) anchored top-right.
          Role is the ONE allowed sub-line under the name — it's a discrete
          attribute (job title), not a small-text "explanation" of the name. */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-surface-mint flex items-center justify-center text-[12px] font-bold text-surface-deep shrink-0">
          {card.initials}
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[13.5px] font-semibold text-ink truncate">{card.name}</div>
          <div className="text-[11.5px] text-mute truncate">{card.role}</div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {card.transferFrom && card.transferFrom !== card.branch && (
            <>
              <span className="text-[10px] font-bold tracking-[0.04em] px-1.5 py-0.5 rounded bg-surface-fog text-mute">
                {card.transferFrom}
              </span>
              <span className="text-[10px] text-surface-sage">→</span>
            </>
          )}
          <span className={cn("text-[10px] font-bold tracking-[0.04em] px-1.5 py-0.5 rounded leading-none", branchTone[card.branch])}>
            {card.branch}
          </span>
        </div>
      </div>

      {/* ── Row 2: Key date ─────────────────────────────────────────────
          Single right-aligned date, no "5/12 steps" caption above the bar.
          Date label + date on one line, big-enough to be glanceable. */}
      <div className="mt-3.5 flex items-baseline justify-between">
        <span className="text-[10.5px] uppercase tracking-[0.08em] text-mute font-semibold">
          {card.dateLabel}
        </span>
        <span className="text-[13.5px] font-semibold text-surface-deep">
          {card.date}
        </span>
      </div>

      {/* ── Row 3: Progress bar (no caption) ───────────────────────────── */}
      <div className="mt-1.5 h-1.5 w-full bg-surface-fog rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", tone.dot)}
          style={{ width: `${Math.max(pct, 4)}%` }}
        />
      </div>

      {/* ── Row 4: Status + hover-only "Open workspace" cue ─────────────── */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", tone.chip)}>
          <span className={cn("w-1.5 h-1.5 rounded-full", tone.dot)} />
          {card.statusLabel}
        </span>
        {clickable && (
          <span className="text-[10.5px] font-semibold text-surface-deep opacity-0 group-hover:opacity-100 transition-opacity">
            Open →
          </span>
        )}
      </div>

      {/* ── Row 5: AI insight ────────────────────────────────────────────
          Single line, ellipsis truncation. Full text available on hover via
          title attribute. The Sparkles dot signals "this is agent voice",
          not a label-explanation. */}
      <div className="mt-3 pt-2.5 border-t border-divider flex items-start gap-1.5">
        <AIDot size={6} tone="yellow" className="mt-[5px] shrink-0" />
        <p className="text-[11px] leading-[15px] text-mute truncate" title={card.ai}>
          {card.ai}
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════ AI decisions panel ═══════════════════════ */

const urgencyChip: Record<"critical" | "high" | "medium", string> = {
  critical: "bg-mark-red text-ink-inverse",
  high: "bg-surface-sage text-surface-deep",
  medium: "bg-surface-fog text-ink",
};

function DecisionsPanel() {
  const { go } = useApp();
  return (
    <section className="bg-white border border-divider rounded-md overflow-hidden">
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-divider">
        <div className="flex items-center gap-3">
          <AIDot size={6} tone="yellow" pulse />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            AI-proposed actions · this week
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-surface-sage text-surface-deep text-[11px] font-semibold">
          3 awaiting
        </span>
      </header>

      <div className="divide-y divide-divider">
        {lifecycleDecisions.map((d, i) => (
          <SpringIn key={d.cardId} delay={i * 120}>
            <article className="px-4 py-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={cn("text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-md", urgencyChip[d.urgency])}>
                  {d.urgency}
                </span>
                <span className="text-[11px] text-mute">
                  {d.dueLabel} <span className="text-surface-deep font-semibold">{d.dueWhen}</span>
                </span>
              </div>
              <h3 className="text-[13.5px] font-bold leading-[18px] text-ink">{d.title}</h3>
              <p className="text-[12px] leading-[17px] text-mute">{d.sub}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <PillButton
                  variant="primary"
                  size="sm"
                  onClick={() => d.primary.target && go(d.primary.target)}
                >
                  {d.primary.label}
                </PillButton>
                {d.secondary && (
                  <PillButton
                    variant="secondary"
                    size="sm"
                    onClick={() => d.secondary?.target && go(d.secondary.target)}
                  >
                    {d.secondary.label}
                  </PillButton>
                )}
              </div>
            </article>
          </SpringIn>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════ Activity stream ══════════════════════════ */

function ActivityStream() {
  const { go } = useApp();
  return (
    <section className="bg-white border border-divider rounded-md overflow-hidden">
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-divider">
        <div className="flex items-center gap-3">
          <AIDot size={6} tone="yellow" />
          <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">
            Activity stream · last 24 hours
          </span>
        </div>
        <span className="text-[11px] text-mute">
          <span className="text-surface-deep font-semibold">27</span> agent actions
        </span>
      </header>
      <div className="px-2 py-2">
        <StaggerList step={70} initialDelay={180}>
          {lifecycleActivity.map((a, i) => (
            <div
              key={i}
              onClick={() => a.target && go(a.target)}
              role={a.target ? "button" : undefined}
              tabIndex={a.target ? 0 : undefined}
              className={cn(
                "px-3 py-2 rounded-md flex items-start gap-3 transition-colors",
                a.highlight && "bg-surface-sage/15",
                a.target
                  ? "cursor-pointer hover:bg-surface-mint/60"
                  : "hover:bg-surface-mint/30",
              )}
            >
              <span className="w-16 shrink-0 text-[11px] tabular-nums text-mute font-medium pt-[1px]">
                {a.at}
              </span>
              <span
                className={cn(
                  "w-2 h-2 rounded-full mt-1.5 shrink-0",
                  a.highlight ? "bg-surface-sage" : a.actor === "Agent" ? "bg-surface-deep" : a.actor === "System" ? "bg-mute" : "bg-accent-green",
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] text-ink leading-[17px]">
                  {a.what}
                  {a.who && (
                    <span className="text-surface-deep font-semibold"> · {a.who}</span>
                  )}
                  {a.branch && (
                    <span className="ml-1.5 inline-block text-[9px] font-bold tracking-[0.06em] px-1.5 py-0.5 rounded bg-surface-deep text-ink-inverse align-middle leading-none">
                      {a.branch}
                    </span>
                  )}
                </div>
                <div className="text-[10.5px] uppercase tracking-[0.06em] text-mute font-medium mt-0.5">
                  {a.actor}
                </div>
              </div>
            </div>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ════════════════════════ Card-entry animation ═════════════════════ */
// Defined inline so the page is self-contained — same spring curve as SpringIn.
const _styleTag = (
  <style>{`
    @keyframes lifecycleIn {
      from { opacity: 0; transform: translateY(8px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }
  `}</style>
);

// inject once at module load
if (typeof document !== "undefined" && !document.getElementById("lifecycle-anim")) {
  const s = document.createElement("style");
  s.id = "lifecycle-anim";
  s.textContent = `
    @keyframes lifecycleIn {
      from { opacity: 0; transform: translateY(8px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }
  `;
  document.head.appendChild(s);
}
// `_styleTag` is intentionally unused — keeps a JSX reference for grep'ability.
void _styleTag;

import * as React from "react";
import { AIDot } from "@/components/ai/AIDot";
import { StreamingText } from "@/components/ai/StreamingText";
import { SpringIn } from "@/components/ai/SpringIn";

/**
 * Compact AI status banner — replaces the heavy Marketing-hero card on
 * the dashboard. ~80 px tall, single line of streaming summary, one
 * primary CTA on the right.
 */
export function HeroBanner({
  eyebrow,
  summary,
  cta,
  meta,
}: {
  eyebrow: string;
  summary: string;
  cta?: React.ReactNode;
  meta?: string;
}) {
  return (
    <SpringIn>
      <section className="bg-surface-mint rounded-md px-5 py-3 flex items-center justify-between gap-5 border-l-4 border-l-[var(--surface-sage)]">
        <div className="flex items-center gap-3 min-w-0">
          {/* Navy icon block with yellow sparkle glyph — yellow accent INSIDE
              the navy square so the brand mark reads on both surfaces. */}
          <div className="w-9 h-9 rounded-lg bg-surface-deep flex items-center justify-center shrink-0">
            <span className="text-[var(--surface-sage)] text-[14px] font-bold">✦</span>
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-2 mb-0.5">
              <AIDot size={6} tone="yellow" pulse />
              <span className="text-[11px] tracking-[0.08em] uppercase text-surface-deep font-medium">
                {eyebrow}
              </span>
            </div>
            <div className="text-[14px] text-ink">
              <StreamingText text={summary} cps={75} caret={false} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {meta && <span className="text-[12px] text-surface-deep">{meta}</span>}
          {cta}
        </div>
      </section>
    </SpringIn>
  );
}

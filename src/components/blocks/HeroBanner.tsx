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
      {/* Per user: 主页 banner = 深蓝背景 + 白色字 + 黄色按钮.
          Bold navy fill makes the dashboard hero read "this is THE Valley
          AI HR product"; yellow CTA is the high-attention click target. */}
      <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-3 flex items-center justify-between gap-5 border-l-4 border-l-[var(--surface-sage)]">
        <div className="flex items-center gap-3 min-w-0">
          {/* Yellow icon block — flips inside-out from the previous navy
              square so the brand sparkle pops against the navy banner bg. */}
          <div className="w-9 h-9 rounded-lg bg-surface-sage flex items-center justify-center shrink-0">
            <span className="text-surface-deep text-[14px] font-bold">✦</span>
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-2 mb-0.5">
              <AIDot size={6} tone="yellow" pulse />
              <span className="text-[11px] tracking-[0.08em] uppercase text-surface-sage font-medium">
                {eyebrow}
              </span>
            </div>
            <div className="text-[14px] text-ink-inverse">
              <StreamingText text={summary} cps={75} caret={false} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {meta && <span className="text-[12px] text-ink-inverse/70">{meta}</span>}
          {cta}
        </div>
      </section>
    </SpringIn>
  );
}

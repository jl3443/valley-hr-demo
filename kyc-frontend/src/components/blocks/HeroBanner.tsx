import * as React from "react";

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
    <section className="bg-[color:var(--surface-mint)] rounded-lg p-6 flex items-center justify-between gap-6">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[color:var(--accent-green-deep)]">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-[22px] font-bold tracking-[-0.01em] text-[color:var(--accent-green-deep)] max-w-[860px]">
          {summary}
        </h2>
        {meta && <div className="mt-1 text-[12px] text-[color:var(--mute)]">{meta}</div>}
      </div>
      {cta && <div className="shrink-0">{cta}</div>}
    </section>
  );
}

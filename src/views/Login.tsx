import { useApp } from "@/state";
import { ArrowRight } from "lucide-react";

/**
 * Login · single screen.
 * - Full-bleed single hero photo (no tri-panel split, no column labels)
 * - Top-left brand: just "Banking" (Valley wordmark dropped, sized up)
 * - Top-right: no role-selector pill (was redundant; Access Portal is the only CTA)
 * - Access Portal CTA signs in as HRBP directly — persona-selection step removed
 */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=2400&q=80&auto=format&fit=crop";

export function Login() {
  const { signIn } = useApp();

  return (
    <div className="fixed inset-0 overflow-auto bg-neutral-950 text-white">
      <HeroBackground />

      <div className="relative min-h-screen flex flex-col">
        <TopBar />

        <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-12 pt-6 sm:px-10">
          <Hero onAccess={() => signIn("hrbp")} />
        </main>

        <footer className="relative z-10 px-6 pb-7 text-center sm:px-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Valley National Bank · Confidential · Enterprise Use Only
          </p>
        </footer>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Hero photo backdrop — single full-bleed image (no column split)
// ────────────────────────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      {/* Navy overlay — keeps the photo brand-consistent and ensures legible white text */}
      <div className="absolute inset-0 bg-[#002c4e]/65" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#002c4e]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#002c4e]/75 to-transparent" />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Top bar — Banking wordmark left, nothing on the right
// ────────────────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <header className="relative z-20 flex w-full items-center justify-between px-6 py-5 sm:px-10">
      <div className="inline-flex items-center gap-3">
        <span className="flex flex-col leading-tight">
          <span
            className="text-[32px] font-light text-white tracking-[0.01em]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Banking
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">
            HR Concierge · Multi-Agent System
          </span>
        </span>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Hero — yellow eyebrow → display-serif headline → Access Portal CTA
// ────────────────────────────────────────────────────────────────────────────

function Hero({ onAccess }: { onAccess: () => void }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
      <span className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f3d01c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
        Valley · New Jersey HQ · HR Intelligence
      </span>
      <h1
        className="font-light leading-[1.04] tracking-[0.01em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
        style={{
          fontSize: "clamp(2rem, 5.6vw, 4.4rem)",
          fontFamily: "Cormorant Garamond, serif",
        }}
      >
        Everyone has a "How?"
      </h1>
      <p
        className="mt-5 max-w-xl text-[14px] font-normal leading-[1.55] text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-[15px]"
        style={{ fontFamily: "Roboto, arial, sans-serif" }}
      >
        Detect NJ + multi-state policy changes, assess workforce impact, draft
        compliant artifacts, route approvals, and execute HR actions with a
        complete audit trail.
      </p>
      <button
        type="button"
        onClick={onAccess}
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#f3d01c] px-8 py-3 text-[14px] font-semibold tracking-[0.02em] text-[#002c4e] transition-all duration-150 hover:bg-[#e0bc11] active:scale-[0.97]"
        style={{ fontFamily: "Roboto, arial, sans-serif" }}
      >
        Access Portal
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

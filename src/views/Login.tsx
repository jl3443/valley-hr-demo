import { useState } from "react";
import { useApp } from "@/state";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  MessageSquare,
  Lock,
  User as UserIcon,
  LogIn,
} from "lucide-react";

// Tri-panel hero photography — kept from original layout (per user: "排版
// 布局不需要改各个的位置"). Same three column rhythm, same luminance balance.
const HERO_COLUMNS = [
  {
    label: "People & Lifecycle",
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop",
  },
  {
    label: "Policy & Compliance",
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80&auto=format&fit=crop",
  },
  {
    label: "Talent & Retention",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop",
  },
];

// Two-tone accent — re-skinned to Valley Bank colors.
// HRBP gets Valley navy (the brand anchor); Employee gets Valley yellow
// (the signature accent — same role split as the original teal/amber).
type AccentKey = "navy" | "yellow";
const ACCENT: Record<AccentKey, { hex: string; halo: string; textOnFill: string }> = {
  navy:   { hex: "#002c4e", halo: "rgba(0,44,78,0.55)",   textOnFill: "#ffffff" },
  yellow: { hex: "#f3d01c", halo: "rgba(243,208,28,0.45)", textOnFill: "#002c4e" },
};

type Persona = {
  id: "hrbp" | "employee";
  badge: string;
  name: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  capabilities: string[];
  userId: string;
  accent: AccentKey;
};

const PERSONAS: Persona[] = [
  {
    id: "hrbp",
    badge: "HR Operations",
    name: "HRBP Control Tower",
    Icon: ShieldCheck,
    capabilities: [
      "NJ + multi-state policy radar",
      "Decision card with full audit trail",
      "Workday · Okta · email execution",
    ],
    userId: "valley.hrbp",
    accent: "navy",
  },
  {
    id: "employee",
    badge: "Self-Service",
    name: "Employee Concierge",
    Icon: MessageSquare,
    capabilities: [
      "Conversational HR helpdesk",
      "Verification letters in 32 seconds",
      "PTO + leave plans auto-drafted",
    ],
    userId: "valley.employee",
    accent: "yellow",
  },
];

export function Login() {
  const { signIn } = useApp();
  const [phase, setPhase] = useState<"hero" | "personas">("hero");

  return (
    <div className="fixed inset-0 overflow-auto bg-neutral-950 text-white">
      <HeroBackground heavyOverlay={phase === "personas"} />

      <div className="relative min-h-screen flex flex-col">
        <TopBar phase={phase} onSelect={() => setPhase("personas")} onBack={() => setPhase("hero")} />

        <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-12 pt-6 sm:px-10">
          {phase === "hero" ? (
            <Hero onAccess={() => setPhase("personas")} />
          ) : (
            <PersonaGrid signIn={signIn} />
          )}
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
// Hero photo backdrop — three full-bleed columns (unchanged layout)
// ────────────────────────────────────────────────────────────────────────────

function HeroBackground({ heavyOverlay = false }: { heavyOverlay?: boolean }) {
  const colTint = heavyOverlay ? "bg-[#002c4e]/72" : "bg-[#002c4e]/52";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3">
        {HERO_COLUMNS.map((col) => (
          <div key={col.label} className="relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${col.src}')` }}
            />
            <div className={cn("absolute inset-0 transition-colors duration-500", colTint)} />
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#002c4e]/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#002c4e]/70 to-transparent" />
            {!heavyOverlay && (
              <span className="absolute inset-x-0 bottom-20 z-10 text-center text-[11px] font-bold uppercase tracking-[0.32em] text-[#f3d01c]/80">
                {col.label}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-1/3 w-px bg-white/10" />
      <div className="absolute inset-y-0 left-2/3 w-px bg-white/10" />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Top bar — Valley wordmark left, role-select pill right
// ────────────────────────────────────────────────────────────────────────────

function TopBar({
  phase,
  onSelect,
  onBack,
}: {
  phase: "hero" | "personas";
  onSelect: () => void;
  onBack: () => void;
}) {
  return (
    <header className="relative z-20 flex w-full items-center justify-between px-6 py-5 sm:px-10">
      <div className="inline-flex items-center gap-3">
        {/* Valley wordmark — white on navy hero, with yellow "BANK" accent */}
        <span className="flex flex-col leading-tight">
          <span className="inline-flex items-baseline gap-1.5">
            <span
              className="text-[24px] font-light tracking-[-0.01em] text-white"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Valley
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-[2px] text-[#f3d01c]"
            >
              Bank
            </span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
            HR Concierge · Multi-Agent System
          </span>
        </span>
      </div>

      {phase === "hero" ? (
        <button
          type="button"
          onClick={onSelect}
          className="group inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-white/85 transition-all duration-300 hover:border-[#f3d01c] hover:bg-[#f3d01c]/10 hover:text-[#f3d01c]"
        >
          Select Role
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-white/85 transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>
      )}
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
      <p className="mt-5 max-w-xl text-[14px] font-normal leading-[1.55] text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-[15px]" style={{ fontFamily: "Roboto, arial, sans-serif" }}>
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

// ────────────────────────────────────────────────────────────────────────────
// Persona selector — title + 2 dark glass cards (Valley navy + yellow accents)
// ────────────────────────────────────────────────────────────────────────────

function PersonaGrid({ signIn }: { signIn: (id: "hrbp" | "employee") => void }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <div className="text-center mb-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f3d01c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          Agentic Workspaces
        </span>
        <h2
          className="mt-3 font-light leading-[1.05] tracking-[0.01em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
          style={{
            fontSize: "clamp(1.85rem, 4.4vw, 3.2rem)",
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          Select Your Role
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[13.5px] leading-[1.55] text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-[14.5px]" style={{ fontFamily: "Roboto, arial, sans-serif" }}>
          Each workspace deploys a curated set of AI agents calibrated to your
          role and decision scope.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 max-w-[800px] mx-auto">
        {PERSONAS.map((p) => (
          <PersonaCard key={p.id} persona={p} signIn={signIn} />
        ))}
      </div>

      <p className="mt-10 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        AI agents activate upon persona selection · actions are audited
      </p>
    </div>
  );
}

function PersonaCard({
  persona,
  signIn,
}: {
  persona: Persona;
  signIn: (id: "hrbp" | "employee") => void;
}) {
  const [user, setUser] = useState(persona.userId);
  const [pwd, setPwd] = useState("valley-demo");
  const { Icon } = persona;
  const tone = ACCENT[persona.accent];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(persona.id);
  };

  return (
    <article
      style={{
        boxShadow: `inset 0 0 0 1px ${tone.hex}33, 0 25px 70px -30px ${tone.halo}`,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full opacity-25 blur-3xl"
        style={{ background: tone.hex }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="grid w-10 h-10 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.06] text-white/85">
          <Icon size={16} strokeWidth={1.75} />
        </span>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{
            color: tone.hex,
            background: `${tone.hex}14`,
            border: `1px solid ${tone.hex}55`,
          }}
        >
          {persona.badge}
        </span>
      </div>

      <h3
        className="relative mt-5 min-h-[2.6rem] text-[22px] font-light leading-[1.15] tracking-[0.01em] text-white"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        {persona.name}
      </h3>

      <ul className="relative mt-4 space-y-2">
        {persona.capabilities.map((cap) => (
          <li
            key={cap}
            className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/80"
            style={{ fontFamily: "Roboto, arial, sans-serif" }}
          >
            <span
              aria-hidden
              className="mt-[6px] block w-1.5 h-1.5 shrink-0 rounded-full"
              style={{ background: tone.hex }}
            />
            <span>{cap}</span>
          </li>
        ))}
      </ul>

      <div
        className="relative my-5 h-px w-full"
        style={{
          background: `linear-gradient(to right, transparent, ${tone.hex}55, transparent)`,
        }}
      />

      <form onSubmit={handleSubmit} className="relative mt-auto flex flex-col gap-2">
        <Field
          icon={UserIcon}
          label="User ID"
          name={`${persona.id}-user`}
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Field
          icon={Lock}
          label="Password"
          name={`${persona.id}-pwd`}
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button
          type="submit"
          style={{ background: tone.hex, color: tone.textOnFill }}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[13px] font-semibold tracking-[0.01em] transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
        >
          <LogIn size={14} />
          Sign In
        </button>
      </form>
    </article>
  );
}

function Field({
  icon: Icon,
  label,
  ...rest
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group relative flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 transition-colors duration-200 focus-within:bg-white/[0.07] focus-within:border-[#f3d01c]/60">
      <Icon size={14} strokeWidth={1.8} className="text-white/55 shrink-0" />
      <input
        {...rest}
        className="flex-1 bg-transparent text-[13px] font-medium tracking-[0.02em] text-white placeholder-white/40 outline-none"
      />
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40 shrink-0">
        {label}
      </span>
    </label>
  );
}

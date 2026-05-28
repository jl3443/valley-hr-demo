import * as React from "react";
import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { PillButton } from "@/components/blocks/PillButton";
import { AIDot } from "@/components/ai/AIDot";
import { SpringIn } from "@/components/ai/SpringIn";
import { Sparkles, Building2, Globe2, FileCheck } from "lucide-react";

export function Intake() {
  const { go } = useApp();
  const [form, setForm] = React.useState({
    legal_name: "Acme Industries LLC",
    registration_number: "REG-12345",
    incorporation_country: "US",
    incorporation_state: "DE",
    website: "https://acme.example",
    description: "Industrial machinery distribution",
    jurisdiction: "US",
    priority: "normal",
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "New KYC intake", chip: "Onboarding" }} />

      <SpringIn>
        <section className="bg-surface-deep text-ink-inverse rounded-md px-5 py-4 flex items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <Sparkles size={28} strokeWidth={1.6} className="text-surface-sage hr-pulse" />
            <div>
              <div className="text-[11px] tracking-[0.08em] uppercase text-ink-inverse font-medium">
                Agentic intake
              </div>
              <div className="text-[14px]">
                Intake agent will standardize organization data, validate documents, and route the case for screening on submit.
              </div>
            </div>
          </div>
          <PillButton variant="mint" size="sm" onClick={() => go({ kind: "dashboard" })}>
            Save & exit
          </PillButton>
        </section>
      </SpringIn>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 space-y-3">
          <FormCard
            eyebrow="Step 1"
            title="Organization details"
            icon={<Building2 size={14} className="text-surface-deep" />}
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="Legal name" wide>
                <input value={form.legal_name} onChange={(e) => set("legal_name", e.target.value)} className={fieldCx} />
              </Field>
              <Field label="Registration number">
                <input value={form.registration_number} onChange={(e) => set("registration_number", e.target.value)} className={fieldCx} />
              </Field>
              <Field label="Website">
                <input value={form.website} onChange={(e) => set("website", e.target.value)} className={fieldCx} />
              </Field>
              <Field label="Incorporation country">
                <input value={form.incorporation_country} onChange={(e) => set("incorporation_country", e.target.value)} className={fieldCx} />
              </Field>
              <Field label="Incorporation state">
                <input value={form.incorporation_state} onChange={(e) => set("incorporation_state", e.target.value)} className={fieldCx} />
              </Field>
              <Field label="Business description" wide>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={fieldCx}
                />
              </Field>
            </div>
          </FormCard>

          <FormCard
            eyebrow="Step 2"
            title="Documents"
            icon={<FileCheck size={14} className="text-surface-deep" />}
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                "Certificate of incorporation",
                "Ownership chart",
                "UBO declaration",
                "Proof of address",
                "Audited financials",
                "Business license",
              ].map((d) => (
                <button
                  key={d}
                  className="ui-pill text-left px-4 py-3 bg-surface-fog border border-dashed border-divider rounded-md hover:border-surface-deep hover:bg-white"
                >
                  <div className="text-[13px] font-medium">{d}</div>
                  <div className="text-[12px] text-mute">Click to upload · pdf, png, jpg</div>
                </button>
              ))}
            </div>
          </FormCard>
        </div>

        <div className="space-y-3">
          <FormCard
            eyebrow="Routing"
            title="Case setup"
            icon={<Globe2 size={14} className="text-surface-deep" />}
          >
            <div className="space-y-3">
              <Field label="Jurisdiction">
                <select value={form.jurisdiction} onChange={(e) => set("jurisdiction", e.target.value)} className={fieldCx}>
                  <option value="US">United States</option>
                  <option value="EU">European Union</option>
                  <option value="UK">United Kingdom</option>
                  <option value="SG">Singapore</option>
                  <option value="HK">Hong Kong</option>
                  <option value="CN">China</option>
                </select>
              </Field>
              <Field label="Priority">
                <select value={form.priority} onChange={(e) => set("priority", e.target.value)} className={fieldCx}>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </Field>
              <div className="text-[12px] text-mute leading-[18px]">
                On submit, a case will be created with status <span className="font-bold text-ink">intake</span>,
                the intake agent will run, and the case routes to the analyst console.
              </div>
              <PillButton variant="primary" size="md" arrow className="w-full justify-center" onClick={() => go({ kind: "dashboard" })}>
                Create case
              </PillButton>
            </div>
          </FormCard>
        </div>
      </div>
    </div>
  );
}

const fieldCx =
  "w-full px-3 py-2 bg-surface-fog border-0 rounded-md text-[14px] outline-none focus:bg-white focus:ring-2 focus:ring-surface-deep";

function FormCard({
  eyebrow,
  title,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-divider rounded-md overflow-hidden">
      <header className="px-4 py-2.5 border-b border-divider flex items-center gap-3">
        <AIDot size={6} tone="deep" />
        <span className="text-[12px] tracking-[0.08em] uppercase text-surface-deep font-medium">{eyebrow}</span>
        <span className="text-[13px] text-ink font-medium">{title}</span>
        <span className="ml-auto">{icon}</span>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "col-span-2 block" : "block"}>
      <div className="text-[11px] uppercase tracking-[0.08em] font-bold text-mute mb-1.5">{label}</div>
      {children}
    </label>
  );
}

import * as React from "react";
import { useApp } from "@/state";
import { api } from "@/lib/api";
import { TopRow } from "@/components/blocks/TopRow";
import { Card, CardHeader } from "@/components/ds/card";
import { Button } from "@/components/ds/button";
import { Input, Textarea, Select, Field } from "@/components/ds/input";

const defaults = {
  legal_name: "Acme Industries LLC",
  registration_number: "REG-12345",
  incorporation_country: "US",
  incorporation_state: "DE",
  website: "https://acme.example",
  business_description: "Industrial machinery distribution",
};

export function Intake() {
  const { go } = useApp();
  const [form, setForm] = React.useState({ ...defaults });
  const [jurisdiction, setJurisdiction] = React.useState("US");
  const [priority, setPriority] = React.useState("normal");
  const [submitting, setSubmitting] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      const created = await api.createCase({
        organization: form,
        case_type: "onboarding",
        customer_type: "business",
        jurisdiction,
        priority,
      });
      go({ kind: "case", id: created.id });
    } catch (e2) {
      setErr(String(e2));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-4 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "New intake", chip: "Onboarding" }} />

      <form onSubmit={submit} className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader eyebrow="Step 1" title="Organization details" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Legal name" className="col-span-2">
              <Input value={form.legal_name} onChange={(e) => set("legal_name", e.target.value)} required />
            </Field>
            <Field label="Registration number">
              <Input value={form.registration_number} onChange={(e) => set("registration_number", e.target.value)} />
            </Field>
            <Field label="Website">
              <Input value={form.website} onChange={(e) => set("website", e.target.value)} />
            </Field>
            <Field label="Incorporation country">
              <Input value={form.incorporation_country} onChange={(e) => set("incorporation_country", e.target.value)} />
            </Field>
            <Field label="Incorporation state">
              <Input value={form.incorporation_state} onChange={(e) => set("incorporation_state", e.target.value)} />
            </Field>
            <Field label="Business description" className="col-span-2">
              <Textarea
                rows={3}
                value={form.business_description}
                onChange={(e) => set("business_description", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Routing" title="Case setup" />
          <div className="space-y-3">
            <Field label="Jurisdiction">
              <Select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)}>
                <option value="US">United States</option>
                <option value="EU">European Union</option>
                <option value="UK">United Kingdom</option>
                <option value="SG">Singapore</option>
                <option value="HK">Hong Kong</option>
              </Select>
            </Field>
            <Field label="Priority">
              <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </Select>
            </Field>
            <div className="text-[12px] text-[color:var(--mute)] leading-[18px]">
              Submitting will create a case in <code>cases</code>, fire an intake
              agent run, and route to the analyst console.
            </div>
            {err && (
              <div className="text-[12px] font-bold text-[color:var(--mark-red)] bg-[color:var(--surface-rose)] px-3 py-2 rounded">
                {err}
              </div>
            )}
            <Button type="submit" variant="green" size="secondary" disabled={submitting} className="w-full">
              {submitting ? "Creating…" : "Create case"}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

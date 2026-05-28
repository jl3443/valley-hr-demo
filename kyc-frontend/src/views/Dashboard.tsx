import { useApp } from "@/state";
import { TopRow } from "@/components/blocks/TopRow";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { KPIStrip, type KPI } from "@/components/blocks/KPIStrip";
import { PillButton } from "@/components/blocks/PillButton";
import { CasesPanel } from "@/components/blocks/CasesPanel";
import { AlertsPanel } from "@/components/blocks/AlertsPanel";
import { JurisdictionsTable } from "@/components/blocks/JurisdictionsTable";
import { PendingDecisionsPanel } from "@/components/blocks/PendingDecisionsPanel";
import { kycSparks } from "@/data/kyc";

const kpis: KPI[] = [
  { label: "Open cases",        value: 62,  trend: { delta: "7",  direction: "up" }, spark: kycSparks.openCases },
  { label: "Need decision",     value: 3,   trend: { delta: "1",  direction: "up" }, spark: kycSparks.needDecision, highlight: "yellow" },
  { label: "High risk",         value: 9,   trend: { delta: "1",  direction: "up" }, spark: kycSparks.highRisk },
  { label: "Approved (30d)",    value: 72,  trend: { delta: "12", direction: "up" }, spark: kycSparks.approved },
];

export function Dashboard() {
  const { go } = useApp();
  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-3 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "KYC dashboard", chip: "Compliance" }} />

      <HeroBanner
        eyebrow="AI-powered KYC operations"
        summary="3 cases need your decision today · 2 sanctions hits in flight · agent has cleared 47 cases this month."
        cta={
          <PillButton variant="mint" size="sm" onClick={() => go({ kind: "intake" })}>
            + New intake
          </PillButton>
        }
        meta="Updated 2 min ago"
      />

      <KPIStrip items={kpis} />

      <div className="grid grid-cols-[2fr_1fr] gap-3">
        <CasesPanel />
        <AlertsPanel />
      </div>

      <JurisdictionsTable />

      <PendingDecisionsPanel />
    </div>
  );
}

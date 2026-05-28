import { Chip } from "@/components/ds/chip";

const statusMap: Record<string, { label: string; variant: "fog" | "mint" | "sage" | "green" | "deep" | "red" | "outline" }> = {
  draft: { label: "Draft", variant: "fog" },
  intake: { label: "Intake", variant: "mint" },
  submitted: { label: "Submitted", variant: "mint" },
  screening: { label: "Screening", variant: "sage" },
  in_review: { label: "In review", variant: "sage" },
  approved: { label: "Approved", variant: "green" },
  rejected: { label: "Rejected", variant: "red" },
  edd_required: { label: "EDD required", variant: "deep" },
  closed: { label: "Closed", variant: "fog" },
};

export function StatusPill({ status }: { status?: string }) {
  const s = statusMap[status ?? ""] ?? { label: status ?? "Unknown", variant: "outline" as const };
  return <Chip variant={s.variant}>{s.label}</Chip>;
}

const riskMap: Record<string, { label: string; variant: "green" | "sage" | "deep" | "red" }> = {
  low: { label: "Low risk", variant: "green" },
  medium: { label: "Medium risk", variant: "sage" },
  high: { label: "High risk", variant: "deep" },
  critical: { label: "Critical", variant: "red" },
};

export function RiskPill({ risk }: { risk?: string }) {
  if (!risk) return <Chip variant="fog">Unscored</Chip>;
  const r = riskMap[risk] ?? { label: risk, variant: "fog" as const };
  return <Chip variant={r.variant as "green"}>{r.label}</Chip>;
}

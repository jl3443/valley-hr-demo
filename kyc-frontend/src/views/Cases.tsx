import * as React from "react";
import { useApp } from "@/state";
import { api, type Case } from "@/lib/api";
import { TopRow } from "@/components/blocks/TopRow";
import { CasesTable } from "@/components/blocks/CasesTable";
import { Button } from "@/components/ds/button";
import { Input, Select } from "@/components/ds/input";

export function Cases() {
  const { go } = useApp();
  const [cases, setCases] = React.useState<Case[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");

  React.useEffect(() => {
    api.listCases()
      .then(setCases)
      .finally(() => setLoading(false));
  }, []);

  const filtered = cases.filter((c) => {
    if (status !== "all" && c.status !== status) return false;
    if (q && !c.organization?.legal_name?.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-4 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Cases", chip: `${cases.length} total` }} />

      <div className="flex items-center gap-3">
        <div className="w-[280px]">
          <Input placeholder="Search organization…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="w-[180px]">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="intake">Intake</option>
            <option value="submitted">Submitted</option>
            <option value="screening">Screening</option>
            <option value="in_review">In review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="edd_required">EDD required</option>
          </Select>
        </div>
        <div className="ml-auto">
          <Button variant="green" size="secondary" onClick={() => go({ kind: "intake" })}>
            + New intake
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-[14px] text-[color:var(--mute)] py-8 text-center">Loading…</div>
      ) : (
        <CasesTable cases={filtered} onOpen={(id) => go({ kind: "case", id })} />
      )}
    </div>
  );
}

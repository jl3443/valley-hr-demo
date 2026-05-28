import type { Case } from "@/lib/api";
import { StatusPill, RiskPill } from "./StatusPill";
import { ChevronRight } from "lucide-react";

export function CasesTable({ cases, onOpen }: { cases: Case[]; onOpen: (id: string) => void }) {
  if (!cases.length) {
    return (
      <div className="text-center py-12 text-[color:var(--mute)] text-[14px]">
        No cases yet. Start an intake to create one.
      </div>
    );
  }
  return (
    <div className="overflow-hidden border border-[color:var(--divider)] rounded-md bg-white">
      <table className="w-full text-[14px]">
        <thead className="bg-[color:var(--surface-fog)] text-[11px] uppercase tracking-[0.06em] text-[color:var(--mute)]">
          <tr>
            <th className="text-left px-4 py-3 font-bold">Organization</th>
            <th className="text-left px-4 py-3 font-bold">Jurisdiction</th>
            <th className="text-left px-4 py-3 font-bold">Type</th>
            <th className="text-left px-4 py-3 font-bold">Status</th>
            <th className="text-left px-4 py-3 font-bold">Risk</th>
            <th className="text-left px-4 py-3 font-bold">Score</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr
              key={c.id}
              onClick={() => onOpen(c.id)}
              className="border-t border-[color:var(--divider)] hover:bg-[color:var(--surface-fog)] cursor-pointer"
            >
              <td className="px-4 py-3 font-bold">
                {c.organization?.legal_name ?? "—"}
                <div className="text-[11px] font-normal text-[color:var(--mute)]">
                  {c.id.slice(0, 8)}
                </div>
              </td>
              <td className="px-4 py-3">{c.jurisdiction ?? "—"}</td>
              <td className="px-4 py-3 capitalize">{c.case_type}</td>
              <td className="px-4 py-3"><StatusPill status={c.status} /></td>
              <td className="px-4 py-3"><RiskPill risk={c.risk_level} /></td>
              <td className="px-4 py-3 font-bold">{c.risk_score?.toFixed(1) ?? "—"}</td>
              <td className="px-4 py-3 text-right text-[color:var(--mute)]">
                <ChevronRight className="w-4 h-4 inline" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

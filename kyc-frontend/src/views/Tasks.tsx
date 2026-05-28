import * as React from "react";
import { api, type Task } from "@/lib/api";
import { TopRow } from "@/components/blocks/TopRow";
import { Card } from "@/components/ds/card";
import { Chip } from "@/components/ds/chip";

export function Tasks() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.listTasks().then(setTasks).finally(() => setLoading(false));
  }, []);

  return (
    <div className="pl-5 pr-6 pt-4 pb-8 space-y-4 min-h-screen bg-[color-mix(in_srgb,var(--surface-mint)_18%,var(--surface-fog))]">
      <TopRow breadcrumb={{ label: "Tasks", chip: `${tasks.length} open` }} />
      <Card pad={false}>
        {loading ? (
          <div className="text-[14px] text-[color:var(--mute)] py-8 text-center">Loading…</div>
        ) : tasks.length === 0 ? (
          <div className="text-[14px] text-[color:var(--mute)] py-8 text-center">No tasks assigned.</div>
        ) : (
          <table className="w-full text-[14px]">
            <thead className="bg-[color:var(--surface-fog)] text-[11px] uppercase tracking-[0.06em] text-[color:var(--mute)]">
              <tr>
                <th className="text-left px-4 py-3 font-bold">Title</th>
                <th className="text-left px-4 py-3 font-bold">Status</th>
                <th className="text-left px-4 py-3 font-bold">Due</th>
                <th className="text-left px-4 py-3 font-bold">Case</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-t border-[color:var(--divider)]">
                  <td className="px-4 py-3 font-bold">{t.title ?? "—"}</td>
                  <td className="px-4 py-3"><Chip variant={t.status === "done" ? "green" : "sage"}>{t.status ?? "—"}</Chip></td>
                  <td className="px-4 py-3">{t.due_at ?? "—"}</td>
                  <td className="px-4 py-3 text-[color:var(--mute)]">{t.case_id?.slice(0, 8) ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

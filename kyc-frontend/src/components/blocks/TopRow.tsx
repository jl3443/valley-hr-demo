import * as React from "react";
import { Bell, Search } from "lucide-react";
import { Chip } from "@/components/ds/chip";

export function TopRow({
  breadcrumb,
  right,
}: {
  breadcrumb: { label: string; chip?: string };
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <h1 className="text-[20px] font-bold tracking-[-0.01em]">{breadcrumb.label}</h1>
        {breadcrumb.chip && <Chip variant="fog">{breadcrumb.chip}</Chip>}
      </div>
      <div className="flex items-center gap-3 text-[color:var(--mute)]">
        {right}
        <button className="p-2 hover:text-black" aria-label="Search">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-2 hover:text-black" aria-label="Notifications">
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

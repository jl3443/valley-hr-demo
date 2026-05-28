import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  pad = true,
}: {
  children: React.ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-white border border-[color:var(--divider)] rounded-md",
        pad && "p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  eyebrow,
  action,
}: {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div>
        {eyebrow && (
          <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--mute)] mb-1">
            {eyebrow}
          </div>
        )}
        <div className="text-[18px] font-bold tracking-[-0.01em]">{title}</div>
      </div>
      {action}
    </div>
  );
}

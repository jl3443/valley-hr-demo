import { cn } from "@/lib/utils";

export type KPI = {
  label: string;
  value: string | number;
  suffix?: string;
  trend?: { delta: string; direction: "up" | "down" | "flat" };
  highlight?: "yellow";
  onClick?: () => void;
};

const trendTone = {
  up: "text-[color:var(--accent-green-deep)]",
  down: "text-[color:var(--mark-red)]",
  flat: "text-[color:var(--mute)]",
};

export function KPIStrip({ items, cols = 4 }: { items: KPI[]; cols?: 3 | 4 | 5 }) {
  const colsClass = { 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5" } as const;
  return (
    <div className={cn("grid gap-3", colsClass[cols])}>
      {items.map((k) => (
        <article
          key={k.label}
          onClick={k.onClick}
          role={k.onClick ? "button" : undefined}
          tabIndex={k.onClick ? 0 : undefined}
          className={cn(
            "rounded-md px-4 py-3 flex flex-col justify-between h-[92px] transition-all",
            k.highlight === "yellow"
              ? "bg-[color:var(--surface-sage)] border border-[color:var(--surface-sage)] text-[color:var(--accent-green-deep)]"
              : "bg-white border border-[color:var(--divider)]",
            k.onClick && "cursor-pointer hover:shadow-md hover:-translate-y-0.5",
          )}
        >
          <div
            className={cn(
              "text-[11px] tracking-[0.08em] uppercase font-bold",
              k.highlight === "yellow" ? "text-[color:var(--accent-green-deep)]" : "text-[color:var(--mute)]",
            )}
          >
            {k.label}
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="leading-none">
              <span className="text-[24px] leading-[28px] font-bold tracking-[-0.02em]">
                {k.value}
                {k.suffix}
              </span>
            </div>
            {k.trend && (
              <div className={cn("text-[12px] font-bold", trendTone[k.trend.direction])}>
                {k.trend.direction === "up" ? "+" : k.trend.direction === "down" ? "−" : ""}
                {k.trend.delta}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

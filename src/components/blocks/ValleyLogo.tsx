import { cn } from "@/lib/utils";

/**
 * Valley Bank brand mark — uses the official navy PNG captured from valley.com
 * (https://www.valley.com/content/dam/valley/logos/valley-core/valley-logo-blue.png).
 * Saved at public/valley-logo.png.
 *
 * Drop-in replacement for DsmFirmenichLogo — same prop shape, same import sites.
 * `tone` is preserved for API compatibility but the PNG is fixed-color navy;
 * on dark surfaces we fall back to a white wordmark.
 */
export function ValleyLogo({
  tone = "default",
  className,
}: {
  tone?: "default" | "inverse";
  className?: string;
}) {
  if (tone === "inverse") {
    // White wordmark for use on navy headers / dark hero strips
    return (
      <span
        className={cn(
          "inline-flex items-baseline gap-1.5 font-bold tracking-[-0.01em] text-white",
          className,
        )}
        style={{ fontFamily: "var(--font-display)" }}
        aria-label="Valley Bank"
      >
        <span
          className="text-[22px] font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Valley
        </span>
        <span
          className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--valley-yellow)]"
        >
          Bank
        </span>
      </span>
    );
  }
  return (
    <img
      src="/valley-logo.png"
      alt="Valley Bank"
      className={cn("h-7 w-auto shrink-0 object-contain", className)}
    />
  );
}

/**
 * Back-compat re-export so any file importing DsmFirmenichLogo continues to
 * resolve to the Valley mark without code edits. Keeps the diff minimal.
 */
export { ValleyLogo as DsmFirmenichLogo };

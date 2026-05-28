import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "dark" | "deep" | "green" | "sage" | "inline";
type Size = "primary" | "secondary" | "none";

const variantClass: Record<Variant, string> = {
  primary: "bg-white text-black border-[1.5px] border-transparent hover:bg-[color:var(--surface-fog)]",
  secondary: "bg-transparent text-current border-[1.5px] border-current hover:bg-white/10",
  outline: "bg-transparent text-black border-[1.5px] border-black hover:bg-black hover:text-white",
  dark: "bg-black text-white border-[1.5px] border-transparent hover:bg-[color:var(--accent-green-deep)]",
  deep: "bg-[color:var(--accent-green-deep)] text-white border-[1.5px] border-transparent hover:bg-[color:var(--accent-green)]",
  green: "bg-[color:var(--accent-green)] text-white border-[1.5px] border-transparent hover:bg-[color:var(--accent-green-deep)]",
  sage: "bg-[color:var(--surface-sage)] text-black border-[1.5px] border-transparent hover:bg-[color:var(--accent-green)] hover:text-white",
  inline: "text-current bg-transparent border-0 p-0 hover:underline underline-offset-4",
};

const sizeClass: Record<Size, string> = {
  primary: "text-[16px] py-[9px] pl-[15px] pr-[21px] rounded-[9999px]",
  secondary: "text-[14px] py-[9px] px-[15px] rounded-[9999px]",
  none: "text-[14px] p-0 rounded-none",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-green)] transition-colors",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

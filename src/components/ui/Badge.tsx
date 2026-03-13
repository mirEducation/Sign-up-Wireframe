import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "px-3 py-0.5",
    "text-xs font-semibold",
    "rounded-full",
    "select-none",
  ],
  {
    variants: {
      variant: {
        "rose-gold": ["text-[#2A1A14]"],
        gold: ["text-[#1A1200]"],
        silver: ["text-[#1A1A1A]"],
        bronze: ["text-[#1A1200]"],
      },
    },
    defaultVariants: {
      variant: "rose-gold",
    },
  }
);

const gradientMap: Record<string, string> = {
  "rose-gold": "var(--gradient-rose-gold)",
  gold: "var(--gradient-gold)",
  silver: "var(--gradient-silver)",
  bronze: "var(--gradient-bronze)",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant = "rose-gold", style, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      style={{
        background: gradientMap[variant ?? "rose-gold"],
        ...style,
      }}
      {...props}
    />
  );
}

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-medium",
    "transition-all duration-200",
    "rounded-full",
    "cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "sheen",
  ],
  {
    variants: {
      variant: {
        "rose-gold": [
          "text-[#2A1A14]",
          "focus-visible:ring-[var(--color-rose-gold)]",
        ],
        gold: [
          "text-[#1A1200]",
          "border border-transparent",
          "focus-visible:ring-[var(--color-gold)]",
        ],
        silver: [
          "text-[#1A1A1A]",
          "border border-transparent",
          "focus-visible:ring-[var(--color-silver)]",
        ],
        ghost: [
          "bg-transparent",
          "border border-[var(--color-rose-gold)]",
          "text-[var(--color-rose-gold)]",
          "hover:bg-[rgba(183,110,121,0.08)]",
          "focus-visible:ring-[var(--color-rose-gold)]",
        ],
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "rose-gold",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, style, ...props }, ref) => {
    const gradientStyle: React.CSSProperties =
      variant === "rose-gold" || variant === undefined
        ? { background: "var(--gradient-rose-gold)", ...style }
        : variant === "gold"
          ? { background: "var(--gradient-gold)", ...style }
          : variant === "silver"
            ? { background: "var(--gradient-silver)", ...style }
            : { ...style };

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={gradientStyle}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

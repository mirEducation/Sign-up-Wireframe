"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-transparent",
            "border-b-2 border-solid",
            "pb-2 pt-1",
            "text-base",
            "outline-none",
            "transition-all duration-200",
            "placeholder:text-[var(--color-text-muted)]",
            className
          )}
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-body)",
            borderBottomColor: error
              ? "rgba(183, 110, 121, 0.9)"
              : "rgba(168, 169, 173, 0.3)",
            boxShadow: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderBottomColor = error
              ? "rgba(183, 110, 121, 0.9)"
              : "var(--color-rose-gold)";
            e.currentTarget.style.boxShadow = error
              ? "0 2px 8px rgba(183, 110, 121, 0.2)"
              : "0 2px 12px rgba(183, 110, 121, 0.15)";
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderBottomColor = error
              ? "rgba(183, 110, 121, 0.9)"
              : "rgba(168, 169, 173, 0.3)";
            e.currentTarget.style.boxShadow = "none";
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "rgba(183, 110, 121, 0.9)",
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

"use client";

import { motion, useReducedMotion } from "motion/react";
import { luxuryFade } from "./variants";
import { cn } from "@/lib/utils/cn";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const animateWithDelay =
    delay !== undefined
      ? {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
        }
      : "animate";

  return (
    <motion.div
      variants={luxuryFade}
      initial="initial"
      animate={animateWithDelay}
      exit="exit"
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

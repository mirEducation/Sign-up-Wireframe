import type { Variants } from "motion/react";

export const luxuryFade: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "var(--shadow-card)",
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 40px rgba(183, 110, 121, 0.25)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

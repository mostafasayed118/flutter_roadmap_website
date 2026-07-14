export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

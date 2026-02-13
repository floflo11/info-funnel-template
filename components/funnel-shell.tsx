"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { funnelSteps, getStepIndex } from "@/lib/funnel-steps";
import { product } from "@/lib/config";
import type { ReactNode } from "react";

export function FunnelShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const stepIndex = getStepIndex(pathname);
  const progress =
    stepIndex >= 0 ? ((stepIndex + 1) / funnelSteps.length) * 100 : 0;

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      {/* Logo */}
      <div className="pt-8 px-6 max-w-[640px] mx-auto w-full">
        <p className="text-primary font-semibold text-lg tracking-tight">
          {product.influencer.name}
        </p>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col px-6 max-w-[640px] mx-auto w-full pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

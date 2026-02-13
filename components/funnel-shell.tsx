"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { funnelSteps, getStepIndex, getNextStep } from "@/lib/funnel-steps";
import { product } from "@/lib/config";
import type { ReactNode } from "react";

export function FunnelShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const stepIndex = getStepIndex(pathname);
  const progress =
    stepIndex >= 0 ? ((stepIndex + 1) / funnelSteps.length) * 100 : 0;

  // Track whether a client-side navigation has occurred.
  // On the initial render (SSR hydration) we match initial to animate
  // so content appears instantly — no flash of invisible→slide-in.
  const hasNavigated = useRef(false);
  const prevPath = useRef(pathname);
  if (prevPath.current !== pathname) {
    hasNavigated.current = true;
    prevPath.current = pathname;
  }

  // Prefetch the next step so page chunks are ready before the user navigates.
  const nextStep = getNextStep(pathname);
  useEffect(() => {
    if (nextStep) router.prefetch(nextStep);
  }, [nextStep, router]);

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <motion.div
          className="h-full bg-primary"
          initial={false}
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
            initial={
              hasNavigated.current
                ? { opacity: 0, x: 12 }
                : { opacity: 1, x: 0 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

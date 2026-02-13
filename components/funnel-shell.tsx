"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { funnelSteps, getStepIndex, getNextStep } from "@/lib/funnel-steps";
import { product } from "@/lib/config";
import type { ReactNode } from "react";

export function FunnelShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const stepIndex = getStepIndex(pathname);
  const progress =
    stepIndex >= 0 ? ((stepIndex + 1) / funnelSteps.length) * 100 : 0;

  // Prefetch the next step so page chunks are ready before the user navigates.
  const nextStep = getNextStep(pathname);
  useEffect(() => {
    if (nextStep) router.prefetch(nextStep);
  }, [nextStep, router]);

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Progress bar — CSS transition, no Framer Motion */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <div
          className="h-full bg-primary transition-[width] duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Logo */}
      <div className="pt-8 px-6 max-w-[640px] mx-auto w-full">
        <p className="text-primary font-semibold text-lg tracking-tight">
          {product.influencer.name}
        </p>
      </div>

      {/* Content — CSS animation (pageEnter keyframes in globals.css).
          key={pathname} remounts on navigation, replaying the animation.
          No Framer Motion means zero hydration style changes. */}
      <main className="flex-1 flex flex-col px-6 max-w-[640px] mx-auto w-full pb-32">
        <div key={pathname} className="flex-1 flex flex-col page-enter">
          {children}
        </div>
      </main>
    </div>
  );
}

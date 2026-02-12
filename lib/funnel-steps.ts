export type FunnelStep = {
  path: string;
  label: string;
};

export const funnelSteps: FunnelStep[] = [
  { path: "/", label: "Welcome" },
  { path: "/goal", label: "Goal" },
  { path: "/insight", label: "Insight" },
  { path: "/approach", label: "Approach" },
  { path: "/promise", label: "Promise" },
  { path: "/qualify", label: "About You" },
  { path: "/about-you", label: "Contact" },
  { path: "/motivation", label: "Motivation" },
  { path: "/proof", label: "Proof" },
  { path: "/checkout", label: "Checkout" },
];

export function getStepIndex(path: string): number {
  return funnelSteps.findIndex((s) => s.path === path);
}

export function getNextStep(currentPath: string): string | null {
  const idx = getStepIndex(currentPath);
  if (idx === -1 || idx >= funnelSteps.length - 1) return null;
  return funnelSteps[idx + 1].path;
}

export function getPrevStep(currentPath: string): string | null {
  const idx = getStepIndex(currentPath);
  if (idx <= 0) return null;
  return funnelSteps[idx - 1].path;
}

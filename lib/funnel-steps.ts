export type FunnelStep = {
  path: string;
  label: string;
};

export const funnelSteps: FunnelStep[] = [
  // Part 1: Diagnostic Survey (Screens 0-4)
  { path: "/", label: "Welcome" },
  { path: "/hook", label: "Hook" },
  { path: "/frustration", label: "Frustration" },
  { path: "/experience", label: "Experience" },
  { path: "/goal", label: "Goal" },

  // Part 2: Value Reinforcement (Screens 5-10)
  { path: "/insight", label: "Pivot" },
  { path: "/approach", label: "Architecture" },
  { path: "/promise", label: "Burden Transfer" },
  { path: "/role", label: "Your Role" },
  { path: "/shift", label: "Structural Shift" },
  { path: "/results", label: "Compounding" },

  // Part 3: Qualification + Lead Capture
  { path: "/qualify", label: "Qualify" },
  { path: "/about-you", label: "Contact" },
  { path: "/motivation", label: "Motivation" },
  { path: "/proof", label: "Proof" },

  // Part 4: Checkout (Screen 11)
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

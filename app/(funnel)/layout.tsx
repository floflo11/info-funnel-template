import { FunnelProvider } from "@/components/funnel-provider";
import { FunnelShell } from "@/components/funnel-shell";
import type { ReactNode } from "react";

export default function FunnelLayout({ children }: { children: ReactNode }) {
  return (
    <FunnelProvider>
      <FunnelShell>{children}</FunnelShell>
    </FunnelProvider>
  );
}

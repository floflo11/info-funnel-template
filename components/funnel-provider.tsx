"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type FunnelResponses = Record<string, unknown>;

type FunnelContextType = {
  responses: FunnelResponses;
  setResponse: (key: string, value: unknown) => void;
  leadId: string | null;
  setLeadId: (id: string) => void;
};

const FunnelContext = createContext<FunnelContextType | null>(null);

const STORAGE_KEY = "funnel-responses";
const LEAD_KEY = "funnel-lead-id";

export function FunnelProvider({ children }: { children: ReactNode }) {
  // Initialize with stable defaults so SSR and client produce identical HTML.
  // localStorage is read in useEffect after hydration — no mismatch.
  const [responses, setResponses] = useState<FunnelResponses>({});
  const [leadId, setLeadIdState] = useState<string | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setResponses(JSON.parse(stored));
    } catch {}
    setLeadIdState(localStorage.getItem(LEAD_KEY));
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  }, [responses]);

  const setResponse = useCallback((key: string, value: unknown) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setLeadId = useCallback((id: string) => {
    setLeadIdState(id);
    localStorage.setItem(LEAD_KEY, id);
  }, []);

  return (
    <FunnelContext.Provider value={{ responses, setResponse, leadId, setLeadId }}>
      {children}
    </FunnelContext.Provider>
  );
}

export function useFunnel() {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnel must be used within FunnelProvider");
  return ctx;
}

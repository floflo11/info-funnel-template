"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
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
  const [responses, setResponses] = useState<FunnelResponses>(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [leadId, setLeadIdState] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(LEAD_KEY);
  });

  useEffect(() => {
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

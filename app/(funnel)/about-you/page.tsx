"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepInput } from "@/components/step-input";
import { useFunnel } from "@/components/funnel-provider";

export default function AboutYouPage() {
  const router = useRouter();
  const { responses, setResponse, setLeadId } = useFunnel();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: Record<string, string>) => {
    setSubmitting(true);
    try {
      setResponse("about_you", values);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          funnelResponses: { ...responses, about_you: values },
          source:
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search).get("ref") || undefined
              : undefined,
        }),
      });

      if (res.ok) {
        const { id } = await res.json();
        setLeadId(id);
      }

      router.push("/motivation");
    } catch {
      router.push("/motivation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StepInput
      question="Where should we send your results?"
      subtitle="We'll use this to deliver your purchase."
      fields={[
        {
          key: "name",
          label: "Name",
          type: "text",
          placeholder: "Your name",
          required: false,
        },
        {
          key: "email",
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
          required: true,
        },
      ]}
      onSubmit={handleSubmit}
    />
  );
}

"use client";

import { useRouter } from "next/navigation";
import { StepInput } from "@/components/step-input";
import { useFunnel } from "@/components/funnel-provider";
import { platform } from "@/lib/config";

export default function AboutYouPage() {
  const router = useRouter();
  const { responses, setResponse, setLeadId } = useFunnel();

  const handleSubmit = (values: Record<string, string>) => {
    setResponse("about_you", values);

    // Fire-and-forget lead capture — don't block navigation
    fetch(`${platform.url}/api/worker/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        founderId: platform.founderId,
        email: values.email,
        name: values.name,
        funnelResponses: { ...responses, about_you: values },
        source:
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("ref") ||
              undefined
            : undefined,
      }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.id) setLeadId(data.id);
      })
      .catch(() => {});

    router.push("/motivation");
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

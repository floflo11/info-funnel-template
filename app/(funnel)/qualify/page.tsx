"use client";

import { useRouter } from "next/navigation";
import { StepInput } from "@/components/step-input";
import { useFunnel } from "@/components/funnel-provider";

export default function QualifyPage() {
  const router = useRouter();
  const { setResponse } = useFunnel();

  return (
    <StepInput
      question="Tell us a bit about yourself"
      subtitle="This helps us personalize your experience."
      fields={[
        {
          key: "experience",
          label: "Experience level",
          type: "select",
          required: true,
          options: [
            { value: "beginner", label: "Beginner — just starting out" },
            { value: "intermediate", label: "Intermediate — some experience" },
            { value: "advanced", label: "Advanced — looking for an edge" },
          ],
        },
      ]}
      onSubmit={(values) => {
        setResponse("qualify", values);
        router.push("/about-you");
      }}
    />
  );
}

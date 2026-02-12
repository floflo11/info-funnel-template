import { StepChoice } from "@/components/step-choice";

export default function ApproachPage() {
  return (
    <StepChoice
      questionKey="approach"
      question="How do you prefer to learn?"
      currentPath="/approach"
      options={[
        { value: "self_paced", label: "Self-paced — I'll read and apply on my own" },
        { value: "guided", label: "Guided — I want a clear step-by-step plan" },
      ]}
    />
  );
}

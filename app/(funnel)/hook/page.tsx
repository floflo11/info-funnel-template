import { StepChoice } from "@/components/step-choice";

export default function HookPage() {
  return (
    <StepChoice
      questionKey="hook"
      question="How long have you been trying to grow your brand?"
      currentPath="/hook"
      options={[
        { value: "just_starting", label: "Just getting started" },
        { value: "few_months", label: "A few months" },
        { value: "over_a_year", label: "Over a year" },
        { value: "multiple_attempts", label: "Multiple failed attempts" },
      ]}
    />
  );
}

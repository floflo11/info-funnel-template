import { StepChoice } from "@/components/step-choice";

export default function QualifyPage() {
  return (
    <StepChoice
      questionKey="qualify"
      question="Where are you in your journey?"
      currentPath="/qualify"
      options={[
        { value: "beginner", label: "Beginner — just starting out" },
        { value: "intermediate", label: "Intermediate — some traction" },
        { value: "advanced", label: "Advanced — ready to scale" },
      ]}
    />
  );
}

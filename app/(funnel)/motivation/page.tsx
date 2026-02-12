import { StepChoice } from "@/components/step-choice";

export default function MotivationPage() {
  return (
    <StepChoice
      questionKey="motivation"
      question="What would achieving this goal mean for you?"
      multi
      currentPath="/motivation"
      options={[
        { value: "income", label: "Earning more income" },
        { value: "freedom", label: "More time freedom" },
        { value: "impact", label: "Making an impact on others" },
        { value: "confidence", label: "Feeling more confident" },
        { value: "legacy", label: "Building a lasting legacy" },
      ]}
    />
  );
}

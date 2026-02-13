import { StepChoice } from "@/components/step-choice";

export default function FrustrationPage() {
  return (
    <StepChoice
      questionKey="frustration"
      question="Which of these is the most frustrating?"
      currentPath="/frustration"
      options={[
        { value: "no_direction", label: "Not knowing what to focus on" },
        { value: "no_results", label: "Putting in effort but seeing no results" },
        { value: "overwhelm", label: "Too much advice, not enough clarity" },
        { value: "no_audience", label: "Can't seem to build an audience" },
      ]}
    />
  );
}

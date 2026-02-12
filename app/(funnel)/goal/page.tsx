import { StepChoice } from "@/components/step-choice";

export default function GoalPage() {
  return (
    <StepChoice
      questionKey="goal"
      question="What's your biggest challenge right now?"
      currentPath="/goal"
      options={[
        { value: "getting_started", label: "Getting started — I don't know where to begin" },
        { value: "scaling", label: "Scaling — I've started but I'm stuck" },
        { value: "monetizing", label: "Monetizing — I have an audience but no income" },
        { value: "time", label: "Time — I'm too busy to figure this out" },
        { value: "unsure", label: "Not sure, I just want to learn" },
      ]}
    />
  );
}

import { StepChoice } from "@/components/step-choice";

export default function ExperiencePage() {
  return (
    <StepChoice
      questionKey="experience"
      question="What have you tried before?"
      currentPath="/experience"
      options={[
        { value: "nothing", label: "Nothing yet" },
        { value: "free_content", label: "Free content (YouTube, blogs, podcasts)" },
        { value: "paid_courses", label: "Paid courses or programs" },
        { value: "coaching", label: "Coaching or consulting" },
      ]}
    />
  );
}

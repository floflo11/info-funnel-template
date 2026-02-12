import { StepTestimonials } from "@/components/step-testimonials";

export default function ProofPage() {
  return (
    <StepTestimonials
      heading="Real results start here"
      subheading="Join thousands who've already transformed their business."
      currentPath="/proof"
      testimonials={[
        {
          name: "Sarah M.",
          age: 28,
          result: "Earned $12K in 3 months",
          quote: "This changed everything for me.",
        },
        {
          name: "James T.",
          age: 35,
          result: "Quit his 9-to-5",
          quote: "Finally free to work on my own terms.",
        },
        {
          name: "Maria L.",
          age: 42,
          result: "10K followers → 6-figure business",
          quote: "The step-by-step system made it easy.",
        },
        {
          name: "David K.",
          age: 31,
          result: "Launched in 2 weeks",
          quote: "I was overthinking it. This made it simple.",
        },
      ]}
    />
  );
}

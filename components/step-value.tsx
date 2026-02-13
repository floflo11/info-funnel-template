"use client";

import { useRouter } from "next/navigation";
import { getNextStep } from "@/lib/funnel-steps";

export function StepValue({
  heading,
  body,
  currentPath,
}: {
  heading: string;
  body: string;
  currentPath: string;
}) {
  const router = useRouter();
  const next = getNextStep(currentPath);

  return (
    <div className="pt-6 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
          {heading}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">{body}</p>
      </div>
      {next && (
        <div className="fixed bottom-8 right-6">
          <button
            onClick={() => router.push(next)}
            className="bg-foreground text-surface px-6 py-3 rounded-full font-medium flex items-center gap-2"
          >
            Next <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </div>
  );
}

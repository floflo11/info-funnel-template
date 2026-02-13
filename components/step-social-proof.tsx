"use client";

import { useRouter } from "next/navigation";
import { getNextStep } from "@/lib/funnel-steps";

export function StepSocialProof({
  stat,
  caption,
  subcaption,
  imageSrc,
  currentPath,
}: {
  stat: string;
  caption: string;
  subcaption?: string;
  imageSrc?: string;
  currentPath: string;
}) {
  const router = useRouter();
  const next = getNextStep(currentPath);

  return (
    <div className="pt-6 flex-1 flex flex-col">
      <div className="rounded-3xl overflow-hidden card-gradient text-white p-8 flex-1 flex flex-col justify-center relative">
        {imageSrc && (
          <div
            className="absolute inset-0 opacity-30 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        )}
        <div className="relative z-10">
          <p className="text-6xl sm:text-7xl font-bold mb-4">{stat}</p>
          <p className="text-xl sm:text-2xl leading-snug">
            {caption.split("*").map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} className="text-accent">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </p>
        </div>
      </div>
      {subcaption && (
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          {subcaption}
        </p>
      )}
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

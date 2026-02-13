"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getNextStep } from "@/lib/funnel-steps";

type Testimonial = {
  name: string;
  age?: number;
  quote: string;
  result: string;
  imageSrc?: string;
};

export function StepTestimonials({
  heading,
  subheading,
  testimonials,
  currentPath,
}: {
  heading: string;
  subheading?: string;
  testimonials: Testimonial[];
  currentPath: string;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = getNextStep(currentPath);

  return (
    <div className="pt-6 flex-1 flex flex-col">
      <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
        Verified customers
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{heading}</h1>
      {subheading && <p className="text-gray-500 mb-6">{subheading}</p>}

      <div className="flex-1 overflow-hidden min-h-[280px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {testimonials
              .slice(currentIndex * 2, currentIndex * 2 + 2)
              .map((t) => (
                <div
                  key={t.name}
                  className="bg-amber-50/50 rounded-2xl p-5 flex flex-col items-center text-center"
                >
                  {t.imageSrc && (
                    <div className="w-full aspect-square rounded-xl bg-gray-200 mb-4 overflow-hidden">
                      <img
                        src={t.imageSrc}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-primary text-sm font-medium">
                    {t.name}
                    {t.age ? `, ${t.age}` : ""}
                  </p>
                  <p className="text-lg font-bold mt-1">{t.result}</p>
                  <p className="text-sm text-gray-500 mt-1">{t.quote}</p>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({
          length: Math.ceil(testimonials.length / 2),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === currentIndex ? "bg-foreground" : "bg-gray-300"
            }`}
          />
        ))}
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

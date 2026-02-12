"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getNextStep } from "@/lib/funnel-steps";
import { useFunnel } from "./funnel-provider";
import { ContinueButton } from "./continue-button";

type Option = {
  value: string;
  label: string;
};

export function StepChoice({
  questionKey,
  question,
  options,
  multi = false,
  currentPath,
}: {
  questionKey: string;
  question: string;
  options: Option[];
  multi?: boolean;
  currentPath: string;
}) {
  const router = useRouter();
  const { setResponse } = useFunnel();
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (multi) {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    } else {
      setResponse(questionKey, value);
      const next = getNextStep(currentPath);
      if (next) router.push(next);
    }
  };

  const handleContinue = () => {
    setResponse(questionKey, selected);
    const next = getNextStep(currentPath);
    if (next) router.push(next);
  };

  return (
    <div className="pt-6">
      <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-8">
        {question}
      </h1>
      {multi && (
        <p className="text-gray-500 mb-4 text-sm">Select all that apply.</p>
      )}
      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(opt.value)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-colors
                ${isSelected ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
            >
              <span className="text-base font-medium">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>
      {multi && (
        <ContinueButton
          onClick={handleContinue}
          disabled={selected.length === 0}
        />
      )}
    </div>
  );
}

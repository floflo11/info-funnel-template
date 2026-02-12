"use client";

import { motion } from "framer-motion";

export function ContinueButton({
  onClick,
  disabled = false,
  label = "Continue",
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface via-surface to-transparent">
      <div className="max-w-[640px] mx-auto">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          disabled={disabled}
          className="w-full py-4 rounded-full bg-foreground text-surface font-medium text-lg
                     disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        >
          {label}
        </motion.button>
      </div>
    </div>
  );
}

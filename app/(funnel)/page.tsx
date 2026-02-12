"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { product } from "@/lib/config";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/goal"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="w-24 h-24 rounded-3xl bg-primary/10 mx-auto flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">
            {product.influencer.name.charAt(0)}
          </span>
        </div>
        <h1 className="text-2xl font-bold">{product.influencer.name}</h1>
        <p className="text-gray-500">{product.name}</p>

        <div className="flex justify-center gap-1.5 pt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

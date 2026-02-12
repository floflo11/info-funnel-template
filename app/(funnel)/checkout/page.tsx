"use client";

import { motion } from "framer-motion";
import { product } from "@/lib/config";

export default function CheckoutPage() {
  const price = (product.priceInCents / 100).toFixed(2);

  return (
    <div className="pt-6 flex-1 flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
        You're ready.
      </h1>
      <p className="text-gray-500 mb-8">
        Get instant access to{" "}
        <span className="text-foreground font-medium">{product.name}</span>.
      </p>

      <div className="rounded-3xl border-2 border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {product.description}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">One-time payment</span>
            <span className="text-2xl font-bold">${price}</span>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span> Instant PDF download
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span> Delivered to your email
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span> Lifetime access
          </li>
        </ul>
      </div>

      <motion.a
        whileTap={{ scale: 0.98 }}
        href={product.paymentLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 rounded-full bg-primary text-white font-bold text-lg
                   text-center block transition-opacity hover:opacity-90"
      >
        {`Get It Now — $${price}`}
      </motion.a>

      <p className="text-xs text-gray-400 text-center mt-4">
        Secure checkout powered by Stripe. 100% money-back guarantee.
      </p>
    </div>
  );
}

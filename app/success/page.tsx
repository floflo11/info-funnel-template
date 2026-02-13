"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { product, platform } from "@/lib/config";

type DownloadState =
  | { status: "loading" }
  | { status: "ready"; downloadUrl: string; filename: string }
  | { status: "fallback" };

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [download, setDownload] = useState<DownloadState>(
    sessionId ? { status: "loading" } : { status: "fallback" }
  );

  useEffect(() => {
    if (!sessionId) return;

    fetch(
      `${platform.url}/api/products/session-download?session_id=${encodeURIComponent(sessionId)}`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.downloadUrl) {
          setDownload({
            status: "ready",
            downloadUrl: data.downloadUrl,
            filename: data.filename,
          });
        } else {
          setDownload({ status: "fallback" });
        }
      })
      .catch(() => setDownload({ status: "fallback" }));
  }, [sessionId]);

  return (
    <>
      {download.status === "loading" && (
        <div className="mb-6">
          <p className="text-gray-500 mb-4">Preparing your download...</p>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {download.status === "ready" && (
        <div className="mb-6">
          <p className="text-gray-500 mb-4">
            <strong>{product.name}</strong> is ready.
          </p>
          <motion.a
            href={download.downloadUrl}
            download={download.filename}
            whileTap={{ scale: 0.98 }}
            className="inline-block w-full py-4 rounded-full bg-primary text-white font-bold text-lg
                       text-center transition-opacity hover:opacity-90"
          >
            Download Now
          </motion.a>
          <p className="text-sm text-gray-400 mt-4">
            We&apos;ve also sent a copy to your email as a backup.
          </p>
        </div>
      )}

      {download.status === "fallback" && (
        <div className="mb-6">
          <p className="text-gray-500 mb-4">
            We&apos;ve sent <strong>{product.name}</strong> to your email. Check
            your inbox (and spam folder) for the download link.
          </p>
        </div>
      )}
    </>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-6 flex items-center justify-center">
          <span className="text-3xl">&#10003;</span>
        </div>
        <h1 className="text-2xl font-bold mb-3">You&apos;re in!</h1>

        <Suspense
          fallback={
            <div className="mb-6">
              <p className="text-gray-500 mb-4">Loading...</p>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>

        <p className="text-sm text-gray-400">
          Didn&apos;t get it? The link will arrive within a few minutes. If it
          doesn&apos;t show up, contact{" "}
          <span className="text-primary">{product.influencer.name}</span>.
        </p>
      </div>
    </div>
  );
}

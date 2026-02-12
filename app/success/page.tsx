import { product } from "@/lib/config";

export default function SuccessPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 mx-auto mb-6 flex items-center justify-center">
          <span className="text-3xl">&#10003;</span>
        </div>
        <h1 className="text-2xl font-bold mb-3">You&apos;re in!</h1>
        <p className="text-gray-500 mb-6">
          We&apos;ve sent <strong>{product.name}</strong> to your email. Check
          your inbox (and spam folder) for the download link.
        </p>
        <p className="text-sm text-gray-400">
          Didn&apos;t get it? The link will arrive within a few minutes. If it
          doesn&apos;t show up, contact{" "}
          <span className="text-primary">{product.influencer.name}</span>.
        </p>
      </div>
    </div>
  );
}

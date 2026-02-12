import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Info Funnel Template",
  description: "A high-converting funnel for selling info products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

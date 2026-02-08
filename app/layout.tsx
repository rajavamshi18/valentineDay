import React from "react"
import type { Metadata, Viewport } from "next";
import { Dancing_Script, Lora } from "next/font/google";

import "./globals.css";

const _dancingScript = Dancing_Script({ subsets: ["latin"] });
const _lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
  description: "A special Valentine's Day surprise just for you",
};

export const viewport: Viewport = {
  themeColor: "#e11d73",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}

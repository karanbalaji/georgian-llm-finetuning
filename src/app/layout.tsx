import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fine-Tune & Ship | Builder Series S1",
  description:
    "Fine-tune a model with Georgian's LLM Fine-Tuning Toolkit, deploy it on Render, and ship something real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&f[]=zodiak@400,500&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mockify.ai - Generate AI Mock Tests Instantly",
  description: "Upload your PDFs or paste text and instantly generate production-quality mock tests. Practice smarter with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={cn(
          inter.variable,
          "font-sans antialiased min-h-screen flex flex-col"
        )}
      >
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}

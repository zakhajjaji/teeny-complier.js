import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teeny Compiler: Build a JavaScript Compiler from Scratch",
  description: "Interactive JavaScript compiler visualisation. Learn how compilers work by seeing tokenisation, parsing, and code generation in action. Perfect for aspiring software engineers.",
  keywords: ["compiler", "javascript", "tokeniser", "parser", "AST", "code generation", "programming education"],
  authors: [{ name: "Teeny Compiler" }],
  openGraph: {
    title: "Teeny Compiler: Build a JavaScript Compiler from Scratch",
    description: "Interactive JavaScript compiler visualisation. Learn how compilers work step-by-step.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-25">
          {children}
        </div>
      </body>
    </html>
  );
}

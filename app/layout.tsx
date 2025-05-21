// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamid Portfolio",
  description:
    "Mian Hamid Ur Rehman - Full Stack Developer portfolio created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="1239e794-916b-4d7c-99a8-5ab6a7630f08"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <ToastContainer position="bottom-right" autoClose={2000} />
        <Navbar />
        <section className="w-full">{children}</section>
        <Footer />
      </body>
    </html>
  );
}

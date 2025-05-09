// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <AuthProvider>
          <ToastContainer position="bottom-right" autoClose={2000} />
          <main className="h-fit md:h-screen flex flex-col items-center w-full text-[#000000] dark:text-[#FFFFFF] bg-[#FFFFFF] dark:bg-[#000011]">
            <Navbar />
            <section className="w-full h-full">
              {children}
            </section>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

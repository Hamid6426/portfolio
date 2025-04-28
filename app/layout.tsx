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
  description: "Mian Hamid Ur Rehman - Full Stack Developer portfolio created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}>
        <AuthProvider>
          <ToastContainer position="top-center" autoClose={2000} />
          <main className="bg-[#000011] min-h-screen flex flex-col justify-center items-center w-full">
            <section className="h-[5.5rem] sm:h-24 w-full">
              <Navbar />
            </section>
            <section className="h-[calc(100vh_-_6rem)] w-full">{children}</section>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

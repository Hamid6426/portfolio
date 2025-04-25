"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react"; // ✅ import useState
import { useAuth } from "@/contexts/AuthContext";
import { MdClose, MdMenu } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, isUserLoading } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const excludedBasePaths = ["/donor", "/receiver", "/admin"];
  const shouldHideNavbar = excludedBasePaths.some((basePath) => pathname.startsWith(basePath));
  if (shouldHideNavbar) return null;

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Desktop Navbar */}
      <nav className="hidden h-14 px-2 md:px-4 bg-green-100 md:flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-green-500">
          SHARE n CARE
        </Link>

        <div className="flex gap-6 items-center text-green-500 text-sm font-bold">
          <Link href="/about" className="hover:text-green-600">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-green-600">
            CONTACT
          </Link>
          <Link href="/demo" className="hover:text-green-600">
            DEMO
          </Link>
          <Link href="/listing" className="hover:text-green-600">
            LISTING
          </Link>
        </div>

        <div className="flex gap-6 items-center text-green-500 text-sm font-bold">
          {!isUserLoading && currentUser ? (
            <Link href={`/${currentUser.role}`} className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
              DASHBOARD
            </Link>
          ) : (
            <Link href="/signin" className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
              SIGN IN
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden h-14 w-full px-2 md:px-4 bg-green-100 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-green-500">
          SHARE n CARE
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="cursor-pointer">
          {isMobileMenuOpen ? <MdClose className="text-3xl mt-1 text-green-500" /> : <MdMenu className="text-3xl mt-1 text-green-500" />}
        </button>
      </div>

      {/* Mobile Navbar */}
      {isMobileMenuOpen && (
        <nav className="md:hidden h-screen w-full px-2 md:px-4 bg-green-100 flex flex-col justify-start items-center gap-6 text-green-500 text-sm font-bold">
          <Link href="/" className="font-black text-2xl text-green-500 mt-2">
            SHARE n CARE
          </Link>
          <div className="text-center flex flex-col gap-6 items-center text-green-500 text-sm font-bold w-full max-w-[200px]">
            <Link href="/about" className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
              ABOUT
            </Link>
            <Link href="/contact" className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
              CONTACT
            </Link>
            <Link href="/demo" className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
              DEMO
            </Link>
            <Link href="/listing" className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
              LISTING
            </Link>
            {!isUserLoading && currentUser ? (
              <Link href={`/${currentUser.role}`} className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
                DASHBOARD
              </Link>
            ) : (
              <Link href="/signin" className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md">
                SIGN IN
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

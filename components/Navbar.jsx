"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SocialLinkBalls from "./SocialLinkBalls";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const excludedBasePaths = ["/donor", "/receiver", "/admin", "/error"];
  const shouldHideNavbar = excludedBasePaths.some((basePath) => pathname.startsWith(basePath));
  if (shouldHideNavbar) return null;

  return (
    <header className="sticky top-0  w-full border-b border-primary ">
      <nav className="mx-auto z-50 bg-background max-w-6xl w-full h-[4rem] flex justify-between items-center rounded-full text-text px-3 md:px-6">
        <Link href="/" className="text-lg md:text-2xl font-bold">
          Mian Hamid Ur Rehman <span className="text-[#ff0044]">.</span>
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-bold">
          <Link href="/" className="hover:text-accent">
            HOME
          </Link>
          <Link href="/about" className="hover:text-accent">
            ABOUT
          </Link>
          <Link href="/projects" className="hover:text-accent">
            PROJECTS
          </Link>
        </div>

        <Link href="/contact" className="hidden md:block bg-primary text-text px-6 py-1 hover:bg-accent font-bold">
          Let's Talk
        </Link>

        <div className="md:hidden flex gap-6 justify-between items-center text-[#fff] font-bold">
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <MdMenu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="relative">
          <nav className="h-[calc(100vh_-_4rem)] bg-background flex flex-col gap-6 text-white font-bold text-center justify-center items-center absolute top-[4  rem] h-screen w-full">
            <Link href="/" className="shadow-[0_0_10px_1px_#fff] bg-[#002] w-40 py-2  hover:text-accent">
              HOME
            </Link>
            <Link href="/" className="shadow-[0_0_10px_1px_#fff] bg-[#002] w-40 py-2  hover:text-accent">
              ABOUT
            </Link>
            <Link href="/" className="shadow-[0_0_10px_1px_#fff] bg-[#002] w-40 py-2  hover:text-accent">
              CONTACT
            </Link>
            <Link href="/" className="shadow-[0_0_10px_1px_#fff] bg-[#002] w-40 py-2  hover:text-accent">
              PROJECTS
            </Link>
            <Link href="/contact" className="bg-primary text-text px-6 py-1 hover:bg-accent font-bold">
              Let's Talk
            </Link>
            <SocialLinkBalls />
          </nav>
        </div>
      )}
    </header>
  );
}

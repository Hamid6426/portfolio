"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SocialLinkBalls from "./SocialLinkBalls";
import { MdMenu } from "react-icons/md";
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
          <Link href="/services" className="hover:text-accent">
            SERVICES
          </Link>
          <Link href="/testimonials" className="hover:text-accent">
            TESTIMONIALS
          </Link>
        </div>

        <Link href="/contact" className="hidden md:block bg-primary text-text px-6 py-1 hover:bg-accent font-bold">
          Let's Talk
        </Link>

        <div className="md:hidden flex gap-6 justify-between items-center text-[#fff] font-bold ">
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <MdMenu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="relative w-full bg-background translate-y-[1px]">
          <nav className="h-[calc(100vh_-_4rem)] bg-background flex flex-col gap-6 text-white font-bold text-center justify-start pt-12 items-center absolute w-full">
            <Link href="/" className="bg-primary w-full max-w-60 py-2 hover:bg-accent">
              HOME
            </Link>
            <Link href="/" className="bg-primary w-full max-w-60 py-2 hover:bg-accent">
              ABOUT
            </Link>
            <Link href="/" className="bg-primary w-full max-w-60 py-2 hover:bg-accent">
              CONTACT
            </Link>
            <Link href="/" className="bg-primary w-full max-w-60 py-2 hover:bg-accent">
              PROJECTS
            </Link>
            <Link href="/contact" className="bg-primary text-text w-full max-w-60 py-2 hover:bg-accent font-bold">
              Let's Talk
            </Link>
            <SocialLinkBalls />
          </nav>
        </div>
      )}
    </header>
  );
}

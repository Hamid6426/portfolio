"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const excludedBasePaths = ["/donor", "/receiver", "/admin", "/error"];
  const shouldHideNavbar = excludedBasePaths.some((basePath) =>
    pathname.startsWith(basePath)
  );
  if (shouldHideNavbar) return null;

  return (
    <header className="sticky top-0 w-full border-b border-primary z-50  bg-[#FFFFFF] dark:bg-[#000011] ">
      <nav className="relative mx-auto text-[#000000] dark:text-[#FFFFFF] max-w-7xl w-full h-14 flex justify-between items-center px-3 2xl:px-0">
        <Link href="/" className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold">
          Mian Hamid <span className="hidden sm:inline">Ur Rehman </span><span className="text-[#ff0044]">.</span>
        </Link>

        <div className="hidden lg:flex gap-3 lg:gap-5 xl:gap-6 text-sm font-bold">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
          <Link href="/projects" className="hover:text-accent">
            Projects
          </Link>
          <Link href="/services" className="hover:text-accent">
            Services
          </Link>
          <Link href="/testimonials" className="hover:text-accent">
            Testimonials
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          <ThemeSwitch />
          <Link
            href="/contact"
            className="hidden lg:block bg-primary px-4 py-1 hover:bg-accent text-white font-bold"
          >
            Let's Talk
          </Link>

          <div className="lg:hidden flex gap-6 justify-between items-center text-primary font-bold">
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              {menuOpen ? (
                <MdClose className="cursor-pointer w-7 h-7" />
              ) : (
                <MdMenu className="cursor-pointer w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-background border-primary border-l border-b border-t py-3 px-4 max-w-40 w-full absolute text-sm top-12 right-0 text-center shadow-md transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-3 text-white font-bold text-center text-xs items-center w-full">
          <Link href="/" className="bg-primary w-full py-2 hover:bg-accent">
            Home
          </Link>
          <Link
            href="/about"
            className="bg-primary w-full py-2 hover:bg-accent"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="bg-primary w-full py-2 hover:bg-accent"
          >
            Contact
          </Link>
          <Link
            href="/projects"
            className="bg-primary w-full py-2 hover:bg-accent"
          >
            Projects
          </Link>
          <Link
            href="/services"
            className="bg-primary w-full py-2 hover:bg-accent"
          >
            Services
          </Link>
          <Link
            href="/testimonials"
            className="bg-primary w-full py-2 hover:bg-accent"
          >
            Testimonials
          </Link>
          <Link
            href="/contact"
            className="bg-primary w-full py-2 hover:bg-accent font-bold"
          >
            Let's Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}

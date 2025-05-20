"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const excludedBasePaths = ["/donor", "/receiver", "/admin", "/error"];
  const shouldHideNavbar = excludedBasePaths.some((basePath) =>
    pathname.startsWith(basePath)
  );
  if (shouldHideNavbar) return null;

  return (
    <header className="fixed top-0 w-full z-50 border-b border-primary bg-background text-paragraph">
      <nav className="relative mx-auto max-w-7xl w-full h-10 flex justify-between items-center px-3 2xl:px-0">
        {/* Logo */}
        <Link href="/" className="text-lg font-extrabold">
          <h1
            className="tracking-tight leading-tight"
            style={{
              animation:
                "pulseGlowFrost 5s infinite cubic-bezier(0.4, 0, 0.6, 1)",
              display: "inline-block",
              willChange: "transform, color, text-shadow",
            }}
          >
            MIAN HAMID <span className="text-nowrap">UR REHMAN</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-3 lg:gap-5 xl:gap-6 text-xs font-bold">
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
          {/* <Link href="/services" className="hover:text-accent">
            Services
          </Link> */}
            {/* <Link href="/testimonials" className="hover:text-accent">
              Testimonials
            </Link> */}
          <Link
            href="/contact"
            className="hidden lg:block bg-primary px-3 py-1 text-xs hover:bg-accent text-white font-bold"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Menu Button (Mobile) */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden"
        >
          {menuOpen ? (
            <MdClose className="w-7 h-7 text-primary" />
          ) : (
            <MdMenu className="w-7 h-7 text-primary" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-background border-primary border-l border-b border-t py-3 px-4 max-w-40 w-full absolute text-sm top-12 right-0 text-center shadow-md transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-3 font-bold text-xs items-center w-full text-white">
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
          {/* <Link
            href="/services"
            className="bg-primary w-full py-2 hover:bg-accent"
          >
            Services
          </Link> */}
          {/* <Link
            href="/testimonials"
            className="bg-primary w-full py-2 hover:bg-accent"
          >
            Testimonials
          </Link> */}
          <Link
            href="/contact"
            className="bg-primary w-full py-2 hover:bg-accent font-bold"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}

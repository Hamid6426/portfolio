"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const excludedBasePaths = ["/donor", "/receiver", "/admin", "/error"];
  const shouldHideNavbar = excludedBasePaths.some((basePath) => pathname.startsWith(basePath));
  if (shouldHideNavbar) return null;

  return (
    <header className="sticky top-0 z-50 shadow-md px-3 sm:px-6 py-6 w-full">
      <nav className="w-full h-10 sm:h-12 shadow-[0_0_12px_2px_#A0F] flex justify-center items-center rounded-full">
        <div className="w-full flex px-6 sm:px-0 gap-3 sm:gap-6 justify-between sm:justify-center items-center text-[#A0F] text-[0.6rem] sm:text-xs font-bold">
          <Link href="/" className="hover:text-[#f0A]">
            HOME
          </Link>
          <Link href="/about" className="hover:text-[#f0A]">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-[#f0A]">
            CONTACT
          </Link>
          <Link href="/projects" className="hover:text-[#f0A]">
            PROJECTS
          </Link>
        </div>
      </nav>
    </header>
  );
}

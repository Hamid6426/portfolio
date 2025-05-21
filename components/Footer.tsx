"use client";

import React from "react";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/hamid6426" },
  { label: "LinkedIn", href: "https://linkedin.com/in/hamid6426" },
  { label: "Gmail", href: "mailto:mianhamid6426@gmail.com" },
  { label: "Phone", href: "https://api.whatsapp.com/send?phone=923349229907" },
  { label: "Fiverr", href: "https://www.fiverr.com/hamid6426" },
];

const Footer = () => (
  <footer className="fixed bottom-0 w-full z-60 bg-background">
    <div className="relative w-full py-2 px-3 2xl:px-0 flex flex-col md:flex-row justify-end items-center gap-2 text-paragraph/80 text-xs font-medium">
      <div className="flex items-center flex-wrap gap-4">
        {socialLinks.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:text-accent transition-colors"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

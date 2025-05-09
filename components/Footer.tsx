import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/hamid6426",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hamid6426",
  },

  {
    label: "Gmail",
    href: "mailto:mianhamid6426@gmail.com",
  },

  {
    label: "Phone",
    href: "https://api.whatsapp.com/send?phone=923349229907",
  },
  // {
  //   label: "Facebook",
  //   href: "https://twitter.com/hamid6426",
  // },
  // {
  //   label: "Instagram",
  //   href: "https://twitter.com/hamid6426",
  // },
  // {
  //   label: "Twitter",
  //   href: "https://twitter.com/hamid6426",
  // }, Twitter is banned in Pakistan I think
  {
    label: "Fiverr",
    href: "https://www.fiverr.com/hamid6426",
  },
  // {
  //   label: "Youtube",
  //   href: "https://twitter.com/hamid6426",
  // },
];

const Footer = () => (
  <footer className="fixed bottom-0 w-full z-50 bg-background">
    <div className="relative mx-auto text-text max-w-7xl w-full py-4 border-t md:border-t-0 border-primary flex flex-col md:flex-row justify-end gap-2 md:gap-6 items-center px-3 2xl:px-0">
      <span className="text-xs mb-[2px] font-medium text-nowrap">
        © {new Date().getFullYear()} Mian Hamid Ur Rehman
      </span>
      <div className="flex items-center flex-wrap gap-4">
        {socialLinks.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-[0.7rem] transition-colors hover:text-primary"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

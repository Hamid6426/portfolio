import React from "react";
import { sectionsData } from "./sectionsData";

interface AboutSidebarProps {
  active: keyof typeof sectionsData;
  setActive: React.Dispatch<React.SetStateAction<keyof typeof sectionsData>>;
}

const AboutSidebar: React.FC<AboutSidebarProps> = ({ active, setActive }) => {
  return (
    <div className="w-full max-w-40 flex flex-col gap-4 text-sm flex-wrap">
      {Object.keys(sectionsData).map((key) => (
        <button
          key={key}
          onClick={() => setActive(key as keyof typeof sectionsData)}
          className={`w-full max-w-60 text-left py-2 cursor-pointer px-6 font-bold text-white ${
            active === key ? "bg-primary" : "hover:bg-accent bg-primary/70"
          }`}
        >
          {sectionsData[key as keyof typeof sectionsData].title}
        </button>
      ))}
    </div>
  );
};

export default AboutSidebar;
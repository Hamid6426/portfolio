"use client";

import React from "react";
import { sectionsData } from "./sectionsData";
import { motion } from "framer-motion";

interface AboutSidebarProps {
  active: keyof typeof sectionsData;
  setActive: React.Dispatch<React.SetStateAction<keyof typeof sectionsData>>;
}

const AboutSidebar: React.FC<AboutSidebarProps> = ({ active, setActive }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-3 text-xs">
      {Object.keys(sectionsData).map((key, index) => {
        const isActive = active === key;
        return (
          <motion.button
            key={key}
            onClick={() => setActive(key as keyof typeof sectionsData)}
            className={`w-full text-center py-2 font-bold transition-all duration-200 ${
              isActive
                ? "bg-primary text-white"
                : "bg-primary/70 hover:bg-accent text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {sectionsData[key as keyof typeof sectionsData].title}
          </motion.button>
        );
      })}
    </div>
  );
};

export default AboutSidebar;

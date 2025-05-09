import { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

type ThemeMode = "Light" | "Dark";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<ThemeMode>("Light");

  const applyTheme = (mode: ThemeMode) => {
    document.documentElement.classList.toggle("dark", mode === "Dark");
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "Dark" ? "Light" : "Dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null;

    const initial: ThemeMode =
      saved === "Dark" || saved === "Light"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "Dark"
        : "Light";

    setTheme(initial);
    localStorage.setItem("theme", initial); // Persist first-time decision
    applyTheme(initial);
  }, []);

  const icon = theme === "Dark" ? <MdDarkMode size={24} /> : <MdLightMode size={24} />;

  return (
    <button onClick={toggleTheme} className="text-primary cursor-pointer">
      {icon}
    </button>
  );
};

export default ThemeSwitch;

"use client";

import ResumeModal from "@/components/ResumeModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const router = useRouter();

  // const handleNavigate = (sectionId: string) => {
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //     section.focus({ preventScroll: true }); // add tabindex={-1} to target sections
  //   }
  // };

  const words = ["FULL", "STACK", "DEVELOPER"];

  const wordAnimationVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.3, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <main className="w-full lg:overflow-hidden px-4 min-h-screen bg-background text-paragraph selection:bg-primary/30 flex flex-col md:justify-center items-center py-16 md:pt-0">
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 md:gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Profile Image with subtle motion and glow */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="absolute -inset-1 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition duration-500 bg-gradient-to-br from-primary via-secondary to-accent z-[-1]" />
            <Image
              src="/hamid-profile.png"
              alt="Hamid Profile"
              width={500}
              height={500}
              className="w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-primary object-cover shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </motion.div>

          {/* Profile Content */}
          <motion.div
            className="flex-1 text-center md:text-left space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div>
              <h1
                className="text-2xl md:text-4xl max-w-lg font-extrabold tracking-tight leading-tight"
                style={{
                  animation:
                    "pulseGlowFrost 5s infinite cubic-bezier(0.4, 0, 0.6, 1)",
                  display: "inline-block",
                  willChange: "transform, color, text-shadow",
                }}
              >
                MIAN HAMID <span className="text-nowrap">UR REHMAN</span>
              </h1>

              <h2 className="text-xl md:text-3xl font-semibold mt-4">
                {words.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={wordAnimationVariants}
                    initial="hidden"
                    animate="visible"
                    className={`inline-block font-bold mr-3 ${
                      word === "STACK" ? "text-heading" : "text-heading"
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
            </div>

            <p className="text-lg px:4 md:px-0 max-w-lg text-paragraph opacity-90 tracking-wide text-justify leading-relaxed mx-auto md:mx-0">
              I build <span className="text-accent font-medium">clean</span>,{" "}
              <span className="text-accent font-medium">scalable</span>{" "}
              full-stack apps with a passion for{" "}
              <span className="text-accent font-medium">performance</span> and{" "}
              <span className="text-accent font-medium">pixel-perfect UIs</span>
              . From APIs to animations, my focus is seamless UX and
              maintainable code.
            </p>

            <div className="flex flex-col max-w-lg w-full md:flex-row items-center justify-center md:justify-start gap-4 text-sm">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/projects")}
                className="px-6 py-2 w-full max-w-xs bg-primary text-white font-semibold shadow-md hover:bg-secondary hover:shadow-xl transition-all duration-300 border-primary border-2"
              >
                View My Work
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setResumeOpen(true)}
                className="px-6 py-2 w-full max-w-xs border-2 text-sm border-primary text-primary bg-transparent hover:bg-primary/10 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                View Resume
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}

"use client";

import SocialLinks from "@/components/SocialLinks";
import ResumeModal from "@/components/ResumeModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [resumeOpen, setResumeOpen] = useState(false);

  // Button click functions
  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeDownload = () => {
    // You can replace this URL with the actual path to your resume
    const resumeLink = "/Mian_Hamid_Ur_Rehman_Resume.pdf";
    window.open(resumeLink, "_blank");
  };

  return (
    <main className="w-full max-w-6xl mx-auto pt-0 h-full md:h-[90vh] ">
      <div className="flex h-full flex-col-reverse md:flex-row justify-center md:justify-start ">
        <section className="w-full md:w-7/12 flex flex-col justify-center item-center h-full pl-3 md:pl-6 text-sm">
          <div className="text-xl md:text-2xl font-bold">
            FULL STACK DEVELOPER
          </div>
          <div className="text-2xl md:text-4xl font-bold my-2">Hello, I'm</div>
          <div className="text-2xl md:text-4xl font-bold text-[#FF0044] mb-3">
            MIAN HAMID UR REHMAN
          </div>
          <div className="leading-relaxed pr-3 md:pr-0 md:max-w-[30rem]">
            I'm a Full Stack Developer with experience in building dynamic,
            scalable web applications from end to end. I specialize in crafting
            responsive UI and developing robust backend systems, with a focus on
            clean code, performance, and seamless UX. Passionate about
            problem-solving and continuously improving both my skills and the
            products I work on.
          </div>
 
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-6 pr-3 md:pr-0 w-full my-8 md:mb-0">
            <button
              onClick={() => handleNavigate("work")}
              className="max-w-60 cursor-pointer bg-[#FF0044] font-semibold text-white px-4 py-2 hover:bg-[#FF0066]"
            >
              Check My Works
            </button>
            <button
              onClick={() => setResumeOpen(true)}
              className="max-w-60 cursor-pointer bg-[#FF0044] font-semibold text-white px-4 py-2 hover:bg-[#FF0066]"
            >
              Check My Resume
            </button>
          </div>
        </section>

        <section className="w-full md:w-5/12 flex justify-start md:justify-center items-center h-full pl-3 md:pr-6 md:ml-0 py-8 md:my-0">
          <Image
            src="/hamid-profile.png"
            alt="profile picture"
            width={500}
            height={500}
            className="w-40 md:w-80 rounded-full border-2 border-[#FF0044]"
          />
        </section>
      </div>
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}

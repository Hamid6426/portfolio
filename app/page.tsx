"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Button click functions
  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResumeDownload = () => {
    // You can replace this URL with the actual path to your resume
    const resumeLink = "/path-to-your-resume.pdf";
    window.open(resumeLink, "_blank");
  };

  return (
    <main className="w-full h-[calc(100vh_-_6rem)] absolute">
      <section className="absolute top-0 right-0 inset-0 w-full h-full bg-[#000011] overflow-hidden">
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 450"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full transition duration-300 ease-in-out delay-150"
        >
          <defs>
            <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stop-color="#001"></stop>
              <stop offset="100%" stop-color="#A0F"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,700 L 0,337 C 95.25,270.9107142857143 190.5,204.82142857142858 298,216 C 405.5,227.17857142857142 525.2500000000001,315.625 671,292 C 816.7499999999999,268.375 988.5,132.67857142857142 1121,84 C 1253.5,35.32142857142858 1346.75,73.66071428571429 1440,112 L 1440,700 L 0,700 Z"
            stroke="none"
            stroke-width="0"
            fill="url(#gradient)"
            fill-opacity="1"
            className="transition-all duration-300 ease-in-out delay-150 desktop-wave-animation"
          ></path>
        </svg>
        {/* <Image src="/hamid-profile.png" alt="profile picture" width={200} height={200} className="rounded-[px] absolute top-[10%] left-[10%]" /> */}
        <div className="rounded-[px] absolute top-[10%] md:top-[15%] left-[3%] xl:left-[5%]">
          <div className="w-full flex flex-col md:flex-row justify-center sm:justify-start item-center">
          <div className="text-3xl md:text-7xl font-black text-[#A0F]">MIAN HAMID</div>
          <div className="text-3xl md:text-7xl font-black text-[#A0F]">UR REHMAN</div>
          </div>
          <div className="text-xl font-bold text-[#F0A] mt-8">FULL STACK DEVELOPER</div>
          <div className="flex gap-6 mt-12">
            <button onClick={() => handleNavigate("work")} className="cursor-pointer bg-[#a0f] font-semibold text-white px-4 py-2 text-lg rounded-md hover:bg-[#f0a]">
              See My Work
            </button>

            <button onClick={handleResumeDownload} className="cursor-pointer bg-[#a0f] font-semibold text-white px-4 py-2 text-lg rounded-md hover:bg-[#f0a]">
              Download My Resume
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

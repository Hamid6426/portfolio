"use client";
import SocialLinkBalls from "@/components/SocialLinkBalls";
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
    <main className="w-full max-w-6xl mx-auto h-fit md:h-[calc(100vh_-_4rem)]">
      <div className="flex h-full flex-col-reverse md:flex-row">
        <section className="w-full md:w-7/12 flex flex-col justify-center item-center text-text h-full pl-3 md:pl-6 text-sm">
          <div className="text-xl sm:text-2xl font-bold">FULL STACK DEVELOPER</div>
          <div className="text-3xl font-bold my-2">Hello, I'm</div>
          <div className="text-4xl font-bold text-primary mb-3">MIAN HAMID UR REHMAN</div>
          <div className="leading-relaxed">
            My name is Mian Hamid Ur Rehman from Nowshera, Pakistan. A Full-Stack Web Developer specializing in React framework with MERN Stack, and Next.js Architecture. Proficient in both front-end
            and back-end as well as creating user interfaces with Figma for efficient and user-centered web applications and deliver seamless experience across multiple devices
          </div>
          <div className="flex flex-wrap gap-6 mt-6">
            <SocialLinkBalls />
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <button onClick={() => handleNavigate("work")} className="cursor-pointer bg-primary font-semibold text-white px-4 py-2 hover:bg-accent">
              Check My Works
            </button>
            <button onClick={handleResumeDownload} className="cursor-pointer bg-primary font-semibold text-white px-4 py-2 hover:bg-accent">
              Download My Resume
            </button>
          </div>
        </section>

        <section className= "w-full md:w-5/12 flex flex-col justify-center items-center h-full">
          <Image src="/hamid-profile.png" alt="profile picture" width={500} height={500} className="w-40 md:w-60 lg:w-80 rounded-full border-2 border-primary" />
        </section>
      </div>
    </main>
  );
}

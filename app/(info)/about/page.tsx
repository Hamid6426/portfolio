"use client";

import { useState } from "react";

const sections = {
  about: {
    title: "About",
    content: `
        <p class="mb-4">
          My name is Mian Hamid Ur Rehman from Nowshera, Pakistan. 
          A Full-Stack Web Developer specializing in React framework with MERN Stack, and Next.js Architecture. 
          Proficient in both front-end and back-end as well as creating user interfaces with Figma for efficient and user-centered web applications
          and deliver seamless experience across multiple devices
        </p>
        <p class="">I’m passionate about clean code, good UI, and efficient backend design.</p>
        <h2 class="text-2xl font-semibold my-4 text-primary">Interests</h2>
        <div class="flex flex-wrap gap-6">
          <button class="px-4 py-2 font-semibold bg-primary hover:bg-accent">Programming</button>
          <button class="px-4 py-2 font-semibold bg-primary hover:bg-accent">Building Softwares</button>
        </div>
        <h2 class="text-2xl font-semibold my-4 text-primary">Languages</h2>
        <div class="flex flex-wrap gap-6">
          <button class="px-4 py-2 font-semibold bg-primary hover:bg-accent">English</button>
          <button class="px-4 py-2 font-semibold bg-primary hover:bg-accent">Urdu</button>
          <button class="px-4 py-2 font-semibold bg-primary hover:bg-accent">Pashto</button>
        </div>
      `,
  },
  experience: {
    title: "Experience",
    content: `
        <h2 class="text-2xl font-semibold my-4 text-primary">Professional Experience</h2>
        <ul class="list-disc ml-6 space-y-2 text-text">
          <li>3+ years building web apps with modern stacks</li>
          <li>Worked with JavaScript, TypeScript, Node.js, Tailwind, and more</li>
          <li>Experience with API design, authentication, deployment (Vercel, Netlify)</li>
        </ul>
      `,
  },
  education: {
    title: "Education",
    content: `
        <h2 class="text-2xl font-semibold my-4 text-primary">Academic Background</h2>
        <ul class="list-disc ml-6 space-y-2 text-text">
          <li>Bachelor's in Computer Science - Virtual University of Pakistan</li>
          <li>Coursework in Web Development, Data Structures, and Cloud Deployment</li>
          <li>Continued self-learning via online platforms (YouTube, Coursera, etc.)</li>
        </ul>
      `,
  },
  skills: {
    title: "Skills",
    content: `
        <h2 class="text-2xl font-semibold my-4 text-primary">Tech Stack</h2>
        <div class="flex flex-wrap gap-4">
          <button class="px-3 py-1 font-bold bg-primary hover:bg-accent">JavaScript</button>
          <button class="px-3 py-1 font-bold bg-primary hover:bg-accent">TypeScript</button>
          <button class="px-3 py-1 font-bold bg-primary hover:bg-accent">React</button>
          <button class="px-3 py-1 font-bold bg-primary hover:bg-accent">Next.js</button>
          <button class="px-3 py-1 font-bold bg-primary hover:bg-accent">Node.js</button>
          <button class="px-3 py-1 font-bold bg-primary hover:bg-accent">MongoDB</button>
          <button class="px-3 py-1 font-bold bg-primary hover:bg-accent">Tailwind CSS</button>
        </div>
      `,
  },
  vision: {
    title: "Vision",
    content: `
        <h2 class="text-2xl font-semibold my-4 text-primary">Future Goals</h2>
        <p class="mb-4 text-text">My vision is to become a solution-driven software architect who bridges the gap between design and development using scalable systems and seamless UI/UX practices.</p>
        <ul class="list-disc ml-6 space-y-2 text-text">
          <li>Build sustainable web applications for underrepresented communities</li>
          <li>Lead engineering teams and mentor juniors</li>
          <li>Contribute to open-source tools and platforms</li>
        </ul>
      `,
  },
};

const AboutPage = () => {
  const [active, setActive] = useState<keyof typeof sections>("about");

  return (
    <main className="w-full max-w-6xl mx-auto pt-0 h-full md:h-[calc(100vh_-_4.4rem)]">
      <div className="flex py-12 gap-12 mx-3 md:mx-6 w-full">
        {/* Sidebar */}
        <div className="w-full max-w-60 flex flex-col gap-4 text-sm flex-wrap">
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key as keyof typeof sections)}
              className={` w-full max-w-60 text-left py-2 cursor-pointer px-6 font-bold text-text ${active === key ? "bg-primary" : "hover:bg-accent bg-[#000a1a]"}`}
            >
              {sections[key as keyof typeof sections].title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-semibold mb-4 text-primary">{sections[active].title}</h2>
          <div className="prose prose-blue max-w-none border border-primary p-4 text-text" dangerouslySetInnerHTML={{ __html: sections[active].content }} />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;

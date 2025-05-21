"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  imgSrc?: string | null | undefined;
  github?: string;
  demo?: string;
};

const myProjects: Project[] = [
  {
    title: "Visual Vibes Agency Business Website",
    description:
      "A modern, responsive business website for a creative agency showcasing services, portfolio, and contact features. Built using React.js, supabase(client) and Tailwind CSS.",
    imgSrc: "/project.png",
    github: "https://github.com/Hamid6426/visual-vibe-agency",
    demo: "https://visual-vibe-agency.vercel.app/",
  },
  {
    title: "Investium - Investment Website",
    description:
      "A landing page for an investment platform where user can deposit, invest in a plan and get profit. Developed with Next.js, Typescript, MongoDB and Tailwind CSS.",
    imgSrc: "/project.png",
    github: "https://github.com/Hamid6426/investment-website",
    demo: "",
  },
  {
    title: "Menu Mangement System",
    description:
      "A menu management system for restaurants where they can add menus and manage it. Built using MERN stack and Tailwind CSS.",
    imgSrc: "/project.png",
    github: "https://github.com/Hamid6426/menu-management",
    demo: "https://menu-management-frontend-gu7f.onrender.com/",
  },
  {
    title: "Onlylinks - Advance Link Sharing Website",
    description:
      "A personalized link-sharing platform supporting smart cards, social links, and analytics. Similar to Linktree, built with Next.js and Zustand for state management.",
    imgSrc: "/project.png",
    github: "https://github.com/hamid6426/onlylinks/",
    demo: "https://onlylinks-six.vercel.app/",
  },
  {
    title: "Solar System Of People",
    description:
      "An interactive visual web experience representing a community or network of people using a solar system metaphor. Focused on creative frontend animations with Three.js and Angular.",
    imgSrc: "/project.png",
    github: "",
    demo: "https://solar-system-of-people.vercel.app/",
  },
  {
    title: "Abdul Shakoor Portfolio",
    description:
      "A clean and professional personal portfolio for Abdul Shakoor with project highlights, experience, and contact info. Built with Next.js, Neon PostgreSQL serverless DB and Tailwind CSS.",
    imgSrc: "/project.png",
    github: "https://github.com/Hamid6426/abdul-shakoor-portfolio",
    demo: "https://abdul-shakoor-portfolio.vercel.app/",
  },
  {
    title: "Instance Segmentation",
    description:
      "An AI-powered web tool for performing instance segmentation on images using machine learning models. Focused on computer vision and Python integration.",
    imgSrc: "/project.png",
    github: "https://github.com/Hamid6426/instance-segmentation",
    demo: "",
  },
  {
    title: "Github Pull Request Reviwer",
    description:
      "A developer tool that analyzes GitHub pull requests using AI to generate summaries or suggestions for code reviews. Backend powered by Node.js and OpenAI APIs.",
    imgSrc: "/project.png",
    github: "https://github.com/Hamid6426/github-pull-req-reviewer",
    demo: "",
  },
  {
    title: "Swissmote Hiring Platform",
    description:
      "A comprehensive job board and hiring platform designed for Swissmote. Includes role-based access for applicants and HR, resume parsing, job listings, and interview scheduling. Built with Next.js, MongoDB, and Tailwind CSS.",
    imgSrc: "/project.png",
    github: "https://github.com/Hamid6426/swissmote-hiring-platform",
    demo: "",
  },
  {
    title: "School Management System",
    description:
      "A full-featured school management web app with modules for students, teachers, courses, results, and fee management. Built using Next.js, MongoDB and TailwindCSS with secure admin and staff dashboards.",
    imgSrc: "/project.png",
    github: "https://github.com/Hamid6426/school-management-system",
    demo: "",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

// Simple Modal
const Modal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
      <p className="text-lg text-gray-800 dark:text-gray-100 mb-4">{message}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition"
      >
        Close
      </button>
    </div>
  </div>
);

const ProjectCard = ({
  project,
  onModal,
}: {
  project: Project;
  onModal: (msg: string) => void;
}) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className="flex flex-col justify-start items-start bg-card border border-border p-4 gap-3 rounded-xl shadow-md w-full transition-shadow hover:shadow-lg"
  >
    <h2 className="text-2xl font-semibold text-heading">{project.title}</h2>
    <p className="text-paragraph text-base text-left">{project.description}</p>
    <div className="flex gap-4">
      <motion.button
        whileHover={project.github ? { x: 4 } : {}}
        onClick={() =>
          project.github
            ? window.open(project.github, "_blank")
            : onModal(
                "This project's GitHub repository is private or unavailable."
              )
        }
        className={`font-medium cursor-pointer focus:outline-none focus-visible:ring-2 ring-accent rounded-sm transition-all ${
          project.github ? "text-accent" : "text-gray-600"
        }`}
      >
        Github →
      </motion.button>

      <motion.button
        whileHover={project.demo ? { x: 4 } : {}}
        onClick={() =>
          project.demo
            ? window.open(project.demo, "_blank")
            : onModal("This project is not currently hosted.")
        }
        className={`font-medium cursor-pointer  focus:outline-none focus-visible:ring-2 ring-accent rounded-sm transition-all ${
          project.demo ? "text-accent" : "text-gray-600"
        }`}
      >
        Demo →
      </motion.button>
    </div>
  </motion.div>
);

const ProjectsPage = () => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background pt-20 pb-14 px-4 md:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.h1
          className="text-4xl font-bold text-primary mb-12"
          variants={cardVariants}
        >
          My Projects
        </motion.h1>

        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {myProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onModal={(msg) => setModalMessage(msg)}
            />
          ))}
        </div>
      </motion.div>

      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage(null)} />
      )}
    </main>
  );
};

export default ProjectsPage;

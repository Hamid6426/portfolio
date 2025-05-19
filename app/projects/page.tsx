"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type Project = {
  title: string;
  description: string;
  imgSrc?: string | null | undefined;
  link?: string;
};

const myProjects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio built with Next.js & Tailwind.",
    imgSrc: "/project.png",
    link: "https://your-site.com",
  },
  {
    title: "E-Commerce Store",
    description: "Full-stack shop with React, Node, and MongoDB.",
    imgSrc: "/project.png",
    link: "https://shop.com",
  },
  {
    title: "Blog Platform",
    description: "Markdown blog with Next.js, MDX, and Tailwind.",
    imgSrc: "/project.png",
    link: "https://blog.com",
  },
  {
    title: "Task Manager",
    description: "Kanban-style task manager using React and Zustand.",
    imgSrc: "/project.png",
    link: "https://tasks.com",
  },
  {
    title: "Weather App",
    description: "Weather app using OpenWeatherMap API and TypeScript.",
    imgSrc: "/project.png",
    link: "https://weather.com",
  },
  {
    title: "Chat App",
    description: "Real-time chat with Socket.IO and Tailwind UI.",
    imgSrc: "/project.png",
    link: "https://chat.com",
  },
  {
    title: "Dashboard UI",
    description: "Admin dashboard with charts and dark mode toggle.",
    imgSrc: "/project.png",
    link: "https://dashboard.com",
  },
  {
    title: "Travel Landing Page",
    description: "Marketing site with smooth scroll and parallax.",
    imgSrc: "/project.png",
    link: "https://travel.com",
  },
  {
    title: "Recipe Book",
    description: "Searchable recipe app using Spoonacular API.",
    imgSrc: "/project.png",
    link: "https://recipes.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
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

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-card border border-border p-5 rounded-xl shadow-md transition-shadow hover:shadow-2xl relative"
  >
    <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden group">
      <Image
        src={project.imgSrc ?? "/images/fallback.png"}
        alt={project.title}
        fill
        className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity rounded-md" />
    </div>
    <h2 className="text-xl font-semibold text-heading mb-2">
      {project.title}
    </h2>
    <p className="text-paragraph text-sm mb-4">
      {project.description}
    </p>
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 4 }}
      className="text-accent font-medium inline-block focus:outline-none focus-visible:ring-2 ring-accent rounded-sm transition-all"
    >
      Visit →
    </motion.a>
  </motion.div>
);

const ProjectsPage = () => {
  return (
    <main className="min-h-screen bg-background pt-12 px-4 md:px-12">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {myProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default ProjectsPage;
import { Project } from "@/app/types.index";
import ProjectCarousel from "@/components/ProjectCarousel";

const myProjects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio built with Next.js & Tailwind.",
    imgSrc: "/images/portfolio.png",
    link: "https://your-site.com",
  },
  {
    title: "E-Commerce Store",
    description: "Full-stack shop with React, Node, and MongoDB.",
    imgSrc: "/images/ecommerce.png",
    link: "https://shop.com",
  },
];

const ProjectsPage = () => (
  <main className="pt-12">
    <h1 className="text-4xl font-bold text-center text-primary mb-8">My Projects</h1>
    <ProjectCarousel projects={myProjects} />
  </main>
);

export default ProjectsPage;

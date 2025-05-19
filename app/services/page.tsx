import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";

// Services with extended descriptions
const services = [
  {
    title: "Frontend Development",
    description:
      "Crafting responsive and performant interfaces using React, Next.js, and Tailwind CSS. This includes building reusable components, optimizing for accessibility, and ensuring a seamless user experience across all devices. Our frontend services prioritize both aesthetic appeal and user-centric interaction to drive engagement.",
  },
  {
    title: "Backend Development",
    description:
      "Developing secure and scalable server-side systems using Node.js, Express, and modern databases like MongoDB or PostgreSQL. We handle authentication, authorization, API design, and deployment pipelines. With a focus on maintainability and performance, our backend services ensure your application's data flows smoothly and reliably.",
  },
  {
    title: "Full Stack Development",
    description:
      "Delivering complete web solutions from pixel-perfect UIs to powerful backend logic. Using modern stacks like MERN or Next.js + Prisma, we integrate front and backend seamlessly. This results in a unified development workflow, improved deployment speed, and maintainable architecture for long-term scalability.",
  },
  {
    title: "Three.js Development",
    description:
      "Creating immersive 3D experiences using WebGL powered by Three.js. From animated models to interactive scenes, we build visual stories that captivate users. Ideal for portfolios, product showcases, or creative storytelling, our 3D dev services merge performance with visual depth to set your site apart.",
  },
];

export default function Page() {
  return (
    <main className="flex flex-col w-full px-6 py-16 bg-background text-paragraph">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-6 text-primary">Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href="/contact"
              className="py-6 px-6 border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary-alpha transition-all rounded-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-primary">
                  {service.title}
                </h3>
                <MdArrowBack
                  size={28}
                  className="rotate-[140deg] text-primary"
                />
              </div>
              <p className="text-paragraph text-sm lg:text-[0.94rem] line-clamp-6">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

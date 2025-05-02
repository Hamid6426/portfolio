"use client";

import { Project } from "@/app/types.index";
import { useState } from "react";

type ProjectCarouselProps = {
  projects: Project[];
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = projects.length - 1;

  const prevSlide = () => setCurrentIndex((i) => (i === 0 ? lastIndex : i - 1));
  const nextSlide = () => setCurrentIndex((i) => (i === lastIndex ? 0 : i + 1));

  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <div className="relative overflow-hidden h-80 md:h-96">
        {/* Slides Wrapper */}
        <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {projects.map(({ title, description, imgSrc, link }, idx) => (
            <div key={idx} className="w-full flex-shrink-0 p-6 prose prose-blue text-text bg-secondary border border-white rounded">
              {imgSrc && <img src={imgSrc} alt={title} className="mb-4 w-full h-40 object-cover rounded" />}
              <h3 className="text-2xl font-semibold text-primary mb-2">{title}</h3>
              <p className="mb-4">{description}</p>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 font-bold bg-primary hover:bg-accent text-white rounded">
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button onClick={prevSlide} className="absolute top-1/2 left-2 -translate-y-1/2 bg-primary hover:bg-accent text-white rounded-full p-2" aria-label="Previous Project">
          ◀
        </button>

        {/* Next Button */}
        <button onClick={nextSlide} className="absolute top-1/2 right-2 -translate-y-1/2 bg-primary hover:bg-accent text-white rounded-full p-2" aria-label="Next Project">
          ▶
        </button>
      </div>

      {/* Dots / Indicators (optional) */}
      <div className="flex justify-center mt-4 space-x-2">
        {projects.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-secondary"}`} aria-label={`Go to slide ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default ProjectCarousel;

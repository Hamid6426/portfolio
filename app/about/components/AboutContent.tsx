"use client";

import React from "react";
import { sectionsData } from "./sectionsData";
import { motion, AnimatePresence } from "framer-motion";

interface AboutContentProps {
  active: keyof typeof sectionsData;
}

// styles.ts
export const styles = {
  heading: "text-3xl font-semibold mb-4 text-primary",
  paragraph: "mb-4 text-text",
  list: "list-disc ml-6 mb-4 text-text",
  tagContainer: "flex flex-wrap gap-2 mb-4",
  tag: "px-3 py-1 font-medium bg-primary hover:bg-accent text-white text-xs",
};

const AboutContent: React.FC<AboutContentProps> = ({ active }) => {
  const section = sectionsData[active];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col w-full"
      >
        <div className="border border-primary p-4 rounded flex flex-col w-full">
          {/* Title */}
          <h2 className={styles.heading}>{section.title}</h2>

          {/* ABOUT */}
          {"paragraphs" in section &&
            section.paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>
                {p}
              </p>
            ))}

          {"interests" in section && section.interests.length > 0 && (
            <>
              <h3 className="font-semibold mb-2">Interests</h3>
              <div className={styles.tagContainer}>
                {section.interests.map((item) => (
                  <span key={item} className={styles.tag}>
                    {item}
                  </span>
                ))}
              </div>
            </>
          )}

          {"languages" in section && section.languages.length > 0 && (
            <>
              <h3 className="font-semibold mb-2">Languages</h3>
              <div className={styles.tagContainer}>
                {section.languages.map((lang) => (
                  <span key={lang} className={styles.tag}>
                    {lang}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* EXPERIENCE */}
          {"jobs" in section &&
            section.jobs.map((job) => (
              <div key={job.company} className="mb-4">
                <h3 className="text-xl font-extrabold mb-2 text-primary">
                  {job.role}
                </h3>
                <h3 className="text-lg font-semibold mb-2 text-heading">
                  {job.company}
                </h3>
                <p className="italic text-sm mb-2">
                  {job.duration} • {job.type} • {job.location}
                </p>
                <ul className={styles.list}>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
                <div className={styles.tagContainer}>
                  {job.techStack.map((tech) => (
                    <span key={tech} className={styles.tag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}

          {/* EDUCATION */}
          {"items" in section && (
            <ul className="space-y-6">
              {section.items.map((edu) => (
                <li key={edu.degree}>
                  <strong>{edu.degree}</strong>
                  <p className="mb-1">{edu.institution}</p>
                  {"graduation" in edu && (
                    <span className="block text-sm text-gray-400">
                      Graduation: {edu.graduation}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* CERTIFICATIONS */}
          {"list" in section && (
            <div className="space-y-6">
              {Object.entries(section.list).map(([certTitle, cert]) => (
                <div key={certTitle} className="mb-4">
                  <h3 className="text-lg font-semibold mb-1 text-primary">
                    {certTitle}
                  </h3>
                  <p className="italic text-sm mb-2 text-gray-400">
                    {cert.completionDate} • {cert.institution}
                  </p>
                  <div className={styles.tagContainer}>
                    {cert.skills.map((skill: string) => (
                      <span key={skill} className={styles.tag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {"categorized" in section && (
            <div className="space-y-4">
              {Object.entries(section.categorized).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold mb-1 text-heading">
                    {category}
                  </h4>
                  <div className={styles.tagContainer}>
                    {items.map((item) => (
                      <span key={item} className={styles.tag}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VISION */}
          {"goalStatement" in section && (
            <p className={styles.paragraph}>{section.goalStatement}</p>
          )}
          {"goals" in section && (
            <ul className={styles.list}>
              {section.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AboutContent;

import React from "react";
import { sectionsData } from "./sectionsData";

interface AboutContentProps {
  active: keyof typeof sectionsData;
}

const AboutContent: React.FC<AboutContentProps> = ({ active }) => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-3xl font-semibold mb-4 text-primary">
        {sectionsData[active].title}
      </h2>
      <div
        className="prose prose-blue max-w-none border border-primary p-4 text-text"
        dangerouslySetInnerHTML={{ __html: sectionsData[active].content }}
      />
    </div>
  );
};

export default AboutContent;
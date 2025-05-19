"use client";

import { useState } from "react";
import { sectionsData } from "./components/sectionsData";
import AboutSidebar from "./components/AboutSidebar";
import AboutContent from "./components/AboutContent";
import Head from "next/head";

const AboutPage = () => {
  const [active, setActive] = useState<keyof typeof sectionsData>("about");

  return (
    <>
      <Head>
        <title>About Us</title>
        <meta
          name="description"
          content="Learn more about our mission, vision, and team."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="w-full min-h-screen text-heading bg-background px-4 md:px-0">
        <div className="flex flex-col max-w-3xl mx-auto gap-4 pt-16 pb-8">
          <AboutSidebar active={active} setActive={setActive} />
          <AboutContent active={active} />
        </div>
      </main>
    </>
  );
};

export default AboutPage;

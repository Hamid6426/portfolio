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
        <meta name="description" content="Learn more about our mission, vision, and team." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="w-full max-w-6xl mx-auto pt-0 h-full md:h-[calc(100vh_-_4.4rem)]">
        <div className="flex py-12 gap-12 mx-3 md:mx-6 w-full">
          <AboutSidebar active={active} setActive={setActive} />
          <AboutContent active={active} />
        </div>
      </main>
    </>
  );
};

export default AboutPage;
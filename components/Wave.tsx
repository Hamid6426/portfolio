import React from "react";

export default function Wave() {
  return (
    <section className="absolute top-0 right-0 inset-0 w-full h-full bg-[#000011] overflow-hidden hidden md:block">
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 450"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full transition duration-300 ease-in-out delay-150"
      >
        <defs>
          <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#001"></stop>
            <stop offset="100%" stop-color="#A0F"></stop>
          </linearGradient>
        </defs>
        <path
          d="M 0,700 L 0,337 C 95.25,270.9107142857143 190.5,204.82142857142858 298,216 C 405.5,227.17857142857142 525.2500000000001,315.625 671,292 C 816.7499999999999,268.375 988.5,132.67857142857142 1121,84 C 1253.5,35.32142857142858 1346.75,73.66071428571429 1440,112 L 1440,700 L 0,700 Z"
          stroke="none"
          stroke-width="0"
          fill="url(#gradient)"
          fill-opacity="1"
          className="transition-all duration-300 ease-in-out delay-150 desktop-wave-animation"
        ></path>
      </svg>
    </section>
  );
}

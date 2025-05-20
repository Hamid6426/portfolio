"use client";

import Image from "next/image";
import { useState } from "react";

export type Testimonial = {
  index: number;
  author: string;
  quote: string;
  role?: string;
  imgSrc?: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Function to go to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length); // Wrap around to the first
  };

  // Function to go to the previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    ); // Wrap around to the last
  };

  return (
    <section className="relative max-w-3xl mx-auto">
      <div className="flex items-center justify-center bg-background border-2 border-primary text-text p-6 rounded-lg shadow-lg">
        {/* Testimonial Content */}
        <div className="text-center">
          {testimonials.length > 0 && (
            <div>
              <Image
                fill
                src={testimonials[currentIndex].imgSrc || "/images/default.jpg"}
                alt={testimonials[currentIndex].author}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-primary"
              />
              <p className="text-xl font-semibold">
                {testimonials[currentIndex].author}
              </p>
              <p className="text-lg font-semibold text-gray-500">
                {testimonials[currentIndex].role}
              </p>
              <p className="mt-4 italic">
                &quot;{testimonials[currentIndex].quote}&qout;
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          onClick={prevTestimonial}
          className="bg-primary w-10 h-10 pb-1 pr-1 font-bold text-2xl rounded-full text-text cursor-pointer hover:bg-accent"
        >
          &lt;
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={nextTestimonial}
          className="bg-primary w-10 h-10 pb-1 pl-1 font-bold text-2xl rounded-full text-text cursor-pointer hover:bg-accent"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

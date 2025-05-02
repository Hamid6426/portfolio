import { Testimonial } from "@/app/types.index";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const testimonials: Testimonial[] = [
  {
    index: 0,
    author: "Ali Raza",
    role: "Product Manager at SoftTech",
    quote: "Hamid is a fantastic developer—always delivers on time!",
    imgSrc: "/hamid-profile.png",
  },
  {
    index: 1,
    author: "Sana Tariq",
    role: "CEO of BuildIt",
    quote: "Truly professional and easy to work with.",
    imgSrc: "/hamid-profile.png",
  },
  {
    index: 2,
    author: "Jawad Khan",
    role: "Lead Engineer at DevSolutions",
    quote: "His code quality and communication are top-notch.",
    imgSrc: "/hamid-profile.png",
  },
  {
    index: 3,
    author: "Mehwish Ali",
    role: "UI/UX Designer at PixelCraft",
    quote: "A pleasure to collaborate with — Hamid understands design deeply.",
    imgSrc: "/hamid-profile.png",
  },
  {
    index: 4,
    author: "Tariq Jamil",
    role: "CTO at CloudNova",
    quote: "Handled backend, frontend, and DevOps like a pro.",
    imgSrc: "/hamid-profile.png",
  },
  {
    index: 5,
    author: "Ayesha Kamal",
    role: "Freelance Product Owner",
    quote: "Delivered the MVP in record time with no bugs — amazing!",
    imgSrc: "/hamid-profile.png",
  },
];

const TestimonialsPage = () => (
  <main className="">
    <h1 className="py-8 text-4xl font-bold text-center text-primary">Testimonials</h1>
    <TestimonialCarousel testimonials={testimonials} />
  </main>
);

export default TestimonialsPage;

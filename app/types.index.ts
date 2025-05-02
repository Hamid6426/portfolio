export type Project = {
  title: string;
  description: string;
  imgSrc?: string;
  link?: string;
};

export type Testimonial = {
  index: number;
  author: string;
  role?: string;
  quote: string;
  imgSrc?: string;
}
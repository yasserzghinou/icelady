interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
}

export function Testimonial({ quote, name, role }: TestimonialProps) {
  return (
    <figure className="section-card p-6">
      <blockquote className="font-heading text-xl leading-relaxed text-text">“{quote}”</blockquote>
      <figcaption className="mt-5 text-sm text-text/70">
        <span className="font-semibold text-text">{name}</span>
        <span className="mx-2">·</span>
        <span>{role}</span>
      </figcaption>
    </figure>
  );
}

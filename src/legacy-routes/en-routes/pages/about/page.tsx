import { buildMetadata } from '@/lib/seo/meta';

export const metadata = buildMetadata({
  path: '/en/pages/about',
  title: 'About IceLady Marrakech',
  description: 'Learn about IceLady Marrakech, our clinical ethos, and our premium treatment methodology.'
});

export default function AboutPage() {
  return (
    <section className="section-shell pb-14 pt-14">
      <div className="section-card p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">About</p>
        <h1 className="mt-3 font-heading text-5xl">Clinical Discipline, Luxury Care</h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-text/75">
          IceLady Marrakech combines advanced treatment expertise with a calm, premium client experience.
          Every protocol begins with consultation and remains personalized from first session to follow-up.
        </p>
      </div>
    </section>
  );
}

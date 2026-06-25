import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About GripNova" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-page max-w-4xl py-14">
      <h1 className="font-display text-4xl font-extrabold sm:text-5xl">About GripNova</h1>
      <p className="mt-4 text-lg text-muted-foreground">Recovery-first products, designed with physiotherapists.</p>
      <div className="mt-10 space-y-5 text-foreground/90 leading-relaxed">
        <p>GripNova was founded with a single belief: that high-quality physiotherapy and rehabilitation equipment should be accessible to every Indian home — not just clinics and hospitals.</p>
        <p>We work directly with physiotherapists, manufacturers and patients to curate a focused range of products that genuinely accelerate recovery: resistance bands, TENS units, orthopedic supports, mobility aids, foam rollers and more.</p>
        <p>Everything we stock is tested, certified and chosen for one reason — it works. And because we cut out the middlemen, our premium quality stays surprisingly affordable.</p>
        <p>Whether you're recovering from surgery, managing chronic pain, returning from a sports injury, or simply moving better day-to-day, we're here to help you do it confidently.</p>
      </div>
    </div>
  );
}

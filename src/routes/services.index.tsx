import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, MessageCircle } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { whatsappEnquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Physiotherapy Services — Grip Nova Co." },
      { name: "description", content: "Expert physiotherapy services for stroke recovery, cervical pain, orthopedic rehab, sports injuries, pediatric and geriatric care. Home visits available." },
      { property: "og:title", content: "Physiotherapy Services — Grip Nova Co." },
      { property: "og:description", content: "Stroke recovery, cervical care, post-surgery rehab and home visits — by certified physiotherapists." },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const waUrl = whatsappEnquiryUrl("Hello Grip Nova Co., I'd like to book a physiotherapy session. Please share availability and details.");
  return (
    <div>
      <section className="gradient-hero">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <HeartPulse className="size-3.5" /> Physiotherapy Services
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Personalised physiotherapy care, in clinic or at your home.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Beyond products, Grip Nova Co. partners with certified physiotherapists to deliver recovery programs for stroke survivors, cervical pain, post-surgery patients and seniors — with the option of home visits.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                <MessageCircle className="size-4" /> Book a session on WhatsApp
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold">
                Explore services <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="container-page py-16">
        <h2 className="font-display text-3xl font-extrabold">What we treat</h2>
        <p className="mt-2 text-muted-foreground">Click any service to see treatment details, exercises, and how they help.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-glow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.image} alt={s.title} width={1024} height={768} loading="lazy"
                  className="size-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

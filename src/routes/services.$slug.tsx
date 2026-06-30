import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { getService, SERVICES, type Service } from "@/lib/services";
import { whatsappEnquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const s = getService(params.slug);
    return {
      meta: [
        { title: s ? `${s.title} — Grip Nova Co.` : "Service — Grip Nova Co." },
        { name: "description", content: s?.tagline ?? "Physiotherapy services by Grip Nova Co." },
        { property: "og:title", content: s?.title ?? "Physiotherapy Service" },
        { property: "og:description", content: s?.tagline ?? "" },
        ...(s ? [{ property: "og:image", content: s.image }, { name: "twitter:image", content: s.image }] : []),
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Service not found</h1>
      <Link to="/services" className="mt-4 inline-block text-primary">← All services</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="container-page py-20 text-center">
      <h1 className="font-display text-2xl font-bold">Couldn't load this service</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Try again</button>
    </div>
  ),
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return s;
  },
});

function ServiceDetail() {
  const s = Route.useLoaderData() as Service;
  const waUrl = whatsappEnquiryUrl(`Hello Grip Nova Co., I'm interested in your "${s.title}" service. Please share details and availability.`);

  return (
    <div>
      <section className="gradient-hero">
        <div className="container-page py-12">
          <Link to="/services" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" /> All services
          </Link>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">{s.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{s.tagline}</p>
              <p className="mt-4 text-base text-foreground/80">{s.overview}</p>
              <a href={waUrl} target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
                <MessageCircle className="size-4" /> Book this service on WhatsApp
              </a>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-card)]">
              <img src={s.image} alt={s.title} width={1024} height={768}
                className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="font-display text-2xl font-extrabold">Who this is for</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {s.whoFor.map((w) => (
            <li key={w} className="flex items-start gap-2 rounded-2xl border border-border bg-card p-4">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
              <span className="text-sm">{w}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page py-12">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="font-display text-2xl font-extrabold">Exercises & treatments</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">What each exercise involves, how it's performed, and how it helps recovery.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {s.exercises.map((e) => (
            <article key={e.name} className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-lg font-bold">{e.name}</h3>
              <div className="mt-3 space-y-3 text-sm">
                <p><span className="font-semibold text-foreground">What it is: </span><span className="text-muted-foreground">{e.what}</span></p>
                <p><span className="font-semibold text-foreground">How it's done: </span><span className="text-muted-foreground">{e.how}</span></p>
                <p><span className="font-semibold text-foreground">How it helps: </span><span className="text-muted-foreground">{e.benefits}</span></p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-3xl gradient-brand p-8 text-center text-white">
          <h2 className="font-display text-2xl font-extrabold">Ready to start your recovery?</h2>
          <p className="mt-2 text-white/90">Talk to our team and we'll match you with the right therapist — at our clinic or at home.</p>
          <a href={waUrl} target="_blank" rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary">
            <MessageCircle className="size-4" /> Book on WhatsApp
          </a>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-lg font-bold">Other services</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3).map((x) => (
              <Link key={x.slug} to="/services/$slug" params={{ slug: x.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card">
                <img src={x.image} alt={x.title} width={400} height={300} loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                <div className="p-4">
                  <h4 className="font-semibold">{x.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{x.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

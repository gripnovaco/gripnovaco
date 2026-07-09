import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, MessageCircle, ShieldCheck, Star, Truck } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { useCatalog } from "@/lib/store";
import { CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { whatsappEnquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GripNovaCo — Premium Physiotherapy & Rehabilitation Products" },
      { name: "description", content: "Shop physiotherapy, rehab, pain management and orthopedic recovery products. Order on WhatsApp. Fast delivery across India." },
    ],
  }),
  component: HomePage,
});

const groups = [
  "Exercise & Strengthening",
  "Pain Relief",
  "Rehabilitation",
  "Orthopedic Supports",
  "Mobility Aids",
  "Fitness & Recovery",
];

function HomePage() {
  const allProducts = useCatalog((s) => s.products);
  const products = allProducts.filter((p) => p.visible !== false);
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
              <ShieldCheck className="size-3.5" /> Trusted by physiotherapists across India
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Recover faster.<br />Move better.<br />
              <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">Live stronger.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Premium physiotherapy, rehabilitation and recovery essentials — handpicked, clinically informed, and delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:translate-y-[-1px]">
                Shop Now <ArrowRight className="size-4" />
              </Link>
              <a href={whatsappEnquiryUrl("Hi Grip Nova Co., I'd like to book a physiotherapy session. Please share available slots and options (in-clinic / home visit).")} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:bg-white">
                <MessageCircle className="size-4 text-whatsapp" /> Book a physio session
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 text-sm">
              <Stat label="Products" value={`${products.length}+`} />
              <Stat label="Customers" value="Happy Growing" />
              <Stat label="Avg. rating" value="4.8★" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-white/40 blur-2xl" />
            <img
              src={heroImg}
              alt="GripNova physiotherapy products"
              width={1600}
              height={1024}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
            />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-card">
        <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            { i: Truck, t: "Fast Delivery", s: "Across India" },
            { i: ShieldCheck, t: "Quality Assured", s: "Tested & certified" },
            { i: MessageCircle, t: "Order on WhatsApp", s: "Quick & easy" },
            { i: Award, t: "Trusted Brand", s: "Loved by therapists" },
          ].map(({ i: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{t}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <Section title="Shop by Category" subtitle="Find exactly what your recovery needs.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {groups.map((g, i) => {
            const first = CATEGORIES.find((c) => c.group === g);
            if (!first) return null;
            return (
              <Link
                key={g}
                to="/shop/$category"
                params={{ category: first.slug }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
              >
                <div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${["from-sky-100 to-blue-200","from-blue-100 to-indigo-200","from-cyan-100 to-sky-200","from-indigo-100 to-blue-200","from-sky-50 to-blue-100","from-blue-50 to-cyan-100"][i % 6]}`}>
                  <span className="font-display text-xl font-black text-primary">{g[0]}</span>
                </div>
                <span className="font-display text-sm font-semibold leading-tight">{g}</span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Featured */}
      <Section title="Featured Products" subtitle="Therapist favourites this season." action={{ to: "/shop", label: "View all" }}>
        <Grid>{featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</Grid>
      </Section>

      {/* New Arrivals */}
      <Section title="New Arrivals" subtitle="Just added to the GripNova range.">
        <Grid>{newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i + 1} />)}</Grid>
      </Section>

      {/* Best Sellers */}
      <Section title="Best Sellers" subtitle="What our customers can't stop buying.">
        <Grid>{bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i + 2} />)}</Grid>
      </Section>

      {/* Why choose */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container-page">
          <SectionHeader title="Why Choose GripNova" subtitle="Built around physiotherapy outcomes, not just sales." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Curated for clinicians", d: "Every product is reviewed by practising physiotherapists before it lands on our shelves." },
              { t: "Honest, transparent pricing", d: "Direct-from-manufacturer pricing with no hidden mark-ups — premium quality stays affordable." },
              { t: "End-to-end support", d: "From product selection to recovery tips, our team is one WhatsApp message away." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-border bg-card p-6">
                <div className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{x.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Section title="What our customers say" subtitle="Real stories from real recoveries.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "Anita R.", c: "Mumbai", q: "The TENS machine has been life-changing for my chronic back pain. Battery lasts forever." },
            { n: "Dr. Karan S.", c: "Bangalore", q: "I recommend GripNova bands and pulleys to my clinic patients. Build quality is excellent." },
            { n: "Meera P.", c: "Pune", q: "Fast delivery and the foam roller is exactly as described. Ordering on WhatsApp was so simple." },
          ].map((t) => (
            <div key={t.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
              <p className="mt-4 text-sm text-foreground/90">"{t.q}"</p>
              <div className="mt-4 text-sm font-semibold">{t.n} <span className="font-normal text-muted-foreground">— {t.c}</span></div>
            </div>
          ))}
        </div>
      </Section>

      {/* Knowledge / Blog */}
      <KnowledgeSection />

      {/* Newsletter */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl gradient-brand p-8 text-center text-white sm:p-14">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Recovery tips, straight to your inbox</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">Weekly physio insights, product launches and exclusive offers. No spam — ever.</p>
            <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-full bg-white px-5 py-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground"
              />
              <button className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-extrabold text-foreground">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: { to: string; label: string } }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      </div>
      {action && (
        <Link to={action.to} className="hidden text-sm font-semibold text-primary hover:underline sm:inline-flex">
          {action.label} →
        </Link>
      )}
    </div>
  );
}

function Section({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: { to: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="py-14 md:py-20">
      <div className="container-page">
        <SectionHeader title={title} subtitle={subtitle} action={action} />
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">{children}</div>;
}

function KnowledgeSection() {
  const posts = useCatalog((s) => s.posts).slice(0, 3);
  return (
    <Section title="Physiotherapy Knowledge Center" subtitle="Expert-written guides to help you recover smarter." action={{ to: "/blog", label: "Read the blog" }}>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
            <div className="aspect-[16/9] overflow-hidden bg-secondary">
              <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
              <h3 className="mt-2 font-display text-lg font-bold leading-tight group-hover:text-primary">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

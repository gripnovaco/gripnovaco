import { createFileRoute, Link } from "@tanstack/react-router";
import { useCatalog } from "@/lib/store";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Physiotherapy Blog — GripNova" }] }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = useCatalog((s) => s.posts);
  return (
    <div className="container-page py-12">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Physiotherapy Knowledge Center</h1>
        <p className="mt-3 text-muted-foreground">Practical, physiotherapist-backed guides on recovery, pain management and movement.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
            <div className="aspect-[16/9] overflow-hidden bg-secondary">
              <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wider text-primary">{post.category}</span>
                <span>·</span><span>{post.readMinutes} min read</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-bold leading-tight group-hover:text-primary">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

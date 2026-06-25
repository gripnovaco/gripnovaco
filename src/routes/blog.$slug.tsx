import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCatalog } from "@/lib/store";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${params.slug.replace(/-/g, " ")} — GripNova Blog` }],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = useCatalog((s) => s.posts.find((p) => p.slug === slug));
  if (!post) throw notFound();

  return (
    <article className="container-page max-w-3xl py-12">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/blog" className="hover:text-primary">← Back to blog</Link>
      </nav>
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.category}</span>
      <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{post.publishedAt} · {post.readMinutes} min read</p>
      <div className="my-8 aspect-[16/9] rounded-3xl bg-gradient-to-br from-sky-100 to-blue-200" />
      <div className="prose prose-lg max-w-none space-y-5 text-foreground/90 leading-relaxed">
        {post.content.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}

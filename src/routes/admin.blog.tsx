import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { BlogPost } from "@/lib/blog";
import { useCatalog } from "@/lib/store";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Blog — GripNova Admin" }] }),
  component: AdminBlog,
});

const empty = (): BlogPost => ({
  slug: "", title: "", excerpt: "", category: "Recovery", readMinutes: 4,
  publishedAt: new Date().toISOString().slice(0, 10), content: "",
  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop",
});

function AdminBlog() {
  const posts = useCatalog((s) => s.posts);
  const upsert = useCatalog((s) => s.upsertPost);
  const remove = useCatalog((s) => s.deletePost);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-extrabold">Blog</h1>
          <p className="mt-1 text-muted-foreground">{posts.length} published articles.</p>
        </div>
        <button onClick={() => setEditing(empty())} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <Plus className="size-4" /> New Post
        </button>
      </header>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Published</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.slug} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.publishedAt}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(p)} className="mr-2 inline-flex size-8 items-center justify-center rounded-lg hover:bg-secondary"><Pencil className="size-4" /></button>
                  <button onClick={() => { if (confirm("Delete this post?")) { remove(p.slug); toast.success("Deleted"); }}} className="inline-flex size-8 items-center justify-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
          <form
            className="w-full max-w-2xl space-y-4 rounded-3xl bg-card p-6 shadow-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              upsert({ ...editing, slug });
              toast.success("Saved");
              setEditing(null);
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editing.slug ? "Edit" : "New"} Post</h2>
              <button type="button" onClick={() => setEditing(null)} className="grid size-9 place-items-center rounded-full hover:bg-secondary"><X className="size-4" /></button>
            </div>
            <input required placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            <div className="grid gap-3 sm:grid-cols-3">
              <input placeholder="Category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              <input type="number" placeholder="Read mins" value={editing.readMinutes} onChange={(e) => setEditing({ ...editing, readMinutes: +e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              <input type="date" value={editing.publishedAt} onChange={(e) => setEditing({ ...editing, publishedAt: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <input placeholder="Image URL" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <textarea rows={2} placeholder="Excerpt" value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <textarea rows={8} placeholder="Article content (separate paragraphs with blank lines)" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-input px-5 py-2 text-sm font-semibold">Cancel</button>
              <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

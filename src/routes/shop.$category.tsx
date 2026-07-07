import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/shop/$category")({
  head: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.category);
    return {
      meta: [
        { title: `${cat?.name ?? "Category"} — Buy Online | Grip Nova Co.` },
        {
          name: "description",
          content:
            cat?.description ??
            "Browse our physiotherapy product range. Order on WhatsApp for fast delivery across India.",
        },
        {
          name: "keywords",
          content: cat
            ? `${cat.name}, buy ${cat.name} online, ${cat.name} India, ${cat.group}, physiotherapy, rehabilitation`
            : "physiotherapy, rehabilitation, orthopedic supports",
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) throw notFound();
  return <ShopBrowser activeCategory={cat} />;
}

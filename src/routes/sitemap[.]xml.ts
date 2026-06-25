import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SEED_PRODUCTS } from "@/lib/products";
import { SEED_POSTS } from "@/lib/blog";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/", "/shop", "/blog", "/about", "/contact", "/faqs", "/cart",
          "/privacy-policy", "/exchange-policy", "/shipping-policy", "/terms",
          ...SEED_PRODUCTS.map((p) => `/product/${p.slug}`),
          ...SEED_POSTS.map((p) => `/blog/${p.slug}`),
        ];
        const urls = paths.map((path) => `  <url><loc>${BASE_URL}${path}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { ShopBrowser } from "@/components/shop/ShopBrowser";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Physiotherapy & Rehab Products Online — Grip Nova Co." },
      {
        name: "description",
        content:
          "Buy physiotherapy equipment online in India — resistance bands, TENS machines, knee & back braces, walkers, foam rollers and more. Fast delivery, order on WhatsApp.",
      },
      {
        name: "keywords",
        content:
          "physiotherapy products India, buy resistance bands online, TENS machine India, hand grip strengthener, knee brace, lumbar support, walking stick, foam roller, rehabilitation equipment, physiotherapy equipment online",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return <ShopBrowser />;
}

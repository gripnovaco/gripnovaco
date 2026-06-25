import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [{ title: "FAQs — GripNova" }] }),
  component: FaqsPage,
});

const faqs = [
  { q: "How do I place an order?", a: "Tap any 'Buy Now' or 'Checkout on WhatsApp' button on the site. We confirm pricing, payment and delivery directly on WhatsApp." },
  { q: "Do you ship across India?", a: "Yes — we ship pan-India. Delivery typically takes 2–6 business days depending on your pincode." },
  { q: "What payment methods do you accept?", a: "After confirming your order on WhatsApp, we share UPI, bank transfer or COD options (where available)." },
  { q: "Can I exchange a product?", a: "Yes — please read our Exchange Policy. Exchanges are accepted within 7 days of delivery for sealed, unused items." },
  { q: "Are your products genuine?", a: "Absolutely. We source directly from manufacturers and authorised distributors, and we test every product we list." },
  { q: "Do you provide bulk pricing for clinics?", a: "Yes — message us on WhatsApp with your requirement and we'll share clinic-friendly pricing." },
];

function FaqsPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Frequently Asked Questions</h1>
      <div className="mt-10 space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-border bg-card p-5">
            <summary className="cursor-pointer list-none font-display font-semibold marker:hidden">
              {f.q}
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

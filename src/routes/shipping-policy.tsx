import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy-policy";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({ meta: [{ title: "Shipping Policy — Grip Nova Co." }] }),
  component: () => (
    <PolicyPage
      title="Shipping Policy"
      body={[
        "Grip Nova Co. ships pan-India through trusted courier partners including Delhivery, BlueDart, DTDC and India Post.",
        "Order confirmation: after you tap Buy Now, our team confirms pricing, availability, delivery address and payment method with you on WhatsApp (+91 72076 82536).",
        "Dispatch time: prepaid and COD orders are dispatched within 24–48 hours of confirmation on business days (Mon–Sat, excluding public holidays).",
        "Delivery time: standard delivery takes 2–6 business days for metros and tier-1 cities, and 4–8 business days for other locations, depending on your pincode.",
        "Shipping charges: shipping is free on orders above ₹999. For orders below ₹999, a flat shipping fee of ₹49 applies. Cash-on-delivery orders may attract an additional handling fee, confirmed on WhatsApp before dispatch.",
        "Tracking: once dispatched, you receive a tracking link on WhatsApp. You can also request status updates from us at any time.",
        "Undelivered / RTO: if a shipment is returned to us due to an incorrect address or unavailability at delivery, we will contact you to re-dispatch. Re-shipping charges will apply.",
        "Damaged in transit: please inspect the package on delivery. Report any transit damage within 48 hours on WhatsApp with photos of the packaging and product to qualify for a free replacement.",
        "International shipping: we currently ship within India only.",
        "Contact: Grip Nova Co. — WhatsApp +91 72076 82536 — care@gripnova.in.",
      ]}
    />
  ),
});

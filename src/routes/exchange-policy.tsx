import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy-policy";
import namasteHero from "@/assets/policies/namaste.jpg";

export const Route = createFileRoute("/exchange-policy")({
  head: () => ({ meta: [{ title: "Exchange Policy — Grip Nova Co." }] }),
  component: () => (
    <PolicyPage
      title="Exchange Policy"
      heroImage={namasteHero}
      heroAlt="Namaste — a warm welcome from Grip Nova Co."
      body={[
        "Namaste — thank you for choosing Grip Nova Co. We want you to be completely satisfied with your purchase. This policy explains when and how you can exchange a product.",
        "Exchange window: exchanges are accepted within 7 days of delivery for products that are sealed, unused and in their original packaging with all tags and accessories intact.",
        "How to initiate an exchange: message us on WhatsApp at +91 72076 82536 with your order details (name, order date, product) and reason for exchange, along with clear photos of the product and packaging.",
        "Eligible reasons: manufacturing defect, wrong item shipped, damaged in transit (report within 48 hours of delivery), or incorrect size for supports/braces.",
        "Non-exchangeable items: for hygiene and safety reasons, we cannot exchange the following once opened or used — cervical collars, knee/ankle/wrist/elbow braces, lumbar supports, therapy putty, resistance/loop bands, exercise tubes, foam rollers, massage balls, yoga mats and any item that touches skin.",
        "Process: once your exchange request is approved, we arrange reverse pickup where possible. The replacement is dispatched within 3 business days of us receiving and inspecting the returned product.",
        "Shipping charges: forward and reverse shipping for defective or wrong-shipped items is fully covered by Grip Nova Co. For size-change exchanges, reverse shipping is borne by the customer.",
        "Refunds: Grip Nova Co. does not offer cash refunds. In cases where an exchange is not possible (product unavailable), we issue store credit valid for 12 months against any future purchase.",
        "Warranty: manufacturing defects reported after the 7-day window are handled under the applicable product warranty. Contact us on WhatsApp with photos and your order details.",
        "Contact: Grip Nova Co. — WhatsApp +91 72076 82536 — care@gripnova.in.",
      ]}
    />
  ),
});

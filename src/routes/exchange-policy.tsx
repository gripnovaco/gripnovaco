import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy-policy";

export const Route = createFileRoute("/exchange-policy")({
  head: () => ({ meta: [{ title: "Exchange Policy — GripNova" }] }),
  component: () => <PolicyPage title="Exchange Policy" body={[
    "We accept exchanges within 7 days of delivery for sealed, unused products in original packaging.",
    "To initiate an exchange, message us on WhatsApp at +91 72076 82536 with your order details and reason for exchange.",
    "Hygiene-sensitive products (cervical collars, knee braces, supports that touch skin) cannot be exchanged once opened.",
    "Exchange products will be shipped within 3 business days of receiving the original product.",
    "GripNova does not offer refunds — only exchanges or store credit. This keeps our pricing transparent.",
  ]} />,
});

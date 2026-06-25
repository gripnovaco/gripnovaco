import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy-policy";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({ meta: [{ title: "Shipping Policy — GripNova" }] }),
  component: () => <PolicyPage title="Shipping Policy" body={[
    "We ship across India via reputed courier partners.",
    "Orders are dispatched within 24–48 hours of confirmation on WhatsApp.",
    "Standard delivery typically takes 2–6 business days, depending on your pincode.",
    "Shipping charges (if any) are confirmed on WhatsApp before payment.",
    "You will receive a tracking link once your order is dispatched.",
  ]} />,
});

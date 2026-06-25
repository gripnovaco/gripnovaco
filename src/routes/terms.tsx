import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy-policy";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — GripNova" }] }),
  component: () => <PolicyPage title="Terms & Conditions" body={[
    "By using the GripNova website you agree to these terms.",
    "All product information and pricing are correct to the best of our knowledge but may be updated without notice.",
    "GripNova products are wellness and rehabilitation aids — not substitutes for medical advice. Always consult your physiotherapist or doctor for clinical conditions.",
    "All trademarks and product names belong to their respective owners.",
    "These terms are governed by Indian law and the jurisdiction of Indian courts.",
  ]} />,
});

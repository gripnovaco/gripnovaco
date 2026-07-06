import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "./privacy-policy";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Grip Nova Co." }] }),
  component: () => (
    <PolicyPage
      title="Terms & Conditions"
      body={[
        "By accessing or using the Grip Nova Co. website (gripnovaco.lovable.app) and placing an order with us, you agree to these Terms & Conditions. Please read them carefully.",
        "About us: Grip Nova Co. is an Indian brand of physiotherapy, rehabilitation and fitness wellness products. Order confirmation, payment and support are handled over our verified WhatsApp Business number (+91 72076 82536).",
        "Product information: we make every effort to display accurate product names, descriptions, images and prices. Colours and finishes may vary slightly due to photography and screen calibration. Specifications may be updated by the manufacturer without prior notice.",
        "Medical disclaimer: Grip Nova Co. products are wellness and rehabilitation aids and are not a substitute for professional medical advice, diagnosis or treatment. Always consult your physiotherapist or doctor before starting any new therapy or exercise programme, especially if you have a pre-existing condition or are recovering from surgery.",
        "Pricing & taxes: all prices are in Indian Rupees (INR) and inclusive of applicable GST unless stated otherwise. We reserve the right to correct pricing errors before confirming your order.",
        "Orders & payment: an order is considered confirmed only after you confirm it with us on WhatsApp and the agreed payment (UPI, bank transfer or COD, where available) is arranged. We reserve the right to refuse or cancel any order, including suspected fraudulent orders, at our sole discretion.",
        "Delivery: delivery is subject to our Shipping Policy. Estimated delivery times are indicative and not guaranteed. Grip Nova Co. is not liable for courier delays outside our control.",
        "Exchanges: exchanges are governed by our Exchange Policy. Grip Nova Co. does not offer cash refunds.",
        "Intellectual property: all logos, product images, illustrations, copy and design elements on this site are the property of Grip Nova Co. or their respective owners and may not be reproduced without written permission.",
        "Acceptable use: you agree not to misuse the website — including attempting to gain unauthorised access to the admin portal, uploading malicious content, or scraping our catalog for commercial resale.",
        "Limitation of liability: to the maximum extent permitted by law, Grip Nova Co.'s total liability for any claim arising from a purchase is limited to the price paid for the affected product.",
        "Governing law: these terms are governed by the laws of India. Any dispute is subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana.",
        "Changes: we may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the revised terms.",
        "Contact: Grip Nova Co. — WhatsApp +91 72076 82536 — care@gripnova.in.",
      ]}
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Grip Nova Co." }] }),
  component: () => (
    <PolicyPage
      title="Privacy Policy"
      body={[
        "Grip Nova Co. (\"we\", \"our\", \"us\") respects your privacy. This policy explains what personal information we collect when you visit our website or place an order, how we use it, how we protect it, and the choices you have.",
        "Information we collect: name, mobile number, delivery address, email (if provided), order details, and basic device/browser information collected via standard web logs. We do not collect government IDs, card numbers or bank credentials on this website — payments are handled off-platform via UPI, bank transfer or cash on delivery, arranged over WhatsApp.",
        "How we use your data: to confirm and fulfil your order, arrange courier delivery, provide after-sales support, honour exchanges under our Exchange Policy, and send order-related updates on WhatsApp. We do not sell, rent or share your personal data with third parties for their own marketing.",
        "Data sharing: we share the minimum necessary details (name, address, phone) with our courier partners so that your order can be delivered. Our WhatsApp Business account is provided by Meta and is subject to Meta's own privacy policy.",
        "Data security: all order communication happens over our verified WhatsApp Business number (+91 72076 82536), which is end-to-end encrypted by default. Website traffic is served over HTTPS/TLS. Access to order records is restricted to authorised Grip Nova Co. staff.",
        "Data retention: we retain order records for up to 3 years for warranty, exchange and tax/accounting purposes, after which they are deleted or anonymised.",
        "Cookies: we use only essential cookies and local storage needed to run the website and remember your shopping cart. We do not use third-party advertising or cross-site tracking cookies.",
        "Your rights: you may request access to, correction of, or deletion of your personal data at any time by messaging us on WhatsApp or emailing care@gripnova.in. We will respond within 30 days.",
        "Children: our products are intended for adults. We do not knowingly collect data from children under 18.",
        "Changes: we may update this policy from time to time. The latest version will always be available on this page.",
        "Contact: Grip Nova Co. — WhatsApp +91 72076 82536 — care@gripnova.in.",
      ]}
    />
  ),
});

function PolicyPage({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="font-display text-4xl font-extrabold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>
      <div className="mt-6 space-y-4 text-foreground/90 leading-relaxed">
        {body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

export { PolicyPage };

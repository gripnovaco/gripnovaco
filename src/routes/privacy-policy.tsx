import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — GripNova" }] }),
  component: () => <PolicyPage title="Privacy Policy" body={[
    "GripNova respects your privacy. This policy explains what data we collect, how we use it, and your rights.",
    "We collect only the information needed to fulfil your order — name, contact number, address and order details. We never sell or share your personal data with third parties for marketing.",
    "Order communication happens over WhatsApp via our verified business number. All messages are confidential.",
    "You may request deletion of your data at any time by contacting care@gripnova.in.",
  ]} />,
});

function PolicyPage({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="font-display text-4xl font-extrabold">{title}</h1>
      <div className="mt-6 space-y-4 text-foreground/90 leading-relaxed">
        {body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

export { PolicyPage };

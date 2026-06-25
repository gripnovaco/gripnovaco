import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { whatsappEnquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact GripNova" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="container-page py-14">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
        <p className="mt-3 text-muted-foreground">Questions, bulk orders, clinical advice — we're here to help.</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form
          className="space-y-4 rounded-2xl border border-border bg-card p-6"
          onSubmit={(e) => { e.preventDefault(); toast.success("Thanks! We'll reply shortly."); setForm({ name: "", email: "", message: "" }); }}
        >
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-sm font-semibold">Message</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 outline-none focus:border-primary" />
          </div>
          <button className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Send message</button>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Phone className="size-5 text-primary" /> +91 72076 82536</div>
              <div className="flex items-center gap-3"><Mail className="size-5 text-primary" /> care@gripnova.in</div>
              <div className="flex items-start gap-3"><MapPin className="size-5 text-primary" /> GripNova HQ, India</div>
              <div className="text-muted-foreground">Mon – Sat · 10:00 – 19:00 IST</div>
            </div>
            <a href={whatsappEnquiryUrl("Hi GripNova, I'd like some help.")} target="_blank" rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-whatsapp-foreground">
              <MessageCircle className="size-4" /> Chat on WhatsApp
            </a>
          </div>
          <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-secondary/50">
            <div className="grid h-full place-items-center text-sm text-muted-foreground">Google Maps placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
}

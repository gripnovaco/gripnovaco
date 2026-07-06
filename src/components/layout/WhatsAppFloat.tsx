import { MessageCircle } from "lucide-react";
import { whatsappEnquiryUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappEnquiryUrl("Hello Grip Nova Co. team, I'd like to chat about your products.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-12 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[0_8px_24px_-6px_oklch(0.62_0.16_150/0.55)] transition hover:scale-110"
    >
      <MessageCircle className="size-5" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}

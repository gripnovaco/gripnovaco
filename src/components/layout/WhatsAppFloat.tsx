import { MessageCircle } from "lucide-react";
import { whatsappEnquiryUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappEnquiryUrl("Hello GripNova Team, I'd like to enquire about your products.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-whatsapp-foreground shadow-[var(--shadow-glow)] transition hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
    </a>
  );
}

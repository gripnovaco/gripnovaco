import { useAdmin } from "./store";

export const DEFAULT_WHATSAPP_NUMBER = "917207682536";

function getNumber() {
  try {
    return useAdmin.getState().whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
  } catch {
    return DEFAULT_WHATSAPP_NUMBER;
  }
}

export function whatsappOrderUrl(items: { name: string; quantity: number }[]) {
  const lines = items.length
    ? items.map((i) => `• ${i.name} — Qty: ${i.quantity}`).join("%0A")
    : "• (please share product details)";
  const msg = `Hello Grip Nova Co. Team,%0A%0AI would like to order the following products:%0A${lines}%0A%0APlease share pricing, payment details and delivery timeline.%0A%0AThank you.`;
  return `https://wa.me/${getNumber()}?text=${msg}`;
}

export function whatsappEnquiryUrl(message: string) {
  return `https://wa.me/${getNumber()}?text=${encodeURIComponent(message)}`;
}

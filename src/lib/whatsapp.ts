import { useAdmin } from "./store";

export const DEFAULT_WHATSAPP_NUMBER = "917207682536";

function getNumber() {
  try {
    return useAdmin.getState().whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
  } catch {
    return DEFAULT_WHATSAPP_NUMBER;
  }
}

export type OrderLine = {
  name: string;
  quantity: number;
  price?: number;
  image?: string; // absolute URL preferred
};

function absUrl(u?: string) {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (typeof window !== "undefined") return window.location.origin + u;
  return u;
}

/**
 * Build a plain-text WhatsApp order message (NOT url-encoded).
 * Encoding is applied once via encodeURIComponent in whatsappOrderUrl,
 * which properly escapes `#`, `&`, spaces, `₹`, newlines, etc.
 */
export function buildOrderMessage(items: OrderLine[], orderId?: string) {
  const header = orderId
    ? `Hello Grip Nova Co. Team,\n\n*New Order #${orderId}*\n`
    : `Hello Grip Nova Co. Team,\n\n*New Order Request*\n`;

  const body = items.length
    ? items
        .map((i, idx) => {
          const lines = [
            `\n*${idx + 1}. ${i.name}*`,
            `   • Qty: ${i.quantity}`,
          ];
          if (typeof i.price === "number") {
            lines.push(`   • Price: ₹${i.price.toLocaleString("en-IN")}`);
            lines.push(
              `   • Subtotal: ₹${(i.price * i.quantity).toLocaleString("en-IN")}`,
            );
          }
          const img = absUrl(i.image);
          if (img) lines.push(`   • Image: ${img}`);
          return lines.join("\n");
        })
        .join("\n")
    : "\n• (please share product details)";

  const total = items.reduce((s, i) => s + (i.price ?? 0) * i.quantity, 0);
  const totalLine =
    total > 0 ? `\n\n*Order Total: ₹${total.toLocaleString("en-IN")}*` : "";

  return `${header}${body}${totalLine}\n\nPlease confirm availability, payment method and delivery timeline.\n\nThank you.`;
}

export function whatsappOrderUrl(items: OrderLine[], orderId?: string) {
  const text = encodeURIComponent(buildOrderMessage(items, orderId));
  return `https://wa.me/${getNumber()}?text=${text}`;
}

export function whatsappEnquiryUrl(message: string) {
  return `https://wa.me/${getNumber()}?text=${encodeURIComponent(message)}`;
}

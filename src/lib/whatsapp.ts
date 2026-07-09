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

export function buildOrderMessage(items: OrderLine[], orderId?: string) {
  const header = orderId
    ? `Hello Grip Nova Co. Team,%0A%0A*New Order #${orderId}*%0A`
    : `Hello Grip Nova Co. Team,%0A%0A*New Order Request*%0A`;
  const lines = items.length
    ? items.map((i, idx) => {
        const parts = [
          `%0A*${idx + 1}. ${i.name}*`,
          `   • Qty: ${i.quantity}`,
        ];
        if (typeof i.price === "number") {
          parts.push(`   • Price: ₹${i.price.toLocaleString("en-IN")}`);
          parts.push(`   • Subtotal: ₹${(i.price * i.quantity).toLocaleString("en-IN")}`);
        }
        const img = absUrl(i.image);
        if (img) parts.push(`   • Image: ${img}`);
        return parts.join("%0A");
      }).join("%0A")
    : "%0A• (please share product details)";
  const total = items.reduce((s, i) => s + (i.price ?? 0) * i.quantity, 0);
  const totalLine = total > 0
    ? `%0A%0A*Order Total: ₹${total.toLocaleString("en-IN")}*`
    : "";
  return `${header}${lines}${totalLine}%0A%0APlease confirm availability, payment method and delivery timeline.%0A%0AThank you.`;
}

export function whatsappOrderUrl(items: OrderLine[], orderId?: string) {
  return `https://wa.me/${getNumber()}?text=${buildOrderMessage(items, orderId)}`;
}

export function whatsappEnquiryUrl(message: string) {
  return `https://wa.me/${getNumber()}?text=${encodeURIComponent(message)}`;
}

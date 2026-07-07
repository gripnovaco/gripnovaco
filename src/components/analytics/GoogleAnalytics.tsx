import { useEffect } from "react";
import { useAdmin } from "@/lib/store";

const ENV_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const adminId = useAdmin((s) => s.gaMeasurementId);
  const id = (adminId || ENV_ID).trim();

  useEffect(() => {
    if (!id || typeof window === "undefined") return;
    if (document.getElementById("ga-loader")) return;

    const s = document.createElement("script");
    s.id = "ga-loader";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: true });
  }, [id]);

  return null;
}

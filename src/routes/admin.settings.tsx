import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useAdmin, useCatalog } from "@/lib/store";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — GripNova Admin" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const admin = useAdmin();
  const reset = useCatalog((s) => s.reset);
  const [u, setU] = useState(admin.username);
  const [p, setP] = useState("");
  const [wa, setWa] = useState(admin.whatsappNumber);
  const [ga, setGa] = useState(admin.gaMeasurementId);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="font-display text-3xl font-extrabold">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage admin credentials and store configuration.</p>
      </header>

      <form
        className="space-y-4 rounded-2xl border border-border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          admin.updateCredentials(u, p || admin.password);
          toast.success("Credentials updated");
          setP("");
        }}
      >
        <h2 className="font-display text-lg font-bold">Admin Credentials</h2>
        <div>
          <label className="text-sm font-semibold">Username</label>
          <input value={u} onChange={(e) => setU(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-semibold">New Password <span className="text-muted-foreground">(leave blank to keep)</span></label>
          <input type="password" value={p} onChange={(e) => setP(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Save</button>
      </form>

      <form
        className="space-y-4 rounded-2xl border border-border bg-card p-6"
        onSubmit={(e) => { e.preventDefault(); admin.setWhatsapp(wa); toast.success("WhatsApp updated"); }}
      >
        <h2 className="font-display text-lg font-bold">WhatsApp Business Number</h2>
        <input value={wa} onChange={(e) => setWa(e.target.value)} placeholder="91XXXXXXXXXX" className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
        <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Save</button>
      </form>

      <div className="space-y-3 rounded-2xl border border-destructive/20 bg-card p-6">
        <h2 className="font-display text-lg font-bold text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground">Reset all products and blog posts to the default seed.</p>
        <button
          onClick={() => { if (confirm("Reset all catalog data?")) { reset(); toast.success("Catalog reset"); } }}
          className="rounded-full border border-destructive px-5 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
        >
          Reset catalog
        </button>
      </div>
    </div>
  );
}

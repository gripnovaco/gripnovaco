import { createFileRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { BarChart3, Box, FileText, LogOut, Settings, ShoppingBag } from "lucide-react";
import { useAdmin } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const s = useAdmin.getState();
      if (!s.isAuthed) throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const signOut = useAdmin((s) => s.signOut);
  const nav = useNavigate();
  return (
    <div className="grid min-h-screen lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="hidden border-r border-border bg-secondary/30 p-6 lg:block">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl gradient-brand text-white font-display font-black">G</span>
          <span className="font-display text-lg font-extrabold">GripNova <span className="text-primary">Admin</span></span>
        </Link>
        <nav className="mt-8 space-y-1 text-sm">
          {[
            { to: "/admin", label: "Dashboard", icon: BarChart3, exact: true },
            { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
            { to: "/admin/products", label: "Products", icon: Box },
            { to: "/admin/blog", label: "Blog", icon: FileText },
            { to: "/admin/settings", label: "Settings", icon: Settings },
          ].map(({ to, label, icon: Icon, exact }) => (
            <Link key={to} to={to} activeOptions={{ exact }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-muted-foreground hover:bg-card hover:text-foreground"
              activeProps={{ className: "bg-card text-foreground" }}>
              <Icon className="size-4" /> {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => { signOut(); nav({ to: "/admin/login" }); }}
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </aside>
      <div className="bg-background p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
  );
}

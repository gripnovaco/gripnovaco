import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { useAdmin } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — GripNova" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [u, setU] = useState("administrator");
  const [p, setP] = useState("administrator");
  const signIn = useAdmin((s) => s.signIn);
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen place-items-center gradient-hero p-6">
      <form
        className="w-full max-w-md space-y-5 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
        onSubmit={(e) => {
          e.preventDefault();
          if (signIn(u, p)) {
            toast.success("Welcome back, admin");
            navigate({ to: "/admin" });
          } else {
            toast.error("Invalid credentials");
          }
        }}
      >
        <div className="text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl gradient-brand text-white">
            <LogIn className="size-5" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-extrabold">Admin Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">GripNova administrator portal</p>
        </div>
        <div>
          <label className="text-sm font-semibold">Username</label>
          <input value={u} onChange={(e) => setU(e.target.value)}
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-sm font-semibold">Password</label>
          <input type="password" value={p} onChange={(e) => setP(e.target.value)}
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 outline-none focus:border-primary" />
        </div>
        <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">Sign in</button>
        <p className="text-center text-xs text-muted-foreground">
          Default: <code className="rounded bg-secondary px-1.5 py-0.5">administrator</code> / <code className="rounded bg-secondary px-1.5 py-0.5">administrator</code>
        </p>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-primary">← Back to site</Link>
      </form>
    </div>
  );
}

// Helper for protected routes
export function requireAuth() {
  const authed = useAdmin.getState().isAuthed;
  if (!authed) throw redirect({ to: "/admin/login" });
}

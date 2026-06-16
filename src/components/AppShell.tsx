import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { BarChart3, Brain, Chrome, FileText, Github, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/insights", label: "AI Insights", icon: Brain },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/extension", label: "Extension", icon: Chrome },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card/40 backdrop-blur md:flex">
        <div className="border-b border-border px-5 py-4"><Logo /></div>
        <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
          {items.map((it) => {
            const active = pathname.startsWith(it.to);
            return (
              <Link key={it.to} to={it.to} className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${active ? "bg-primary/15 text-foreground shadow-inner" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <it.icon className="h-4 w-4" />{it.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <Button onClick={signOut} variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
          <a
            href="https://github.com/Anadi99"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[11px] text-muted-foreground transition hover:text-foreground"
          >
            <Github className="h-3 w-3" /> Crafted by Anadi
          </a>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="border-b border-border bg-background/60 px-6 py-4 backdrop-blur md:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <Button onClick={signOut} variant="ghost" size="sm"><LogOut className="h-4 w-4" /></Button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto">
            {items.map((it) => {
              const active = pathname.startsWith(it.to);
              return (
                <Link key={it.to} to={it.to} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${active ? "bg-primary/15" : "text-muted-foreground"}`}>
                  <it.icon className="mr-1 inline h-3 w-3" />{it.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}

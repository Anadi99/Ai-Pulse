import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.72_0.21_305)] shadow-glow">
        <Sparkles className="h-4 w-4 text-primary-foreground" />
      </span>
      <span className="text-base font-bold tracking-tight">
        AI Usage <span className="text-gradient">Intelligence</span>
      </span>
    </Link>
  );
}

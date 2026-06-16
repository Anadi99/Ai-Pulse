import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { askInsights } from "@/lib/insights.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/insights")({
  head: () => ({ meta: [{ title: "AI Insights — AI Usage Intelligence" }] }),
  component: Insights,
});

const SUGGESTED = [
  "How productive was I this week?",
  "What platform do I use most?",
  "Show my coding activity.",
  "Which day was most productive?",
];

type Msg = { role: "user" | "ai"; text: string };

function Insights() {
  const ask = useServerFn(askInsights);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi — ask me anything about your AI usage. I'm grounded in your real session data." },
  ]);
  const [input, setInput] = useState("");

  const mut = useMutation({
    mutationFn: (question: string) => ask({ data: { question } }),
    onSuccess: (r) => setMessages((m) => [...m, { role: "ai", text: r.answer }]),
    onError: (e: any) => toast.error(e.message ?? "Failed"),
  });

  function send(q: string) {
    if (!q.trim() || mut.isPending) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    mut.mutate(q);
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <Brain className="h-7 w-7 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-sm text-muted-foreground">Ask your data — powered by AI</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-elegant">
        <div className="mb-4 flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button key={q} onClick={() => send(q)} className="rounded-full glass px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
              <Sparkles className="mr-1 inline h-3 w-3 text-primary" />{q}
            </button>
          ))}
        </div>

        <div className="max-h-[500px] space-y-3 overflow-y-auto pr-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "glass"}`}>{m.text}</div>
            </div>
          ))}
          {mut.isPending && (
            <div className="flex justify-start"><div className="glass rounded-2xl px-4 py-3 text-sm"><Loader2 className="h-4 w-4 animate-spin" /></div></div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-4 flex gap-2 border-t border-border pt-4">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your AI habits…" disabled={mut.isPending} />
          <Button type="submit" disabled={mut.isPending || !input.trim()} className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)]">Ask</Button>
        </form>
      </div>
    </div>
  );
}

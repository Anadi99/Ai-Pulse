import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BarChart3, Brain, Chrome, Flame, Gauge, LineChart, MessageSquare, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Usage Intelligence — Understand, Measure & Optimize Your AI" },
      { name: "description", content: "The Google Analytics for AI usage. Track ChatGPT, Claude, Gemini, Perplexity and Grok with productivity scores, heatmaps and AI-generated insights." },
    ],
  }),
  component: Landing,
});

const platforms = [
  { name: "ChatGPT", color: "oklch(0.7 0.17 162)" },
  { name: "Claude", color: "oklch(0.72 0.16 50)" },
  { name: "Gemini", color: "oklch(0.7 0.15 220)" },
  { name: "Perplexity", color: "oklch(0.7 0.14 200)" },
  { name: "Grok", color: "oklch(0.85 0.01 270)" },
];

const features = [
  { icon: Gauge, title: "Productivity Score", desc: "A 0–100 score from focus sessions, consistency, coding & learning, and goals." },
  { icon: Flame, title: "GitHub-style Heatmap", desc: "See your AI activity at a glance across 365 days, like a contribution graph." },
  { icon: BarChart3, title: "Platform Breakdown", desc: "Which AI do you actually rely on? Daily, weekly, monthly distribution." },
  { icon: Brain, title: "AI Insights Assistant", desc: "Ask: \"How productive was I this week?\" — get answers grounded in your data." },
  { icon: Chrome, title: "Chrome Extension", desc: "Tracks tab focus, prompts and sessions across the 5 major AI platforms." },
  { icon: Target, title: "Categories & Goals", desc: "Coding, research, writing, learning — see where your AI time goes." },
];

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#platforms" className="hover:text-foreground">Platforms</a>
            <a href="#extension" className="hover:text-foreground">Extension</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/auth"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/auth"><Button size="sm" className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] shadow-glow">Get started</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-hero">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 md:pt-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Now tracking 5 AI platforms · Chrome extension included
            </div>
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              The <span className="text-gradient">Google Analytics</span>
              <br />for your AI usage.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Understand, measure, and optimize how you use ChatGPT, Claude, Gemini, Perplexity, and Grok. Productivity scores, heatmaps, and AI-generated insights — built for builders.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] px-8 shadow-glow animate-pulse-glow">
                  <Zap className="mr-1 h-4 w-4" /> Start for free
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="ghost" className="border border-border">See how it works</Button>
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No credit card · 2-minute setup · Chrome extension included</p>
          </div>

          {/* Dashboard preview */}
          <div className="relative mx-auto mt-16 max-w-5xl animate-slide-up">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/30 to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card-gradient p-1 shadow-elegant">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tracks every AI you use</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-lg font-semibold opacity-80 transition hover:opacity-100">
                <span className="h-2 w-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 16px ${p.color}` }} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Built for the post-AI workflow.</h2>
            <p className="mt-4 text-muted-foreground">Stop guessing how AI affects your work. Start measuring it like a metric that matters.</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={f.title} className="group relative overflow-hidden rounded-xl border border-border bg-card-gradient p-6 transition hover:border-primary/40 hover:shadow-glow" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/30" />
                <f.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="border-t border-border py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">AI Insights Assistant</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Ask your data.<br /><span className="text-gradient">Get answers.</span></h2>
            <p className="mt-4 text-muted-foreground">An assistant that knows your actual AI habits. Powered by Lovable AI, grounded in your tracked sessions.</p>
            <ul className="mt-6 space-y-3 text-sm">
              {["How productive was I this week?","What platform do I use most?","Show my coding activity.","Which day was most productive?"].map((q) => (
                <li key={q} className="flex items-center gap-3"><MessageSquare className="h-4 w-4 text-primary" />{q}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-elegant">
            <div className="space-y-3">
              <ChatBubble who="you">How productive was I this week?</ChatBubble>
              <ChatBubble who="ai">
                You logged <strong className="text-foreground">14h 22m</strong> across 5 AI tools this week — up 18% from last week. Your productivity score is <strong className="text-success">82 (High)</strong>. Most focused day was <strong>Wednesday</strong> with 3h of deep coding sessions on ChatGPT.
              </ChatBubble>
            </div>
          </div>
        </div>
      </section>

      {/* Extension */}
      <section id="extension" className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Chrome className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">One install. <span className="text-gradient">Total visibility.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Our Chrome extension runs quietly in the background — capturing prompts, focus time, and session length across every supported AI tool.</p>
          <div className="mt-8">
            <Link to="/auth"><Button size="lg" className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] shadow-glow"><Chrome className="mr-2 h-4 w-4" /> Get the extension</Button></Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Simple pricing.</h2>
            <p className="mt-3 text-muted-foreground">Free while in beta. Pro tier coming soon.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <PriceCard name="Free" price="$0" highlight={false} features={["Unlimited tracking","Dashboard & heatmap","Productivity score","Chrome extension"]} />
            <PriceCard name="Pro" price="Soon" highlight features={["Everything in Free","AI workflow tracking","Team analytics","Cost tracking & exports","Priority support"]} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <Logo />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AI Usage Intelligence. Built for the AI-native generation.</p>
        </div>
      </footer>
    </div>
  );
}

function ChatBubble({ who, children }: { who: "you" | "ai"; children: React.ReactNode }) {
  return (
    <div className={`flex ${who === "you" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${who === "you" ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
        {children}
      </div>
    </div>
  );
}

function PriceCard({ name, price, features, highlight }: { name: string; price: string; features: string[]; highlight: boolean }) {
  return (
    <div className={`relative rounded-2xl border p-8 ${highlight ? "border-primary/50 bg-card-gradient shadow-glow" : "border-border bg-card"}`}>
      {highlight && <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Coming soon</div>}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-4xl font-bold">{price}</p>
      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        {features.map((f) => <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-success" />{f}</li>)}
      </ul>
    </div>
  );
}

function DashboardPreview() {
  const bars = [38, 52, 41, 68, 75, 60, 88, 72, 64, 80, 92, 70];
  return (
    <div className="rounded-xl bg-background p-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <p className="text-xs text-muted-foreground">This week</p>
          <p className="text-2xl font-bold">14h 22m <span className="text-sm font-medium text-success">+18%</span></p>
        </div>
        <div className="flex gap-3">
          <Stat icon={Gauge} label="Score" value="82" tone="text-success" />
          <Stat icon={Activity} label="Streak" value="7d" />
          <Stat icon={TrendingUp} label="Sessions" value="34" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-1.5">
        {bars.map((h, i) => (
          <div key={i} className="rounded-sm bg-gradient-to-t from-primary/40 to-primary" style={{ height: `${h * 1.2}px` }} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-5 gap-2 text-[10px] text-muted-foreground">
        {["ChatGPT 42%","Claude 28%","Gemini 14%","Perplexity 10%","Grok 6%"].map((s, i) => (
          <div key={s} className="rounded-md border border-border bg-card p-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)]" style={{ width: `${[42,28,14,10,6][i]}%` }} />
            </div>
            <p className="mt-2">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-right">
      <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground"><Icon className="h-3 w-3" />{label}</div>
      <p className={`text-sm font-semibold ${tone ?? ""}`}>{value}</p>
    </div>
  );
}

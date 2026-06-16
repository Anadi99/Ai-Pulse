import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, BarChart3, Brain, Check, ChevronRight, Chrome, Clock, Code2, Download, Flame,
  Gauge, GitBranch, Globe, LineChart, Lock, MessageSquare, Quote, Shield, Sparkles, Star,
  Target, TrendingUp, Twitter, Github, Linkedin, Zap,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Usage Intelligence — Understand, Measure & Optimize Your AI" },
      { name: "description", content: "The Google Analytics for AI usage. Track ChatGPT, Claude, Gemini, Perplexity and Grok with productivity scores, heatmaps, and AI-generated insights." },
      { property: "og:title", content: "AI Usage Intelligence — Track your AI productivity" },
      { property: "og:description", content: "Productivity scores, heatmaps, and AI insights for ChatGPT, Claude, Gemini, Perplexity & Grok." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "AI Usage Intelligence",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web, Chrome Extension",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }),
    }],
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
  { icon: Gauge, title: "Productivity Score", desc: "A 0–100 score derived from focus sessions, consistency, coding & learning time, and goals." },
  { icon: Flame, title: "Activity Heatmap", desc: "GitHub-style 365-day grid that shows your AI usage cadence at a glance." },
  { icon: BarChart3, title: "Platform Breakdown", desc: "Daily, weekly and monthly distribution across every AI you use." },
  { icon: Brain, title: "AI Insights Assistant", desc: "Ask 'How productive was I this week?' — get answers grounded in your real data." },
  { icon: Chrome, title: "Chrome Extension", desc: "Tracks tab focus, prompts and sessions across the 5 major AI platforms." },
  { icon: Target, title: "Categories & Goals", desc: "Coding, research, writing, learning — see exactly where your AI time goes." },
  { icon: Clock, title: "Focus Sessions", desc: "Detect uninterrupted deep work and reward your best streaks." },
  { icon: LineChart, title: "Trends & Forecasts", desc: "Spot weekly patterns and predict when you do your best work." },
  { icon: Shield, title: "Private by Default", desc: "Your data is yours. Encrypted at rest. Export or delete anytime." },
];

const stats = [
  { v: "5", l: "AI platforms tracked" },
  { v: "100%", l: "Local-first capture" },
  { v: "<2 min", l: "Time to set up" },
  { v: "0", l: "Credit card required" },
];

const steps = [
  { n: "01", icon: Download, title: "Install the extension", desc: "Download our Chrome extension and pair it with your account using a secure token." },
  { n: "02", icon: Activity, title: "Use AI like you always do", desc: "We quietly capture focus time, sessions and platform context — nothing intrusive." },
  { n: "03", icon: Brain, title: "Learn from your data", desc: "Dashboards, heatmaps and an AI assistant turn raw usage into real insight." },
];

const testimonials = [
  { quote: "Finally I can see why my Wednesdays feel so productive. This is the dashboard I didn't know I needed.", who: "Maya R.", role: "Staff Engineer · Series B Startup" },
  { quote: "We use it across our 12-person team to understand which AI tools are actually pulling weight.", who: "Daniel K.", role: "Head of Eng · Indie SaaS" },
  { quote: "The Insights assistant gave me a one-line answer that would have taken me an hour in a spreadsheet.", who: "Priya S.", role: "PhD Candidate · ML Research" },
];

const faqs = [
  { q: "Is my data private?", a: "Yes. Sessions are stored against your account with row-level security and never shared. You can export everything as CSV or JSON, and delete your account anytime." },
  { q: "Which AI platforms are supported?", a: "ChatGPT, Claude, Gemini, Perplexity, and Grok at launch. We add new platforms regularly — request one from your dashboard." },
  { q: "Does the extension read my prompts?", a: "The extension captures focus time, session length and tab context. It does not read or transmit the contents of your conversations." },
  { q: "How is the Productivity Score calculated?", a: "A weighted blend of active time, consistency, focus sessions, and category mix (coding, learning, research) — normalised to a 0-100 scale." },
  { q: "Is it really free?", a: "Yes. The full product is free during beta. A Pro tier with team analytics and cost tracking will arrive later." },
];

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Announcement bar */}
      <div className="border-b border-border/50 bg-primary/10 py-2 text-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-primary" />
          Beta is live — free for the first 1,000 builders.
          <Link to="/auth" className="font-medium text-foreground hover:text-primary">Claim your spot →</Link>
        </span>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition hover:text-foreground">Features</a>
            <a href="#how" className="transition hover:text-foreground">How it works</a>
            <a href="#platforms" className="transition hover:text-foreground">Platforms</a>
            <a href="#pricing" className="transition hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition hover:text-foreground">FAQ</a>
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
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Now tracking 5 AI platforms · Chrome extension included
            </div>
            <h1 className="font-display text-6xl leading-[1.0] tracking-tight md:text-[88px]">
              Your AI usage,
              <br />
              <span className="font-display-italic text-gradient">finally measured.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              A quiet companion for people who live inside ChatGPT, Claude, Gemini, Perplexity and Grok. Real focus time, honest productivity scores, and insights that actually read your week back to you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] px-8 shadow-glow animate-pulse-glow">
                  <Zap className="mr-1 h-4 w-4" /> Start for free
                </Button>
              </Link>
              <a href="#how">
                <Button size="lg" variant="ghost" className="border border-border">See how it works <ChevronRight className="ml-1 h-4 w-4" /></Button>
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

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card-gradient p-5 text-center">
                <p className="text-3xl font-bold text-gradient">{s.v}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tracks every AI you use</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-lg font-semibold opacity-80 transition hover:opacity-100">
                <span className="h-2 w-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 16px ${p.color}` }} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">How it works</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Three steps to AI clarity.</h2>
            <p className="mt-4 text-muted-foreground">No configuration. No agents to babysit. Install, work, learn.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative overflow-hidden rounded-2xl border border-border bg-card-gradient p-7">
                <div className="absolute right-5 top-5 text-4xl font-bold text-muted/40">{s.n}</div>
                <s.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Product</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Built for the post-AI workflow.</h2>
            <p className="mt-4 text-muted-foreground">Stop guessing how AI affects your work. Start measuring it like a metric that matters.</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group relative overflow-hidden rounded-xl border border-border bg-card-gradient p-6 transition hover:border-primary/40 hover:shadow-glow">
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
              {["How productive was I this week?", "What platform do I use most?", "Show my coding activity.", "Which day was most productive?"].map((q) => (
                <li key={q} className="flex items-center gap-3"><MessageSquare className="h-4 w-4 text-primary" />{q}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/auth"><Button className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] shadow-glow">Try the assistant <ChevronRight className="ml-1 h-4 w-4" /></Button></Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-elegant">
            <div className="space-y-3">
              <ChatBubble who="you">How productive was I this week?</ChatBubble>
              <ChatBubble who="ai">
                You logged <strong className="text-foreground">14h 22m</strong> across 5 AI tools this week — up 18% from last week. Your productivity score is <strong className="text-success">82 (High)</strong>. Most focused day was <strong>Wednesday</strong> with 3h of deep coding sessions on ChatGPT.
              </ChatBubble>
              <ChatBubble who="you">What about my coding sessions?</ChatBubble>
              <ChatBubble who="ai">
                Coding accounts for <strong className="text-foreground">62%</strong> of your AI time. Average session: <strong>34 min</strong>. ChatGPT and Claude split this almost evenly.
              </ChatBubble>
            </div>
          </div>
        </div>
      </section>

      {/* Built for */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Who it's for</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Built for AI-native builders.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <PersonaCard icon={Code2} title="Engineers" desc="Measure how much AI actually contributes to shipped code. Optimize your pair-programming loop." />
            <PersonaCard icon={GitBranch} title="Founders" desc="Track team-wide AI usage and ROI. Decide which tools to keep paying for." />
            <PersonaCard icon={Globe} title="Researchers & Students" desc="Understand your learning patterns. Catch deep-focus windows and protect them." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Loved by early users</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">A new metric for modern work.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.who} className="relative rounded-2xl border border-border bg-card-gradient p-7">
                <Quote className="h-6 w-6 text-primary/60" />
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.21_305)] text-xs font-bold text-primary-foreground">
                    {t.who.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.who}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-warning text-warning" />)}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Extension banner */}
      <section id="extension" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card-gradient p-10 md:p-14">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[oklch(0.72_0.21_305)]/20 blur-3xl" />
            <div className="relative grid items-center gap-10 md:grid-cols-2">
              <div>
                <Chrome className="h-10 w-10 text-primary" />
                <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">One install. <span className="text-gradient">Total visibility.</span></h2>
                <p className="mt-4 text-muted-foreground">Our Chrome extension runs quietly in the background — capturing focus time and session length across every supported AI tool. No prompt content is ever read or transmitted.</p>
                <ul className="mt-5 grid gap-2 text-sm">
                  {["Works in Chrome, Edge, Brave & Arc", "Idle detection so breaks don't skew data", "Local-first; sync only what you choose"].map((p) => (
                    <li key={p} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{p}</li>
                  ))}
                </ul>
                <div className="mt-7 flex gap-3">
                  <Link to="/auth"><Button className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] shadow-glow"><Chrome className="mr-2 h-4 w-4" /> Get the extension</Button></Link>
                  <a href="#how"><Button variant="ghost" className="border border-border">Learn more</Button></a>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl border border-border bg-background p-5 shadow-elegant">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    Tracking · ChatGPT · 23m in session
                  </div>
                  <div className="space-y-2 text-sm">
                    <ExtRow label="Today" value="3h 42m" tone="text-foreground" />
                    <ExtRow label="This week" value="14h 22m" tone="text-success" />
                    <ExtRow label="Streak" value="7 days 🔥" />
                    <ExtRow label="Score" value="82 / 100" tone="text-gradient" />
                  </div>
                  <div className="mt-4 rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
                    <Lock className="mr-1 inline h-3 w-3" />
                    Encrypted token · revocable anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Pricing</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Simple, honest pricing.</h2>
            <p className="mt-3 text-muted-foreground">Free while in beta. No card. No tricks.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Free"
              price="$0"
              tagline="For individuals exploring their AI workflow."
              highlight={false}
              features={["Unlimited tracking", "Dashboard & heatmap", "Productivity score", "Chrome extension", "AI insights (limited)", "CSV / JSON export"]}
            />
            <PriceCard
              name="Pro"
              price="Soon"
              tagline="For teams and power users."
              highlight
              features={["Everything in Free", "Unlimited AI insights", "Team analytics & sharing", "Cost & token tracking", "Custom categories & goals", "Priority support"]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">FAQ</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Questions, answered.</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium hover:text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Start measuring<br />what you've been guessing.</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Free during beta. Two minutes to set up. Your AI workflow, finally visible.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] px-8 shadow-glow">
                <Zap className="mr-1 h-4 w-4" /> Get started — it's free
              </Button>
            </Link>
            <a href="#features"><Button size="lg" variant="ghost" className="border border-border">Explore features</Button></a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                The Google Analytics for AI usage. Understand, measure & optimize how you work with AI.
              </p>
              <div className="mt-5 flex gap-3 text-muted-foreground">
                <a href="https://github.com/Anadi99" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="rounded-md border border-border p-2 transition hover:border-primary/50 hover:text-foreground"><Github className="h-4 w-4" /></a>
                <a href="#" aria-label="Twitter" className="rounded-md border border-border p-2 transition hover:border-primary/50 hover:text-foreground"><Twitter className="h-4 w-4" /></a>
                <a href="#" aria-label="LinkedIn" className="rounded-md border border-border p-2 transition hover:border-primary/50 hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
              </div>
            </div>
            <FooterCol title="Product" items={[
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
              { label: "Pricing", href: "#pricing" },
              { label: "Extension", href: "#extension" },
            ]} />
            <FooterCol title="Company" items={[
              { label: "About", href: "#" },
              { label: "Changelog", href: "#" },
              { label: "Contact", href: "#" },
            ]} />
            <FooterCol title="Legal" items={[
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
              { label: "Security", href: "#" },
            ]} />
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} AI Usage Intelligence. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Crafted by
              <a href="https://github.com/Anadi99" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline">
                <Github className="h-3 w-3" /> Anadi
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.label}><a href={i.href} className="transition hover:text-foreground">{i.label}</a></li>
        ))}
      </ul>
    </div>
  );
}

function PersonaCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card-gradient p-7 transition hover:border-primary/40">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function ExtRow({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-sm font-semibold ${tone ?? ""}`}>{value}</span>
    </div>
  );
}

function ChatBubble({ who, children }: { who: "you" | "ai"; children: React.ReactNode }) {
  return (
    <div className={`flex ${who === "you" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${who === "you" ? "bg-primary text-primary-foreground" : "glass text-muted-foreground"}`}>
        {children}
      </div>
    </div>
  );
}

function PriceCard({ name, price, tagline, features, highlight }: { name: string; price: string; tagline: string; features: string[]; highlight: boolean }) {
  return (
    <div className={`relative rounded-2xl border p-8 ${highlight ? "border-primary/50 bg-card-gradient shadow-glow" : "border-border bg-card"}`}>
      {highlight && <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Coming soon</div>}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{tagline}</p>
      <p className="mt-4 text-4xl font-bold">{price}<span className="text-base font-medium text-muted-foreground">{price === "$0" ? " / month" : ""}</span></p>
      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        {features.map((f) => <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />{f}</li>)}
      </ul>
      <Link to="/auth" className="mt-8 block">
        <Button className={`w-full ${highlight ? "bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] shadow-glow" : ""}`} variant={highlight ? "default" : "outline"}>
          {highlight ? "Join the waitlist" : "Start free"}
        </Button>
      </Link>
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
        {["ChatGPT 42%", "Claude 28%", "Gemini 14%", "Perplexity 10%", "Grok 6%"].map((s, i) => (
          <div key={s} className="rounded-md border border-border bg-card p-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)]" style={{ width: `${[42, 28, 14, 10, 6][i]}%` }} />
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

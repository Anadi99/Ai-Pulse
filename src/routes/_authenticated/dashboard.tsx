import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getOverview } from "@/lib/dashboard.functions";
import { Activity, Clock, Flame, Gauge, TrendingUp, Zap } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AI Usage Intelligence" }] }),
  component: Dashboard,
});

const COLORS = ["oklch(0.58 0.22 295)", "oklch(0.7 0.17 162)", "oklch(0.78 0.16 75)", "oklch(0.7 0.15 220)", "oklch(0.65 0.2 25)", "oklch(0.85 0.01 270)"];

function fmt(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function Dashboard() {
  const get = useServerFn(getOverview);
  const { data, isLoading } = useQuery({ queryKey: ["overview"], queryFn: () => get() });

  if (isLoading || !data) return <div className="grid h-96 place-items-center text-muted-foreground">Loading your AI metrics…</div>;

  const tierColor = data.score.tier === "Elite" ? "text-warning" : data.score.tier === "High" ? "text-success" : data.score.tier === "Average" ? "text-foreground" : "text-muted-foreground";

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your AI usage at a glance</p>
      </div>

      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card icon={Clock} label="Today" value={fmt(data.totals.todaySec)} />
        <Card icon={TrendingUp} label="This week" value={fmt(data.totals.weekSec)} sub={`${data.totals.sessionCount} total sessions`} />
        <Card icon={Flame} label="Streak" value={`${data.totals.streak}d`} sub="Consecutive active days" />
        <Card icon={Gauge} label="Productivity" value={String(data.score.value)} sub={data.score.tier} accent={tierColor} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card-gradient p-6 shadow-elegant lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Daily usage · last 14 days</h2>
            <span className="text-xs text-muted-foreground">Minutes</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={data.daily}>
                <XAxis dataKey="date" stroke="oklch(0.68 0.02 270)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.68 0.02 270)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.17 0.013 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: 8 }} />
                <Bar dataKey="minutes" fill="oklch(0.58 0.22 295)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card-gradient p-6 shadow-elegant">
          <h2 className="mb-4 font-semibold">Platform distribution</h2>
          <div className="h-48">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data.platforms} dataKey="seconds" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {data.platforms.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.17 0.013 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: 8 }} formatter={(v: any) => fmt(Number(v))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5 text-xs">
            {data.platforms.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{p.name}</span>
                <span className="text-muted-foreground">{fmt(p.seconds)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="rounded-xl border border-border bg-card-gradient p-6 shadow-elegant">
        <h2 className="mb-4 font-semibold">Activity heatmap · last 90 days</h2>
        <div className="flex flex-wrap gap-1">
          {data.heatmap.map((d) => {
            const intensity = Math.min(1, d.minutes / 120);
            return <div key={d.date} title={`${d.date}: ${d.minutes}m`} className="h-3 w-3 rounded-sm" style={{ background: intensity === 0 ? "oklch(0.2 0.012 270)" : `oklch(0.58 0.22 295 / ${0.2 + intensity * 0.8})` }} />;
          })}
        </div>
      </div>

      {/* Categories + timeline */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card-gradient p-6 shadow-elegant">
          <h2 className="mb-4 font-semibold">Top categories</h2>
          <div className="space-y-3">
            {data.categories.sort((a,b)=>b.seconds-a.seconds).slice(0,6).map((c) => {
              const max = Math.max(...data.categories.map(x => x.seconds));
              return (
                <div key={c.name}>
                  <div className="mb-1 flex justify-between text-xs"><span>{c.name}</span><span className="text-muted-foreground">{fmt(c.seconds)}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)]" style={{ width: `${(c.seconds/max)*100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card-gradient p-6 shadow-elegant">
          <h2 className="mb-4 font-semibold">Recent activity</h2>
          <ul className="space-y-3 text-sm">
            {data.timeline.map((t, i) => (
              <li key={i} className="flex items-center gap-3 border-b border-border/50 pb-2 last:border-0">
                <Zap className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{t.platform} · <span className="text-muted-foreground">{t.category}</span></p>
                  <p className="text-xs text-muted-foreground">{new Date(t.when).toLocaleString()}</p>
                </div>
                <span className="text-xs text-muted-foreground">{t.minutes}m</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, value, sub, accent }: { icon: any; label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card-gradient p-5 shadow-elegant transition hover:border-primary/40 hover:shadow-glow">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className={`mt-3 text-3xl font-bold tracking-tight ${accent ?? ""}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

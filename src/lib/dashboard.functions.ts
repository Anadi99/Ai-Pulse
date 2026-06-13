import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const PLATFORMS = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok"];
const CATEGORIES = ["Coding", "Research", "Writing", "Learning", "Business", "Marketing", "Design", "Productivity"];

function seedRand(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

async function ensureSeed(supabase: any, userId: string) {
  const { count } = await supabase.from("sessions").select("*", { count: "exact", head: true }).eq("user_id", userId);
  if ((count ?? 0) > 0) return;
  const r = seedRand(userId.charCodeAt(0) + userId.charCodeAt(1));
  const rows: any[] = [];
  const now = new Date();
  for (let d = 89; d >= 0; d--) {
    const day = new Date(now); day.setDate(now.getDate() - d);
    const sessionsToday = Math.floor(r() * 5) + (d % 7 === 0 ? 0 : 1);
    for (let i = 0; i < sessionsToday; i++) {
      const platform = PLATFORMS[Math.floor(r() * PLATFORMS.length)];
      const category = CATEGORIES[Math.floor(r() * CATEGORIES.length)];
      const dur = Math.floor(r() * 1800) + 120;
      const start = new Date(day); start.setHours(8 + Math.floor(r() * 12), Math.floor(r() * 60));
      const end = new Date(start.getTime() + dur * 1000);
      rows.push({
        user_id: userId, platform, category,
        started_at: start.toISOString(), ended_at: end.toISOString(),
        duration_seconds: dur, prompt_count: Math.floor(r() * 20) + 1,
      });
    }
  }
  await supabase.from("sessions").insert(rows);
}

export const getOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureSeed(context.supabase, context.userId);
    const { data: sessions } = await context.supabase
      .from("sessions").select("platform, category, duration_seconds, started_at, prompt_count")
      .eq("user_id", context.userId).order("started_at", { ascending: false });

    const s = sessions ?? [];
    const now = new Date();
    const today = new Date(now); today.setHours(0,0,0,0);
    const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
    const monthAgo = new Date(now); monthAgo.setDate(now.getDate() - 30);

    const sum = (arr: any[]) => arr.reduce((a, b) => a + (b.duration_seconds || 0), 0);
    const todaySec = sum(s.filter(x => new Date(x.started_at) >= today));
    const weekSec = sum(s.filter(x => new Date(x.started_at) >= weekAgo));
    const monthSec = sum(s.filter(x => new Date(x.started_at) >= monthAgo));
    const totalSec = sum(s);

    // Platform breakdown
    const platforms: Record<string, number> = {};
    for (const x of s) platforms[x.platform] = (platforms[x.platform] || 0) + (x.duration_seconds || 0);
    const mostUsed = Object.entries(platforms).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

    // Categories
    const categories: Record<string, number> = {};
    for (const x of s) if (x.category) categories[x.category] = (categories[x.category] || 0) + (x.duration_seconds || 0);

    // Daily series (last 14 days)
    const daily: { date: string; minutes: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now); d.setDate(now.getDate() - i); d.setHours(0,0,0,0);
      const next = new Date(d); next.setDate(d.getDate() + 1);
      const m = sum(s.filter(x => { const t = new Date(x.started_at); return t >= d && t < next; })) / 60;
      daily.push({ date: d.toISOString().slice(5,10), minutes: Math.round(m) });
    }

    // Heatmap (last 90 days)
    const heatmap: { date: string; minutes: number }[] = [];
    for (let i = 89; i >= 0; i--) {
      const d = new Date(now); d.setDate(now.getDate() - i); d.setHours(0,0,0,0);
      const next = new Date(d); next.setDate(d.getDate() + 1);
      const m = sum(s.filter(x => { const t = new Date(x.started_at); return t >= d && t < next; })) / 60;
      heatmap.push({ date: d.toISOString().slice(0,10), minutes: Math.round(m) });
    }

    // Streak
    let streak = 0;
    for (let i = heatmap.length - 1; i >= 0; i--) {
      if (heatmap[i].minutes > 0) streak++; else break;
    }

    // Productivity score: weighted from week activity
    const activeWeight = Math.min(30, (weekSec / 3600) * 3);
    const consistency = Math.min(20, streak * 3);
    const focusSessions = Math.min(20, s.filter(x => x.duration_seconds > 600 && new Date(x.started_at) >= weekAgo).length * 2);
    const codeLearn = Math.min(15, s.filter(x => ["Coding","Learning"].includes(x.category) && new Date(x.started_at) >= weekAgo).length * 2);
    const goal = Math.min(15, Math.round((weekSec / (10 * 3600)) * 15));
    const score = Math.round(activeWeight + consistency + focusSessions + codeLearn + goal);
    const tier = score >= 91 ? "Elite" : score >= 71 ? "High" : score >= 41 ? "Average" : "Low";

    return {
      totals: { totalSec, todaySec, weekSec, monthSec, streak, mostUsed, sessionCount: s.length },
      score: { value: score, tier },
      platforms: Object.entries(platforms).map(([name, sec]) => ({ name, seconds: sec })),
      categories: Object.entries(categories).map(([name, sec]) => ({ name, seconds: sec })),
      daily,
      heatmap,
      timeline: s.slice(0, 12).map(x => ({
        platform: x.platform, category: x.category, when: x.started_at,
        minutes: Math.round((x.duration_seconds || 0) / 60),
      })),
    };
  });

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({ question: z.string().min(1).max(500) });

export const askInsights = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data, context }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI not configured");

    const { data: sessions } = await context.supabase
      .from("sessions").select("platform,category,duration_seconds,started_at,prompt_count")
      .eq("user_id", context.userId).order("started_at", { ascending: false }).limit(500);

    const s = sessions ?? [];
    const now = new Date();
    const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
    const week = s.filter((x: any) => new Date(x.started_at) >= weekAgo);

    const summarize = (arr: any[]) => {
      const byP: Record<string, number> = {};
      const byC: Record<string, number> = {};
      let total = 0;
      for (const x of arr) {
        total += x.duration_seconds || 0;
        byP[x.platform] = (byP[x.platform] || 0) + (x.duration_seconds || 0);
        if (x.category) byC[x.category] = (byC[x.category] || 0) + (x.duration_seconds || 0);
      }
      return { totalMinutes: Math.round(total / 60), byPlatformMinutes: Object.fromEntries(Object.entries(byP).map(([k,v])=>[k,Math.round(v/60)])), byCategoryMinutes: Object.fromEntries(Object.entries(byC).map(([k,v])=>[k,Math.round(v/60)])), sessionCount: arr.length };
    };

    const context_summary = {
      last7Days: summarize(week),
      allTime: summarize(s),
      mostRecent: s.slice(0, 5).map((x: any) => ({
        platform: x.platform, category: x.category,
        minutes: Math.round((x.duration_seconds || 0) / 60),
        when: x.started_at,
      })),
    };

    const sys = `You are an AI productivity analyst for "AI Usage Intelligence". Answer the user's question using ONLY the JSON usage data provided. Be concise (2-4 sentences), specific with numbers, and friendly. If data is insufficient, say so.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: `User question: ${data.question}\n\nUsage data:\n${JSON.stringify(context_summary)}` },
        ],
      }),
    });
    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit — try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add credits in workspace billing.");
      throw new Error(`AI request failed (${res.status})`);
    }
    const json = await res.json();
    const answer = json.choices?.[0]?.message?.content ?? "No response.";
    return { answer };
  });

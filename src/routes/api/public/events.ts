import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Schema = z.object({
  platform: z.string().min(1).max(50),
  category: z.string().max(50).optional().nullable(),
  duration_seconds: z.number().int().min(0).max(86400),
  prompt_count: z.number().int().min(0).max(1000).optional().default(0),
  started_at: z.string().optional(),
  ended_at: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional().default({}),
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-token",
};

export const Route = createFileRoute("/api/public/events")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      POST: async ({ request }) => {
        const token = request.headers.get("x-api-token");
        if (!token || !token.startsWith("aui_")) {
          return new Response(JSON.stringify({ error: "Missing or invalid token" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });
        }
        let body: unknown;
        try { body = await request.json(); } catch { return new Response("Invalid JSON", { status: 400, headers: cors }); }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: "Invalid payload", details: parsed.error.flatten() }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: t, error: tErr } = await supabaseAdmin.from("api_tokens").select("user_id").eq("token", token).maybeSingle();
        if (tErr || !t) return new Response(JSON.stringify({ error: "Unknown token" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });

        const d = parsed.data;
        const { data: session, error: sErr } = await supabaseAdmin.from("sessions").insert({
          user_id: t.user_id,
          platform: d.platform,
          category: d.category ?? null,
          duration_seconds: d.duration_seconds,
          prompt_count: d.prompt_count ?? 0,
          started_at: d.started_at ?? new Date(Date.now() - d.duration_seconds * 1000).toISOString(),
          ended_at: d.ended_at ?? new Date().toISOString(),
        }).select("id").single();
        if (sErr) return new Response(JSON.stringify({ error: sErr.message }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });

        await supabaseAdmin.from("events").insert({
          user_id: t.user_id, session_id: session.id,
          event_type: "session_end", platform: d.platform, metadata: d.metadata ?? {},
        });
        await supabaseAdmin.from("api_tokens").update({ last_used_at: new Date().toISOString() }).eq("token", token);

        return new Response(JSON.stringify({ ok: true, session_id: session.id }), { status: 200, headers: { ...cors, "Content-Type": "application/json" } });
      },
    },
  },
});

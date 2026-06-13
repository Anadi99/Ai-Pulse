import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getOrCreateToken = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: existing } = await context.supabase
      .from("api_tokens").select("token").eq("user_id", context.userId).limit(1).maybeSingle();
    if (existing?.token) return { token: existing.token };
    const token = "aui_" + crypto.randomUUID().replace(/-/g, "");
    const { error } = await context.supabase.from("api_tokens").insert({
      user_id: context.userId, token, label: "Chrome Extension",
    });
    if (error) throw new Error(error.message);
    return { token };
  });

export const regenerateToken = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await context.supabase.from("api_tokens").delete().eq("user_id", context.userId);
    const token = "aui_" + crypto.randomUUID().replace(/-/g, "");
    await context.supabase.from("api_tokens").insert({ user_id: context.userId, token });
    return { token };
  });

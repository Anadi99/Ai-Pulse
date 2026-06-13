import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrCreateToken, regenerateToken } from "@/lib/extension.functions";
import { Button } from "@/components/ui/button";
import { Chrome, Copy, RefreshCw, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/extension")({
  head: () => ({ meta: [{ title: "Chrome Extension — AI Usage Intelligence" }] }),
  component: Ext,
});

function Ext() {
  const get = useServerFn(getOrCreateToken);
  const regen = useServerFn(regenerateToken);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["token"], queryFn: () => get() });
  const mut = useMutation({
    mutationFn: () => regen(),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["token"] }); toast.success("Token regenerated"); },
  });

  function copy() { if (data?.token) { navigator.clipboard.writeText(data.token); toast.success("Token copied"); } }

  function download() {
    fetch("/ai-usage-extension.zip")
      .then((r) => { if (!r.ok) throw new Error(`Failed (${r.status})`); return r.blob(); })
      .then((blob) => {
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
        a.download = "ai-usage-extension.zip"; a.click(); URL.revokeObjectURL(a.href);
      })
      .catch((e) => toast.error(e.message));
  }

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Chrome className="h-7 w-7 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chrome Extension</h1>
          <p className="text-sm text-muted-foreground">Install once. Track everywhere.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-elegant">
        <h2 className="font-semibold">Your API token</h2>
        <p className="mt-1 text-sm text-muted-foreground">The extension uses this token to securely send events to your account. Keep it private.</p>
        <div className="mt-4 flex items-center gap-2">
          <code className="flex-1 truncate rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs">{data?.token ?? "Loading…"}</code>
          <Button onClick={copy} variant="outline" size="sm"><Copy className="h-4 w-4" /></Button>
          <Button onClick={() => mut.mutate()} variant="outline" size="sm" disabled={mut.isPending}><RefreshCw className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-elegant">
        <h2 className="font-semibold">Install the extension</h2>
        <ol className="mt-4 space-y-3 text-sm">
          <li><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</span>Download the extension package.</li>
          <li><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</span>Unzip it on your computer.</li>
          <li><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>Open <code className="rounded bg-muted px-1.5 py-0.5">chrome://extensions</code> and toggle <strong>Developer mode</strong>.</li>
          <li><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">4</span>Click <strong>Load unpacked</strong> and select the unzipped folder.</li>
          <li><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">5</span>Open the extension popup and paste your token above.</li>
        </ol>
        <div className="mt-6 flex gap-2">
          <Button onClick={download} className="bg-gradient-to-r from-primary to-[oklch(0.72_0.21_305)] shadow-glow"><Download className="mr-2 h-4 w-4" />Download extension</Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card-gradient p-6 shadow-elegant">
        <h2 className="font-semibold">Supported AI platforms</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {["chat.openai.com","chatgpt.com","claude.ai","gemini.google.com","perplexity.ai","grok.com"].map((d) => (
            <code key={d} className="rounded-md border border-border bg-background px-2 py-1">{d}</code>
          ))}
        </div>
      </div>
    </div>
  );
}

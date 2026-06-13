import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getOverview } from "@/lib/dashboard.functions";
import { Button } from "@/components/ui/button";
import { Download, FileJson } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "Reports — AI Usage Intelligence" }] }),
  component: Reports,
});

function fmt(sec: number) { const h = Math.floor(sec/3600); const m = Math.floor((sec%3600)/60); return h > 0 ? `${h}h ${m}m` : `${m}m`; }

function Reports() {
  const get = useServerFn(getOverview);
  const { data } = useQuery({ queryKey: ["overview"], queryFn: () => get() });

  function exportJSON() {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `ai-usage-report-${new Date().toISOString().slice(0,10)}.json`; a.click();
    toast.success("Report exported");
  }
  function exportCSV() {
    if (!data) return;
    const rows = [["platform","seconds","minutes"], ...data.platforms.map(p => [p.name, String(p.seconds), String(Math.round(p.seconds/60))])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `ai-usage-report-${new Date().toISOString().slice(0,10)}.csv`; a.click();
    toast.success("CSV exported");
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weekly Report</h1>
        <p className="text-sm text-muted-foreground">Your AI usage summary</p>
      </div>

      {data && (
        <div className="rounded-2xl border border-border bg-card-gradient p-8 shadow-elegant">
          <div className="grid gap-6 sm:grid-cols-3">
            <Stat label="Total this week" value={fmt(data.totals.weekSec)} />
            <Stat label="Productivity score" value={`${data.score.value} · ${data.score.tier}`} />
            <Stat label="Most used" value={data.totals.mostUsed} />
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Platform rankings</h3>
            <ol className="space-y-2">
              {[...data.platforms].sort((a,b)=>b.seconds-a.seconds).map((p, i) => (
                <li key={p.name} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                  <span><span className="mr-3 text-muted-foreground">#{i+1}</span>{p.name}</span>
                  <span className="text-sm text-muted-foreground">{fmt(p.seconds)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recommendations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Your streak is {data.totals.streak} days — keep daily consistency to push your score higher.</li>
              <li>• Consider longer focused sessions on {data.totals.mostUsed} to maximize deep work value.</li>
              <li>• Try diversifying across tools for different task categories.</li>
            </ul>
          </div>

          <div className="mt-8 flex gap-2">
            <Button onClick={exportJSON} variant="outline"><FileJson className="mr-2 h-4 w-4" />Export JSON</Button>
            <Button onClick={exportCSV} variant="outline"><Download className="mr-2 h-4 w-4" />Export CSV</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

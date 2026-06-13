// AI Usage Intelligence — background service worker
const PLATFORMS = {
  "chat.openai.com": "ChatGPT",
  "chatgpt.com": "ChatGPT",
  "claude.ai": "Claude",
  "gemini.google.com": "Gemini",
  "perplexity.ai": "Perplexity",
  "www.perplexity.ai": "Perplexity",
  "grok.com": "Grok",
};
const IDLE_SECONDS = 60;
let active = null; // { platform, startedAt, tabId }

function platformFor(url) {
  try { return PLATFORMS[new URL(url).hostname] ?? null; } catch { return null; }
}

async function getConfig() {
  return await chrome.storage.local.get(["apiToken", "apiUrl"]);
}

async function flush(reason) {
  if (!active) return;
  const ended = Date.now();
  const duration = Math.round((ended - active.startedAt) / 1000);
  const session = { ...active, endedAt: ended, duration };
  active = null;
  if (duration < 5) return;
  const { apiToken, apiUrl } = await getConfig();
  if (!apiToken || !apiUrl) return;
  try {
    await fetch(apiUrl.replace(/\/$/, "") + "/api/public/events", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-token": apiToken },
      body: JSON.stringify({
        platform: session.platform,
        duration_seconds: duration,
        started_at: new Date(session.startedAt).toISOString(),
        ended_at: new Date(session.endedAt).toISOString(),
        metadata: { reason },
      }),
    });
  } catch (e) { console.warn("AUI flush failed", e); }
}

async function start(tab) {
  const p = platformFor(tab.url || "");
  if (!p) { await flush("switched_off_platform"); return; }
  if (active && active.platform === p && active.tabId === tab.id) return;
  await flush("switch");
  active = { platform: p, startedAt: Date.now(), tabId: tab.id };
}

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId).catch(() => null);
  if (tab) await start(tab);
});
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status === "complete" && tab.active) await start(tab);
});
chrome.windows.onFocusChanged.addListener(async (winId) => {
  if (winId === chrome.windows.WINDOW_ID_NONE) await flush("window_blur");
});
chrome.idle.setDetectionInterval(IDLE_SECONDS);
chrome.idle.onStateChanged.addListener(async (state) => {
  if (state !== "active") await flush("idle");
});

// Periodic flush so long sessions still report
chrome.alarms?.create?.("flush", { periodInMinutes: 5 });
chrome.alarms?.onAlarm?.addListener(async () => {
  if (active && Date.now() - active.startedAt > 5 * 60 * 1000) {
    const tabId = active.tabId;
    await flush("periodic");
    const tab = await chrome.tabs.get(tabId).catch(() => null);
    if (tab) await start(tab);
  }
});

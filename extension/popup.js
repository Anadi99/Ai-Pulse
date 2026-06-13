const $ = (id) => document.getElementById(id);
chrome.storage.local.get(["apiToken", "apiUrl"]).then(({ apiToken, apiUrl }) => {
  $("token").value = apiToken || "";
  $("url").value = apiUrl || "";
  $("dash").href = apiUrl || "#";
});
$("save").addEventListener("click", async () => {
  const apiToken = $("token").value.trim();
  const apiUrl = $("url").value.trim().replace(/\/$/, "");
  if (!apiToken.startsWith("aui_")) { $("status").textContent = "Token must start with aui_"; $("status").className="status err"; return; }
  if (!/^https?:\/\//.test(apiUrl)) { $("status").textContent = "Enter full URL incl. https://"; $("status").className="status err"; return; }
  await chrome.storage.local.set({ apiToken, apiUrl });
  $("status").textContent = "Saved — tracking active";
  $("status").className = "status";
  $("dash").href = apiUrl;
});

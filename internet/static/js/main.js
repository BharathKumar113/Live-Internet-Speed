
    const $ = (id) => document.getElementById(id);
    const runBtn = $("run"), quickBtn = $("quick");
    const pingEl = $("ping"), downEl = $("down"), upEl = $("up");
    const pingStatus = $("pingStatus"), serverEl = $("server"), logEl = $("log");

    function log(msg){ logEl.textContent += `[${new Date().toLocaleTimeString()}] ${msg}\n`; logEl.scrollTop = logEl.scrollHeight; }

    function setRunning(running){
      runBtn.disabled = running; quickBtn.disabled = running;
      runBtn.textContent = running ? "Testing…" : "Run Test";
    }

    quickBtn.onclick = async () => {
      try {
        quickBtn.disabled = true;
        log("Quick ping…");
        const res = await fetch("/live_latency");
        const data = await res.json();
        if(!data.ok) throw new Error(data.error || "Latency failed");
        pingEl.textContent = data.ping_ms + " ms";
        pingStatus.textContent = data.ping_ms < 50 ? "Great" : (data.ping_ms < 120 ? "OK" : "Slow");
        log(`Quick ping: ${data.ping_ms} ms`);
      } catch (e) {
        log("Quick ping error: " + e.message);
      } finally {
        quickBtn.disabled = false;
      }
    };

    runBtn.onclick = async () => {
      setRunning(true);
      pingEl.textContent = downEl.textContent = upEl.textContent = "—";
      serverEl.textContent = "";
      log("Starting full speed test (can take a bit)…");
      try {
        const res = await fetch("/run_test");
        const data = await res.json();
        if(!data.ok) throw new Error(data.error || "Speed test failed");
        pingEl.textContent = (data.ping_ms ?? "—") + (data.ping_ms ? " ms" : "");
        downEl.textContent = data.download_mbps + " ";
        upEl.textContent = data.upload_mbps + " ";
        pingStatus.textContent = data.ping_ms != null
          ? (data.ping_ms < 50 ? "Great" : (data.ping_ms < 120 ? "OK" : "Slow"))
          : "";
        serverEl.textContent = `Server: ${data.server.sponsor} (${data.server.country}) — ${data.server.host}`;
        log(`Done. ↓ ${data.download_mbps} Mbps, ↑ ${data.upload_mbps} Mbps, ping ${data.ping_ms} ms`);
      } catch (e) {
        log("Error: " + e.message);
      } finally {
        setRunning(false);
      }
    };
  
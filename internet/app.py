from flask import Flask, render_template, jsonify
from speedtest import Speedtest
import time
import requests

app = Flask(__name__)

def quick_latency(url="https://www.google.com/generate_204", timeout=5):
    try:
        t0 = time.perf_counter()
        r = requests.get(url, timeout=timeout)
        r.raise_for_status()
        t1 = time.perf_counter()
        return round((t1 - t0) * 1000, 2)
    except Exception:
        return None

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/run_test")
def run_test():
    try:
        st = Speedtest(secure=True)
        st.get_servers()
        best = st.get_best_server()
        ping = round(best["latency"], 2) if "latency" in best else None
        dl = round(st.download() / 1e6, 2)
        ul = round(st.upload() / 1e6, 2)
        return jsonify({
            "ok": True,
            "server": {
                "host": best.get("host"),
                "country": best.get("country"),
                "sponsor": best.get("sponsor")
            },
            "ping_ms": ping,
            "download_mbps": dl,
            "upload_mbps": ul
        })
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.route("/live_latency")
def live_latency():
    ms = quick_latency()
    if ms is None:
        return jsonify({"ok": False, "error": "Latency check failed"}), 500
    return jsonify({"ok": True, "ping_ms": ms})

if __name__ == "__main__":
    app.run(debug=True)

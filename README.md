# ⚡ Live Internet Speed  

![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg?logo=python&logoColor=white)  
![Flask](https://img.shields.io/badge/flask-2.0+-black.svg?logo=flask)  
![Speedtest](https://img.shields.io/badge/speedtest-cli-orange)  
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)  
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)  
![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)


A modern **Flask-based web application** that measures your **internet speed** and **latency** in real-time.  

It uses the [`speedtest-cli`](https://github.com/sivel/speedtest-cli) library to check **download/upload speeds** and a lightweight `requests` ping to estimate **latency** to Google.  

---

## ✨ Why this project?  

🌍 In today’s world, stable internet is essential.  
📌 This project helps you:  
- 📊 Measure your **download and upload speeds**.  
- ⏱️ Check real-time **latency (ping)** to external servers.  
- 🌐 Identify the **best server** available near you.  
- 🖥️ Run your own speed test without depending on third-party websites.  

---

## 🚀 Features  

✔️ Real-time **download, upload, and ping measurement**    
✔️ Uses **Flask + Speedtest.net servers**  
✔️ Additional **live latency endpoint** for quick pings  
✔️ JSON response for easy integration with frontend dashboards  

---

## 🛠️ How it works  

1. The user opens the **Flask web app**.  
2. `/run_test` endpoint runs a **full internet speed test** using `speedtest-cli`.  
   - Finds the **best server**  
   - Measures **download speed**  
   - Measures **upload speed**  
3. `/live_latency` endpoint performs a **lightweight ping** to Google for quick latency check.  

---

## 📂 Project Structure  

```
📦 live-internet-speed
 ┣ 📜 app.py             # Main Flask app
 ┣ 📂 templates
 ┃ ┗ 📜 index.html       # User interface
 ┗ 📜 README.md          # Project documentation
```

---

## ⚡ Installation  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/BharathKumar113/Live-Internet-Speed.git
cd Live-Internet-Speed
```

### 2️⃣ (Optional) Create a virtual environment  
```bash
python -m venv venv
source venv/bin/activate   # On Linux/Mac
venv\Scripts\activate      # On Windows
```

### 3️⃣ Install dependencies  
```bash
pip install -r requirements.txt
```

Or install directly:  
```bash
pip install flask speedtest-cli requests
```

### 4️⃣ Run the application  
```bash
python app.py
```

Visit: **http://127.0.0.1:5000/** in your browser.  

---

## 🎯 Usage Guide  

### ✅ Run Full Speed Test  
`GET /run_test` → returns:  
```json
{
  "ok": true,
  "server": {
    "host": "speedtest.server.com",
    "country": "India",
    "sponsor": "ISP Ltd"
  },
  "ping_ms": 21.32,
  "download_mbps": 85.43,
  "upload_mbps": 12.57
}
```
---
### ✅ Quick Latency Check  
`GET /live_latency` → returns:  
```json
{
  "ok": true,
  "ping_ms": 35.7
}
```
---

## ⚖️ Notes  

- Latency is checked against **Google (generate_204)** endpoint.  
- Speed values may vary depending on your **ISP, server location, and time of day**.  
- Use it to **monitor your network performance** or integrate into dashboards.  

---


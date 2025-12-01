# 🚀 Quick Start Guide

## ✅ What We Just Did

1. ✅ Installed backend dependencies
2. ✅ Installed sidebar dependencies  
3. ✅ Built the sidebar (created `sidebar-dist` folder)

## 📋 Next Steps

### Step 1: Start the Backend Server

Open a **new terminal window** and run:

```bash
cd /Users/margaux/nichepilot/backend
npm start
```

You should see:
```
NichePilot backend server running on http://localhost:3000
```

**Keep this terminal open** - the server needs to keep running!

---

### Step 2: Load the Extension in Chrome

1. **Open Chrome** and go to: `chrome://extensions/`
   - You can copy/paste this into the address bar

2. **Enable Developer Mode**
   - Look for a toggle switch in the **top right corner**
   - Turn it ON (it will be blue/highlighted)

3. **Click "Load unpacked"**
   - This button appears at the top left when Developer Mode is on

4. **Select the extension folder**
   - Navigate to: `/Users/margaux/nichepilot/extension`
   - Click "Select" or "Open"

5. **You should see NichePilot appear** in your extensions list!

---

### Step 3: Use the Extension

1. **Go to X (Twitter)**
   - Visit: `https://x.com` or `https://twitter.com`

2. **Look for the sidebar**
   - You should see a white sidebar on the **right side** of the page
   - It says "NichePilot" at the top

3. **Set it up:**
   - Enter your handle (e.g., `@yourhandle`)
   - Select a niche from the dropdown
   - Click "Generate Growth Plan"

4. **Explore:**
   - See 20 accounts to follow
   - See 10 tweets to comment on
   - Click "Show Suggestions" on tweets to get AI comment ideas
   - Check off your daily tasks

---

## 🐛 Troubleshooting

### Sidebar doesn't appear?
- Make sure you built the sidebar (we just did this ✅)
- Reload the extension: Go to `chrome://extensions/` → Click the reload icon on NichePilot
- Refresh the x.com page

### Backend not working?
- Make sure the backend server is running (Step 1)
- Check the terminal - you should see it running on port 3000
- Try visiting: http://localhost:3000/health (should show `{"status":"ok"}`)

### Can't load extension?
- Make sure you selected the `extension` folder (not `nichepilot` or `sidebar`)
- The folder should contain `manifest.json`, `background.js`, etc.

---

## 📝 Notes

- **Backend must be running** for the extension to work (it needs the API)
- The extension stores your data locally in Chrome (handle, niche, tasks)
- No login required - just enter your handle manually
- All actions are manual - the extension only suggests, never automates

---

## 🎉 You're All Set!

Once you complete Steps 1-3, you're ready to use NichePilot!


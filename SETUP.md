# Crystal Collector Arena - Setup Guide

Two ways to play: **Standalone** (easiest) or **Local Server** (for iPhone testing)

---

## 🎮 Option 1: Standalone Version (NO SERVER NEEDED)

**Perfect for quick play on any device!**

### Desktop:
1. Download `crystal-collector-standalone.html` from this repo
2. Double-click the file to open it in your browser
3. Play!

### iPhone/Mobile:
1. Download `crystal-collector-standalone.html` to your iPhone
2. Open it in Safari (Files app → tap the file)
3. Play with swipe gestures or D-pad!

**Note:** This works offline - no internet or server needed!

---

## 🌐 Option 2: Local Server (For Network Play)

**Use this if you want to play on iPhone while server runs on computer**

### Step 1: Clone the Repository

```bash
git clone https://github.com/BJHorseman2/crystal-collector-hytopia.git
cd crystal-collector-hytopia
git checkout claude/debug-run-command-011CUNok5Wx3eqn91BjUU9Xb
```

### Step 2: Start the Server

```bash
npm start
```

You should see:
```
=================================
Crystal Collector Arena Server
=================================
Server running at http://localhost:8080/
Press Ctrl+C to stop
=================================
```

### Step 3: Play on Desktop

Open your browser and go to:
```
http://localhost:8080
```

### Step 4: Play on iPhone

1. **Find your computer's IP address:**
   - **Mac:** System Settings → Network → WiFi → Details → look for "IP Address"
   - **Windows:** Open Command Prompt → type `ipconfig` → look for "IPv4 Address"
   - **Linux:** Terminal → type `ip addr` or `ifconfig`

   Example IP: `192.168.1.100`

2. **Make sure your iPhone is on the same WiFi network as your computer**

3. **On your iPhone, open Safari and go to:**
   ```
   http://YOUR-COMPUTER-IP:8080
   ```

   Example: `http://192.168.1.100:8080`

4. **Play!** Use swipe gestures or tap the D-pad buttons

---

## 🎯 Controls

### Desktop:
- Arrow keys or WASD to move

### Mobile/iPhone:
- Swipe on the game grid to move
- Or tap the virtual D-pad buttons

---

## 🔧 Troubleshooting

**Can't reach server on iPhone:**
- Ensure both devices are on the same WiFi
- Check firewall settings on your computer
- Try disabling firewall temporarily
- Make sure the server is running (check terminal)

**Standalone file not working:**
- Make sure you're opening it in a modern browser (Safari, Chrome, Firefox)
- Check that JavaScript is enabled

**Game not responding on iPhone:**
- Refresh the page
- Clear browser cache
- Try Safari if using another browser

---

## 📁 Files

- `crystal-collector-standalone.html` - Single file version (no server needed)
- `public/index.html` - Server version game page
- `public/game.js` - Game logic
- `public/style.css` - Game styles
- `server.js` - Simple HTTP server

---

Enjoy playing Crystal Collector Arena! 🎮✨

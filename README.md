# Crystal Collector Arena

A fun, browser-based crystal collecting game built with vanilla HTML, CSS, and JavaScript.

## About

Crystal Collector Arena is a simple grid-based game where you control a player moving around an 11x11 arena collecting crystals for points. The game features diamond and gold crystals with different point values, and tracks your high score locally.

## Features

- 🎮 **Simple Controls**: Use arrow keys or WASD to move around
- 🔷 **Diamond Crystals**: Worth 10 points each
- 🟡 **Gold Crystals**: Worth 50 points each (20% spawn rate)
- ⏱️ **Time Tracking**: See how long you've been playing
- 🏆 **High Score**: Tracks your best score using localStorage
- ✨ **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Auto-Respawn**: Crystals respawn 3 seconds after collection

## How to Play

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

3. Use the arrow keys or WASD to move your player (🎮)
4. Collect diamonds (🔷) and gold (🟡) to earn points
5. Try to beat your high score!

## Project Structure

```
crystal-collector-hytopia/
├── public/
│   ├── index.html    # Main game page
│   ├── style.css     # Game styling
│   └── game.js       # Game logic
├── server.js         # Simple HTTP server
├── package.json      # Project configuration
└── README.md         # This file
```

## Development

The game uses no external dependencies beyond Node.js built-in modules for the server.

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the server with auto-reload on changes

## Game Mechanics

- **Grid Size**: 11x11 cells
- **Initial Crystals**: 10-15 crystals spawn at game start
- **Respawn Time**: 3 seconds after collection
- **Gold Chance**: 20% chance when spawning new crystals
- **Scoring**:
  - Diamond: 10 points
  - Gold: 50 points

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid
- LocalStorage API

## Technical Details

- Pure vanilla JavaScript (no frameworks)
- CSS Grid for responsive layout
- LocalStorage for persistent high scores
- Simple Node.js HTTP server
- No build process required

## Future Enhancements

Potential features to add:
- Multiple difficulty levels
- Power-ups and obstacles
- Multiplayer support
- Sound effects and music
- Leaderboard with multiple scores
- Mobile touch controls

## License

ISC

---

Enjoy playing Crystal Collector Arena! 🎮✨

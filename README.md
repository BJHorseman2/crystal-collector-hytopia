# Crystal Collector Arena - Hytopia Game

A competitive multiplayer crystal collecting game for the Hytopia platform!

## Game Features
- Collect diamond crystals (10 points) and gold crystals (50 points)
- First player to 500 points wins
- Crystals respawn after collection
- Real-time leaderboard
- Multiplayer support up to 16 players

## Local Testing

### 1. Start the server:
```bash
npm start
```

### 2. Connect to the game:
The server runs on port 8080. You can connect via:
- http://localhost:8080
- Or use Hytopia's web client when available

## Commands
- `/score` - Check your current score
- `/help` - Show help information

## Deployment to Hytopia Platform

### 1. Create a Hytopia account at https://create.hytopia.com

### 2. Get your credentials:
- HYTOPIA_API_KEY
- HYTOPIA_GAME_ID
- HYTOPIA_LOBBY_ID

### 3. Set environment variables:
```bash
export HYTOPIA_API_KEY="your-api-key"
export HYTOPIA_GAME_ID="your-game-id"
export HYTOPIA_LOBBY_ID="your-lobby-id"
```

### 4. Deploy using Hytopia CLI:
```bash
npx hytopia deploy
```

## Project Structure
- `index.js` - Main server code with game logic
- `hytopia.json` - Game configuration
- `package.json` - Project dependencies

## Game Mechanics
- Players spawn in the arena
- Break crystal blocks to collect them
- Crystals respawn 3 seconds after collection
- Game resets 5 seconds after someone wins

## Development
Built with Hytopia SDK v0.10.16
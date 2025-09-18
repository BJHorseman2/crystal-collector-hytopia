import { startServer } from 'hytopia';

startServer((world) => {
  console.log('Crystal Collector Arena initialized!');

  // Initialize game state
  const playerScores = new Map();

  // Handle player joining
  world.onPlayerJoin = (player) => {
    console.log(`Player ${player.username} joined!`);

    // Initialize player score
    playerScores.set(player.id, 0);

    // Spawn the player
    player.spawn();

    // Send welcome message
    player.sendMessage('Welcome to Crystal Collector Arena!');
    player.sendMessage('Collect crystals to earn points!');

    // Create some initial blocks for the player to see
    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        // Create floor
        world.setBlock('GRASS_BLOCK', x, 0, z);

        // Randomly place some crystal blocks
        if (Math.random() < 0.1) {
          const y = Math.floor(Math.random() * 3) + 1;
          const isGold = Math.random() < 0.2;
          world.setBlock(isGold ? 'GOLD_BLOCK' : 'DIAMOND_BLOCK', x, y, z);
        }
      }
    }
  };

  // Handle player leaving
  world.onPlayerLeave = (player) => {
    console.log(`Player ${player.username} left.`);
    playerScores.delete(player.id);
  };

  // Handle block breaks
  world.onPlayerBlockBreak = (player, x, y, z, blockType) => {
    console.log(`Player ${player.username} broke ${blockType} at ${x}, ${y}, ${z}`);

    if (blockType === 'DIAMOND_BLOCK') {
      const score = playerScores.get(player.id) || 0;
      const newScore = score + 10;
      playerScores.set(player.id, newScore);
      player.sendMessage(`You collected a diamond! +10 points. Total: ${newScore}`);

      // Respawn crystal after 3 seconds
      setTimeout(() => {
        world.setBlock('DIAMOND_BLOCK', x, y, z);
      }, 3000);

      return true; // Allow the break
    }

    if (blockType === 'GOLD_BLOCK') {
      const score = playerScores.get(player.id) || 0;
      const newScore = score + 50;
      playerScores.set(player.id, newScore);
      player.sendMessage(`You collected gold! +50 points. Total: ${newScore}`);

      // Respawn crystal after 3 seconds
      setTimeout(() => {
        world.setBlock('GOLD_BLOCK', x, y, z);
      }, 3000);

      return true; // Allow the break
    }

    // Don't allow breaking other blocks
    return false;
  };

  // Handle chat messages
  world.onPlayerChat = (player, message) => {
    console.log(`${player.username}: ${message}`);

    if (message === '/score') {
      const score = playerScores.get(player.id) || 0;
      player.sendMessage(`Your score: ${score} points`);
      return false; // Don't broadcast the command
    }

    if (message === '/help') {
      player.sendMessage('=== HELP ===');
      player.sendMessage('Break DIAMOND blocks for 10 points');
      player.sendMessage('Break GOLD blocks for 50 points');
      player.sendMessage('Commands: /score, /help');
      return false;
    }

    return true; // Allow normal chat
  };

  console.log('Game server started successfully!');
  console.log('Connect at https://hytopia.com/play');
  console.log('Server URL: localhost:8080');
});
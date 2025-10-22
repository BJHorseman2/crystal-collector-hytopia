// Game configuration
const GRID_SIZE = 11;
const DIAMOND_VALUE = 10;
const GOLD_VALUE = 50;
const RESPAWN_TIME = 3000; // 3 seconds

// Game state
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameTime = 0;
let gameInterval;
let player = { x: 5, y: 5 }; // Start in center
let crystals = [];

// Initialize game
function initGame() {
    score = 0;
    gameTime = 0;
    player = { x: 5, y: 5 };
    crystals = [];

    updateScore();
    updateHighScore();
    updateTime();

    createGrid();
    spawnInitialCrystals();

    // Start game timer
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        gameTime++;
        updateTime();
    }, 1000);
}

// Create the game grid
function createGrid() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${x}-${y}`;
            gameArea.appendChild(cell);
        }
    }

    renderGame();
}

// Spawn initial crystals
function spawnInitialCrystals() {
    // Spawn about 10-15 crystals randomly
    const numCrystals = 10 + Math.floor(Math.random() * 6);

    for (let i = 0; i < numCrystals; i++) {
        spawnCrystal();
    }
}

// Spawn a single crystal at random position
function spawnCrystal() {
    let x, y;
    let attempts = 0;

    // Find empty spot
    do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
        attempts++;
    } while ((x === player.x && y === player.y || crystalAt(x, y)) && attempts < 100);

    if (attempts < 100) {
        const isGold = Math.random() < 0.2; // 20% chance for gold
        crystals.push({ x, y, type: isGold ? 'gold' : 'diamond' });
    }
}

// Check if there's a crystal at position
function crystalAt(x, y) {
    return crystals.find(c => c.x === x && c.y === y);
}

// Render the game state
function renderGame() {
    // Clear all cells
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = document.getElementById(`cell-${x}-${y}`);
            cell.className = 'cell';
            cell.textContent = '';
        }
    }

    // Render crystals
    crystals.forEach(crystal => {
        const cell = document.getElementById(`cell-${crystal.x}-${crystal.y}`);
        cell.classList.add(crystal.type);
        cell.textContent = crystal.type === 'gold' ? '🟡' : '🔷';
    });

    // Render player
    const playerCell = document.getElementById(`cell-${player.x}-${player.y}`);
    playerCell.classList.add('player');
    playerCell.textContent = '🎮';
}

// Move player
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    // Check boundaries
    if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) {
        return;
    }

    player.x = newX;
    player.y = newY;

    // Check for crystal collection
    const crystal = crystalAt(player.x, player.y);
    if (crystal) {
        collectCrystal(crystal);
    }

    renderGame();
}

// Collect crystal
function collectCrystal(crystal) {
    const points = crystal.type === 'gold' ? GOLD_VALUE : DIAMOND_VALUE;
    score += points;
    updateScore();

    // Remove crystal
    crystals = crystals.filter(c => c !== crystal);

    // Respawn after delay
    setTimeout(() => {
        spawnCrystal();
        renderGame();
    }, RESPAWN_TIME);

    // Check high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        updateHighScore();
    }
}

// Update UI
function updateScore() {
    document.getElementById('score').textContent = score;
}

function updateHighScore() {
    document.getElementById('highScore').textContent = highScore;
}

function updateTime() {
    document.getElementById('time').textContent = gameTime;
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            e.preventDefault();
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            e.preventDefault();
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            e.preventDefault();
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            e.preventDefault();
            movePlayer(1, 0);
            break;
    }
});

// Restart button
document.getElementById('restartBtn').addEventListener('click', initGame);

// Start game on load
initGame();

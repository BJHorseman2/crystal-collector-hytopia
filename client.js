import { HYTOPIA } from 'hytopia';

const game = new HYTOPIA.Game();

let scoreboard = [];
let myScore = 0;

game.onConnect = () => {
  console.log('Connected to Crystal Collector Arena!');
  initializeUI();
};

game.onMessage = (message) => {
  switch (message.type) {
    case 'welcome':
      showNotification(message.message, 'info');
      break;

    case 'crystal_collected':
      myScore = message.totalScore;
      const color = message.crystalColor === 'gold' ? '#FFD700' : '#4169E1';
      showNotification(`+${message.points} points!`, 'success', color);
      updateMyScore();
      break;

    case 'scoreboard_update':
      scoreboard = message.scores;
      updateScoreboard();
      break;

    case 'game_won':
      showNotification(`${message.winner} wins with ${message.score} points!`, 'victory');
      break;

    case 'game_reset':
      myScore = 0;
      showNotification(message.message, 'info');
      updateMyScore();
      break;

    case 'score_check':
      showNotification(`Your score: ${message.score}`, 'info');
      break;
  }
};

function initializeUI() {
  const ui = document.createElement('div');
  ui.id = 'game-ui';
  ui.innerHTML = `
    <style>
      #game-ui {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        font-family: 'Arial', sans-serif;
        z-index: 1000;
      }

      #scoreboard {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 15px;
        border-radius: 10px;
        min-width: 200px;
        pointer-events: auto;
      }

      #scoreboard h3 {
        margin: 0 0 10px 0;
        color: #FFD700;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      }

      .score-entry {
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
        padding: 5px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
      }

      .score-entry.me {
        background: rgba(255, 215, 0, 0.3);
        border: 1px solid #FFD700;
      }

      #my-score {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 10px 30px;
        border-radius: 30px;
        font-size: 24px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      }

      #notifications {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }

      .notification {
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        margin: 10px;
        font-size: 20px;
        animation: fadeInOut 2s ease-in-out;
        box-shadow: 0 4px 15px rgba(0,0,0,0.5);
      }

      .notification.success {
        background: rgba(0, 255, 0, 0.8);
      }

      .notification.victory {
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        font-size: 30px;
        animation: victory 3s ease-in-out;
      }

      @keyframes fadeInOut {
        0% { opacity: 0; transform: scale(0.5); }
        20% { opacity: 1; transform: scale(1.1); }
        30% { transform: scale(1); }
        80% { opacity: 1; }
        100% { opacity: 0; }
      }

      @keyframes victory {
        0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
        50% { opacity: 1; transform: scale(1.2) rotate(10deg); }
        100% { opacity: 0; transform: scale(1) rotate(0deg); }
      }

      #controls {
        position: absolute;
        bottom: 100px;
        left: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 15px;
        border-radius: 10px;
      }

      #controls h4 {
        margin: 0 0 10px 0;
        color: #4169E1;
      }

      #controls div {
        margin: 5px 0;
        font-size: 14px;
      }
    </style>

    <div id="scoreboard">
      <h3>🏆 Leaderboard</h3>
      <div id="score-list"></div>
    </div>

    <div id="my-score">Score: 0</div>

    <div id="notifications"></div>

    <div id="controls">
      <h4>Controls</h4>
      <div>WASD - Move</div>
      <div>Space - Jump</div>
      <div>Mouse - Look</div>
      <div>Chat: /score - Check score</div>
    </div>
  `;

  document.body.appendChild(ui);
}

function updateScoreboard() {
  const scoreList = document.getElementById('score-list');
  if (!scoreList) return;

  scoreList.innerHTML = scoreboard
    .map((entry, index) => {
      const isMe = entry.username === game.localPlayer?.username;
      return `
        <div class="score-entry ${isMe ? 'me' : ''}">
          <span>${index + 1}. ${entry.username}</span>
          <span>${entry.score}</span>
        </div>
      `;
    })
    .join('');
}

function updateMyScore() {
  const scoreElement = document.getElementById('my-score');
  if (scoreElement) {
    scoreElement.textContent = `Score: ${myScore}`;
    scoreElement.style.animation = 'none';
    setTimeout(() => {
      scoreElement.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
  }
}

function showNotification(message, type = 'info', color = null) {
  const notifications = document.getElementById('notifications');
  if (!notifications) return;

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  if (color) {
    notification.style.background = color;
  }

  notifications.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, type === 'victory' ? 3000 : 2000);
}

game.controls = {
  moveSpeed: 10,
  jumpHeight: 8,
  mouseSensitivity: 0.002,
};

game.start();
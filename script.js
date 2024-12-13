document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const instructionScreen = document.getElementById("instruction-screen");
  const gameOverScreen = document.getElementById("game-over-screen");
  const finalScore = document.getElementById("final-score");
  const pointsDisplay = document.getElementById("points-display");
  let player = document.getElementById("player");
  let playerX = 100;
  let playerY = 100;
  let points = 0;
  let keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  document.getElementById("start-button").addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    startGame();
  });

  document.getElementById("instruction-button").addEventListener("click", () => {
    startScreen.style.display = "none";
    instructionScreen.style.display = "block";
  });

  document.getElementById("back-to-start").addEventListener("click", () => {
    instructionScreen.style.display = "none";
    startScreen.style.display = "block";
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    startScreen.style.display = "block";
  });

  function startGame() {
    points = 0;
    pointsDisplay.textContent = `Punkty: ${points}`;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
    document.addEventListener("keydown", (e) => {
      if (e.key in keysPressed) {
        keysPressed[e.key] = true;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key in keysPressed) {
        keysPressed[e.key] = false;
      }
    });

    const gameInterval = setInterval(() => {
      movePlayer();
      pointsDisplay.textContent = `Punkty: ${points}`;
      if (checkCollisionWithEnemies()) {
        clearInterval(gameInterval);
        endGame();
      }
    }, 1000 / 60);
  }

  function movePlayer() {
    const speed = 5;
    let moveX = 0;
    let moveY = 0;
    if (keysPressed.ArrowUp) moveY -= speed;
    if (keysPressed.ArrowDown) moveY += speed;
    if (keysPressed.ArrowLeft) moveX -= speed;
    if (keysPressed.ArrowRight) moveX += speed;
    playerX += moveX;
    playerY += moveY;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
  }

  function checkCollisionWithEnemies() {
    return false;
  }

  function endGame() {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    finalScore.textContent = `Wynik: ${points}`;
  }
 });
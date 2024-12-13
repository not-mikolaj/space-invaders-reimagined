class FlyingObject {

    constructor(elementId, startX, startY) {
  
      this.element = document.getElementById(elementId);
  
      this.x = startX;
  
      this.y = startY;
  
      this.speed = 10;
  
      this.updatePosition();
  
    }
  
    move(direction) {
  
      switch (direction) {
  
        case "ArrowUp":
  
          this.y -= this.speed;
  
          break;
  
        case "ArrowDown":
  
          this.y += this.speed;
  
          break;
  
        case "ArrowLeft":
  
          this.x -= this.speed;
  
          break;
  
        case "ArrowRight":
  
          this.x += this.speed;
  
          break;
  
      }
  
      this.updatePosition();
  
    }
  
    updatePosition() {
  
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  
    }
  
    getBounds() {
  
      return this.element.getBoundingClientRect();
  
    }
  
  }
  
  class AutonomousObject {
  
    constructor(elementId, startX, startY, speedX, speedY) {
  
      this.element = document.getElementById(elementId);
  
      this.x = startX;
  
      this.y = startY;
  
      this.speedX = speedX;
  
      this.speedY = speedY;
  
      this.updatePosition();
  
    }
  
    move() {
  
      this.x += this.speedX;
  
      this.y += this.speedY;
  
      const bounds = document.body.getBoundingClientRect();
  
      if (this.x <= 0 || this.x + this.element.offsetWidth >= bounds.width) {
  
        this.speedX = -this.speedX;
  
      }
  
      if (this.y <= 0 || this.y + this.element.offsetHeight >= bounds.height) {
  
        this.speedY = -this.speedY;
  
      }
  
      this.updatePosition();
  
    }
  
    updatePosition() {
  
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  
    }
  
    getBounds() {
  
      return this.element.getBoundingClientRect();
  
    }
  
  }
  
  function checkCollision(obj1, obj2) {
  
    const rect1 = obj1.getBounds();
  
    const rect2 = obj2.getBounds();
  
    return !(
  
      rect1.right < rect2.left ||
  
      rect1.left > rect2.right ||
  
      rect1.bottom < rect2.top ||
  
      rect1.top > rect2.bottom
  
    );
  
  }
  
  document.addEventListener("DOMContentLoaded", () => {
  
    const startScreen = document.getElementById("start-screen");
  
    const gameScreen = document.getElementById("game-screen");
  
    const gameOverScreen = document.getElementById("game-over-screen");
  
    const instructionScreen = document.getElementById("instruction-screen");
  
    const pointsDisplay = document.getElementById("points-display");
  
    const finalScore = document.getElementById("final-score");
  
    const player = new FlyingObject("player", 100, 100);
  
    const enemy = new AutonomousObject("enemy", 300, 300, 3, 2);
  
    const point = new AutonomousObject("point", 200, 200, 2, -2);
  
    let points = 0;
  
    let gameInterval;
  
    // Start gry
  
    document.getElementById("start-button").addEventListener("click", () => {
  
      startScreen.style.display = "none";
  
      gameScreen.style.display = "block";
  
      points = 0;
  
      pointsDisplay.textContent = points;
  
      gameInterval = setInterval(() => {
  
        enemy.move();
  
        point.move();
  
        // Kolizja z punktem
  
        if (checkCollision(player, point)) {
  
          points++;
  
          pointsDisplay.textContent = points;
  
          // Reset punktu po zdobyciu
  
          point.x = Math.random() * window.innerWidth - 50;
  
          point.y = Math 
  point.y = Math.random() * window.innerHeight - 50;
  
          point.updatePosition();
  
        }
  
        // Kolizja z wrogiem
  
        if (checkCollision(player, enemy)) {
  
          endGame();
  
        }
  
      }, 20);
  
    });
  
    // Instrukcja gry
  
    document.getElementById("instruction-button").addEventListener("click", () => {
  
      startScreen.style.display = "none";
  
      instructionScreen.style.display = "block";
  
    });
  
    // Powrót z instrukcji
  
    document.getElementById("back-to-start").addEventListener("click", () => {
  
      instructionScreen.style.display = "none";
  
      startScreen.style.display = "block";
  
    });
  
    // Obsługa końca gry
  
    function endGame() {
  
      clearInterval(gameInterval);
  
      gameScreen.style.display = "none";
  
      gameOverScreen.style.display = "block";
  
      finalScore.textContent = points;
  
    }
  
    // Obsługa sterowania klawiaturą
  
    document.addEventListener("keydown", (e) => {
  
      player.move(e.key);
  
    });
  
    // Restart gry
  
    document.getElementById("restart-button").addEventListener("click", () => {
  
      gameOverScreen.style.display = "none";
  
      startScreen.style.display = "block";
  
    });
  
  }); 
import { Player } from "./actors/player";
import { Enemy } from "./actors/enemy";
import { Bullet } from "./actors/bullets";
import { detectCollision } from "./actors/collision";
import { updateFPS, drawFPS } from "./actors/fps";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const player = new Player(canvas.width / 2, canvas.height - 50);
const enemies: Enemy[] = [];
const bullets: Bullet[] = [];

function createEnemies() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 7; col++) {
      const x = col * 80 + 50;
      const y = row * 60 + 50;
      const enemy = new Enemy(x, y);
      enemies.push(enemy);
    }
  }
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  player.draw(ctx);

  // Draw the enemies
  enemies.forEach((enemy) => enemy.draw(ctx));

  // Draw the bullets
  bullets.forEach((bullet) => bullet.draw(ctx));

  // Request animation frame
  requestAnimationFrame(draw);

  updateFPS();
  drawFPS(ctx);
}

function update() {
  // Update the player
  player.update();

  // Update the enemies
  enemies.forEach((enemy) => enemy.update());

  // Update the bullets
  bullets.forEach((bullet) => bullet.update());

  // Check for collisions between bullets and enemies
  bullets.forEach((bullet) => {
    enemies.forEach((enemy) => {
      if (detectCollision(bullet, enemy)) {
        bullet.visible = false;
        enemy.visible = false;
      }
    });
  });

  // Remove invisible enemies and bullets
  enemies.filter((enemy) => enemy.visible);
  bullets.filter((bullet) => bullet.visible);

  // Request animation frame
  requestAnimationFrame(update);
}

function shoot() {
  const bullet = new Bullet(player.x, player.y);
  bullets.push(bullet);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    shoot();
  }
});

createEnemies();
draw();
update();

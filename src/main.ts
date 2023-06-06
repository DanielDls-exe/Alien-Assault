import { Player } from "./actors/player";
import { Enemy } from "./actors/enemy";
import { Bullet } from "./actors/bullets";
import { detectCollision } from "./actors/collision";
import { updateFPS, drawFPS } from "./actors/fps";
import Swal from 'sweetalert2';
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Cargar imágenes
const playerImage = new Image();
playerImage.src = "player.png";

const enemyImage = new Image();
enemyImage.src = "enemy.png";

const bulletImage = new Image();
bulletImage.src = "bullet.png";

const player = new Player(canvas.width / 2, canvas.height - 50, playerImage);
let enemies: Enemy[] = [];
let bullets: Bullet[] = [];

let isFiring = false;

function createEnemies() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const x = col * 80 + 50;
      const y = row * 60 + 50;
      const enemy = new Enemy(x, y, enemyImage);
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

  // Update the bullets and check for collisions
  // Update the bullets and check for collisions
  bullets.forEach((bullet) => {
  if (!bullet.hit) {
    bullet.update();

    // Check for collisions between bullets and enemies
    enemies.forEach((enemy) => {
      if (!bullet.hit && !enemy.death && detectCollision(bullet, enemy)) {
        bullet.visible = false;
        enemy.markAsDead();
        bullet.hit = true;
      }
    });
  }
});

console.log(enemies.length)

  // Remove invisible enemies and bullets
  enemies = enemies.filter((enemy) => !enemy.death);
  bullets = bullets.filter((bullet) => bullet.visible);

  if (enemies.length === 0) {
    // All enemies defeated, you win!
    Swal.fire({
      title: '¡Ganaste!',
      text: 'Has derrotado a todos los enemigos',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  } else if (playerIsHit()) {
    // Player is hit, game over
    Swal.fire({
      title: '¡Perdiste!',
      text: 'Has sido derrotado por los enemigos',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  } else {
    // Request animation frame
    requestAnimationFrame(update);
  }
}

function playerIsHit() {
  // Check if player is hit by any enemy
  for (let i = 0; i < enemies.length; i++) {
    if (detectCollision(player, enemies[i])) {
      return true;
    }
  }
  return false;
}

function shoot() {
  if (isFiring) {
    return;
  }

  const bullet = new Bullet(player.x, player.y, bulletImage);
  bullets.push(bullet);
  isFiring = true;

  // Restablecer el estado de isFiring después de un cierto tiempo
  setTimeout(() => {
    isFiring = false;
  }, 200); // Ajusta el tiempo según sea necesario
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    shoot();
  }
});

createEnemies();
draw();
update();


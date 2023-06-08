import { Player } from "./actors/player";
import { Enemy } from "./actors/enemy";
import { Bullet } from "./actors/bullets";
import { detectCollision } from "./actors/collision";
import { updateFPS, drawFPS } from "./actors/fps";
import Swal from 'sweetalert2';

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const startButton = document.getElementById("startButton") as HTMLButtonElement;
const backgroundMusic = new Audio("music.wav");
backgroundMusic.loop = true;

// Cargamos las imágenes y sonidos
const playerImage = new Image();
playerImage.src = "player.png";

const enemyImage = new Image();
enemyImage.src = "enemy.png";

const bulletImage = new Image();
bulletImage.src = "bullet.png";

const player = new Player(canvas.width / 2, canvas.height - 50, playerImage, new Audio("explosion.wav"));

let enemies: Enemy[] = [];
let bullets: Bullet[] = [];

let isFiring = false;
let isGameStarted = false;

startButton.addEventListener("click", () => {
  startGame();
});

function startGame() {
  startButton.style.display = "none";
  isGameStarted = true;
  backgroundMusic.play();
  createEnemies();
  draw();
  update();
}


function createEnemies() {
  for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
          const x = col * 80 + 50;
          const y = row * 60 + 50;
          const enemy = new Enemy(x, y, enemyImage, new Audio("invaderkilled.wav"));
          enemies.push(enemy);
      }
  }
}

function draw() {
  // Limpiamos el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujamos al jugador
  player.draw(ctx);

  // Dibujamos a los enemigos y balas
  enemies.forEach((enemy) => enemy.draw(ctx));
  bullets.forEach((bullet) => bullet.draw(ctx));
  requestAnimationFrame(draw);

  updateFPS();
  drawFPS(ctx);
}

function update() {
  // Actualizamos al jugar y enemigos
  player.update();
  enemies.forEach((enemy) => enemy.update());

  // Actualizamos las balas y revisamos si ha dado a un enemigo
  bullets.forEach((bullet) => {
    if (!bullet.hit) {
        bullet.update();

        enemies.forEach((enemy) => {
            if (!bullet.hit && !enemy.death && detectCollision(bullet, enemy)) {
                bullet.visible = false;
                enemy.markAsDead();
                bullet.hit = true;

                // sonido de muerte del enemigo
                enemy.deathSound.play();
            }
        });
    }
});

console.log(enemies.length)

  // Quitamos a los enemigo muertos y las balas que ya no deben existir
  enemies = enemies.filter((enemy) => !enemy.death);
  bullets = bullets.filter((bullet) => bullet.visible);

  if (enemies.length === 0) {
    // Ya no quedan enemigos
    Swal.fire({
      title: '¡Ganaste!',
      text: 'Has derrotado a todos los enemigos',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
    backgroundMusic.pause();
  } else if (playerIsHit()) {
    // Un enemigo te ha tocado, perdiste
    Swal.fire({
      title: '¡Perdiste!',
      text: 'Has sido derrotado por los enemigos',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    backgroundMusic.pause();
    player.deathSound.play();
  } else {
    requestAnimationFrame(update);
  }
}

function playerIsHit() {
  // revisamos si un enemigo ha tocado al jugador
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

  const bullet = new Bullet(player.x + 8, player.y, bulletImage, new Audio("shoot.wav"));
  bullets.push(bullet);
  isFiring = true;

  // sonido de disparo
  bullet.sound.play();

  // Restablecer el estado de isFiring después de un cierto tiempo, para que no se pueda disparar muy rapido dejando el espacio presionado
  setTimeout(() => {
      isFiring = false;
  }, 300);
}


document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    shoot();
  }
});

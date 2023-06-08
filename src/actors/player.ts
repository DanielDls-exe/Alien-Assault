export class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  leftPressed: boolean;
  rightPressed: boolean;
  image: HTMLImageElement;
  deathSound: HTMLAudioElement;
  canvas: HTMLCanvasElement; // Nueva propiedad para almacenar la referencia del canvas

  constructor(x: number, y: number, image: HTMLImageElement, deathSound: HTMLAudioElement, canvas: HTMLCanvasElement) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 40;
    this.speed = 5;
    this.leftPressed = false;
    this.rightPressed = false;
    this.image = image;
    this.deathSound = deathSound;
    this.canvas = canvas; // Almacena la referencia del canvas en la propiedad de la clase

    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
  }

  keyDownHandler(event: KeyboardEvent) {
    if (event.code === "ArrowLeft") {
      this.leftPressed = true;
    } else if (event.code === "ArrowRight") {
      this.rightPressed = true;
    }
  }

  keyUpHandler(event: KeyboardEvent) {
    if (event.code === "ArrowLeft") {
      this.leftPressed = false;
    } else if (event.code === "ArrowRight") {
      this.rightPressed = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.leftPressed && this.x > 0) {
      this.x -= this.speed;
    } else if (this.rightPressed && this.x < this.canvas.width - this.width) {
      this.x += this.speed;
    }
  }
}

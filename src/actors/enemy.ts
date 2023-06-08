export class Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  death: boolean;
  image: HTMLImageElement;
  deathSound: HTMLAudioElement;
  canvas: HTMLCanvasElement; 

  constructor(x: number, y: number, image: HTMLImageElement, deathSound: HTMLAudioElement, canvas: HTMLCanvasElement) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.speed = 1.5;
    this.death = false;
    this.image = image;
    this.deathSound = deathSound;
    this.canvas = canvas; // Almacena la referencia del canvas en la propiedad de la clase
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.death) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    this.x += this.speed;

    if (
      this.x + this.width > this.canvas.width || // Utiliza this.canvas en lugar de canvas
      this.x < 0
    ) {
      this.y += 20;
      this.speed *= -1;
    }
  }

  markAsDead() {
    this.death = true;
  }
}


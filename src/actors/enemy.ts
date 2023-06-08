export class Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    death: boolean;
    image: HTMLImageElement;
    deathSound: HTMLAudioElement;
  
    constructor(x: number, y: number, image: HTMLImageElement, deathSound: HTMLAudioElement) {
      this.x = x;
      this.y = y;
      this.width = 30;
      this.height = 30;
      this.speed = 1.5;
      this.death = false;
      this.image = image;
      this.deathSound = deathSound;
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      if (!this.death) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }
  
    update() {
      this.x += this.speed;
  
      if (
        this.x + this.width > canvas.width ||
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
  

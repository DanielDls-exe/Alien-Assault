export class Bullet {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    visible: boolean;
    hit: boolean;
    image: HTMLImageElement;
  
    constructor(x: number, y: number, image: HTMLImageElement) {
      this.x = x;
      this.y = y;
      this.width = 5;
      this.height = 15;
      this.speed = 3;
      this.visible = true;
      this.hit = false;
      this.image = image;
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      if (this.visible) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }
  
    update() {
      this.y -= this.speed;
  
      if (this.y < 0) {
        this.visible = false;
      }
    }
  }
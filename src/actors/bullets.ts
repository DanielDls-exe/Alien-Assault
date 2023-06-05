export class Bullet {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    visible: boolean;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.width = 5;
      this.height = 15;
      this.speed = 5;
      this.visible = true;
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      if (this.visible) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#00FF00";
        ctx.fill();
        ctx.closePath();
      }
    }
  
    update() {
      this.y -= this.speed;
  
      if (this.y < 0) {
        this.visible = false;
      }
    }
  }
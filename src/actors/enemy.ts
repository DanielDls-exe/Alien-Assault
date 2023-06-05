export class Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    visible: boolean;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.width = 30;
      this.height = 30;
      this.speed = 1;
      this.visible = true;
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      if (this.visible) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
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
  }
  

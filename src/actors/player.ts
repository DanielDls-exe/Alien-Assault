export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    leftPressed: boolean;
    rightPressed: boolean;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.width = 20;
      this.height = 40;
      this.speed = 5;
      this.leftPressed = false;
      this.rightPressed = false;
  
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
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  
    update() {
      if (this.leftPressed && this.x > 0) {
        this.x -= this.speed;
      } else if (this.rightPressed && this.x < canvas.width - this.width) {
        this.x += this.speed;
      }
    }
  }
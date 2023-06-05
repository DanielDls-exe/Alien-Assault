let lastRenderTime = 0;
let fps = 0;

export function updateFPS() {
  const currentRenderTime = performance.now();
  const delta = currentRenderTime - lastRenderTime;
  lastRenderTime = currentRenderTime;
  fps = Math.round(1000 / delta);
}

export function drawFPS(ctx: CanvasRenderingContext2D) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FFF";
  ctx.fillText(`FPS: ${fps}`, 10, 20);
}


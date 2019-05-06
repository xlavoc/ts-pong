export class Ball {
  score: number[] = [0,0];

  constructor(public x: number, public y: number, public radius: number, public vx?: number, public vy?: number) {
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    context.closePath();
    context.fill();
  }
  animate(width: number, height: number): void {
    if (this.vx || this.vy) {
      this.x += this.vx;
      this.y += this.vy;

       // boundaries detection
      if (this.x + this.vx >= width) { this.score[1]++; this.vx = -this.vx };
      if (this.x + this.vx <= 0) { this.score[0]++; this.vx = -this.vx; }
      if (this.y + this.vy > height - this.radius || this.y + this.vy < 0 + this.radius) this.vy = -this.vy;
    }
  }
}
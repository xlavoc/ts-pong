import { Ball } from './ball';

export class Rect {
  
  constructor(public x: number, public y: number, public width: number, public height: number, public color?: string) { }
  
  draw(context: CanvasRenderingContext2D, width?: number, height?: number): void {
    if (this.color) context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    if (width || height) {
      if (this.y <= 0) this.y = 0;
      if (this.y + this.height >= height) this.y = height - this.height;
    };
  };

  autoPlayMode(ball: Ball) {
    this.y = ball.y - this.height/2;
  }
  
  collisionWith(ball: Ball) {
  /*  if (ball.x + ball.radius >= this.x &&
        ball.x - ball.radius <= this.x + this.width &&
        ball.y + ball.radius >= this.y &&
        ball.y - ball.radius <= this.y + this.height) {
          ball.vx = -ball.vx
    }
    */
    const distX = Math.abs(ball.x - this.x-this.width/2);
    const distY = Math.abs(ball.y - this.y-this.height/2);

    if (distX > this.width/2 + ball.radius) return false;
    if (distY > this.height/2 + ball.radius) return false;

    if (distX <= this.width/2) ball.vy = -ball.vy;
    if (distY <= this.height/2) ball.vx = -ball.vx;

    const dx = distX - this.width/2;
    const dy = distY - this.height/2;
    return dx*dx + dy*dy <= ball.radius*ball.radius;
  }
};
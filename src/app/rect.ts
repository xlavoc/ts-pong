import { Ball } from './ball';

export class Rect {
  
  constructor(private x: number, public y: number, public width: number, private height: number, public color?: string) { }
  
  draw(context: CanvasRenderingContext2D): void {
    if (this.color) context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
  
  collisionWith(ball: Ball) {
    const buffer = 2;
    if (ball.x + ball.radius >= this.x &&
        ball.x - ball.radius <= this.x + this.width &&
        ball.y + ball.radius >= this.y - buffer &&
        ball.y - ball.radius <= this.y + this.height - buffer) {
          this.color = 'yellow'
    } else {
      this.color = 'white';
    }
        //  ball.vx = -ball.vx;
        //  ball.vy = -ball.vy;
        
  }
};
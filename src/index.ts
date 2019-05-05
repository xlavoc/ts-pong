import './main.scss';
import { getStyle, randomRange } from './app/game.service';
import { Rect } from './app/rect';
import { Ball } from './app/ball';


const canvas  = <HTMLCanvasElement>document.getElementById('pong');
const cw: number = canvas.width = Number(getStyle(canvas, 'width').slice(0,-2));
const ch: number = canvas.height = Number(getStyle(canvas, 'height').slice(0,-2));
const scrollWidth: number = window.innerWidth - (document.body.scrollWidth || document.body.clientWidth);
const xUnit: number = cw / 100, yUnit: number = (ch / 100);

const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const ball = new Ball(cw/2, ch/2, 2*yUnit, randomRange(4,8), randomRange(-6,6));
const padHuman = new Rect(cw-6*yUnit, ch/2-10*yUnit, 3*yUnit, 20*yUnit);
const padComputer = new Rect(3*yUnit, ch/2-10*yUnit, 3*yUnit, 20*yUnit);


document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'w') padHuman.y -= 15;
  if (e.key === 'ArrowDown' || e.key === 's') padHuman.y += 15;
  //console.table(padHuman);
 });

// for testing purposes
canvas.addEventListener('mousemove', (e) => {
  ball.x = e.clientX - ((window.innerWidth - scrollWidth - cw)/2);
  ball.y = e.clientY - ((window.innerHeight- ch)/2);
});


function draw() {
  ctx.clearRect(0, 0, cw, ch);
  
  ctx.fillStyle = 'whitesmoke';
  ctx.strokeStyle = 'whitesmoke';
  ctx.save();
  
  // center vertical line
  ctx.translate(cw/2, 0);
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, ch);
  ctx.closePath();
  ctx.stroke();
  
  // center circle
  ctx.translate(0,ch/2);
  ctx.beginPath();
  ctx.arc(0, 0, ch/6, 0, Math.PI*2);
  ctx.closePath();
  ctx.stroke();
  
  // ball animation
  ctx.restore();
  ball.draw(ctx);
  //ball.animate(cw, ch);
  
  // game pads
  // left: computer
  padComputer.draw(ctx);
  //padComputer.y = ball.y - 10*yUnit;
  padComputer.collisionWith(ball);
  
  // right: human
  padHuman.draw(ctx);
  padHuman.collisionWith(ball);
   
  window.requestAnimationFrame(draw);
}

draw();


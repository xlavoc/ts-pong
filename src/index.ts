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
const padRight = new Rect(cw-6*yUnit, ch/2-10*yUnit, 3*yUnit, 20*yUnit);
const padLeft = new Rect(3*yUnit, ch/2-10*yUnit, 3*yUnit, 20*yUnit);

const startMenu = new Rect(0, 0, cw, ch, 'rgba(255,255,255,.3)');

const keys: boolean[] = [];
document.addEventListener('keydown', (e) => {
  keys[e.keyCode] = true;
});
document.addEventListener('keyup', (e) => {
  delete keys[e.keyCode];
});


// // for testing purposes
// canvas.addEventListener('mousemove', (e) => {
//   ball.x = e.clientX - ((window.innerWidth - scrollWidth - cw)/2);
//   ball.y = e.clientY - ((window.innerHeight- ch)/2);
// });


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
  
  ctx.restore();

  // score counter left
  ctx.font = "30px Courier New";
  ctx.textAlign = 'center';
  ctx.strokeText(ball.score[1].toString(), cw/2 - 6*xUnit, 6*xUnit);

  // score counter left
  ctx.restore();
  ctx.strokeText(ball.score[0].toString(), cw/2 + 6*xUnit, 6*xUnit);

  // ball animation
  ball.draw(ctx);
  ball.animate(cw, ch);
  
  // game pads
  // left: computer
  padLeft.draw(ctx);
  padLeft.autoPlayMode(ball);
  padLeft.collisionWith(ball);
  
  // right: human
  padRight.draw(ctx, cw, ch);
  padRight.autoPlayMode(ball);
  padRight.collisionWith(ball);

  if (keys[38] || keys[87]) padRight.y -= 12;
  if (keys[40] || keys[83]) padRight.y += 12;

  startMenu.draw(ctx);
  startMenu.blurAdd(ctx);
  
  window.requestAnimationFrame(draw);
}

draw();


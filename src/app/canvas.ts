import { getStyle } from './game.service';



export class Canvas {
  private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	//private height: number = window.innerHeight;
	//private width: number = window.innerWidth;

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById('pong');
		this.canvas.width = Number(getStyle(this.canvas, 'width').slice(0,-2));
		this.canvas.height = Number(getStyle(this.canvas, 'height').slice(0,-2));
		this.ctx = this.canvas.getContext("2d");
	}

	public render(): void {
    console.log('rendering');
	}
}
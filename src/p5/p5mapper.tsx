import { Component } from "react";
import Sketch from "react-p5";
import type P5 from "p5/index"
import { Ratio } from "react-bootstrap";
import { Boundary } from "./func/Boundary";
import { pointer } from "./func/Select";
import { Particle } from "./func/Particle"

class P5JS_App extends Component {
	x: number
	y: number
	cw: number
	ch: number
	walls: Boundary[]
	particle: any[]
	curser: pointer
	nodes: any[]
	createMode: boolean
	sw: number
	sh: number
	selectedObj: object
	offsetX: number
	offsetY: number

	constructor(props) {
		super(props);
		this.x = 100;
		this.y = 100;
		this.cw = 800;
		this.ch = 600;
		this.walls = [];
		this.particle = [];
		this.curser = null;
		this.nodes = [];
		this.createMode = false;
		this.sw = this.cw; //sketch width
		this.sh = this.ch; //sketch height
		this.offsetX = 0;
		this.offsetY = 0;
	}

	setup(p5: any, parent: Element) {
		p5.createCanvas(this.cw, this.ch).parent(parent);
		p5.colorMode(p5.HSB, 360, 100, 100);
		p5.ellipseMode(p5.RADIUS);

		this.walls.push(new Boundary(p5, 0 , 0 , this.sw, 0))
		this.walls.push(new Boundary(p5, this.sw, 0 , this.sw, this.sh))
		this.walls.push(new Boundary(p5, this.sw, this.sh, 0 , this.sh))
		this.walls.push(new Boundary(p5, 0 , this.sh, 0 , 0))

		this.curser = new pointer(p5);
	};

	drawGrid(p5: P5, sizX: number, sizY: number, spcX: number, spcY: number) {
		//  console.log(p5);
		p5.stroke(55);
		p5.strokeWeight(1);
		for (var x = 0; x < sizX; x += spcX) {
			for (var y = 0; y < sizY; y += spcY) {
				p5.line(x, 0, x, sizY);
				p5.line(0, y, sizX, y);
			}
		}
	};

	draw(p5: any) {
		p5.clear(0, 0, 0, 0);
		p5.background(0);
		p5.fill(255);
		p5.translate(50, -50);
		this.drawGrid(p5, 600, 600, 100, 100);
/*
		if(this.curser.selectedObj){
			console.log(selectedObj.name)
			}
			 
			for (let i = 0; i < 5; i++) {
			curser.collide(nodes[i]);
			nodes[i].show()
			}
			  
			 */ 
			for (let i = 0; i < this.particle.length; i++) {
			  this.particle[i].look(this.walls)
			this.particle[i].show()
			}
			
		  
			//particle[1].look(walls)
			this.particle[0].update(p5.mouseX-this.offsetX, p5.mouseY+this.offsetY)
		  
			
			for (let wall of this.walls) {
			  wall.show(p5)
			}
			
		  
			
			this.curser.update(p5.mouseX-this.offsetX, p5.mouseY+this.offsetY)
			this.curser.show(p5)
		   
		  
			/*
			if (keyIsDown(SHIFT)) {
			createMode = true
			} else {createMode = false}
			
			console.log(createMode)
			*/


	};

	render() {
		return (
			<div>
				<Ratio
					aspectRatio="4x3"
					className="border border-5 rounded rounded-3">
					<Sketch
						setup={(p5, parent) => this.setup(p5, parent)}
						draw={(p5) => this.draw(p5)}
						className="w-100 h-100"/>
				</Ratio>
				
			</div>
		)
		
	}
}

export default P5JS_App;

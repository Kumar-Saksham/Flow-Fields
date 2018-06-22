var inc = 0.1;
var scl = 20;
var cols;
var rows;
var fr;
var zoff = 0;
var particle = [];
var flowfield = [];

function setup(){
	createCanvas(window.innerWidth, window.innerHeight);
	pixelDensity(1);
	cols = width/scl;
	rows = height/scl;
	for(var i = 0; i < 100000; i++)
		particle.push(new Particle());

}

 
function draw(){
	fill(255, 255, 255, 5);
	rect(0, 0, width, height);
	var xoff = 0;
	var yoff = 0;

	for(var x = 0; x < cols; x++){
		yoff = 0;
		for(var y = 0; y < rows; y++){
			var index = x + y*cols;
			var angle = noise(xoff, yoff, zoff)*TWO_PI*4;
			yoff += inc;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(2);
			flowfield[index] = v;
			// stroke(100, 50);
			// strokeWeight(1);
			// push();
			// translate(x*scl, y*scl);
			// rotate(v.heading());
			// line(0, 0, scl, 0);
			// pop();
		}
		xoff += inc;
		zoff += 0.0003;

	}
	for(var i = 0; i < particle.length; i++){
		particle[i].edges();
		particle[i].follow(flowfield);
		particle[i].update();
		particle[i].show();
		

	}
	console.log(floor(frameRate()));
}
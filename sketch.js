let TOTAL = 350;
let birds = [];
let dead = [];
let pipes;
let slider;
let inp;
let max = 0;
let best_bird;
let current = 0;
let gen = 1;
let nearest_x;
let nearest_y;

let pop_slider;
let speed_slider;
let gap_slider;
let dist_slider;


function nextGen(){
	for (var i = 0; i < TOTAL*0.9; i++){
		let child = new Bird();
		child.brain = best_bird.brain.mutate();
		birds[i] = child;
	}
	for (var i = TOTAL*0.9; i < TOTAL; i++){
		let child = new Bird();
		child.brain = best_bird.brain;
		birds[i] = child;
	}
	dead = [];
}

function resetSketch(){
	birds = [];
	dead = [];
	pipes = new Pipes();
	max = 0;
	best_bird = null;
	current = 0;
	gen = 1;
	nearest_x = null;
	nearest_y = null;

	slider.remove();
	slider = createSlider(1, 50, 1);
	slider.position(660 , 730);

	TOTAL = pop_slider.value();
	pipes.speed = speed_slider.value();
	pipes.gap = gap_slider.value();
	pipes.distance = dist_slider.value();

	for (var i = 0; i < TOTAL; i++){
		birds.push(new Bird());
	}
	document.getElementById('gen').innerHTML = "Current Gen: " + gen;
	document.getElementById('pop-count').innerHTML = "Population Count: " + TOTAL;
	document.getElementById('pipes-speed').innerHTML = "Speed of Pipes: " + pipes.speed;
	document.getElementById('pipes-gap').innerHTML = "Length of Gap: " + pipes.gap;
	document.getElementById('pipes-dist').innerHTML = "Distance between pipes: " + pipes.distance;
	document.getElementById("hidden").style.color = "black";
}

function setup() {
	createCanvas(1423, 600);
	// inp = createInput();
	// inp.position(200, 40);
	slider = createSlider(1, 50, 1);
	slider.position(660 , 730);

	pop_slider = createSlider(100, 500, 350);
	pop_slider.position(65 , 655);

	speed_slider = createSlider(2, 10, 6);
	speed_slider.position(350 , 655);

	gap_slider = createSlider(100, 200, 150);
	gap_slider.position(65 , 730);

	dist_slider = createSlider(200, 400, 300);
	dist_slider.position(350 , 730);
	resetSketch();
}

function draw(){
	if (pop_slider.value() != TOTAL || speed_slider.value() != pipes.speed
		|| gap_slider.value() != pipes.gap || dist_slider.value() != pipes.distance){
		document.getElementById("hidden").style.color = "white";
	}
	document.getElementById('pop-count').innerHTML = "Population Count: " + pop_slider.value();
	document.getElementById('pipes-speed').innerHTML = "Speed of Pipes: " + speed_slider.value();
	document.getElementById('pipes-gap').innerHTML = "Length of Gap: " + gap_slider.value();
	document.getElementById('pipes-dist').innerHTML = "Distance between pipes: " + dist_slider.value();
	for (var c = 0; c < slider.value(); c++){
		if (birds.length > 0){
			current = birds[0].score;
		}
		if (current >= max){
			max = current;
		}
		document.getElementById('alive-birds').innerHTML = "Alive Birds: " + birds.length + "/" + TOTAL;
		document.getElementById('score').innerHTML = "High Score: " + max;
		document.getElementById('current').innerHTML = "Current Score: " + current;
		pipes.delete();
		pipes.generate();
		pipes.update();

		if (birds.length === 0){
			if (dead[TOTAL-1].score >= max){
				max = dead[TOTAL-1].score;
				best_bird = dead[TOTAL-1];
			}
			nextGen();
			pipes.x_values = [width];
			pipes.y_values = [Math.random()*(height - pipes.gap)];
			gen += 1;
			document.getElementById('gen').innerHTML = "Current Gen: " + gen;
		}

		for (var i = 0; i < birds.length; i++){
			if (birds[i].death(pipes)){
				dead.push(birds.splice(i, 1)[0]);
			}
		}

		for (var i = 0; i < birds.length; i++){
			let bird = birds[i];

			bird.think();
			bird.update();
		}
	}

	clear();
	background(200);
	pipes.show();

	for (var i = 0; i < birds.length; i++){
		birds[i].show();
	}
}
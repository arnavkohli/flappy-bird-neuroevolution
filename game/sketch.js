let TOTAL = 350; //number of birds per generation (population);
let gen = 1; //generation count;
let max = 0; //max score;
let current = 0; //current score of all the alive birds;

//birds
let alive_birds = []; //alive birds;
let dead_birds = [];	//dead birds;
let best_bird; //bird which had the best score;

//pipes
let pipes;
let nearest_x; //x-coordinate of the nearest pipe;
let nearest_y; //y-coordinate of the nearest pipe;

//parameter sliders
let pop_slider; //slider controlling the population (TOTAL);
let speed_slider; //slider controlling the speed of pipes (pipes.speed);
let gap_slider; //slider controlling the length of gaps in pipes (pipes.gaps);
let dist_slider; //slider controlling the distance between 2 consecutive pipes (pipes.distance);
let soe_slider; //slider controlling speed of evolution;

function resize_width(x){
	return windowWidth * (x/840)
}

function resize_height(x){
	return windowHeight * (x/803)
}

function windowResized(){
	resizeCanvas(windowWidth, resize_height(600));
	// pop_slider.position(resize_width(0) , resize_height(700));
	// speed_slider.position(resize_width(143) , resize_height(700));
	// gap_slider.position(resize_width(287) , resize_height(700));
	// dist_slider.position(resize_width(444) , resize_height(700));
	// soe_slider.position(resize_width(630) , resize_height(700));
}

//generates new birds for the next generation
function nextGen(){
	//90% new birds are mutations of the best bird (best_bird);
	for (var i = 0; i < TOTAL*0.9; i++){
		let child = new Bird();
		child.brain = best_bird.brain.mutate();
		alive_birds[i] = child;
	}
	//10% birds are the same as the best bird (best_bird);
	for (var i = TOTAL*0.9; i < TOTAL; i++){
		let child = new Bird();
		child.brain = best_bird.brain;
		alive_birds[i] = child;
	}
	//empty the dead_birds array for the next generation;
	dead_birds = [];

	//new set of pipes
	pipes.x_values = [width];
	pipes.y_values = [Math.random()*(height - pipes.gap)];

	//update generation count
	gen += 1;
	document.getElementById('gen').innerHTML = gen;
}

//this is called when the 'Reset' button is clicked;
//reset/update the parameters;
//same effect as that of refreshing the page;
function resetSketch(){
	gen = 1;
	max = 0;
	current = 0;

	alive_birds = [];
	dead_birds = [];
	best_bird = null;

	pipes = new Pipes();
	nearest_x = null;
	nearest_y = null;

	TOTAL = pop_slider.value();
	pipes.speed = speed_slider.value();
	pipes.gap = gap_slider.value();
	pipes.distance = dist_slider.value();
	soe_slider.elt.valueAsNumber = 1;

	// soe_slider.remove();
	// soe_slider = createSlider(1, 50, 1, 1);
	// soe_slider.position(resize_width(630) , resize_height(700));

	//generate a new but random pop;
	for (var i = 0; i < TOTAL; i++){
		alive_birds.push(new Bird());
	}
	document.getElementById('gen').innerHTML = gen;
	document.getElementById('pop-count').innerHTML = TOTAL;
	document.getElementById('pipes-speed').innerHTML = pipes.speed;
	document.getElementById('pipes-gap').innerHTML = pipes.gap;
	document.getElementById('pipes-dist').innerHTML = pipes.distance;
	document.getElementById("hidden").style.visibility = "hidden";
}

function setup() {
	let canvas = createCanvas(windowWidth, resize_height(600));
	canvas.parent('canvascontainer');

	//create parameter sliders
	pop_slider = select("#pop-count-slider");
	// pop_slider = createSlider(100, 500, 350, 10);
	// pop_slider.position(resize_width(0) , resize_height(700));
	speed_slider = select("#pipes-speed-slider");
	// speed_slider = createSlider(2, 10, 4, 1);
	// speed_slider.position(resize_width(143) , resize_height(700));
	gap_slider = select("#pipes-gap-slider");
	// gap_slider = createSlider(100, 200, 150, 10);
	// gap_slider.position(resize_width(287) , resize_height(700));
	dist_slider = select("#pipes-dist-slider");
	// dist_slider = createSlider(200, 400, 300, 10);
	// dist_slider.position(resize_width(444) , resize_height(700));
	soe_slider = select("#soe-slider");
	// soe_slider = createSlider(1, 50, 1, 1);
	// soe_slider.position(resize_width(630) , resize_height(700));

	resetSketch();
}

function draw(){
	//if even one of the sliders was moved (except the soe_slider),
	//displays a message which asks the user to press the reset button;
	if (pop_slider.value() != TOTAL || speed_slider.value() != pipes.speed
		|| gap_slider.value() != pipes.gap || dist_slider.value() != pipes.distance){
		document.getElementById("hidden").style.visibility = "visible";
		// null;
	}

	//update the parameters according to the position of their respective sliders;
	document.getElementById('pop-count').innerHTML = pop_slider.value();
	document.getElementById('pipes-speed').innerHTML = speed_slider.value();
	document.getElementById('pipes-gap').innerHTML = gap_slider.value();
	document.getElementById('pipes-dist').innerHTML = dist_slider.value();

	//loops as many times as the value of the soe_slider, per frame;
	for (var c = 0; c < soe_slider.value(); c++){
		//updates the current score
		if (alive_birds.length > 0){
			current = alive_birds[0].score;
		}
		document.getElementById('current').innerHTML = current;

		//updates the current score if its more than max score
		if (current >= max){
			max = current;
		}
		document.getElementById('score').innerHTML = max;

		//updates alive birds
		document.getElementById('alive-birds').innerHTML = alive_birds.length + "/" + TOTAL;

		//delete pipes out of the canvas
		pipes.delete();
		//generate new pipes
		pipes.generate();
		//update the positions of each pipe
		pipes.update();

		//if all birds are dead in that current gen
		if (alive_birds.length === 0){
			//if the last bird to die beat the highest score,
			//make it the best bird (update best_bird)
			if (dead_birds[TOTAL-1].score >= max){
				max = dead_birds[TOTAL-1].score;
				best_bird = dead_birds[TOTAL-1];
			}

			nextGen();
			// pipes.x_values = [width];
			// pipes.y_values = [Math.random()*(height - pipes.gap)];
			// gen += 1;
			// document.getElementById('gen').innerHTML = "Current Gen: " + gen;
		}

		//if any bird is dead, then adds it to dead_birds and removes it from the alive_birds;
		for (var i = 0; i < alive_birds.length; i++){
			if (alive_birds[i].death(pipes)){
				dead_birds.push(alive_birds.splice(i, 1)[0]);
			}
		}

		//updates the position of each bird 
		for (var i = 0; i < alive_birds.length; i++){
			let bird = alive_birds[i];

			bird.think();
			bird.update();
		}
	}

	//animation part
	clear();
	background(200);
	pipes.show();

	for (var i = 0; i < alive_birds.length; i++){
		alive_birds[i].show();
	}
}
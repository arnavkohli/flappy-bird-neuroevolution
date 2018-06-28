class Bird {
	constructor(){
		this.radius = 32; //radius of bird;
		this.x = 200; //x-coordinate of bird;
		this.y = 300; //y-coordinate of bird;
		this.vel = 0; //velocity of bird;
		this.g = 0.8; //gravity;

		this.brain = new NeuralNetwork(5, 10, 1); //brain of the bird;
		this.score = 0; //score of this bird;
	}

	//decides wether bird should jump or not;
	think(){

		//finds/updates coordinates of nearest pipe
		for (var i = 0; i < pipes.x_values.length; i++){
			if (this.x - pipes.x_values[i] < 0){
				nearest_x = pipes.x_values[i];
				nearest_y = pipes.y_values[i];
				break;
			} else if (this.x - pipes.x_values[i] - pipes.gap < 0){
				nearest_x = pipes.x_values[i] + pipes.gap;
				nearest_y = pipes.y_values[i];
				break;
			}
		}

		//input matrix;
		let input = new Matrix(5, 1);

		
		//input1 = y-coordinate of bird;
		//input2 = y-coordinate of top of nearest pipe;
		//input3 = y-coordinate of bottom of nearest pipe;
		//input4 = x-coordinate of nearest pipe;
		//input5 = velocity of bird;

		//neural network takes inputs as a 2d array,  hence each input in a 1d array;
		let input1 = [this.y/ (height)]; //normalised value of y-coordinate of bird;
		let input2 = [(nearest_y) / (height - pipes.gap)]; //normalised value of y-coordinate of top of nearest pipe;
		let input3 = [(nearest_y + pipes.gap) / (height - pipes.gap)]; //normalised value of y-coordinate of bottom of nearest pipe;
		let input4 = [(nearest_x) / (width)]; //normalised value of x-coordinate of nearest pipe;
		let input5 =[this.vel / 10]; //normalised value of velocity of bird;

		//set values of input matrix;
		input.array = [input1, input2, input3, input4, input5];

		//decide wether to jump or not given the current situation;
		let prediction = this.brain.predict(input)[0][0];
		if (prediction > 0.5){
			this.up();
		}
	}

	//shows bird on canvas
	show(){
		fill(244, 222, 24);
		ellipse(this.x, this.y, this.radius, this.radius);
	}

	//updates positon of bird
	update(){
		this.score += 1;
		this.vel += this.g;
		this.vel *= 0.95;
		this.y += this.vel;
	}

	//when called, bird jumps
	up(){
		this.vel -= 20;
	}
	
	//checks if bird goes out of the canvas or touches any of the pipes
	death(pipes){
		if (this.y <= 0 || this.y >= height){
			return true;
		} 
		for (var i = 0; i < pipes.y_values.length; i++){
			if ((this.y <= pipes.y_values[i] || this.y  >= pipes.y_values[i] + pipes.gap) 
				&& this.x >= pipes.x_values[i] 
					&& this.x <= pipes.x_values[i] + pipes.w){
				return true;
			}
		}
	}
}


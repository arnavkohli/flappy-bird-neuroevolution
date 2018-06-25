class Bird {
	constructor(){
		this.radius = 32;
		this.x = 200;
		this.y = 300;
		this.vel = 0;
		this.g = 0.8;

		this.brain = new NeuralNetwork(5, 10, 1);
		this.score = 0;
	}

	think(){
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
		let input = new Matrix(5, 1);
		let input1 = [this.y/ (height)];
		let input2 = [(nearest_y) / (height - pipes.gap)];
		let input3 = [(nearest_y + pipes.gap) / (height - pipes.gap)];
		let input4 = [(nearest_x) / (width)];
		let input5 =[this.vel / 10];
		input.array = [input1, input2, input3, input4, input5];

		let prediction = this.brain.predict(input)[0];
		if (prediction > 0.5){
			this.up();
		}
	}

	show(){
		fill(244, 222, 24);
		ellipse(this.x, this.y, this.radius, this.radius);
	}

	update(){
		this.score += 1;
		this.vel += this.g;
		this.vel *= 0.95;
		this.y += this.vel;
	}

	up(){
		this.vel -= 20;
	}
	
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


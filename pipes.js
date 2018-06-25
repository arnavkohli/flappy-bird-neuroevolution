class Pipes {
	constructor(){
		this.distance = 300;
		this.gap = 150;
		this.w = 100;
		this.x_values = [width];
		this.y_values = [Math.random()*(height - this.gap)]
		this.speed = 6;
	}

	generate(){
		let a = this.x_values
		let l = this.x_values.length;
		if (l < 10){
			this.x_values.push(a[l-1] + this.distance + this.gap)
			this.y_values.push(Math.random()*(height-this.gap))
		}
	}

	show(){
		let a = this.x_values
		let b = this.y_values
		let l = this.x_values.length;
		for (var i = 0; i < l; i++){
			let y_gap = Math.random()*(height - this.gap);
			fill(51, 127, 54);
			rect(a[i], 0, this.w, b[i]);
			rect(a[i], b[i] + this.gap, this.w, height - b[i] + this.gap)
		}
	}

	update(){
		let l = this.x_values.length;
		for (var i = 0; i < l; i++){
			this.x_values[i] -= this.speed;
		}
	}

	delete(){
		let a = this.x_values;
		let l = this.x_values.length;
		for (var i = 0; i < l; i++){
			if (a[i] <= -this.gap){
				this.x_values.splice(i, 1);
				this.y_values.splice(i, 1)
			}
		}
	}

}
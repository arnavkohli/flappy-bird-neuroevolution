class Matrix {
	constructor(rows, cols){
		this.rows = rows;
		this.cols = cols;
		this.array = [];

		for (var i = 0; i < this.rows; i++){
			let row = [];
			for (var j = 0; j< this.cols; j++){
				row.push(0);
			}
			this.array.push(row);
		}
	}

	randomise(){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j< this.cols; j++){
				this.array[i][j] = Math.random()*2 - 1;
			}
		}
	}

	add(n){
		if (n instanceof Matrix){
			if (this.rows === n.rows && this.cols === n.cols){
				for (var i = 0; i < this.rows; i++){
					for (var j = 0; j< this.cols; j++){
						this.array[i][j] += n.array[i][j];
					}
				}
			} else {
				console.log('Dimensions of A should be equal to dimensions of B.')
			}
		} else {
			for (var i = 0; i < this.rows; i++){
				for (var j = 0; j< this.cols; j++){
					this.array[i][j] += n;
				}
			}
		}
		return this.array;
	}

	multiply(n){
		if (n instanceof Matrix){
			if (this.cols === n.rows){
				let product = new Matrix(this.rows, n.cols);
				let productA = product.array;
				for (var i = 0; i < product.rows; i++){
					for (var j = 0; j < product.cols; j++){
						let sum = 0;
						for (var k = 0; k < this.cols; k++){
							sum += this.array[i][k] * n.array[k][j];
						}
						productA[i][j] = sum;
					}
				}
			return productA;
			} else {
				console.log('Columns of A should be equal rows of B.')
			}
		} else {
			for (var i = 0; i < this.rows; i++){
				for (var j = 0; j< this.cols; j++){
					this.array[i][j] *= n;
				}
			}
			return this.array;
		}
	}

	transpose(){
		let transpose = new Matrix(this.cols, this.rows);
		//let transposeA = transpose.array;
		for (var i = 0; i < transpose.rows; i++){
			for (var j = 0; j < transpose.cols; j++){
				transpose.array[i][j] = this.array[j][i];
			}
		}
		return transpose;
	}

	map(func){
		let result = new Matrix(this.rows, this.cols); 
		for (var i = 0; i< this.rows; i++){
			for (var j = 0; j< this.cols; j++){
				result.array[i][j] = func(this.array[i][j]); 
			}
		}
		return result.array;
	}

	map2(func){
		let result = new Matrix(this.rows, this.cols); 
		for (var i = 0; i< this.rows; i++){
			for (var j = 0; j< this.cols; j++){
				result.array[i][j] = func*(this.array[i][j]);
			}
		}
		return result.array;
	}

	static multiply(a , b){
		if (a.cols === b.rows){
				let product = new Matrix(a.rows, b.cols);
				for (var i = 0; i < product.rows; i++){
					for (var j = 0; j < product.cols; j++){
						let sum = 0;
						for (var k = 0; k < a.cols; k++){
							sum += a.array[i][k] * b.array[k][j];
						}
						product.array[i][j] = sum;
					}
				}
			return product.array;
			} else {
				console.log('Columns of A should be equal rows of B.')
			}
	}

	static add(a, b){
		let result = new Matrix(a.rows, b.cols);
		if (a.rows === b.rows && a.cols === b.cols){
				for (var i = 0; i < result.rows; i++){
					for (var j = 0; j< result.cols; j++){
						result.array[i][j] = a.array[i][j] + b.array[i][j];
					}
				}
			} else {
				console.log('Dimensions of A should be equal to dimensions of B.')
		}
		return result.array;
	}

	static subtract(a, b){
		let result = new Matrix(a.rows, b.cols);
		if (a.rows === b.rows && a.cols === b.cols){
				for (var i = 0; i < result.rows; i++){
					for (var j = 0; j< result.cols; j++){
						result.array[i][j] = a.array[i][j] - b.array[i][j];
					}
				}
			} else {
				console.log('Dimensions of A should be equal to dimensions of B.')
		}
		return result.array;
	}

	static ele_mult(a, b){
		let result = new Matrix(a.rows, b.cols);
		if (a.rows === b.rows && a.cols === b.cols){
				for (var i = 0; i < result.rows; i++){
					for (var j = 0; j< result.cols; j++){
						result.array[i][j] = a.array[i][j] * b.array[i][j];
					}
				}
			} else {
				console.log('Dimensions of A should be equal to dimensions of B.')
		}
		return result.array;
	}
} 



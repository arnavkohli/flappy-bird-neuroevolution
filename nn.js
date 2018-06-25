function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

function sigmoid(x){
	return 1/(1 + exp(-x));
}

function dsigmoid(y){
	return y*(1-y);
}

class NeuralNetwork {
	constructor(input_nodes, hidden_nodes, output_nodes){
		this.input_nodes = input_nodes;
		this.hidden_nodes = hidden_nodes;
		this.output_nodes = output_nodes;

		this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
		this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

		this.weights_ih.randomise();
		this.weights_ho.randomise();

		this.bias_h = new Matrix(this.hidden_nodes, 1);
		this.bias_o = new Matrix(this.output_nodes, 1);
		this.bias_h.randomise();
		this.bias_o.randomise();

		this.learning_rate = 0.1;
	}

	predict(input_matrix){
		let hidden = new Matrix(this.weights_ih.rows, input_matrix.cols);
		hidden.array = Matrix.multiply(this.weights_ih, input_matrix);
		hidden.array = Matrix.add(hidden, this.bias_h);
		hidden.array = hidden.map(sigmoid);

		let output = new Matrix(this.weights_ho.rows, hidden.cols)
		output.array = Matrix.multiply(this.weights_ho, hidden);
		output.array = Matrix.add(output, this.bias_o);
		output.array = output.map(sigmoid);
		return output.array
	}

	train(input_matrix, target){
		let hidden = new Matrix(this.weights_ih.rows, input_matrix.cols);
		hidden.array = Matrix.multiply(this.weights_ih, input_matrix);
		hidden.array = Matrix.add(hidden, this.bias_h);
		hidden.array = hidden.map(sigmoid);

		let output = new Matrix(this.weights_ho.rows, hidden.cols)
		output.array = Matrix.multiply(this.weights_ho, hidden);
		output.array = Matrix.add(output, this.bias_o);
		output.array = output.map(sigmoid);

		let output_error = new Matrix(target.rows, target.cols);
		output_error.array = Matrix.subtract(target, output);

		let hidden_error = new Matrix(this.hidden_nodes, 1);
		hidden_error.array = Matrix.multiply(this.weights_ho.transpose(), output_error);

		let weights_ho_deltas = new Matrix(this.output_nodes, this.hidden_nodes);
		let gradient = new Matrix(output.rows, output.cols);
		gradient.array = output.map(dsigmoid);
		gradient.array = Matrix.ele_mult(gradient, output_error);
		gradient.array = gradient.multiply(this.learning_rate)
		let hidden_t = hidden.transpose();

		weights_ho_deltas.array = Matrix.multiply(gradient, hidden_t);
		this.weights_ho.array = Matrix.add(this.weights_ho, weights_ho_deltas);
		this.bias_o.array = Matrix.add(this.bias_o, gradient); 

		let weights_ih_deltas = new Matrix(this.hidden_nodes, this.input_nodes);
		let hidden_gradient = new Matrix(hidden.rows, hidden.cols);
		hidden_gradient.array = hidden.map(dsigmoid);
		hidden_gradient.array = Matrix.ele_mult(hidden_gradient, hidden_error);
		hidden_gradient.array = hidden_gradient.multiply(this.learning_rate);
		let input_t = input_matrix.transpose();

		weights_ih_deltas.array = Matrix.multiply(hidden_gradient, input_t);
		this.weights_ih.array = Matrix.add(this.weights_ih, weights_ih_deltas);
		this.bias_h.array = Matrix.add(this.bias_h, hidden_gradient); 

	}
	mutate(){
		let x = new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes);
		x.weights_ih.array = this.weights_ih.array;
		x.weights_ho.array = this.weights_ho.array;
		x.bias_h.array = this.bias_h.array;
		x.bias_o.array = this.bias_o.array;

		x.weights_ih.array = x.weights_ih.map(mutate);
		x.weights_ho.array = x.weights_ho.map(mutate);
		x.bias_h.array = x.bias_h.map(mutate);
		x.bias_o.array = x.bias_o.map(mutate);
		return x;
	}

}
# js-matrix
This JavaScript module allows you to easily use matrices in JavaScript.

## Constructor
Instancing a Matrix is really easy. All you need to provide is a list/object of arguments as shown below.
```
const Matrix = require('index.js');

const MyNewMatrix = new Matrix({
	rows: 3,
	columns: 3,
	matrix: [1, 2, 3,
		 4, 5, 6,
		 7, 8, 9]
});

const MyOtherMatrix = new Matrix(3, 3, [9, 8, 7,
					6, 5, 4,
					3, 2, 1]);
```

## Methods

Each method returns a new `Matrix`, they do not change their parant Matrix class.

### multiply(multiplier) or .mult(multiplier)
* `multiplier` - A `Matrix` instance or scalar

### add(addition)
* `addition` - A `Matrix` instance

### subtract(substration) or .sub(substraction)
* `substraction` - A `Matrix` instance

## Info
This module was created just for fun, I wanted to make a module so I decided to make this. If you have any suggestions feel free to send me an email. (timvandamcs@gmail.com)
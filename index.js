function Matrix(args) {
  let params;
  if (!(args instanceof Object) || Array.isArray(args))
    params = {
      rows: arguments[0],
      columns: arguments[1],
      matrix: arguments[2],
    };
  else params = args;

  if (!Object.keys(params).filter(key => ['rows', 'columns', 'matrix'].indexOf(key) >= 0).length ||
    params.columns * params.rows !== params.matrix.length ||
    Object.values(params.matrix).filter(value => Number.isNaN(Number(value))).length)
    throw Error('Invalid constructor parameters.');

  this.rows = params.rows;
  this.columns = params.columns;
  this.matrix = params.matrix;

  this.multiply = multiplier => {
    if (Number.isNaN(Number(multiplier)) && !(multiplier instanceof Matrix))
      throw Error('Invalid matrix/scalar provided.');

    if (!Number.isNaN(Number(multiplier)))
      return new Matrix({
        rows: this.rows,
        columns: this.columns,
        matrix: this.matrix.map(value => value * multiplier),
      });

    const rows = Array(this.rows).fill(0).map((value, index) => this.matrix.slice(index * this.matrix.length / this.rows, index * this.matrix.length / this.rows + this.matrix.length / this.rows));
    const columns = Array(multiplier.columns).fill(0).map((value, index) => multiplier.matrix.filter((multiplierValue, multiplierIndex) => multiplierIndex % multiplier.columns === index));

    return new Matrix({
      rows: this.rows,
      columns: multiplier.columns,
      matrix: Array(this.rows * multiplier.columns).fill(0).map((value, index) => {
        const row = Math.floor(index / multiplier.columns);
        const column = index % this.rows;
        return rows[row].map((rowValue, rowIndex) => rowValue * columns[column][rowIndex]).reduce((x, y) => x + y);
      }),
    });
  };

  this.add = addition => {
    if (!(addition instanceof Matrix) || this.columns !== addition.columns || this.rows !== addition.rows || this.matrix.length !== addition.matrix.length)
      throw Error('Invalid matrix provided.');

    return new Matrix({
      rows: this.rows,
      columns: this.columns,
      matrix: this.matrix.map((value, index) => value + addition.matrix[index]),
    });
  };

  this.subtract = substraction => {
    if (!(substraction instanceof Matrix) || this.columns !== substraction.columns || this.rows !== substraction.rows || this.matrix.length !== substraction.matrix.length)
      throw Error('Invalid matrix provided.');

    return new Matrix({
      rows: this.rows,
      columns: this.columns,
      matrix: this.matrix.map((value, index) => value - substraction.matrix[index]),
    });
  };

  this.mult = this.multiply;
  this.sub = this.subtract;
}

if (typeof module !== 'undefined' && module.exports) module.exports = Matrix;

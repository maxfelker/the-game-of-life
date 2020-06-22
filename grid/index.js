import Cell from "./cell/index.js";

// TODOS
// How will we handle window resize?
export default class Grid {
  constructor(scale = 50) {
    this.cells = [];
    this.scale = scale;
    this.cellSize = Math.ceil(window.innerHeight / this.scale);
    this.cols = Math.ceil(window.innerWidth / this.cellSize);
    this.rows = Math.ceil(window.innerHeight / this.cellSize);
    this.populateCells();
    window.addEventListener("DOMContentLoaded", this.render);
  }

  // Create new Cell objects
  createCell(columNumber, rowNumber) {
    const x = this.cellSize * columNumber;
    const y = this.cellSize * rowNumber;
    return new Cell(x, y, this.cellSize);
  }

  // Create all cells 
  populateCells = () => {
    for (let rowNumber = 0; rowNumber < this.rows; rowNumber++) {
      for (let colNumber = 0; colNumber < this.cols; colNumber++) {
        let newCell = this.createCell(colNumber, rowNumber);
        this.cells.push(newCell);
      }
    }
  };

  // Tell each cell to render
  renderCells = () => {
    for (var i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      cell.render(this.gridElement);
    }
  };

  // display the grid
  render = () => {
    this.gridElement = document.createElement("div");
    this.gridElement.id = "grid";
    document.body.append(this.gridElement);
    this.renderCells();
  };

  // called every new generation
  update = () => {
    // get all the alive cells
    this.cells
      .filter((cell) => cell.alive)
      .map((cell) => {
        // determine the cell's fate
        cell.determineFate(this.cells);
        const neighbors = cell.getCellsFromNeighborhood(this.cells);
        // deteremin cell's neighbor's fate
        neighbors.forEach((neighbor) => {
          neighbor.determineFate(this.cells);
        });
      });
    // redraw the cells
    this.renderCells();
  };

  clear = () => {
    this.cells.filter((cell) => cell.alive).forEach((cell) => cell.die());
  };
}

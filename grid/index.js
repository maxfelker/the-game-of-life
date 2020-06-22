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
    //this.cells[500].alive = true;
    //this.cells[501].alive = true;
    //this.cells[502].alive = true;
    window.addEventListener("DOMContentLoaded", this.render);
  }

  createCell(columNumber, rowNumber) {
    const x = this.cellSize * columNumber;
    const y = this.cellSize * rowNumber;
    return new Cell(x, y, this.cellSize);
  }

  populateCells = () => {
    for (let rowNumber = 0; rowNumber < this.rows; rowNumber++) {
      for (let colNumber = 0; colNumber < this.cols; colNumber++) {
        let newCell = this.createCell(colNumber, rowNumber);
        this.cells.push(newCell);
      }
    }
  };

  renderCells = () => {
    for (var i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      cell.render(this.gridElement);
    }
  };

  render = () => {
    this.gridElement = document.createElement("div");
    this.gridElement.id = "grid";
    document.body.append(this.gridElement);
    this.renderCells();
  };

  update = () => {
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      if(cell.alive){
        cell.determineFate(this.cells);
        const neighbors = cell.getNeighbors(this.cells);
        for (let n = 0; n < neighbors.length; n++) {
          let neighbor = neighbors[n];
          neighbor.determineFate(this.cells);
        }
      }      
    }
    this.renderCells();
  };
}

import Cell from "./cell/index.js";

export default class Grid {

  constructor(scale = 100) {
    this.scale = scale;
    this.cellSize = Math.ceil(window.innerHeight / this.scale);
    this.cols = Math.ceil(window.innerWidth / this.cellSize);
    this.rows = Math.ceil(window.innerHeight / this.cellSize);
    this.cells = [];

    this.gridElement = document.createElement("div");
    this.gridElement.id = "grid";
    document.body.append(this.gridElement);
    this.render();
  }

  createCell(columNumber, rowNumber) {
    const x = this.cellSize * columNumber;
    const y = this.cellSize * rowNumber;
    return new Cell(x, y, this.cellSize);
  }

  createGrid = () => {
    for (let rowNumber = 0; rowNumber < this.rows; rowNumber++) {
      for (let colNumber = 0; colNumber < this.cols; colNumber++) {
        let newCell = this.createCell(colNumber, rowNumber);
        this.cells.push(newCell);
      }
    }
  }

  render() {
    this.createGrid();
    for (var i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      cell.render(this.gridElement);
    }
    /*console.log("Grid Rendered:");
    console.log(`${this.cols} columns x ${this.rows} rows`);
    console.log(`${this.cells.length} indvidual cells at ${this.cellSize} x ${this.cellSize}`);*/
  }

}
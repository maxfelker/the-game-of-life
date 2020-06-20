const Cell = function(x, y, cellSize) {
  this.x = x;
  this.y = y;
  this.cellSize = cellSize;
};

Cell.prototype.render = function(gridElement) {
  const cellDiv = document.createElement("div"); 
  cellDiv.classList.add("cell");
  cellDiv.style.height = this.cellSize;
  cellDiv.style.width = this.cellSize;
  cellDiv.style.top = this.y;
  cellDiv.style.left = this.x;
  gridElement.append(cellDiv);
};

export default Cell;
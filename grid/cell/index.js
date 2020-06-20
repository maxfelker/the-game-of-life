// TODOS

// Is cell alive or dead?
// Display cell state to player
// Getter / setter on state

const NEIGHBORHOOD = {
  N: [0, -1], 
  NE: [1, -1], 
  E: [1, 0], 
  SE: [1, 1], 
  S: [0, 1],
  SW: [-1, 1], 
  W: [-1, 0], 
  NW: [-1, -1] 
};

export default class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
  }

  generateId(x, y) {
    return `cell-${x}-${y}`;
  }

  render(gridElement) {
    const cellDiv = document.createElement("div");
    cellDiv.id = this.generateId(this.x, this.y);
    cellDiv.classList.add("cell");
    cellDiv.style.height = this.cellSize;
    cellDiv.style.width = this.cellSize;
    cellDiv.style.top = this.y;
    cellDiv.style.left = this.x;
    gridElement.append(cellDiv);
    cellDiv.onclick = this.getNeighbors;
  }

  predictNeighborCoords = (direction, originPosition) => {
    const { left, top } = originPosition;
    return {
      x: direction[0] === 0 ? left : left + (direction[0] * this.cellSize),
      y: direction[1] === 0 ? top : top + (direction[1] * this.cellSize),
    };
  }

  predictNeighborId = (direction, originPosition) => {
    const coords = this.predictNeighborCoords(direction, originPosition);
    return this.generateId(coords.x, coords.y);
  };

  getNeighbors = (event) => {
    event.target.classList.add("origin");
    const originPosition = {
      left: parseInt(event.target.style.left),
      top: parseInt(event.target.style.top)
    }; 
    Object.keys(NEIGHBORHOOD).forEach((directional) => {
      const direction = NEIGHBORHOOD[directional];
      const neighborId = this.predictNeighborId(direction, originPosition);
      const neighbor = document.getElementById(neighborId);
      neighbor.classList.add("alive");
    })
  }
}

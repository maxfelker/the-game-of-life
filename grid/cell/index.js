const CARDINAL = {
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
  NW: [-1, -1],
};

export default class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.id = this.generateId(x, y);
  }

  get alive() {
    if (!this.domElement) return false;

    return this.domElement.classList.contains("alive");
  }

  generateId(x, y) {
    return `cell-${x}-${y}`;
  }

  createCellElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = this.id;
    this.domElement.classList.add("cell");
  }

  setCellPosition() {
    this.domElement.style.height = this.cellSize;
    this.domElement.style.width = this.cellSize;
    this.domElement.style.top = this.y;
    this.domElement.style.left = this.x;
  }

  render(gridElement) {
    this.createCellElement();
    this.setCellPosition();
    gridElement.append(this.domElement);
    this.domElement.onclick = this.live;
  }

  predictNeighborCoords = (offset) => {
    return {
      x: offset[0] === 0 ? this.x : this.x + offset[0] * this.cellSize,
      y: offset[1] === 0 ? this.y : this.y + offset[1] * this.cellSize,
    };
  };

  predictNeighborId = (offset) => {
    const coords = this.predictNeighborCoords(offset);
    return this.generateId(coords.x, coords.y);
  };

  // get a single Cell based on id
  getCellById = (cells, id) => {
    return cells.filter((cell) => cell.id === id)[0];
  };

  // get an array of Cells back
  getNeighbors = (cells) => {
    const neighborIds = Object.keys(CARDINAL).map((direction) => {
      const offset = CARDINAL[direction];
      return this.predictNeighborId(offset);
    });
    return neighborIds.map((id) => {
      return this.getCellById(cells, id);
    });
  };

  getAliveNeighbors = (neighboringCells) => {
    return neighboringCells.filter((cell) => cell.alive);
  };

  scanNeighbors = (cells) => {
    const neighboringCells = this.getNeighbors(cells);
    const aliveNeighbors = this.getAliveNeighbors(neighboringCells);
    this.determineFate(aliveNeighbors.length);
  };

  determineFate = (neighborsAlive) => {
    if (neighborsAlive <= 4 || neighborsAlive === 0 || neighborsAlive === 1) {
      this.die();
      return;
    }
    if (!this.alive && neighborsAlive === 3) {
      this.live();
      return;
    }
    console.log("got to live");
  };

  live = () => {
    this.domElement.classList.add("alive");
  };

  die = () => {
    this.domElement.classList.remove("alive");
  };
}

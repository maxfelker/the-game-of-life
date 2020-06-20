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
    this.active = false;
  }

  generateId(x, y) {
    return `cell-${x}-${y}`;
  }

  render(gridElement) {
    this.domElement = document.createElement("div");
    this.domElement.id = this.generateId(this.x, this.y);
    this.domElement.classList.add("cell");
    this.domElement.style.height = this.cellSize;
    this.domElement.style.width = this.cellSize;
    this.domElement.style.top = this.y;
    this.domElement.style.left = this.x;
    gridElement.append(this.domElement);
    this.domElement.onclick = this.toggleState;
  }

  predictNeighborCoords = (offset, originPosition) => {
    const { left, top } = originPosition;
    return {
      x: offset[0] === 0 ? left : left + offset[0] * this.cellSize,
      y: offset[1] === 0 ? top : top + offset[1] * this.cellSize,
    };
  };

  predictNeighborId = (offset, originPosition) => {
    const coords = this.predictNeighborCoords(offset, originPosition);
    return this.generateId(coords.x, coords.y);
  };

  getNeighbors = () => {
    const originPosition = {
      left: parseInt(this.domElement.style.left),
      top: parseInt(this.domElement.style.top),
    };
    const neighborIds = Object.keys(CARDINAL).map((direction) => {
      const offset = CARDINAL[direction];
      return this.predictNeighborId(offset, originPosition);
    });
    neighborIds.map((id) => {
      const neighbor = document.getElementById(id);
      neighbor.classList.add("searching");
    });
  };

  toggleState = () => {
    if (this.alive) {
      return this.die();
    }
    return this.live();
  };

  live = () => {
    this.alive = true;
    this.domElement.classList.add("alive");
  };

  die = () => {
    this.alive = false;
    this.domElement.classList.remove("alive");
  };
}

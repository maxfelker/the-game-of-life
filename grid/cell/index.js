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
    this.id = this.generateId(x,y);
  }

  get alive() {
    if(!this.domElement) return false;

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
    this.domElement.onmouseenter = this.toggleState;
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

  getCellById = (cells, id) => {
    return cells.filter((cell) => cell.id === id)[0];
  }

  getNeighbors = (cells) => {
    const originPosition = {
      left: parseInt(this.domElement.style.left),
      top: parseInt(this.domElement.style.top),
    };
    const neighborIds = Object.keys(CARDINAL).map((direction) => {
      const offset = CARDINAL[direction];
      return this.predictNeighborId(offset, originPosition);
    });
    return neighborIds.map((id) => {
      return this.getCellById(cells, id)
    });
  };

  numberOfAliveNeighbors = (neighboringCells) => {
    let aliveNeighbors = 0;
    neighboringCells.forEach((cell) => {
      if(cell.alive) {
        aliveNeighbors++;
      }
    });
    return aliveNeighbors;

  }

  scanNeighbors = (cells) => {
    const neighboringCells = this.getNeighbors(cells);
    const aliveNeighbors = this.numberOfAliveNeighbors(neighboringCells);
    switch(aliveNeighbors) {
      default:
      case 0:
      case 1:
        return this.die();
      
      case 2:
      case 3: 
        return this.live();

      case 4:
        return this.die();
    }
  }

  toggleState = () => {
    if (this.alive) {
      return this.die();
    }
    return this.live();
  };

  live = () => {
    this.domElement.classList.add("alive");
  };

  die = () => {
     this.domElement.classList.remove("alive");
  };
}

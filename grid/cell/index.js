export default class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.id = this.generateId(x, y);
    this.cellSize = cellSize;
    this.alive = false;
  }

  generateId(x, y) {
    return `cell-${x}-${y}`;
  }

  createCellElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = this.id;
    this.domElement.classList.add("cell");
    this.domElement.onclick = this.live;
  }

  setCellPosition() {
    this.domElement.style.height = this.cellSize;
    this.domElement.style.width = this.cellSize;
    this.domElement.style.top = this.y;
    this.domElement.style.left = this.x;
  }

  render(gridElement) {
    if (!this.domElement) {
      this.createCellElement();
      this.setCellPosition();
      gridElement.append(this.domElement);
    }

    const { classList } = this.domElement;
    classList.remove("alive");

    if (classList.contains("die")) {
      this.alive = false;
      classList.remove("die");
    }

    if (classList.contains("born")) {
      classList.remove("born");
      this.alive = true;
      classList.add("alive");
    }

    if (this.alive) {
      classList.add("alive");
    }
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

  // get an array of Cells back
  getNeighbors = (cells) => {
    const NEIGHBORHOOD = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1]
    ];
    const neighborIds = NEIGHBORHOOD.map(this.predictNeighborId);
    return cells.filter((cell) => neighborIds.includes(cell.id));
  };

  determineFate = (cells) => {
    const neighboringCells = this.getNeighbors(cells);
    const neighborsAlive = neighboringCells.filter((cell) => cell.alive).length;
    if (this.alive) {
      if (neighborsAlive === 0 || neighborsAlive === 1 || neighborsAlive >= 4) {
        this.domElement.classList.add("die");
      }
    } else {
      if (neighborsAlive === 3) {
        this.domElement.classList.add("born");
      }
    }
  };

  live = () => {
    this.alive = true;
    this.domElement.classList.add("alive");
  };

  die = () => {
    this.alive = false;
  };
}

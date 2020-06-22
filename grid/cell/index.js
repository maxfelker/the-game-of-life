export default class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.id = this.generateId(x, y);
    this.cellSize = cellSize;
    this.alive = false;
    this.neighborhood = this.predictNeighborhood();
  }

  // unique ID for each cell based on x and y coords
  generateId(x, y) {
    return `cell-${x}-${y}`;
  }

  // create Cell.domElement,
  createCellElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = this.id;
    this.domElement.classList.add("cell");
    this.domElement.onclick = this.live;
  }

  // positions the cell based on cell size 
  setCellPosition() {
    this.domElement.style.height = this.cellSize;
    this.domElement.style.width = this.cellSize;
    this.domElement.style.top = this.y;
    this.domElement.style.left = this.x;
  }

  // draws the Cell.domELement
  render(gridElement) {
    if (!this.domElement) {
      this.createCellElement();
      this.setCellPosition();
      gridElement.append(this.domElement);
    }
    this.applyClasses();
  }

  // apply css class to Cell domElement
  applyClasses() {
    const { classList } = this.domElement;
    // reset cell if not alive
    if (!this.alive) {
      classList.remove("alive");
    }
    // the cell is dying
    if (classList.contains("die")) {
      this.die();
    }
    // the cell is being born
    if (classList.contains("born")) {
      this.born();
    }
  }

  determineNeighborCoords = (offset) => {
    return {
      x: offset[0] === 0 ? this.x : this.x + offset[0] * this.cellSize,
      y: offset[1] === 0 ? this.y : this.y + offset[1] * this.cellSize,
    };
  };

  determineNeighborId = (offset) => {
    const coords = this.determineNeighborCoords(offset);
    return this.generateId(coords.x, coords.y);
  };

  // get array of cell ids from the neighborhood
  predictNeighborhood = () => {
    // 9x9 grid with 0,0 (center) representing us, all 8 others are neighbors
    const NEIGHBORHOOD = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];
    return NEIGHBORHOOD.map(this.determineNeighborId);
  };

  // get an array of Cells back
  getCellsFromNeighborhood = (cells) => {
    return cells.filter((cell) => this.neighborhood.includes(cell.id));
  };

  // what happens next generation
  determineFate = (cells) => {
    // get the neighborhood cells and figure out who's alive
    const neighboringCells = this.getCellsFromNeighborhood(cells);
    const neighborsAlive = neighboringCells.filter((cell) => cell.alive).length;

    // cell is alive and has not been tagged for death
    if (this.alive && !this.domElement.classList.contains("die")) {
      // and we are isolated or overcrowded 
      if (neighborsAlive === 0 || neighborsAlive === 1 || neighborsAlive >= 4) {
        // next generation cell should die, add class to identify
        this.domElement.classList.add("die");
      }
    } 
    // the cell is dead and has not been tagged for birth
    if(!this.alive && !this.domElement.classList.contains("born")) {
      // and we have exactly 3 alive neighbors
      if (neighborsAlive === 3) {
        // next generation cell should be born, add class to identify
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
    this.domElement.classList.remove("die");
    this.domElement.classList.remove("alive");
  };

  born = () => {
    this.alive = true;
    this.domElement.classList.remove("born");
    this.domElement.classList.add("alive");
  };
}

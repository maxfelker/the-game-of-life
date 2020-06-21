export default class GameTime {
  constructor() {
    this.currentGeneration = 0;
    this.generationsPerSecond = 1;
    this.intervalDelay = Math.floor(1000 / this.generationsPerSecond);
  }

  start(callback) {
    if (this.interval) {
      console.error("Time has already started, cancelling!");
      return;
    }

    this.createUI();

    const intervalMethod = () => {
      this.incrementGeneration();
      callback();
    };

    this.interval = setInterval(intervalMethod, this.intervalDelay);
  }

  stop = () => clearInterval(this.interval);

  incrementGeneration = () => {
    this.currentGeneration++;
    this.uiElement.innerHTML = `Current Generation ${this.currentGeneration}`;
  };

  createUI() {
    this.uiElement = document.createElement("div");
    this.uiElement.id = "currentGeneration";
    document.body.append(this.uiElement);
  }
}

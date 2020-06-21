export default class GameTime {
  constructor() {
    this.currentGeneration = 0;
    this.generationsPerSecond = 1;
    this.intervalDelay = Math.floor(1000 / this.generationsPerSecond);

    window.addEventListener("DOMContentLoaded", this.setUI);
  }

  start(callback) {
    if (this.interval) {
      console.error("Time has already started, cancelling!");
      return;
    }
    const intervalMethod = () => {
      callback();
      this.incrementGeneration();
      this.updateUI();
    };
    this.interval = setInterval(intervalMethod, this.intervalDelay);
  }

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  incrementGeneration = () => {
    this.currentGeneration++;
  };

  setUI = () => {
    this.uiElement = document.getElementById("currentGeneration");
  };

  updateUI = () => {
    this.uiElement.innerHTML = this.currentGeneration;
  };
}

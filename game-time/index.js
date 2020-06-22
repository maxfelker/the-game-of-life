export default class GameTime {
  constructor() {
    this.currentGeneration = 0;
    this.generationsPerSecond = 10; 
    this.intervalDelay = Math.floor(1000 / this.generationsPerSecond);
    window.addEventListener("DOMContentLoaded", this.setUI);
  }

  // Start game time
  start(callback) {
    if (this.interval) {
      console.error("Time has already started, cancelling!");
      return;
    }
    // run next method every x generations per second
    this.interval = setInterval(() => {
      this.next(callback);
    }, this.intervalDelay);
  }

  // Fire the supplied call back, increment generation and update UI
  next = (callback) => {
    callback();
    this.incrementGeneration();
    this.updateUI();
  }

  // stop game time
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

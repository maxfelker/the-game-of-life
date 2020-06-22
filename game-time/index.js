export default class GameTime {
  constructor() {
    this.currentGeneration = 0;
    this.generationsPerSecond = 10;
    this.intervalDelay = Math.floor(1000 / this.generationsPerSecond);

    window.addEventListener("DOMContentLoaded", this.setUI);
  }

  start(callback) {
    if (this.interval) {
      console.error("Time has already started, cancelling!");
      return;
    }
    
    this.interval = setInterval(() => {
      this.next(callback);
    }, this.intervalDelay);
  }

  next = (callback) => {
    console.log('Next gen started');
    callback();
    this.incrementGeneration();
    this.updateUI();
  }

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  incrementGeneration = () => {
    this.currentGeneration++;
    console.log('Generation incremented');
  };

  setUI = () => {
    this.uiElement = document.getElementById("currentGeneration");
  };

  updateUI = () => {
    this.uiElement.innerHTML = this.currentGeneration;
    console.log('UI Updated');
  };
}

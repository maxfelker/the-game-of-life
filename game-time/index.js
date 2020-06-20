export default class GameTime {
  constructor() {
    this.currentGeneration = 0;
    this.generationsPerSecond = 10;
    this.intervalDelay = Math.floor(1000 / this.generationsPerSecond);
  }

  start(callback) {
    if (this.interval) {
      console.error("Already started");
      return;
    }
    const intervalMethod = () => {
      this.nextGeneration();
      console.log("generation updated! " + this.currentGeneration);
      callback();
    };

    this.interval = setInterval(intervalMethod, this.intervalDelay);
  }

  stop = () => clearInterval(this.interval);
  nextGeneration = () => this.currentGeneration++;
}

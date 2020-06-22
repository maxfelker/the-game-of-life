import Grid from "./grid/index.js";
import GameTime from "./game-time/index.js";

// wrap up modules in windows accessible object
window.App = {
  time: new GameTime(),
  grid: new Grid(),
};

// when DOM is ready
window.addEventListener("DOMContentLoaded", (event) => {
  // Start button
  const startButton = document.getElementById("start");
  startButton.onclick = function () {
    stopButton.style.display = "inline-block";
    startButton.style.display = "none";
    App.time.start(App.grid.update);
  };

  // Stop button
  const stopButton = document.getElementById("stop");
  stopButton.style.display = "none";
  stopButton.onclick = function () {
    startButton.style.display = "inline-block";
    stopButton.style.display = "none";
    App.time.stop();
  };

  // run next update manually
  document.getElementById("next").onclick = () =>
    App.time.next(App.grid.update);

  // clear the grid
  document.getElementById("clear").onclick = () => App.grid.clear();
});

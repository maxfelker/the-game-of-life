import Grid from "./grid/index.js";
import GameTime from "./game-time/index.js";

const time = new GameTime();

window.addEventListener("DOMContentLoaded", (event) => {
  const grid = new Grid();

  document.getElementById("next").onclick = function () {
    time.next(grid.update);
  };

  document.getElementById("start").onclick = function () {
    time.start(grid.update);
  };

  document.getElementById("stop").onclick = function () {
    time.stop();
  };
});

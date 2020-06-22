import Grid from "./grid/index.js";
import GameTime from "./game-time/index.js";

window.App = {
  time: new GameTime(),
  grid: new Grid()
};

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("next").onclick = () => App.time.next(App.grid.update);
  document.getElementById("start").onclick = () => App.time.start(App.grid.update);
  document.getElementById("stop").onclick = () => App.time.stop();
});

window.onload = function() {

}
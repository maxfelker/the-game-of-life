import Grid from "./grid/index.js";
import GameTime from "./game-time/index.js";

const time = new GameTime();
const grid = new Grid();

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("next").onclick = () => time.next(grid.update);
  document.getElementById("start").onclick = () => time.next(grid.update);
  document.getElementById("start").onclick = () => time.stop();
});

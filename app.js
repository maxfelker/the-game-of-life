import Grid from "./grid/index.js";
import GameTime from "./game-time/index.js";

const time = new GameTime();

window.addEventListener("DOMContentLoaded", (event) => {
  const grid = new Grid();
  time.start(grid.update);
  //setTimeout(time.stop,10000);
});



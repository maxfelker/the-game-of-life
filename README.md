Conway's Game of Life
===

An javascript implementation by MW Felker

### Getting started

The app runs locally witha a little bit of help from python's http server to support es6 javascript modules. Get it running like so:

```bash
git clone git@github.com:mw-felker/the-game-of-life.git .
cd the-game-of-life/
python3 -m http.server 8000
```

This will server the app at [http://localhost:8000](http://localhost:8000)


### Rules of the game

Rule from Conway at [@1:10 Does John Conway hate his Game of Life? - Numberphile](https://youtu.be/E8kUJL04ELA?t=70)

``` 
Each cell has 8 distinct neighbors
A neighbor is an adjacent cell  
If the cell has four or more neighbors, they die
If the cell has zero or one neighbor, they die
If a cell is dead and has exactly three alive neighbors, the cell is born
```

### Further
 - [Inventing Game of Life (John Conway) - Numberphile](https://www.youtube.com/watch?v=R9Plq-D1gEk)
 - [Does John Conway hate his Game of Life? - Numberphile](https://www.youtube.com/watch?v=E8kUJL04ELA)
 - [Another implementation on bitstorm](https://bitstorm.org/gameoflife/)
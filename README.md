Conway's Game of Life
===

An javascript implementation by MW Felker

### Getting started

Runs locally in the browser and python helps server local web file assets to support es6 modules. Get it running by using the http.server module from python3 like so:

```bash
cd /to/project/path;
python3 -m http.server 8000
```

This will server the app at [http://localhost:8000](http://localhost:8000)


### Rules of the game

Rule from Conway at [@4:15 Inventing Game of Life (John Conway) - Numberphile](https://youtu.be/R9Plq-D1gEk?t=256)

```
if you are dead and you have exactly three alive neighbors, you are born next turn
if you are alive have you have 2 or 3 alive neighbors, you survive 
```

Rule from Conway at [@1:10 Does John Conway hate his Game of Life? - Numberphile](https://youtu.be/E8kUJL04ELA?t=73)

``` 
Each cell has 8 distinct neighbors
Neighbor is an adjacent cell  
if the cell has four or more neighbors, they die
if the cell has zero or one neighbor, they die
if a cell is dead and has exactly three alive neighbors, the cell is born
```

Adapted from [bitstorm](https://bitstorm.org/gameoflife/)

```
if the space is populated 
  with 0 or 1 neighbors 
    dies of solitude 
  with 2 or 3 neighbors
    stays alive
  with 4 neighbors
    dies of overcrowding

if the space is not populated 
  each cell with three neighbors is born
```

Also worth watching these two videos featuring Conway:

 - [Inventing Game of Life (John Conway) - Numberphile](https://www.youtube.com/watch?v=R9Plq-D1gEk)
 - [Does John Conway hate his Game of Life? - Numberphile](https://www.youtube.com/watch?v=E8kUJL04ELA)


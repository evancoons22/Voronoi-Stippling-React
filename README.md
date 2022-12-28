## Voronoi Stippling with web worker in React
A UI for voronoi stippling using React. Upload an image to produce a stippling, based on brightness values and improved iteratively. After the stippling is created, the `Rust-api-Traveling-Salesman` backend can be used to create a shortest path between points (NP hard!!). 

### Summary

A web worker is used to begin with a random stippling and iteratively imporve those points. At each iteration, voronoi diagrams are created, every coordinate being a generating point. The centroids of the voronoi diagrams (weighted on brightness) are used as the generating points of the next iteration. In this way, the points adjust and an image appears. See [this research](https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf), also linked below as **#1**. 

The Rust TSP api allows observation an NP-hard problem. The api does not use brute force, but rather hill climbing. This can be changed by replacing `hill_climbing` with `brute_force` in main.rs. With many points in the stippling, a perfect (or even good) solution is almost impossible.

This was inspired by the [TSP art challenge solution](https://www.math.uwaterloo.ca/tsp/data/ml/monalisa.html) of 100,000 points over the Mona Lisa. 

### Sources used: 
1. [voronoi stippling](https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf)
2. [d3](https://observablehq.com/@mbostock/voronoi-stippling)
3. [d3 github repo](https://github.com/d3/d3-delaunay)
4. [voronoi wiki](https://en.wikipedia.org/wiki/Voronoi_diagram)
5. [Rust travelling_salesman v1.1.22](https://crates.io/crates/travelling_salesman)

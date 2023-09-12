## Voronoi Stippling with web worker in React
Upload an image to produce a stippling based on brightness values that improves iteratively. After the stippling is created, the `Rust-api-Traveling-Salesman` backend can be used to create a shortest path between points (NP hard!!). This was built with React and Rust. 

### Summary

A web worker chooses a random stippling and iteratively imporve those points. At each iteration, the centroids are updated based on the brightness of the points around it. In other words, we find all the points closest to the centroid, but instead of updating the centroid based on the mean of the closest points, the centroid is updated based on a weighted average with the brightness values of the points. Over many iterations, the centroids converge towards the darkest regions, and the image appears. See this research, also linked below as **#1**.

The Rust TSP api is an experiment with an NP hard problem. The api does not use brute force, but rather hill climbing. This can be changed by replacing `hill_climbing` with `brute_force` in main.rs. With many points in the stippling, a perfect (or even good) solution is almost impossible.

![Alt Text](example.png)


This was inspired by the [TSP art challenge solution](https://www.math.uwaterloo.ca/tsp/data/ml/monalisa.html) of 100,000 points over the Mona Lisa.
1. [other article 1](https://www2.oberlin.edu/math/faculty/bosch/tspart-page.html)
2. [other article 2](https://www2.oberlin.edu/math/faculty/bosch/making-tspart-page.html)

### Sources used: 
1. [voronoi stippling](https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf)
2. [d3](https://observablehq.com/@mbostock/voronoi-stippling)
3. [d3 github repo](https://github.com/d3/d3-delaunay)
4. [voronoi wiki](https://en.wikipedia.org/wiki/Voronoi_diagram)
5. [Rust travelling_salesman v1.1.22](https://crates.io/crates/travelling_salesman)

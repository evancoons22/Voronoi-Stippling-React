import * as d3 from "d3-delaunay";
    onmessage = event => {

    const {data: {data, width, height, n}} = event;
    const points = new Float64Array(n * 2);
    const c = new Float64Array(n * 2);
    const s = new Float64Array(n);

  
    // Initialize the points with rejection sampling.
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < 30; ++j) {
        const x = points[i * 2] = Math.floor(Math.random() * width);
        const y = points[i * 2 + 1] = Math.floor(Math.random() * height);
        if (Math.random() < data[y * width + x]) break; 
        // if a random value between 0 and 1 is less than brightness value (small brightness values are dark points), then it is a good random point to choose, so we break
      }
    }

    postMessage({
      type: 'running',
      data: points
    })
  
    const delaunay = new d3.Delaunay(points);
    const voronoi = delaunay.voronoi([0, 0, width, height]);
  
    // I found that k = 80 returns a good stippling
    for (let k = 0; k < 80; ++k) {
  
      // Compute the weighted centroid for each Voronoi cell.
      c.fill(0);
      s.fill(0);
      for (let y = 0, i = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
          const w = data[y * width + x];
          i = delaunay.find(x + 0.5, y + 0.5, i); // returns the closest point to x,y, starting at i, which makes it faster. 
          s[i] += w; // i is the closest centroid
          c[i * 2] += w * (x + 0.5);
          c[i * 2 + 1] += w * (y + 0.5);
        }
      }
  
      // Relax the diagram by moving points to the weighted centroid.
      const w = Math.pow(k + 1, -0.8) * 10; // the further we get in iterations, the less we wiggle the points
      for (let i = 0; i < n; ++i) {
        const x0 = points[i * 2], y0 = points[i * 2 + 1];
        const x1 = s[i] ? c[i * 2] / s[i] : x0, y1 = s[i] ? c[i * 2 + 1] / s[i] : y0;
        points[i * 2] = x0 + (x1 - x0) * 1.8 + (Math.random() - 0.5) * w; // Wiggle the points a little bit so they don’t get stuck.
        points[i * 2 + 1] = y0 + (y1 - y0) * 1.8 + (Math.random() - 0.5) * w;
      }
  
      voronoi.update();
      postMessage({
        type: 'running',
        data: points
      })
    }

    postMessage({
      type: 'done',
      data: points
    });
  }
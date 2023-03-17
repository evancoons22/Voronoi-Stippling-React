import './App.css';
import BuildStippling from './components/BuildStippling';
import UploadAndDisplayImage from './components/UploadAndDisplayImage';
import { useState } from 'react';


function App() {
  // const [uploaded, setUploaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgData, setimgData] = useState(null); 

  return (
    <div className="App">
      <div className="App-header-container">

        <div className = 'flex-item links'> 
          <a href = 'https://en.wikipedia.org/wiki/Travelling_salesman_problem#Euclidean' target={'_blank'} rel="noreferrer" className = 'linkbutton'>
            <img src={require('./img/wikilogo.png')} alt = '' className='linkbutton' />
          </a>
          <a href = 'https://github.com/evancoons22/Voronoi-Stippling-React' target={'_blank'} rel="noreferrer" className = 'linkbutton' >
            <img src={require('./img/github.png')} alt = '' className='linkbutton' />
          </a>
          <a href = "https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf" target = {'_blank'} rel = "noreferrer" className='linkbutton'> 
              <img src = {require('./img/camel.png')} alt = '' className='linkbutton' />
          </a>
        </div>

        <div className = 'flex-item title'> 
        <div>  
          <h1>K Means Stippling and Rust Travelling Salesman</h1>
          <h3> Evan Coons</h3>
        </div>
        </div>

        <div className= "flex-item links"> </div>

      </div>
      
      <div className='writing'> 
      <h2 id="voronoi-stippling-with-web-worker-in-react">Upload an Image here to begin: </h2> 
      <h4>Note: There is an issue with chrome web workers that causes a long delay. Safari or other browsers work much faster. If on chrome, just wait at least 10 seconds for the page to respond. </h4>
      </div>

      <div className='body'> 
      <UploadAndDisplayImage 
      // setUploaded={setUploaded} 
      setSelectedImage={setSelectedImage} 
      selectedImage={selectedImage}
      setimgData={setimgData}
      imgData={imgData}
      className = 'stipplingbuilder'/>
      {
        selectedImage ? (
          <BuildStippling 
          className = 'stipplingbuilder'
          selectedImage= {selectedImage}
          imgData = {imgData}/>
          ) : ( 
            <div className='waiting'> </div> 
            )
          }
      </div>

    <div className='writing'>
    <h2 id="voronoi-stippling-with-web-worker-in-react">K Means Stippling in React </h2> 
      <p>This is my submission for the <b>final project of Math 118: Mathematical Methods of Data Theory</b> at UCLA. This webpage is a specific implementation of the K-means algorithm called a voronoi stippling. Upload an image and choose the preferred number of points to produce a stippling based on brightness values (default: 80 iterations). After the stippling is created, the <code>Rust-api-Traveling-Salesman</code> backend can be used to create a shortest path between points (NP hard!!). The Rust backend is not part of the project, just something I wanted to try out.</p>
      <p><b> Notes</b>: This K-means algorithm has been implemented before, and I marked all my sources below. </p>
      <h3 id="summary">Summary</h3>
      <p>A web worker is used to begin with a random stippling and iteratively imporve those points. At each iteration, the centroids are updated based on the brightness of the points around it. In other words, we find all the points closest to the centroid, but instead of updating the centroid based on the mean of the closest points, the centroid is updated based on a weighted average with the brightness values of the points (darker points weighted heavier). Over many iterations, the centroids converge towards the darkest regions, and the image appears. See <a href="https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf">this research</a>, also linked below as <strong>#1</strong>. </p>
      <p>The Rust TSP api is an experiment with an NP hard problem. The api does not use brute force, but rather hill climbing. This can be changed by replacing <code>hill_climbing</code> with <code>brute_force</code> in main.rs. With many points in the stippling, a perfect (or even good) solution is almost impossible.</p>
      <p>This was inspired by the <a href="https://www.math.uwaterloo.ca/tsp/data/ml/monalisa.html">TSP art challenge solution</a> of 100,000 points over the Mona Lisa. And these articles:</p>
      <ol>
      <li><a href="https://www2.oberlin.edu/math/faculty/bosch/tspart-page.html"> article 1</a></li>
      <li><a href="https://www2.oberlin.edu/math/faculty/bosch/making-tspart-page.html"> article 2</a></li>
      </ol>
      <h3 id="sources-used-"> The following sources helped me to code and understand the algorithm:</h3>
      <ol>
      <li><a href="https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf">voronoi stippling</a></li>
      <li><a href="https://observablehq.com/@mbostock/voronoi-stippling">d3</a></li>
      <li><a href="https://github.com/d3/d3-delaunay">d3 github repo</a></li>
      <li><a href="https://en.wikipedia.org/wiki/Voronoi_diagram">voronoi wiki</a></li>
      <li><a href="https://crates.io/crates/travelling_salesman">Rust travelling_salesman v1.1.22</a></li>
      </ol>


    </div>
    </div>
  );
}

export default App;

import './App.css';
import BuildStippling from './components/BuildStippling';
import UploadAndDisplayImage from './components/UploadAndDisplayImage';
// import DisplayPath from './components/DisplayPath';
import { useState } from 'react';


function App() {
  const [uploaded, setUploaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgData, setimgData] = useState(); 

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
          <h1>Voronoi Stippling and Rust Travelling Salesman</h1>
        </div>
        </div>

        <div className= "flex-item links">  </div>

      </div>
      <div className='body'> 
      <UploadAndDisplayImage 
      setUploaded={setUploaded} 
      setSelectedImage={setSelectedImage} 
      selectedImage={selectedImage}
      setimgData={setimgData}
      imgData={imgData}
      className = 'stipplingbuilder'/>
      {
        uploaded ? (
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
    <h2 id="voronoi-stippling-with-web-worker-in-react">Voronoi Stippling with {"\n"} web worker in React {"\n"} </h2> 
      <p>A UI for voronoi stippling using React. Upload an image to produce a stippling based on brightness values that improves iteratively. After the stippling is created, the <code>Rust-api-Traveling-Salesman</code> backend can be used to create a shortest path between points (NP hard!!). </p>
      <h3 id="summary">Summary</h3>
      <p>A web worker is used to begin with a random stippling and iteratively imporve those points. At each iteration, voronoi diagrams are created, every coordinate being a generating point. The centroids of the voronoi diagrams (weighted on brightness) are used as the generating points of the next iteration. In this way, the points adjust and an image appears. See <a href="https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf">this research</a>, also linked below as <strong>#1</strong>. </p>
      <p>The Rust TSP api allows observation an NP-hard problem. The api does not use brute force, but rather hill climbing. This can be changed by replacing <code>hill_climbing</code> with <code>brute_force</code> in main.rs. With many points in the stippling, a perfect (or even good) solution is almost impossible.</p>
      <p>This was inspired by the <a href="https://www.math.uwaterloo.ca/tsp/data/ml/monalisa.html">TSP art challenge solution</a> of 100,000 points over the Mona Lisa.</p>
      <ol>
      <li><a href="https://www2.oberlin.edu/math/faculty/bosch/tspart-page.html">other article 1</a></li>
      <li><a href="https://www2.oberlin.edu/math/faculty/bosch/making-tspart-page.html">other article 2</a></li>
      </ol>
      <h3 id="sources-used-">Sources used:</h3>
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

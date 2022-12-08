import './App.css';
import BuildStippling from './components/BuildStippling';
import UploadAndDisplayImage from './components/UploadAndDisplayImage';
// import DisplayPath from './components/DisplayPath';
import { useState } from 'react';


function App() {
  const [uploaded, setUploaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgData, setimgData] = useState(); 
  console.log(imgData);

  return (
    <div className="App">
      <div className="App-header-container">

        <div class = 'flex-item links'> 
          <a href = 'https://en.wikipedia.org/wiki/Travelling_salesman_problem#Euclidean' target={'_blank'} rel="noreferrer" className = 'linkbutton'>
            <img src={require('./wikilogo.png')} alt = '' className='linkbutton' class = 'linkbutton' />
          </a>
          <a href = 'https://github.com/evancoons22/EPIC-Report-Automation/blob/main/report%20page/main.html' target={'_blank'} rel="noreferrer" className = 'linkbutton' >
            <img src={require('./github.png')} alt = '' className='linkbutton' />
          </a>
          <a href = "https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf" target = {'_blank'} rel = "noreferrer" className='linkbutton'> 
              <img src = {require('./camel.png')} alt = '' className='linkbutton' />
          </a>
        </div>

        <div class = 'flex-item title'> 
        <div>  
          <h1>Voronoi Stippling and Rust Travelling Salesman</h1>
        </div>
        </div>

        <div class= "flex-item links">  </div>

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
      <div> 
          Background
      </div>
      <br />
      <br />
      <div> Voronoi Stippling is a method of dotting an image using an algorithm outlined <a href = "https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf"> here </a> 
      </div>

    </div>
    </div>
  );
}

export default App;

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
      <header className="App-header">

        <div class = 'links'> 
        <a href = 'https://en.wikipedia.org/wiki/Travelling_salesman_problem#Euclidean' className='linkbutton' target={'_blank'} rel="noreferrer">
          {/* <img src={require('./wikilogo.png')} alt = '' width='35x' /> */}
          <img src='https://upload.wikimedia.org/wikipedia/commons/4/46/Wikipedia-W-visual-balanced.svg' alt = '' height = '35' />
          {/* <img src='https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg' alt = '' width='35x' /> */}
        </a>
        <a href = 'https://github.com/evancoons22/EPIC-Report-Automation/blob/main/report%20page/main.html' target={'_blank'} rel="noreferrer" className = 'linkbutton'>
          <img src={require('./github.png')} alt = '' height='35' />
        </a>
        </div>
          <h1 className='title'> Voronoi Stippling and Rust Traveling Salesman</h1>
        
      </header>

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
    </div>
  );
}

export default App;

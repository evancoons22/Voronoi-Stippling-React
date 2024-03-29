import React, { useEffect } from "react";


const UploadAndDisplayImage = ({setSelectedImage, selectedImage, setimgData, imgData}) => {

  // this code displays the image on a hidden canvas to get rgb data
  // credit here: https://educity.app/web-development/how-to-upload-and-draw-an-image-on-html-canvas
   useEffect( () => {
      let imgInput = document.getElementById('imageinput');
      imgInput.addEventListener('change', function(e) {
        if(e.target.files) {
          let imageFile = e.target.files[0]; //here we get the image file
          var reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onloadend = function (e) {
            var myImage = new Image(); // Creates image object
            myImage.src = e.target.result; // Assigns converted image to image object
            myImage.onload = function(ev) {
              var c = document.getElementById("secondcanvas", { willReadFrequently: true }); // Creates a canvas object
              var ctx = c.getContext("2d"); // Creates a contect object
              c.width = myImage.width; // Assigns image's width to canvas
              c.height = myImage.height; // Assigns image's height to canvas
              ctx.drawImage(myImage,0,0); // Draws the image on canvas
              const data = ctx.getImageData(0, 0, myImage.width, myImage.height);
              setimgData(data);
              // setUploaded(true);
            }
          }
        }
    });
  })


  return (
    <div>

      {selectedImage && (
        <div>
        <img id = "selectedimage" alt="not found" className = "img-element" src={URL.createObjectURL(selectedImage)} />
        <br />
        <button className = 'button' onClick={()=>{ 
          setSelectedImage(null);
          setimgData(null);
          
        }
      }>Remove</button>
        </div>
      )}

      <br /> 


      {/* This trickery just allows to relabel an input button to get the button styling */}


        <div> 
        <label className="button" htmlFor = 'imageinput'>  Upload an Image </label>
        <input
        id = 'imageinput'
        type="file"
        name="myImage"
        className="input"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
        onClick={(event)=> { 
          event.target.value = null
        }}
        />
        </div>
    
      
      
    

      
      <div> 
      <canvas id="secondcanvas" height ='0' width='0' style={{display: 'none', border: '#000'}} > Your browser does not support this html tag</canvas>
      </div>
    </div>
  );
};

export default UploadAndDisplayImage;
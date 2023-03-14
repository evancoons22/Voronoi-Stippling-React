import React, {useState} from "react";
// import 'https://d3js.org/d3.v5.min.js';

const BuildStippling = ({imgData}) => {
    const [create, setCreate] = useState(true); // Disable the button
    const [stipplingdone, setStipllingDone] = useState(false);
    const [voronoipoints, setVoronoiPoints] = useState(null);
    const [goodrequest, setGoodRequest] = useState(true);
    const [N, setN] = useState(30000);

    // handles a call to the rust api for finding a tsp solution
    const DisplayPath = async () => {
        console.log("this function call worked")
      
        const sendpoints = Array.from(voronoipoints);
      
        await fetch('http://localhost:8000/tsp', {
            method: 'POST',
            body: JSON.stringify(sendpoints),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
            .then(data => {
              console.log(data);
              DrawPath(data)
                })
            .catch(setGoodRequest(false));
    }
    
    // Drawing the path of the tsp solution from the backend
    const DrawPath = (tsporder) => { 
      const c = document.getElementById("myCanvas");
      const ctx = c.getContext("2d");
      
      for (let i = 0; i < tsporder.length - 1; i ++) { 
        ctx.beginPath(); 
        ctx.moveTo(voronoipoints[tsporder[i] * 2], voronoipoints[tsporder[i] * 2 + 1]);
        ctx.lineTo(voronoipoints[tsporder[i + 1] * 2], voronoipoints[tsporder[i + 1] * 2 + 1]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke()
      }
  
    }

  
    // Every time the web worker sends an update, this function handles the new set of points
    function messaged(event) {
        const message = event.data;
        const points = message.data;

        // {data: points}
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        const height = imgData.height; 
        const width = imgData.width;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
        ctx.beginPath();
        for (let i = 0, n = points.length; i < n; i += 2) {
          const x = points[i], y = points[i + 1];
          ctx.moveTo(x + 1.5, y); // x + 1.5
          ctx.arc(x, y, 1.5, 0, 2 * 3.1415); // Math.PI
        }
        // console.log("receiving the message")
        ctx.fillStyle = "#000";
        ctx.fill();
        
        if (message.type === 'done') {
            // The web worker is finished working
            console.log('The web worker is finished working!');
            console.log(points);
            setVoronoiPoints(points);
            setStipllingDone(true);
          }
      }

    // handles 'create voronoi stippling' -- begins web worker and the listener
    const handleclick = async () => { 
        var c = document.getElementById("myCanvas");
        
        const height = imgData.height;
        const width = imgData.width;

        c.width = width;
        c.height = height;
        
        const {data: rgba} = imgData;
        const data = new Float64Array(width * height);
        //this is making the brightness
        for (let i = 0, n = rgba.length / 4; i < n; ++i) data[i] = Math.max(0, 1 - rgba[i * 4] / 254);

        const worker = new Worker(new URL('./worker.js', import.meta.url));
        // console.log("calling the worker")

        worker.addEventListener("message", messaged);
        
        const n = N;
        // const n = 30000;
        setCreate(false);
        worker.postMessage({data, n, width, height});
    }

    const handleN = (event) => { 
      setN(event.target.value);
    }

    return ( 
        <div> 
        <canvas id="myCanvas" className="img-element" > your browser does not support canvas </canvas>
        <br/>
        {create ? ( 
        <div>
        <form onSubmit={handleclick}> 
        <label> 
          Input Number: {N}
          <br></br>
          <input type = "range" className = "slider" min = "100" max = "100000"  onChange = {handleN}/> 
        </label>
          <br></br>
          <input className='button' type="submit" value="Begin Stippling" />
        </form>

        </div>
        ) : (
            <div>Restart to Run Again</div>
        )
        }
        <br />
        {stipplingdone ? (
          goodrequest ? (
          <button className = "button" id = "rust-button" onClick={DisplayPath}>Draw an Optimal Path</button>
            ):(
              <div color="red"> Rust api not set up or bad request</div>
            )
        ):(
            <button className = "button" id = "rust-button" disabled >Wait for stippling to begin TSP</button>
        )}
        </div>

    );
};

export default BuildStippling;

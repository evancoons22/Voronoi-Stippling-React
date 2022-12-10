import React, {useState} from "react";
import 'https://d3js.org/d3.v5.min.js';
import DisplayPath from "./DisplayPath";


const BuildStippling = ({imgData}) => {
    const [create, setCreate] = useState(true);
    // Disable the button
    const [stipplingdone, setStipllingDone] = useState(false);

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
          ctx.moveTo(x + 1.5, y);
          ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
        }
        ctx.fillStyle = "#000";
        ctx.fill();

        if (message.type === 'done') {
            // The web worker is finished working
            console.log('The web worker is finished working!');
            setStipllingDone(true);
          }
      }

    
    const handleclick = async () => { 
        var c = document.getElementById("myCanvas");
        
        c.width = imgData.width;
        c.height = imgData.height;

        
        const height = imgData.height;
        const width = imgData.width;

        const {data: rgba} = imgData;
        const data = new Float64Array(width * height);
        //this is making the brightness
        for (let i = 0, n = rgba.length / 4; i < n; ++i) data[i] = Math.max(0, 1 - rgba[i * 4] / 254);

        const worker = new Worker(new URL('./worker.js', import.meta.url));

        worker.addEventListener("message", messaged);
        
        
        const n = 50000;
        setCreate(false);
        worker.postMessage({data, n, width, height});
    }

    const info = 1;

    return ( 
        <div> 
        <canvas id="myCanvas" className="img-element" > your browser does not support canvas </canvas>
        <br/>
        {create ? ( 
        <button onClick = {handleclick} className = "button"> Create a Voronoi Stippling</button>
        ) : (
            <div>Restart to Run Again</div>
        )
        }
        <br />
        {stipplingdone ? (

            <button className = "button" id = "rust-button" onClick={() => DisplayPath(info)}>Draw an Optimal Path</button>
        ):(
            <button className = "button" id = "rust-button" disabled onClick={() => DisplayPath(info)}>Wait for stippling to begin TSP</button>
        )}
        </div>

    );
};

export default BuildStippling;

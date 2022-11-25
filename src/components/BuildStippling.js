import React, {useState} from "react";
import 'https://d3js.org/d3.v5.min.js';


const BuildStippling = ({imgData}) => {
    const [create, setCreate] = useState(true);
    // const mystyle = {width:"600px", height: "600px", border:"1px solid #d3d3d3"};
    // const mystyle = {width:toString(imgData.width), height: toString(imgData.height), border:"1px solid #d3d3d3"};
    const mystyle = {width:'600px', border:"1px solid #d3d3d3"};


    function messaged({data: points}) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        const height = imgData.height;
        const width = imgData.width;
        console.log(points)
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
      }

    
    const handleclick = async () => { 
        setCreate(true);
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
        
        
        // const n = 41434;
        const n = 100000;
        // build(data, width, height, 41434, ctx);
        worker.postMessage({data, n, width, height});
        
                
    }

    return ( 
        <div>
        <button onClick = {handleclick}> Create a Voronoi Stippling</button>
        <div> 
        {create ? (
            <canvas id="myCanvas" style = {mystyle}> your browser does not support canvas </canvas>
            ) : ( 
                <div> Click the button to create a voronoi stippling </div>
            )
        }
        </div>
        </div>
    );
};

export default BuildStippling;

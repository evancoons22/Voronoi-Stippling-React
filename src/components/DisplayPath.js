import React, { useState } from 'react';

const DisplayPath = (props) => {

    const [loading, setLoading] = useState(null);
    const [status, setStatus] = useState(200);
    const [coords, setCoords] = useState('')

    const points = { 
        1 : [27.0, 78.0],
        2 : [18.0, 24.0],
        3 : [48.0, 62.0],
        4 : [83.0, 77.0],
        5 : [55.0, 56.0],
    
      }

    // Make these environment variables later.
    const url_get_coords = 'http://localhost:8000/hello'

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Accept': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(points)
        };

      const handleSubmit = async() => {
        setLoading(true)
        await fetch(url_get_coords, requestOptions)
            .then(response => response.json())
            .then(data => {
                setCoords(data);
                setStatus(data.status);
                console.log(data)
            })


        console.log(status)
        // event.preventDefault()

      }


      return (
        <div>  
         <button onClick = {handleSubmit}> Retrieve Optimal Path </button> 
          <div>
            {loading ? (
                <div>
                <div style = {{color: "red"}}> waiting for topics </div>
                </div>
            ): ( 
              <div> {coords} </div>
            ) }
          </div>
        </div>
        )

}

export default DisplayPath
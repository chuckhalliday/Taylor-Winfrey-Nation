import React from "react";


const Welcome = (props) => {

  return (
    <center>
      <div className="welcome"><h2>You belong to us now, {props.name}</h2></div>
      <div id="tw">
        <iframe
            id="crop"
            title="tayoh" 
            src="https://3dthis.com/player.htm?h=OTE0NjUyNw"
            position="absolute"
            width="115%"
            frameBorder="0" 
            allowFullScreen="">
        </iframe>
        </div>
        <div>
          <h2>"Hater's gonna hate hate hate hate hate hate...</h2>
          <h2>You get a car!  You get a car!"</h2>
        </div>
    </center>
  )
};

export default Welcome;
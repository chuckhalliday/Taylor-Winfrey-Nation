import React from "react";


const Welcome = (props) => {

  return (
    <center>
      <div className="welcome"><h2>You belong to us now, {props.name}</h2></div>
      <div id="tw">
        <img src={require('../../src/TW.gif')} alt="Taylor Winfrey"/>
        </div>
        <div>
          <h2>"Hater's gonna hate hate hate hate hate hate...</h2>
          <h2>You get a car!  You get a car!"</h2>
        </div>
    </center>
  )
};

export default Welcome;
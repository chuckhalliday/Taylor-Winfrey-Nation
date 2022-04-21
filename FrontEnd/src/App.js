import React, { Fragment } from "react";
import './App.css';

//components

import InputUser from "./Components/CreateUser";
import Login from "./Components/Login";

function App() {
  return (
    <Fragment>
     < InputUser />
     < Login />
    </Fragment>
  );
}

export default App;

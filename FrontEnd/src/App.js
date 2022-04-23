import React, { Fragment, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

//components

import InputUser from "./Components/CreateUser";
import Login from "./Components/Login";
import Home from "./Components/Home"

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth}/> : <Redirect to="/home" />} />
            <Route exact path="/createuser" render={props => !isAuthenticated ? <InputUser {...props} setAuth={setAuth} /> : < Redirect to="/login" />} />
            <Route exact path="/home" render={props => isAuthenticated ? <Home {...props} setAuth={setAuth} /> : <Redirect to="/login"/>} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;

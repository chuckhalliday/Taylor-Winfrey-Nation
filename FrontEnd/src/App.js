import React, { Fragment, useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

//components

import InputUser from "./Pages/CreateUser";
import Login from "./Pages/Login";
import Home from "./Pages/Home";


function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };


  return (
    <Fragment>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth}/>) : (<Redirect to="/home" />)} />
            <Route exact path="/createuser" render={props => !isAuthenticated ? (<InputUser {...props} setAuth={setAuth} />) : (< Redirect to="/login" />)} />
            <Route exact path="/home" render={props => isAuthenticated ? (<Home {...props} setAuth={setAuth} />) : (<Redirect to="/login"/>)} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;

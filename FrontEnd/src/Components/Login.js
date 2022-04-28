import React, { Fragment, useState} from "react";
import { Link } from "react-router-dom"

import { toast } from "react-toastify"

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const validateCredentials = () => {
        let isValidated = true;
    
        if (username === "") {
          setErrorUsername("! Please enter a Username");
          isValidated = false;
        } else {
          setErrorUsername("")
        }
        if (password === "") {
          setErrorPassword("! Please enter a Password");
          isValidated = false
        } else {
          setErrorPassword("")
        }
        return isValidated
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (validateCredentials()) {
            try {
                const body = { username, password }

                const response = await fetch('http://localhost:5000/auth/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

                const parseRes = await response.json();
                if (parseRes.jwtToken) {
                  localStorage.setItem("token", parseRes.jwtToken);
                  setAuth(true);
                  toast.success("Logged in Successfully");
                } else {
                  setAuth(false);
                  toast.error(parseRes);
                }
              } catch (err) {
                console.error(err.message);
              }
            }
          };
          
    return (
        <Fragment>
          <h1 className="text-center mt-5">Login</h1>
          <form className="mt-5" id="userinput" onSubmit={onSubmit}>
            <div className="form-group">
              <span className="label">Username</span>
              <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
              <span style={{ color: "red" }}>{errorUsername}</span><br />
            </div>
            <div className="form-group">
              <span className="label">Password</span>  
              <input type="text" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
              <span style={{ color: "red" }}>{errorPassword}</span><br />
            </div>
            <button className="btn btn-success">Login</button>
          </form>
          <Link to="/createuser">Register</Link>
        </Fragment>
      );    
}

export default Login;
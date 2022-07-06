import React, { Fragment, useState} from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

                const response = await fetch('/auth/login', {
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
          
  const showPassword = () => {
    var x = document.getElementById("passwordinput");
      if (x.type === "password") {
        x.type = "text";          
        } else {
          x.type = "password";
        }
    }
          
    return (
        <Fragment>
          <h1 className="text-center mt-5">Login</h1>
          <form className="mt-5" id="userinput" onSubmit={onSubmit}>
            <div className="form-group">
              <span className="label">Username</span><span className="danger">{errorUsername}</span>
              <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <span className="label">Password</span> <span className="danger">{errorPassword}</span> 
              <input type="password" className="form-control" id="passwordinput" value={password} onChange={e => setPassword(e.target.value)} />
              <input type="checkbox" onClick={showPassword}/><span id="showbox">Show Password</span>
            </div>
            <button className="btn btn-success mb-5">Login</button><br />
            <Link to="/createUser">Register</Link>
          </form>
        </Fragment>
      );    
}

export default Login;
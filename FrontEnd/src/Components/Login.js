import React, { Fragment, useState} from "react";

const Login = () => {
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

    return (
        <Fragment>
          <h1 className="text-center mt-5">Or... Login</h1>
          <form className="mt-5">
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
        </Fragment>
      );    
}

export default Login;
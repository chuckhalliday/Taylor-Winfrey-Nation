import React, { Fragment, useState } from "react";

const InputUser = () => {
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [errorFirst_name, setErrorFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [errorLast_name, setErrorLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const validateSignUp = () => {
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
    if (first_name === "") {
      setErrorFirst_name("! Please enter First Name");
      isValidated = false
    } else {
      setErrorFirst_name("")
    }
    if (last_name === "") {
      setErrorLast_name("! Please enter Last Name");
      isValidated = false
    } else {
      setErrorLast_name("")
    }
    if (email === "") {
      setErrorEmail("! Please enter Email")
    } else {
      setErrorEmail("")
    }
    return isValidated
  }

  const onSubmitForm = async e => {
      e.preventDefault();
      const body = {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email
      }
      if (validateSignUp()) {
          await fetch('/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then(function (res) {
            alert(username + ' created!')
            return res
        })
      }
    };

    function showPassword() {
      var x = document.getElementById("passwordinput");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }


  return (
    <Fragment>
      <h1 className="text-center mt-5">Create User</h1>
      <form className="mt-5" id="userinput" onSubmit={onSubmitForm}>
        <div className="form-group">
          <span className="label">First Name</span><span className="danger">{errorFirst_name}</span>
          <input type="text" className="form-control" value={first_name} onChange={e => setFirst_name(e.target.value)} />
        </div>
        <div className="form-group">
          <span className="label">Last Name</span><span className="danger">{errorLast_name}</span>
          <input type="text" className="form-control" value={last_name} onChange={e => setLast_name(e.target.value)} />
        </div>
        <div className="form-group">
          <span className="label">Email</span><span className="danger">{errorEmail}</span>
          <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <span className="label">Username</span><span className="danger">{errorUsername}</span>
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <span className="label">Password</span><span className="danger">{errorPassword}</span>  
          <input type="password" className="form-control" id="passwordinput" value={password} onChange={e => setPassword(e.target.value)} />
          <input type="checkbox" onClick={showPassword}/><span id="showbox">Show Password</span>
        </div>
        <button className="btn btn-success mb-5">Add User</button><br/>
        <a href="/login">Login</a>
      </form>


    </Fragment>
  );
}


export default InputUser;

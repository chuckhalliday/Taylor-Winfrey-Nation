import React, { Fragment, useState } from "react";

const InputUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [telephone, setTelephone] = useState("");

  const onSubmitForm = async(e) => {
      e.preventDefault();
      try {
        const body = {username, password, first_name, last_name, telephone}
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        console.log(response)
      }catch (err) {
          console.error(err.message)
      }
  }

  return (
    <Fragment>
      <h1 className="text-center mt-5">Create User</h1>
      <form className="mt-5" onSubmit={onSubmitForm}>
        <div className="form-group">
          <span className="label">Username</span>
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <span className="label">Password</span>  
          <input type="text" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <span className="label">First Name</span>
          <input type="text" className="form-control" value={first_name} onChange={e => setFirst_name(e.target.value)} />
        </div>
        <div className="form-group">
          <span className="label">Last Name</span>
          <input type="text" className="form-control" value={last_name} onChange={e => setLast_name(e.target.value)} />
        </div>
        <div className="form-group">
          <span className="label">Phone Number</span>
          <input type="text" className="form-control" value={telephone} onChange={e => setTelephone(e.target.value)} />
        </div>
        <button className="btn btn-success">Add User</button>
      </form>
    </Fragment>
  );
};

export default InputUser;

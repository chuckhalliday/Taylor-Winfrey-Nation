import React, { Fragment, useState, useEffect } from "react";

const Home = ({ setAuth }) => {


    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }
    return (
        <Fragment>
            <h1>Welcome to the Taylor Winfrey Payment Experience</h1>
            <button className="btn btn-success" onClick={e => logout(e)}>Logout</ button>
        </Fragment>
    );
};

export default Home;
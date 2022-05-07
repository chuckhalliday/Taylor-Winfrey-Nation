import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Welcome from '../Components/Welcome'
import Singles from '../Components/Singles'
import Merch from '../Components/Merch'
import Tour from '../Components/Tour'
import ProductDetails from '../Components/ProductDetails'

const Home = ({ setAuth }) => {
    const [name, setName] = useState("");

    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/dashboard/", {
          method: "POST",
          headers: { jwt_token: localStorage.token }
        });
  
        const parseData = await res.json();
        setName(parseData.first_name);
      } catch (err) {
        console.error(err.message);
      }
    };


    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    useEffect(() => {
        getProfile();
      }, []);
    

    const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    return (
            <Router>
           <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
            </div>
            <div className="brand">
            <a id="title" href="/">The Official Taylor Winfrey Payment Experience!!!!!!</a>
            </div>
            <div className="header-links">
                <a id="cart" href="cart.html">Cart</a>
                <button className="btn btn-success" onClick={e => logout(e)}>Logout</ button>
            </div>
        </header>
        <aside className="sidebar">
            <h3>The Goods</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <Link to="/singles">Singles</Link> 
                </li>
                <li>
                    <Link to="/merch">Merch</Link>
                </li>
                <li>
                    <Link to="/tour">Tickets</Link>
                </li>
            </ul>
        </aside>
        <main className="main">
        <div className="welcome"><h2>You belong to us now, {name}</h2></div>
        <div className="content">
            <Route path="/home" exact={true} component={Welcome} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/singles" exact={true} component={Singles} />
            <Route path="/merch" exact={true} component={Merch} />
            <Route path="/tour" exact={true} component={Tour} />
            </div>
        </main>
        <footer className="footer">
            All rights reserved.
        </footer>
    </div>
    </Router>
    );
};

export default Home;
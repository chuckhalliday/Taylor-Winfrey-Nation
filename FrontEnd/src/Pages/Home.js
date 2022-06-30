import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Welcome from '../Components/Welcome'
import Singles from '../Components/Singles'
import Merch from '../Components/Merch'
import Tour from '../Components/Tour'
import ProductDetails from '../Components/ProductDetails'
import CartScreen from "../Components/Cart";
import Shipping from "../Components/Shipping";
import { storeUserId } from "../Actions/userActions";
import { clearSession } from "../Actions/cartActions";

const Home = ({ setAuth }) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const dispatch = useDispatch();

    const getProfile = async () => {
        try {
          const res = await fetch("/dashboard/", {
            method: "POST",
            headers: { jwt_token: localStorage.token }
          })
          const parseData = await res.json();
          setName(parseData.first_name);
          setId(parseData.id);
        } catch (err) {
          console.error(err.message);
        }
      };

    const startSession = async () => {
        const body = {
            user_id: id
        }
        await fetch('/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            })
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(clearSession());
        localStorage.removeItem("token");
        setAuth(false);
    }

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
        }
    
        const closeMenu = () => {
            document.querySelector(".sidebar").classList.remove("open");
        }


    useEffect(() => {
        if (id !== "") {
        dispatch(storeUserId(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        getProfile()
    })
    
    useEffect(() => {
        if (id !== "") {
        startSession()
        }
    })

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
            <Link id="title" to="/home">The Official Taylor Winfrey Payment Experience!!!!!!</Link>
            </div>
            <div className="header-links">
                <Link id="cart" to="/cart">Cart</Link>
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
            <Route path="/cart/:id?"  component={CartScreen}/>
            <Route path="/shipping" component={Shipping}/>
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
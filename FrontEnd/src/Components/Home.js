import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

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

    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            const {data} = await axios.get("http://localhost:5000/products")
            setProduct(data)
        }
        fetchData();
        return () => {
        };
    }, []);

    return (
        <Fragment>
            <Router>
           <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <a id="title" href="sitemap.html">The Official Taylor Winfrey Payment Experience!!!!!!</a>
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
                    <Link to="./singles">Singles</Link> 
                </li>
                <li>
                    <a href="./tour">Tickets</a>
                </li>
                <li>
                    <a href="./merch">Merch</a>
                </li>
            </ul>
        </aside>
        <main className="main">
        <div className="welcome"><h2>You belong to us now, {name}</h2></div>
            <div className="content">
                <ul className="products">
                    {
                    products.map(product =>
                        <li key={product.id}>
                            <div className="product">
                                <img className="product-image" src={product.image} alt="album art" />
                                <div className="product-name">
                                <a href=""></a>{product.name}</div>
                                <div className="product-price">{product.price}</div>
                                <div className="product-rating">{product.description}</div>
                            </div>
                        </li>)
                    }
            </ul>
            </div>
        </main>
        <footer className="footer">
            All rights reserved.
        </footer>
    </div>
    </Router>
        </Fragment>
    );
};

export default Home;
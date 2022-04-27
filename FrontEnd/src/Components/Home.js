import React, { Fragment, useState, useEffect } from "react";

const Home = ({ setAuth }) => {


    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    return (
        <Fragment>
           <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <a href="sitemap.html">The Taylor Winfrey Payment Experience</a>
            </div>
            <div className="header-links">
                <a href="cart.html">Cart</a>
                <button className="btn btn-success" onClick={e => logout(e)}>Logout</ button>
            </div>
        </header>
        <aside className="sidebar">
            <h3>Sick Products</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="sitemap.html">Albums</a>
                </li>
                <li>
                    <a href="">Tickets</a>
                </li>
            </ul>
        </aside>
        <main className="main">
            <div className="content">
                <ul className="products">
                    <li>
                        <div className="product">
                            <img src="" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                Dope EP 1</div>
                            <div className="product-price">$1,000,000.00</div>
                            <div className="product-rating">5 Stars</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img src="" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                Dope EP 2</div>
                            <div className="product-price">$1,000,000.00</div>
                            <div className="product-rating">5 Stars</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img src="" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                Dope EP 3</div>
                            <div className="product-price">$1,000,000.00</div>
                            <div className="product-rating">5 Stars</div>
                        </div>
                    </li>

            </ul>
            </div>
        </main>
        <footer>
            All rights reserved.
        </footer>
    </div>
        </Fragment>
    );
};

export default Home;
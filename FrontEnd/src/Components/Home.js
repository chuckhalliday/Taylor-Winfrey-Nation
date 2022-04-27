import React, { Fragment } from "react";

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
                <a href="sitemap.html">The Taylor Winfrey Payment Experience!!!!!!</a>
            </div>
            <div className="header-links">
                <a href="cart.html">Cart</a>
                <button className="btn btn-success" onClick={e => logout(e)}>Logout</ button>
            </div>
        </header>
        <aside className="sidebar">
            <h3>The Goods</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="./home">Singles</a>
                </li>
                <li>
                    <a href="./home">Tickets</a>
                </li>
            </ul>
        </aside>
        <main className="main">
            <div className="content">
                <ul className="products">
                    <li>
                        <div className="product">
                            <img className="product-image" src="/images/BetterCoffee.jpeg" alt="album art" />
                            <div className="product-name">
                                <a href=""></a>
                                Better Coffee</div>
                            <div className="product-price">$405,701.99</div>
                            <div className="product-rating">5 Stars(105k reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="/images/Canada.jpeg" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                EZ N THA BC</div>
                            <div className="product-price">$720,053.99</div>
                            <div className="product-rating">5 Stars(374k reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="/images/SexyForces.jpeg" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                Sexy Nato Forces</div>
                            <div className="product-price">₽100,000,000.00</div>
                            <div className="product-rating">5 Stars(214k reviews)</div>
                        </div>
                    </li>
                    <li>
                        <div className="product">
                            <img className="product-image" src="/images/Jack.jpeg" alt="album art" />
                            <div className="product-name">
                                <a href="product.html"></a>
                                Chill Out Jack</div>
                            <div className="product-price">More than you can afford</div>
                            <div className="product-rating">5 Stars(756k reviews)</div>
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
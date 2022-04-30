import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

const Singles = () => {

    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            const {data} = await axios.get("/products")
            setProduct(data)
        }
        fetchData();
        return () => {
        };
    }, []);

    return (
        <Fragment>
            <Router>
                <main className="main">
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
            </Router>
        </Fragment>
    );
};

export default Singles;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Tour = () => {

    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            const {data} = await axios.get("http://localhost:5000/products/category/3")
            setProduct(data)
        }
        fetchData();
        return () => {
        };
    }, []);

    return (
        <ul className="products">
            {
            products.map(product =>
                <li key={product.category_id}>
                    <div className="product">
                    <Link><img className="product-image" src={product.image} alt="album art" /></Link>
                    <div className="product-name">
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-price">{product.price}</div>
                    <div className="product-rating">{product.description}</div>
                    </div>
                </li>)
            }
        </ul>

    );
};

export default Tour;
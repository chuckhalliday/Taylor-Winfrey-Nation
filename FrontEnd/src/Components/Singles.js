import React, { useEffect } from "react";
import MessageBox from "./MessageBox";
import LoadingBox from "./LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listSingles } from "../Actions/productActions";
import { Link } from "react-router-dom";

const Singles = () => {
    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listSingles())
    }, []);

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
              )  : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
              ) : (
        <ul className="products">
            {
            products.map(product =>
                <li key={product.category_id}>
                    <div className="product">
                    <Link><img className="product-image" src={product.image} alt="album art" /></Link>
                    <div className="product-name">
                    <Link to={'/product/' + product.id}>{product.name}</Link>
                    </div>
                    <div className="product-price">{product.price}</div>
                    <div className="product-rating">{product.description}</div>
                    </div>
                </li>)
            }
        </ul>)}
        </div>
    );
};

export default Singles;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MessageBox from "./MessageBox";
import LoadingBox from "./LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listMerch } from "../Actions/productActions";

const Merch = () => {

    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listMerch())
    }, [dispatch]);

    return (
        <div>
            <center><h1 className="compTitle">Offical TW Uniforms</h1></center>
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
                    <Link to={'/products/' + product.id}><img className="product-image" src={product.image} alt="album art" /></Link>
                    <div className="product-name">
                    <Link to={'/products/' + product.id}>{product.name}</Link>
                    </div>
                    <div className="product-price">{product.price}</div>
                    {product.discount_percent ? (
                      <span>
                      <div>
                        <div className="price danger">-${(Number((product.price).replace(/[^0-9.-]+/g, "")) * product.discount_percent).toFixed(2)}</div>
                        <div id="discountinfo" title={product.reason}>?</div>
                      </div>
                    </span>
                    ) : (
                    <span>
                    </span>)}
                    <div className="product-rating">{product.description}</div>
                    </div>
                </li>)
            }
        </ul>)}
        </div>
        </div>
    );
};

export default Merch;
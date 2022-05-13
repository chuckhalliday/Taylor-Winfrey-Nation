import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../Actions/productActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function ProductDetails(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);


    return (
        <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            { product.map(product =>
            <div className="row top">
              <div className="col-2">
                <img
                  className="large"
                  src={product.image}
                  alt={product.name}
                ></img>
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    Description:
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price: </div>
                        <div className="price">{product.price}</div>
                      </div>
                    </li>
                    <div>
                    {product.discount_percent ? (
                      <span>
                    <li>
                      <div className="row">
                        <div>Discount: </div>
                        <div className="price danger">${(Number((product.price).replace(/[^0-9.-]+/g, "")) * product.discount_percent).toFixed(2)}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Total:</div>
                        <div className="price">${(Number((product.price).replace(/[^0-9.-]+/g, "")) - (Number((product.price).replace(/[^0-9.-]+/g, "")) * product.discount_percent)).toFixed(2)}</div>
                      </div>
                    </li>
                    </span>
                    ) : (
                    <span>
                    </span>)}
                    </div>
                    <li>
                      <div className="row">
                        <div>Status:</div>
                        <div>
                          {product.quantity > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                            <span className="danger">Unavailable</span>
                          )}
                        </div>
                      </div>
                      </li>
                      <li>
                        <button className="primary block">Add to Cart</button>
                      </li>
                    </ul>
                    </div>
                </div>
            </div>)}
         </div>
        )}
    </div>
    )
  }

  export default ProductDetails;
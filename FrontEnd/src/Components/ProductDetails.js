import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../Actions/productActions';
import { findSession } from '../Actions/userActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function ProductDetails(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const user_id = useSelector(state => state.currentUser.user.id)
    const session_id = useSelector(state => state.currentSession.session.id)

    useEffect(() => {
      if (user_id !== '') {
      dispatch(findSession(user_id))
      }
  }, [dispatch, user_id])

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = async(e) => {
      e.preventDefault();
      const body = {
        product_id: productId,
        session_id: session_id,
        quantity: qty
      }
      await fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      props.history.push(`/cart/${productId}?qty=${qty}`);
    }


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
              <div className="col-1" id="productname">
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
                        <div>
                        <div>Discount: </div>
                        <div id="discountinfo" title={product.reason}>?</div>
                        </div>
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
                      {product.quantity > 0 && (
                      <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select value={qty} onChange={(e) => setQty(e.target.value)}>
                              {
                                [...Array(product.quantity).keys()].map( (x) => (
                                  <option key={x+1} value={x+1}>{x+1}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button onClick={addToCartHandler} className="gold block" id="cartbutton">Add to Cart</button>
                      </li>
                      </>)}
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
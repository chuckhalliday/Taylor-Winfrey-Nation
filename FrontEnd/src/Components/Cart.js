import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../Actions/cartActions";
import MessageBox from "./MessageBox";

export default function CartScreen(props) {

    const productId = props.match.params.id
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        //delete
    }

    const checkOutHandler = () => {
        props.history.push('/shipping')
    }

    return (
        <div className="row top">
            <div className="col-2">
            <h1>Cart</h1>
                {cartItems.length === 0 ? (<MessageBox>
                    Cart is empty <Link to="/home">Return Home</Link>
                </MessageBox>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <div className="row">
                                    <div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="small"
                                    ></img>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select value={item.qty}
                                        onChange={(e) =>
                                        dispatch(
                                            addToCart(item.id,
                                            Number(e.target.value))
                                        )}
                                        > {
                                            [...Array(item.quantity).keys()].map( (x) => (
                                              <option key={x+1} value={x+1}>{x+1}</option>
                                            ))
                                          }</select>
                                    </div>
                                    <div>
                                        {item.price}
                                    </div>
                                    <div>
                                        <button type="button"
                                        onClick={() => removeFromCartHandler(item.id)}
                                        >Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-2">
                <div className="card card-body" id="cartcard">
                    <ul>
                        <li>
                            <div className="row">
                            <div><h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) items: </h2></div>
                            <div><h2>${cartItems.reduce((a,c) => a + Number((c.price).replace(/[^0-9.-]+/g, "")) * c.qty, 0).toFixed(2)}</h2></div>
                            </div>
                        </li>
                        <li>
                            <div className="row danger">
                                <div><h2>Discount:</h2></div>
                            <div><h2>-${cartItems.reduce((a,c) => a + (Number((c.price).replace(/[^0-9.-]+/g, "")) * c.discount_percent) * c.qty, 0).toFixed(2)}</h2></div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                            <div><h2>Total: </h2></div>
                            <div><h2>${cartItems.reduce((a,c) => (a + (Number((c.price).replace(/[^0-9.-]+/g, "")) - (Number((c.price).replace(/[^0-9.-]+/g, "")) * c.discount_percent))) * c.qty, 0).toFixed(2)}</h2></div>
                            </div>
                        </li>
                        <li>
                            <button type="button" 
                            onClick={checkOutHandler} 
                            className="block gold"
                            id="cartbutton" 
                            disabled={cartItems.length === 0}>
                                Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
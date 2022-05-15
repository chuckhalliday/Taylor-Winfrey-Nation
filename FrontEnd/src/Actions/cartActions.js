import Axios from "axios"
import { CART_ADD_ITEM } from "../Constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const {data} = await Axios.get(`http://localhost:5000/products/${productId}`);
    const product = await data.filter(obj => obj.id === productId)[0]
        
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            id : product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            quantity: product.quantity,
            discount_percent : product.discount_percent,
            reason : product.reason, 
            qty,
        }
    })
}
import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CLEAR_SESSION } from "../Constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch) => {
    const {data} = await Axios.get(`/products/${productId}`);
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
    });
}

export const removeFromCart = (productId) => (dispatch) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});;
}


export const clearSession = () => {
    return {type: CLEAR_SESSION}
}
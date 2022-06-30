import Axios from "axios";
import {PRODUCT_DETAILS_FAIL, 
        PRODUCT_DETAILS_REQUEST, 
        PRODUCT_DETAILS_SUCCESS, 
        PRODUCT_LIST_FAIL, 
        PRODUCT_LIST_REQUEST, 
        PRODUCT_LIST_SUCCESS} from "../Constants/productConstants"

export const listSingles = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const {data} = await Axios.get("/products/category/1");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
};

export const listMerch = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const {data} = await Axios.get("/products/category/2");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
};

export const listShows = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const {data} = await Axios.get("/products/category/3");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
};

export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
    try {
        const {data}  = await Axios.get(`/products/${productId}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch(error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ?
        error.response.data.message: error.message,
    })
    }
}
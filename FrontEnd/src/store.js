import {legacy_createStore as createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './Reducers/cartReducers';
import { productDetailsReducer, productListReducer } from './Reducers/productReducers';
import { sessionReducer, userReducer } from './Reducers/userReducers';

const initialState = {};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    currentUser: userReducer,
    currentSession: sessionReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
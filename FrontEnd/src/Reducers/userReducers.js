import { CLEAR_SESSION } from "../Constants/cartConstants";
import { SESSION_INFO_FAIL, SESSION_INFO_SUCCESS, USER_INFO_FAIL, USER_INFO_SUCCESS } from "../Constants/userConstants";


export const userReducer = (state = {user: []}, action) => {
    switch(action.type){
        case USER_INFO_SUCCESS:
            return {user: action.payload};
        case USER_INFO_FAIL:
            return {error: action.payload};
        case CLEAR_SESSION:
            return []
        default:
            return state;
    }
}

export const sessionReducer = (state = {session: []}, action) => {
    switch(action.type){
        case SESSION_INFO_SUCCESS:
            return {session: action.payload};
        case SESSION_INFO_FAIL:
            return {error: action.payload};
        case CLEAR_SESSION:
            return []
        default:
            return state;
    }
}
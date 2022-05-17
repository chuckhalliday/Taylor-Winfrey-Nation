import Axios from "axios";
import {
  SESSION_INFO_FAIL,
  SESSION_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_INFO_SUCCESS,
} from "../Constants/userConstants";

export const storeUserId = (id) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`http://localhost:5000/users/${id}`);
    const user = await data.filter((obj) => obj.id === id)[0];
    dispatch({
      type: USER_INFO_SUCCESS,
      payload: {
        id: user.id,
      },
    });
  } catch (error) {
    dispatch({ type: USER_INFO_FAIL, payload: error.message });
  }
};

export const findSession = (user_id) => async (dispatch) => {
  const { data } = await Axios.get(
    `http://localhost:5000/session/user/${user_id}`
  )
    .then((response) => {
      console.log(response.data[0]);
      console.log(response.status)

      dispatch({
        type: SESSION_INFO_SUCCESS,
        payload: {
          id: response.data[0].id,
        },
      });
    })
    .catch((error) => {
      dispatch({ type: SESSION_INFO_FAIL, payload: error.message });
    });
};

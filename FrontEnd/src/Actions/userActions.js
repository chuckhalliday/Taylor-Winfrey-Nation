import Axios from "axios";


export const findSession = async (user_id) => {
    Axios.get(`http://localhost:5000/session/user/${user_id}`, {
        params: {
            user_id: user_id
        }
    })
}